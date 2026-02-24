import type { Meta, StoryObj } from "@storybook/react";
import { DonutChart } from "./donut-chart";

/**
 * The DonutChart component displays a donut chart with a centered value and legend.
 * Use it for any proportional data (area, units, percentages, etc.).
 *
 * ## Usage
 *
 * ```tsx
 * import { DonutChart } from "@/components/ui/donut-chart";
 *
 * <DonutChart
 *   data={[
 *     { name: "residential", value: 70, color: "#93C5FD", label: "Residential units" },
 *     { name: "garage", value: 30, color: "#3B82F6", label: "Garage" }
 *   ]}
 *   centerValue="336"
 *   centerUnit="m²"
 *   centerLabel="Area"
 * />
 * ```
 */
const meta = {
  title: "UI/DonutChart",
  component: DonutChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    data: {
      control: "object",
      description: "Array of data items with name, value, color, and label",
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
  },
} satisfies Meta<typeof DonutChart>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default donut chart showing residential units and garage areas.
 */
export const Default: Story = {
  args: {
    data: [
      { name: "residential", value: 70, color: "#DBEAFE", label: "Residential units" },
      { name: "commercial", value: 20, color: "#93C5FD", label: "Commercial" },
      { name: "garage", value: 10, color: "#3B82F6", label: "Garage" },
    ],
    centerValue: "336",
    centerUnit: "m²",
    centerLabel: "Area",
  },
};

/**
 * Two categories example - residential and garage only.
 */
export const TwoCategories: Story = {
  args: {
    data: [
      { name: "residential", value: 85, color: "#DBEAFE", label: "Residential units" },
      { name: "garage", value: 15, color: "#3B82F6", label: "Garage" },
    ],
    centerValue: "450",
    centerUnit: "m²",
    centerLabel: "Total area",
  },
};

/**
 * Four categories example showing more complex distribution.
 */
export const FourCategories: Story = {
  args: {
    data: [
      { name: "residential", value: 50, color: "#DBEAFE", label: "Residential" },
      { name: "commercial", value: 25, color: "#93C5FD", label: "Commercial" },
      { name: "garage", value: 15, color: "#3B82F6", label: "Garage" },
      { name: "storage", value: 10, color: "#1E40AF", label: "Storage" },
    ],
    centerValue: "1,250",
    centerUnit: "m²",
    centerLabel: "Total",
  },
};

/**
 * Different unit example - showing number of units instead of area.
 */
export const WithUnitsCount: Story = {
  args: {
    data: [
      { name: "apartments", value: 75, color: "#DBEAFE", label: "Apartments" },
      { name: "offices", value: 25, color: "#3B82F6", label: "Offices" },
    ],
    centerValue: "48",
    centerUnit: "units",
    centerLabel: "Total units",
  },
};

/**
 * Equal distribution example.
 */
export const EqualDistribution: Story = {
  args: {
    data: [
      { name: "type-a", value: 33, color: "#DBEAFE", label: "Type A" },
      { name: "type-b", value: 33, color: "#93C5FD", label: "Type B" },
      { name: "type-c", value: 34, color: "#3B82F6", label: "Type C" },
    ],
    centerValue: "900",
    centerUnit: "m²",
    centerLabel: "Area",
  },
};

/**
 * Large value with formatting.
 */
export const LargeValue: Story = {
  args: {
    data: [
      { name: "residential", value: 60, color: "#DBEAFE", label: "Residential" },
      { name: "commercial", value: 30, color: "#93C5FD", label: "Commercial" },
      { name: "parking", value: 10, color: "#3B82F6", label: "Parking" },
    ],
    centerValue: "12,450",
    centerUnit: "m²",
    centerLabel: "Total area",
  },
};

/**
 * Without unit label.
 */
export const WithoutUnit: Story = {
  args: {
    data: [
      { name: "used", value: 65, color: "#93C5FD", label: "Used space" },
      { name: "available", value: 35, color: "#DBEAFE", label: "Available" },
    ],
    centerValue: "2,340",
    centerLabel: "Square meters",
  },
};

/**
 * Custom colors - using green tones.
 */
export const CustomColors: Story = {
  args: {
    data: [
      { name: "occupied", value: 80, color: "#86EFAC", label: "Occupied" },
      { name: "vacant", value: 20, color: "#22C55E", label: "Vacant" },
    ],
    centerValue: "680",
    centerUnit: "m²",
    centerLabel: "Area",
  },
};
