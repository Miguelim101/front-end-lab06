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
