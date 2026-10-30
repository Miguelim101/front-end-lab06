import { useState } from "react";
import TasksPage from "./features/tasks/pages/TasksPage";
import RegisterForm from "./features/auth/components/RegisterForm";
import * as authApi from "./api/authApi";
import "./index.css";

export default function App() {
  // HU-SEG-01: vista de registro disponible. El acceso a tareas se protege en las siguientes historias
  const [view, setView] = useState("tasks");

  return (
    <>
      <nav className="topbar">
        <button type="button" className={`btn ${view === "tasks" ? "primary" : ""}`} onClick={() => setView("tasks")}>
          Tareas
        </button>
        <button type="button" className={`btn ${view === "register" ? "primary" : ""}`} onClick={() => setView("register")}>
          Crear cuenta
        </button>
      </nav>

      {view === "register" ? (
        <main className="app">
          <h1>TO DO</h1>
          <RegisterForm onSubmit={authApi.register} />
        </main>
      ) : (
        <TasksPage />
      )}
    </>
  );
}
