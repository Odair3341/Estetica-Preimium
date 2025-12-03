export const API_BASE = (import.meta as any)?.env?.VITE_API_URL || 'http://localhost:3001';

export const apiUrl = (path: string) => `${API_BASE}${path.startsWith('/api') ? '' : '/api'}${path.startsWith('/api') ? path.replace('/api', '') : path}`;

export const get = (path: string, init?: RequestInit) => fetch(apiUrl(path), init);
export const post = (path: string, body: any, init?: RequestInit) => fetch(apiUrl(path), {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
  body: JSON.stringify(body),
  ...init,
});
