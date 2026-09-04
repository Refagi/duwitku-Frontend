export interface ApiResponse<T = unknown> {
  status:  number
  data?:   T
  message?: string
  pagination?: {
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiErrorResponse {
  message: string;
  error?: unknown;
}
