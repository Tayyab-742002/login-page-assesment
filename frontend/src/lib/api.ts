export const API_BASE_URL =
  (import.meta as any).env?.VITE_API_URL || "http://localhost:4000";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "content-type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    let body: any;
    try {
      body = await res.json();
    } catch {
      body = await res.text();
    }
    const message =
      typeof body === "string" ? body : body?.error || "Request failed";
    throw new Error(message);
  }
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return text as any;
  }
}

export const AuthAPI = {
  signup(data: { email: string; password: string; name?: string }) {
    return apiFetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  login(data: { email: string; password: string }) {
    return apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
