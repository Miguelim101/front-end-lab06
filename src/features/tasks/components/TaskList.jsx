import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onEdit, onStatus, onDelete }) {
  if (!tasks.length) return <p className="empty">No hay tareas todavía ✨</p>;

  return (
    <ul className="list">
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onEdit={onEdit} onStatus={onStatus} onDelete={onDelete} />
      ))}
    </ul>
  );
}