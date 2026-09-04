import { m } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/format";
import { TrendingDown, TrendingUp } from "lucide-react";

interface SummaryCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  tone: "primary" | "error";
  delay?: number;
  trend?: number | null;
  positiveTrendIsGood?: boolean;
}

export function SummaryCard({ label, value, icon: Icon, tone, delay = 0, trend = null, positiveTrendIsGood = true }: SummaryCardProps) {
  const isTrendGood = trend === null ? true : positiveTrendIsGood ? trend >= 0 : trend <= 0;
  return (
    <m.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ y: -4 }}
      className="card"
    >
      <div className="flex items-start justify-between">
        <p className="text-label-md text-on-surface-variant">{label}</p>
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full",
            tone === "primary"
              ? "bg-primary-container/20 text-primary"
              : "bg-error-container/40 text-error",
          )}
        >
          <Icon className="h-4.5 w-4.5" />
        </div>
      </div>

      <p className="mt-2 text-headline-md text-on-surface">
        {formatCurrency(value)}
      </p>

      {trend !== null && (
        <p
          className={cn(
            "mt-1 flex items-center gap-1 text-xs",
            isTrendGood ? "text-primary" : "text-error",
          )}
        >
          {trend >= 0 ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          {trend >= 0 ? "+" : ""}
          {trend.toFixed(0)}% dari periode lalu
        </p>
      )}
    </m.div>
  );
}