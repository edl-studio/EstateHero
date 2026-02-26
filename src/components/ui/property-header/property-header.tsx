// PropertyHeader.tsx

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
  /**
   * When true, the flashing grid background is not rendered (e.g. for Storybook).
   */
  hideGrid?: boolean;
}

export const PropertyHeader = React.forwardRef<HTMLDivElement, PropertyHeaderProps>(
  ({ metaLabel, heading, metadataItems, actions, hideGrid, className, ...props }, ref) => {
    const actionChildren = React.useMemo(() => {
      if (!actions) return [];
      const topLevel = React.Children.toArray(actions);
      const flattened: React.ReactNode[] = [];
      for (const child of topLevel) {
        if (React.isValidElement(child) && child.type === React.Fragment) {
          flattened.push(...React.Children.toArray(child.props.children));
        } else {
          flattened.push(child);
        }
      }
      return flattened;
    }, [actions]);

    return (
      <div ref={ref} className={cn(styles.propertyHeader, className)} {...props}>
        {!hideGrid && (
          <div className={styles.gridWrapper}>
            <FlashingGrid blocksX={6} blocksY={3} className={styles.flashingGrid} aria-hidden />
            <div
              className={styles.gridFade}
              style={{
                pointerEvents: "none",
                background:
                  "radial-gradient(50% 50% at 50% 50%, transparent 0%, var(--color-card) 100%)",
              }}
              aria-hidden
            />
            <img src={residentialImage} alt="" className={styles.gridImage} aria-hidden />
          </div>
        )}

        <div className={styles.content}>
          <div className={styles.heading}>
            {metaLabel && <span className={cn(styles.metaLabel, "ui-mono-14")}>{metaLabel}</span>}
            <h1 className={cn(styles.headingText, "body-sans-medium-32")}>{heading}</h1>
          </div>

          {(metadataItems || actionChildren.length > 0) && (
            <div className={styles.metadata}>
              {metadataItems && <div className={styles.metaStack}>{metadataItems}</div>}

              {actionChildren.length > 0 && (
                <div className={styles.actions} data-property-header-actions>
                  {actionChildren.map((child, index) => (
                    <div key={index} className={styles.actionSlot}>
                      {child}
                    </div>
                  ))}
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