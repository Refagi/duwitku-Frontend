import { createElement } from "react";
import { m } from "motion/react";
import { Lock, Pencil, Trash2 } from "lucide-react";
import { getCategoryIcon, getCategoryColor } from "@/lib/categoryVisuals";
import { useUIStore } from "@/store/uiStore";
import type { Category } from "@/types/category";

export function CategoryRow({ category, index }: { category: Category; index: number }) {
  const openModal = useUIStore((s) => s.openModal);
  const Icon = getCategoryIcon(category.icon);
  const color = getCategoryColor(category.id);

  return (
    <m.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      className="group flex items-center justify-between py-3"
    >
      <div className="flex items-center gap-3">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${color.bg} ${color.text}`}>
           {Icon ? createElement(Icon, { className: "h-5 w-5" }) 
             : <span className="text-sm font-semibold">{category.name.charAt(0).toUpperCase()}</span>}
        </div>
        <div>
          <p className="text-body-md font-semibold text-on-surface">{category.name}</p>
          <p className="text-xs text-on-surface-variant">{category.isDefault ? "Default" : "Custom"}</p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {category.isDefault && <Lock className="h-4 w-4 text-outline-variant" aria-label="Kategori default" />}
        <div className="flex gap-1">
          <button type="button" onClick={() => openModal("edit-category", category)} className="rounded-full p-1.5 text-on-surface-variant hover:bg-surface-container-high" title="Edit">
            <Pencil className="h-4 w-4" />
          </button>
          {!category.isDefault && (
            <button
              type="button"
              onClick={() => openModal("confirm-delete", { type: "category", id: category.id, name: category.name })}
              className="rounded-full p-1.5 text-error hover:bg-error-container"
              title="Hapus"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </m.div>
  );
}