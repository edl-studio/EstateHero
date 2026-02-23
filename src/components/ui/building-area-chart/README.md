# BuildingAreaChart Component

A full donut chart component built with Recharts that displays area distribution with multiple categories, centered value, and legend below.

## Features

- **Full Donut Chart**: Displays data in a complete circular gauge format
- **Multiple Categories**: Supports multiple data segments with custom colors
- **Customizable Center Content**: Shows total value, unit, and label in the center
- **Legend Below**: Displays all categories with color dots below the chart
- **Recharts Integration**: Built using the recharts library for reliable rendering
- **Design System Compliance**: Follows EstateHero typography and color conventions

## Usage

### Basic Example

```tsx
import { BuildingAreaChart } from "@/components/ui/building-area-chart";

function Example() {
  return (
    <BuildingAreaChart
      data={[
        { name: "residential", value: 70, color: "#DBEAFE", label: "Residential units" },
        { name: "garage", value: 30, color: "#3B82F6", label: "Garage" },
      ]}
      centerValue="336"
      centerUnit="m²"
      centerLabel="Area"
    />
  );
}
```

### In a Tile

```tsx
import { Tile, TileHeader, TileTitle, TileContent } from "@/components/ui/tile";
import { BuildingAreaChart } from "@/components/ui/building-area-chart";

function BuildingAreaTile() {
  return (
    <Tile>
      <TileHeader>
        <TileTitle>Building Area</TileTitle>
      </TileHeader>
      <TileContent>
        <BuildingAreaChart
          data={[
            { name: "residential", value: 70, color: "#DBEAFE", label: "Residential units" },
            { name: "garage", value: 30, color: "#3B82F6", label: "Garage" },
          ]}
          centerValue="336"
          centerUnit="m²"
          centerLabel="Area"
        />
      </TileContent>
    </Tile>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `BuildingAreaChartDataItem[]` | - | Array of data items for the chart |
| `centerValue` | `string \| number` | - | The value to display in the center |
| `centerUnit` | `string` | - | The unit for the center value (e.g., "m²", "units") |
| `centerLabel` | `string` | `"Area"` | The label above the center value |
| `className` | `string` | - | Additional CSS classes |

### BuildingAreaChartDataItem

```tsx
interface BuildingAreaChartDataItem {
  name: string;      // Unique identifier
  value: number;     // Percentage or absolute value
  color: string;     // Hex color for the segment
  label: string;     // Display label in legend
}
```

## Examples

### Two Categories

```tsx
<BuildingAreaChart
  data={[
    { name: "residential", value: 85, color: "#DBEAFE", label: "Residential units" },
    { name: "garage", value: 15, color: "#3B82F6", label: "Garage" },
  ]}
  centerValue="450"
  centerUnit="m²"
  centerLabel="Total area"
/>
```

### Four Categories

```tsx
<BuildingAreaChart
  data={[
    { name: "residential", value: 50, color: "#DBEAFE", label: "Residential" },
    { name: "commercial", value: 25, color: "#93C5FD", label: "Commercial" },
    { name: "garage", value: 15, color: "#3B82F6", label: "Garage" },
    { name: "storage", value: 10, color: "#1E40AF", label: "Storage" },
  ]}
  centerValue="1,250"
  centerUnit="m²"
  centerLabel="Total"
/>
```

### Different Units

```tsx
// With units count
<BuildingAreaChart
  data={[
    { name: "apartments", value: 75, color: "#DBEAFE", label: "Apartments" },
    { name: "offices", value: 25, color: "#3B82F6", label: "Offices" },
  ]}
  centerValue="48"
  centerUnit="units"
  centerLabel="Total units"
/>

// Without unit
<BuildingAreaChart
  data={[
    { name: "used", value: 65, color: "#93C5FD", label: "Used space" },
    { name: "available", value: 35, color: "#DBEAFE", label: "Available" },
  ]}
  centerValue="2,340"
  centerLabel="Square meters"
/>
```

## Design Tokens

The component uses the following design tokens from the Figma design:

### Typography
- **Title (Building Area)**: `font-mono`, 13px, uppercase, gray-600
- **Center Label**: `font-sans`, 14px, gray-500
- **Center Value**: `font-mono`, 24px, semibold, gray-950, line-height: 32px
- **Center Unit**: `font-sans`, 12px/7.74px (with superscript)
- **Legend Text**: `font-sans`, 14px, gray-950

### Layout
- **Chart Size**: 150px × 150px
- **Inner Radius**: 48px
- **Outer Radius**: 75px
- **Gap between chart and legend**: 14px
- **Gap between legend items**: 16px

### Colors
Colors are fully customizable via the `data` prop. Common palettes:
- **Blue tones**: `#DBEAFE` (light), `#93C5FD` (medium), `#3B82F6` (dark)
- **Green tones**: `#86EFAC` (light), `#22C55E` (dark)

## Component Structure

```
building-area-chart/
├── building-area-chart.tsx         # Component implementation
├── building-area-chart.stories.tsx # Storybook stories
├── index.ts                        # Barrel export
└── README.md                       # This file
```

## Implementation Details

### Chart Configuration

The component uses Recharts' PieChart with the following settings:
- **Full circle**: 0° to 360°
- **InnerRadius**: 48px (for donut effect)
- **OuterRadius**: 75px
- **CornerRadius**: 2px (rounded segments)
- **No stroke** on the chart segments

### Center Content Positioning

The center content is positioned absolutely at:
- **Left**: 44px from chart container
- **Top**: 52px from chart container

### Legend Layout

The legend uses flexbox with:
- **Gap**: 16px between items
- **Color dot**: 8px circle
- **Mix-blend-multiply**: Applied to legend items

### Superscript Handling

The component intelligently handles units with superscripts (like "m²"):
```tsx
// Input: centerUnit="m²"
// Output: "m" in 12px + "2" in 7.74px as superscript
```

## Integration with Property Details Page

The component is integrated in the property details page at:
```
src/pages/property-details/property-details.tsx
```

Used in the "Building Area" tile showing residential units and garage distribution.

## Accessibility

The component extends `HTMLAttributes<HTMLDivElement>`, allowing standard HTML attributes:

```tsx
<BuildingAreaChart
  data={data}
  centerValue="336"
  centerUnit="m²"
  aria-label="Building area distribution chart"
  role="img"
/>
```
