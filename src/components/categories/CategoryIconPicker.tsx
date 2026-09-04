import { CATEGORY_ICONS } from "@/lib/categoryVisuals";
import { cn } from "@/lib/utils";

export function CategoryIconPicker({ value, onChange }: { value?: string; onChange: (name: string) => void }) {
  return (
    <div className="grid grid-cols-6 gap-2">
      {Object.entries(CATEGORY_ICONS).map(([name, Icon]) => (
        <button
          key={name}
          type="button"
          onClick={() => onChange(name)}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
            value === name
              ? "border-primary bg-primary-container/10 text-primary"
              : "border-outline-variant/40 text-on-surface-variant hover:bg-surface-container-low",
          )}
        >
          <Icon className="h-4.5 w-4.5" />
        </button>
      ))}
    </div>
  );
}