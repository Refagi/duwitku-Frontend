import { Plane, ShieldCheck, Car, Home, GraduationCap, Gift, Laptop, Heart, PiggyBank, Briefcase, type LucideIcon } from "lucide-react";

export const SAVINGS_ICONS: Record<string, LucideIcon> = {
  Plane, ShieldCheck, Car, Home, GraduationCap, Gift, Laptop, Heart, PiggyBank, Briefcase,
};

export function getSavingsIcon(name: string | null): LucideIcon {
  if (name && SAVINGS_ICONS[name]) return SAVINGS_ICONS[name];
  return PiggyBank;
}