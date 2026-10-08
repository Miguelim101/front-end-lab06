import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import TaskList from "./TaskList";

const tasks = [
  { id: 1, title: "Terminar laboratorio", status: "IN_PROGRESS", priority: "HIGH", dueDate: "2026-09-25" },
  { id: 2, title: "Preparar parcial", status: "PENDING", priority: "MEDIUM", dueDate: "2026-09-27" },
];

const setup = (props = {}) => {
  const handlers = { onEdit: vi.fn(), onStatus: vi.fn(), onDelete: vi.fn() };
  render(<TaskList tasks={tasks} {...handlers} {...props} />);
  return handlers;
};

describe("TaskList", () => {
  it("renderiza tareas", () => {
    setup();
    expect(screen.getByText("Terminar laboratorio")).toBeInTheDocument();
    expect(screen.getByText("Preparar parcial")).toBeInTheDocument();
    expect(screen.getByText(/25\/09\/2026/)).toBeInTheDocument();
  });

  it("muestra estado", () => {
    setup();
    expect(screen.getByText("IN_PROGRESS")).toBeInTheDocument();
    expect(screen.getByText("PENDING")).toBeInTheDocument();
  });

  it("muestra prioridad", () => {
    setup();
    expect(screen.getByText("HIGH")).toBeInTheDocument();
    expect(screen.getByText("MEDIUM")).toBeInTheDocument();
  });

  it("ejecuta eliminar", async () => {
    const { onDelete } = setup();
    await userEvent.click(screen.getAllByRole("button", { name: /eliminar/i })[0]);
    expect(onDelete).toHaveBeenCalledWith(1);
  });

  it("muestra mensaje cuando no hay tareas", () => {
    setup({ tasks: [] });
    expect(screen.getByText(/no hay tareas/i)).toBeInTheDocument();
  });
});