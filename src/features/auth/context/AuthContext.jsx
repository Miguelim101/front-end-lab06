import { useCallback, useMemo, useState } from "react";
import * as authApi from "../../../api/authApi";
import * as session from "../../../api/session";
import { AuthContext } from "./authContext";

// LAB 7: estado de autenticación de la app. El token se guarda en memoria (api/session.js)
// y el usuario autenticado en el estado de React; nada se persiste en el navegador.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = useCallback(async (credentials) => {
    const { accessToken } = await authApi.login(credentials);
    session.setToken(accessToken);
    try {
      setUser(await authApi.me());
    } catch (e) {
      session.clearToken();
      throw e;
    }
  }, []);

  const logout = useCallback(() => {
    session.clearToken();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isAuthenticated: user !== null, login, logout, register: authApi.register }),
    [user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
