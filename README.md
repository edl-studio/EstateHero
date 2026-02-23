# EstateHero Component Library

A React component library built with shadcn/ui design tokens, Base UI primitives, and Storybook documentation. This project implements a set of accessible, composable UI components for real estate applications.

## Overview

EstateHero is a component library designed to build modern, accessible user interfaces. It follows a design-first approach, with all components based on Figma designs and built using industry-standard tools and patterns.

### Design Philosophy

- **Base UI first**: Leverage Base UI primitives for accessibility and functionality
- **Tokens always**: Use shadcn/ui CSS variables for all styling - never hardcode values
- **Composition over props**: Build complex components from simpler ones
- **Name by function**: Use semantic names (e.g., `destructive` not `red-button`)

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | React + TypeScript | Component development with type safety |
| Styling | Tailwind CSS | Utility-first styling |
| Tokens | shadcn/ui CSS variables | Design token system |
| Primitives | Base UI (`@base-ui-components/react`) | Accessible component foundations |
| Variants | cva (class-variance-authority) | Type-safe variant management |
| Documentation | Storybook | Component showcase and testing |

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd EstateHero

# Install dependencies
npm install

# Start development server (view home page)
npm run dev

# Start Storybook (view components)
npm run storybook
```

### View the Home Page

The complete home page is now implemented and can be viewed at:

```bash
npm run dev
# Visit: http://localhost:5173/
```

The home page demonstrates all 9 components composed into a complete view based on the Figma design.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run storybook` - Start Storybook on port 6006
- `npm run build-storybook` - Build static Storybook
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

## Project Structure

```
EstateHero/
├── .cursor/
│   └── rules/              # Cursor AI development rules
├── docs/
│   ├── COMPONENT_GUIDE.md  # Component development guide
│   └── PRD.md              # Product requirements document
├── src/
│   ├── components/
│   │   └── ui/             # Component library
│   │       ├── button/
│   │       ├── input/
│   │       ├── badge/
│   │       ├── icon-container/
│   │       ├── tabs/
│   │       ├── table-cell/
│   │       ├── card/
│   │       ├── modal/
│   │       └── empty-state/
│   ├── styles/
│   │   └── globals.css     # shadcn CSS variables
│   ├── lib/
│   │   └── utils.ts        # Utility functions (cn helper)
│   └── tailwind.config.ts  # Tailwind configuration
├── README.md
└── CONTRIBUTING.md
```

## Components

### Primitives

These foundational components use Base UI primitives and can be composed into more complex components:

1. **Button** - Interactive button with multiple variants (primary, secondary, ghost, outline, icon-only) and sizes
2. **Input** - Text input with leading/trailing icon support
3. **Badge** - Small label component with variant styles
4. **Icon Container** - 40×40 rounded container with centered icon and semantic/categorical color variants
5. **Tabs** - Tab navigation with active state indicator

### Compound Components

These components compose multiple primitives:

6. **Table Cell** - Row with icon container and text, used in data tables
7. **Card** - Container with header (optional tabs) and content area
8. **Modal** - Dialog overlay with search input and results list
9. **Empty State** - Illustration placeholder with messaging

Each component is fully documented in Storybook with all variants and states.

## Documentation

- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Development workflow and coding standards
- **[docs/PRD.md](docs/PRD.md)** - Complete product requirements and component specifications
- **[docs/COMPONENT_GUIDE.md](docs/COMPONENT_GUIDE.md)** - Practical guide for building components

## Development Workflow

1. **Study the Figma design** - Understand variants, spacing, colors
2. **Check for Base UI primitive** - Start from existing accessible component if available
3. **Style with Tailwind** - Use shadcn CSS variables for all colors and radii
4. **Manage variants with cva** - Type-safe variant definitions
5. **Write Storybook stories** - Document every variant and state
6. **Compare with Figma** - Verify pixel-perfect implementation

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## Quality Bar

A component is considered "done" when it:

- ✅ Matches the Figma design visually
- ✅ Implements all specified variants and states
- ✅ Is built on a Base UI primitive (if one exists)
- ✅ Is keyboard accessible
- ✅ Has Storybook stories showing every variant
- ✅ Has TypeScript prop types

## Design Source

All components are based on designs from the Figma file:
[Design — Home section](https://www.figma.com/design/AX9A3BQLtXMICePtnkBgBC/Design?node-id=1201-12850)

## What's in v1

- shadcn/ui CSS variable tokens ✅
- 9 components (5 primitives, 4 compound) ✅
- Storybook story for each component ✅
- Full TypeScript support ✅
- Keyboard accessibility ✅
- **Home page implementation** ✅ **NEW!**

## Home Page

The complete home page is now implemented! It composes all 9 UI components into a functional view based on the Figma design.

**Features:**
- Hero section with search and filters
- Recent and saved property tables with tabs
- Search modal with results
- Empty states for no data
- Footer announcement banner

**View it:** Run `npm run dev` and visit http://localhost:5173/

**Documentation:** See [HOME_PAGE_COMPLETE.md](HOME_PAGE_COMPLETE.md) for details.

## What's NOT in v1

- Full page layouts or page assembly
- Animation/motion
- Dark mode
- Decorative illustrations
- Responsive breakpoints

These features are planned for future iterations.

## License

[Your License Here]

## Contributing

We welcome contributions! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our development process and how to submit pull requests.
# EstateHero
