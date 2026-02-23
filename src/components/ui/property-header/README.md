# Property Header

A header component for property details pages that displays key information including meta labels, headings, metadata items, and action buttons.

## Features

- **Meta Label**: Optional category or type label displayed above the heading
- **Large Heading**: Prominent heading for addresses, names, or titles
- **Metadata Section**: Flexible container for metadata items
- **Actions Section**: Container for action buttons with consistent spacing
- **Flexible Composition**: Compose with MetadataItem and Button components

## Installation

```tsx
import { PropertyHeader } from "@/components/ui/property-header";
```

## Basic Usage

### Minimal Example

```tsx
<PropertyHeader
  heading="Holbækvej 37, 4000 Roskilde"
/>
```

### With Meta Label

```tsx
<PropertyHeader
  metaLabel="Residential"
  heading="Holbækvej 37, 4000 Roskilde"
/>
```

### Full Example

```tsx
import { PropertyHeader } from "@/components/ui/property-header";
import { MetadataItem } from "@/components/ui/metadata-item";
import { Button } from "@/components/ui/button";

<PropertyHeader
  metaLabel="Residential"
  heading="Holbækvej 37, 4000 Roskilde"
  metadataItems={
    <>
      <MetadataItem
        variant="data-group"
        label="Property Value"
        icon={<HomeIcon />}
        dataValue="7.728.337"
        dataUnit="DKK"
        labelIcon={<HelpIcon />}
      />
      <MetadataItem
        variant="data-group"
        label="Market Trend"
        icon={<ChartIcon />}
        dataValue="+12.5%"
      />
      <MetadataItem
        variant="button"
        label="Last Updated"
        buttonText="View History"
        buttonIcon={<CalendarIcon />}
      />
    </>
  }
  actions={
    <>
      <Button variant="outline" iconLeft={<ShareIcon />}>
        Share
      </Button>
      <Button variant="outline" iconLeft={<DownloadIcon />}>
        Download
      </Button>
      <Button variant="outline" iconLeft={<PrintIcon />}>
        Print
      </Button>
    </>
  }
/>
```

## API Reference

### PropertyHeaderProps

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `metaLabel` | `string` | No | - | Optional meta label displayed above the heading (e.g., "Residential") |
| `heading` | `string` | Yes | - | Main heading text (e.g., address or company name) |
| `metadataItems` | `React.ReactNode` | No | - | React nodes containing MetadataItem components |
| `actions` | `React.ReactNode` | No | - | React nodes containing action buttons |
| `className` | `string` | No | - | Additional CSS classes |

Extends `React.HTMLAttributes<HTMLDivElement>` for additional HTML div attributes.

## Composition

### With MetadataItem Components

The `metadataItems` prop accepts React nodes, typically MetadataItem components:

```tsx
metadataItems={
  <>
    <MetadataItem
      variant="data-group"
      label="Property Value"
      icon={<HomeIcon />}
      dataValue="7.728.337"
      dataUnit="DKK"
    />
    <MetadataItem
      variant="button"
      label="Documents"
      buttonText="View All"
    />
  </>
}
```

### With Action Buttons

The `actions` prop accepts React nodes, typically Button components:

```tsx
actions={
  <>
    <Button variant="primary">
      Schedule Visit
    </Button>
    <Button variant="outline" iconLeft={<ShareIcon />}>
      Share
    </Button>
    <Button variant="outline" iconLeft={<DownloadIcon />}>
      Download
    </Button>
  </>
}
```

## Examples

### Residential Property

```tsx
<PropertyHeader
  metaLabel="Residential"
  heading="Søndergade 12, 1000 København"
  metadataItems={
    <>
      <MetadataItem
        variant="data-group"
        label="Purchase Price"
        icon={<HomeIcon />}
        dataValue="4.250.000"
        dataUnit="DKK"
      />
      <MetadataItem
        variant="data-group"
        label="Appreciation"
        icon={<ChartIcon />}
        dataValue="+15.2%"
      />
      <MetadataItem
        variant="data-group"
        label="Bedrooms"
        dataValue="3"
      />
    </>
  }
  actions={
    <>
      <Button variant="primary">
        Contact Agent
      </Button>
      <Button variant="outline" iconLeft={<ShareIcon />}>
        Share
      </Button>
    </>
  }
/>
```

