"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import styles from "./table-row.module.css";

export type TableRowVariant = "default" | "summary";

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  /**
   * Row variant: controls height, background, and default typography context for cells.
   * - default: standard data row
   * - summary: total/footer row (taller, muted background)
   */
  rowVariant?: TableRowVariant;
}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, rowVariant = "default", ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={cn(
          styles.row,
          rowVariant === "summary" && styles.rowSummary,
          className
        )}
        data-row-variant={rowVariant}
        {...props}
      />
    );
  }
);

TableRow.displayName = "TableRow";
