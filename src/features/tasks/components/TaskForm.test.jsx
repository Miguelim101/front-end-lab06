import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import TaskForm from "./TaskForm";

describe("TaskForm", () => {
  it("renderiza el formulario", () => {
    render(<TaskForm onSubmit={vi.fn()} />);
    expect(screen.getByText("Nueva tarea")).toBeInTheDocument();
    expect(screen.getByLabelText(/título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descripción/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/prioridad/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/fecha límite/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /guardar/i })).toBeInTheDocument();
  });

  it("permite escribir un título", async () => {
    render(<TaskForm onSubmit={vi.fn()} />);
    const input = screen.getByLabelText(/título/i);
    await userEvent.type(input, "Estudiar");
    expect(input).toHaveValue("Estudiar");
  });

  it("ejecuta la acción guardar", async () => {
    const onSubmit = vi.fn();
    render(<TaskForm onSubmit={onSubmit} />);
    await userEvent.type(screen.getByLabelText(/título/i), "Estudiar");
    await userEvent.click(screen.getByRole("button", { name: /guardar/i }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Estudiar", priority: "MEDIUM" })
    );
  });

  it("valida el título obligatorio", async () => {
    const onSubmit = vi.fn();
    render(<TaskForm onSubmit={onSubmit} />);
    expect(screen.getByLabelText(/título/i)).toBeRequired();
    await userEvent.click(screen.getByRole("button", { name: /guardar/i }));
    expect(onSubmit).not.toHaveBeenCalled();
  });
});