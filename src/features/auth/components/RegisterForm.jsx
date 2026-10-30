import { useState } from "react";

const EMPTY = { name: "", email: "", password: "" };
const MIN_PASSWORD = 8;

export default function RegisterForm({ onSubmit, onSwitch }) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [sending, setSending] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (form.password.length < MIN_PASSWORD) {
      setError(`La contraseña debe tener al menos ${MIN_PASSWORD} caracteres`);
      return;
    }

    setSending(true);
    try {
      const user = await onSubmit({ ...form, name: form.name.trim(), email: form.email.trim() });
      setSuccess(`Cuenta creada para ${user.email}. Ya puedes iniciar sesión.`);
      setForm(EMPTY);
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="card form auth" onSubmit={submit}>
      <h2>CREAR CUENTA</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <label>
        Nombre
        <input name="name" value={form.name} onChange={change} required maxLength={100} />
      </label>

      <label>
        Correo
        <input type="email" name="email" value={form.email} onChange={change} required maxLength={255} />
      </label>

      <label>
        Contraseña
        <input type="password" name="password" value={form.password} onChange={change}
               required maxLength={72} autoComplete="new-password" />
      </label>

      <div className="actions">
        <button type="submit" className="btn primary" disabled={sending}>
          {sending ? "Registrando..." : "Registrarse"}
        </button>
      </div>

      {onSwitch && (
        <p className="auth-switch">
          ¿Ya tienes cuenta? <button type="button" className="link" onClick={onSwitch}>Inicia sesión</button>
        </p>
      )}
    </form>
  );
}
