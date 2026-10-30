import TasksPage from "./features/tasks/pages/TasksPage";
import AuthPage from "./features/auth/pages/AuthPage";
import UserBar from "./features/auth/components/UserBar";
import { AuthProvider } from "./features/auth/context/AuthContext";
import { useAuth } from "./features/auth/context/authContext";
import "./index.css";

// Sin sesión: login / registro. Con sesión: tareas (las peticiones llevan el JWT)
function AppContent() {
  const { user, isAuthenticated, logout } = useAuth();
  if (!isAuthenticated) return <AuthPage />;

  // key = id del usuario: si cambia la sesión, TasksPage se monta de nuevo sin estado del usuario anterior.
  // Al cerrar sesión TasksPage se desmonta y sus tareas desaparecen de la UI
  return (
    <>
      <UserBar user={user} onLogout={logout} />
      <TasksPage key={user.id} />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
