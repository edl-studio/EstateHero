import * as React from "react";

import { Icon } from "@/components/ui/icon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { SegmentedTabs } from "@/components/ui/segmented-tabs";

import styles from "./mortgage-rate-card.module.css";

export type MortgageRateCardDuration = "20y" | "30y";

export interface MortgageRateCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Illustration or icon shown at the top-left (e.g. 32×40 image). */
  illustration?: React.ReactNode;
  /** Label above the value (e.g. "Mortgage interest rate"). Rendered in uppercase. */
  label: string;
  /** Tooltip content when hovering the label. When set, the label is wrapped in a tooltip. */
  labelTooltip?: React.ReactNode;
  /** Main value displayed (meta information, not editable). */
  value: string;
  /** Optional metric/unit after the value (e.g. "%"). */
  metric?: string;
  /** Optional info icon after the label (e.g. for tooltip trigger). Set to null to hide. */
  infoIcon?: React.ReactNode;
  /** Currently selected duration tab. */
  duration?: MortgageRateCardDuration;
  /** Called when the user switches between 20y and 30y. */
  onDurationChange?: (duration: MortgageRateCardDuration) => void;
}

const DURATION_ITEMS = [
  { value: "20y" as const, label: "20Y" },
  { value: "30y" as const, label: "30Y" },
];

export const MortgageRateCard = React.forwardRef<
  HTMLDivElement,
  MortgageRateCardProps
>(
  (
    {
      illustration,
      label,
      labelTooltip,
      value,
      metric,
      infoIcon = <Icon name="HelpCircle" size="sm" />,
      duration = "20y",
      onDurationChange,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(styles.root, className)}
        {...props}
      >
        <div className={styles.topRow}>
          {illustration != null && (
            <div className={styles.illustrationSlot} aria-hidden>
              {illustration}
            </div>
          )}
          <SegmentedTabs
            value={duration}
            onValueChange={(v) => onDurationChange?.(v as MortgageRateCardDuration)}
            items={DURATION_ITEMS}
            className={styles.segmentedTabs}
          />
        </div>

        <div className={styles.labelValueBlock}>
          <div className={styles.labelRow}>
            {labelTooltip != null && labelTooltip !== "" ? (
              <Tooltip>
                <TooltipTrigger
                  render={
                    <span
                      className={cn(
                        styles.label,
                        styles.labelWithTooltip,
                        "ui-mono-13"
                      )}
                    />
                  }
                >
                  {label}
                </TooltipTrigger>
                <TooltipContent>{labelTooltip}</TooltipContent>
              </Tooltip>
            ) : (
              <span className={cn(styles.label, "ui-mono-13")}>{label}</span>
            )}
            {infoIcon != null && (
              <span className={styles.infoIcon} aria-hidden>
                {infoIcon}
              </span>
            )}
          </div>

          <div className={styles.valueRow}>
            <span className={cn(styles.value, "ui-mono-20")}>
              {value}
            </span>
            {metric != null && metric !== "" && (
              <span className={cn(styles.metric, "ui-mono-20")}>
                {metric}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
);

MortgageRateCard.displayName = "MortgageRateCard";
