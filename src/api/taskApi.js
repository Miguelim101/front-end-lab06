const API_URL = "http://localhost:8080/api/v1/tasks";

async function request(path = "", options = {}) {
    const res = await fetch(API_URL + path, {
        headers: { "Content-Type": "application/json" },
        ...options,
    });
    if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
    return res.status === 204 ? null : res.json();
}

export async function getTasks() {
    return request();
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