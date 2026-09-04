import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import { CategoryGroupCard } from "@/components/categories/CategoryGroupCard";
import { CategorySkeleton } from "@/components/categories/CategorySkeleton";
import { useUIStore } from "@/store/uiStore";
import { cn } from "@/lib/utils";

type Tab = "ALL" | "EXPENSE" | "INCOME";

export function CategoryPage() {
  const [tab, setTab] = useState<Tab>("ALL");
  const [search, setSearch] = useState("");
  const { data: categories, isLoading } = useCategories();
  const openModal = useUIStore((s) => s.openModal);

  const filtered = useMemo(() => {
    if (!categories) return [];
    const q = search.trim().toLowerCase();
    return q
      ? categories.filter((c) => c.name.toLowerCase().includes(q))
      : categories;
  }, [categories, search]);

  const expenseCategories = filtered.filter((c) => c.type === "EXPENSE");
  const incomeCategories = filtered.filter((c) => c.type === "INCOME");

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 min-[700px]:flex-row min-[700px]:items-center min-[700px]:justify-between">
        <div className="flex w-fit gap-1 rounded-full border border-outline-variant/40 bg-surface-container-lowest p-1">
          {(["ALL", "EXPENSE", "INCOME"] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "rounded-full px-4 py-1.5 cursor-pointer text-sm font-medium transition-colors",
                tab === t
                  ? "bg-primary text-on-primary"
                  : "text-on-surface-variant hover:bg-surface-container-low",
              )}
            >
              {t === "ALL"
                ? "Semua"
                : t === "EXPENSE"
                  ? "Pengeluaran"
                  : "Pemasukan"}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-outline-variant" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari kategori..."
              className="w-full rounded-full border border-outline-variant/30 bg-surface-container-lowest py-2 pl-10 pr-4 text-body-md focus:border-primary focus:ring-1 focus:ring-primary min-[700px]:w-56"
            />
          </div>
          <button
            type="button"
            onClick={() => openModal("add-category")}
            className="btn-primary flex shrink-0 items-center gap-2 py-2.5 text-sm"
          >
            <Plus className="h-4 w-4" /> Tambah Kategori
          </button>
        </div>
      </div>

      {isLoading ? (
        <CategorySkeleton />
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {(tab === "ALL" || tab === "EXPENSE") && (
            <CategoryGroupCard
              type="EXPENSE"
              categories={expenseCategories}
              delay={0}
            />
          )}
          {(tab === "ALL" || tab === "INCOME") && (
            <CategoryGroupCard
              type="INCOME"
              categories={incomeCategories}
              delay={0.05}
            />
          )}
        </div>
      )}
    </>
  );
}
