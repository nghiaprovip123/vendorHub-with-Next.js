import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  dialog: ReturnType<typeof import('./useCustomDialog').useCustomDialog>,
};

export const CustomDialog = ({ dialog }: Props) => {
  const { config, close } = dialog;

  const handleConfirm = () => {
    config.onConfirm?.();
    close();
  };

  const handleCancel = () => {
    config.onCancel?.();
    close();
  };

  return (
    <Dialog open={config.open} onOpenChange={close}>
      <DialogContent className={{
        sm: "sm:max-w-[400px]",
        md: "sm:max-w-[600px]",
        lg: "sm:max-w-[800px]",
        xl: "sm:max-w-[1000px]"
      }[config.size]}>
        <DialogHeader>
          <DialogTitle style={{ fontSize: '20px' }}>{config.title}</DialogTitle>
        </DialogHeader>

        <div className="py-2">{config.content}</div>

        <DialogFooter>
          {(config.cancelText || config.cancelText !== '') && (
            <Button onClick={handleCancel}>
              {config.cancelText}
            </Button>
          )}
          {(config.confirmText || config.confirmText !== '') && (
            <Button onClick={handleConfirm}>
              {config.confirmText}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
