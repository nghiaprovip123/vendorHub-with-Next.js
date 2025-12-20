'use client';

import z from "zod";

export enum CrudKeys {
  _EMAIL = 'email',
  _USERNAME = 'username',
  _PASSWORD = 'password',
  _CONFIRM_PASSWORD = 'confirmPassword',
  _OTP = 'otp',
};

export type ForgetPasswordFormValues = {
  [CrudKeys._EMAIL]: string,
};

export type NewPasswordFormValues = {
  [CrudKeys._PASSWORD]: string,
  [CrudKeys._CONFIRM_PASSWORD]: string,
};

export const initialForgetPasswordValues = {
  [CrudKeys._EMAIL]: '',
};

export const initialNewPasswordValues = {
  [CrudKeys._PASSWORD]: '',
  [CrudKeys._CONFIRM_PASSWORD]: '',
};

export const formForgetPasswordSchema = z.object({
  email: z
    .email("Invalid email address")
    .min(1, "Email is required"),
});

export const formNewPasswordSchema = z.object({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});
