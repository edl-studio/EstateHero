import * as React from "react";
import { cn } from "@/lib/utils";
import styles from "./badge-home.module.css";

export interface BadgeHomeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Icon to display before the badge text.
   * IMPORTANT: Must be exactly 12×12px with strokeWidth 1.5
   * Example: <BadgeHome iconLeft={<Check size={12} strokeWidth={1.5} />}>Text</BadgeHome>
   */
  iconLeft?: React.ReactNode;
  
  /**
   * Icon to display after the badge text.
   * IMPORTANT: Must be exactly 12×12px with strokeWidth 1.5
   */
  iconRight?: React.ReactNode;
}

export const BadgeHome = React.forwardRef<HTMLDivElement, BadgeHomeProps>(
  (
    { 
      className, 
      iconLeft,
      iconRight,
      children, 
      ...props 
    }, 
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(styles.badgeWrapper, className)}
        {...props}
      >
        <div className={cn(styles.badge, "ui-mono-13")}>
          {iconLeft && (
            <span aria-hidden="true" className={styles.iconContainer}>
              {iconLeft}
            </span>
          )}
          {children}
          {iconRight && (
            <span aria-hidden="true" className={styles.iconContainer}>
              {iconRight}
            </span>
          )}
        </div>
      </div>
    );
  }
);

BadgeHome.displayName = "BadgeHome";
