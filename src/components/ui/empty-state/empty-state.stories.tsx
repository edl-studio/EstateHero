import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./empty-state";
import { Button } from "@/components/ui/button";

import magnifyingGraphic from "@/assets/images/magnifying.png";

const meta: Meta<typeof EmptyState> = {
  title: "UI/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A flexible empty state component with three visual variants for displaying "no results" or "no data" messages.

## Variants

### 1. Default (Text Only)
\`\`\`tsx
<EmptyState
  variant="default"
  title="No saved properties"
  description="Properties you save will appear here for easy access."
/>
\`\`\`

### 2. Icon Container
\`\`\`tsx
<EmptyState
  variant="icon-container"
  icon={{ name: "Search" }}
  iconColor="blue"
  title="No results found"
  description="Try adjusting your search terms"
/>
\`\`\`

### 3. Illustration
\`\`\`tsx
<EmptyState
  variant="illustration"
  illustration={<img src={magnifyingGraphic} alt="" className="h-30 w-30" />}
  title="We couldn't find that property"
  description="Check for typos or try another search."
/>
\`\`\`

## With Action Button

All variants support an optional action button via the \`action\` prop.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "icon-container", "illustration"],
      description: "Visual variant",
    },
    icon: {
      control: false,
      description: "Icon props (e.g. { name: 'Search' }) for icon-container variant",
    },
    illustration: {
      control: false,
      description: "Illustration element for illustration variant",
    },
    iconColor: {
      control: "select",
      options: ["default", "green", "blue", "orange", "teal"],
      description: "IconContainer color (for icon-container variant)",
    },
    title: {
      control: "text",
      description: "Main heading text (required)",
    },
    description: {
      control: "text",
      description: "Supporting text below the title",
    },
    action: {
      control: false,
      description: "Optional action button",
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

// ============================================
// THREE CORE VARIANTS
// ============================================

export const Default: Story = {
  args: {
    variant: "default",
    title: "No saved properties",
    description: "Properties you save will appear here for easy access.",
  },
  parameters: {
    docs: {
      description: {
        story: "Text-only variant with no icon. Simplest form for basic empty states.",
      },
    },
  },
};

export const IconContainer: Story = {
  args: {
    variant: "icon-container",
    icon: { name: "Search" },
    iconColor: "blue",
    title: "No results found",
    description: "Try adjusting your search or filter criteria",
  },
  parameters: {
    docs: {
      description: {
        story: "Uses IconContainer component with a small icon. Change `iconColor` to green/blue/orange/teal.",
      },
    },
  },
};

export const Illustration: Story = {
  args: {
    variant: "illustration",
    illustration: (
      <img 
        src={magnifyingGraphic} 
        alt="" 
        className="h-30 w-30 object-contain"
      />
    ),
    title: "We couldn't find that property",
    description: "It seems the address is not in our records. Please check for typos or try another search.",
  },
  parameters: {
    docs: {
      description: {
        story: "Custom illustration/image variant (120×120px recommended).",
      },
    },
  },
};

// ============================================
// WITH ACTION BUTTON
// ============================================

export const WithAction: Story = {
  args: {
    variant: "icon-container",
    icon: { name: "Star" },
    iconColor: "orange",
    title: "No saved properties",
    description: "Properties you save will appear here for quick access",
    action: <Button variant="outline" size="sm">Browse properties</Button>,
  },
  parameters: {
    docs: {
      description: {
        story: "Any variant can include an optional action button.",
      },
    },
  },
};

// ============================================
// PLAYGROUND
// ============================================

export const Playground: Story = {
  args: {
    variant: "icon-container",
    icon: { name: "Search" },
    iconColor: "blue",
    title: "No results found",
    description: "Try adjusting your search or filter criteria",
  },
};
