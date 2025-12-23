/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useMutation } from "@tanstack/react-query";

import { authService } from "@/app/services";

type Props = {
  onSuccess?: (data?: any) => void;
  onError?: (error?: Error) => void;
};

export const useLogin = (options: Props) => {
  const mutation = useMutation({
    mutationFn: authService.login,

    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },

    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });

  const { mutate: login, isPending } = mutation;

  return {
    login,
    isLoading: isPending,
  };
};
