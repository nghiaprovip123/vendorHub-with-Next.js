'use client';

import z from "zod";

export enum CrudKeys {
  _EMAIL = 'email',
  _PASSWORD = 'password',
};

export type LoginFormValues = {
  [CrudKeys._EMAIL]: string,
  [CrudKeys._PASSWORD]: string,
};

export const initialValues = {
  [CrudKeys._EMAIL]: '',
  [CrudKeys._PASSWORD]: '',
};

export const formSchema = z.object({
  email: z
    .email("Invalid email address")
    .min(1, "Email is required"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});
