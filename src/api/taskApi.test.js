import { describe, it, expect, vi, afterEach } from "vitest";
import { getTasks, createTask } from "./taskApi";
import { setToken, clearToken, getToken, setUnauthorizedHandler } from "./session";

const jsonResponse = (status, body) =>
  Promise.resolve({ ok: status < 400, status, json: () => Promise.resolve(body) });

describe("taskApi", () => {
  afterEach(() => {
    clearToken();
    setUnauthorizedHandler(null);
    vi.unstubAllGlobals();
  });

  it("debería enviar Authorization: Bearer cuando hay sesión", async () => {
    const fetchMock = vi.fn(() => jsonResponse(200, []));
    vi.stubGlobal("fetch", fetchMock);
    setToken("header.payload.signature");

    await getTasks();

    expect(fetchMock.mock.calls[0][1].headers.Authorization).toBe("Bearer header.payload.signature");
  });

  it("debería conservar el token también en peticiones POST", async () => {
    const fetchMock = vi.fn(() => jsonResponse(201, { id: 1 }));
    vi.stubGlobal("fetch", fetchMock);
    setToken("abc.def.ghi");

    await createTask({ title: "Estudiar" });

    const options = fetchMock.mock.calls[0][1];
    expect(options.method).toBe("POST");
    expect(options.headers.Authorization).toBe("Bearer abc.def.ghi");
    expect(options.headers["Content-Type"]).toBe("application/json");
  });

  it("no debería enviar Authorization sin sesión", async () => {
    const fetchMock = vi.fn(() => jsonResponse(200, []));
    vi.stubGlobal("fetch", fetchMock);

    await getTasks();

    expect(fetchMock.mock.calls[0][1].headers.Authorization).toBeUndefined();
  });

  it("debería cerrar la sesión cuando una petición protegida responde 401", async () => {
    vi.stubGlobal("fetch", vi.fn(() => jsonResponse(401, { status: 401, message: "Invalid or expired token" })));
    const onUnauthorized = vi.fn();
    setUnauthorizedHandler(onUnauthorized);
    setToken("token.vencido.xyz");

    await expect(getTasks()).rejects.toThrow("Invalid or expired token");

    expect(onUnauthorized).toHaveBeenCalledTimes(1);
    expect(getToken()).toBeNull();
  });

  it("no debería cerrar la sesión por otros errores (por ejemplo 404)", async () => {
    vi.stubGlobal("fetch", vi.fn(() => jsonResponse(404, { status: 404, message: "Task with id 9 was not found" })));
    const onUnauthorized = vi.fn();
    setUnauthorizedHandler(onUnauthorized);
    setToken("a.b.c");

    await expect(getTasks()).rejects.toThrow("was not found");

    expect(onUnauthorized).not.toHaveBeenCalled();
    expect(getToken()).toBe("a.b.c");
  });
});
