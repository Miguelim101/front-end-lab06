import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import RegisterForm from "./RegisterForm";

const fill = async ({ name = "Ana Pérez", email = "ana@example.com", password = "ContrasenaDemo123!" } = {}) => {
  if (name) await userEvent.type(screen.getByLabelText(/nombre/i), name);
  if (email) await userEvent.type(screen.getByLabelText(/correo/i), email);
  if (password) await userEvent.type(screen.getByLabelText(/contraseña/i), password);
};

describe("RegisterForm", () => {
  it("renderiza los campos de registro", () => {
    render(<RegisterForm onSubmit={vi.fn()} />);
    expect(screen.getByText("CREAR CUENTA")).toBeInTheDocument();
    expect(screen.getByLabelText(/nombre/i)).toBeRequired();
    expect(screen.getByLabelText(/correo/i)).toHaveAttribute("type", "email");
    expect(screen.getByLabelText(/contraseña/i)).toHaveAttribute("type", "password");
    expect(screen.getByRole("button", { name: /registrarse/i })).toBeInTheDocument();
  });

  it("debería enviar nombre, correo y contraseña sin rol", async () => {
    const onSubmit = vi.fn().mockResolvedValue({ id: 1, email: "ana@example.com", role: "USER" });
    render(<RegisterForm onSubmit={onSubmit} />);
    await fill();
    await userEvent.click(screen.getByRole("button", { name: /registrarse/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      name: "Ana Pérez",
      email: "ana@example.com",
      password: "ContrasenaDemo123!",
    });
    expect(await screen.findByText(/cuenta creada para ana@example.com/i)).toBeInTheDocument();
  });

  it("no debería enviar si la contraseña tiene menos de 8 caracteres", async () => {
    const onSubmit = vi.fn();
    render(<RegisterForm onSubmit={onSubmit} />);
    await fill({ password: "corta" });
    await userEvent.click(screen.getByRole("button", { name: /registrarse/i }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText(/al menos 8 caracteres/i)).toBeInTheDocument();
  });

  it("no debería enviar si faltan campos obligatorios", async () => {
    const onSubmit = vi.fn();
    render(<RegisterForm onSubmit={onSubmit} />);
    await userEvent.click(screen.getByRole("button", { name: /registrarse/i }));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("debería mostrar el error del servidor (correo duplicado)", async () => {
    const onSubmit = vi.fn().mockRejectedValue(new Error("An account with email ana@example.com already exists"));
    render(<RegisterForm onSubmit={onSubmit} />);
    await fill();
    await userEvent.click(screen.getByRole("button", { name: /registrarse/i }));

    expect(await screen.findByText(/already exists/i)).toBeInTheDocument();
  });
});
