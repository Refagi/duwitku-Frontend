import { useQuery } from "@tanstack/react-query";
import { reportsApi } from "@/services/api/reports.api";
import type { ReportQuery } from "@/types/report";

export function useReportSummary(query: ReportQuery) {
  return useQuery({
    queryKey: ["reports", "summary", query],
    queryFn: async () => (await reportsApi.getSummary(query)).data.data,
    enabled: !!query.from && !!query.to,
  });
}