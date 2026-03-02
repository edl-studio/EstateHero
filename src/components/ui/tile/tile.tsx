import * as React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import styles from "./tile.module.css";

// Tile Root
export interface TileProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Tile = React.forwardRef<HTMLDivElement, TileProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(styles.root, className)}
        {...props}
      />
    );
  }
);

Tile.displayName = "Tile";

// Tile Header
export interface TileHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const TileHeader = React.forwardRef<HTMLDivElement, TileHeaderProps>(
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

TileHeader.displayName = "TileHeader";

// Tile Header Actions (right-hand slot for 2 inline buttons)
export interface TileHeaderActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const TileHeaderActions = React.forwardRef<
  HTMLDivElement,
  TileHeaderActionsProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(styles.headerActions, className)}
      {...props}
    />
  );
});

TileHeaderActions.displayName = "TileHeaderActions";

// Tile Title
export interface TileTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  tooltip?: React.ReactNode;
}

export const TileTitle = React.forwardRef<
  HTMLParagraphElement,
  TileTitleProps
>(({ className, tooltip, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(styles.title, styles.titleWithIcon, "ui-mono-13", className)}
      {...props}
    >
      <span className={styles.titleText}>{children}</span>
      {tooltip != null && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger render={<span className={styles.titleHelpIcon} />}>
              <Icon name="HelpCircle" size="md" />
            </TooltipTrigger>
            <TooltipContent>{tooltip}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </p>
  );
});

TileTitle.displayName = "TileTitle";

// Tile Content
export interface TileContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const TileContent = React.forwardRef<HTMLDivElement, TileContentProps>(
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

TileContent.displayName = "TileContent";
