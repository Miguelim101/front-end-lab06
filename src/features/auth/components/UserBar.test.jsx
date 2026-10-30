import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import UserBar from "./UserBar";

describe("UserBar", () => {
  it("debería mostrar el nombre del usuario autenticado", () => {
    render(<UserBar user={{ id: 1, name: "Ana Pérez" }} onLogout={vi.fn()} />);
    expect(screen.getByText("Ana Pérez")).toBeInTheDocument();
  });

  it("debería cerrar la sesión al presionar el botón", async () => {
    const onLogout = vi.fn();
    render(<UserBar user={{ id: 1, name: "Ana Pérez" }} onLogout={onLogout} />);
    await userEvent.click(screen.getByRole("button", { name: /cerrar sesión/i }));
    expect(onLogout).toHaveBeenCalledTimes(1);
  });
});
