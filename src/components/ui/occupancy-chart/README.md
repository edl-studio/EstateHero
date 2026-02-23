# OccupancyChart Component

A half donut chart component built with Recharts that displays occupancy rate with a centered value and label.

## Features

- **Half Donut Chart**: Displays data in a semi-circular gauge format
- **Customizable Center Content**: Shows value, unit, and label in the center
- **Badge Display**: Optional badge with occupancy rate text below the chart
- **Recharts Integration**: Built using the recharts library for reliable rendering
- **Design System Compliance**: Follows EstateHero typography and color conventions

## Installation

The component uses recharts which is already installed:

```bash
npm install recharts
```

## Usage

### Basic Example

```tsx
import { OccupancyChart } from "@/components/ui/occupancy-chart";

function Example() {
  return (
    <OccupancyChart
      occupancyRate={40}
      centerValue="681"
      centerUnit="m²"
      centerLabel="Ground area"
      badgeText="40% occupancy rate"
    />
  );
}
```

### In a Tile

```tsx
import { Tile, TileHeader, TileTitle, TileContent } from "@/components/ui/tile";
import { OccupancyChart } from "@/components/ui/occupancy-chart";

function OccupancyTile() {
  return (
    <Tile>
      <TileHeader>
        <TileTitle>Occupancy</TileTitle>
      </TileHeader>
      <TileContent>
        <OccupancyChart
          occupancyRate={40}
          centerValue="681"
          centerUnit="m²"
          centerLabel="Ground area"
          badgeText="40% occupancy rate"
        />
      </TileContent>
    </Tile>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `occupancyRate` | `number` | - | The occupancy percentage (0-100) |
| `centerValue` | `string \| number` | - | The value to display in the center |
| `centerUnit` | `string` | - | The unit for the center value (e.g., "m²", "units") |
| `centerLabel` | `string` | `"Ground area"` | The label above the center value |
| `badgeText` | `string` | - | The text to display below the chart |
| `className` | `string` | - | Additional CSS classes |

## Examples

### Different Occupancy Rates

```tsx
// High occupancy
<OccupancyChart
  occupancyRate={85}
  centerValue="1,250"
  centerUnit="m²"
  centerLabel="Total area"
  badgeText="85% occupancy rate"
/>

// Low occupancy
<OccupancyChart
  occupancyRate={15}
  centerValue="450"
  centerUnit="m²"
  centerLabel="Ground area"
  badgeText="15% occupancy rate"
/>
```

### Different Units

```tsx
// With units count
<OccupancyChart
  occupancyRate={62}
  centerValue="24"
  centerUnit="units"
  centerLabel="Occupied units"
  badgeText="62% occupancy rate"
/>

// Without unit
<OccupancyChart
  occupancyRate={55}
  centerValue="1,890"
  centerLabel="Square meters"
  badgeText="55% occupancy rate"
/>
```

### Custom Labels

```tsx
<OccupancyChart
  occupancyRate={73}
  centerValue="18"
  centerUnit="floors"
  centerLabel="Occupied floors"
  badgeText="73% occupancy rate"
/>
```

## Design Tokens

The component uses the following design tokens from the Figma design:

### Typography
- **Title (Occupancy)**: `font-mono`, 13px, uppercase, gray-600
- **Center Label**: `font-sans`, 14px, gray-500
- **Center Value**: `font-mono`, 36px, semibold, gray-950
- **Center Unit**: `font-sans`, 18px/11.61px (with superscript)
- **Badge Text**: `font-sans`, 14px, gray-950

### Colors
- **Occupied**: Orange (#F97316)
- **Vacant**: Gray-100 (#F3F4F6)
- **Badge Dot**: Orange (#F97316)

### Layout
- **Chart Height**: 132px
- **Chart Width**: 240px
- **Gap between chart and badge**: 24px

## Component Structure

```
occupancy-chart/
├── occupancy-chart.tsx         # Component implementation
├── occupancy-chart.stories.tsx # Storybook stories
├── index.ts                    # Barrel export
└── README.md                   # This file
```

## Implementation Details

### Chart Configuration

The component uses Recharts' PieChart with the following settings:
- **StartAngle**: 180° (left side)
- **EndAngle**: 0° (right side)
- **InnerRadius**: 85px (for donut effect)
- **OuterRadius**: 132px
- **No stroke** on the chart segments

### Center Content Positioning

The center content is positioned absolutely at:
- **Top**: 66px from chart container
- **Horizontal**: Centered using `left-1/2 -translate-x-1/2`

### Superscript Handling

The component intelligently handles units with superscripts (like "m²"):
```tsx
// Input: centerUnit="m²"
// Output: "m" in 18px + "2" in 11.61px as superscript
```

## Accessibility

The component extends `HTMLAttributes<HTMLDivElement>`, allowing standard HTML attributes:

```tsx
<OccupancyChart
  occupancyRate={40}
  centerValue="681"
  centerUnit="m²"
  aria-label="Property occupancy chart showing 40% occupancy"
  role="img"
/>
```

## Integration with Property Details Page

The component is integrated in the property details page at:
```
src/pages/property-details/property-details.tsx
```

Two occupancy tiles are displayed side by side:
1. Ground area occupancy (40%, 681 m²)
2. Unit occupancy (75%, 24 units)
