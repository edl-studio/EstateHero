import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { GlobalHeader } from "@/components/ui/global-header";
import { PropertyHeader } from "@/components/ui/property-header";
import { MetadataItem } from "@/components/ui/metadata-item";
import { EmptyState } from "@/components/ui/empty-state";
import { TabItem } from "@/components/ui/tab-item";
import { Tile, TileHeader, TileTitle, TileContent } from "@/components/ui/tile";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DataList, DataListItem } from "@/components/ui/data-list";
import { IconContainer } from "@/components/ui/icon-container";
import { Icon, type IconName } from "@/components/ui/icon";
import { OccupancyChart } from "@/components/ui/occupancy-chart";
import { BuildingAreaChart } from "@/components/ui/building-area-chart";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

import { cn } from "@/lib/utils";

import magnifyingGraphic from "@/assets/images/magnifying.png";
import propertyMapImage from "@/assets/images/Image.png";

import { getPropertyDetails } from "./mock-property-details";
import {
  searchResults,
  getPropertyById,
  type PropertyItem,
} from "@/pages/home/mock-data";

export interface PropertyDetailsPageProps {
  /** Override property ID (for Storybook) */
  propertyId?: string;
  /** Override address */
  address?: string;
  /** Override city */
  city?: string;
  /** Override property type */
  propertyType?: "home" | "building";
  /** Custom back handler */
  onBack?: () => void;
  /** Custom className */
  className?: string;
}

// Same icon mapping as home page for search results
const getColoredIcon = (iconName: string, iconColor: PropertyItem["iconColor"]) => {
  const iconMap: Record<string, IconName> = {
    home: "Home",
    building: "Building",
    search: "Search",
  };
  const mappedIconName = iconMap[iconName] || "Home";
  const getIconColor = (color: PropertyItem["iconColor"]): string => {
    if (color === "success" || color === "category-2") return "text-[var(--color-success-dark)]";
    return "text-[var(--color-content-accent-dark)]";
  };
  return <Icon name={mappedIconName} className={getIconColor(iconColor)} />;
};

