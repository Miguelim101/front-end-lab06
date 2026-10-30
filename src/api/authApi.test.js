import { describe, it, expect, vi, afterEach } from "vitest";
import { register } from "./authApi";

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
