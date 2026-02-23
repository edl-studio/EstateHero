import * as React from "react";
import { cn } from "@/lib/utils";
import styles from "./card.module.css";

// Card Root
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(styles.card, className)}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

// Card Header
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(styles.header, className)}
        {...props}
      />
    );
  }
);

CardHeader.displayName = "CardHeader";

// Card Title
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn(styles.title, "ui-mono-13", className)}
        {...props}
      />
    );
  }
);

CardTitle.displayName = "CardTitle";

// Card Content
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(styles.content, className)}
        {...props}
      />
    );
  }
);

CardContent.displayName = "CardContent";
