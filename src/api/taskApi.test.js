import { describe, it, expect, vi, afterEach } from "vitest";
import { getTasks, createTask } from "./taskApi";
import { setToken, clearToken } from "./session";

const jsonResponse = (status, body) =>
  Promise.resolve({ ok: status < 400, status, json: () => Promise.resolve(body) });

describe("taskApi", () => {
  afterEach(() => {
    clearToken();
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
});
