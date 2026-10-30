import { useCallback, useEffect, useMemo, useState } from "react";
import * as authApi from "../../../api/authApi";
import * as session from "../../../api/session";
import { AuthContext } from "./authContext";

export const SESSION_EXPIRED = "Tu sesión expiró, inicia sesión nuevamente";

// LAB 7: estado de autenticación de la app. El token se guarda en memoria (api/session.js)
// y el usuario autenticado en el estado de React; nada se persiste en el navegador.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [notice, setNotice] = useState("");

  // HU-SEG-06: si una petición protegida responde 401 (token vencido o inválido), se limpia la
  // sesión y se vuelve al inicio de sesión con un aviso
  useEffect(() => {
    session.setUnauthorizedHandler(() => {
      setUser(null);
      setNotice(SESSION_EXPIRED);
    });
    return () => session.setUnauthorizedHandler(null);
  }, []);

  const login = useCallback(async (credentials) => {
    const { accessToken } = await authApi.login(credentials);
    session.setToken(accessToken);
    try {
      setUser(await authApi.me());
      setNotice("");
    } catch (e) {
      session.clearToken();
      throw e;
    }
  }, []);

  // Cierre de sesión del lado del cliente: borra el token de memoria y el usuario.
  // El JWT emitido no se revoca en el servidor; sigue siendo válido hasta su expiración.
  const logout = useCallback(() => {
    session.clearToken();
    setUser(null);
    setNotice("");
  }, []);

  const value = useMemo(
    () => ({ user, isAuthenticated: user !== null, notice, login, logout, register: authApi.register }),
    [user, notice, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
