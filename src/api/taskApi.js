import { authHeader } from "./session";

const API_URL = "http://localhost:8080/api/v1/tasks";

async function request(path = "", options = {}) {
    const res = await fetch(API_URL + path, {
        // LAB 7: toda petición de tareas viaja con Authorization: Bearer <JWT>
        headers: { "Content-Type": "application/json", ...authHeader() },
        ...options,
    });
    if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message ?? `Error HTTP ${res.status}`);
    }
    return res.status === 204 ? null : res.json();
}

export async function getTasks() {
    return request();
}

// BONUS calendario: tareas con dueDate entre from y to (formato yyyy-MM-dd, ambos incluidos)
export async function getTasksByRange(from, to) {
    return request(`?from=${from}&to=${to}`);
}

export async function getTask(id) {
    return request(`/${id}`);
}

export async function createTask(task) {
    return request("", { method: "POST", body: JSON.stringify(task) });
}

export async function updateTask(id, task) {
    return request(`/${id}`, { method: "PUT", body: JSON.stringify(task) });
}

export async function deleteTask(id) {
    return request(`/${id}`, { method: "DELETE" });
}