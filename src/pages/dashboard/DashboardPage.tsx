import { m } from "motion/react";
import { useAccounts } from "@/hooks/useAccounts";
import { useDashboardSummary } from "@/hooks/useDashboard";
import { useSavings } from "@/hooks/useSavings";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { BalanceHeroCard } from "@/components/dashboard/BalanceHeroCard";
import { ExpenseChart } from "@/components/dashboard/ExpenseChart";
import { TopCategoriesList } from "@/components/dashboard/TopCategoriesList";
import { RecentTransactionsList } from "@/components/dashboard/RecentTransactionsList";
import { SpendingPaceCard } from "@/components/dashboard/SpendingPaceCard";
import { SavingsRateCard } from "@/components/savings/SavingsRateCard";
import { LowestBalanceCard } from "@/components/dashboard/LowestBalanceCard";

export function DashboardPage() {
  const { data: summary, isLoading } = useDashboardSummary();
  const { data: accounts } = useAccounts();
  const { data: goals } = useSavings();
  if (isLoading || !summary) return <DashboardSkeleton />;

  const {
    totalBalance,
    income,
    expense,
    topExpenses,
    recentTransactions,
  } = summary;

  const balanceStartOfMonth = totalBalance - (income - expense);
  const balanceTrendPercent =
    balanceStartOfMonth !== 0
      ? ((income - expense) / Math.abs(balanceStartOfMonth)) * 100
      : null;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <BalanceHeroCard
          totalBalance={totalBalance}
          trendPercent={balanceTrendPercent}
        />
        <SpendingPaceCard expense={expense} delay={0.05} />
        <SavingsRateCard goals={goals ?? []} delay={0.1} />
        <LowestBalanceCard accounts={accounts ?? []} delay={0.15} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="card lg:col-span-2"
        >
          <h3 className="text-title-lg mb-6 text-on-surface">
            Pengeluaran per Kategori
          </h3>
          <ExpenseChart data={topExpenses} />
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="card"
        >
          <h3 className="text-title-lg mb-6 text-on-surface">
            Kategori Terbesar
          </h3>
          <TopCategoriesList data={topExpenses} />
        </m.div>
      </div>

      <m.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="card"
      >
        <h3 className="text-title-lg mb-6 text-on-surface">
          Transaksi Terbaru
        </h3>
        <RecentTransactionsList data={recentTransactions} />
      </m.div>
    </>
  );
}
