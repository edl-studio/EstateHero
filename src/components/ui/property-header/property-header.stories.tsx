import type { Meta, StoryObj } from "@storybook/react";
import { PropertyHeader } from "./property-header";
import { MetadataItem } from "@/components/ui/metadata-item";
import { Button } from "@/components/ui/button";

// Mock icons for demonstration
const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 6L8 1L14 6V13C14 13.55 13.55 14 13 14H3C2.45 14 2 13.55 2 13V6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 14V2M2 8L8 2L14 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M11 1V5M5 1V5M2 7H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const HelpIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="6" r="5.5" stroke="currentColor" strokeWidth="1"/>
    <path d="M6 8V6M6 4H6.005" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ShareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5L8 1M8 1L4 5M8 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 11V13C2 13.55 2.45 14 3 14H13C13.55 14 14 13.55 14 13V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 11L8 15M8 15L12 11M8 15V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 5V3C14 2.45 13.55 2 13 2H3C2.45 2 2 2.45 2 3V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PrintIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="2" width="10" height="3" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="2" y="5" width="12" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="4" y="9" width="8" height="5" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

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
          <Button variant="outline" iconLeft={<ShareIcon />}>
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

export default meta;
type Story = StoryObj<typeof PropertyHeader>;

// Default story with full example
export const Default: Story = {
  render: () => (
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
            labelIcon={<HelpIcon />}
          />
          <MetadataItem
            variant="data-group"
            label="Market Trend"
            icon={<ChartIcon />}
            dataValue="+12.5%"
            labelIcon={<HelpIcon />}
          />
          <MetadataItem
            variant="button"
            label="Last Updated"
            buttonText="View History"
            buttonIcon={<CalendarIcon />}
          />
        </>
      }
      actions={
        <>
          <Button variant="outline" iconLeft={<ShareIcon />}>
            Share
          </Button>
          <Button variant="outline" iconLeft={<DownloadIcon />}>
            Download
          </Button>
          <Button variant="outline" iconLeft={<PrintIcon />}>
            Print
          </Button>
        </>
      }
    />
  ),
};

// Minimal - Just heading
export const Minimal: Story = {
  args: {
    heading: "Holbækvej 37, 4000 Roskilde",
  },
};

// With Meta Label Only
export const WithMetaLabel: Story = {
  args: {
    metaLabel: "Residential",
    heading: "Holbækvej 37, 4000 Roskilde",
  },
};

// With Metadata Items
export const WithMetadata: Story = {
  render: () => (
    <PropertyHeader
      metaLabel="Commercial"
      heading="Corporate Headquarters, Copenhagen"
      metadataItems={
        <>
          <MetadataItem
            variant="data-group"
            label="Total Area"
            icon={<HomeIcon />}
            dataValue="12,450"
            dataUnit="m²"
          />
          <MetadataItem
            variant="data-group"
            label="Valuation"
            icon={<ChartIcon />}
            dataValue="45.200.000"
            dataUnit="DKK"
          />
          <MetadataItem
            variant="data-group"
            label="Occupancy Rate"
            dataValue="95%"
          />
        </>
      }
    />
  ),
};

// With Actions Only
export const WithActions: Story = {
  render: () => (
    <PropertyHeader
      metaLabel="Industrial"
      heading="Warehouse District, Aarhus"
      actions={
        <>
          <Button variant="primary">
            Contact Owner
          </Button>
          <Button variant="outline" iconLeft={<ShareIcon />}>
            Share
          </Button>
          <Button variant="outline" iconLeft={<DownloadIcon />}>
            Download
          </Button>
        </>
      }
    />
  ),
};

// Full Example with All Features
export const FullExample: Story = {
  render: () => (
    <PropertyHeader
      metaLabel="Mixed-Use Development"
      heading="Waterfront Plaza, 8000 Aarhus C"
      metadataItems={
        <>
          <MetadataItem
            variant="data-group"
            label="Property Value"
            icon={<HomeIcon />}
            dataValue="125.500.000"
            dataUnit="DKK"
            labelIcon={<HelpIcon />}
          />
          <MetadataItem
            variant="data-group"
            label="YoY Change"
            icon={<ChartIcon />}
            dataValue="+8.3%"
            labelIcon={<HelpIcon />}
          />
          <MetadataItem
            variant="data-group"
            label="Last Sale"
            dataValue="2021"
          />
          <MetadataItem
            variant="button"
            label="Documents"
            buttonText="View All (24)"
            buttonIcon={<CalendarIcon />}
          />
        </>
      }
      actions={
        <>
          <Button variant="primary">
            Schedule Visit
          </Button>
          <Button variant="outline" iconLeft={<ShareIcon />}>
            Share
          </Button>
          <Button variant="outline" iconLeft={<DownloadIcon />}>
            Download Report
          </Button>
          <Button variant="outline" iconLeft={<PrintIcon />}>
            Print
          </Button>
        </>
      }
    />
  ),
};

