import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import App from "../../App";
import * as authApi from "../../api/authApi";
import { getToken, clearToken } from "../../api/session";

// Solo se simula authApi: taskApi es el real y fetch responde 401, como lo haría el
// back-end con un token vencido. Así se prueba la cadena completa 401 -> sesión -> login.
vi.mock("../../api/authApi");

const unauthorized = () =>
  Promise.resolve({
    ok: false,
    status: 401,
    json: () => Promise.resolve({ status: 401, message: "Invalid or expired token" }),
  });

describe("Sesión expirada", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    authApi.login.mockResolvedValue({ tokenType: "Bearer", accessToken: "token.vencido", expiresIn: 1800 });
    authApi.me.mockResolvedValue({ id: 1, name: "Ana Pérez", email: "ana@example.com", role: "USER" });
    vi.stubGlobal("fetch", vi.fn(unauthorized));
  });

  afterEach(() => {
    clearToken();
    vi.unstubAllGlobals();
  });

  it("PT-17 · un 401 en una petición protegida debería limpiar la sesión y volver al inicio de sesión", async () => {
    render(<App />);
    await userEvent.type(screen.getByLabelText(/correo/i), "ana@example.com");
    await userEvent.type(screen.getByLabelText(/contraseña/i), "ContrasenaDemo123!");
    await userEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    // Al cargar las tareas el back-end responde 401 -> se cierra la sesión con un aviso
    expect(await screen.findByRole("alert")).toHaveTextContent("Tu sesión expiró, inicia sesión nuevamente");
    expect(screen.getByText("INICIAR SESIÓN")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /cerrar sesión/i })).not.toBeInTheDocument();
    expect(getToken()).toBeNull();
  });

  it("no debería mostrar el aviso de sesión expirada cuando las credenciales son incorrectas", async () => {
    authApi.login.mockRejectedValue(new Error("Invalid email or password"));
    render(<App />);
    await userEvent.type(screen.getByLabelText(/correo/i), "ana@example.com");
    await userEvent.type(screen.getByLabelText(/contraseña/i), "incorrecta");
    await userEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    expect(await screen.findByText("Invalid email or password")).toBeInTheDocument();
    expect(screen.queryByText(/tu sesión expiró/i)).not.toBeInTheDocument();
  });
});