export const PropertyDetailsPage: React.FC<PropertyDetailsPageProps> = ({
  propertyId: overridePropertyId,
  address: overrideAddress,
  city: overrideCity,
  propertyType: overridePropertyType,
  onBack: _onBack,
  className,
}) => {
  const { propertyId: routePropertyId } = useParams<{ propertyId: string }>();
  const navigate = useNavigate();

  const [isSearchModalOpen, setIsSearchModalOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("property-details");

  // Keyboard shortcut for opening command dialog (same as home page)
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchModalOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const propertyId = overridePropertyId || routePropertyId || "";
  
  // Get property item to access icon color
  const propertyItem = React.useMemo(() => {
    return getPropertyById(propertyId);
  }, [propertyId]);
  
  // Get property details from mock data if not overridden
  const propertyData = React.useMemo(() => {
    if (overrideAddress && overrideCity && overridePropertyType) {
      return {
        address: overrideAddress,
        city: overrideCity,
        propertyType: overridePropertyType,
      };
    }
    return getPropertyDetails(propertyId);
  }, [propertyId, overrideAddress, overrideCity, overridePropertyType]);

  const address = propertyData?.address || "Property Address";
  const city = propertyData?.city || "City";
  const propertyType = propertyData?.propertyType || "home";
  
  // Determine meta label based on icon color from property item
  // Green (success/category-2) = Commercial, Blue (info/category-1) = Residential
  const metaLabel = React.useMemo(() => {
    if (overridePropertyType) {
      return overridePropertyType === "building" ? "Commercial" : "Residential";
    }
    if (propertyItem) {
      const { iconColor } = propertyItem;
      // Green colors indicate Commercial
      if (iconColor === "success" || iconColor === "category-2") {
        return "Commercial";
      }
      // Blue colors indicate Residential
      if (iconColor === "info" || iconColor === "category-1") {
        return "Residential";
      }
    }
    // Fallback to propertyType from mock data
    return propertyType === "building" ? "Commercial" : "Residential";
  }, [propertyItem, propertyType, overridePropertyType]);

  const filteredSearchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return searchResults;
    const query = searchQuery.toLowerCase().trim();
    return searchResults.filter((result) =>
      result.text.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className={cn("min-h-screen bg-[var(--color-surface)]", className)}>
      {/* Main Section */}
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Header Section */}
        <section
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Global Header with search (logo | command trigger | avatar) */}
          <GlobalHeader
            variant="search"
            avatarSrc="https://i.pravatar.cc/150?img=12"
            avatarAlt="User"
            avatarFallback="JD"
            searchPlaceholder="SEARCH PROPERTIES"
            onSearchClick={() => setIsSearchModalOpen(true)}
            onLogoClick={() => navigate("/")}
          />

          {/* Property Header */}
          <PropertyHeader
            metaLabel={metaLabel}
            heading={`${address}, ${city}`}
            metadataItems={
              <>
                <MetadataItem
                  variant="data-group"
                  label="Property Value"
                  icon={<Icon name="Globe" size="lg" />}
                  dataValue="7.728.337"
                  dataUnit="DKK"
                  labelIcon={<Icon name="HelpCircle" size="xs" />}
                />

                <MetadataItem
                  variant="button"
                  label="Last Updated"
                  buttonText="View History"
                  buttonIcon={<Icon name="Calendar" />}
                />
              </>
            }
            actions={
              <>
                <Button variant="outline" iconLeft={<Icon name="Bookmark" />}>
                  Save
                </Button>
                <Button variant="outline" iconLeft={<Icon name="Share2" />}>
                  Share
                </Button>
                <Button variant="primary" iconLeft={<Icon name="Download" />}>
                  Export
                </Button>
              </>
            }
          />
        </section>

        {/* Container Section */}
        <section
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            padding: "var(--spacing-6xl) 0",
          }}
        >
          <div
            className="px-4 md:px-0"
            style={{
              display: "flex",
              width: "100%",
              maxWidth: "1312px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "var(--spacing-2xl)",
            }}
          >
            {/* Tab Items */}
            <div style={{ display: "flex", gap: "var(--spacing-sm)", flexWrap: "wrap" }}>
              <TabItem
                isActive={activeTab === "property-details"}
                onClick={() => setActiveTab("property-details")}
              >
                Property Details
              </TabItem>
              <TabItem
                isActive={activeTab === "financial-comparison"}
                onClick={() => navigate(`/property/${propertyId}/financial-comparison`)}
              >
                Financial Comparison
              </TabItem>
              <TabItem
                isActive={activeTab === "critical-rent"}
                onClick={() => setActiveTab("critical-rent")}
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

            {/* Tab Content Container: vertical on mobile, horizontal on md+ */}
            <div
              className="flex w-full flex-col gap-[var(--spacing-6xl)] md:flex-row md:items-start"
            >
            {/* Left Column */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "var(--spacing-2xl)",
                flex: "1 0 0",
              }}
            >
              {/* Tile Stack: vertical on mobile, horizontal on md+ */}
              <div className="flex w-full flex-col gap-[var(--spacing-2xl)] md:flex-row">
                <Tile className="w-full">
                  <TileHeader>
                    <TileTitle>Occupancy</TileTitle>
                  </TileHeader>
                  <TileContent>
                    <OccupancyChart
                      occupancyRate={40}
                      centerValue="681"
                      centerUnit="m²"
                      centerLabel="Ground area"
                      badgeText="40% occupancy rate"
                    />
                  </TileContent>
                </Tile>

                <Tile className="w-full">
                  <TileHeader>
                    <TileTitle>Building Area</TileTitle>
                  </TileHeader>
                  <TileContent>
                    <BuildingAreaChart
                      data={[
                        { name: "residential", value: 70, color: "var(--color-accent-light)", label: "Residential units" },
                        { name: "garage", value: 30, color: "var(--color-accent)", label: "Garage" },
                      ]}
                      centerValue="336"
                      centerUnit="m²"
                      centerLabel="Area"
                    />
                  </TileContent>
                </Tile>
              </div>

              {/* Building Conditions - Grid Tile */}
              <Tile className="w-full">
                <TileHeader>
                  <TileTitle>Building Conditions</TileTitle>
                </TileHeader>
                <TileContent className="gap-[var(--spacing-2xl)]">
                  <div className="grid w-full grid-cols-1 gap-[var(--spacing-2xl)] md:grid-cols-2">
                    {/* Roof Material */}
                    <Tile>
                      <TileHeader>
                        <TileTitle>Roof Material</TileTitle>
                      </TileHeader>
                      <TileContent className="gap-[var(--spacing-md)] justify-end min-h-[var(--spacing-10xl)]">
                        <p className="text-[length:var(--text-xl)] font-[weight:var(--font-normal)] text-[var(--color-content-primary)]">Clay tiles</p>
                        <div className="flex gap-[var(--spacing-sm)]">
                          <Badge variant="success" fontVariant="sans" iconRight={<Icon name="HelpCircle" size="xs" />}>
                            Recently renovated
                          </Badge>
                        </div>
                      </TileContent>
                    </Tile>

                    {/* Exterior Wall Material */}
                    <Tile>
                      <TileHeader>
                        <TileTitle>Exterior Wall Material</TileTitle>
                      </TileHeader>
                      <TileContent className="gap-[var(--spacing-md)] justify-end min-h-[var(--spacing-10xl)]">
                        <p className="text-[length:var(--text-xl)] font-[weight:var(--font-normal)] text-[var(--color-content-primary)]">Brick masonry</p>
                        <div className="flex gap-[var(--spacing-sm)]">
                          <Badge variant="warning" fontVariant="sans" iconRight={<Icon name="HelpCircle" size="xs" />}>
                            Renovated 5–10 yrs ago
                          </Badge>
                        </div>
                      </TileContent>
                    </Tile>

                    {/* Oil Tank */}
                    <Tile>
                      <TileHeader>
                        <TileTitle>Oil Tank</TileTitle>
                      </TileHeader>
                      <TileContent className="gap-[var(--spacing-md)] justify-end min-h-[var(--spacing-10xl)]">
                        <p className="text-[length:var(--text-xl)] font-[weight:var(--font-normal)] text-[var(--color-content-primary)]">1500 L</p>
                        <div className="flex gap-[var(--spacing-sm)]">
                          <Badge variant="neutral" fontVariant="sans" iconRight={<Icon name="HelpCircle" size="xs" />}>
                            Installed 2005
                          </Badge>
                          <Badge variant="neutral" fontVariant="sans" iconRight={<Icon name="HelpCircle" size="xs" />}>
                            Inspected 2022
                          </Badge>
                        </div>
                      </TileContent>
                    </Tile>

                    {/* Soil Contamination */}
                    <Tile>
                      <TileHeader>
                        <TileTitle>Soil Contamination</TileTitle>
                      </TileHeader>
                      <TileContent className="gap-[var(--spacing-md)] justify-end min-h-[var(--spacing-10xl)]">
                        <p className="text-[length:var(--text-xl)] font-[weight:var(--font-normal)] text-[var(--color-content-primary)]">No contamination detected</p>
                        <div className="flex gap-[var(--spacing-sm)]">
                          <Badge variant="neutral" fontVariant="sans" iconRight={<Icon name="HelpCircle" size="xs" />}>
                            Last tested March, 2025
                          </Badge>
                        </div>
                      </TileContent>
                    </Tile>
                  </div>
                </TileContent>
              </Tile>

              {/* Financial Overview - Side by Side Tiles */}
              <Tile className="w-full">
                <TileHeader>
                  <TileTitle>Financial Overview</TileTitle>
                </TileHeader>
                <TileContent className="gap-[var(--spacing-2xl)]">
                  <div className="flex w-full flex-col gap-[var(--spacing-2xl)] md:flex-row">
                    {/* Last Transaction */}
                    <Tile className="flex-1">
                      <div className="flex flex-col gap-[var(--spacing-xl)]">
                        <Badge 
                          variant="info" 
                          fontVariant="mono" 
                          iconLeft={<Icon name="Dock" size="xs" />}
                          className="self-start"
                        >
                          Last transaction
                        </Badge>
                        <div className="flex flex-col gap-[var(--spacing-md)]">
                          <div className="flex items-start justify-between text-[length:var(--text-sm)]">
                            <span className="text-[var(--color-content-muted)]">Transaction value</span>
                            <span className="text-[var(--color-content-primary)]">
                              47,000 <span className="text-[var(--color-gray-500)]">DKK</span>
                            </span>
                          </div>
                          <div className="flex items-start justify-between text-[length:var(--text-sm)]">
                            <span className="text-[var(--color-content-muted)]">DKK/m²</span>
                            <span className="text-[var(--color-content-primary)]">
                              13,988 <span className="text-[var(--color-gray-500)]">DKK/m²</span>
                            </span>
                          </div>
                          <div className="flex items-start justify-between text-[length:var(--text-sm)]">
                            <span className="text-[var(--color-content-muted)]">Sale date</span>
                            <span className="text-[var(--color-content-primary)]">Feb 13, 2021</span>
                          </div>
                        </div>
                      </div>
                    </Tile>

                    {/* Tax Information */}
                    <Tile className="flex-1">
                      <div className="flex flex-col gap-[var(--spacing-xl)]">
                        <Badge 
                          variant="info" 
                          fontVariant="mono" 
                          iconLeft={<Icon name="ReceiptText" size="xs" />}
                          className="self-start"
                        >
                          Tax information
                        </Badge>
                        <div className="flex flex-col gap-[var(--spacing-md)]">
                          <div className="flex items-start justify-between text-[length:var(--text-sm)]">
                            <span className="text-[var(--color-content-muted)]">Preliminary tax</span>
                            <span className="text-[var(--color-content-primary)]">
                              14,250 <span className="text-[var(--color-gray-500)]">DKK</span>
                            </span>
                          </div>
                          <div className="flex items-start justify-between text-[length:var(--text-sm)]">
                            <span className="text-[var(--color-content-muted)]">Total tax</span>
                            <span className="text-[var(--color-content-primary)]">
                              28,400 <span className="text-[var(--color-gray-500)]">DKK</span>
                            </span>
                          </div>
                          <div className="flex items-start justify-between text-[length:var(--text-sm)]">
                            <span className="text-[var(--color-content-muted)]">Property tax</span>
                            <span className="text-[var(--color-content-primary)]">
                              9,850 <span className="text-[var(--color-gray-500)]">DKK</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </Tile>
                  </div>
                </TileContent>
              </Tile>

              {/* Documentation and Compliance Card */}
              <Card className="w-full">
                <CardHeader className="pt-[var(--spacing-lg)] pr-[var(--spacing-2xl)] pb-[var(--spacing-lg)] pl-[var(--spacing-xl)] gap-[var(--spacing-lg)]">
                  <CardTitle>Documentation and Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <DataList>
                    <DataListItem variant="zebra">
                      <IconContainer 
                        color="blue" 
                        icon={{ name: "Files" }} 
                      />
                      <span className="text-[length:var(--text-sm)] text-[var(--color-content-primary)] flex-1">
                        Building permit, Renovation 2018
                      </span>
                      <span className="text-[length:var(--text-sm)] text-[var(--color-content-muted)]">
                        3.3 MB
                      </span>
                    </DataListItem>

                    <DataListItem variant="zebra">
                      <IconContainer 
                        color="blue" 
                        icon={{ name: "Files" }} 
                      />
                      <span className="text-[length:var(--text-sm)] text-[var(--color-content-primary)] flex-1">
                        Energy performance certificate Class C
                      </span>
                      <span className="text-[length:var(--text-sm)] text-[var(--color-content-muted)]">
                        1.1 MB
                      </span>
                    </DataListItem>

                    <DataListItem variant="zebra">
                      <IconContainer 
                        color="blue" 
                        icon={{ name: "Files" }} 
                      />
                      <span className="text-[length:var(--text-sm)] text-[var(--color-content-primary)] flex-1">
                        Fire safety inspection report
                      </span>
                      <span className="text-[length:var(--text-sm)] text-[var(--color-content-muted)]">
                        2.4 MB
                      </span>
                    </DataListItem>
                  </DataList>
                </CardContent>
              </Card>

              {/* Historical and Legal Status Card */}
              <Card className="w-full">
                <CardHeader className="pt-[var(--spacing-lg)] pr-[var(--spacing-2xl)] pb-[var(--spacing-lg)] pl-[var(--spacing-xl)] gap-[var(--spacing-lg)]">
                  <CardTitle>Historical and Legal Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <DataList>
                    <DataListItem variant="zebra">
                      <IconContainer 
                        color="blue" 
                        icon={{ name: "Scale" }} 
                      />
                      <span className="text-[length:var(--text-sm)] text-[var(--color-content-primary)] flex-1">
                        Structural integrity report, 2020
                      </span>
                      <span className="text-[length:var(--text-sm)] text-[var(--color-content-muted)]">
                        3.7 MB
                      </span>
                    </DataListItem>

                    <DataListItem variant="zebra">
                      <IconContainer 
                        color="blue" 
                        icon={{ name: "Scale" }} 
                      />
                      <span className="text-[length:var(--text-sm)] text-[var(--color-content-primary)] flex-1">
                        Environmental compliance certificate, 2019
                      </span>
                      <span className="text-[length:var(--text-sm)] text-[var(--color-content-muted)]">
                        2.5 MB
                      </span>
                    </DataListItem>

                    <DataListItem variant="zebra">
                      <IconContainer 
                        color="blue" 
                        icon={{ name: "Scale" }} 
                      />
                      <span className="text-[length:var(--text-sm)] text-[var(--color-content-primary)] flex-1">
                        Heritage protection notice, 2007
                      </span>
                      <span className="text-[length:var(--text-sm)] text-[var(--color-content-muted)]">
                        5.4 MB
                      </span>
                    </DataListItem>
                  </DataList>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Property Info Card: full width on mobile, 360px on md+ */}
            <div
              className="flex w-full flex-shrink-0 flex-col md:w-[360px]"
              style={{
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--color-border)",
                gap: "var(--spacing-lg)",
                padding: "var(--spacing-md) var(--spacing-md) var(--spacing-lg) var(--spacing-md)",
                borderRadius: "var(--radius-base)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              {/* Map Image */}
              <div className="h-[240px] overflow-hidden relative w-full" style={{ borderRadius: "var(--radius-base)" }}>
                <img 
                  src={propertyMapImage}
                  alt="Property location map"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div
                className="flex flex-col w-full"
                style={{ paddingLeft: "var(--spacing-sm)", paddingRight: "var(--spacing-sm)" }}
              >
                {/* Header */}
                <div
                  className="flex flex-col w-full"
                  style={{
                    gap: "var(--spacing-xs)",
                    marginBottom: "var(--spacing-lg)",
                  }}
                >
                  <p
                    className="uppercase"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-xs)",
                      color: "var(--color-content-muted)",
                      lineHeight: "var(--leading-tight)",
                    }}
                  >
                    Residential
                  </p>
                  <h3
                    className="font-[family-name:var(--font-sans)] text-[length:var(--text-xl)] text-[var(--color-content-primary)] leading-[var(--leading-tight)]"
                  >
                    {address}, {city}
                  </h3>
                </div>

                {/* Property Data */}
                <div
                  className="flex flex-col w-full"
                  style={{
                    gap: "var(--spacing-md)",
                    marginBottom: "var(--spacing-lg)",
                  }}
                >
                  <div className="flex items-center justify-between text-[length:var(--text-sm)] leading-[var(--leading-tight)]">
                    <span className="text-[var(--color-content-tertiary)] w-[154px]">Year of construction</span>
                    <span className="text-[var(--color-content-primary)] text-right flex-1">1993</span>
                  </div>
                  <div className="flex items-center justify-between text-[length:var(--text-sm)] leading-[var(--leading-tight)]">
                    <span className="text-[var(--color-content-tertiary)] w-[154px]">Cadastre</span>
                    <span className="text-[var(--color-content-primary)] text-right flex-1">4AU</span>
                  </div>
                  <div className="flex items-center justify-between text-[length:var(--text-sm)] leading-[var(--leading-tight)]">
                    <span className="text-[var(--color-content-tertiary)] w-[154px]">BFE</span>
                    <span className="text-[var(--color-content-primary)] text-right flex-1">5307642</span>
                  </div>
                  <div className="flex items-center justify-between text-[length:var(--text-sm)] leading-[var(--leading-tight)]">
                    <span className="text-[var(--color-content-tertiary)] w-[154px]">Area</span>
                    <span className="text-[var(--color-content-primary)] text-right flex-1">681 m²</span>
                  </div>
                  <div className="flex items-center justify-between text-[length:var(--text-sm)] leading-[var(--leading-tight)]">
                    <span className="text-[var(--color-content-tertiary)] w-[154px]">Ownership</span>
                    <span className="text-[var(--color-content-primary)] text-right flex-1">Vestermarken</span>
                  </div>
                  <div className="flex items-center justify-between text-[length:var(--text-sm)] leading-[var(--leading-tight)]">
                    <span className="text-[var(--color-content-tertiary)] w-[154px]">Units</span>
                    <span className="text-[var(--color-content-primary)] text-right flex-1">6 units</span>
                  </div>
                  <div className="flex items-center justify-between" style={{ minHeight: "var(--icon-size-xl)" }}>
                    <span className="text-[var(--color-content-tertiary)] text-[length:var(--text-sm)] w-[154px] leading-[var(--leading-tight)]">Energy label</span>
                    <div
                      className="flex items-center py-0.5"
                      style={{
                        height: "var(--icon-size-xl)",
                        backgroundColor: "var(--color-warning)",
                        paddingLeft: "var(--spacing-sm)",
                        paddingRight: "var(--spacing-sm)",
                        borderRadius: "var(--radius-2xl)",
                      }}
                    >
                      <span className="text-[var(--color-content-white)] text-[length:var(--text-sm)] leading-[var(--leading-tight)]">C</span>
                    </div>
                  </div>
                </div>

                {/* Last Update */}
                <div className="flex items-center" style={{ gap: "var(--spacing-xs)" }}>
                  <Icon name="RefreshCw" size="sm" className="text-[var(--color-gray-500)]" />
                  <span
                  className="leading-[var(--leading-tight)]"
                  style={{
                    color: "var(--color-gray-500)",
                    fontSize: "var(--text-xs)",
                  }}
                >
                  Last update on Jul 25, 2025
                </span>
                </div>
              </div>
            </div>
            </div>
          </div>
        </section>
      </div>

      {/* Command Dialog (same as home page) */}
      <CommandDialog open={isSearchModalOpen} onOpenChange={setIsSearchModalOpen}>
        <CommandInput
          placeholder="Search properties..."
          leadingIcon={<Icon name="Search" />}
          trailingIcon={<Icon name="X" />}
          onTrailingIconClick={() => setIsSearchModalOpen(false)}
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandEmpty>
            <EmptyState
              variant="illustration"
              illustration={
                <img
                  src={magnifyingGraphic}
                  alt=""
                  className="h-30 w-30 object-contain"
                />
              }
              title={searchQuery ? `We couldn't find "${searchQuery}"` : "Start typing to search"}
              description={searchQuery ? "It seems the address is not in our records. Please check for typos or try another search." : "Search for properties by address or BFE number."}
            />
          </CommandEmpty>
          {filteredSearchResults.length > 0 && (
            <CommandGroup heading={`Search Results (${filteredSearchResults.length})`}>
              {filteredSearchResults.map((result) => (
                <CommandItem
                  key={result.id}
                  value={result.text}
                  onSelect={() => {
                    setIsSearchModalOpen(false);
                    navigate(`/property/${result.id}`);
                  }}
                >
                  {getColoredIcon(result.icon, result.iconColor)}
                  <div className="flex flex-col min-w-0">
                    <span
                      className="text-[var(--color-content-primary)]"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "var(--text-sm)",
                        fontWeight: "var(--font-normal)",
                        lineHeight: "var(--leading-tight)",
                      }}
                    >
                      {result.text}
                    </span>
                    {result.supportingText && (
                      <span className="text-[length:var(--text-xs)] text-[var(--color-gray-500)]">{result.supportingText}</span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </div>
  );
};

PropertyDetailsPage.displayName = "PropertyDetailsPage";
