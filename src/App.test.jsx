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
});
