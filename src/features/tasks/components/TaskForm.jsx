import { useEffect, useState } from "react";

const EMPTY = { title: "", description: "", priority: "MEDIUM", dueDate: "" };

export default function TaskForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    setForm(
      initial
        ? { ...EMPTY, ...initial, dueDate: initial.dueDate?.slice(0, 10) ?? "" }
        : EMPTY
    );
  }, [initial]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, dueDate: form.dueDate || null });
    if (!initial) setForm(EMPTY);
  };

  return (
    <form className="card form" onSubmit={submit}>
      <h2>{initial ? "Editar tarea" : "Nueva tarea"}</h2>

      <label>
        Título
        <input name="title" value={form.title} onChange={change} required />
      </label>

      <label>
        Descripción
        <input name="description" value={form.description} onChange={change} />
      </label>

      <div className="row">
        <label>
          Prioridad
          <select name="priority" value={form.priority} onChange={change}>
            <option>LOW</option>
            <option>MEDIUM</option>
            <option>HIGH</option>
          </select>
        </label>

        <label>
          Fecha límite
          <input type="date" name="dueDate" value={form.dueDate} onChange={change} />
        </label>
      </div>

      <div className="actions">
        <button type="submit" className="btn primary">Guardar</button>
        {initial && (
          <button type="button" className="btn" onClick={onCancel}>Cancelar</button>
        )}
      </div>
    </form>
  );
}