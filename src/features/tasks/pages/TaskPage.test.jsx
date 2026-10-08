import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import TasksPage from "./TasksPage";
import * as api from "../../../api/taskApi";

vi.mock("../../../api/taskApi");

const tasks = [
  { id: 1, title: "Terminar laboratorio", status: "IN_PROGRESS", priority: "HIGH", dueDate: "2026-09-25" },
];

describe("TasksPage", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("carga tareas", async () => {
    api.getTasks.mockResolvedValue(tasks);
    render(<TasksPage />);
    expect(await screen.findByText("Terminar laboratorio")).toBeInTheDocument();
    expect(api.getTasks).toHaveBeenCalledTimes(1);
  });

  it("muestra loading", async () => {
    api.getTasks.mockReturnValue(new Promise(() => {})); // nunca resuelve
    render(<TasksPage />);
    expect(await screen.findByText(/cargando/i)).toBeInTheDocument();
  });

  it("muestra error cuando falla la API", async () => {
    api.getTasks.mockRejectedValue(new Error("Error HTTP 500"));
    render(<TasksPage />);
    expect(await screen.findByText("Error HTTP 500")).toBeInTheDocument();
  });
});