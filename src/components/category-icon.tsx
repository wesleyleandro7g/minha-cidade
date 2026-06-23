import {
  Utensils,
  HeartPulse,
  Scissors,
  Wrench,
  ShoppingBag,
  BedDouble,
  MapPin,
  GraduationCap,
  Car,
  PawPrint,
  Store,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  utensils: Utensils,
  "heart-pulse": HeartPulse,
  scissors: Scissors,
  wrench: Wrench,
  "shopping-bag": ShoppingBag,
  "bed-double": BedDouble,
  "map-pin": MapPin,
  "graduation-cap": GraduationCap,
  car: Car,
  "paw-print": PawPrint,
  store: Store,
};

export function CategoryIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[name] ?? Store;
  return <Icon className={className} />;
}
