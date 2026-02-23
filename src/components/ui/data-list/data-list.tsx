import * as React from "react";
import { cn } from "@/lib/utils";
import styles from "./data-list.module.css";

export interface DataListProps extends React.HTMLAttributes<HTMLUListElement> {
  /** List items (DataListItem components) */
  children: React.ReactNode;
}

export const DataList = React.forwardRef<HTMLUListElement, DataListProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ul
        ref={ref}
        className={cn(styles.list, className)}
        role="list"
        {...props}
      >
        {children}
      </ul>
    );
  }
);

DataList.displayName = "DataList";
