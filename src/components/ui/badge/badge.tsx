"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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

  /**
   * Tooltip text shown when hovering the help icon.
   * When provided, a HelpCircle icon is automatically rendered after the badge text
   * and acts as the tooltip trigger.
   */
  tooltip?: string;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    { 
      className, 
      variant = "default", 
      fontVariant = "mono", 
      iconLeft,
      iconRight,
      tooltip,
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
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger render={<span className={styles.iconContainer} />}>
                <Icon name="HelpCircle" size="xs" />
              </TooltipTrigger>
              <TooltipContent>{tooltip}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    );
  }
);

Badge.displayName = "Badge";
