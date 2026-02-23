import * as React from "react";
import { cn } from "@/lib/utils";
import { FlashingGrid } from "@/components/ui/flashing-grid";
import residentialImage from "@/assets/images/residential.png";
import styles from "./property-header.module.css";

export interface PropertyHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional meta label displayed above the heading (e.g., "Residential")
   */
  metaLabel?: string;
  /**
   * The main heading text (e.g., "Holbækvej 37, 4000 Roskilde")
   */
  heading: string;
  /**
   * Array of metadata items to display in the metadata section
   */
  metadataItems?: React.ReactNode;
  /**
   * Array of action buttons to display in the actions section
   */
  actions?: React.ReactNode;
}

export const PropertyHeader = React.forwardRef<HTMLDivElement, PropertyHeaderProps>(
  ({ metaLabel, heading, metadataItems, actions, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(styles.propertyHeader, className)} {...props}>
        {/* Flashing grid background - 6×3 blocks, with radial fade (hidden on mobile) */}
        <div className={cn(styles.gridWrapper, "hidden md:block")}>
          <FlashingGrid blocksX={6} blocksY={3} className={styles.flashingGrid} aria-hidden />
          <div
            className={styles.gridFade}
            style={{
              pointerEvents: "none",
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(238, 234, 231, 0) 0%, var(--color-card) 100%)",
            }}
            aria-hidden
          />
          <img
            src={residentialImage}
            alt=""
            className={styles.gridImage}
            aria-hidden
          />
        </div>
        <div className={styles.content}>
          {/* Heading Section */}
          <div className={styles.heading}>
            {metaLabel && (
              <span className={cn(styles.metaLabel, "ui-mono-14")}>
                {metaLabel}
              </span>
            )}
            <h1 className={cn(styles.headingText, "body-sans-medium-32")}>
              {heading}
            </h1>
          </div>

          {/* Metadata Section */}
          {(metadataItems || actions) && (
            <div className={styles.metadata}>
              {metadataItems && (
                <div className={styles.metaStack}>
                  {metadataItems}
                </div>
              )}
              
              {actions && (
                <div className={styles.actions}>
                  {actions}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

PropertyHeader.displayName = "PropertyHeader";
