import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Tile, TileHeader, TileTitle, TileContent } from "@/components/ui/tile";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataList, DataListItem } from "@/components/ui/data-list";
import { IconContainer } from "@/components/ui/icon-container";
import { GlobalHeader } from "@/components/ui/global-header";
import { PropertyHeader } from "@/components/ui/property-header";
import { MetadataItem } from "@/components/ui/metadata-item";
import { TabItem } from "@/components/ui/tab-item";
import { Icon, type IconName } from "@/components/ui/icon";
import { EmptyState } from "@/components/ui/empty-state";
import { DonutChart } from "@/components/ui/donut-chart";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

import { cn } from "@/lib/utils";

import mapNeighbourhoodImage from "@/assets/images/map-neighbourhood.png";
import magnifyingGraphic from "@/assets/images/magnifying.png";

import { getPropertyDetails } from "@/pages/property-details/mock-property-details";
import {
  searchResults,
  getPropertyById,
  type PropertyItem,
} from "@/pages/home/mock-data";

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

export interface NeighborhoodPageProps {
  /** Override property ID (for Storybook) */
  propertyId?: string;
  /** Override address */
  address?: string;
  /** Override city */
  city?: string;
  /** Override property type */
  propertyType?: "home" | "building";
  /** Custom className */
  className?: string;
}

