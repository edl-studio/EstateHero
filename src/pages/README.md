# Pages

This directory contains page-level components that compose UI components into complete views.

## Home Page

The home page is the main landing view for EstateHero, implementing the design from Figma (node-id=1201-12851).

### Structure

```
pages/home/
├── home.tsx           # Main home page component
├── home.stories.tsx   # Storybook stories for all page states
├── mock-data.ts       # Sample property data for development
└── index.ts           # Barrel exports
```

### Features

The home page includes:

1. **Hero Section**
   - Large serif heading
   - Large search input with icons
   - Filter buttons (Area size, Location)

2. **Data Tables**
   - Recent/Saved properties with tab switching
   - Recommended properties
   - Empty states for when no data exists

3. **Search Modal**
   - Opens on search input focus
   - Shows filtered results
   - Empty state for no results

4. **Footer Announcement**
   - Badge + message + CTA

### Page States (from Figma)

The home page supports 4 distinct states as shown in the Figma design:

1. **Default** - Populated tables with data
2. **Empty Saved State** - No saved properties
3. **With Search Modal** - Search overlay with results
4. **Empty Search Modal** - Search with no results

All states are documented in Storybook.

### Usage

```tsx
import { HomePage } from "@/pages/home";

function App() {
  return <HomePage />;
}
```

### Customization

The HomePage component accepts props to override default data:

```tsx
<HomePage
  recentData={customRecentProperties}
  savedData={customSavedProperties}
  showSearchModal={true}
  useEmptySearchResults={false}
/>
```

### Components Used

The home page composes these UI components:

- `Button` - Filter buttons, CTAs
- `Input` - Hero search, modal search
- `Card` - Table containers
- `Tabs` - Recent/Saved switching
- `DataList` - Property list items
- `Badge` - Announcement badge
- `EmptyState` - No data messaging

### Icons

Currently using placeholder SVG icons in `src/components/icons/placeholder-icons.tsx`.

**To replace with a real icon library:**

1. Install your preferred library (e.g., `npm install lucide-react`)
2. Update the `getIconComponent` function in `home.tsx`
3. Replace icon imports

Example with Lucide:

```tsx
import { Home, Building, Star, Search } from "lucide-react";

const getIconComponent = (iconName: string) => {
  const iconMap = {
    home: Home,
    building: Building,
    star: Star,
    search: Search,
  };
  const Icon = iconMap[iconName] || Home;
  return <Icon className="h-4 w-4" />;
};
```

### Mock Data

Mock data is stored in `mock-data.ts` and includes:

- `recentProperties` - 5 recent property items
- `savedProperties` - 3 saved property items
- `emptySavedProperties` - Empty array for empty state
- `searchResults` - 3 search result items
- `emptySearchResults` - Empty array for empty search

Each property item has:
- `id` - Unique identifier
- `icon` - Icon name string
- `iconColor` - Color variant from IconContainer
- `text` - Primary text (property address)
- `supportingText` - Secondary text (city, state, ZIP)

### Development

View the page in Storybook:

```bash
npm run storybook
```

Run the page in development mode:

```bash
npm run dev
```

The home page is rendered in `src/main.tsx`.
