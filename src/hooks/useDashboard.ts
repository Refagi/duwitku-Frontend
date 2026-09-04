import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "@/services/api/dashboard.api";

export const dashboardKeys = {
  summary: ["dashboard", "summary"] as const,
  chart: (year: number) => ["dashboard", "chart", year] as const,
};

export function useDashboardSummary() {
  return useQuery({
    queryKey: dashboardKeys.summary,
    queryFn: async () => (await dashboardApi.getSummary()).data.data,
  });
}

export function useDashboardChart(year = new Date().getFullYear()) {
  return useQuery({
    queryKey: dashboardKeys.chart(year),
    queryFn: async () => (await dashboardApi.getChart(year)).data.data,
  });
}