import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./avatar";

const meta: Meta<typeof Avatar> = {
  title: "UI/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Avatar component for displaying user profile images with fallback support.

## Features
- Built on Base UI Avatar primitive
- Two size variants (sm, md)
- Automatic fallback to initials when image fails to load
- Accessible with proper alt text
- Circular shape with proper overflow handling

## Usage

\`\`\`tsx
import { Avatar } from "@/components/ui/avatar";

function App() {
  return (
    <Avatar
      src="https://example.com/avatar.jpg"
      alt="John Doe"
      fallback="JD"
      size="md"
    />
  );
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md"],
      description: "Avatar size",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "md" },
      },
    },
    src: {
      control: "text",
      description: "Image source URL",
    },
    alt: {
      control: "text",
      description: "Alt text for the image",
    },
    fallback: {
      control: "text",
      description: "Fallback text (typically initials)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    alt: "John Doe",
    fallback: "JD",
  },
};

export const WithFallback: Story = {
  args: {
    src: "https://invalid-url-that-will-fail.jpg",
    alt: "John Doe",
    fallback: "JD",
  },
  parameters: {
    docs: {
      description: {
        story: "When the image fails to load, the fallback text (initials) is displayed.",
      },
    },
  },
};

export const FallbackOnly: Story = {
  args: {
    fallback: "AB",
    alt: "Alex Brown",
  },
  parameters: {
    docs: {
      description: {
        story: "Avatar can be used without an image source, showing only the fallback.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <div className="flex flex-col items-center gap-2">
        <Avatar
          size="sm"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
          alt="Small"
          fallback="SM"
        />
        <span className="text-xs text-muted-foreground">Small (32px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar
          size="md"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
          alt="Medium"
          fallback="MD"
        />
        <span className="text-xs text-muted-foreground">Medium (40px)</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comparison of available avatar sizes.",
      },
    },
  },
};

export const Playground: Story = {
  args: {
    size: "md",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    alt: "User",
    fallback: "U",
  },
};
