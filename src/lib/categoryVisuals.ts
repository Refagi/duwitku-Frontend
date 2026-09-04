import {
  UtensilsCrossed, Car, Wifi, Zap, Droplet, ShoppingBag, Film, HeartPulse,
  Banknote, Briefcase, Gift, Home, Plane, Coffee, GraduationCap, Dumbbell,
  Music, Smartphone, Fuel, PiggyBank, Hospital, CircleDollarSign, HandCoins, type LucideIcon,
} from "lucide-react";

export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  UtensilsCrossed, Car, Wifi, Zap, Droplet, ShoppingBag, Film, HeartPulse,
  Banknote, Briefcase, Gift, Home, Plane, Coffee, GraduationCap, Dumbbell,
  Music, Smartphone, Fuel, PiggyBank, Hospital, CircleDollarSign, HandCoins 
};

export function getCategoryIcon(iconName: string | null): LucideIcon | null {
  if (!iconName) return null;
  return CATEGORY_ICONS[iconName] ?? null;
}

const FIXED_COLORS = [
  { bg: "bg-primary-fixed-dim", text: "text-on-primary-fixed" },
  { bg: "bg-secondary-fixed-dim", text: "text-on-secondary-fixed" },
  { bg: "bg-tertiary-fixed-dim", text: "text-on-tertiary-fixed" },
];

export function getCategoryColor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0;
  }
  return FIXED_COLORS[Math.abs(hash) % FIXED_COLORS.length];
}