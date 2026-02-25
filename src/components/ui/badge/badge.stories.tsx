import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";
import { Icon } from "@/components/ui/icon";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Badge component for status indicators, labels, and tags.

## Features
- **Semantic variants**: default, success, info, warning, neutral
- **Status variants**: Positive and negative with bordered style
- **Neutral variants**: Neutral and outline
- **Font variants**:
  - **Mono** (default): Uppercase monospace for status codes
  - **Sans**: Regular sans-serif for descriptive labels
- Optional icon support (12×12px)

## Usage

\`\`\`tsx
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

// Semantic variants
<Badge variant="success">Active</Badge>
<Badge variant="info">For Sale</Badge>
<Badge variant="default">Default</Badge>

// Status variants
<Badge variant="positive">Approved</Badge>
<Badge variant="negative">Rejected</Badge>

// Sans variant for longer text
<Badge variant="info" fontVariant="sans">Single Family Home</Badge>

// With icon
<Badge variant="positive" iconLeft={<Icon name="HelpCircle" size="xs" />}>
  Verified
</Badge>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "outline",
        "success",
        "info",
        "warning",
        "neutral",
        "positive",
        "negative",
      ],
      description: "Visual style variant",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    fontVariant: {
      control: "radio",
      options: ["mono", "sans"],
      description: "Font family variant",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "mono" },
      },
    },
    iconLeft: {
      control: false,
      description: "Icon element before text",
    },
    iconRight: {
      control: false,
      description: "Icon element after text",
    },
    tooltip: {
      control: "text",
      description:
        "Tooltip text shown on the help icon. Automatically renders a HelpCircle icon when set.",
    },
    children: {
      control: "text",
      description: "Badge text content",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

/**
 * Interactive playground to experiment with different badge configurations.
 */
export const Playground: Story = {
  args: {
    variant: "info",
    fontVariant: "mono",
    children: "Badge Text",
  },
};

/**
 * All badge variants displayed together for quick comparison.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-medium mb-3">Filled Variants</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="neutral">Neutral</Badge>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium mb-3">Bordered Variants</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="positive">Positive</Badge>
          <Badge variant="negative">Negative</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </div>
    </div>
  ),
};

/**
 * Comparison of mono (uppercase, compact) and sans (regular, readable) font variants.
 */
export const FontVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-medium mb-2">Mono (Default)</p>
        <p className="text-xs text-muted-foreground mb-3">
          Uppercase monospace - ideal for status labels
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="info" fontVariant="mono">For Sale</Badge>
          <Badge variant="success" fontVariant="mono">Active</Badge>
          <Badge variant="warning" fontVariant="mono">Pending</Badge>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Sans</p>
        <p className="text-xs text-muted-foreground mb-3">
          Regular case - better for longer descriptive labels
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="info" fontVariant="sans">Single Family Home</Badge>
          <Badge variant="success" fontVariant="sans">Recently Renovated</Badge>
          <Badge variant="warning" fontVariant="sans">Price Reduced</Badge>
        </div>
      </div>
    </div>
  ),
};

/**
 * Badges with icons to enhance visual meaning. Icons should be 12×12px.
 */
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="positive" iconLeft={<Icon name="Check" size="xs" />}>
        Verified
      </Badge>
      <Badge variant="negative" iconLeft={<Icon name="X" size="xs" />}>
        Declined
      </Badge>
      <Badge variant="warning" iconLeft={<Icon name="AlertTriangle" size="xs" />}>
        Alert
      </Badge>
      <Badge variant="info" iconLeft={<Icon name="Star" size="xs" />}>
        Featured
      </Badge>
    </div>
  ),
};

/**
 * Badges with a `tooltip` prop automatically render a HelpCircle icon that reveals
 * explanatory text on hover — no manual icon setup required.
 */
export const WithTooltip: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="info" tooltip="This property is currently listed for sale on the open market.">
        For Sale
      </Badge>
      <Badge variant="success" tooltip="Listing has been verified by our team.">
        Verified
      </Badge>
      <Badge variant="warning" tooltip="The asking price was recently reduced by the seller.">
        Price Reduced
      </Badge>
      <Badge variant="positive" tooltip="This deal has been fully executed and closed.">
        Sold
      </Badge>
      <Badge variant="neutral" fontVariant="sans" tooltip="A detached single-family residential property.">
        Single Family Home
      </Badge>
    </div>
  ),
};

/**
 * Real-world property status examples showing typical usage patterns.
 */
export const PropertyExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Listing Status</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="info">For Sale</Badge>
          <Badge variant="success">For Rent</Badge>
          <Badge variant="warning">Pending</Badge>
          <Badge variant="positive" iconLeft={<Icon name="HelpCircle" size="xs" />}>
            Sold
          </Badge>
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Property Features</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="info" iconLeft={<Icon name="Star" size="xs" />}>
            Featured
          </Badge>
          <Badge variant="info">New Listing</Badge>
          <Badge variant="success">Open House</Badge>
          <Badge variant="warning">Price Reduced</Badge>
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Property Types (Sans variant)</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="neutral" fontVariant="sans">Single Family Home</Badge>
          <Badge variant="neutral" fontVariant="sans">Condominium</Badge>
          <Badge variant="neutral" fontVariant="sans">Townhouse</Badge>
        </div>
      </div>
    </div>
  ),
};
