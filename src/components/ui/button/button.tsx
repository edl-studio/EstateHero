import * as React from "react";
import { Button as BaseButton } from "@base-ui-components/react/button";
import { cn } from "@/lib/utils";
import styles from "./button.module.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The visual style variant of the button
   */
  variant?: "primary" | "secondary" | "ghost" | "outline" | "destructive" | "inline";
  /**
   * The size of the button (xs = 32px, sm = 36px, md = 40px, lg = 44px)
   */
  size?: "xs" | "sm" | "md" | "lg";
  /**
   * Icon to display before the button text.
   * Recommended size: 16×16px (h-4 w-4)
   */
  iconLeft?: React.ReactNode;
  /**
   * Icon to display after the button text.
   * Recommended size: 16×16px (h-4 w-4)
   */
  iconRight?: React.ReactNode;
  /**
   * Whether the button is in a loading state.
   * When true, the button is disabled and shows a loading indicator.
   */
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = "primary",
    size = "md",
    iconLeft, 
    iconRight, 
    isLoading,
    disabled,
    children, 
    ...props 
  }, ref) => {
    // Determine if this is an icon-only button
    const isIconOnly = !children && (!!iconLeft || !!iconRight);

    // Build class names based on variants
    const buttonClasses = cn(
      styles.button,
      "ui-mono-14",
      // Variant styles
      variant === "primary" && styles.primary,
      variant === "secondary" && styles.secondary,
      variant === "ghost" && styles.ghost,
      variant === "outline" && styles.outline,
      variant === "destructive" && styles.destructive,
      variant === "inline" && styles.inline,
      // Size styles
      size === "xs" && styles.extraSmall,
      size === "sm" && styles.small,
      size === "md" && styles.medium,
      size === "lg" && styles.large,
      // Icon-only styles
      isIconOnly && styles.iconOnly,
      isIconOnly && size === "xs" && styles.iconOnlyExtraSmall,
      isIconOnly && size === "sm" && styles.iconOnlySmall,
      isIconOnly && size === "md" && styles.iconOnlyMedium,
      isIconOnly && size === "lg" && styles.iconOnlyLarge,
      className
    );

    return (
      <BaseButton
        ref={ref}
        className={buttonClasses}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className={styles.loadingSpinner}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {children && <span>{children}</span>}
          </>
        ) : (
          <>
            {iconLeft && <span className={styles.iconWrapper} aria-hidden="true">{iconLeft}</span>}
            {children && <span>{children}</span>}
            {iconRight && <span className={styles.iconWrapper} aria-hidden="true">{iconRight}</span>}
          </>
        )}
      </BaseButton>
    );
  }
);

Button.displayName = "Button";
