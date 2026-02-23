import type { Meta, StoryObj } from "@storybook/react";
import { DataList, DataListItem } from "./index";
import { IconContainer } from "@/components/ui/icon-container/icon-container";

const meta: Meta<typeof DataListItem> = {
  title: "UI/DataList",
  component: DataListItem,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A flexible data list component system for displaying rows of data with icons, text, and metrics.

## Features
- Automatic zebra striping for alternating row backgrounds
- Hover states and click handling
- Keyboard navigation support
- Semantic HTML with \`<ul>\` and \`<li>\` elements

## Components

- **DataList** - Container with consistent spacing
- **DataListItem** - Individual list items with variants and interaction states

## Usage

\`\`\`tsx
import { 
  DataList, 
  DataListItem
} from "@/components/ui/data-list";

function Example() {
  return (
    <DataList>
      {items.map((item) => (
        <DataListItem 
          key={item.id}
          variant="zebra"
          onClick={() => console.log(item.id)}
        >
          <IconContainer color="blue" icon={<HomeIcon />} />
          <span>{item.name}</span>
          <span>{item.value}</span>
        </DataListItem>
      ))}
    </DataList>
  );
}
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataListItem>;

// Basic Item
export const BasicItem: Story = {
  render: () => (
    <DataListItem>
      <IconContainer color="blue" icon={{ name: "Home" }} />
      <span className="text-sm text-foreground flex-1">
        123 Main Street, San Francisco, CA
      </span>
      <span className="text-sm text-muted-foreground">250 units</span>
      <span className="text-sm text-muted-foreground min-w-[80px] text-right">
        1,450 m²
      </span>
    </DataListItem>
  ),
  parameters: {
    docs: {
      description: {
        story: "A basic data list item with icon, text, and metric content.",
      },
    },
  },
};

// Zebra Striping
export const ZebraStriping: Story = {
  render: () => (
    <div className="w-[600px]">
      <DataList>
        <DataListItem variant="zebra">
          <IconContainer color="blue" icon={{ name: "Home" }} />
          <span className="text-sm text-foreground flex-1">
            123 Main Street, San Francisco, CA
          </span>
          <span className="text-sm text-muted-foreground">250 units</span>
          <span className="text-sm text-muted-foreground min-w-[80px] text-right">
            1,450 m²
          </span>
        </DataListItem>

        <DataListItem variant="zebra">
          <IconContainer color="green" icon={{ name: "Building" }} />
          <span className="text-sm text-foreground flex-1">
            456 Oak Avenue, Los Angeles, CA
          </span>
          <span className="text-sm text-muted-foreground">120 units</span>
          <span className="text-sm text-muted-foreground min-w-[80px] text-right">
            890 m²
          </span>
        </DataListItem>

        <DataListItem variant="zebra">
          <IconContainer color="orange" icon={{ name: "MapPin" }} />
          <span className="text-sm text-foreground flex-1">
            789 Pine Road, San Diego, CA
          </span>
          <span className="text-sm text-muted-foreground">85 units</span>
          <span className="text-sm text-muted-foreground min-w-[80px] text-right">
            625 m²
          </span>
        </DataListItem>

        <DataListItem variant="zebra">
          <IconContainer color="teal" icon={{ name: "Star" }} />
          <span className="text-sm text-foreground flex-1">
            321 Cedar Lane, Sacramento, CA
          </span>
          <span className="text-sm text-muted-foreground">175 units</span>
          <span className="text-sm text-muted-foreground min-w-[80px] text-right">
            1,100 m²
          </span>
        </DataListItem>
      </DataList>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Automatic zebra striping with alternating backgrounds using CSS :nth-child. No manual index tracking needed!",
      },
    },
  },
};
