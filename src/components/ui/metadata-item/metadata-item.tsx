import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import styles from "./metadata-item.module.css";

export interface MetadataItemBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The label text displayed above the content
   */
  label: string;
  /**
   * Optional icon displayed next to the label
   */
  labelIcon?: React.ReactNode;
}

export interface MetadataItemDataGroupProps extends MetadataItemBaseProps {
  /**
   * Variant - data group with value display
   */
  variant: "data-group";
  /**
   * Icon displayed on the left side of the data group
   */
  icon?: React.ReactNode;
  /**
   * The main data value (e.g., "7.728.337")
   */
  dataValue: string;
  /**
   * Optional unit text displayed after the value (e.g., "DKK")
   */
  dataUnit?: string;
  /**
   * Optional badge displayed on the right side
   */
  badge?: React.ReactNode;
}

export interface MetadataItemButtonProps extends MetadataItemBaseProps {
  /**
   * Variant - button with outline style
   */
  variant: "button";
  /**
   * The button text
   */
  buttonText: string;
  /**
   * Optional icon displayed before the button text
   */
  buttonIcon?: React.ReactNode;
  /**
   * Button click handler
   */
  onButtonClick?: () => void;
}

export type MetadataItemProps = MetadataItemDataGroupProps | MetadataItemButtonProps;

export const MetadataItem = React.forwardRef<HTMLDivElement, MetadataItemProps>(
  (props, ref) => {
    const { label, labelIcon, className, ...rest } = props;

    const classNames = [styles.metadataItem, className].filter(Boolean).join(" ");

    return (
      <div ref={ref} className={classNames} {...rest}>
        {/* Label */}
        <div className={cn(styles.metaLabel, "ui-mono-14")}>
          <span>{label}</span>
          {labelIcon && <span className={styles.helpIcon}>{labelIcon}</span>}
        </div>

        {/* Content based on variant */}
        {props.variant === "data-group" ? (
          <div className={styles.dataGroup}>
            {props.icon && (
              <span className={styles.iconContainer} aria-hidden="true">
                {props.icon}
              </span>
            )}
            <div className={styles.dataContent}>
              <div className={cn(styles.dataValue, "ui-mono-24")}>
                <span>{props.dataValue}</span>
                {props.dataUnit && (
                  <span className={cn(styles.dataUnit, "ui-mono-24")}>
                    {props.dataUnit}
                  </span>
                )}
              </div>
              {props.badge && (
                <div className={styles.badgeContainer}>{props.badge}</div>
              )}
            </div>
          </div>
        ) : (
          <div className={styles.buttonContainer}>
            <Button
              variant="outline"
              iconLeft={props.buttonIcon}
              onClick={props.onButtonClick}
            >
              {props.buttonText}
            </Button>
          </div>
        )}
      </div>
    );
  }
);

MetadataItem.displayName = "MetadataItem";
