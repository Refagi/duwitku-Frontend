export interface CategoryBreakdownItem {
  categoryId: string;
  categoryName: string;
  total: number;
  percentage: number;
  icon: string | null;
}

export interface ReportChartPoint { label: string; income: number; expense: number }

export interface ReportSummary {
  income: number;
  expense: number;
  cashFlow: number;
  incomeTrend: number | null;
  expenseTrend: number | null;
  categoryBreakdown: CategoryBreakdownItem[];
  chart: ReportChartPoint[];
}

export interface ReportQuery { from: string; to: string }

export interface CashFlowCardProps {
  cashFlow: number;
  incomePercent: number;
  expensePercent: number;
  delay?: number;
}