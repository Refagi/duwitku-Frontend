import api from "./axios";
import type { ApiResponse } from "@/types/api";
import type { DashboardSummary, DashboardChart } from "@/types/dashboard";

export const dashboardApi = {
  getSummary: () => api.get<ApiResponse<DashboardSummary>>("/dashboard/summary"),

  getChart: (year?: number) =>
    api.get<ApiResponse<DashboardChart>>("/dashboard/chart", { params: { year } }),
};