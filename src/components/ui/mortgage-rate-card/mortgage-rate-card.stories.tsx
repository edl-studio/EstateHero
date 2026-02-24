import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { TooltipProvider } from "@/components/ui/tooltip";
import { MortgageRateCard } from "./mortgage-rate-card";

import mortgageInterestRateImage from "@/assets/images/mortgage-interest-rate.png";

const meta: Meta<typeof MortgageRateCard> = {
  title: "UI/MortgageRateCard",
  component: MortgageRateCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Card similar to ValueCard.illustration: illustration top-left, label, and meta value (no input).
Includes a 20Y/30Y tab switch in the top-right. Uses shadow/2xs and same dimensions as ValueCard.illustration (Figma 1335-24458).
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
  argTypes: {
    duration: {
      control: "radio",
      options: ["20y", "30y"],
      description: "Selected duration tab",
    },
    onDurationChange: { action: "onDurationChange" },
  },
};

export default meta;
type Story = StoryObj<typeof MortgageRateCard>;

export const Default: Story = {
  args: {
    illustration: (
      <img src={mortgageInterestRateImage} alt="" width={32} height={40} />
    ),
    label: "Mortgage interest rate",
    labelTooltip: "Interest rate for the mortgage.",
    value: "3.85",
    metric: "%",
    duration: "20y",
  },
};

export const ThirtyYear: Story = {
  args: {
    illustration: (
      <img src={mortgageInterestRateImage} alt="" width={32} height={40} />
    ),
    label: "Mortgage interest rate",
    labelTooltip: "Interest rate for the mortgage.",
    value: "3.85",
    metric: "%",
    duration: "30y",
  },
};
