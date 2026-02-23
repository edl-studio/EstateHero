import * as React from "react";
import { cn } from "@/lib/utils";
import { IconContainer } from "@/components/ui/icon-container";
import type { IconProps } from "@/components/ui/icon";
import styles from "./empty-state.module.css";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant for the empty state
   * - `default`: Text-only, no icon
   * - `icon-container`: Uses IconContainer component with icon
   * - `illustration`: Custom illustration/image
   */
  variant?: "default" | "icon-container" | "illustration";
  /** Icon props for Icon component (for icon-container variant, recommended: 16×16px / h-4 w-4) */
  icon?: IconProps;
  /** Custom illustration element (for illustration variant, recommended: 120×120px / h-30 w-30) */
  illustration?: React.ReactNode;
  /** IconContainer color variant (only used with icon-container variant) */
  iconColor?: "default" | "green" | "blue" | "orange" | "teal";
  /** Main heading text */
  title: string;
  /** Supporting text displayed below the title */
  description?: string;
  /** Optional action button or element */
  action?: React.ReactNode;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      variant = "default",
      icon,
      illustration,
      iconColor = "default",
      title,
      description,
      action,
      ...props
    },
    ref
  ) => {
    // Determine which icon/illustration to render
    const renderIcon = () => {
      if (variant === "icon-container" && icon) {
        return (
          <div className={cn(styles.iconWrapper, styles.iconContainer)}>
            <IconContainer color={iconColor} icon={icon} />
          </div>
        );
      }

      if (variant === "illustration" && illustration) {
        return (
          <div className={cn(styles.iconWrapper, styles.illustration)}>
            {illustration}
          </div>
        );
      }

      return null;
    };

    return (
      <div ref={ref} className={cn(styles.emptyState, className)} {...props}>
        {renderIcon()}
        
        <div className={styles.textContent}>
          <h3 className={cn(styles.title, "ui-sans-regular-16")}>{title}</h3>
          {description && (
            <p className={cn(styles.description, "ui-sans-regular-14")}>
              {description}
            </p>
          )}
        </div>

        {action && <div className={styles.actionWrapper}>{action}</div>}
      </div>
    );
  }
);

EmptyState.displayName = "EmptyState";
