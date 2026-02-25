"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icon } from "@/components/ui/icon";
import styles from "./table-header.module.css";

export type TableHeaderTheme = "light" | "dark";

export type TableHeaderSortDirection = "none" | "asc" | "desc";

export interface TableHeaderProps
  extends Omit<
    React.ThHTMLAttributes<HTMLTableHeaderCellElement>,
    "children"
  > {
  /**
   * Visual theme: light (light grey background) or dark (dark background).
   */
  theme?: TableHeaderTheme;
  /**
   * Header label (e.g. "CALCULATED", "SIMULATED"). Omit for empty placeholder variant.
   */
  label?: string;
  /**
   * Tooltip content for the help icon. When provided, shows the info (HelpCircle) icon next to the label.
   */
  tooltipContent?: React.ReactNode;
  /**
   * Sort state. When provided, shows sort icon on the right.
   * - "none": double-headed vertical arrow (sortable, unsorted)
   * - "asc": upward chevron
   * - "desc": downward chevron
   */
  sortDirection?: TableHeaderSortDirection;
  /** Optional sort icon override (overrides sortDirection icon). */
  sortIcon?: React.ReactNode;
  /** Accessible name for the sort control when sortDirection is set. */
  ariaSort?: "ascending" | "descending" | "none" | "other";
  /**
   * Override the root element (e.g. "div" for stacked/card layouts outside a table).
   */
  renderAs?: "th" | "div";
  /**
   * When true, only the top-left corner is rounded (8px). Used when this header is the first in a row (e.g. MARKET on mobile).
   */
  roundTopLeftOnly?: boolean;
  /**
   * Horizontal alignment of header content. Default is left.
   */
  align?: "left" | "center" | "right";
}

function getSortIcon(
  sortDirection: TableHeaderSortDirection | undefined,
  sortIcon: React.ReactNode | undefined
): React.ReactNode | null {
  if (sortIcon != null) return sortIcon;
  switch (sortDirection) {
    case "asc":
      return <Icon name="ChevronUp" size="md" />;
    case "desc":
      return <Icon name="ChevronDown" size="md" />;
    case "none":
      return <Icon name="ChevronsUpDown" size="md" />;
    default:
      return null;
  }
}

export const TableHeader = React.forwardRef<
  HTMLTableHeaderCellElement,
  TableHeaderProps
>(
  (
    {
      className,
      theme = "light",
      label,
      tooltipContent,
      sortDirection,
      sortIcon,
      ariaSort,
      renderAs,
      roundTopLeftOnly,
      align,
      ...props
    },
    ref
  ) => {
    const hasSort = sortDirection != null;
    const sortIconNode = hasSort
      ? getSortIcon(sortDirection, sortIcon)
      : null;

    const content = (
      <>
        {label != null && label !== "" && (
          <>
            <span className={styles.label}>{label}</span>
            {tooltipContent != null && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger render={<span className={cn(styles.iconSlot, styles.helpIconSlot)} />}>
                    <Icon name="HelpCircle" size="md" />
                  </TooltipTrigger>
                  <TooltipContent>{tooltipContent}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </>
        )}
        {sortIconNode != null && (
          <span
            className={cn(
              styles.iconSlot,
              styles.sortIconSlot,
              (sortDirection === "asc" || sortDirection === "desc") &&
                styles.sortIconSlotActive
            )}
            aria-hidden
          >
            {sortIconNode}
          </span>
        )}
      </>
    );

    const Component = renderAs ?? "th";
    const { style, ...restProps } = props;
    return (
      <Component
        ref={ref as unknown as React.LegacyRef<HTMLTableHeaderCellElement>}
        className={cn(
          styles.th,
          theme === "light" && styles.themeLight,
          theme === "dark" && styles.themeDark,
          roundTopLeftOnly && styles.roundTopLeftOnly,
          align === "center" && styles.alignCenter,
          align === "right" && styles.alignRight,
          className
        )}
        aria-sort={hasSort ? ariaSort : undefined}
        data-round-top-left-only={roundTopLeftOnly ? true : undefined}
        {...restProps}
        style={style}
      >
        <span className={cn("ui-mono-13", styles.root)}>{content}</span>
      </Component>
    );
  }
);

TableHeader.displayName = "TableHeader";
