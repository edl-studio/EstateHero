import type { Meta, StoryObj } from "@storybook/react";
import { OccupancyChart } from "./occupancy-chart";

/**
 * The OccupancyChart component displays a half donut chart showing occupancy rate
 * with a centered value and label. Built using recharts library.
 *
 * ## Usage
 *
 * ```tsx
 * import { OccupancyChart } from "@/components/ui/occupancy-chart";
 *
 * <OccupancyChart
 *   occupancyRate={40}
 *   centerValue="681"
 *   centerUnit="m²"
 *   centerLabel="Ground area"
 *   badgeText="40% occupancy rate"
 * />
 * ```
 */
const meta = {
  title: "UI/OccupancyChart",
  component: OccupancyChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    occupancyRate: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "The occupancy percentage (0-100)",
    },
    centerValue: {
      control: "text",
      description: "The value to display in the center",
    },
    centerUnit: {
      control: "text",
      description: "The unit for the center value (e.g., 'm²', 'units')",
    },
    centerLabel: {
      control: "text",
      description: "The label above the center value",
    },
    badgeText: {
      control: "text",
      description: "The text to display below the chart",
    },
  },
} satisfies Meta<typeof OccupancyChart>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default occupancy chart showing 40% occupancy rate with ground area measurement.
 */
export const Default: Story = {
  args: {
    occupancyRate: 40,
    centerValue: "681",
    centerUnit: "m²",
    centerLabel: "Ground area",
    badgeText: "40% occupancy rate",
  },
};

/**
 * High occupancy rate (85%) example.
 */
export const HighOccupancy: Story = {
  args: {
    occupancyRate: 85,
    centerValue: "1,250",
    centerUnit: "m²",
    centerLabel: "Total area",
    badgeText: "85% occupancy rate",
  },
};

/**
 * Low occupancy rate (15%) example.
 */
export const LowOccupancy: Story = {
  args: {
    occupancyRate: 15,
    centerValue: "450",
    centerUnit: "m²",
    centerLabel: "Ground area",
    badgeText: "15% occupancy rate",
  },
};

/**
 * Full occupancy (100%) example.
 */
export const FullOccupancy: Story = {
  args: {
    occupancyRate: 100,
    centerValue: "2,400",
    centerUnit: "m²",
    centerLabel: "Total area",
    badgeText: "100% occupancy rate",
  },
};

/**
 * Empty occupancy (0%) example.
 */
export const EmptyOccupancy: Story = {
  args: {
    occupancyRate: 0,
    centerValue: "0",
    centerUnit: "m²",
    centerLabel: "Ground area",
    badgeText: "0% occupancy rate",
  },
};

/**
 * Alternative unit example (showing number of units instead of area).
 */
export const WithUnitsCount: Story = {
  args: {
    occupancyRate: 62,
    centerValue: "24",
    centerUnit: "units",
    centerLabel: "Occupied units",
    badgeText: "62% occupancy rate",
  },
};

/**
 * Without unit label.
 */
export const WithoutUnit: Story = {
  args: {
    occupancyRate: 55,
    centerValue: "1,890",
    centerLabel: "Square meters",
    badgeText: "55% occupancy rate",
  },
};

/**
 * Minimal version without badge text.
 */
export const WithoutBadge: Story = {
  args: {
    occupancyRate: 40,
    centerValue: "681",
    centerUnit: "m²",
    centerLabel: "Ground area",
  },
};

/**
 * Custom center label example.
 */
export const CustomLabel: Story = {
  args: {
    occupancyRate: 73,
    centerValue: "18",
    centerUnit: "floors",
    centerLabel: "Occupied floors",
    badgeText: "73% occupancy rate",
  },
};

/**
 * Very high value with formatting.
 */
export const LargeValue: Story = {
  args: {
    occupancyRate: 68,
    centerValue: "15,890",
    centerUnit: "m²",
    centerLabel: "Total area",
    badgeText: "68% occupancy rate",
  },
};
