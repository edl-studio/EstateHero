import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { TabItem } from "./tab-item";

const meta: Meta<typeof TabItem> = {
  title: "UI/TabItem",
  component: TabItem,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Tab item component for navigation between different sections. Built with button element for full keyboard accessibility.

## Features
- Active and default states
- Hover effects
- Uppercase text styling
- Full keyboard navigation
- Based on button styling patterns

## Usage

\`\`\`tsx
import { TabItem } from "@/components/ui/tab-item";

function App() {
  const [activeTab, setActiveTab] = React.useState("details");

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <TabItem
        isActive={activeTab === "details"}
        onClick={() => setActiveTab("details")}
      >
        Property Details
      </TabItem>
      <TabItem
        isActive={activeTab === "comparison"}
        onClick={() => setActiveTab("comparison")}
      >
        Financial Comparison
      </TabItem>
      <TabItem
        isActive={activeTab === "rent"}
        onClick={() => setActiveTab("rent")}
      >
        Critical Rent
      </TabItem>
    </div>
  );
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    isActive: {
      control: "boolean",
      description: "Whether the tab is currently active",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    children: {
      control: "text",
      description: "Tab label text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TabItem>;

// State Stories
export const Active: Story = {
  args: {
    isActive: true,
    children: "Property Details",
  },
  parameters: {
    docs: {
      description: {
        story: "Active tab state with dark background and white text.",
      },
    },
  },
};

export const Default: Story = {
  args: {
    isActive: false,
    children: "Financial Comparison",
  },
  parameters: {
    docs: {
      description: {
        story: "Default (inactive) tab state with white background and gray text.",
      },
    },
  },
};

// All States Showcase
export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <TabItem isActive={true}>Active</TabItem>
      <TabItem isActive={false}>Default</TabItem>
      <TabItem isActive={false} disabled>Disabled</TabItem>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All tab states displayed together: active, default, and disabled.",
      },
    },
  },
};

// Real-world Example
export const PropertyDetailsTabs: Story = {
  render: () => {
    const [activeTab, setActiveTab] = React.useState("details");

    return (
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <TabItem
          isActive={activeTab === "details"}
          onClick={() => setActiveTab("details")}
        >
          Property Details
        </TabItem>
        <TabItem
          isActive={activeTab === "comparison"}
          onClick={() => setActiveTab("comparison")}
        >
          Financial Comparison
        </TabItem>
        <TabItem
          isActive={activeTab === "rent"}
          onClick={() => setActiveTab("rent")}
        >
          Critical Rent
        </TabItem>
        <TabItem
          isActive={activeTab === "units"}
          onClick={() => setActiveTab("units")}
        >
          Units
        </TabItem>
        <TabItem
          isActive={activeTab === "tinglysning"}
          onClick={() => setActiveTab("tinglysning")}
        >
          Tinglysning
        </TabItem>
        <TabItem
          isActive={activeTab === "neighborhood"}
          onClick={() => setActiveTab("neighborhood")}
        >
          Neighborhood
        </TabItem>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive example showing property details tabs. Click to switch between tabs.",
      },
    },
  },
};

// Short Labels
export const ShortLabels: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px" }}>
      <TabItem isActive={true}>Tab 1</TabItem>
      <TabItem isActive={false}>Tab 2</TabItem>
      <TabItem isActive={false}>Tab 3</TabItem>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tabs with short labels.",
      },
    },
  },
};

// Long Labels
export const LongLabels: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", maxWidth: "600px", flexWrap: "wrap" }}>
      <TabItem isActive={true}>Very Long Tab Label Example</TabItem>
      <TabItem isActive={false}>Another Extended Label</TabItem>
      <TabItem isActive={false}>Short</TabItem>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tabs with longer labels to test text handling.",
      },
    },
  },
};

// Disabled State
export const Disabled: Story = {
  args: {
    isActive: false,
    disabled: true,
    children: "Disabled Tab",
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled tab state with reduced opacity and no pointer events.",
      },
    },
  },
};

// States with Hover Simulation
export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>
          Active
        </p>
        <TabItem isActive={true}>Property Details</TabItem>
      </div>
      <div>
        <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>
          Default
        </p>
        <TabItem isActive={false}>Financial Comparison</TabItem>
      </div>
      <div>
        <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>
          Disabled
        </p>
        <TabItem isActive={false} disabled>
          Critical Rent
        </TabItem>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All tab states displayed vertically with labels.",
      },
    },
  },
};

// Interactive Playground
export const Playground: Story = {
  args: {
    isActive: false,
    children: "Tab Label",
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive playground to experiment with different tab configurations.",
      },
    },
  },
};
