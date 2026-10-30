import { authHeader } from "./session";

const API_URL = "http://localhost:8080/api/v1";

async function request(path, options = {}) {
    const res = await fetch(API_URL + path, {
        ...options,
        headers: { "Content-Type": "application/json", ...options.headers },
    });
    if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message ?? `Error HTTP ${res.status}`);
    }
    return res.json();
}

// HU-SEG-01: crea una cuenta con rol USER. La respuesta no incluye la contraseña
export async function register(user) {
    return request("/auth/register", { method: "POST", body: JSON.stringify(user) });
}

// HU-SEG-02: valida credenciales y devuelve { tokenType, accessToken, expiresIn }
export async function login(credentials) {
    return request("/auth/login", { method: "POST", body: JSON.stringify(credentials) });
}

// HU-SEG-02: perfil del usuario autenticado (requiere el token)
export async function me() {
    return request("/users/me", { headers: authHeader() });
}
