'use client';

import { useContext } from "react";

import { DialogContext } from "../providers";

export const useDialog = () => {
  const ctx = useContext(DialogContext);
  
  if (!ctx) {
    throw new Error("useDialog must be used inside DialogProvider");
  }

  return {
    openDialog: ctx.open,
    closeDialog: ctx.close,
  };
};
