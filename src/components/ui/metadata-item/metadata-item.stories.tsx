import type { Meta, StoryObj } from "@storybook/react";
import { MetadataItem } from "./metadata-item";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { TrendingUp, Upload } from "lucide-react";

const meta: Meta<typeof MetadataItem> = {
  title: "UI/Metadata Item",
  component: MetadataItem,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Metadata item component displays property or data information in two variants:
- **Data Group**: Shows a value with icon, unit, and optional badge
- **Button**: Shows an action button with outline style

## Features
- Two variants: data-group and button
- Optional label icon (e.g., help/info icon)
- Supports icons, units, and badges for data display
- Built-in button support with icon
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["data-group", "button"],
      description: "The variant of the metadata item",
    },
    label: {
      control: "text",
      description: "The label text displayed above the content",
    },
    labelIcon: {
      control: false,
      description: "Optional icon displayed next to the label",
    },
  },
};

export default meta;
type Story = StoryObj<typeof MetadataItem>;

const HelpCircleIcon = ({ className }: { className?: string }) => (
  <Icon name="HelpCircle" className={className} />
);

// Globe Icon Component (for the example)
const GlobeIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="10"
      cy="10"
      r="8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1 10H19M10 1C12.5 4 13.5 7 13.5 10C13.5 13 12.5 16 10 19M10 1C7.5 4 6.5 7 6.5 10C6.5 13 7.5 16 10 19"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ============================================
// DATA GROUP VARIANT STORIES
// ============================================

export const DataGroup: Story = {
  args: {
    variant: "data-group",
    label: "MARKET",
    labelIcon: <HelpCircleIcon className="w-[14px] h-[14px]" />,
    icon: <GlobeIcon className="w-5 h-5 text-[#10B981]" />,
    dataValue: "7.728.337",
    dataUnit: "DKK",
    badge: (
      <Badge variant="positive" iconLeft={<Icon name="Chart" size="xs" />}>
        5%
      </Badge>
    ),
  },
};

export const DataGroupSimple: Story = {
  args: {
    variant: "data-group",
    label: "PRICE",
    dataValue: "2.500.000",
    dataUnit: "DKK",
  },
  parameters: {
    docs: {
      description: {
        story: "A simple data group without icon or badge.",
      },
    },
  },
};

export const DataGroupWithIcon: Story = {
  args: {
    variant: "data-group",
    label: "VALUE",
    icon: <GlobeIcon className="w-5 h-5 text-[#3B82F6]" />,
    dataValue: "1.850.000",
    dataUnit: "DKK",
  },
  parameters: {
    docs: {
      description: {
        story: "Data group with an icon but no badge.",
      },
    },
  },
};

export const DataGroupWithBadge: Story = {
  args: {
    variant: "data-group",
    label: "ASSESSMENT",
    dataValue: "3.200.000",
    dataUnit: "DKK",
    badge: (
      <Badge variant="negative" iconLeft={<TrendingUp size={12} strokeWidth={1.5} />}>
        -2%
      </Badge>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Data group with a badge showing negative trend.",
      },
    },
  },
};

export const DataGroupNoUnit: Story = {
  args: {
    variant: "data-group",
    label: "QUANTITY",
    icon: <GlobeIcon className="w-5 h-5 text-[#8B5CF6]" />,
    dataValue: "42",
  },
  parameters: {
    docs: {
      description: {
        story: "Data group without a unit, just the value.",
      },
    },
  },
};

// ============================================
// BUTTON VARIANT STORIES
// ============================================

export const ButtonVariant: Story = {
  args: {
    variant: "button",
    label: "VALUE",
    buttonText: "UPLOAD RENT ROLL",
    buttonIcon: <Icon name="Share" />,
    onButtonClick: () => console.log("Upload rent roll clicked"),
  },
};

export const ButtonSimple: Story = {
  args: {
    variant: "button",
    label: "DOCUMENT",
    buttonText: "UPLOAD FILE",
    onButtonClick: () => console.log("Upload file clicked"),
  },
  parameters: {
    docs: {
      description: {
        story: "Button variant without an icon.",
      },
    },
  },
};

