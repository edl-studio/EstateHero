import * as React from "react";
import { cn } from "@/lib/utils";
import styles from "./command-box-trigger.module.css";

export interface CommandBoxTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual variant of the trigger
   * - "home": Large trigger for homepage hero (76px height)
   * - "header": Compact trigger for header navigation (48px height)
   */
  variant?: "home" | "header";
  /**
   * Placeholder text to display when no value is selected
   */
  placeholder?: string;
  /**
   * Icon to display at the start (left) of the trigger.
   * Recommended size: 16×16px for both variants
   */
  leadingIcon?: React.ReactNode;
  /**
   * Icon to display at the end (right) of the trigger.
   * Recommended size: 16×16px for both variants
   */
  trailingIcon?: React.ReactNode;
  /**
   * Optional slot for custom content on the right side (e.g., HotkeyBadge).
   * This will be rendered without icon size constraints.
   * If both rightSlot and trailingIcon are provided, rightSlot takes precedence.
   */
  rightSlot?: React.ReactNode;
}

export const CommandBoxTrigger = React.forwardRef<
  HTMLButtonElement,
  CommandBoxTriggerProps
>(
  (
    {
      className,
      variant = "header",
      placeholder = "Type a command or search...",
      leadingIcon,
      trailingIcon,
      rightSlot,
      disabled,
      ...props
    },
    ref
  ) => {
    const variantClass = variant === "home" ? styles.home : styles.header;

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={cn(styles.trigger, variantClass, className)}
        {...props}
      >
        {leadingIcon && (
          <span className={styles.leadingIcon} aria-hidden="true">
            {leadingIcon}
          </span>
        )}
        <span
          className={
            variant === "home"
              ? cn(styles.text, "ui-sans-regular-16")
              : cn(styles.text, styles.textHeader, "ui-mono-13")
          }
        >
          {placeholder}
        </span>
        {rightSlot ? (
          <span className={styles.rightSlot} aria-hidden="true">
            {rightSlot}
          </span>
        ) : trailingIcon ? (
          <span className={styles.trailingIcon} aria-hidden="true">
            {trailingIcon}
          </span>
        ) : null}
      </button>
    );
  }
);
  
CommandBoxTrigger.displayName = "CommandBoxTrigger";
