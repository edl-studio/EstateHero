import * as React from "react";
import { Tabs as BaseTabs } from "@base-ui-components/react/tabs";
import { cn } from "@/lib/utils";

import styles from "./segmented-tabs.module.css";

export interface SegmentedTabsItem {
  /** Value when this option is selected */
  value: string;
  /** Label shown in the tab (e.g. "20Y") */
  label: string;
}

export interface SegmentedTabsProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof BaseTabs.Root>,
    "children" | "orientation"
  > {
  /** Options to display as segments (e.g. [{ value: "20y", label: "20Y" }, { value: "30y", label: "30Y" }]) */
  items: SegmentedTabsItem[];
  /** Optional className for the root */
  className?: string;
  /** Optional className for the list container */
  listClassName?: string;
}

/**
 * Segmented tab switch (Figma 1335-24463): rounded container with neutral
 * background, selected tab has white/card background. Uses Base UI Tabs.
 */
export const SegmentedTabs = React.forwardRef<
  React.ComponentRef<typeof BaseTabs.Root>,
  SegmentedTabsProps
>(
  (
    {
      value,
      onValueChange,
      defaultValue,
      items,
      className,
      listClassName,
      ...props
    },
    ref
  ) => {
    return (
      <BaseTabs.Root
        ref={ref}
        value={value}
        onValueChange={onValueChange}
        defaultValue={defaultValue}
        orientation="horizontal"
        className={cn(styles.root, className)}
        {...props}
      >
        <BaseTabs.List
          className={cn(styles.list, listClassName)}
          aria-label="Options"
        >
          {items.map((item) => (
            <BaseTabs.Tab
              key={item.value}
              value={item.value}
              className={cn(styles.tab, "ui-mono-12")}
            >
              {item.label}
            </BaseTabs.Tab>
          ))}
        </BaseTabs.List>
      </BaseTabs.Root>
    );
  }
);

SegmentedTabs.displayName = "SegmentedTabs";
