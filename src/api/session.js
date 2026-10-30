// LAB 7: el JWT vive SOLO en memoria (variable del módulo), nunca en localStorage ni cookies.
// Consecuencia aceptada por el laboratorio: al recargar la página se pierde y hay que iniciar sesión de nuevo.
let accessToken = null;

export function getToken() {
    return accessToken;
}

export function setToken(token) {
    accessToken = token;
}

export function clearToken() {
    accessToken = null;
}

// Cabecera para las peticiones protegidas: Authorization: Bearer <JWT>
export function authHeader() {
    return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
}

// HU-SEG-06: quién reacciona cuando una petición protegida responde 401 (token expirado o inválido).
// AuthContext registra aquí la limpieza de la sesión y el regreso al inicio de sesión.
let onUnauthorized = null;

export function setUnauthorizedHandler(handler) {
    onUnauthorized = handler;
}

export function notifyUnauthorized() {
    clearToken();
    onUnauthorized?.();
}
