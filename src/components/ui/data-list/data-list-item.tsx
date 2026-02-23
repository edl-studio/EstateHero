import * as React from "react";
import { cn } from "@/lib/utils";
import styles from "./data-list-item.module.css";

export interface DataListItemProps
  extends Omit<React.HTMLAttributes<HTMLLIElement>, "onClick"> {
  /** Item content */
  children: React.ReactNode;
  /** Visual variant of the item */
  variant?: "default" | "zebra";
  /** Click handler for the item */
  onClick?: () => void;
}

export const DataListItem = React.forwardRef<HTMLLIElement, DataListItemProps>(
  (
    { className, variant = "default", onClick, children, ...props },
    ref
  ) => {
    const variantClass = variant === "zebra" ? styles["item-zebra"] : styles["item-default"];

    return (
      <li
        ref={ref}
        className={cn(styles.item, variantClass, className)}
        onClick={onClick}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={
          onClick
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onClick();
                }
              }
            : undefined
        }
        {...props}
      >
        {children}
      </li>
    );
  }
);

DataListItem.displayName = "DataListItem";
