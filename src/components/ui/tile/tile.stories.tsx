import type { Meta, StoryObj } from "@storybook/react";
import { Tile, TileHeader, TileHeaderActions, TileTitle, TileContent } from "./tile";
import { Button } from "@/components/ui/button";
import { MetadataItem } from "@/components/ui/metadata-item";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";

const meta: Meta<typeof Tile> = {
  title: "UI/Tile",
  component: Tile,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Tile component for displaying grouped information in a card-like container with a header.

## Features
- Clean, bordered card design with shadow
- Separate header and content sections
- Composable sub-components (TileHeader, TileHeaderActions, TileTitle, TileContent)
- Works seamlessly with other UI components like MetadataItem
- Consistent spacing and typography

## Usage

\`\`\`tsx
import { Tile, TileHeader, TileTitle, TileContent } from "@/components/ui/tile";

function Example() {
  return (
    <Tile>
      <TileHeader>
        <TileTitle>Occupancy</TileTitle>
        <TileHeaderActions>
          <Button variant="outline" size="md">Action</Button>
          <Button variant="outline" size="md">More</Button>
        </TileHeaderActions>
      </TileHeader>
      <TileContent>
        {/* Your content here */}
      </TileContent>
    </Tile>
  );
}
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tile>;

// Basic tile with simple text content
export const Default: Story = {
  render: () => (
    <Tile className="w-[440px]">
      <TileHeader>
        <TileTitle>Occupancy</TileTitle>
      </TileHeader>
      <TileContent>
        <p className="text-sm text-foreground">
          This property is currently occupied by the owner.
        </p>
      </TileContent>
    </Tile>
  ),
};

// Tile header with right-hand actions (2 inline buttons)
export const WithHeaderActions: Story = {
  render: () => (
    <Tile className="w-[440px]">
      <TileHeader>
        <TileTitle>Rental income</TileTitle>
        <TileHeaderActions>
          <Button variant="outline" size="md">
            Action
          </Button>
          <Button variant="outline" size="md">
            More
          </Button>
        </TileHeaderActions>
      </TileHeader>
      <TileContent>
        <p className="text-sm text-foreground">
          Use TileHeaderActions for inline buttons on the right side of the header.
        </p>
      </TileContent>
    </Tile>
  ),
};

// Tile with MetadataItem components
export const WithMetadataItems: Story = {
  render: () => (
    <Tile className="w-[440px]">
      <TileHeader>
        <TileTitle>Property Value</TileTitle>
      </TileHeader>
      <TileContent>
        <div className="flex flex-col gap-4">
          <MetadataItem
            variant="data-group"
            label="Market Value"
            dataValue="7,728,337"
            dataUnit="DKK"
            badge={
              <Badge variant="success" iconLeft={<Icon name="Home" size="sm" />}>
                +5.2%
              </Badge>
            }
          />
          <MetadataItem
            variant="data-group"
            label="Purchase Price"
            dataValue="6,500,000"
            dataUnit="DKK"
          />
          <MetadataItem
            variant="data-group"
            label="Estimated Equity"
            dataValue="1,228,337"
            dataUnit="DKK"
            badge={<Badge variant="neutral">Updated</Badge>}
          />
        </div>
      </TileContent>
    </Tile>
  ),
};

// Tile with mixed content
export const WithMixedContent: Story = {
  render: () => (
    <Tile className="w-[440px]">
      <TileHeader>
        <TileTitle>Property Details</TileTitle>
      </TileHeader>
      <TileContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Icon name="Home" size="xl" className="text-muted-foreground" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">
                Single Family Home
              </span>
              <span className="text-xs text-muted-foreground">Residential</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Icon name="Calendar" size="xl" className="text-muted-foreground" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">
                Built in 2015
              </span>
              <span className="text-xs text-muted-foreground">9 years old</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Icon name="HelpCircle" size="xl" className="text-muted-foreground" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">
                Owner Occupied
              </span>
              <span className="text-xs text-muted-foreground">Primary residence</span>
            </div>
          </div>
        </div>
      </TileContent>
    </Tile>
  ),
};

// Tile with button actions
export const WithButtonAction: Story = {
  render: () => (
    <Tile className="w-[440px]">
      <TileHeader>
        <TileTitle>Documents</TileTitle>
      </TileHeader>
      <TileContent>
        <div className="flex flex-col gap-3">
          <MetadataItem
            variant="button"
            label="Property Deed"
            buttonText="View Document"
            onButtonClick={() => console.log("View document clicked")}
          />
          <MetadataItem
            variant="button"
            label="Tax Assessment"
            buttonText="Download PDF"
            onButtonClick={() => console.log("Download clicked")}
          />
        </div>
      </TileContent>
    </Tile>
  ),
};

// Multiple tiles side by side
export const MultipleTiles: Story = {
  render: () => (
    <div className="flex gap-6">
      <Tile className="w-[440px]">
        <TileHeader>
          <TileTitle>Occupancy</TileTitle>
        </TileHeader>
        <TileContent>
          <MetadataItem
            variant="data-group"
            label="Current Status"
            dataValue="Occupied"
            badge={<Badge variant="success">Active</Badge>}
          />
        </TileContent>
      </Tile>

      <Tile className="w-[440px]">
        <TileHeader>
          <TileTitle>Assessment</TileTitle>
        </TileHeader>
        <TileContent>
          <MetadataItem
            variant="data-group"
            label="Last Assessment"
            dataValue="2023"
            badge={<Badge variant="neutral">Annual</Badge>}
          />
        </TileContent>
      </Tile>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

// Empty tile with no content
export const Empty: Story = {
  render: () => (
    <Tile className="w-[440px]">
      <TileHeader>
        <TileTitle>No Data Available</TileTitle>
      </TileHeader>
      <TileContent>
        <p className="text-sm text-muted-foreground">
          No information to display at this time.
        </p>
      </TileContent>
    </Tile>
  ),
};

// Tile with custom header content
export const CustomHeader: Story = {
  render: () => (
    <Tile className="w-[440px]">
      <TileHeader className="flex items-center justify-between">
        <TileTitle>Financial Summary</TileTitle>
        <Badge variant="info">Updated</Badge>
      </TileHeader>
      <TileContent>
        <MetadataItem
          variant="data-group"
          label="Total Value"
          dataValue="7,728,337"
          dataUnit="DKK"
        />
      </TileContent>
    </Tile>
  ),
};

// Narrow tile
export const Narrow: Story = {
  render: () => (
    <Tile className="w-[320px]">
      <TileHeader>
        <TileTitle>Status</TileTitle>
      </TileHeader>
      <TileContent>
        <p className="text-sm text-foreground">Active</p>
      </TileContent>
    </Tile>
  ),
};

// Wide tile
export const Wide: Story = {
  render: () => (
    <Tile className="w-[600px]">
      <TileHeader>
        <TileTitle>Property Information</TileTitle>
      </TileHeader>
      <TileContent>
        <div className="grid grid-cols-2 gap-4">
          <MetadataItem
            variant="data-group"
            label="Bedrooms"
            dataValue="4"
          />
          <MetadataItem
            variant="data-group"
            label="Bathrooms"
            dataValue="2.5"
          />
          <MetadataItem
            variant="data-group"
            label="Square Feet"
            dataValue="2,450"
          />
          <MetadataItem
            variant="data-group"
            label="Lot Size"
            dataValue="0.25"
            dataUnit="acres"
          />
        </div>
      </TileContent>
    </Tile>
  ),
};

// Tile without header
export const WithoutHeader: Story = {
  render: () => (
    <Tile className="w-[440px]">
      <TileContent className="pt-0">
        <p className="text-sm text-foreground">
          Content-only tile without a header section.
        </p>
      </TileContent>
    </Tile>
  ),
};

// Interactive playground
export const Playground: Story = {
  render: (args) => (
    <Tile {...args} className="w-[440px]">
      <TileHeader>
        <TileTitle>Playground Tile</TileTitle>
      </TileHeader>
      <TileContent>
        <p className="text-sm text-foreground">
          Use the controls to customize this tile.
        </p>
      </TileContent>
    </Tile>
  ),
  args: {},
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
    children: {
      control: false,
      description: "Tile content (TileHeader, TileContent, etc.)",
    },
  },
};
