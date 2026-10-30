import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import LoginForm from "./LoginForm";

const fill = async (email = "ana@example.com", password = "ContrasenaDemo123!") => {
  await userEvent.type(screen.getByLabelText(/correo/i), email);
  await userEvent.type(screen.getByLabelText(/contraseña/i), password);
};

describe("LoginForm", () => {
  it("renderiza el formulario de inicio de sesión", () => {
    render(<LoginForm onSubmit={vi.fn()} onSwitch={vi.fn()} />);
    expect(screen.getByText("INICIAR SESIÓN")).toBeInTheDocument();
    expect(screen.getByLabelText(/correo/i)).toHaveAttribute("type", "email");
    expect(screen.getByLabelText(/contraseña/i)).toHaveAttribute("type", "password");
    expect(screen.getByRole("button", { name: /iniciar sesión/i })).toBeInTheDocument();
    expect(screen.getByText(/¿no tienes cuenta\?/i)).toBeInTheDocument();
  });

  it("debería enviar el correo (sin espacios) y la contraseña", async () => {
    const onSubmit = vi.fn().mockResolvedValue();
    render(<LoginForm onSubmit={onSubmit} />);
    await fill("  ana@example.com ");
    await userEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    expect(onSubmit).toHaveBeenCalledWith({ email: "ana@example.com", password: "ContrasenaDemo123!" });
  });

  it("no debería enviar si faltan las credenciales", async () => {
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);
    await userEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("debería mostrar el error cuando las credenciales son inválidas", async () => {
    const onSubmit = vi.fn().mockRejectedValue(new Error("Invalid email or password"));
    render(<LoginForm onSubmit={onSubmit} />);
    await fill();
    await userEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    expect(await screen.findByText("Invalid email or password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /iniciar sesión/i })).toBeEnabled();
  });

  it("debería permitir ir al registro", async () => {
    const onSwitch = vi.fn();
    render(<LoginForm onSubmit={vi.fn()} onSwitch={onSwitch} />);
    await userEvent.click(screen.getByRole("button", { name: /regístrate/i }));
    expect(onSwitch).toHaveBeenCalledTimes(1);
  });
});
