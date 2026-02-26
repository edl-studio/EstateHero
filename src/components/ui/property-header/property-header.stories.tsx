import type { Meta, StoryObj } from "@storybook/react";
import { PropertyHeader } from "./property-header";
import { MetadataItem } from "@/components/ui/metadata-item";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { TooltipProvider } from "@/components/ui/tooltip";

const meta: Meta<typeof PropertyHeader> = {
  title: "UI/Property Header",
  component: PropertyHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Property Header component for displaying property details page headers.

## Features
- Meta label for category/type display
- Large heading for main address/name
- Metadata items section for key data points
- Actions section for interactive buttons
- Flexible content composition

## Usage

\`\`\`tsx
import { PropertyHeader } from "@/components/ui/property-header";
import { MetadataItem } from "@/components/ui/metadata-item";
import { Button } from "@/components/ui/button";

function PropertyDetailsPage() {
  return (
    <PropertyHeader
      metaLabel="Residential"
      heading="Holbækvej 37, 4000 Roskilde"
      metadataItems={
        <>
          <MetadataItem
            variant="data-group"
            label="Property Value"
            icon={<HomeIcon />}
            dataValue="7.728.337"
            dataUnit="DKK"
          />
          <MetadataItem
            variant="data-group"
            label="Market Trend"
            icon={<ChartIcon />}
            dataValue="+12.5%"
          />
        </>
      }
      actions={
        <>
          <Button variant="outline" iconLeft={<ShareIcon />} data-hide-on-mobile>
            Share
          </Button>
          <Button variant="outline" iconLeft={<DownloadIcon />}>
            Download
          </Button>
        </>
      }
    />
  );
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    metaLabel: {
      control: "text",
      description: "Optional meta label displayed above the heading",
    },
    heading: {
      control: "text",
      description: "Main heading text (e.g., address or company name)",
    },
    metadataItems: {
      control: false,
      description: "React nodes containing MetadataItem components",
    },
    actions: {
      control: false,
      description: "React nodes containing action buttons",
    },
  },
};

export default {
  ...meta,
  decorators: [
    (Story: () => JSX.Element) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
};
type Story = StoryObj<typeof PropertyHeader>;

const sharedMetadataItems = (
  <>
    <MetadataItem
      variant="data-group"
      label="Market"
      icon={<Icon name="Globe" size="xl" />}
      dataValue="7.728.337"
      dataUnit="DKK"
      badge={<Badge variant="positive" iconLeft={<Icon name="Chart" size="xs" />}>5%</Badge>}
      labelIcon={<Icon name="HelpCircle" size="md" />}
      labelIconTooltip="Estimated current market value based on automated valuation model"
    />
    <MetadataItem
      variant="button"
      label="Calculated"
      buttonText="Upload Rent Roll"
      buttonIcon={<Icon name="FileUp" />}
      labelIcon={<Icon name="HelpCircle" size="md" />}
      labelIconTooltip="This value is calculated automatically based on available data"
    />
  </>
);

const sharedActions = (
  <>
    <Button variant="outline" iconLeft={<Icon name="Bookmark" />}>
      Save
    </Button>
    <Button variant="outline" iconLeft={<Icon name="Share2" />} data-hide-on-mobile>
      Share
    </Button>
    <Button variant="primary" iconLeft={<Icon name="Download" />}>
      Export
    </Button>
  </>
);

export const Default: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "32px",
        minHeight: "100vh",
        background: "var(--color-background)",
      }}
    >
      <PropertyHeader
        metaLabel="Residential"
        heading="Holbækvej 37, 4000 Roskilde"
        metadataItems={sharedMetadataItems}
        actions={sharedActions}
      />
    </div>
  ),
};
