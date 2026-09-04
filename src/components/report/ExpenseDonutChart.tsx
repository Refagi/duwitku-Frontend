import { Pie, PieChart, ResponsiveContainer, Sector, Tooltip } from "recharts";
import type { PieSectorShapeProps } from "recharts";
import { formatCurrency } from "@/lib/format";
import type { CategoryBreakdownItem } from "@/types/report";

const PALETTE = ["#006c49", "#e29100", "#b61722", "#10b981", "#4edea3", "#ffb95f"];

const CustomSector = (props: PieSectorShapeProps) => (
  <Sector {...props} fill={PALETTE[props.index % PALETTE.length]} />
);

export function ExpenseDonutChart({ data, total }: { data: CategoryBreakdownItem[]; total: number }) {
  const top6 = data.slice(0, 6);
  return (
    <div className="relative mx-auto h-56 w-56">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
         <Pie
            data={top6}
            dataKey="total"
            nameKey="categoryName"
            innerRadius={65}
            outerRadius={95}
            paddingAngle={2}
            shape={CustomSector}
          />
          <Tooltip formatter={(value, name) => { const formatted = typeof value === "number" ? formatCurrency(value) : "Rp 0"; 
          return [formatted, name]; }}/>
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-xs text-on-surface-variant">Total</p>
        <p className="text-title-lg text-on-surface">{formatCurrency(total)}</p>
      </div>
    </div>
  );
}