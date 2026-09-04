import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MoreVertical } from "lucide-react";
import { useClickOutside } from "@/hooks/useClickOutside";

interface DropdownItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  danger?: boolean;
}

export function Dropdown({ items }: { items: DropdownItem[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));

  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }} className="rounded-full p-1.5 text-on-surface-variant hover:bg-surface-container-highest">
        <MoreVertical className="h-4 w-4" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 top-full z-30 mt-1 w-44 overflow-hidden rounded-xl border border-surface-container-high bg-surface-container-lowest shadow-lg"
          >
            {items.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={(e) => { e.stopPropagation(); setOpen(false); item.onClick(); }}
                className={`flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm ${item.danger ? "text-error hover:bg-error-container/40" : "text-on-surface-variant hover:bg-surface-container-low"}`}
              >
                <item.icon className="h-4 w-4" /> {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}