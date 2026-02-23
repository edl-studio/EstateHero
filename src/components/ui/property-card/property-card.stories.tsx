import type { Meta, StoryObj } from "@storybook/react";
import { PropertyCard } from "./property-card";

const meta: Meta<typeof PropertyCard> = {
  title: "UI/PropertyCard",
  component: PropertyCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A card component for displaying a property listing. Matches the Figma design: address, type/status badges, main price with currency and optional % change, and unit price.

## Features
- Optional image (when \`imageSrc\` is set)
- Address, optional badges (type + status with icons), price with currency and % change pill, unit price
- Uses Badge and Icon; design tokens and typography (ui-mono-*, ui-sans-*)
- Full TypeScript support, ref forwarding

## Usage

\`\`\`tsx
import { PropertyCard } from "@/components/ui/property-card";

<PropertyCard
  address="Smallegade 42, 2000 Frederiksberg"
  propertyType="Residential"
  statusLabel="Under offer"
  price="6.250.000"
  currency="DKK"
  priceChangePercent={2}
  unitPrice="63.800 DKK / M²"
/>
\`\`\`
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "360px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    address: { control: "text", description: "Primary address or title" },
    propertyType: { control: "text", description: "Property type (e.g. Residential)" },
    statusLabel: { control: "text", description: "Status (e.g. Under offer)" },
    price: { control: "text", description: "Main price string" },
    currency: { control: "text", description: "Currency label (e.g. DKK)" },
    priceChangePercent: { control: "number", description: "Price change % (green pill)" },
    unitPrice: { control: "text", description: "Unit price line (e.g. DKK / M²)" },
    imageSrc: { control: "text", description: "Image URL (omit for content-only card)" },
    imageAlt: { control: "text", description: "Alt text for image" },
  },
};

export default meta;
type Story = StoryObj<typeof PropertyCard>;

/** Matches Figma design: address, Residential + Under offer badges, 6.250.000 DKK, 2% change, unit price. */
export const Default: Story = {
  args: {
    address: "Smallegade 42, 2000 Frederiksberg",
    propertyType: "Residential",
    statusLabel: "Under offer",
    price: "6.250.000",
    currency: "DKK",
    priceChangePercent: 2,
    unitPrice: "63.800 DKK / M²",
  },
  parameters: {
    docs: {
      description: {
        story: "Content-only card matching Figma: address, type/status badges, price with currency and % change, unit price.",
      },
    },
  },
};

export const WithImage: Story = {
  args: {
    imageSrc: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    imageAlt: "House exterior",
    address: "123 Main Street, Copenhagen",
    propertyType: "Single Family Home",
    statusLabel: "For sale",
    price: "8.500.000",
    currency: "DKK",
    unitPrice: "72.000 DKK / M²",
  },
  parameters: {
    docs: {
      description: {
        story: "Card with image, address, badges, price, and unit price.",
      },
    },
  },
};

export const Minimal: Story = {
  args: {
    address: "456 Oak Avenue",
    propertyType: "Condominium",
    price: "850.000",
    currency: "DKK",
  },
  parameters: {
    docs: {
      description: {
        story: "Minimal card: address, type badge, price and currency only.",
      },
    },
  },
};

export const AddressOnly: Story = {
  args: {
    address: "789 Pine Road, 2100 København",
  },
  parameters: {
    docs: {
      description: {
        story: "Card with only the required address.",
      },
    },
  },
};
