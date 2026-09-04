import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { formatCurrency } from "@/lib/format";
import { EmptyState } from "@/components/ui/EmptyState";
import type { ReportChartPoint } from "@/types/report";

export function IncomeExpenseChart({ data }: { data: ReportChartPoint[] }) {
  if (data.length === 0) return <EmptyState compact message="Belum ada data di periode ini" />;
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="label" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
        <Tooltip formatter={(value, name) => { const formatted = typeof value === "number" ? formatCurrency(value) : "Rp 0"; 
          return [formatted, name]; }} />
        <Legend />
        <Bar dataKey="income" name="Income" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="expense" name="Expense" fill="var(--color-secondary)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}