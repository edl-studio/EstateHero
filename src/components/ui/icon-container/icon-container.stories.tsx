import type { Meta, StoryObj } from "@storybook/react";
import { IconContainer } from "./icon-container";

const meta: Meta<typeof IconContainer> = {
  title: "UI/IconContainer",
  component: IconContainer,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A 40×40px circular container that displays a centered 16×16px icon with color treatments.

## Features
- 5 color variants (default, green, blue, orange, teal)
- Consistent 40×40px circular container size
- Uses the Icon component for standardized icon rendering
- Clean CSS Modules implementation

## Usage

\`\`\`tsx
import { IconContainer } from "@/components/ui/icon-container";

function Example() {
  return (
    <IconContainer 
      color="green"
      icon={{ name: "Home" }}
    />
  );
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    color: {
      control: "select",
      options: [
        "default",
        "green",
        "blue",
        "orange",
        "teal",
      ],
      description: "Color variant",
    },
    icon: {
      control: false,
      description: "Icon component props (name and optional size)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconContainer>;

// Default
export const Default: Story = {
  args: {
    color: "default",
    icon: { name: "Home" },
  },
  parameters: {
    docs: {
      description: {
        story: "Default gray variant for neutral icons.",
      },
    },
  },
};

// Color Variants
export const Green: Story = {
  args: {
    color: "green",
    icon: { name: "HelpCircle" },
  },
  parameters: {
    docs: {
      description: {
        story: "Green variant with light green background.",
      },
    },
  },
};

export const Blue: Story = {
  args: {
    color: "blue",
    icon: { name: "Home" },
  },
  parameters: {
    docs: {
      description: {
        story: "Blue variant with light blue background.",
      },
    },
  },
};

export const Orange: Story = {
  args: {
    color: "orange",
    icon: { name: "Chart" },
  },
  parameters: {
    docs: {
      description: {
        story: "Orange variant with light orange background.",
      },
    },
  },
};

export const Teal: Story = {
  args: {
    color: "teal",
    icon: { name: "MapPin" },
  },
  parameters: {
    docs: {
      description: {
        story: "Teal variant with light teal background.",
      },
    },
  },
};

// All Colors Showcase
export const AllColors: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="flex flex-col gap-2 items-center">
        <IconContainer color="default" icon={{ name: "Home" }} />
        <span className="text-xs text-muted-foreground">Default</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <IconContainer color="green" icon={{ name: "HelpCircle" }} />
        <span className="text-xs text-muted-foreground">Green</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <IconContainer color="blue" icon={{ name: "Home" }} />
        <span className="text-xs text-muted-foreground">Blue</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <IconContainer color="orange" icon={{ name: "Chart" }} />
        <span className="text-xs text-muted-foreground">Orange</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <IconContainer color="teal" icon={{ name: "MapPin" }} />
        <span className="text-xs text-muted-foreground">Teal</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All 5 color variants displayed together for comparison.",
      },
    },
  },
};

// Real-world Examples
export const RealWorldExamples: Story = {
  render: () => (
    <div className="flex gap-4">
      <IconContainer color="default" icon={{ name: "Home" }} />
      <IconContainer color="blue" icon={{ name: "Building" }} />
      <IconContainer color="teal" icon={{ name: "MapPin" }} />
      <IconContainer color="green" icon={{ name: "HelpCircle" }} />
      <IconContainer color="orange" icon={{ name: "Chart" }} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Examples as they would appear in real usage with various data types.",
      },
    },
  },
};

// Interactive Playground
export const Playground: Story = {
  args: {
    color: "default",
    icon: { name: "Home" },
  },
};
