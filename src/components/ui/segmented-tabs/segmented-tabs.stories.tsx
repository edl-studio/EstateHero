import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { SegmentedTabs } from "./segmented-tabs";

const meta: Meta<typeof SegmentedTabs> = {
  title: "UI/SegmentedTabs",
  component: SegmentedTabs,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Segmented tab switch (Figma 1335-24463): rounded container with neutral background,
selected tab has white/card background. Built on Base UI Tabs. Used in MortgageRateCard for 20Y/30Y duration.
        `,
      },
    },
  },
  argTypes: {
    value: { control: "radio", options: ["20y", "30y"] },
    onValueChange: { action: "onValueChange" },
  },
};

export default meta;
type Story = StoryObj<typeof SegmentedTabs>;

const DURATION_ITEMS = [
  { value: "20y", label: "20Y" },
  { value: "30y", label: "30Y" },
];

export const Default: Story = {
  args: {
    value: "20y",
    items: DURATION_ITEMS,
  },
};

export const ThirtyYearSelected: Story = {
  args: {
    value: "30y",
    items: DURATION_ITEMS,
  },
};

export const CustomOptions: Story = {
  args: {
    value: "a",
    items: [
      { value: "a", label: "Option A" },
      { value: "b", label: "Option B" },
      { value: "c", label: "Option C" },
    ],
  },
};
