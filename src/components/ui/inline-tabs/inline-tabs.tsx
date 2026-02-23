import * as React from "react";
import { Tabs as BaseTabs } from "@base-ui-components/react/tabs";
import { cn } from "@/lib/utils";
import styles from "./inline-tabs.module.css";

// Tabs Root
export interface TabsRootProps
  extends React.ComponentPropsWithoutRef<typeof BaseTabs.Root> {
  /** The value of the tab that should be active by default */
  defaultValue?: string;
  /** The controlled value of the active tab */
  value?: string;
  /** Callback when the active tab changes */
  onValueChange?: (value: string) => void;
}

export const TabsRoot = React.forwardRef<
  React.ElementRef<typeof BaseTabs.Root>,
  TabsRootProps
>(({ className, ...props }, ref) => {
  return (
    <BaseTabs.Root
      ref={ref}
      className={cn(styles.root, className)}
      {...props}
    />
  );
});

TabsRoot.displayName = "TabsRoot";

// Tabs List
export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof BaseTabs.List> {
  /** Whether the tabs should take up full width */
  fullWidth?: boolean;
}

export const TabsList = React.forwardRef<
  React.ElementRef<typeof BaseTabs.List>,
  TabsListProps
>(({ className, fullWidth, ...props }, ref) => {
  return (
    <BaseTabs.List
      ref={ref}
      className={cn(
        styles.list,
        fullWidth && styles.listFullWidth,
        className
      )}
      {...props}
    />
  );
});

TabsList.displayName = "TabsList";

// Tabs Tab (Trigger)
export interface TabsTabProps
  extends React.ComponentPropsWithoutRef<typeof BaseTabs.Tab> {
  /** The value of this tab */
  value: string;
  /** Icon to display before the tab text */
  icon?: React.ReactNode;
}

export const TabsTab = React.forwardRef<
  React.ElementRef<typeof BaseTabs.Tab>,
  TabsTabProps
>(({ className, icon, children, value, ...props }, ref) => {
  return (
      <BaseTabs.Tab
        ref={ref}
        className={cn(styles.tab, "ui-sans-regular-14", className)}
        value={value}
        {...props}
      >
      <span className={styles.iconWrapper}>
        {icon && <span aria-hidden="true">{icon}</span>}
        {children}
      </span>
    </BaseTabs.Tab>
  );
});

TabsTab.displayName = "TabsTab";

// Tabs Panel
export interface TabsPanelProps
  extends React.ComponentPropsWithoutRef<typeof BaseTabs.Panel> {
  /** The value of the tab this panel corresponds to */
  value: string;
}

export const TabsPanel = React.forwardRef<
  React.ElementRef<typeof BaseTabs.Panel>,
  TabsPanelProps
>(({ className, ...props }, ref) => {
  return (
    <BaseTabs.Panel
      ref={ref}
      className={cn(styles.panel, className)}
      {...props}
    />
  );
});

TabsPanel.displayName = "TabsPanel";

// Named exports for convenience
export const Tabs = TabsRoot;
export const TabsTrigger = TabsTab;
export const TabsContent = TabsPanel;
