import { useState } from "react";
import { m, AnimatePresence } from "motion/react";
import { Filter, Search, X } from "lucide-react";
import { useAccounts } from "@/hooks/useAccounts";
import { useCategories } from "@/hooks/useCategories";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import type { HistoryFilters, Props } from "@/types/history";


const EMPTY_FILTERS: HistoryFilters = {};

export function HistoryFilterBar({ search, onSearchChange, filters, onFiltersChange }: Props) {
  const [showFilters, setShowFilters] = useState(false);
  const { data: accounts } = useAccounts();
  const { data: categories } = useCategories("EXPENSE");

  const activeCount = Object.values(filters).filter((v) => v !== undefined && v !== "").length;

  const update = (patch: Partial<HistoryFilters>) => onFiltersChange({ ...filters, ...patch });

  return (
    <div className="card mb-6">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-outline-variant" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari transaksi, kategori, atau catatan..."
            className="w-full rounded-full border border-outline-variant/30 bg-surface-container-lowest py-2.5 pl-10 pr-4 text-body-md focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <button
          type="button"
          onClick={() => setShowFilters((v) => !v)}
          className={`relative flex shrink-0 items-center gap-2 cursor-pointer rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
            showFilters || activeCount > 0 ? "border-primary bg-primary-container/10 text-primary" : "border-outline-variant/40 text-on-surface-variant hover:bg-surface-container-low"
          }`}
        >
          <Filter className="h-4 w-4" /> Filter
          {activeCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-on-primary">{activeCount}</span>
          )}
        </button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-4 grid grid-cols-1 gap-3 border-t border-surface-container-high pt-4 min-[700px]:grid-cols-2 min-[1100px]:grid-cols-4">
              <div>
                <label className="label-base">Dari Tanggal</label>
                <Input type="date" value={filters.from ?? ""} onChange={(e) => update({ from: e.target.value || undefined })} />
              </div>
              <div>
                <label className="label-base">Sampai Tanggal</label>
                <Input type="date" value={filters.to ?? ""} onChange={(e) => update({ to: e.target.value || undefined })} />
              </div>

              <div>
                <label className="label-base">Kategori</label>
                <Select value={filters.categoryId ?? ""} onChange={(e) => update({ categoryId: e.target.value || undefined })}>
                  <option value="">Semua kategori</option>
                  {categories?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </Select>
              </div>

              <div>
                <label className="label-base">Dompet</label>
                <Select value={filters.accountId ?? ""} onChange={(e) => update({ accountId: e.target.value || undefined })}>
                  <option value="">Semua dompet</option>
                  {accounts?.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                </Select>
              </div>

              <div>
                <label className="label-base">Nominal Min</label>
                <Input type="number" placeholder="0" value={filters.minAmount ?? ""} onChange={(e) => update({ minAmount: e.target.value ? Number(e.target.value) : undefined })} />
              </div>
              <div>
                <label className="label-base">Nominal Max</label>
                <Input type="number" placeholder="Tanpa batas" value={filters.maxAmount ?? ""} onChange={(e) => update({ maxAmount: e.target.value ? Number(e.target.value) : undefined })} />
              </div>

              {activeCount > 0 && (
                <button
                  type="button"
                  onClick={() => onFiltersChange(EMPTY_FILTERS)}
                  className="flex items-center justify-center gap-1.5 cursor-pointer rounded-xl border border-outline-variant/40 py-2 text-sm text-on-surface-variant hover:bg-surface-container-low min-[1100px]:col-span-2"
                >
                  <X className="h-4 w-4" /> Hapus Semua Filter
                </button>
              )}
            </div>

            {filters.categoryId && (
              <p className="mt-3 text-xs text-on-surface-variant">
                * Transfer disembunyikan sementara — filter Kategori cuma berlaku untuk Transaksi (Transfer tidak punya kategori)
              </p>
            )}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}