import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { InputTrailingActions } from "@/components/ui/input";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ValueCard } from "./value-card";

const meta: Meta<typeof ValueCard> = {
  title: "UI/ValueCard",
  component: ValueCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A card component for displaying a key value with a label, optional info icon, and currency. Matches the Figma design: uppercase label with info icon, prominent value with leading icon (e.g. sparkle) and currency.

## Features
- **Variants**: \`display\` (static value) or \`editable\` (Input with trailing actions)
- Label (uppercase), optional tooltip on label hover (\`labelTooltip\`), optional info icon slot
- Value with optional leading icon (default: Sparkles), optional metric (e.g. DKK)
- Editable: \`inputTrailingSlot\`, \`onInputChange\`, \`onInputConfirmKeyDown\`, \`onInputClearKeyDown\`
- Uses design tokens and typography (ui-mono-*, ui-sans-*)
- Full TypeScript support, ref forwarding

## Usage

\`\`\`tsx
import { ValueCard } from "@/components/ui/value-card";

<ValueCard
  label="Calculated value"
  labelTooltip="AI-estimated value based on comparable sales."
  value="5.080.421"
  metric="DKK"
/>
\`\`\`

Wrap the app (or Storybook) in \`TooltipProvider\` for tooltips to work.
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
  argTypes: {
    variant: {
      control: "radio",
      options: ["display", "editable"],
      description: "Display = static value; Editable = Input with trailing actions",
    },
    label: { control: "text", description: "Label above the value (shown in uppercase)" },
    labelTooltip: {
      control: "text",
      description: "Tooltip content when hovering the label",
    },
    value: { control: "text", description: "Main value (display or controlled input value)" },
    metric: { control: "text", description: "Metric/unit suffix (e.g. DKK, m²)" },
  },
};

export default meta;
type Story = StoryObj<typeof ValueCard>;

/** Matches Figma: "CALCULATED VALUE" label with info icon, sparkle icon + 5.080.421 + DKK. Hover the label to see the tooltip. */
export const Default: Story = {
  args: {
    label: "Calculated value",
    labelTooltip: "AI-estimated value based on comparable sales and market data.",
    value: "5.080.421",
    metric: "DKK",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default ValueCard with label (hover for tooltip), value, metric, and default Sparkles + HelpCircle icons.",
      },
    },
  },
};

/** Without metric. */
export const NoMetric: Story = {
  args: {
    label: "Total score",
    value: "87",
  },
};

/** Label with tooltip, no info icon. */
export const NoInfoIcon: Story = {
  args: {
    label: "Estimated value",
    labelTooltip: "Conservative estimate from recent listings.",
    value: "4.200.000",
    metric: "DKK",
    infoIcon: null,
  },
};

/** Without value icon (pass null). */
export const NoValueIcon: Story = {
  args: {
    label: "Market price",
    value: "3.950.000",
    metric: "DKK",
    valueIcon: null,
  },
};

/** With custom content below the value row. Label has tooltip. */
export const WithChildren: Story = {
  args: {
    label: "Calculated value",
    labelTooltip: "Based on comparable sales in the area.",
    value: "5.080.421",
    metric: "DKK",
    children: (
      <p className="ui-sans-regular-14" style={{ color: "var(--color-content-secondary)" }}>
        Based on comparable sales in the area.
      </p>
    ),
  },
};

/** Editable variant: value replaced by Input with trailing clear + confirm actions. */
export const Editable: Story = {
  args: {
    variant: "editable",
    label: "Simulated value",
    labelTooltip: "Edit to override the calculated value.",
    value: "5.080.421",
    metric: "DKK",
  },
  render: function EditableRender(args) {
    const [value, setValue] = React.useState(args.value ?? "5.080.421");
    React.useEffect(() => {
      setValue(args.value ?? "5.080.421");
    }, [args.value]);
    return (
      <div style={{ width: "360px" }}>
        <ValueCard
          {...args}
          value={value}
          onInputChange={(e) => setValue(e.target.value)}
          onInputConfirmKeyDown={() => console.log("Confirm", value)}
          onInputClearKeyDown={() => setValue("")}
          inputTrailingSlot={
            <InputTrailingActions
              onClear={() => setValue("")}
              onConfirm={() => console.log("Confirm", value)}
              confirmShortcut
            />
          }
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Variant editable: the value is replaced by an Input. Use inputTrailingSlot for trailing actions (e.g. InputTrailingActions with clear and confirm).",
      },
    },
  },
};
