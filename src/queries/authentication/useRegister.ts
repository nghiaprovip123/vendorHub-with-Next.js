/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useMutation } from "@tanstack/react-query";

import { authService } from "@/app/services";

type Props = {
  onSuccess?: (data?: any) => void;
  onError?: (error?: Error) => void;
};

export const useRegister = (options: Props) => {
  const mutation = useMutation({
    mutationFn: authService.register,

    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },

    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });

  const { mutate: register, isPending } = mutation;

  return {
    register,
    isLoading: isPending,
  };
};
