import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "./card";
import { TabsRoot, TabsList, TabsTab, TabsPanel } from "@/components/ui/inline-tabs";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A card component for grouping related content. Supports two variants:

1. **Default** - Simple header with title and border bottom
2. **With Tabs** - Header with title and tabs, equal padding (20px) on top/left/right, 0 bottom

## Features
- Clean, modern design with subtle shadow
- Flexible composition with Header, Title, and Content
- Works seamlessly with Tabs component
- Full TypeScript support
- Uses CSS Modules for styling

## Usage

\`\`\`tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Default variant
<Card>
  <CardHeader>
    <CardTitle>Properties</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Content here */}
  </CardContent>
</Card>

// With Tabs variant
<Card>
  <CardHeader className="p-5 pb-0 gap-5">
    <CardTitle>Properties</CardTitle>
    <TabsRoot defaultValue="all">
      <TabsList>
        <TabsTab value="all">All</TabsTab>
      </TabsList>
    </TabsRoot>
  </CardHeader>
  <CardContent>
    {/* Content here */}
  </CardContent>
</Card>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// Default - Simple Header with Title
export const Default: Story = {
  render: () => (
    <Card className="w-[600px]">
      <CardHeader className="pt-4 pr-6 pb-4 pl-5 gap-4">
        <CardTitle>Properties</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <div className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground">
            123 Main Street
            <div className="text-xs text-muted-foreground">Single Family Home • $1,250,000</div>
          </div>
          <div className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground">
            456 Oak Avenue
            <div className="text-xs text-muted-foreground">Condominium • $850,000</div>
          </div>
          <div className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground">
            789 Pine Road
            <div className="text-xs text-muted-foreground">Vacant Land • $425,000</div>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: "Default card with simple header containing title. Header has border bottom and standard padding.",
      },
    },
  },
};

// With Tabs - Title + Inline Tabs with Equal Padding
export const WithTabs: Story = {
  render: () => (
    <Card className="w-[600px]">
      <CardHeader className="p-5 pb-0 gap-5">
        <CardTitle>Saved</CardTitle>
        <TabsRoot defaultValue="all">
          <TabsList fullWidth>
            <TabsTab value="all">All Properties</TabsTab>
            <TabsTab value="saved">Saved</TabsTab>
            <TabsTab value="recent">Recent</TabsTab>
          </TabsList>
        </TabsRoot>
      </CardHeader>
      <CardContent>
        <TabsRoot defaultValue="all">
          <TabsPanel value="all">
            <div className="flex flex-col gap-3">
              <div className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground">
                123 Main Street
                <div className="text-xs text-muted-foreground">Single Family Home</div>
              </div>
              <div className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground">
                456 Oak Avenue
                <div className="text-xs text-muted-foreground">Condominium</div>
              </div>
              <div className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground">
                789 Pine Road
                <div className="text-xs text-muted-foreground">Vacant Land</div>
              </div>
            </div>
          </TabsPanel>
          <TabsPanel value="saved">
            <div className="flex flex-col gap-3">
              <div className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground">
                123 Main Street
                <div className="text-xs text-muted-foreground">Saved 2 days ago</div>
              </div>
            </div>
          </TabsPanel>
          <TabsPanel value="recent">
            <div className="flex flex-col gap-3">
              <div className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground">
                456 Oak Avenue
                <div className="text-xs text-muted-foreground">Listed today</div>
              </div>
            </div>
          </TabsPanel>
        </TabsRoot>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: "Card with title and inline tabs in the header. Uses `className=\"p-5 pb-0 gap-5\"` for equal padding (20px) on top/left/right and 0 bottom. No border bottom on header. This matches the production usage pattern.",
      },
    },
  },
};
