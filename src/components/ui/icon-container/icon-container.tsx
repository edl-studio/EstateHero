import * as React from "react";
import { Icon, type IconProps } from "@/components/ui/icon";
import styles from "./icon-container.module.css";

export interface IconContainerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  /**
   * Color variant
   */
  color?: "default" | "green" | "blue" | "orange" | "teal";
  
  /** Icon component props (name and optional size) */
  icon: IconProps;
}

export const IconContainer = React.forwardRef<HTMLDivElement, IconContainerProps>(
  ({ className, color = "default", icon, ...props }, ref) => {
    // Combine base container class with color variant
    const classNames = [
      styles.iconContainer,
      styles[color],
      className
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classNames} {...props}>
        <Icon {...icon} />
      </div>
    );
  }
);

IconContainer.displayName = "IconContainer";
