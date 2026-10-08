import { useState } from "react";
import useTasks from "../hooks/useTasks";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function TasksPage() {
  const { tasks, error, save, remove, changeStatus } = useTasks();
  const [editing, setEditing] = useState(null);

  const handleSubmit = async (data) => {
    await save(editing ? { ...editing, ...data } : { status: "PENDING", ...data });
    setEditing(null);
  };

  return (
    <main className="app">
      <h1>TO DO</h1>
      {error && <p className="error">{error}</p>}

      <TaskForm initial={editing} onSubmit={handleSubmit} onCancel={() => setEditing(null)} />

      <h2 className="section">TAREAS</h2>
      <TaskList tasks={tasks} onEdit={setEditing} onStatus={changeStatus} onDelete={remove} />
    </main>
  );
}