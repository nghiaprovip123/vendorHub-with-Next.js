'use client';

import z from "zod";

export enum CrudKeys {
  _EMAIL = 'email',
  _PASSWORD = 'password',
};

export type LoginFormValues = {
  email: string;
  password: string;
};

export const formSchema = z.object({
  email: z
    .email("Invalid email address")
    .min(1, "Email is required"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});
