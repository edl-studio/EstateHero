# Metadata Item Component

The `MetadataItem` component displays property or data information in two variants.

## Variants

### 1. Data Group Variant

Shows a value with optional icon, unit, and badge.

```tsx
import { MetadataItem } from "@/components/ui/metadata-item";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { TrendingUp } from "lucide-react";

<MetadataItem
  variant="data-group"
  label="MARKET"
  labelIcon={<Icon name="HelpCircle" size="md" />}
  icon={<Icon name="Globe" size="xl" className="text-[#10B981]" />}
  dataValue="7.728.337"
  dataUnit="DKK"
  badge={
    <Badge variant="positive" icon={<TrendingUp size={12} strokeWidth={1.5} />}>
      5%
    </Badge>
  }
/>
```

### 2. Button Variant

Shows an action button with outline style.

```tsx
import { MetadataItem } from "@/components/ui/metadata-item";
import { Upload } from "lucide-react";

<MetadataItem
  variant="button"
  label="VALUE"
  buttonText="UPLOAD RENT ROLL"
  buttonIcon={<Upload className="w-4 h-4" />}
  onButtonClick={() => console.log("Clicked")}
/>
```

## Styling Specifications

### Label
- **Font**: IBM Plex Mono (mono)
- **Size**: 14px
- **Weight**: 400
- **Line Height**: 120%
- **Color**: #737373 (gray)
- **Transform**: UPPERCASE

### Label Icon
- **Size**: 14×14px
- **Color**: #9CA3AF (Tailwind gray-400)

### Data Group Container
- **Height**: 32px
- **Gap**: 12px

### Data Icon
- **Size**: 20×20px
- **Color**: #10B981 (Tailwind green-500)

### Data Value
- **Font**: IBM Plex Mono (mono)
- **Size**: 24px
- **Weight**: 400
- **Line Height**: 120%
- **Color**: #030712 (Tailwind gray-950)
- **Letter Spacing**: -1.44px
- **Transform**: UPPERCASE

### Data Unit
- **Font**: IBM Plex Mono (mono)
- **Size**: 24px
- **Weight**: 400
- **Line Height**: 120%
- **Color**: #737373 (gray)
- **Letter Spacing**: -1.44px
- **Transform**: UPPERCASE

## Props

### Common Props

- `label` (required): The label text displayed above the content
- `labelIcon` (optional): Icon displayed next to the label (14×14px recommended)

### Data Group Variant Props

- `variant`: `"data-group"`
- `icon` (optional): Icon displayed on the left side (20×20px)
- `dataValue` (required): The main data value (e.g., "7.728.337")
- `dataUnit` (optional): Unit text displayed after the value (e.g., "DKK")
- `badge` (optional): Badge component displayed on the right side

### Button Variant Props

- `variant`: `"button"`
- `buttonText` (required): The button text
- `buttonIcon` (optional): Icon displayed before the button text
- `onButtonClick` (optional): Button click handler

## Examples

Check the Storybook stories for more examples:
- `npm run storybook`
- Navigate to "UI/Metadata Item"
