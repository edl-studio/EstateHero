import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import styles from "./property-card.module.css";

export interface PropertyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image URL for the property. Omit for no image (content-only card). */
  imageSrc?: string;
  /** Alt text for the property image */
  imageAlt?: string;
  /** Primary address or title (e.g. "Smallegade 42, 2000 Frederiksberg") */
  address: string;
  /** Custom badges row. If not set, propertyType/statusLabel are used with default icons. */
  badges?: React.ReactNode;
  /** Property type label (e.g. "Residential") – shown as pill with house icon when badges not provided */
  propertyType?: string;
  /** Status label (e.g. "Under offer") – shown as pill with help icon when badges not provided */
  statusLabel?: string;
  /** Tooltip text shown on the status label's help icon */
  statusLabelTooltip?: string;
  /** Main price string (e.g. "6.250.000") */
  price?: string;
  /** Currency label (e.g. "DKK") – shown next to main price in smaller, muted text */
  currency?: string;
  /** Price change percentage – shown in green pill with up arrow (e.g. 2 → "2%") */
  priceChangePercent?: number;
  /** Unit price line (e.g. "63.800 DKK / M²") */
  unitPrice?: string;
  /** Optional metadata or extra content below the price block */
  children?: React.ReactNode;
}

export const PropertyCard = React.forwardRef<HTMLDivElement, PropertyCardProps>(
  (
    {
      imageSrc,
      imageAlt = "",
      address,
      badges: badgesSlot,
      propertyType,
      statusLabel,
      statusLabelTooltip,
      price,
      currency,
      priceChangePercent,
      unitPrice,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const hasDefaultBadges =
      (propertyType != null && propertyType !== "") ||
      (statusLabel != null && statusLabel !== "");
    const badgesContent =
      badgesSlot ??
      (hasDefaultBadges ? (
        <>
          {propertyType != null && propertyType !== "" && (
            <Badge
              variant="outline"
              fontVariant="sans"
              iconLeft={<Icon name="Home" size="sm" />}
              className={styles.badgeResidential}
            >
              {propertyType}
            </Badge>
          )}
          {statusLabel != null && statusLabel !== "" && (
            <Badge
              variant="neutral"
              fontVariant="sans"
              tooltip={statusLabelTooltip}
            >
              {statusLabel}
            </Badge>
          )}
        </>
      ) : null);
    const hasBadges = badgesSlot != null || hasDefaultBadges;

    return (
      <div ref={ref} className={cn(styles.root, className)} {...props}>
        {imageSrc != null && imageSrc !== "" && (
          <div className={styles.imageWrapper}>
            <img src={imageSrc} alt={imageAlt} className={styles.image} />
          </div>
        )}

        <div className={styles.content}>
          <h3 className={cn(styles.address, "ui-sans-regular-18")}>{address}</h3>

          {hasBadges && (
            <div className={styles.badges}>
              {badgesContent}
            </div>
          )}

          {(price != null && price !== "") && (
            <div className={styles.priceRow}>
              <span className={cn(styles.mainPrice, "ui-mono-semibold-24")}>
                {price}
              </span>
              {currency != null && currency !== "" && (
                <span className={cn(styles.currency, "ui-sans-regular-14")}>
                  {currency}
                </span>
              )}
              {priceChangePercent != null && (
                <Badge
                  variant={priceChangePercent >= 0 ? "positive" : "negative"}
                  iconLeft={<Icon name="Chart" size="sm" />}
                  className={styles.priceChange}
                >
                  {priceChangePercent}%
                </Badge>
              )}
            </div>
          )}

          {unitPrice != null && unitPrice !== "" && (
            <p className={cn(styles.unitPrice, "ui-sans-regular-14")}>
              {unitPrice}
            </p>
          )}

          {children}
        </div>
      </div>
    );
  }
);

PropertyCard.displayName = "PropertyCard";
