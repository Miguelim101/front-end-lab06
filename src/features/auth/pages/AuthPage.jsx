import { useState } from "react";
import { useAuth } from "../context/authContext";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

// Pantalla pública: inicio de sesión o registro (sin sesión válida no se ven las tareas)
export default function AuthPage() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState("login");

  return (
    <main className="app">
      <h1>TO DO</h1>
      {mode === "login" ? (
        <LoginForm onSubmit={login} onSwitch={() => setMode("register")} />
      ) : (
        <RegisterForm onSubmit={register} onSwitch={() => setMode("login")} />
      )}
    </main>
  );
}
