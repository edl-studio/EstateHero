import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import styles from "./info-card.module.css";

export interface InfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Title (e.g. "What is critical rent?"). Rendered in uppercase. */
  title: string;
  /** Short description text. */
  description: string;
  /** Button label (default: "LEARN MORE"). */
  buttonText?: string;
  /** Called when the outline button is clicked. */
  onButtonClick?: () => void;
  /** Illustration shown in bottom-right (e.g. cash-stack.png). */
  illustration?: React.ReactNode;
}

export const InfoCard = React.forwardRef<HTMLDivElement, InfoCardProps>(
  (
    {
      title,
      description,
      buttonText = "LEARN MORE",
      onButtonClick,
      illustration,
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
        <div className={styles.content}>
          <h3 className={cn(styles.title, "ui-mono-13")}>{title}</h3>
          <p className={cn(styles.description, "body-sans-regular-14")}>
            {description}
          </p>
        </div>

        <div className={styles.footer}>
          <Button variant="outline" size="xs" onClick={onButtonClick}>
            {buttonText}
          </Button>
          {illustration != null && (
            <div className={styles.illustrationSlot} aria-hidden>
              {illustration}
            </div>
          )}
        </div>
      </div>
    );
  }
);

InfoCard.displayName = "InfoCard";
