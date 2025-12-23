'use client';

import z from "zod";

export enum CrudKeys {
  _EMAIL = 'email',
  _PASSWORD = 'password',
  _USERNAME = 'userName',
  _CONFIRM_PASSWORD = 'confirmPassword',
};

export type SignUpFormValues = {
  [CrudKeys._EMAIL]: string,
  [CrudKeys._PASSWORD]: string,
  [CrudKeys._USERNAME]: string,
  [CrudKeys._CONFIRM_PASSWORD]: string,
};

export const initialValues = {
  [CrudKeys._EMAIL]: '',
  [CrudKeys._PASSWORD]: '',
  [CrudKeys._USERNAME]: '',
  [CrudKeys._CONFIRM_PASSWORD]: '',
};

export const formSchema = z
  .object({
    [CrudKeys._EMAIL]: z.email("Invalid email address")
      .min(1, "Email is required"),
    [CrudKeys._PASSWORD]: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    [CrudKeys._USERNAME]: z
      .string()
      .min(1, "Username is required"),
    [CrudKeys._CONFIRM_PASSWORD]: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters"),
  })
  .refine(
    (data) => data[CrudKeys._PASSWORD] === data[CrudKeys._CONFIRM_PASSWORD],
    {
      message: "Confirm Password do not match",
      path: [CrudKeys._CONFIRM_PASSWORD],
    }
  );
