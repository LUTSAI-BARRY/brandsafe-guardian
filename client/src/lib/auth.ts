import { apiRequest } from "./queryClient";

const TOKEN_KEY = "brandsafe_token";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export function getAuthHeaders(): HeadersInit {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const headers = {
    ...getAuthHeaders(),
    ...options.headers,
  };

  const res = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });

  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }

  return res;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export async function signup(data: {
  name: string;
  email: string;
  password: string;
  role?: string;
}): Promise<AuthResponse> {
  const res = await apiRequest("POST", "/api/auth/signup", data);
  const result = await res.json();
  setToken(result.token);
  return result;
}

export async function login(data: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const res = await apiRequest("POST", "/api/auth/login", data);
  const result = await res.json();
  setToken(result.token);
  return result;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const res = await authFetch("/api/auth/me");
    const data = await res.json();
    return data.user;
  } catch (err) {
    return null;
  }
}

export function logout(): void {
  removeToken();
}
