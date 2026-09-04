import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatCurrency } from "@/lib/format";
import { EmptyState } from "@/components/ui/EmptyState";
import type { TopExpenseCategory } from "@/types/dashboard";

export function ExpenseChart({ data }: { data: TopExpenseCategory[] }) {
  if (data.length === 0) return <EmptyState compact message="Belum ada data pengeluaran bulan ini" />;

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ left: -20, top: 10 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="categoryName" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
        <Tooltip formatter={(v) => [typeof v === "number" ? formatCurrency(v) : "Rp 0", "Pengeluaran"]} cursor={{ fill: "rgba(0,0,0,0.03)" }} />
        <Bar dataKey="total" fill="var(--color-primary)" radius={[6, 6, 0, 0]} animationDuration={600} />
      </BarChart>
    </ResponsiveContainer>
  );
}