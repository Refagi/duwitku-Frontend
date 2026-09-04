import { forwardRef, useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Input } from "./Input";

type PasswordInputProps = Omit<React.ComponentProps<typeof Input>, "icon" | "type" | "rightElement">;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
  const [show, setShow] = useState(false);

  return (
    <Input
      ref={ref}
      icon={Lock}
      type={show ? "text" : "password"}
      rightElement={
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShow((s) => !s)}
          className="text-on-surface-variant/60 transition-colors hover:text-on-surface-variant"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      }
      {...props}
    />
  );
});
PasswordInput.displayName = "PasswordInput";