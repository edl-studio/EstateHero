"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import styles from "./table-cell.module.css";

export type TableCellAlign = "left" | "center" | "right";
export type TableCellTone = "default" | "muted" | "strong";
export type TableCellContentVariant = "default" | "label";

export interface TableCellProps
  extends Omit<
    React.TdHTMLAttributes<HTMLTableCellElement>,
    "align" | "prefix" | "suffix"
  > {
  /**
   * Render as <th> when true (e.g. for header cells).
   */
  asHeader?: boolean;
  /**
   * Override the root element (e.g. "div" for stacked/card layouts outside a table).
   */
  renderAs?: "td" | "th" | "div";
  /**
   * Horizontal alignment of cell content.
   */
  align?: TableCellAlign;
  /**
   * Text emphasis: default (primary), muted (secondary), strong (medium weight).
   */
  tone?: TableCellTone;
  /**
   * Truncate long content with ellipsis.
   */
  truncate?: boolean;
  /**
   * Optional leading slot (icon, prefix text).
   */
  prefix?: React.ReactNode;
  /**
   * Optional trailing slot (metric, unit, icon, actions).
   */
  suffix?: React.ReactNode;
  /**
   * Main cell content.
   */
  children?: React.ReactNode;
  /**
   * When "full", content wrapper fills the cell (e.g. for inputs).
   */
  contentWidth?: "auto" | "full";
  /**
   * Content typography: default (sans/base), label (mono/xs/uppercase for label column recipe).
   */
  contentVariant?: TableCellContentVariant;
}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  (
    {
      className,
      asHeader = false,
      renderAs,
      align,
      tone = "default",
      truncate = false,
      prefix,
      suffix,
      children,
      contentWidth = "auto",
      contentVariant = "default",
      ...props
    },
    ref
  ) => {
    const Component = renderAs ?? (asHeader ? "th" : "td");
    const hasSlots = prefix != null || suffix != null;

    const contentNode = (
      <span
        className={cn(
          styles.content,
          !hasSlots && styles.contentNoSlot,
          hasSlots && styles.contentWithSlots,
          tone === "muted" && styles.toneMuted,
          tone === "strong" && styles.toneStrong,
          contentVariant === "label" && styles.contentLabel,
          asHeader && styles.contentHeader,
          truncate && styles.truncate
        )}
      >
        {hasSlots ? (
          <>
            {prefix != null && (
              <span className={styles.contentPrefix} aria-hidden>
                {prefix}
              </span>
            )}
            <span className={styles.contentMain}>{children}</span>
            {suffix != null && (
              <span className={styles.contentSuffix}>{suffix}</span>
            )}
          </>
        ) : (
          children
        )}
      </span>
    );

    const { style, ...restProps } = props;
    return (
      <Component
        ref={ref as React.Ref<HTMLTableDataCellElement & HTMLTableHeaderCellElement>}
        className={cn(
          styles.cell,
          asHeader && styles.cellHeader,
          align === "center" && styles.cellAlignCenter,
          align === "right" && styles.cellAlignRight,
          className
        )}
        {...restProps}
        style={style}
      >
        {contentWidth === "full" && !hasSlots ? (
          <div className={styles.contentFull}>{children}</div>
        ) : (
          contentNode
        )}
      </Component>
    );
  }
);

TableCell.displayName = "TableCell";
