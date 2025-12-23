/* eslint-disable @typescript-eslint/no-explicit-any */
const BE_API = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
  userName?: string;
};

const login = async (payload: LoginPayload): Promise<any> => {
  const response = await fetch(`${BE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data;
};

const register = async (payload: RegisterPayload): Promise<any> => {
  const response = await fetch(`${BE_API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }

  return data;
};

export const authService = {
  login,
  register,
};
