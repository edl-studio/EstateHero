import type { Meta, StoryObj } from "@storybook/react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { TableCell } from "./table-cell";
import { TableRow } from "@/components/ui/table-row";
import { Input, InputTrailingActions } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

const meta: Meta<typeof TableCell> = {
  title: "UI/TableCell",
  component: TableCell,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Table cell with a small set of options: **align**, **tone**, and **prefix/suffix slots**.
Use with \`TableRow\` and \`rowVariant="summary"\` for total/footer rows.

## Recipes (not variants)
- **Default table** – \`align\` + \`children\`
- **Right-aligned numeric** – \`align="right"\`
- **Cell with suffix** – \`suffix\` for metric, unit, or actions
- **Summary / total row** – \`TableRow rowVariant="summary"\` + \`TableCell\`
- **Label with tooltip** – \`contentVariant="label"\` + \`Tooltip\` in children
- **With input** – \`contentWidth="full"\` + \`Input\` as children
        `,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const isFullTable = context.parameters?.isFullTable === true;
      if (isFullTable) {
        return (
          <TooltipProvider>
            <Story />
          </TooltipProvider>
        );
      }
      return (
        <TooltipProvider>
          <table style={{ borderCollapse: "collapse", minWidth: 320 }}>
            <tbody>
              <tr>
                <Story />
              </tr>
            </tbody>
          </table>
        </TooltipProvider>
      );
    },
  ],
  argTypes: {
    align: {
      control: "radio",
      options: ["left", "center", "right"],
      description: "Horizontal alignment.",
    },
    tone: {
      control: "radio",
      options: ["default", "muted", "strong"],
      description: "Text emphasis.",
    },
    truncate: { control: "boolean" },
    asHeader: { control: "boolean" },
    children: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof TableCell>;

/** Default: single value, left-aligned. */
export const Default: Story = {
  args: {
    children: "7.728.337",
  },
};

/** Right-aligned numeric column. */
export const RightAlignedNumeric: Story = {
  args: {
    align: "right",
    children: "15.100",
    suffix: " DKK/m²",
  },
};

/** Cell with suffix slot (metric / unit). */
export const CellWithSuffix: Story = {
  args: {
    suffix: " DKK",
    align: "right",
    children: "7.728.337",
  },
};

/** Summary row: use TableRow rowVariant="summary"; cells inherit row styling. */
export const SummaryRow: Story = {
  render: () => (
    <TooltipProvider>
      <table style={{ borderCollapse: "collapse", minWidth: 480 }}>
        <tbody>
          <TableRow rowVariant="default">
            <TableCell align="left">Net rent</TableCell>
            <TableCell suffix=" DKK" align="right">275.537</TableCell>
          </TableRow>
          <TableRow rowVariant="summary">
            <TableCell align="left">Total</TableCell>
            <TableCell suffix=" DKK" align="right">487.200</TableCell>
          </TableRow>
        </tbody>
      </table>
    </TooltipProvider>
  ),
  parameters: {
    isFullTable: true,
    docs: {
      description: {
        story: "Bottom row uses TableRow rowVariant=\"summary\" for height and background; TableCell stays simple.",
      },
    },
  },
};

/** Label column recipe: contentVariant="label" + Tooltip in children. */
export const LabelWithTooltip: Story = {
  render: () => (
    <TooltipProvider>
      <table style={{ borderCollapse: "collapse", minWidth: 320 }}>
        <tbody>
          <tr>
            <TableCell contentVariant="label">
              <Tooltip>
                <TooltipTrigger>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--spacing-xs)" }}>
                    ESTIMATED VALUE
                    <Icon name="HelpCircle" size="md" aria-hidden />
                  </span>
                </TooltipTrigger>
                <TooltipContent>Market-based estimate of the property value.</TooltipContent>
              </Tooltip>
            </TableCell>
          </tr>
        </tbody>
      </table>
    </TooltipProvider>
  ),
  parameters: {
    isFullTable: true,
  },
};

/** Input in cell: contentWidth="full". */
export const WithInput: Story = {
  args: {
    align: "right",
    contentWidth: "full",
    children: (
      <Input
        placeholder="Enter value"
        trailingSlot={
          <InputTrailingActions
            onClear={() => {}}
            onConfirm={() => {}}
            confirmShortcut
          />
        }
      />
    ),
  },
};

/** Prefix slot (e.g. icon). */
export const WithPrefixIcon: Story = {
  args: {
    prefix: <Icon name="ChevronUp" size="md" />,
    children: "5%",
  },
};

/** Suffix slot as actions. */
export const WithSuffixActions: Story = {
  args: {
    children: "Row content",
    suffix: (
      <>
        <Button variant="ghost" size="sm">
          Edit
        </Button>
        <Button variant="ghost" size="sm">
          Remove
        </Button>
      </>
    ),
  },
};

/** Recipe table: default, right-aligned numeric, cell with suffix, tones. */
export const RecipeTable: Story = {
  render: () => (
    <TooltipProvider>
      <div style={{ padding: 16 }}>
        <table style={{ borderCollapse: "collapse", minWidth: 640 }}>
          <tbody>
            <tr>
              <TableCell>7.728.337</TableCell>
              <TableCell suffix=" DKK">7.728.337</TableCell>
              <TableCell contentVariant="label">
                <Tooltip>
                  <TooltipTrigger>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--spacing-xs)" }}>
                      ESTIMATED VALUE
                      <Icon name="HelpCircle" size="md" aria-hidden />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>Market-based estimate.</TooltipContent>
                </Tooltip>
              </TableCell>
            </tr>
            <tr>
              <TableCell contentWidth="full">
                <Input placeholder="Value" trailingSlot={<InputTrailingActions onClear={() => {}} onConfirm={() => {}} confirmShortcut />} />
              </TableCell>
              <TableCell prefix={<Icon name="ChevronUp" size="md" />}>5%</TableCell>
              <TableCell suffix={<Button variant="ghost" size="sm">Edit</Button>} align="right">
                110.880
              </TableCell>
            </tr>
            <tr>
              <TableCell align="left" tone="muted">Muted label</TableCell>
              <TableCell align="right" suffix=" DKK/m²">15.100</TableCell>
            </tr>
          </tbody>
        </table>
      </div>
    </TooltipProvider>
  ),
  parameters: {
    isFullTable: true,
    docs: {
      description: {
        story: "Combined recipes: default, suffix (metric), label+tooltip, full-width input, prefix icon, suffix actions, tone.",
      },
    },
  },
};

export const Playground: Story = {
  args: {
    align: "left",
    tone: "default",
    children: "Playground cell",
    suffix: undefined,
  },
};
