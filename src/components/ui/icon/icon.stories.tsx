import type { Meta, StoryObj } from "@storybook/react";
import { Icon, type IconName } from "./icon";

const meta: Meta<typeof Icon> = {
  title: "UI/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A unified Icon component that wraps Lucide icons with standardized sizing.

## Features
- String-based icon names for simplified API
- 4 size variants: xs (12px), sm (16px), md (18px), lg (20px)
- Fixed 1.5px stroke width matching placeholder icons
- Full Lucide icon registry (28 icons mapped)
- Type-safe icon names with autocomplete

## Usage

\`\`\`tsx
import { Icon } from "@/components/ui/icon";

function Example() {
  return (
    <>
      <Icon name="Home" size="sm" />
      <Icon name="Search" size="md" className="text-blue-600" />
    </>
  );
}
\`\`\`

## Icon Registry

All placeholder icons have been mapped to Lucide equivalents:
- Home, Building, Search, Star, HelpCircle
- X, ChevronRight, ChevronLeft, MapPin, Ruler
- Compare, Chart, Calendar, Share, Download
- Print, Bookmark, Share2, Dock, ReceiptText
- Files, Scale, Globe
        `,
      },
    },
  },
  argTypes: {
    name: {
      control: "select",
      options: [
        "Home",
        "Building",
        "Search",
        "Star",
        "HelpCircle",
        "X",
        "ChevronRight",
        "ChevronLeft",
        "MapPin",
        "Ruler",
        "Compare",
        "Chart",
        "Calendar",
        "Share",
        "Download",
        "Print",
        "Bookmark",
        "Share2",
        "Dock",
        "ReceiptText",
        "Files",
        "Scale",
        "Globe",
      ],
      description: "Icon name from registry",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      description: "Size variant (xs: 12px, sm: 16px, md: 18px, lg: 20px)",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

// Default
export const Default: Story = {
  args: {
    name: "Home",
    size: "sm",
  },
  parameters: {
    docs: {
      description: {
        story: "Default icon with sm (16px) size.",
      },
    },
  },
};

// Size Variants
export const ExtraSmall: Story = {
  args: {
    name: "Home",
    size: "xs",
  },
  parameters: {
    docs: {
      description: {
        story: "Extra small size (12px).",
      },
    },
  },
};

export const Small: Story = {
  args: {
    name: "Home",
    size: "sm",
  },
  parameters: {
    docs: {
      description: {
        story: "Small size (16px) - default size.",
      },
    },
  },
};

export const Medium: Story = {
  args: {
    name: "Home",
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story: "Medium size (18px).",
      },
    },
  },
};

export const Large: Story = {
  args: {
    name: "Home",
    size: "lg",
  },
  parameters: {
    docs: {
      description: {
        story: "Large size (20px).",
      },
    },
  },
};

// All Sizes Comparison
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col gap-2 items-center">
        <Icon name="Home" size="xs" />
        <span className="text-xs text-muted-foreground">xs (12px)</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Icon name="Home" size="sm" />
        <span className="text-xs text-muted-foreground">sm (16px)</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Icon name="Home" size="md" />
        <span className="text-xs text-muted-foreground">md (18px)</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Icon name="Home" size="lg" />
        <span className="text-xs text-muted-foreground">lg (20px)</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All four size variants displayed side by side.",
      },
    },
  },
};

// All Icons Showcase
const allIcons: IconName[] = [
  "Home",
  "Building",
  "Search",
  "Star",
  "HelpCircle",
  "X",
  "ChevronRight",
  "ChevronLeft",
  "MapPin",
  "Ruler",
  "Compare",
  "Chart",
  "Calendar",
  "Share",
  "Download",
  "Print",
  "Bookmark",
  "Share2",
  "Dock",
  "ReceiptText",
  "Files",
  "Scale",
  "Globe",
];

export const AllIcons: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-6">
      {allIcons.map((iconName) => (
        <div key={iconName} className="flex flex-col gap-2 items-center">
          <div className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded">
            <Icon name={iconName} size="md" />
          </div>
          <span className="text-xs text-muted-foreground text-center">
            {iconName}
          </span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Complete icon registry showing all 23 available icons.",
      },
    },
  },
};

// With Custom Classes
export const WithColor: Story = {
  args: {
    name: "Star",
    size: "md",
    className: "text-yellow-500",
  },
  parameters: {
    docs: {
      description: {
        story: "Icon with custom color applied via className.",
      },
    },
  },
};

export const WithMultipleColors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon name="Home" size="md" className="text-blue-600" />
      <Icon name="Search" size="md" className="text-green-600" />
      <Icon name="Star" size="md" className="text-yellow-500" />
      <Icon name="HelpCircle" size="md" className="text-purple-600" />
      <Icon name="Download" size="md" className="text-teal-600" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Icons with various color treatments.",
      },
    },
  },
};

// Common Use Cases
export const NavigationIcons: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon name="Home" size="sm" />
      <Icon name="Search" size="sm" />
      <Icon name="ChevronLeft" size="sm" />
      <Icon name="ChevronRight" size="sm" />
      <Icon name="X" size="sm" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Common navigation and UI control icons.",
      },
    },
  },
};

export const PropertyIcons: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon name="Building" size="sm" />
      <Icon name="MapPin" size="sm" />
      <Icon name="Ruler" size="sm" />
      <Icon name="Calendar" size="sm" />
      <Icon name="Compare" size="sm" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Icons commonly used for property data.",
      },
    },
  },
};

export const ActionIcons: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon name="Download" size="sm" />
      <Icon name="Share" size="sm" />
      <Icon name="Print" size="sm" />
      <Icon name="Bookmark" size="sm" />
      <Icon name="HelpCircle" size="sm" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Icons for common user actions.",
      },
    },
  },
};

// Interactive Playground
export const Playground: Story = {
  args: {
    name: "Home",
    size: "md",
  },
};