export const ButtonWithLabelIcon: Story = {
  args: {
    variant: "button",
    label: "CALCULATED",
    labelIcon: <HelpCircleIcon className="w-[14px] h-[14px]" />,
    buttonText: "RECALCULATE",
    onButtonClick: () => console.log("Recalculate clicked"),
  },
  parameters: {
    docs: {
      description: {
        story: "Button variant with a help icon next to the label.",
      },
    },
  },
};

// ============================================
// SHOWCASE STORIES
// ============================================

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <MetadataItem
        variant="data-group"
        label="MARKET"
        labelIcon={<HelpCircleIcon className="w-[14px] h-[14px]" />}
        icon={<GlobeIcon className="w-5 h-5 text-[#10B981]" />}
        dataValue="7.728.337"
        dataUnit="DKK"
        badge={
          <Badge variant="positive" iconLeft={<Icon name="Chart" size="xs" />}>
            5%
          </Badge>
        }
      />
      <MetadataItem
        variant="button"
        label="VALUE"
        buttonText="UPLOAD RENT ROLL"
        buttonIcon={<Upload className="w-4 h-4" />}
        onButtonClick={() => console.log("Upload clicked")}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Shows both variants of the metadata item component.",
      },
    },
  },
};

export const DataGroupExamples: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      <MetadataItem
        variant="data-group"
        label="MARKET VALUE"
        labelIcon={<HelpCircleIcon className="w-[14px] h-[14px]" />}
        icon={<GlobeIcon className="w-5 h-5 text-[#10B981]" />}
        dataValue="7.728.337"
        dataUnit="DKK"
        badge={
          <Badge variant="positive" iconLeft={<Icon name="Chart" size="xs" />}>
            5%
          </Badge>
        }
      />
      <MetadataItem
        variant="data-group"
        label="PURCHASE PRICE"
        icon={<GlobeIcon className="w-5 h-5 text-[#3B82F6]" />}
        dataValue="6.500.000"
        dataUnit="DKK"
      />
      <MetadataItem
        variant="data-group"
        label="RENTAL INCOME"
        dataValue="45.000"
        dataUnit="DKK"
        badge={
          <Badge variant="positive" iconLeft={<Icon name="Chart" size="xs" />}>
            3%
          </Badge>
        }
      />
      <MetadataItem
        variant="data-group"
        label="SQUARE METERS"
        icon={<GlobeIcon className="w-5 h-5 text-[#8B5CF6]" />}
        dataValue="850"
        dataUnit="m²"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Various examples of the data group variant with different configurations.",
      },
    },
  },
};

export const ButtonExamples: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      <MetadataItem
        variant="button"
        label="CALCULATED"
        labelIcon={<HelpCircleIcon className="w-[14px] h-[14px]" />}
        buttonText="UPLOAD RENT ROLL"
        buttonIcon={<Upload className="w-4 h-4" />}
        onButtonClick={() => console.log("Upload rent roll")}
      />
      <MetadataItem
        variant="button"
        label="DOCUMENT"
        buttonText="UPLOAD FILE"
        buttonIcon={<Upload className="w-4 h-4" />}
        onButtonClick={() => console.log("Upload file")}
      />
      <MetadataItem
        variant="button"
        label="ANALYSIS"
        buttonText="GENERATE REPORT"
        onButtonClick={() => console.log("Generate report")}
      />
      <MetadataItem
        variant="button"
        label="DATA"
        labelIcon={<HelpCircleIcon className="w-[14px] h-[14px]" />}
        buttonText="IMPORT DATA"
        onButtonClick={() => console.log("Import data")}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Various examples of the button variant with different labels and icons.",
      },
    },
  },
};

// ============================================
// PLAYGROUND
// ============================================

export const Playground: Story = {
  args: {
    variant: "data-group",
    label: "MARKET",
    labelIcon: <HelpCircleIcon className="w-[14px] h-[14px]" />,
    icon: <GlobeIcon className="w-5 h-5 text-[#10B981]" />,
    dataValue: "7.728.337",
    dataUnit: "DKK",
    badge: (
      <Badge variant="positive" iconLeft={<Icon name="Chart" size="xs" />}>
        5%
      </Badge>
    ),
  },
};
