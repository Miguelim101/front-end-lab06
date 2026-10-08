const NEXT_LABEL = { PENDING: "Iniciar", IN_PROGRESS: "Completar", COMPLETED: "Reabrir" };

const fmt = (d) => (d ? d.slice(0, 10).split("-").reverse().join("/") : "Sin fecha");

export default function TaskItem({ task, onEdit, onStatus, onDelete }) {
  return (
    <li className={`card task ${task.status}`}>
      <div className="task-head">
        <span className={`badge ${task.priority}`}>{task.priority}</span>
        <strong className="title">{task.title}</strong>
      </div>

      {task.description && <p className="desc">{task.description}</p>}

      <p className="meta">
        Estado: <span className={`status ${task.status}`}>{task.status}</span>
      </p>
      <p className="meta">Fecha: {fmt(task.dueDate)}</p>

      <div className="actions">
        <button className="btn" onClick={() => onEdit(task)}>Editar</button>
        <button className="btn primary" onClick={() => onStatus(task)}>
          {NEXT_LABEL[task.status]}
        </button>
        <button className="btn danger" onClick={() => onDelete(task.id)}>Eliminar</button>
      </div>
    </li>
  );
}