import { describe, it, expect, vi, afterEach } from "vitest";
import { register, login, me } from "./authApi";
import { setToken, clearToken } from "./session";

const jsonResponse = (status, body) =>
  Promise.resolve({ ok: status < 400, status, json: () => Promise.resolve(body) });

describe("authApi.register", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("debería hacer POST a /auth/register con el JSON del usuario", async () => {
    const fetchMock = vi.fn(() => jsonResponse(201, { id: 1, email: "ana@example.com", role: "USER" }));
    vi.stubGlobal("fetch", fetchMock);

    const user = await register({ name: "Ana", email: "ana@example.com", password: "ContrasenaDemo123!" });

    expect(user.role).toBe("USER");
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("http://localhost:8080/api/v1/auth/register");
    expect(options.method).toBe("POST");
    expect(JSON.parse(options.body)).toEqual({ name: "Ana", email: "ana@example.com", password: "ContrasenaDemo123!" });
  });

  it("debería lanzar el mensaje del back-end cuando responde 409", async () => {
    vi.stubGlobal("fetch", vi.fn(() => jsonResponse(409, { status: 409, message: "An account with email ana@example.com already exists" })));

    await expect(register({ name: "Ana", email: "ana@example.com", password: "x".repeat(8) }))
      .rejects.toThrow("already exists");
  });
});

describe("authApi.login / me", () => {
  afterEach(() => {
    clearToken();
    vi.unstubAllGlobals();
  });

  it("debería hacer POST a /auth/login y devolver el token", async () => {
    const fetchMock = vi.fn(() => jsonResponse(200, { tokenType: "Bearer", accessToken: "a.b.c", expiresIn: 1800 }));
    vi.stubGlobal("fetch", fetchMock);

    const token = await login({ email: "ana@example.com", password: "ContrasenaDemo123!" });

    expect(token.accessToken).toBe("a.b.c");
    expect(fetchMock.mock.calls[0][0]).toBe("http://localhost:8080/api/v1/auth/login");
    expect(fetchMock.mock.calls[0][1].method).toBe("POST");
  });

  it("debería lanzar el mensaje del back-end cuando el login responde 401", async () => {
    vi.stubGlobal("fetch", vi.fn(() => jsonResponse(401, { status: 401, message: "Invalid email or password" })));

    await expect(login({ email: "ana@example.com", password: "mala" })).rejects.toThrow("Invalid email or password");
  });

  it("debería consultar /users/me con el token en memoria", async () => {
    const fetchMock = vi.fn(() => jsonResponse(200, { id: 1, name: "Ana", role: "USER" }));
    vi.stubGlobal("fetch", fetchMock);
    setToken("a.b.c");

    const user = await me();

    expect(user.name).toBe("Ana");
    expect(fetchMock.mock.calls[0][0]).toBe("http://localhost:8080/api/v1/users/me");
    expect(fetchMock.mock.calls[0][1].headers.Authorization).toBe("Bearer a.b.c");
  });
});
