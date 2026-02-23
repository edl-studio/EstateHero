import type { Meta, StoryObj } from "@storybook/react";
import { GlobalHeader } from "./global-header";

const meta: Meta<typeof GlobalHeader> = {
  title: "UI/Global Header",
  component: GlobalHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Global header component for application navigation. Features a logo, user avatar, and optional search trigger.

## Variants

### Default Variant
- EstateHero logo on the left (clickable to navigate home)
- User avatar on the right
- Responsive sizing: 64px height mobile, 88px desktop

### Search Variant
- Same as default with centered CommandBoxTrigger between logo and avatar
- Includes search icon and keyboard shortcut badge (⌘K / Ctrl+K)
- Full-width trigger with max-width constraint

## Features
- Semantic HTML with \`<header>\` element
- Fully accessible with ARIA labels
- Responsive sizing (mobile and desktop)
- Clickable logo with hover and focus states
- Avatar with image loading and fallback support
- CSS Module styling with semantic color tokens

## Layout Specifications
- Height: 64px mobile, 88px desktop
- Horizontal padding: 16px mobile, 100px desktop
- Logo: 32px mobile, 48px desktop
- Avatar: 32px mobile, 48px desktop
- Max container width: 1312px
- Search trigger max-width: 450px

## Usage

\`\`\`tsx
import { GlobalHeader } from "@/components/ui/global-header";

// Default variant
function App() {
  return (
    <GlobalHeader
      variant="default"
      avatarFallback="FS"
      onLogoClick={() => navigate("/")}
    />
  );
}

// Search variant
function AppWithSearch() {
  return (
    <GlobalHeader
      variant="search"
      searchPlaceholder="Search properties"
      onSearchClick={() => setSearchModalOpen(true)}
      avatarFallback="FS"
      onLogoClick={() => navigate("/")}
    />
  );
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "search"],
      description: "Visual variant of the header",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    avatarSrc: {
      control: "text",
      description: "Image source URL for the user avatar",
    },
    avatarAlt: {
      control: "text",
      description: "Alt text for the avatar image",
    },
    avatarFallback: {
      control: "text",
      description: "Fallback text for the avatar (typically user initials)",
    },
    searchPlaceholder: {
      control: "text",
      description: "Placeholder text for the command box trigger (search variant only)",
      table: {
        defaultValue: { summary: "SEARCH PROPERTIES" },
      },
    },
    onSearchClick: {
      action: "search clicked",
      description: "Callback when command box trigger is clicked (search variant only)",
    },
    onLogoClick: {
      action: "logo clicked",
      description: "Callback when the logo is clicked",
    },
  },
};

export default meta;
type Story = StoryObj<typeof GlobalHeader>;

export const Default: Story = {
  args: {
    variant: "default",
    avatarFallback: "FS",
  },
  parameters: {
    docs: {
      description: {
        story: "Default header with logo and avatar. Use Storybook controls to test with avatar image.",
      },
    },
  },
};

export const SearchVariant: Story = {
  args: {
    variant: "search",
    avatarFallback: "JD",
    searchPlaceholder: "SEARCH PROPERTIES",
  },
  parameters: {
    docs: {
      description: {
        story: "Header with centered CommandBoxTrigger between logo and avatar. Features search icon and keyboard shortcut badge (⌘K / Ctrl+K).",
      },
    },
  },
};

export const Playground: Story = {
  args: {
    variant: "default",
    avatarFallback: "FS",
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "Interactive playground to test all props and variants. Use controls to customize.",
      },
    },
  },
};
