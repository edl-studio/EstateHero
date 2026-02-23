import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { Icon } from "@/components/ui/icon";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Primary button component for user actions. Built on Base UI Button primitive with full keyboard accessibility.

## Features
- 5 variants: primary, secondary, ghost, outline, destructive
- 3 sizes: sm (36px), md (40px), lg (44px)
- Icon support: left, right, or icon-only
- Loading states with spinner
- Disabled states
- Full keyboard navigation and focus management

## Design Tokens
- Uses \`font-sans\` at \`font-medium\` (500) weight
- Uppercase text with letter-spacing
- Uses semantic color tokens (\`--primary\`, \`--secondary\`, etc.)
- Consistent hover states with 90% opacity

## Usage

\`\`\`tsx
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

// Basic variants
<Button variant="primary">Primary Action</Button>
<Button variant="outline">Secondary Action</Button>
<Button variant="ghost">Subtle Action</Button>
<Button variant="destructive">Delete</Button>

// With icons
<Button iconLeft={<Icon name="Search" />}>
  Search
</Button>
<Button iconRight={<Icon name="ChevronRight" />}>
  Next
</Button>

// Icon-only (requires aria-label)
<Button iconLeft={<Icon name="X" />} aria-label="Close" />

// States
<Button isLoading>Saving...</Button>
<Button disabled>Disabled</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
\`\`\`

## Accessibility
- Always provide \`aria-label\` for icon-only buttons
- Loading state sets \`aria-busy="true"\`
- Full keyboard navigation support
- Focus visible with ring indicator
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "outline", "destructive"],
      description: "The visual style variant of the button",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "The size of the button",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "md" },
      },
    },
    isLoading: {
      control: "boolean",
      description: "Whether the button is in a loading state. When true, the button is disabled and shows a loading indicator.",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    iconLeft: {
      control: false,
      description: "Icon to display before the button text (recommended: 16×16px / h-4 w-4)",
    },
    iconRight: {
      control: false,
      description: "Icon to display after the button text (recommended: 16×16px / h-4 w-4)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;


// ============================================
// INTERACTIVE PLAYGROUND
// ============================================
export const Playground: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Click me",
    disabled: false,
    isLoading: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive playground to experiment with all button props and configurations.",
      },
    },
  },
};

// ============================================
// VARIANTS
// ============================================
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All 5 button variants. **Primary** for main actions, **Secondary** for supporting actions, **Outline** for secondary UI, **Ghost** for subtle actions, **Destructive** for dangerous operations.",
      },
    },
  },
};

// ============================================
// SIZES
// ============================================
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small (36px)</Button>
      <Button size="md">Medium (40px)</Button>
      <Button size="lg">Large (44px)</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Three size options: **sm** (36px height), **md** (40px, default), **lg** (44px).",
      },
    },
  },
};

// ============================================
// ICONS
// ============================================
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-muted-foreground mb-3">Icon Left</p>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" iconLeft={<Icon name="Search" />}>
            Search
          </Button>
          <Button variant="outline" iconLeft={<Icon name="Plus" />}>
            Add New
          </Button>
          <Button variant="ghost" iconLeft={<Icon name="Download" />}>
            Download
          </Button>
        </div>
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-3">Icon Right</p>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" iconRight={<Icon name="ChevronRight" />}>
            Next
          </Button>
          <Button variant="outline" iconRight={<Icon name="ChevronRight" />}>
            Continue
          </Button>
        </div>
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-3">Both Icons</p>
        <div className="flex flex-wrap gap-3">
          <Button 
            variant="outline"
            iconLeft={<Icon name="Home" />}
            iconRight={<Icon name="ChevronRight" />}
          >
            Go Home
          </Button>
        </div>
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-3">Icon Only (requires aria-label)</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm"
            iconLeft={<Icon name="X" />}
            aria-label="Close"
          />
          <Button 
            variant="ghost" 
            size="md"
            iconLeft={<Icon name="X" />}
            aria-label="Close"
          />
          <Button 
            variant="ghost" 
            size="lg"
            iconLeft={<Icon name="X" />}
            aria-label="Close"
          />
          <Button 
            variant="primary" 
            iconLeft={<Icon name="Plus" />}
            aria-label="Add"
          />
          <Button 
            variant="outline" 
            iconLeft={<Icon name="Search" />}
            aria-label="Search"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Buttons with icons positioned left, right, both sides, or icon-only. Always include **aria-label** for icon-only buttons for accessibility.",
      },
    },
  },
};

// ============================================
// STATES
// ============================================
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-muted-foreground mb-3">Default</p>
        <Button variant="primary">Click me</Button>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-3">Disabled</p>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" disabled>Primary</Button>
          <Button variant="outline" disabled>Outline</Button>
          <Button variant="ghost" disabled>Ghost</Button>
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-3">Loading</p>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" isLoading>Saving...</Button>
          <Button variant="outline" isLoading>Processing...</Button>
          <Button variant="primary" isLoading iconLeft={<Icon name="Search" />} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Button states: **default**, **disabled** (50% opacity), and **loading** (shows spinner, auto-disabled).",
      },
    },
  },
};

// ============================================
// REAL-WORLD EXAMPLES
// ============================================
export const RealWorldExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-medium text-foreground mb-3">Property Actions</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="primary" iconLeft={<Icon name="Search" />}>
            Search Properties
          </Button>
          <Button variant="outline" iconLeft={<Icon name="Plus" />}>
            Add Filter
          </Button>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-foreground mb-3">Form Actions</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="primary">Save Changes</Button>
          <Button variant="ghost">Cancel</Button>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-foreground mb-3">Danger Zone</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="destructive">Delete Property</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-foreground mb-3">Navigation</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" iconLeft={<Icon name="Home" />}>
            Back to Dashboard
          </Button>
          <Button variant="primary" iconRight={<Icon name="ChevronRight" />}>
            Continue
          </Button>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-foreground mb-3">Toolbar</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" size="sm" iconLeft={<Icon name="Download" />} aria-label="Download" />
          <Button variant="ghost" size="sm" iconLeft={<Icon name="X" />} aria-label="Close" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Common button patterns and combinations used in the EstateHero application.",
      },
    },
  },
};
