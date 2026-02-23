# Tile Component

A flexible card-like container component for displaying grouped information with a header section.

## Overview

The Tile component provides a clean, bordered card design with distinct header and content sections. It follows a compound component pattern similar to Card, allowing for flexible composition while maintaining consistent styling.

## Components

### Tile (Root)
The main container component with border, shadow, and padding.

### TileHeader
Header section with bottom border, designed to contain the tile title and optional actions.

### TileTitle
Typography component for the tile header text - uses monospace font, uppercase styling.

### TileContent
Content container with appropriate top padding.

## Usage

### Basic Example

```tsx
import { Tile, TileHeader, TileTitle, TileContent } from "@/components/ui/tile";

function Example() {
  return (
    <Tile>
      <TileHeader>
        <TileTitle>Occupancy</TileTitle>
      </TileHeader>
      <TileContent>
        <p>This property is currently occupied.</p>
      </TileContent>
    </Tile>
  );
}
```

### With MetadataItem Components

```tsx
<Tile className="w-[440px]">
  <TileHeader>
    <TileTitle>Property Value</TileTitle>
  </TileHeader>
  <TileContent>
    <MetadataItem
      variant="data-group"
      label="Market Value"
      dataValue="7,728,337"
      dataUnit="DKK"
    />
  </TileContent>
</Tile>
```

### Custom Header with Actions

```tsx
<Tile className="w-[440px]">
  <TileHeader className="flex items-center justify-between">
    <TileTitle>Financial Summary</TileTitle>
    <Badge variant="info">Updated</Badge>
  </TileHeader>
  <TileContent>
    {/* content */}
  </TileContent>
</Tile>
```

### Multiple Content Items

```tsx
<Tile className="w-[440px]">
  <TileHeader>
    <TileTitle>Property Details</TileTitle>
  </TileHeader>
  <TileContent>
    <div className="flex flex-col gap-4">
      <MetadataItem ... />
      <MetadataItem ... />
      <MetadataItem ... />
    </div>
  </TileContent>
</Tile>
```

## Styling

### Default Styles

- **Border**: 1px solid using `border-border` color variable
- **Border Radius**: `rounded-lg` (8px)
- **Background**: `bg-background` (white)
- **Shadow**: `shadow-sm`
- **Padding**: `p-5` (20px all sides)

### Header Styles

- **Border**: Bottom border using `border-border`
- **Padding**: `pb-3` (12px bottom)

### Title Styles

- **Font**: Monospace (`font-mono`)
- **Size**: 13px
- **Weight**: Normal (400)
- **Transform**: Uppercase
- **Tracking**: Wider letter spacing
- **Color**: Muted foreground

### Content Styles

- **Padding**: `pt-4` (16px top)
- **Layout**: Flex column

## Composition

The Tile component works well with:

- **MetadataItem** - For displaying labeled data and actions
- **Badge** - For status indicators
- **Button** - For actions (via MetadataItem button variant)
- **Icons** - For visual indicators

## Width Management

Tiles don't have a default width. Set width via className:

```tsx
<Tile className="w-[440px]">  {/* Fixed width */}
<Tile className="w-full">     {/* Full width */}
<Tile className="min-w-[320px] max-w-[600px]">  {/* Constraints */}
```

## Accessibility

- Uses semantic HTML structure
- Proper heading hierarchy with `TileTitle`
- All interactive elements within remain keyboard accessible
- Color contrast meets WCAG AA standards

## Common Patterns

### Two Column Layout

```tsx
<div className="grid grid-cols-2 gap-6">
  <Tile>...</Tile>
  <Tile>...</Tile>
</div>
```

### Stacked Tiles

```tsx
<div className="flex flex-col gap-4">
  <Tile>...</Tile>
  <Tile>...</Tile>
  <Tile>...</Tile>
</div>
```

### Tile Grid

```tsx
<div className="grid grid-cols-2 gap-6">
  {tiles.map((tile) => (
    <Tile key={tile.id}>
      <TileHeader>
        <TileTitle>{tile.title}</TileTitle>
      </TileHeader>
      <TileContent>
        {tile.content}
      </TileContent>
    </Tile>
  ))}
</div>
```

## Design Tokens

The component uses these CSS variables:
- `--background` - Tile background
- `--border` - Border and divider color
- `--muted-foreground` - Title text color

## Related Components

- **Card** - Similar compound pattern for general content
- **MetadataItem** - Designed to work inside TileContent
- **PropertyHeader** - Page-level header component
