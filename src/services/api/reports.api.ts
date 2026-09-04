import api from "./axios";
import type { ApiResponse } from "@/types/api";
import type { ReportSummary, ReportQuery } from "@/types/report";

export const reportsApi = {
  getSummary: (query: ReportQuery) => api.get<ApiResponse<ReportSummary>>("/reports/summary", { params: query }),
};