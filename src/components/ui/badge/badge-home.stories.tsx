import type { Meta, StoryObj } from "@storybook/react";
import { BadgeHome } from "./badge-home";
import { Star, Sparkles } from "lucide-react";

const meta: Meta<typeof BadgeHome> = {
  title: "UI/BadgeHome",
  component: BadgeHome,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Home page badge component with a unique glass/transparent styling.

## Features
- Glass morphism styling with transparent background
- Monospace uppercase font
- Optional left and right icons (12×12px)

## Usage

\`\`\`tsx
import { BadgeHome } from "@/components/ui/badge";
import { Star } from "lucide-react";

// Basic usage
<BadgeHome>COMING SOON</BadgeHome>

// With icon
<BadgeHome iconLeft={<Star size={12} strokeWidth={1.5} />}>
  Featured
</BadgeHome>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    iconLeft: {
      control: false,
      description: "Icon element before text (12×12px recommended)",
    },
    iconRight: {
      control: false,
      description: "Icon element after text (12×12px recommended)",
    },
    children: {
      control: "text",
      description: "Badge text content",
    },
  },
};

export default meta;
type Story = StoryObj<typeof BadgeHome>;

/**
 * Interactive playground to experiment with BadgeHome configurations.
 */
export const Playground: Story = {
  args: {
    children: "COMING SOON",
  },
};

/**
 * Basic badge without icons.
 */
export const Basic: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <BadgeHome>COMING SOON</BadgeHome>
      <BadgeHome>FEATURED</BadgeHome>
      <BadgeHome>NEW</BadgeHome>
    </div>
  ),
};

/**
 * Badges with icons to enhance visual meaning.
 */
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <BadgeHome iconLeft={<Star size={12} strokeWidth={1.5} />}>
        FEATURED
      </BadgeHome>
      <BadgeHome iconLeft={<Sparkles size={12} strokeWidth={1.5} />}>
        NEW
      </BadgeHome>
      <BadgeHome iconRight={<Star size={12} strokeWidth={1.5} />}>
        SPECIAL
      </BadgeHome>
    </div>
  ),
};
