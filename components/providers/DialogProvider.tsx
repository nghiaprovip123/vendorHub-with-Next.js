'use client';

import { createContext, useState } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui";

type DialogSize = "sm" | "md" | "lg" | "xl";

type OpenDialogOptions = {
  type: 'alert' | 'dialog';
  title?: string;
  content?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  size?: DialogSize;
  onConfirm?: () => void;
  onCancel?: () => void;
};

type DialogContextType = {
  open: (options: OpenDialogOptions) => void,
  close: () => void,
};

export const DialogContext = createContext<DialogContextType | null>(null);

export const DialogProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<OpenDialogOptions | null>(null);

  const handleOpenDialog = (opts: OpenDialogOptions) => {
    setOptions(opts);
    setOpen(true);
  };

  const handleConfirmDialog = () => {
    options?.onConfirm?.();
    setOptions(null);
    setOpen(false);
  };

  const handleCancelDialog = () => {
    options?.onCancel?.();
    setOptions(null);
    setOpen(false);
  };

  const sizeClass = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-lg",
    lg: "sm:max-w-2xl",
    xl: "sm:max-w-[1000px]",
  }[options?.size ?? "md"];

  return (
    <DialogContext.Provider
      value={{
        open: handleOpenDialog,
        close: handleCancelDialog,
      }}
    >
      {children}

      {options?.type === 'alert' ? (
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent className={sizeClass}>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {options?.title}
                </AlertDialogTitle>
              </AlertDialogHeader>

            <div className="py-2">{options?.content}</div>

            <AlertDialogFooter>
              {options?.cancelText && (
                <AlertDialogCancel
                  onClick={handleCancelDialog}
                >
                  {options?.cancelText ?? "Cancel"}
                </AlertDialogCancel>
              )}

              {options?.confirmText && (
                <AlertDialogAction
                  onClick={handleConfirmDialog}
                >
                  {options?.confirmText ?? "Confirm"}
                </AlertDialogAction>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className={sizeClass}>
            <DialogHeader>
              <DialogTitle style={{ fontSize: '20px' }}>{options?.title}</DialogTitle>
            </DialogHeader>

            <div className="py-2">{options?.content}</div>

            <DialogFooter>
              {(options?.cancelText && options?.cancelText !== '') && (
                <Button 
                  label={options?.cancelText}
                  onClick={handleCancelDialog}
                />
                
              )}
              {(options?.confirmText && options?.confirmText !== '') && (
                <Button 
                  label={options?.confirmText}
                  onClick={handleConfirmDialog}
                />
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}


    </DialogContext.Provider>
  )
};
