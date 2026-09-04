import { forwardRef } from "react";
import clsx from "clsx";
import type { LucideIcon } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  error?: boolean;
  rightElement?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon: Icon, error, rightElement, className, ...props }, ref) => (
    <div className="relative">
      {Icon && (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60">
          <Icon className="h-4 w-4" />
        </span>
      )}
      <input
        ref={ref}
        className={clsx(
          "input-base",
          Icon && "pl-9",
          rightElement && "pr-10",
          error && "border-error focus:border-error focus:ring-error/20",
          className,
        )}
        {...props}
      />
      {rightElement && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</span>
      )}
    </div>
  ),
);
Input.displayName = "Input";