export const NeighborhoodPage: React.FC<NeighborhoodPageProps> = ({
  propertyId: overridePropertyId,
  address: overrideAddress,
  city: overrideCity,
  propertyType: overridePropertyType,
  className,
}) => {
  const { propertyId: routePropertyId } = useParams<{ propertyId: string }>();
  const navigate = useNavigate();

  const [isSearchModalOpen, setIsSearchModalOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

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
  const propertyItem = React.useMemo(() => getPropertyById(propertyId), [propertyId]);
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

  const metaLabel = React.useMemo(() => {
    if (overridePropertyType) {
      return overridePropertyType === "building" ? "Commercial" : "Residential";
    }
    if (propertyItem) {
      const { iconColor } = propertyItem;
      if (iconColor === "success" || iconColor === "category-2") return "Commercial";
      if (iconColor === "info" || iconColor === "category-1") return "Residential";
    }
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
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <section
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <GlobalHeader
            variant="search"
            avatarSrc="https://i.pravatar.cc/150?img=12"
            avatarAlt="User"
            avatarFallback="JD"
            searchPlaceholder="SEARCH PROPERTIES"
            onSearchClick={() => setIsSearchModalOpen(true)}
            onLogoClick={() => navigate("/")}
          />

          <PropertyHeader
            metaLabel={metaLabel}
            heading={`${address}, ${city}`}
            metadataItems={
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
            <div style={{ display: "flex", gap: "var(--spacing-sm)", flexWrap: "wrap" }}>
              <TabItem
                isActive={false}
                onClick={() => navigate(`/property/${propertyId}`)}
              >
                Property Details
              </TabItem>
              <TabItem
                isActive={false}
                onClick={() => navigate(`/property/${propertyId}/financial-comparison`)}
              >
                Financial Comparison
              </TabItem>
              <TabItem
                isActive={false}
                onClick={() => navigate(`/property/${propertyId}/critical-rent`)}
              >
                Critical Rent
              </TabItem>
              <TabItem
                isActive={false}
                onClick={() => navigate(`/property/${propertyId}/units`)}
              >
                Units
              </TabItem>
              <TabItem
                isActive={false}
                onClick={() => navigate(`/property/${propertyId}/tinglysning`)}
              >
                Tinglysning
              </TabItem>
              <TabItem isActive>Neighborhood</TabItem>
            </div>

            {/* Main content: map left, tile grid right */}
            <div className="flex w-full items-stretch gap-[var(--spacing-2xl)]">

              {/* LEFT – Map tile */}
              <Tile
                className="relative hidden overflow-hidden !p-3 md:flex"
                style={{ flex: "0 0 49%", minHeight: "396px" }}
              >
                <div
                  className="relative h-full w-full overflow-hidden"
                  style={{ borderRadius: "var(--radius-base)" }}
                >
                  <img
                    src={mapNeighbourhoodImage}
                    alt="Neighborhood map"
                    className="h-full w-full object-cover object-center"
                  />
                  <Button
                    variant="outline"
                    size="xs"
                    iconLeft={<Icon name="MapPin" size="sm" />}
                    className="absolute right-3 top-3"
                  >
                    VIEW MAP
                  </Button>
                </div>
              </Tile>

              {/* RIGHT – 2×2 grid of tiles */}
              <div
                className="grid flex-1 grid-cols-1 gap-[var(--spacing-2xl)] sm:grid-cols-2"
              >
                {/* NOISE – donut chart */}
                <Tile>
                  <TileHeader>
                    <TileTitle tooltip="Average noise level in the surrounding area, measured in decibels (dB).">Noise</TileTitle>
                  </TileHeader>
                  <TileContent className="items-center">
                    <DonutChart
                      hideLegend
                      data={[
                        { name: "level", value: 45, color: "var(--color-accent)", label: "" },
                        { name: "rest",  value: 55, color: "var(--color-accent-light)", label: "" },
                      ]}
                      centerValue="45"
                      centerUnit="dB"
                      centerLabel="Medium"
                      centerValueClassName="ui-mono-24"
                      centerLabelClassName="ui-sans-regular-12"
                    />
                  </TileContent>
                </Tile>

                {/* TRAFFIC – donut chart */}
                <Tile>
                  <TileHeader>
                    <TileTitle tooltip="Percentage of time the area experiences heavy road traffic.">Traffic</TileTitle>
                  </TileHeader>
                  <TileContent className="items-center">
                    <DonutChart
                      hideLegend
                      data={[
                        { name: "level", value: 23, color: "var(--color-accent)", label: "" },
                        { name: "rest",  value: 77, color: "var(--color-accent-light)", label: "" },
                      ]}
                      centerValue="23"
                      centerUnit="%"
                      centerLabel="Low"
                      centerValueClassName="ui-mono-24"
                      centerLabelClassName="ui-sans-regular-12"
                    />
                  </TileContent>
                </Tile>

                {/* FLOOD RISK – 5-segment bar */}
                <Tile>
                  <TileHeader>
                    <TileTitle tooltip="Flood risk rating based on proximity to water bodies and local elevation data.">Flood risk</TileTitle>
                  </TileHeader>
                  <TileContent className="flex flex-col justify-end gap-[var(--spacing-md)]">
                    {/* 5-segment risk bar */}
                    <div
                      className="flex w-full gap-0.5"
                      role="img"
                      aria-label="Flood risk level: 1 of 5, Low"
                    >
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className="h-6 flex-1"
                          style={{
                            backgroundColor: i === 1 ? "var(--color-green)" : "var(--color-surface-dark)",
                            borderRadius:
                              i === 1
                                ? "var(--radius-sm) 0 0 var(--radius-sm)"
                                : i === 5
                                ? "0 var(--radius-sm) var(--radius-sm) 0"
                                : "0",
                          }}
                        />
                      ))}
                    </div>
                    <Badge
                      variant="success"
                      fontVariant="sans"
                      tooltip="Flood risk is rated 1 out of 5 — low probability of flooding based on elevation and proximity to water."
                      className="self-start"
                    >
                      Low
                    </Badge>
                  </TileContent>
                </Tile>

                {/* SOIL POLLUTION – value + status */}
                <Tile>
                  <TileHeader>
                    <TileTitle tooltip="Concentration of contaminants in the soil, measured in milligrams per kilogram (mg/kg).">Soil pollution</TileTitle>
                  </TileHeader>
                  <TileContent className="flex flex-col justify-end gap-[var(--spacing-md)]">
                    <p className="ui-sans-regular-20 text-[var(--color-content-primary)]">
                      300 mg/kg
                    </p>
                    <Badge
                      variant="success"
                      fontVariant="sans"
                      tooltip="Soil contamination level of 300 mg/kg is within safe limits. No remediation required."
                      className="self-start"
                    >
                      Safe
                    </Badge>
                  </TileContent>
                </Tile>
              </div>
            </div>

            {/* IMMEDIATE AREA tile */}
            <Tile className="w-full">
              <TileHeader>
                <TileTitle tooltip="Points of interest and services within the immediate vicinity of the property.">Immediate area</TileTitle>
              </TileHeader>
              <TileContent>
                <div className="grid w-full grid-cols-1 gap-[var(--spacing-2xl)] sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      icon: "Bus" as const,
                      label: "Public transport",
                      items: [
                        { name: "Himmelev Bycenter", type: "Bus", distance: "1.0 km" },
                        { name: "Roskilde St.", type: "Regional train", distance: "1.2 km" },
                        { name: "Ringstedvej", type: "Bus", distance: "1.7 km" },
                        { name: "Trekroner St.", type: "Regional train", distance: "2.8 km" },
                      ],
                    },
                    {
                      icon: "ShoppingCart" as const,
                      label: "Groceries",
                      items: [
                        { name: "Netto Himmelev", type: "Supermarket", distance: "0.5 km" },
                        { name: "Rema 1000 Roskilde", type: "Supermarket", distance: "0.8 km" },
                        { name: "Fotex Roskilde", type: "Supermarket", distance: "1.3 km" },
                        { name: "Meny Algade", type: "Supermarket", distance: "1.7 km" },
                      ],
                    },
                    {
                      icon: "Baby" as const,
                      label: "Childcare",
                      items: [
                        { name: "Bornehuset Kastanjen", type: "Nursery 0–2 years", distance: "0.6 km" },
                        { name: "Vuggestuen Bakkebo", type: "Nursery 0–2 years", distance: "1.0 km" },
                        { name: "Bornehaven Solsikken", type: "Kindergarten", distance: "1.4 km" },
                        { name: "Eventyrhuset Roskilde", type: "Kindergarten", distance: "1.9 km" },
                      ],
                    },
                    {
                      icon: "School" as const,
                      label: "Education",
                      items: [
                        { name: "Roskilde Universitet", type: "University", distance: "0.9 km" },
                        { name: "Himmelev Skole", type: "Elementary school", distance: "1.5 km" },
                        { name: "Klostermarksskolen", type: "High school", distance: "1.8 km" },
                        { name: "Roskilde Gymnasium", type: "Elementary school", distance: "3.5 km" },
                      ],
                    },
                    {
                      icon: "Dumbbell" as const,
                      label: "Training",
                      items: [
                        { name: "Fitness World Roskilde", type: "Training and fitness", distance: "0.7 km" },
                        { name: "Loop Fitness Roskilde", type: "Training and fitness", distance: "1.2 km" },
                        { name: "CrossFit Roskilde", type: "Training and fitness", distance: "1.6 km" },
                        { name: "SATS Trekroner", type: "Training and fitness", distance: "2.4 km" },
                      ],
                    },
                    {
                      icon: "BriefcaseBusiness" as const,
                      label: "Commercial",
                      items: [
                        { name: "Novo Nordisk", type: "Corporate office", distance: "0.7 km" },
                        { name: "Maersk Group", type: "Corporate headquarters", distance: "1.2 km" },
                        { name: "Vestas Wind Systems", type: "Global headquarters", distance: "1.6 km" },
                        { name: "LEGO Group", type: "Global headquarters", distance: "2.4 km" },
                      ],
                    },
                  ].map((category) => (
                    <Tile key={category.label}>
                      <TileContent className="gap-[var(--spacing-lg)] !p-0">
                        {/* Category header */}
                        <Badge
                          variant="neutral"
                          fontVariant="mono"
                          iconLeft={<Icon name={category.icon} size="sm" />}
                          className="self-start"
                        >
                          {category.label}
                        </Badge>

                        {/* Items */}
                        <div className="flex flex-col">
                          {category.items.map((item) => (
                            <div
                              key={item.name}
                              className="flex items-start justify-between gap-[var(--spacing-sm)] py-[var(--spacing-sm)]"
                            >
                              <div className="flex flex-col gap-0.5">
                                <p className="ui-sans-regular-14 text-[var(--color-content-primary)]">
                                  {item.name}
                                </p>
                                <p className="ui-sans-regular-13 text-[var(--color-content-secondary)]">
                                  {item.type}
                                </p>
                              </div>
                              <p className="ui-sans-regular-14 shrink-0 text-[var(--color-content-primary)]">
                                {item.distance}
                              </p>
                            </div>
                          ))}
                        </div>
                      </TileContent>
                    </Tile>
                  ))}
                </div>
              </TileContent>
            </Tile>

            {/* MUNICIPAL PLANS */}
            <Card className="w-full">
              <CardHeader className="pb-[var(--spacing-lg)] pr-[var(--spacing-2xl)]">
                <CardTitle>Municipal plans</CardTitle>
              </CardHeader>
              <CardContent>
                <DataList className="w-full">
                  {[
                    {
                      year: "2025",
                      description: "Himmelev South Housing Expansion",
                      status: "Proposal" as const,
                    },
                    {
                      year: "2020",
                      description: "Ringstedvej Traffic Upgrade",
                      status: "Adopted" as const,
                    },
                  ].map((row) => (
                    <DataListItem key={row.year} variant="zebra" className="!p-0 !gap-0 overflow-hidden">
                      {/* Cell 1: icon + year */}
                      <div className="flex h-[60px] shrink-0 items-center gap-3 py-3 pl-3 pr-6">
                        <IconContainer color="blue" icon={{ name: "MapPinned", size: "base" }} />
                        <span className="ui-sans-regular-14 text-[var(--color-content-primary)]">
                          {row.year}
                        </span>
                      </div>
                      {/* Cell 2: description */}
                      <div className="flex h-[60px] flex-1 items-center justify-end p-3">
                        <span className="ui-sans-regular-14 text-[var(--color-content-secondary)]">
                          {row.description}
                        </span>
                      </div>
                      {/* Cell 3: status badge */}
                      <div className="flex h-[60px] w-[136px] shrink-0 items-center justify-end p-3">
                        <Badge
                          variant={row.status === "Proposal" ? "warning" : "success"}
                          fontVariant="sans"
                          tooltip={
                            row.status === "Proposal"
                              ? "This plan is in the proposal stage and has not yet been formally adopted."
                              : "This plan has been formally adopted and is in effect."
                          }
                        >
                          {row.status}
                        </Badge>
                      </div>
                      {/* Cell 4: view link */}
                      <div className="flex h-[60px] w-[104px] shrink-0 items-center justify-end p-3">
                        <button className="ui-mono-13 uppercase text-[var(--color-content-accent)] hover:text-[var(--color-content-accent-dark)]">
                          View
                        </button>
                      </div>
                    </DataListItem>
                  ))}
                </DataList>
              </CardContent>
            </Card>

            {/* HISTORICAL MAP */}
            <Card className="w-full">
              <CardHeader className="pb-[var(--spacing-lg)] pr-[var(--spacing-2xl)]">
                <CardTitle tooltip="Historical zoning maps and land-use records for this area.">Historical map</CardTitle>
              </CardHeader>
              <CardContent>
                <DataList className="w-full">
                  <DataListItem variant="zebra" className="!p-0 !gap-0 overflow-hidden">
                    {/* Cell 1: icon + year */}
                    <div className="flex h-[60px] shrink-0 items-center gap-3 py-3 pl-3 pr-6">
                      <IconContainer color="blue" icon={{ name: "Map", size: "base" }} />
                      <span className="ui-sans-regular-14 text-[var(--color-content-primary)]">
                        2015
                      </span>
                    </div>
                    {/* Cell 2: description */}
                    <div className="flex h-[60px] flex-1 items-center justify-end p-3">
                      <span className="ui-sans-regular-14 text-[var(--color-content-secondary)]">
                        Old Zoning Map / Ejby Industrial Area
                      </span>
                    </div>
                    {/* Cell 3: status badge */}
                    <div className="flex h-[60px] w-[136px] shrink-0 items-center justify-end p-3">
                      <Badge
                        variant="success"
                        fontVariant="sans"
                        tooltip="This historical map record has been formally adopted and is part of the official municipal archive."
                      >
                        Adopted
                      </Badge>
                    </div>
                    {/* Cell 4: view link */}
                    <div className="flex h-[60px] w-[104px] shrink-0 items-center justify-end p-3">
                      <button className="ui-mono-13 uppercase text-[var(--color-content-accent)] hover:text-[var(--color-content-accent-dark)]">
                        View
                      </button>
                    </div>
                  </DataListItem>
                </DataList>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

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
                      style={{
                        color: "var(--color-content-primary)",
                        fontFamily: "var(--font-sans)",
                        fontSize: "var(--text-sm)",
                        fontWeight: "var(--font-normal)",
                        lineHeight: "var(--leading-tight)",
                      }}
                    >
                      {result.text}
                    </span>
                    {result.supportingText && (
                      <span style={{ fontSize: "var(--text-xs)", color: "var(--color-gray-500)" }}>
                        {result.supportingText}
                      </span>
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
