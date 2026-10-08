import { useState } from "react";

const NEXT = { PENDING: "IN_PROGRESS", IN_PROGRESS: "COMPLETED", COMPLETED: "PENDING" };

export default function useTasks() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Terminar laboratorio", description: "Parte front-end", status: "IN_PROGRESS", priority: "HIGH", dueDate: "2026-09-25" },
    { id: 2, title: "Preparar parcial", description: "", status: "PENDING", priority: "MEDIUM", dueDate: "2026-09-27" },
  ]);

  const save = async (t) =>
    setTasks((prev) =>
      t.id ? prev.map((x) => (x.id === t.id ? t : x)) : [...prev, { ...t, id: Date.now() }]
    );
  const remove = async (id) => setTasks((prev) => prev.filter((x) => x.id !== id));
  const changeStatus = async (t) =>
    setTasks((prev) => prev.map((x) => (x.id === t.id ? { ...x, status: NEXT[x.status] } : x)));

  return { tasks, error: "", save, remove, changeStatus };
}