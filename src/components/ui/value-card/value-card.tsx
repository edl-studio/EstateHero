import * as React from "react";

import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import styles from "./value-card.module.css";

export interface ValueCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * - "display": show value and metric as static text (default).
   * - "editable": replace value with an Input; use inputTrailingSlot for trailing actions.
   * - "illustration": card with optional illustration at top, label, and Input (sans, right-aligned) with optional trailing actions.
   */
  variant?: "display" | "editable" | "illustration";
  /** When variant="illustration", optional image or graphic shown at the top of the card. */
  illustration?: React.ReactNode;
  /** Label shown above the value (e.g. "Calculated value"). Rendered in uppercase. */
  label: string;
  /** Tooltip content shown when hovering the help icon next to the label. When set, a HelpCircle icon is rendered as the sole trigger. */
  labelTooltip?: React.ReactNode;
  /** Main numeric or string value (display text or controlled input value). Ignored when valueSlot is set. */
  value: string;
  /** Metric/unit suffix (e.g. "DKK", "m²"). In display variant shown next to value; in editable passed to Input. Ignored when valueSlot is set. */
  metric?: string;
  /** Optional icon shown before the value (default: Sparkles). Set to null to hide. */
  valueIcon?: React.ReactNode;
  /** Optional custom icon after the label. Rendered only when labelTooltip is not set. */
  infoIcon?: React.ReactNode;
  /** Optional content below the value row */
  children?: React.ReactNode;
  /**
   * Optional slot that replaces the value (and metric/input) entirely.
   * Use this to render a custom input with trailing actions or any other content in the value row.
   * When set, value and metric are not rendered; valueIcon is still shown before the slot.
   */
  valueSlot?: React.ReactNode;
  /** When variant="editable" or variant="illustration": called when the input value changes. */
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** When variant="editable" or variant="illustration": trailing actions inside the input (e.g. clear + confirm). */
  inputTrailingSlot?: React.ReactNode;
  /** When variant="editable" or variant="illustration": Enter key confirm callback (blurs input). */
  onInputConfirmKeyDown?: () => void;
  /** When variant="editable" or variant="illustration": Escape key clear callback (blurs input). */
  onInputClearKeyDown?: () => void;
  /** When variant="editable" or variant="illustration": called when the input receives focus (e.g. to open a mobile bottom sheet). */
  onInputFocus?: () => void;
}

export const ValueCard = React.forwardRef<HTMLDivElement, ValueCardProps>(
  (
    {
      variant = "display",
      illustration,
      label,
      labelTooltip,
      value,
      metric,
      valueIcon = <Icon name="Sparkles" size="lg" />,
      infoIcon,
      children,
      valueSlot,
      onInputChange,
      inputTrailingSlot,
      onInputConfirmKeyDown,
      onInputClearKeyDown,
      onInputFocus,
      className,
      ...props
    },
    ref
  ) => {
    const isEditable = variant === "editable";
    const isIllustration = variant === "illustration";
    const useValueSlot = valueSlot != null;

    const valueContent = useValueSlot ? (
      <div className={styles.valueSlot}>{valueSlot}</div>
    ) : isEditable ? (
      <Input
        variant="default"
        size="default"
        fontVariant="mono"
        value={value}
        onChange={onInputChange}
        onFocus={onInputFocus}
        metric={metric != null && metric !== "" ? metric : undefined}
        trailingSlot={inputTrailingSlot}
        onConfirmKeyDown={onInputConfirmKeyDown}
        onClearKeyDown={onInputClearKeyDown}
        className={styles.valueInput}
      />
    ) : isIllustration ? (
      <Input
        variant="default"
        size="default"
        fontVariant="sans"
        align="right"
        value={value}
        onChange={onInputChange}
        onFocus={onInputFocus}
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
    );

    return (
      <div
        ref={ref}
        className={cn(
          styles.root,
          variant === "display" && styles.displayVariant,
          variant === "illustration" && styles.illustrationVariant,
          className
        )}
        {...props}
      >
        {isIllustration && illustration != null && (
          <div className={styles.illustrationSlot} aria-hidden>
            {illustration}
          </div>
        )}

        <div className={styles.labelRow}>
          <span className={cn(styles.label, "ui-mono-13")}>{label}</span>
          {labelTooltip != null && labelTooltip !== "" ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger render={<span className={styles.helpIcon} />}>
                  <Icon name="HelpCircle" size="md" />
                </TooltipTrigger>
                <TooltipContent>{labelTooltip}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : infoIcon != null ? (
            <span className={styles.infoIcon} aria-hidden>{infoIcon}</span>
          ) : null}
        </div>

        <div
          className={cn(
            styles.valueRowWrapper,
            isIllustration && styles.valueRowWrapperIllustration
          )}
        >
          <div className={styles.valueRow}>
            {valueIcon != null && (
              <span className={styles.valueIcon} aria-hidden>
                {valueIcon}
              </span>
            )}
            {valueContent}
          </div>
        </div>

        {children}
      </div>
    );
  }
);

ValueCard.displayName = "ValueCard";
