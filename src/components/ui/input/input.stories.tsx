import type { Meta, StoryObj } from "@storybook/react";
import { HelpCircle, Search, X } from "lucide-react";
import { Input, InputTrailingActions } from "./index";
import { Icon } from "@/components/ui/icon";
import * as React from "react";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Text input component for user input. Built on Base UI Input primitive with full keyboard accessibility.

## Features
- Two sizes (default, large)
- Icon support (leading, trailing, or both)
- Interactive trailing icons (for clear/close actions)
- Full keyboard navigation
- Accessible focus states

## Usage

\`\`\`tsx
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

function App() {
  const [value, setValue] = React.useState("");

  return (
    <>
      {/* Basic input */}
      <Input 
        type="text"
        placeholder="Enter text..."
      />

      {/* With leading icon (search) */}
      <Input 
        leadingIcon={<Icon name="Search" />}
        placeholder="Search properties..."
      />

      {/* With trailing icon (help) */}
      <Input 
        trailingIcon={<Icon name="HelpCircle" />}
        placeholder="What are you looking for?"
      />

      {/* With interactive trailing icon (clear) */}
      <Input 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        trailingIcon={<Icon name="X" />}
        onTrailingIconClick={() => setValue("")}
        placeholder="Type to see clear button..."
      />

      {/* Large size */}
      <Input 
        size="large"
        leadingIcon={<Search className="h-5 w-5" />}
        placeholder="Search for properties, locations, or keywords..."
      />
    </>
  );
}
\`\`\`

## Keyboard Support
- **Tab**: Focus the input
- **Escape**: Clear focus (browser default)
- **Enter**: Submit form (if inside form)
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["default", "large", "mobile"],
      description: "The size of the input",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "search", "tel", "url"],
      description: "The HTML input type",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "text" },
      },
    },
    placeholder: {
      control: "text",
      description: "Placeholder text to display when input is empty",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    leadingIcon: {
      control: false,
      description: "Icon to display at the start (left) of the input (recommended: 16×16px for default, 20×20px for large)",
    },
    trailingIcon: {
      control: false,
      description: "Icon to display at the end (right) of the input (recommended: 16×16px for default, 20×20px for large)",
    },
    onTrailingIconClick: {
      control: false,
      description: "Callback when trailing icon is clicked (makes icon interactive)",
    },
    metric: {
      control: "text",
      description: "Metric or unit label shown after the value (e.g. m², €, %), in secondary color",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// Basic Variants
export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
  parameters: {
    docs: {
      description: {
        story: "Basic input without any icons or special features.",
      },
    },
  },
};

export const WithLeadingIcon: Story = {
  args: {
    leadingIcon: <Icon name="Search" />,
    placeholder: "Search properties...",
  },
  parameters: {
    docs: {
      description: {
        story: "Input with a leading (left-side) icon, typically used for search inputs.",
      },
    },
  },
};

export const WithTrailingIcon: Story = {
  args: {
    trailingIcon: <Icon name="HelpCircle" />,
    placeholder: "What are you looking for?",
  },
  parameters: {
    docs: {
      description: {
        story: "Input with a trailing (right-side) icon, often used for help indicators.",
      },
    },
  },
};

export const WithMetric: Story = {
  args: {
    placeholder: "Area",
    metric: "m²",
  },
  parameters: {
    docs: {
      description: {
        story: "Input with a metric/unit label after the value, styled in secondary content color (e.g. m², €, %).",
      },
    },
  },
};

export const WithMetricAndLeadingIcon: Story = {
  args: {
    leadingIcon: <Icon name="Search" />,
    placeholder: "Price",
    metric: "€",
  },
  parameters: {
    docs: {
      description: {
        story: "Metric can be combined with leading or trailing icons.",
      },
    },
  },
};

export const WithBothIcons: Story = {
  args: {
    leadingIcon: <Icon name="Search" />,
    trailingIcon: <Icon name="X" />,
    placeholder: "Search with clear button...",
  },
  parameters: {
    docs: {
      description: {
        story: "Input with both leading and trailing icons. Note: trailing icon is not interactive in this example.",
      },
    },
  },
};

export const WithInteractiveIcon: Story = {
  render: () => {
    const [value, setValue] = React.useState("Clear me!");
    
    return (
      <div className="w-80">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          leadingIcon={<Icon name="Search" />}
          trailingIcon={value ? <Icon name="X" /> : undefined}
          onTrailingIconClick={value ? () => setValue("") : undefined}
          placeholder="Type to see clear button..."
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Input with an interactive trailing icon that clears the input when clicked. The icon only appears when there's text.",
      },
    },
  },
};

export const WithTrailingActions: Story = {
  render: () => {
    const [value, setValue] = React.useState("5I");

    const handleConfirm = () => {
      console.log("Confirmed:", value);
    };

    return (
      <div className="w-80">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          trailingSlot={
            <InputTrailingActions
              onClear={() => setValue("")}
              onConfirm={handleConfirm}
              confirmShortcut
              ariaLabelClear="Clear"
              ariaLabelConfirm="Confirm (Enter)"
            />
          }
          placeholder="Type then clear or confirm..."
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Input with clear and confirm actions (20×20px) inside the field. Confirm button shows an Enter shortcut badge.",
      },
    },
  },
};

// Size Stories
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Default (40px)</p>
        <Input size="default" placeholder="Default size input" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Large (56px)</p>
        <Input size="large" placeholder="Large size input" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Mobile (24px)</p>
        <Input size="mobile" placeholder="Mobile size input" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All input sizes displayed together. Default is 40px tall, Large is 56px tall, Mobile is 24px tall.",
      },
    },
  },
};

export const SizesWithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Default with icons</p>
        <Input 
          size="default" 
          leadingIcon={<Icon name="Search" />}
          trailingIcon={<Icon name="X" />}
          placeholder="Search..." 
        />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Large with icons</p>
        <Input 
          size="large" 
          leadingIcon={<Search className="h-5 w-5" />}
          trailingIcon={<X className="h-5 w-5" />}
          placeholder="Search for properties, locations, or keywords..." 
        />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Mobile with icons</p>
        <Input 
          size="mobile" 
          leadingIcon={<Search className="h-3.5 w-3.5" />}
          trailingIcon={<X className="h-3.5 w-3.5" />}
          placeholder="Search..." 
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Size comparison with icons. Icon sizes: 16×16px (default), 20×20px (large), 14×14px (mobile).",
      },
    },
  },
};

// State Stories
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Default</p>
        <Input placeholder="Enter text..." />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">With Value</p>
        <Input defaultValue="This is some text" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Disabled</p>
        <Input placeholder="Disabled input..." disabled />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Disabled with Value</p>
        <Input defaultValue="Disabled with text" disabled />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Disabled with Icons</p>
        <Input 
          leadingIcon={<Icon name="Search" />}
          trailingIcon={<Icon name="X" />}
          placeholder="Disabled with icons..." 
          disabled 
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All input states: default, with value, disabled, and disabled with value.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input...",
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled input state with reduced opacity.",
      },
    },
  },
};

// Input Types
export const InputTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Text</p>
        <Input type="text" placeholder="Enter text..." />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Email</p>
        <Input 
          type="email" 
          leadingIcon={<Icon name="HelpCircle" />}
          placeholder="email@example.com" 
        />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Password</p>
        <Input 
          type="password" 
          leadingIcon={<Icon name="HelpCircle" />}
          placeholder="Enter password..." 
        />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Search</p>
        <Input 
          type="search" 
          leadingIcon={<Icon name="Search" />}
          placeholder="Search..." 
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different HTML input types: text, email, password, and search.",
      },
    },
  },
};

// Controlled Input
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    
    return (
      <div className="flex flex-col gap-4 w-80">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type something..."
        />
        <p className="text-sm text-muted-foreground">
          Value: <span className="font-mono">{value || "(empty)"}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Length: <span className="font-mono">{value.length}</span>
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Controlled input component with React state. The value is managed by the parent component.",
      },
    },
  },
};

// Real-world Examples
export const RealWorldExamples: Story = {
  render: () => {
    const [searchValue, setSearchValue] = React.useState("");
    const [emailValue, setEmailValue] = React.useState("");
    
    return (
      <div className="flex flex-col gap-6 w-full max-w-2xl">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Hero Search (Large)</p>
          <Input 
            size="large"
            leadingIcon={<Search className="h-5 w-5" />}
            trailingIcon={<HelpCircle className="h-5 w-5" />}
            placeholder="Search for properties, locations, or keywords..."
          />
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-2">Modal Search (Default with Clear)</p>
          <Input 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            leadingIcon={<Icon name="Search" />}
            trailingIcon={searchValue ? <Icon name="X" /> : undefined}
            onTrailingIconClick={searchValue ? () => setSearchValue("") : undefined}
            placeholder="Search..."
          />
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-2">Location Filter</p>
          <Input 
            leadingIcon={<Icon name="MapPin" />}
            placeholder="City, State, or ZIP"
          />
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-2">Email Subscription</p>
          <Input 
            type="email"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            leadingIcon={<Icon name="HelpCircle" />}
            placeholder="Enter your email address"
          />
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-2">User Profile</p>
          <Input 
            leadingIcon={<Icon name="HelpCircle" />}
            placeholder="Full name"
            defaultValue="John Smith"
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Real-world usage examples from the EstateHero application, including the hero search and modal search from the design.",
      },
    },
  },
};

// All Variants Showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Input placeholder="Default input" />
      <Input 
        leadingIcon={<Icon name="Search" />}
        placeholder="With leading icon" 
      />
      <Input 
        trailingIcon={<Icon name="HelpCircle" />}
        placeholder="With trailing icon" 
      />
      <Input 
        leadingIcon={<Icon name="Search" />}
        trailingIcon={<Icon name="X" />}
        placeholder="With both icons" 
      />
      <Input 
        size="large"
        leadingIcon={<Search className="h-5 w-5" />}
        placeholder="Large with icon" 
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All input variants displayed together for comparison.",
      },
    },
  },
};

// Interactive Playground
export const Playground: Story = {
  args: {
    type: "text",
    size: "default",
    placeholder: "Enter text...",
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive playground to experiment with different input configurations.",
      },
    },
  },
};
