export interface RecentTransaction {
  id: string;
  type: "INCOME" | "EXPENSE";
  amount: string;
  date: string;
  note: string | null;
  account: { id: string; name: string; type: string };
  category: { id: string; name: string };
}

export interface TopExpenseCategory {
  categoryId: string;
  categoryName: string;
  total: number;
}

export interface DashboardSummary {
  totalBalance: number;
  income: number;
  expense: number;
  cashFlow: number;
  topExpenses: TopExpenseCategory[];
  recentTransactions: RecentTransaction[];
}

export interface DashboardChartPoint {
  month: number;
  income: number;
  expense: number;
}

export interface DashboardChart {
  year: number;
  data: DashboardChartPoint[];
}

export interface BalanceHeroCardProps {
  totalBalance: number;
  trendPercent: number | null;
}