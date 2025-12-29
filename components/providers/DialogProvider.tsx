'use client';

import { createContext, useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

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
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle 
} from "@/components/ui/drawer";

type DialogSize = "sm" | "md" | "lg" | "xl";

type DrawerSide = "right" | "left" | "bottom" | "top";

type OpenDialogOptions = {
  type: 'alert' | 'dialog' | 'drawer';
  title?: string;
  content?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;

  size?: DialogSize;
  side?: DrawerSide;

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

      {options?.type === 'alert' && (
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
      )}
      {options?.type === 'dialog' && (
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
      {options?.type === 'drawer' && (
        <Drawer open={open} onOpenChange={setOpen} direction={options?.side ?? 'top'}>
          <DrawerContent 
            className='flex flex-col'
            style={{ padding: '16px 24px' }}
          >
            <DrawerHeader>
              {options?.title ? (
                <DrawerTitle>{options.title}</DrawerTitle>
              ) : (
                <VisuallyHidden>
                  <DrawerTitle>Drawer</DrawerTitle>
                </VisuallyHidden>
              )}
            </DrawerHeader>

            <div className="flex-1 overflow-auto pt-4">
              {options?.content}
            </div>

            {(options?.confirmText || options?.cancelText) && (
              <div className="border-t px-4 py-3 flex justify-end gap-2">
                {options?.cancelText && (
                  <Button onClick={handleCancelDialog}>
                    {options.cancelText}
                  </Button>
                )}
                {options?.confirmText && (
                  <Button onClick={handleConfirmDialog}>
                    {options.confirmText}
                  </Button>
                )}
              </div>
            )}

            <div className="flex justify-center mt-4!">
              <div className="h-2 w-40 rounded-full bg-black/60" />
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </DialogContext.Provider>
  )
};
