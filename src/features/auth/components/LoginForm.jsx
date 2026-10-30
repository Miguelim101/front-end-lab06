import { useState } from "react";

const EMPTY = { email: "", password: "" };

export default function LoginForm({ onSubmit, onSwitch }) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      await onSubmit({ email: form.email.trim(), password: form.password });
    } catch (err) {
      setError(err.message);
      setSending(false);
    }
  };

  return (
    <form className="card form auth" onSubmit={submit}>
      <h2>INICIAR SESIÓN</h2>
      {error && <p className="error">{error}</p>}

      <label>
        Correo
        <input type="email" name="email" value={form.email} onChange={change} required autoComplete="username" />
      </label>

      <label>
        Contraseña
        <input type="password" name="password" value={form.password} onChange={change}
               required autoComplete="current-password" />
      </label>

      <div className="actions">
        <button type="submit" className="btn primary" disabled={sending}>
          {sending ? "Ingresando..." : "Iniciar sesión"}
        </button>
      </div>

      {onSwitch && (
        <p className="auth-switch">
          ¿No tienes cuenta? <button type="button" className="link" onClick={onSwitch}>Regístrate</button>
        </p>
      )}
    </form>
  );
}
