import { useState } from "react";
import { m } from "motion/react";
import { ArrowDownRight, ArrowUpRight, Plus } from "lucide-react";
import { CategoryRow } from "./CategoryRow";
import { EmptyState } from "@/components/ui/EmptyState";
import { useUIStore } from "@/store/uiStore";
import type { Category, CategoryType } from "@/types/category";

const PREVIEW_COUNT = 3;

export function CategoryGroupCard({ type, categories, delay = 0 }: { type: CategoryType; categories: Category[]; delay?: number }) {
  const [expanded, setExpanded] = useState(false);
  const openModal = useUIStore((s) => s.openModal);
  const isExpense = type === "EXPENSE";
  const visible = expanded ? categories : categories.slice(0, PREVIEW_COUNT);
  const hasMore = categories.length > PREVIEW_COUNT;

  return (
    <m.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay }} className="card">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isExpense ? <ArrowDownRight className="h-5 w-5 text-error" /> : <ArrowUpRight className="h-5 w-5 text-primary" />}
          <h3 className="text-title-lg text-on-surface">{isExpense ? "Pengeluaran" : "Pemasukan"}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-surface-container-low px-2.5 py-1 text-label-sm text-on-surface-variant">{categories.length} Kategori</span>
          <button type="button" onClick={() => openModal("add-category", { defaultType: type })} className="rounded-full p-1.5 text-on-surface-variant hover:bg-surface-container-high" title="Tambah">
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {categories.length === 0 ? (
        <EmptyState compact message={`Belum ada kategori ${isExpense ? "pengeluaran" : "pemasukan"}`} />
      ) : (
        <div className="divide-y divide-surface-container-high">
          {visible.map((cat, i) => <CategoryRow key={cat.id} category={cat} index={i} />)}
        </div>
      )}

      {hasMore && (
        <button type="button" onClick={() => setExpanded((v) => !v)} className="mt-3 w-full text-center text-body-md font-medium text-primary hover:underline">
          {expanded ? "Sembunyikan" : `Lihat semua ${categories.length} kategori`}
        </button>
      )}
    </m.div>
  );
}