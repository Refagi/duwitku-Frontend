import { useMemo, useState } from "react";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useReportSummary } from "@/hooks/useReport";
import { getPeriodRange, type ReportTab } from "@/lib/reportPeriods";
import { IncomeExpenseChart } from "@/components/report/IncomeExpenseCard";
import { ExpenseDonutChart } from "@/components/report/ExpenseDonutChart";
import { CategoryBreakdownList } from "@/components/report/CategoryBreakdownList";
import { ReportSkeleton } from "@/components/report/ReportSkeleton";
import { SummaryCard } from "@/components/report/SummaryCard";
import { CashFlowCard } from "@/components/report/CashFlowCard";
import { cn } from "@/lib/utils";

export function ReportsPage() {
  const [tab, setTab] = useState<ReportTab>("MONTHLY");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  const { from, to } = useMemo(
    () => getPeriodRange(tab, customFrom, customTo),
    [tab, customFrom, customTo],
  );
  const { data: summary, isLoading } = useReportSummary({ from, to });

  const { incomePercent, expensePercent } = useMemo(() => {
    if (!summary) return { incomePercent: 50, expensePercent: 50 };

    const total = summary.income + summary.expense;
    const incomePercent = total > 0 ? (summary.income / total) * 100 : 50;
    const expensePercent = 100 - incomePercent;

    return { incomePercent, expensePercent };
  }, [summary]);

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 min-[800px]:flex-row min-[800px]:items-center min-[800px]:justify-between">
        <div className="flex w-fit gap-1 rounded-full border border-outline-variant/40 bg-surface-container-lowest p-1">
          {(["MONTHLY", "YEARLY", "CUSTOM"] as ReportTab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                tab === t
                  ? "bg-primary text-on-primary"
                  : "text-on-surface-variant hover:bg-surface-container-low",
              )}
            >
              {t === "MONTHLY"
                ? "Bulanan"
                : t === "YEARLY"
                  ? "Tahunan"
                  : "Custom"}
            </button>
          ))}
        </div>
      </div>

      {tab === "CUSTOM" && (
        <div className="card mb-6 flex flex-wrap items-end gap-3">
          <div>
            <label className="label-base">Dari</label>
            <input
              type="date"
              value={customFrom}
              onChange={(e) => setCustomFrom(e.target.value)}
              className="input-base"
            />
          </div>
          <div>
            <label className="label-base">Sampai</label>
            <input
              type="date"
              value={customTo}
              onChange={(e) => setCustomTo(e.target.value)}
              className="input-base"
            />
          </div>
        </div>
      )}

      {isLoading || !summary ? (
        <ReportSkeleton />
      ) : (
        <>
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <SummaryCard
              label="Total Pemasukan"
              value={summary.income}
              icon={ArrowDownLeft}
              tone="primary"
              delay={0}
              trend={summary.incomeTrend}
              positiveTrendIsGood={true}
            />

            <SummaryCard
              label="Total Pengeluaran"
              value={summary.expense}
              icon={ArrowUpRight}
              tone="error"
              delay={0.05}
              trend={summary.expenseTrend}
              positiveTrendIsGood={false}
            />

            <CashFlowCard
              cashFlow={summary.cashFlow}
              incomePercent={incomePercent}
              expensePercent={expensePercent}
              delay={0.1}
            />
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="card lg:col-span-2">
              <h3 className="text-title-lg mb-4 text-on-surface">
                Income vs Expense
              </h3>
              <IncomeExpenseChart data={summary.chart} />
            </div>
            <div className="card">
              <h3 className="text-title-lg mb-4 text-on-surface">
                Expense Breakdown
              </h3>
              <ExpenseDonutChart
                data={summary.categoryBreakdown}
                total={summary.expense}
              />
            </div>
          </div>

          <div className="card">
            <h3 className="text-title-lg mb-4 text-on-surface">
              Top Spending Categories
            </h3>
            <CategoryBreakdownList data={summary.categoryBreakdown} />
          </div>
        </>
      )}
    </>
  );
}
