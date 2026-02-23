import * as React from "react";
import { cn } from "@/lib/utils";
import styles from "./badge.module.css";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual style variant
   */
  variant?:
    | "default"
    | "outline"
    | "success"
    | "info"
    | "warning"
    | "neutral"
    | "positive"
    | "negative";
  
  /**
   * Font variant
   */
  fontVariant?: "mono" | "sans";
  
  /**
   * Icon to display before the badge text.
   * Use the Icon component with size="sm" for correct size and stroke (aligned with icon system).
   * Example: <Badge iconLeft={<Icon name="Check" size="sm" />}>Text</Badge>
   */
  iconLeft?: React.ReactNode;
  
  /**
   * Icon to display after the badge text.
   * Use the Icon component with size="sm" for correct size and stroke (aligned with icon system).
   */
  iconRight?: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    { 
      className, 
      variant = "default", 
      fontVariant = "mono", 
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
        className={cn(
          styles.badge,
          fontVariant === "sans" ? "ui-sans-medium-12" : cn("ui-mono-12", styles.badgeMono),
          styles[variant],
          className
        )} 
        {...props}
      >
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
    );
  }
);

Badge.displayName = "Badge";
