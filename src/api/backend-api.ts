export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username?: string;
    email?: string;
    name?: string;
  };
}

const API_BASE =
  (import.meta as any).env?.VITE_BACKEND_API_BASE?.replace(/\/+$/, "") ||
  "https://7pv2etexu0.execute-api.eu-west-1.amazonaws.com/prod/auth/signin";

export async function login(req: LoginRequest): Promise<LoginResponse> {
  const resp = await fetch(`${API_BASE}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(err || "Login failed");
  }

  const json = await resp.json();
  return json as LoginResponse;
}

export async function refreshToken(refreshToken: string) {
  const resp = await fetch(`${API_BASE}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });
  if (!resp.ok) throw new Error("Refresh failed");
  return resp.json();
}
