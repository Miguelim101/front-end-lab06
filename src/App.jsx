import TasksPage from "./features/tasks/pages/TasksPage";
import AuthPage from "./features/auth/pages/AuthPage";
import { AuthProvider } from "./features/auth/context/AuthContext";
import { useAuth } from "./features/auth/context/authContext";
import "./index.css";

// Sin sesión: login / registro. Con sesión: tareas (las peticiones llevan el JWT)
function AppContent() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <TasksPage /> : <AuthPage />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
