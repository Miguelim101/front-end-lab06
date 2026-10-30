import TasksPage from "./features/tasks/pages/TasksPage";
import AuthPage from "./features/auth/pages/AuthPage";
import { AuthProvider } from "./features/auth/context/AuthContext";
import { useAuth } from "./features/auth/context/authContext";
import "./index.css";

// Sin sesión: login / registro. Con sesión: tareas (las peticiones llevan el JWT)
function AppContent() {
  const { user, isAuthenticated } = useAuth();
  // key = id del usuario: si cambia la sesión, TasksPage se monta de nuevo sin estado del usuario anterior
  return isAuthenticated ? <TasksPage key={user.id} /> : <AuthPage />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
