import type { Meta, StoryObj } from "@storybook/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TableHeader } from "./table-header";

const meta: Meta<typeof TableHeader> = {
  title: "UI/TableHeader",
  component: TableHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Table header cell with optional label, info tooltip, and sort icon. Matches the Figma table-header design with 8 variants: light/dark theme × (empty, label+tooltip+sort none, label+tooltip+sort desc, label+tooltip+sort asc).

## Usage

\`\`\`tsx
import { TableHeader } from "@/components/ui/table-header";

<table>
  <thead>
    <tr>
      <TableHeader theme="light" label="CALCULATED" tooltipContent="Help text" sortDirection="none" />
      <TableHeader theme="dark" label="SIMULATED" tooltipContent="Help" sortDirection="asc" />
    </tr>
  </thead>
  ...
</table>
\`\`\`
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <table>
          <thead>
            <tr>
              <Story />
            </tr>
          </thead>
        </table>
      </TooltipProvider>
    ),
  ],
  argTypes: {
    theme: {
      control: "radio",
      options: ["light", "dark"],
      description: "Visual theme (light or dark background).",
    },
    label: {
      control: "text",
      description: "Header label; omit for empty variant.",
    },
    tooltipContent: {
      control: "text",
      description: "Tooltip for the help icon; set to show info icon.",
    },
    sortDirection: {
      control: "select",
      options: [undefined, "none", "asc", "desc"],
      description: "Sort state; set to show sort icon.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof TableHeader>;

/** 1. Light theme, empty (placeholder) */
export const LightEmpty: Story = {
  args: {
    theme: "light",
  },
};

/** 2. Light theme, CALCULATED + info icon + sort neutral (double arrow) */
export const LightWithLabelTooltipSortNone: Story = {
  args: {
    theme: "light",
    label: "CALCULATED",
    tooltipContent: "This column shows calculated values.",
    sortDirection: "none",
  },
};

/** 3. Light theme, CALCULATED + info + sort descending (down chevron) */
export const LightWithLabelTooltipSortDesc: Story = {
  args: {
    theme: "light",
    label: "CALCULATED",
    tooltipContent: "This column shows calculated values.",
    sortDirection: "desc",
    ariaSort: "descending",
  },
};

/** 4. Light theme, CALCULATED + info + sort ascending (up chevron) */
export const LightWithLabelTooltipSortAsc: Story = {
  args: {
    theme: "light",
    label: "CALCULATED",
    tooltipContent: "This column shows calculated values.",
    sortDirection: "asc",
    ariaSort: "ascending",
  },
};

/** 5. Dark theme, empty (placeholder) */
export const DarkEmpty: Story = {
  args: {
    theme: "dark",
  },
};

/** 6. Dark theme, SIMULATED + info icon + sort neutral */
export const DarkWithLabelTooltipSortNone: Story = {
  args: {
    theme: "dark",
    label: "SIMULATED",
    tooltipContent: "This column shows simulated values.",
    sortDirection: "none",
  },
};

/** 7. Dark theme, SIMULATED + info + sort descending */
export const DarkWithLabelTooltipSortDesc: Story = {
  args: {
    theme: "dark",
    label: "SIMULATED",
    tooltipContent: "This column shows simulated values.",
    sortDirection: "desc",
    ariaSort: "descending",
  },
};

/** 8. Dark theme, SIMULATED + info + sort ascending */
export const DarkWithLabelTooltipSortAsc: Story = {
  args: {
    theme: "dark",
    label: "SIMULATED",
    tooltipContent: "This column shows simulated values.",
    sortDirection: "asc",
    ariaSort: "ascending",
  },
};

/** All 8 variants from Figma in one view */
export const AllVariants: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex flex-col gap-4">
        {[
          {
            title: "Light empty",
            props: { theme: "light" as const },
          },
          {
            title: "Light + CALCULATED + tooltip + sort none",
            props: {
              theme: "light" as const,
              label: "CALCULATED",
              tooltipContent: "Calculated values.",
              sortDirection: "none" as const,
            },
          },
          {
            title: "Light + sort desc",
            props: {
              theme: "light" as const,
              label: "CALCULATED",
              tooltipContent: "Calculated values.",
              sortDirection: "desc" as const,
              ariaSort: "descending" as const,
            },
          },
          {
            title: "Light + sort asc",
            props: {
              theme: "light" as const,
              label: "CALCULATED",
              tooltipContent: "Calculated values.",
              sortDirection: "asc" as const,
              ariaSort: "ascending" as const,
            },
          },
          {
            title: "Dark empty",
            props: { theme: "dark" as const },
          },
          {
            title: "Dark + SIMULATED + tooltip + sort none",
            props: {
              theme: "dark" as const,
              label: "SIMULATED",
              tooltipContent: "Simulated values.",
              sortDirection: "none" as const,
            },
          },
          {
            title: "Dark + sort desc",
            props: {
              theme: "dark" as const,
              label: "SIMULATED",
              tooltipContent: "Simulated values.",
              sortDirection: "desc" as const,
              ariaSort: "descending" as const,
            },
          },
          {
            title: "Dark + sort asc",
            props: {
              theme: "dark" as const,
              label: "SIMULATED",
              tooltipContent: "Simulated values.",
              sortDirection: "asc" as const,
              ariaSort: "ascending" as const,
            },
          },
        ].map(({ title, props }) => (
          <div key={title} className="flex items-center gap-4">
            <span className="w-64 shrink-0 text-xs text-muted-foreground">
              {title}
            </span>
            <table>
              <thead>
                <tr>
                  <TableHeader {...props} />
                </tr>
              </thead>
            </table>
          </div>
        ))}
      </div>
    </TooltipProvider>
  ),
};
