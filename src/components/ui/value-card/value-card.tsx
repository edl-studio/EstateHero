import * as React from "react";

import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import styles from "./value-card.module.css";

export interface ValueCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * - "display": show value and metric as static text (default).
   * - "editable": replace value with an Input; use inputTrailingSlot for trailing actions.
   */
  variant?: "display" | "editable";
  /** Label shown above the value (e.g. "Calculated value"). Rendered in uppercase. */
  label: string;
  /** Tooltip content shown when hovering the label. When set, the label is wrapped in a tooltip. */
  labelTooltip?: React.ReactNode;
  /** Main numeric or string value (display text or controlled input value). */
  value: string;
  /** Metric/unit suffix (e.g. "DKK", "m²"). In display variant shown next to value; in editable passed to Input. */
  metric?: string;
  /** Optional icon shown before the value (default: Sparkles). Set to null to hide. */
  valueIcon?: React.ReactNode;
  /** Optional info icon after the label (e.g. for tooltip trigger). Set to null to hide. */
  infoIcon?: React.ReactNode;
  /** Optional content below the value row */
  children?: React.ReactNode;
  /** When variant="editable": called when the input value changes. */
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** When variant="editable": trailing actions inside the input (e.g. clear + confirm buttons). */
  inputTrailingSlot?: React.ReactNode;
  /** When variant="editable": Enter key confirm callback (blurs input). */
  onInputConfirmKeyDown?: () => void;
  /** When variant="editable": Escape key clear callback (blurs input). */
  onInputClearKeyDown?: () => void;
}

export const ValueCard = React.forwardRef<HTMLDivElement, ValueCardProps>(
  (
    {
      variant = "display",
      label,
      labelTooltip,
      value,
      metric,
      valueIcon = <Icon name="Sparkles" size="lg" />,
      infoIcon = <Icon name="HelpCircle" size="sm" />,
      children,
      onInputChange,
      inputTrailingSlot,
      onInputConfirmKeyDown,
      onInputClearKeyDown,
      className,
      ...props
    },
    ref
  ) => {
    const isEditable = variant === "editable";

    return (
      <div ref={ref} className={cn(styles.root, className)} {...props}>
        <div className={styles.labelRow}>
          {labelTooltip != null && labelTooltip !== "" ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  className={cn(styles.label, styles.labelWithTooltip, "ui-sans-regular-12")}
                >
                  {label}
                </span>
              </TooltipTrigger>
              <TooltipContent>{labelTooltip}</TooltipContent>
            </Tooltip>
          ) : (
            <span className={cn(styles.label, "ui-sans-regular-12")}>
              {label}
            </span>
          )}
          {infoIcon != null && (
            <span className={styles.infoIcon} aria-hidden>
              {infoIcon}
            </span>
          )}
        </div>

        <div className={styles.valueRow}>
          {valueIcon != null && (
            <span className={styles.valueIcon} aria-hidden>
              {valueIcon}
            </span>
          )}
          {isEditable ? (
            <Input
              variant="default"
              size="default"
              fontVariant="mono"
              value={value}
              onChange={onInputChange}
              metric={metric != null && metric !== "" ? metric : undefined}
              trailingSlot={inputTrailingSlot}
              onConfirmKeyDown={onInputConfirmKeyDown}
              onClearKeyDown={onInputClearKeyDown}
              className={styles.valueInput}
            />
          ) : (
            <>
              <span className={cn(styles.mainValue, "ui-mono-20")}>
                {value}
              </span>
              {metric != null && metric !== "" && (
                <span className={cn(styles.metric, "ui-mono-20")}>
                  {metric}
                </span>
              )}
            </>
          )}
        </div>

        {children}
      </div>
    );
  }
);

ValueCard.displayName = "ValueCard";
