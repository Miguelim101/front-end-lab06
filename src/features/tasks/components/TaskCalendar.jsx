import { useEffect, useMemo, useState } from "react";
import * as api from "../../../api/taskApi";

const DAY_NAMES = ["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB", "DOM"];
const MONTHS = [
  "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
  "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE",
];

// Fechas locales (sin toISOString) para evitar corrimientos por zona horaria
const toKey = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

const mondayOf = (d) => addDays(d, -((d.getDay() + 6) % 7));

const weekTitle = (start, end) => {
  const from = start.getMonth() === end.getMonth()
    ? `${start.getDate()}`
    : `${start.getDate()} ${MONTHS[start.getMonth()]}`;
  return `SEMANA ${from} - ${end.getDate()} ${MONTHS[end.getMonth()]} ${end.getFullYear()}`;
};

export default function TaskCalendar({ initialDate, refreshKey, onSelect }) {
  const [weekStart, setWeekStart] = useState(() => mondayOf(initialDate ?? new Date()));
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const days = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart]
  );
  const from = toKey(days[0]);
  const to = toKey(days[6]);

  // Se recarga al cambiar de semana o cuando el CRUD modifica las tareas (refreshKey)
  useEffect(() => {
    let ignore = false;
    const load = async () => {
      try {
        const data = await api.getTasksByRange(from, to);
        if (!ignore) {
          setTasks(data ?? []);
          setError("");
        }
      } catch (e) {
        if (!ignore) setError(e.message);
      }
    };
    load();
    return () => {
      ignore = true;
    };
  }, [from, to, refreshKey]);

  const byDay = (key) => tasks.filter((t) => t.dueDate?.slice(0, 10) === key);

  return (
    <section className="calendar card" aria-label="Calendario semanal">
      <h3 className="calendar-title">{weekTitle(days[0], days[6])}</h3>
      {error && <p className="error">{error}</p>}

      <div className="calendar-grid">
        {days.map((day, i) => {
          const key = toKey(day);
          return (
            <div key={key} className="calendar-day" data-testid={`day-${key}`}>
              <div className="calendar-day-head">
                <span>{DAY_NAMES[i]}</span>
                <span className="calendar-day-num">{day.getDate()}</span>
              </div>
              {byDay(key).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`calendar-task ${t.status}`}
                  onClick={() => onSelect?.(t)}
                  title="Editar tarea"
                >
                  <strong>{t.title}</strong>
                  <span className={`badge ${t.priority}`}>{t.priority}</span>
                  <span className={`status ${t.status}`}>{t.status}</span>
                </button>
              ))}
            </div>
          );
        })}
      </div>

      <div className="actions calendar-nav">
        <button type="button" className="btn" onClick={() => setWeekStart(addDays(weekStart, -7))}>
          &lt; Semana anterior
        </button>
        <button type="button" className="btn" onClick={() => setWeekStart(addDays(weekStart, 7))}>
          Semana siguiente &gt;
        </button>
      </div>
    </section>
  );
}
