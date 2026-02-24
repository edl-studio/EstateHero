import * as React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/components/ui/icon";
import styles from "./inline-message.module.css";

const DEFAULT_ICONS: Record<NonNullable<InlineMessageProps["variant"]>, IconName> = {
  warning: "AlertTriangle",
  info: "Info",
  error: "XCircle",
  success: "CheckCircle",
};

export interface InlineMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual and semantic variant.
   * - `warning`: Amber icon and title (Figma design)
   * - `info`: Teal
   * - `error`: Destructive red
   * - `success`: Green
   */
  variant?: "warning" | "info" | "error" | "success";
  /**
   * Optional custom icon. If not provided, a default icon is shown per variant.
   */
  leadingIcon?: React.ReactNode;
  /**
   * Primary message (bold, colored). When set, shown on first row with icon; children become the secondary grey description.
   */
  title?: React.ReactNode;
  /**
   * Message content. With `title`, this is the secondary description (grey). Without `title`, this is the only line.
   */
  children: React.ReactNode;
}

/**
 * Inline message card for alerts and status messages.
 * Based on Figma 1327-19152: card with light background, border, shadow; optional bold title + secondary description.
 */
export const InlineMessage = React.forwardRef<HTMLDivElement, InlineMessageProps>(
  (
    {
      className,
      variant = "warning",
      leadingIcon,
      title,
      children,
      ...props
    },
    ref
  ) => {
    const defaultIconName = DEFAULT_ICONS[variant];
    const iconContent = leadingIcon ?? (
      <Icon name={defaultIconName} size="lg" aria-hidden />
    );
    const hasTitle = title != null && title !== "";

    return (
      <div
        ref={ref}
        role={variant === "error" || variant === "warning" ? "alert" : "status"}
        className={cn(styles.inlineMessage, styles[variant], className)}
        {...props}
      >
        {hasTitle ? (
          <>
            <div className={styles.titleRow}>
              <span className={styles.iconSlot}>{iconContent}</span>
              <div className={cn(styles.title, "ui-sans-medium-14")}>{title}</div>
            </div>
            <div className={cn(styles.description, "ui-sans-regular-14")}>{children}</div>
          </>
        ) : (
          <div className={styles.titleRow}>
            <span className={styles.iconSlot}>{iconContent}</span>
            <div className={cn(styles.description, styles.noTitle, "ui-sans-regular-14")}>{children}</div>
          </div>
        )}
      </div>
    );
  }
);

InlineMessage.displayName = "InlineMessage";
