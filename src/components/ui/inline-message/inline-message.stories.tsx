import type { Meta, StoryObj } from "@storybook/react";
import { InlineMessage } from "./inline-message";
import { Icon } from "@/components/ui/icon";

const meta: Meta<typeof InlineMessage> = {
  title: "UI/InlineMessage",
  component: InlineMessage,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Inline message card for alerts and status messages.

Based on Figma 1327-19152: card with light background, subtle border, shadow; optional bold title + secondary description. Use above tables or between sections to surface issues or information.

## Features
- **Variants**: warning (default), info, error, success
- **Title + description**: \`title\` (bold, colored) and \`children\` (secondary grey text)
- **Single-line**: omit \`title\` to show only \`children\`
- Default icons per variant; optional \`leadingIcon\` to override
- Accessible: \`role="alert"\` for warning/error, \`role="status"\` for info/success

## Usage

\`\`\`tsx
import { InlineMessage } from "@/components/ui/inline-message";

<InlineMessage variant="warning" title="2 Issues detected in the table">
  Please review the highlighted entries for potential discrepancies or necessary updates.
</InlineMessage>

<InlineMessage variant="info">Your changes have been saved.</InlineMessage>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["warning", "info", "error", "success"],
      description: "Visual and semantic variant",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "warning" },
      },
    },
    title: {
      control: "text",
      description: "Primary message (bold); when set, children become the secondary description",
    },
    leadingIcon: {
      control: false,
      description: "Optional custom icon; default icon is used per variant if not provided",
    },
    children: {
      control: "text",
      description: "Message content (secondary description when title is set)",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: 560 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof InlineMessage>;

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "2 Issues detected in the table",
    children:
      "Please review the highlighted entries for potential discrepancies or necessary updates.",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    children: "Your changes have been saved. You can continue editing or close this view.",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    children: "Unable to load data. Please check your connection and try again.",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "All validations passed. You can proceed to the next step.",
  },
};

export const CustomIcon: Story = {
  args: {
    variant: "warning",
    title: "Custom icon",
    leadingIcon: <Icon name="HelpCircle" size="lg" aria-hidden />,
    children: "This message uses a custom leading icon instead of the default AlertTriangle.",
  },
};

export const SingleLine: Story = {
  args: {
    variant: "warning",
    children: "Single-line message without a title (backward compatible).",
  },
};
