import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import App from "./App";
import * as authApi from "./api/authApi";
import * as taskApi from "./api/taskApi";
import { getToken, clearToken } from "./api/session";

vi.mock("./api/authApi");
vi.mock("./api/taskApi");

const anaTasks = [
  { id: 1, title: "Entregar laboratorio", status: "PENDING", priority: "HIGH", dueDate: "2026-10-25" },
];

const loginAs = async (email = "ana@example.com", password = "ContrasenaDemo123!") => {
  await userEvent.type(screen.getByLabelText(/correo/i), email);
  await userEvent.type(screen.getByLabelText(/contraseña/i), password);
  await userEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));
};

describe("App · sesión", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    taskApi.getTasks.mockResolvedValue(anaTasks);
    taskApi.getTasksByRange.mockResolvedValue([]);
  });

  afterEach(() => clearToken());

  it("sin sesión debería mostrar el inicio de sesión y no las tareas", () => {
    render(<App />);
    expect(screen.getByText("INICIAR SESIÓN")).toBeInTheDocument();
    expect(screen.queryByText("Entregar laboratorio")).not.toBeInTheDocument();
    expect(taskApi.getTasks).not.toHaveBeenCalled();
  });

  it("debería mostrar las tareas después de un login correcto y guardar el token en memoria", async () => {
    authApi.login.mockResolvedValue({ tokenType: "Bearer", accessToken: "a.b.c", expiresIn: 1800 });
    authApi.me.mockResolvedValue({ id: 1, name: "Ana Pérez", email: "ana@example.com", role: "USER" });
    render(<App />);

    await loginAs();

    expect(await screen.findByText("Entregar laboratorio")).toBeInTheDocument();
    expect(authApi.login).toHaveBeenCalledWith({ email: "ana@example.com", password: "ContrasenaDemo123!" });
    expect(getToken()).toBe("a.b.c");
  });

  it("no debería entrar ni guardar token cuando el login falla", async () => {
    authApi.login.mockRejectedValue(new Error("Invalid email or password"));
    render(<App />);

    await loginAs("ana@example.com", "incorrecta");

    expect(await screen.findByText("Invalid email or password")).toBeInTheDocument();
    expect(screen.getByText("INICIAR SESIÓN")).toBeInTheDocument();
    expect(getToken()).toBeNull();
    expect(taskApi.getTasks).not.toHaveBeenCalled();
  });

  it("debería permitir pasar al registro y volver al inicio de sesión", async () => {
    render(<App />);
    await userEvent.click(screen.getByRole("button", { name: /regístrate/i }));
    expect(screen.getByText("CREAR CUENTA")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /inicia sesión/i }));
    expect(screen.getByText("INICIAR SESIÓN")).toBeInTheDocument();
  });

  // ---------- HU-SEG-06 ----------

  it("debería mostrar el nombre del usuario y el botón Cerrar sesión", async () => {
    authApi.login.mockResolvedValue({ tokenType: "Bearer", accessToken: "a.b.c", expiresIn: 1800 });
    authApi.me.mockResolvedValue({ id: 1, name: "Ana Pérez", email: "ana@example.com", role: "USER" });
    render(<App />);

    await loginAs();

    expect(await screen.findByText("Ana Pérez")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cerrar sesión/i })).toBeInTheDocument();
  });

  it("PT-16 · cerrar sesión debería borrar el token, ocultar las tareas y mostrar el inicio de sesión", async () => {
    authApi.login.mockResolvedValue({ tokenType: "Bearer", accessToken: "a.b.c", expiresIn: 1800 });
    authApi.me.mockResolvedValue({ id: 1, name: "Ana Pérez", email: "ana@example.com", role: "USER" });
    render(<App />);
    await loginAs();
    expect(await screen.findByText("Entregar laboratorio")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /cerrar sesión/i }));

    expect(screen.getByText("INICIAR SESIÓN")).toBeInTheDocument();
    expect(screen.queryByText("Entregar laboratorio")).not.toBeInTheDocument();
    expect(screen.queryByText("Ana Pérez")).not.toBeInTheDocument();
    expect(getToken()).toBeNull();
  });

  it("PT-18 · otro usuario que inicia sesión solo debería ver sus propias tareas", async () => {
    const luisTasks = [
      { id: 7, title: "Tarea privada de Luis", status: "PENDING", priority: "LOW", dueDate: "2026-10-26" },
    ];
    authApi.login
      .mockResolvedValueOnce({ tokenType: "Bearer", accessToken: "token.de.ana", expiresIn: 1800 })
      .mockResolvedValueOnce({ tokenType: "Bearer", accessToken: "token.de.luis", expiresIn: 1800 });
    authApi.me
      .mockResolvedValueOnce({ id: 1, name: "Ana Pérez", email: "ana@example.com", role: "USER" })
      .mockResolvedValueOnce({ id: 2, name: "Luis Gómez", email: "luis@example.com", role: "USER" });
    taskApi.getTasks.mockResolvedValueOnce(anaTasks).mockResolvedValueOnce(luisTasks);
    render(<App />);

    await loginAs("ana@example.com");
    expect(await screen.findByText("Entregar laboratorio")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /cerrar sesión/i }));

    await loginAs("luis@example.com");

    expect(await screen.findByText("Tarea privada de Luis")).toBeInTheDocument();
    expect(screen.queryByText("Entregar laboratorio")).not.toBeInTheDocument();
    expect(screen.getByText("Luis Gómez")).toBeInTheDocument();
    expect(getToken()).toBe("token.de.luis");
  });
});
