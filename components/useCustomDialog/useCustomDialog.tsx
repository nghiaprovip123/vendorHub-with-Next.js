import { useState, useCallback } from "react";

export const useCustomDialog = () => {
  const [config, setConfig] = useState({
    open: false,
    title: "",
    content: null as React.ReactNode,
    confirmText: "",
    cancelText: "",
    onConfirm: undefined as (() => void) | undefined,
    onCancel: undefined as (() => void) | undefined,
    size: "md" as "sm" | "md" | "lg" | "xl",
  });

  const open = useCallback((options: Partial<typeof config>) => {
    setConfig((prev) => ({
      ...prev,
      ...options,
      open: true,
    }));
  }, []);

  const close = useCallback(() => {
    setConfig((prev) => ({ ...prev, open: false }));
  }, []);

  return {
    config,
    open,
    close,
  };
}
