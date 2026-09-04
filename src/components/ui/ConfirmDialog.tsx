import { AlertTriangle, Loader2 } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

interface ConfirmDialogProps {
  title: string;
  description: string;
  confirmLabel?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ title, description, confirmLabel = "Hapus", isLoading, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <Modal open onClose={onCancel} title={title}>
      <div className="flex gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-error-container/40 text-error">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <p className="text-body-md text-on-surface-variant">{description}</p>
      </div>
      <div className="mt-6 flex gap-3">
        <button type="button" onClick={onCancel} className="btn-secondary flex-1 py-2.5 text-sm">Batal</button>
        <button type="button" onClick={onConfirm} disabled={isLoading} className="btn-danger flex flex-1 items-center justify-center gap-2 py-2.5 text-sm">
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}