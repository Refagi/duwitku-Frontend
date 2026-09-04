import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  message: string;
  compact?: boolean;
}

export function EmptyState({ icon: Icon, message, compact }: EmptyStateProps) {
  if (compact) {
    return <p className="py-8 text-center text-body-md text-on-surface-variant">{message}</p>;
  }
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      {Icon && (
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-container-highest text-on-surface-variant">
          <Icon className="h-7 w-7" />
        </div>
      )}
      <p className="text-body-md text-on-surface-variant">{message}</p>
    </div>
  );
}