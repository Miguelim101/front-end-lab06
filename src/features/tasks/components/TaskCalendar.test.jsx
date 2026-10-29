import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import TaskCalendar from "./TaskCalendar";
import * as api from "../../../api/taskApi";

vi.mock("../../../api/taskApi");

// Miércoles 23/09/2026 -> semana del lunes 21 al domingo 27 de septiembre
const INITIAL = new Date(2026, 8, 23);

const tasks = [
  { id: 1, title: "Lab DOSW", status: "PENDING", priority: "HIGH", dueDate: "2026-09-21" },
  { id: 2, title: "Parcial", status: "IN_PROGRESS", priority: "MEDIUM", dueDate: "2026-09-23" },
  { id: 3, title: "Entrega", status: "COMPLETED", priority: "LOW", dueDate: "2026-09-30" },
];

// Simula el endpoint GET /tasks?from&to filtrando por dueDate
const fakeRange = (from, to) =>
  Promise.resolve(tasks.filter((t) => t.dueDate >= from && t.dueDate <= to));

describe("TaskCalendar", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    api.getTasksByRange.mockImplementation(fakeRange);
  });

  it("renderiza siete días", async () => {
    render(<TaskCalendar initialDate={INITIAL} />);
    for (const d of ["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB", "DOM"]) {
      expect(screen.getByText(d)).toBeInTheDocument();
    }
    expect(screen.getAllByTestId(/^day-/)).toHaveLength(7);
    expect(screen.getByText("SEMANA 21 - 27 SEPTIEMBRE 2026")).toBeInTheDocument();
    expect(await screen.findByText("Lab DOSW")).toBeInTheDocument();
    expect(api.getTasksByRange).toHaveBeenCalledWith("2026-09-21", "2026-09-27");
  });

  it("ubica una tarea en la fecha correspondiente", async () => {
    render(<TaskCalendar initialDate={INITIAL} />);
    const wednesday = screen.getByTestId("day-2026-09-23");
    expect(await within(wednesday).findByText("Parcial")).toBeInTheDocument();
    expect(within(wednesday).getByText("MEDIUM")).toBeInTheDocument();
    expect(within(wednesday).getByText("IN_PROGRESS")).toBeInTheDocument();
    expect(within(screen.getByTestId("day-2026-09-21")).getByText("Lab DOSW")).toBeInTheDocument();
    expect(within(screen.getByTestId("day-2026-09-22")).queryByRole("button")).not.toBeInTheDocument();
  });

  it("permite cambiar de semana", async () => {
    render(<TaskCalendar initialDate={INITIAL} />);
    await screen.findByText("Lab DOSW");

    await userEvent.click(screen.getByRole("button", { name: /semana siguiente/i }));
    expect(screen.getByText("SEMANA 28 SEPTIEMBRE - 4 OCTUBRE 2026")).toBeInTheDocument();
    expect(api.getTasksByRange).toHaveBeenLastCalledWith("2026-09-28", "2026-10-04");
    expect(await within(screen.getByTestId("day-2026-09-30")).findByText("Entrega")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /semana anterior/i }));
    await userEvent.click(screen.getByRole("button", { name: /semana anterior/i }));
    expect(screen.getByText("SEMANA 14 - 20 SEPTIEMBRE 2026")).toBeInTheDocument();
    expect(api.getTasksByRange).toHaveBeenLastCalledWith("2026-09-14", "2026-09-20");
  });

  it("no muestra tareas que pertenecen a otra semana", async () => {
    // Aunque la API devolviera de más, el calendario solo ubica tareas de los 7 días visibles
    api.getTasksByRange.mockResolvedValue(tasks);
    render(<TaskCalendar initialDate={INITIAL} />);
    expect(await screen.findByText("Lab DOSW")).toBeInTheDocument();
    expect(screen.getByText("Parcial")).toBeInTheDocument();
    expect(screen.queryByText("Entrega")).not.toBeInTheDocument();
  });

  it("permite seleccionar una tarea para editar", async () => {
    const onSelect = vi.fn();
    render(<TaskCalendar initialDate={INITIAL} onSelect={onSelect} />);
    await userEvent.click(await screen.findByRole("button", { name: /parcial/i }));
    expect(onSelect).toHaveBeenCalledWith(tasks[1]);
  });

  it("se actualiza cuando cambian las tareas (refreshKey)", async () => {
    const { rerender } = render(<TaskCalendar initialDate={INITIAL} refreshKey={1} />);
    await screen.findByText("Lab DOSW");
    expect(api.getTasksByRange).toHaveBeenCalledTimes(1);

    rerender(<TaskCalendar initialDate={INITIAL} refreshKey={2} />);
    await screen.findByText("Lab DOSW");
    expect(api.getTasksByRange).toHaveBeenCalledTimes(2);
  });

  it("muestra error cuando falla la API", async () => {
    api.getTasksByRange.mockRejectedValue(new Error("Error HTTP 500"));
    render(<TaskCalendar initialDate={INITIAL} />);
    expect(await screen.findByText("Error HTTP 500")).toBeInTheDocument();
  });
});