### Commercial Property

```tsx
<PropertyHeader
  metaLabel="Commercial Office"
  heading="Tech Park Building 5, Lyngby"
  metadataItems={
    <>
      <MetadataItem
        variant="data-group"
        label="Annual Revenue"
        icon={<ChartIcon />}
        dataValue="18.500.000"
        dataUnit="DKK"
      />
      <MetadataItem
        variant="data-group"
        label="Occupancy"
        dataValue="100%"
      />
      <MetadataItem
        variant="data-group"
        label="Lease Term"
        dataValue="5 years"
      />
    </>
  }
  actions={
    <>
      <Button variant="primary">
        View Lease Terms
      </Button>
      <Button variant="outline" iconLeft={<DownloadIcon />}>
        Download
      </Button>
    </>
  }
/>
```

## Styling

### Layout

The component uses a fixed-width layout:

- **Width**: 1312px
- **Padding**: 32px
- **Border Radius**: 12px
- **Shadow**: Subtle shadow (sm)

### Content Structure

- **Content Width**: 709px
- **Gap Between Sections**: 20px (heading to metadata), 40px (metadata items)
- **Actions Gap**: 8px between buttons

### Typography

- **Meta Label**: 
  - Font: Mono (RM Mono TRIAL)
  - Size: 14px
  - Weight: 400 (Regular)
  - Transform: Uppercase
  - Line Height: 120%
  - Color: Muted foreground

- **Heading**:
  - Font: Sans (Elza Text)
  - Size: 32px
  - Weight: 500 (Medium)
  - Line Height: 140%
  - Color: Foreground

### Customization

You can override styles using the `className` prop:

```tsx
<PropertyHeader
  className="max-w-screen-xl"
  heading="Custom Width Example"
/>
```

## Accessibility

- Semantic HTML structure with proper heading hierarchy
- The heading uses `<h1>` tag for proper document outline
- All interactive elements (buttons) maintain proper focus states
- ARIA attributes are inherited from composed components

## Design Specifications

Based on the Figma design:

```
PropertyHeader
├── display: flex
├── width: 1312px
├── height: 285px
├── padding: 32px
├── gap: 40px
├── border-radius: 12px
├── border: 1px solid var(--Gray-200)
├── background: var(--White)
└── box-shadow: 0 1px 3px 0 rgba(10, 13, 18, 0.10)

  Content
  ├── display: flex
  ├── width: 709px
  ├── flex-direction: column
  ├── gap: 20px
  
    Heading
    ├── display: flex
    ├── flex-direction: column
    ├── gap: 20px
    ├── Meta Label (uppercase, mono, 14px)
    └── Heading Text (sans, 32px, medium)
    
    Metadata
    ├── display: flex
    ├── flex-direction: column
    ├── gap: 40px
    ├── Meta Stack (gap: 32px)
    └── Actions (gap: 8px)
```

## Dependencies

- `@/components/ui/metadata-item` - For displaying metadata
- `@/components/ui/button` - For action buttons
- `@/lib/utils` - For className merging

## Related Components

- [MetadataItem](../metadata-item/README.md) - Display individual metadata entries
- [Button](../button/README.md) - Action buttons
- [Card](../card/README.md) - For alternative card layouts

## Best Practices

1. **Keep headings concise**: While long headings are supported, aim for clarity
2. **Limit metadata items**: 3-5 items work best for visual hierarchy
3. **Prioritize actions**: Show only the most important actions (2-4 buttons)
4. **Use semantic meta labels**: Choose clear category labels like "Residential", "Commercial", etc.
5. **Compose thoughtfully**: Use MetadataItem variants consistently

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Version History

- **1.0.0** - Initial release
