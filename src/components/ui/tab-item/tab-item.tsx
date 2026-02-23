import * as React from "react";
import { cn } from "@/lib/utils";
import styles from "./tab-item.module.css";

export interface TabItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Whether the tab is currently active
   */
  isActive?: boolean;
}

export const TabItem = React.forwardRef<HTMLButtonElement, TabItemProps>(
  ({ className, isActive = false, children, ...props }, ref) => {
    const tabClasses = cn(
      styles.tabItem,
      isActive ? styles.active : styles.default,
      className
    );

    return (
      <button
        ref={ref}
        className={tabClasses}
        aria-selected={isActive}
        role="tab"
        {...props}
      >
        <span className={cn(styles.text, "ui-mono-14")}>{children}</span>
      </button>
    );
  }
);

TabItem.displayName = "TabItem";
