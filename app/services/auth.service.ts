/* eslint-disable @typescript-eslint/no-explicit-any */
const BE_API = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export type LoginPayload = {
  email: string;
  password: string;
};

export const authService = {
  async login(payload: LoginPayload): Promise<any> {
    const response = await fetch(`${BE_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    };

    return data;
  },
};
