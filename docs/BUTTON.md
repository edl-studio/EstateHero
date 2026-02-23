# Button Component

A comprehensive, accessible button component built on Base UI with support for multiple variants, sizes, icons, and states.

## Features

✅ **Built on Base UI** - Uses `@base-ui-components/react/button` for accessibility
✅ **Multiple Variants** - Primary, Secondary, Ghost, Outline, Destructive
✅ **Three Sizes** - Small (36px), Medium (40px), Large (44px)
✅ **Icon Support** - Left icons, right icons, and icon-only buttons
✅ **Loading States** - Built-in loading spinner
✅ **Full Accessibility** - Keyboard navigation, ARIA attributes
✅ **Type Safe** - Complete TypeScript definitions
✅ **CSS Variables** - Uses shadcn color system

## Installation

The button component is already installed in your project at:
- Component: `src/components/ui/button/button.tsx`
- Stories: `src/components/ui/button/button.stories.tsx`
- Barrel export: `src/components/ui/button/index.ts`

## Usage

### Basic Button

```tsx
import { Button } from "@/components/ui/button";

<Button variant="primary">Click me</Button>
```

### With Left Icon

```tsx
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

<Button iconLeft={<Icon name="Search" />}>
  Search Properties
</Button>
```

### With Right Icon

```tsx
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

<Button iconRight={<Icon name="ChevronRight" />}>
  Next Step
</Button>
```

### Icon Only Button

```tsx
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

<Button 
  variant="ghost" 
  iconLeft={<X className="h-4 w-4" />}
  aria-label="Close"
/>
```

**Important:** Always include `aria-label` for icon-only buttons for accessibility.

### Loading State

```tsx
<Button isLoading>Saving...</Button>
```

### Disabled State

```tsx
<Button disabled>Disabled Button</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"primary" \| "secondary" \| "ghost" \| "outline" \| "destructive"` | `"primary"` | Visual style variant |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Button size |
| `iconLeft` | `React.ReactNode` | - | Icon to display before text (recommended: 16×16px) |
| `iconRight` | `React.ReactNode` | - | Icon to display after text (recommended: 16×16px) |
| `isLoading` | `boolean` | `false` | Shows loading spinner and disables button |
| `disabled` | `boolean` | `false` | Disables button interaction |
| `children` | `React.ReactNode` | - | Button text content |

Plus all standard HTML button attributes (`onClick`, `type`, `className`, etc.)

## Variants

### Primary
Used for main call-to-action buttons.

```tsx
<Button variant="primary">Save Changes</Button>
```

### Secondary
Used for secondary actions.

```tsx
<Button variant="secondary">Cancel</Button>
```

### Ghost
Transparent background with hover effect.

```tsx
<Button variant="ghost">View Details</Button>
```

### Outline
Border with transparent background.

```tsx
<Button variant="outline">Add Filter</Button>
```

### Destructive
For dangerous actions like deleting.

```tsx
<Button variant="destructive">Delete Property</Button>
```

## Sizes

```tsx
<Button size="sm">Small Button</Button>
<Button size="md">Medium Button</Button>
<Button size="lg">Large Button</Button>
```

## Icon Guidelines

- **Recommended icon size:** 16×16px (`h-4 w-4` in Tailwind)
- **Icon library:** Use `lucide-react` for consistency
- **Icon-only buttons:** Always include `aria-label` for accessibility

```tsx
import { Search, Plus, X, ChevronRight, Download } from "lucide-react";

// Good - proper icon size
<Button iconLeft={<Search className="h-4 w-4" />}>Search</Button>

// Bad - inconsistent icon size
<Button iconLeft={<Search className="h-8 w-8" />}>Search</Button>
```

## Real-World Examples

### Property Search Action
```tsx
<Button variant="primary" iconLeft={<Icon name="Search" />}>
  Search Properties
</Button>
```

### Form Actions
```tsx
<div className="flex gap-2">
  <Button variant="primary" isLoading>Saving...</Button>
  <Button variant="ghost">Cancel</Button>
</div>
```

### Danger Zone
```tsx
<div className="flex gap-2">
  <Button variant="destructive">Delete Property</Button>
  <Button variant="outline">Cancel</Button>
</div>
```

### Navigation
```tsx
<Button variant="primary" iconRight={<Icon name="ChevronRight" />}>
  Continue to Next Step
</Button>
```

## Accessibility

- ✅ **Keyboard Support:** Full keyboard navigation (Tab, Enter, Space)
- ✅ **Focus Indicators:** Visible focus ring (keyboard-only via `focus-visible`)
- ✅ **ARIA Attributes:** Proper `aria-busy`, `aria-disabled`, `aria-label`
- ✅ **Screen Readers:** Descriptive labels and states

### Keyboard Navigation
- **Tab:** Focus the button
- **Enter or Space:** Activate the button
- **Focus ring:** Only visible when navigating with keyboard

## Storybook

View all button examples in Storybook:

```bash
npm run storybook
```

Stories include:
- All variants (Primary, Secondary, Ghost, Outline, Destructive)
- All sizes (Small, Medium, Large)
- Icon positions (Left, Right, Both, Icon-only)
- States (Default, Hover, Disabled, Loading)
- Real-world examples
- Interactive playground

## Implementation Details

### Built on Base UI
```tsx
import { Button as BaseButton } from "@base-ui-components/react/button";
```

### Uses CVA for Variants
```tsx
import { cva, type VariantProps } from "class-variance-authority";
```

### CSS Variables
All colors use shadcn CSS variables for theme consistency:
- `bg-primary` / `text-primary-foreground`
- `bg-secondary` / `text-secondary-foreground`
- `bg-destructive` / `text-destructive-foreground`
- `hover:bg-accent` / `hover:text-accent-foreground`

### Icon-Only Detection
The component automatically detects icon-only buttons (no children) and applies appropriate padding/sizing:

```tsx
const isIconOnly = !children && (!!iconLeft || !!iconRight);
```

## Testing

Type checking:
```bash
npm run type-check
```

Linting:
```bash
npm run lint
```

## Next Steps

The button component is complete and ready to use! You can now:

1. ✅ Import and use in your application
2. ✅ View in Storybook for examples
3. ✅ Customize variants if needed
4. ✅ Build other components that depend on Button

## Related Components

The button component follows the same patterns as:
- IconContainer (already built)
- Input (to be built next)
- Badge (planned)

All components share:
- Base UI primitives
- CVA for variants
- shadcn CSS variables
- TypeScript definitions
- Storybook stories
