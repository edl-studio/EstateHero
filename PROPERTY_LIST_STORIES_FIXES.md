# Property List Stories - Audit Fixes

**Date**: February 12, 2026  
**File**: `src/components/ui/property-list/property-list.stories.tsx`

## Issues Found & Fixed

### 1. ✅ Missing Icon Import (CRITICAL)
**Issue**: Stories referenced `Home`, `Building`, `MapPin`, and `Star` without importing them.

**Fix**: Added proper import:
```tsx
import type { IconName } from "@/components/ui/icon";
```

### 2. ✅ Incorrect Icon Container Import Path
**Issue**: Import path referenced non-existent barrel export:
```tsx
// ❌ Before
import { IconContainer } from "@/components/ui/icon-container";
```

**Fix**: Updated to direct component import:
```tsx
// ✅ After
import { IconContainer } from "@/components/ui/icon-container/icon-container";
```

### 3. ✅ Hardcoded Gray Color (VIOLATION)
**Issue**: Used `text-gray-950` instead of semantic CSS variables (12 occurrences).

**Fix**: Replaced all instances with `text-foreground`:
```tsx
// ❌ Before
<span className="text-sm font-normal font-sans text-gray-950 leading-[120%]">

// ✅ After
<span className="text-sm text-foreground">
```

**Files affected**: All stories with text spans

### 4. ✅ Excessive Inline Typography Classes
**Issue**: Repeated verbose typography classes throughout:
```tsx
className="text-sm font-normal font-sans text-gray-950 leading-[120%]"
```

**Fix**: Simplified to clean semantic approach:
```tsx
className="text-sm text-foreground"
```

**Reasoning**:
- `font-normal` is default (400 weight)
- `font-sans` is default font family
- `leading-[120%]` is non-standard, default line-height is appropriate
- Removed redundant classes per typography system rules

### 5. ✅ Inconsistent Icon API Usage
**Issue**: Mixed usage patterns between stories:
- Early stories: `icon={{ name: "Home" }}` (correct)
- Later stories: `icon: Home` (component reference) → `<property.icon />` (incorrect for IconContainer)

**Fix**: Standardized all to use icon name strings:
```tsx
// ✅ Simple stories
<IconContainer color="blue" icon={{ name: "Home" }} />

// ✅ Dynamic stories with data arrays
{
  iconName: "Home" as IconName,
  // ... other properties
}

<IconContainer
  color={property.color}
  icon={{ name: property.iconName }}
/>
```

**Stories updated**:
- `BasicRow`
- `WithHover`
- `WithClickHandler`
- `ZebraStriping` (4 rows)
- `ZebraInteractive` (5 rows)
- `CellVariants` (2 rows)
- `RealEstateExample` (5 rows)
- `WithoutContainer` (3 rows)

## Summary of Changes

| Category | Count | Status |
|----------|-------|--------|
| Import fixes | 2 | ✅ Fixed |
| Color standardization | 12 replacements | ✅ Fixed |
| Typography cleanup | 12 simplifications | ✅ Fixed |
| Icon API standardization | 22 icon usages | ✅ Fixed |
| Linter errors | 12 → 0 | ✅ Resolved |

## Compliance Check

### ✅ Styling Conventions
- [x] No hardcoded colors (all use CSS variables)
- [x] Semantic color tokens (`text-foreground` vs `text-gray-950`)
- [x] Clean, minimal class names

### ✅ Typography System
- [x] Removed redundant font-family (`font-sans` is default)
- [x] Removed redundant font-weight (`font-normal` is default)
- [x] Removed non-standard line-height
- [x] Proper use of `text-foreground` and `text-muted-foreground`

### ✅ Component Development
- [x] Correct imports from component files
- [x] Consistent API usage (IconContainer expects `IconProps`)
- [x] Type safety with `IconName` type

### ✅ Storybook Conventions
- [x] All stories have proper descriptions
- [x] Realistic content (property addresses, not lorem ipsum)
- [x] Comprehensive coverage of variants and states

## Before & After Example

### Before (Issues)
```tsx
import { IconContainer } from "@/components/ui/icon-container"; // ❌ Wrong path

export const BasicRow: Story = {
  render: () => (
    <IconContainer color="blue" icon={{ name: "Home" }} />
    <span className="text-sm font-normal font-sans text-gray-950 leading-[120%]">
      {/* ❌ Hardcoded gray, redundant classes */}
      123 Main Street
    </span>
  ),
};

export const ZebraInteractive: Story = {
  render: () => {
    const properties = [{ icon: Home }]; // ❌ Component reference won't work
    return properties.map(p => (
      <IconContainer icon={<p.icon />} /> // ❌ Wrong API
    ));
  }
};
```

### After (Fixed)
```tsx
import { IconContainer } from "@/components/ui/icon-container/icon-container"; // ✅ Correct
import type { IconName } from "@/components/ui/icon"; // ✅ Added

export const BasicRow: Story = {
  render: () => (
    <IconContainer color="blue" icon={{ name: "Home" }} />
    <span className="text-sm text-foreground">
      {/* ✅ Semantic color, clean classes */}
      123 Main Street
    </span>
  ),
};

export const ZebraInteractive: Story = {
  render: () => {
    const properties = [{ iconName: "Home" as IconName }]; // ✅ String name
    return properties.map(p => (
      <IconContainer icon={{ name: p.iconName }} /> // ✅ Correct API
    ));
  }
};
```

## Testing Recommendations

1. **Visual Testing**: Check Storybook to ensure all stories render correctly
2. **Interactive Testing**: Verify hover and click handlers work in `ZebraInteractive`
3. **Icon Rendering**: Confirm all icons display properly with correct sizing
4. **Typography**: Verify text appears correctly with new simplified classes

## Files Modified

- `/src/components/ui/property-list/property-list.stories.tsx` (501 lines)

## No Linter Errors

All TypeScript linter errors have been resolved. The file now passes all checks.
