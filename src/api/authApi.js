const AUTH_URL = "http://localhost:8080/api/v1/auth";

async function request(path, options = {}) {
    const res = await fetch(AUTH_URL + path, {
        headers: { "Content-Type": "application/json" },
        ...options,
    });
    if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message ?? `Error HTTP ${res.status}`);
    }
    return res.json();
}

// HU-SEG-01: crea una cuenta con rol USER. La respuesta no incluye la contraseña
export async function register(user) {
    return request("/register", { method: "POST", body: JSON.stringify(user) });
}