// Residential Property Example
export const ResidentialProperty: Story = {
  render: () => (
    <PropertyHeader
      metaLabel="Residential"
      heading="Søndergade 12, 1000 København"
      metadataItems={
        <>
          <MetadataItem
            variant="data-group"
            label="Purchase Price"
            icon={<HomeIcon />}
            dataValue="4.250.000"
            dataUnit="DKK"
          />
          <MetadataItem
            variant="data-group"
            label="Appreciation"
            icon={<ChartIcon />}
            dataValue="+15.2%"
          />
          <MetadataItem
            variant="data-group"
            label="Bedrooms"
            dataValue="3"
          />
          <MetadataItem
            variant="button"
            label="Mortgage"
            buttonText="Calculate"
            buttonIcon={<CalendarIcon />}
          />
        </>
      }
      actions={
        <>
          <Button variant="primary">
            Contact Agent
          </Button>
          <Button variant="outline" iconLeft={<ShareIcon />}>
            Share
          </Button>
        </>
      }
    />
  ),
};

// Commercial Property Example
export const CommercialProperty: Story = {
  render: () => (
    <PropertyHeader
      metaLabel="Commercial Office"
      heading="Tech Park Building 5, Lyngby"
      metadataItems={
        <>
          <MetadataItem
            variant="data-group"
            label="Annual Revenue"
            icon={<ChartIcon />}
            dataValue="18.500.000"
            dataUnit="DKK"
          />
          <MetadataItem
            variant="data-group"
            label="Occupancy"
            dataValue="100%"
          />
          <MetadataItem
            variant="data-group"
            label="Lease Term"
            dataValue="5 years"
          />
        </>
      }
      actions={
        <>
          <Button variant="primary">
            View Lease Terms
          </Button>
          <Button variant="outline" iconLeft={<DownloadIcon />}>
            Download
          </Button>
        </>
      }
    />
  ),
};

// With Many Metadata Items
export const ManyMetadataItems: Story = {
  render: () => (
    <PropertyHeader
      metaLabel="Large Portfolio"
      heading="Metropolitan Complex, Multiple Locations"
      metadataItems={
        <>
          <MetadataItem
            variant="data-group"
            label="Total Value"
            icon={<HomeIcon />}
            dataValue="550.000.000"
            dataUnit="DKK"
          />
          <MetadataItem
            variant="data-group"
            label="Units"
            dataValue="248"
          />
          <MetadataItem
            variant="data-group"
            label="Avg. Growth"
            icon={<ChartIcon />}
            dataValue="+6.8%"
          />
          <MetadataItem
            variant="data-group"
            label="Locations"
            dataValue="12"
          />
          <MetadataItem
            variant="button"
            label="Reports"
            buttonText="View All"
            buttonIcon={<CalendarIcon />}
          />
        </>
      }
      actions={
        <>
          <Button variant="primary">
            Portfolio Overview
          </Button>
          <Button variant="outline">
            Export Data
          </Button>
        </>
      }
    />
  ),
};

// Long Heading Text
export const LongHeading: Story = {
  render: () => (
    <PropertyHeader
      metaLabel="Historic Property"
      heading="The Grand Estate at Frederiksborg Castle Gardens, Northern Copenhagen Metropolitan Area"
      metadataItems={
        <>
          <MetadataItem
            variant="data-group"
            label="Estimated Value"
            icon={<HomeIcon />}
            dataValue="95.000.000"
            dataUnit="DKK"
          />
          <MetadataItem
            variant="data-group"
            label="Built"
            dataValue="1878"
          />
        </>
      }
      actions={
        <>
          <Button variant="outline" iconLeft={<ShareIcon />}>
            Share
          </Button>
        </>
      }
    />
  ),
};

// Playground for interactive testing
export const Playground: Story = {
  args: {
    metaLabel: "Residential",
    heading: "Holbækvej 37, 4000 Roskilde",
  },
  render: (args) => (
    <PropertyHeader
      {...args}
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
          <Button variant="outline" iconLeft={<ShareIcon />}>
            Share
          </Button>
          <Button variant="outline" iconLeft={<DownloadIcon />}>
            Download
          </Button>
        </>
      }
    />
  ),
};
