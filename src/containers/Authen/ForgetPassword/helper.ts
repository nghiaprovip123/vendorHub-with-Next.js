'use client';

import z from "zod";

export enum CrudKeys {
  _EMAIL = 'email',
};

export type ForgetPasswordFormValues = {
  [CrudKeys._EMAIL]: string,
};

export const initialValues = {
  [CrudKeys._EMAIL]: '',
};

export const formSchema = z.object({
  email: z
    .email("Invalid email address")
    .min(1, "Email is required"),
});
