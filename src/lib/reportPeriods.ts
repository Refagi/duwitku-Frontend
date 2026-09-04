export type ReportTab = "MONTHLY" | "YEARLY" | "CUSTOM";

export function getPeriodRange(tab: ReportTab, customFrom?: string, customTo?: string) {
  const now = new Date();
  if (tab === "MONTHLY") {
    const from = new Date(now.getFullYear(), now.getMonth(), 1);
    const to = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return { from: from.toISOString().slice(0, 10), to: to.toISOString().slice(0, 10) };
  }
  if (tab === "YEARLY") {
    return { from: `${now.getFullYear()}-01-01`, to: `${now.getFullYear()}-12-31` };
  }
  return { from: customFrom ?? "", to: customTo ?? "" };
}