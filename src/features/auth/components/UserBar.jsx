// HU-SEG-06: usuario autenticado y botón para cerrar la sesión (mockup "Tareas autenticadas")
export default function UserBar({ user, onLogout }) {
  return (
    <header className="userbar">
      <span className="userbar-name">{user.name}</span>
      <button type="button" className="btn" onClick={onLogout}>Cerrar sesión</button>
    </header>
  );
}
