import { useCallback, useEffect, useState } from "react";
import * as api from "../../../api/taskApi";

const NEXT = { PENDING: "IN_PROGRESS", IN_PROGRESS: "COMPLETED", COMPLETED: "PENDING" };

export default function useTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const loadTasks = useCallback(async () => {
        setLoading(true);
        try {
            setTasks(await api.getTasks());
            setError("");
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    const run = async (fn) => {
        try {
            await fn();
            await loadTasks();
        } catch (e) {
            setError(e.message);
        }
    };

    const addTask = (task) => run(() => api.createTask(task));
    const editTask = (id, task) => run(() => api.updateTask(id, task));
    const removeTask = (id) => run(() => api.deleteTask(id));

    const changeStatus = (task) =>
        editTask(task.id, { ...task, status: NEXT[task.status] });

    return { tasks, loading, error, loadTasks, addTask, editTask, removeTask, changeStatus };
}