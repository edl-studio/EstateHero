import * as React from "react";
import {
  Home,
  Building2,
  Search,
  Star,
  HelpCircle,
  X,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  ChevronsDownUp,
  MapPin,
  Ruler,
  ArrowLeftRight,
  TrendingUp,
  Calendar,
  Upload,
  Download,
  Printer,
  Bookmark,
  Share2,
  Server,
  FileText,
  File,
  Scale,
  Globe,
  Plus,
  RefreshCw,
  RotateCw,
  Sparkles,
  Box,
  Columns2,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Check,
  Bus,
  ShoppingCart,
  Baby,
  School,
  Dumbbell,
  BriefcaseBusiness,
  MapPinned,
  Map,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import styles from "./icon.module.css";

/**
 * Icon name registry mapping placeholder icon names to Lucide components
 */
const ICON_REGISTRY = {
  Home,
  Building: Building2,
  Search,
  Star,
  HelpCircle,
  X,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  ChevronsDownUp,
  MapPin,
  Ruler,
  Compare: ArrowLeftRight,
  Chart: TrendingUp,
  Calendar,
  Share: Upload,
  Upload,
  Download,
  Print: Printer,
  Bookmark,
  Share2,
  Dock: Server,
  ReceiptText: FileText,
  Files: File,
  Scale,
  Globe,
  Plus,
  RefreshCw,
  RotateCw,
  Sparkles,
  Box,
  Columns: Columns2,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Check,
  Bus,
  ShoppingCart,
  Baby,
  School,
  Dumbbell,
  BriefcaseBusiness,
  MapPinned,
  Map,
} as const;

/**
 * Available icon names
 */
export type IconName = keyof typeof ICON_REGISTRY;

/**
 * Size variants for icons
 */
export type IconSize = "xs" | "sm" | "md" | "base" | "lg" | "xl" | "xxl";

/**
 * Size class mappings (use CSS variables from globals.css)
 */
const sizeClasses: Record<IconSize, string> = {
  xs: styles.xs,
  sm: styles.sm,
  md: styles.md,
  base: styles.base,
  lg: styles.lg,
  xl: styles.xl,
  xxl: styles.xxl,
};

/**
 * Stroke width mappings per size
 */
const strokeWidthMap: Record<IconSize, number> = {
  xs: 1.15, // 10px
  sm: 1.15, // 12px
  md: 1.15, // 14px
  base: 1.5, // 16px
  lg: 1.5, // 18px
  xl: 1.5, // 20px
  xxl: 1.5, // 24px
};

export interface IconProps extends Omit<React.SVGAttributes<SVGElement>, "name"> {
  /**
   * Icon name from the registry
   */
  name: IconName;

  /**
   * Size variant
   * @default "base"
   */
  size?: IconSize;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Icon component that wraps Lucide icons with standardized sizing
 * 
 * @example
 * ```tsx
 * <Icon name="Home" size="base" />
 * <Icon name="Search" size="lg" className="text-blue-600" />
 * ```
 */
export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, size = "base", className, ...props }, ref) => {
    const LucideIcon = ICON_REGISTRY[name] as LucideIcon;

    if (!LucideIcon) {
      console.warn(`Icon "${name}" not found in registry`);
      return null;
    }

    return (
      <LucideIcon
        ref={ref}
        className={cn(sizeClasses[size], className)}
        strokeWidth={strokeWidthMap[size]}
        {...props}
      />
    );
  }
);

Icon.displayName = "Icon";
