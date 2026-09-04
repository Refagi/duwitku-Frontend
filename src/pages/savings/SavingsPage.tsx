import { AnimatePresence, m } from "motion/react";
import { Plus } from "lucide-react";
import { useSavings } from "@/hooks/useSavings";
import { SavingsCard } from "@/components/savings/SavingsCard";
import { SavingsSkeleton } from "@/components/savings/SavingsSkeleton";
import { useUIStore } from "@/store/uiStore";

export function SavingsPage() {
  const { data: goals, isLoading } = useSavings();
  const openModal = useUIStore((s) => s.openModal);

  return (
    <>
      <p className="mb-6 text-body-md text-on-surface-variant">Pantau dan kelola target keuanganmu.</p>
      {isLoading ? (
        <SavingsSkeleton />
      ) : <m.div layout className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {goals?.map((goal, i) => <SavingsCard key={goal.id} goal={goal} index={i} />)}
        </AnimatePresence>
        <m.button type="button" onClick={() => openModal("add-savings")} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="flex min-h-45 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-outline-variant/50 text-on-surface-variant transition-colors hover:bg-surface-container-low">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-high"><Plus className="h-5 w-5" /></div>
          <span className="text-body-md font-medium">Rencana Baru</span>
        </m.button>
      </m.div>}
    </>
  );
}