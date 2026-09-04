export interface HistoryFilters {
  from?: string;
  to?: string;
  categoryId?: string;
  accountId?: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  filters: HistoryFilters;
  onFiltersChange: (f: HistoryFilters) => void;
}