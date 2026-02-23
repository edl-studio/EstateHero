import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTab, TabsPanel } from "./inline-tabs";
import { HomeIcon, BuildingIcon, LandPlotIcon } from "lucide-react";

const meta: Meta<typeof Tabs> = {
  title: "UI/Inline Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Inline tabs component built on Base UI Tabs primitive with full keyboard accessibility.

## Features
- Icon support
- Full keyboard navigation (Arrow keys, Home, End)
- Controlled and uncontrolled modes
- Focus management

## Usage

\`\`\`tsx
import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/inline-tabs";

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTab value="overview">Overview</TabsTab>
    <TabsTab value="details">Details</TabsTab>
  </TabsList>
  <TabsPanel value="overview">
    Overview content
  </TabsPanel>
  <TabsPanel value="details">
    Details content
  </TabsPanel>
</Tabs>
\`\`\`

## Keyboard Navigation
- **Tab**: Focus the tab list or move focus into/out of tab panel
- **Arrow Left/Right**: Navigate between tabs
- **Home**: Focus first tab
- **End**: Focus last tab
- **Enter/Space**: Activate focused tab
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <div className="w-[500px]">
      <Tabs defaultValue="properties">
        <TabsList>
          <TabsTab value="properties">Properties</TabsTab>
          <TabsTab value="transactions">Transactions</TabsTab>
          <TabsTab value="analytics">Analytics</TabsTab>
        </TabsList>
        <TabsPanel value="properties" />
        <TabsPanel value="transactions" />
        <TabsPanel value="analytics" />
      </Tabs>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="w-[500px]">
      <Tabs defaultValue="residential">
        <TabsList>
          <TabsTab value="residential" icon={<HomeIcon className="h-4 w-4" />}>
            Residential
          </TabsTab>
          <TabsTab value="commercial" icon={<BuildingIcon className="h-4 w-4" />}>
            Commercial
          </TabsTab>
          <TabsTab value="land" icon={<LandPlotIcon className="h-4 w-4" />}>
            Land
          </TabsTab>
        </TabsList>
        <TabsPanel value="residential" />
        <TabsPanel value="commercial" />
        <TabsPanel value="land" />
      </Tabs>
    </div>
  ),
};
