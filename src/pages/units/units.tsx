import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Tile, TileHeader, TileHeaderActions, TileTitle, TileContent } from "@/components/ui/tile";
import { GlobalHeader } from "@/components/ui/global-header";
import { PropertyHeader } from "@/components/ui/property-header";
import { MetadataItem } from "@/components/ui/metadata-item";
import { Badge } from "@/components/ui/badge";
import { TabItem } from "@/components/ui/tab-item";
import { Icon, type IconName } from "@/components/ui/icon";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { ValueCard } from "@/components/ui/value-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { TableHeader } from "@/components/ui/table-header";
import { TableCell } from "@/components/ui/table-cell";
import { TableRow } from "@/components/ui/table-row";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";

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

export interface UnitsPageProps {
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

export const UnitsPage: React.FC<UnitsPageProps> = ({
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
  const [building1Collapsed, setBuilding1Collapsed] = React.useState(false);
  const [building2Collapsed, setBuilding2Collapsed] = React.useState(false);
  const [unitsSearchQuery, setUnitsSearchQuery] = React.useState("");

  const allCollapsed = building1Collapsed && building2Collapsed;
  const toggleCollapseExpandAll = React.useCallback(() => {
    if (allCollapsed) {
      setBuilding1Collapsed(false);
      setBuilding2Collapsed(false);
    } else {
      setBuilding1Collapsed(true);
      setBuilding2Collapsed(true);
    }
  }, [allCollapsed]);

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
              <TabItem isActive>Units</TabItem>
              <TabItem
                isActive={false}
                onClick={() => navigate(`/property/${propertyId}/tinglysning`)}
              >
                Tinglysning
              </TabItem>
              <TabItem isActive={false} onClick={() => navigate(`/property/${propertyId}/neighborhood`)}>
                Neighborhood
              </TabItem>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "18px",
                width: "100%",
              }}
            >
              <ValueCard
                label="Residential units"
                labelTooltip="Number of residential units in the property."
                value="6"
                valueIcon={<Icon name="Home" size="xl" className="text-[var(--color-content-accent)]" />}
              />
              <ValueCard
                label="Business units"
                labelTooltip="Number of commercial or business units in the property."
                value="6"
                valueIcon={<Icon name="Building" size="xl" className="text-[var(--color-green)]" />}
              />
              <ValueCard
                label="Living area"
                labelTooltip="Total living area across all residential units."
                value="336"
                valueIcon={null}
                metric="M²"
              />
              <ValueCard
                label="Commercial space"
                labelTooltip="Total commercial floor space in the property."
                value="0"
                valueIcon={null}
              />
            </div>

            <div
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Input
                variant="default"
                size="default"
                fontVariant="sans"
                placeholder="Search..."
                leadingIcon={<Icon name="Search" size="md" />}
                value={unitsSearchQuery}
                onChange={(e) => setUnitsSearchQuery(e.target.value)}
                className="min-w-[200px] max-w-[340px] shrink-0"
              />
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant="outline"
                      size="md"
                      iconLeft={
                        <Icon
                          name={allCollapsed ? "ChevronsUpDown" : "ChevronsDownUp"}
                          size="md"
                        />
                      }
                      onClick={toggleCollapseExpandAll}
                      aria-label="Collapse/Expand all"
                    />
                  }
                />
                <TooltipContent>Collapse/Expand all</TooltipContent>
              </Tooltip>
            </div>

            <Tile className="w-full">
              <TileHeader className={cn(building1Collapsed && "!border-b-0 !pb-0")}>
                <TileTitle>Building 1: Apartment building, multi-family building</TileTitle>
                <TileHeaderActions>
                  <Button
                    variant="inline"
                    size="md"
                    iconRight={
                      building1Collapsed ? (
                        <Icon name="ChevronDown" size="md" />
                      ) : (
                        <Icon name="ChevronUp" size="md" />
                      )
                    }
                    onClick={() => setBuilding1Collapsed((c) => !c)}
                  >
                    {building1Collapsed ? "expand" : "collapse"}
                  </Button>
                </TileHeaderActions>
              </TileHeader>
              {!building1Collapsed && (
                <TileContent>
                  <TooltipProvider>
                    <div className="overflow-x-auto rounded-lg bg-[var(--color-card)]">
                      <table className="data-table w-full min-w-[560px] border-collapse table-fixed">
                        <colgroup>
                          <col style={{ width: "33.33%" }} />
                          <col style={{ width: "33.33%" }} />
                          <col style={{ width: "33.34%" }} />
                        </colgroup>
                        <thead>
                          <tr>
                            <TableHeader
                              theme="light"
                              label="Address"
                              tooltipContent="Unit or property address."
                            />
                            <TableHeader
                              theme="light"
                              label="Total area"
                              tooltipContent="Total area in square meters."
                              align="right"
                            />
                            <TableHeader
                              theme="light"
                              label="Type"
                              tooltipContent="Unit type (e.g. Residential, Commercial)."
                              align="right"
                            />
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { address: "Holbækvej 37, st. tv", totalArea: "56", type: "Residential" },
                            { address: "Holbækvej 37, st. th", totalArea: "56", type: "Residential" },
                            { address: "Holbækvej 37, 1. tv", totalArea: "56", type: "Residential" },
                            { address: "Holbækvej 37, 1. th", totalArea: "56", type: "Residential" },
                            { address: "Holbækvej 37, 2. tv", totalArea: "56", type: "Residential" },
                            { address: "Holbækvej 37, 2. th", totalArea: "56", type: "Residential" },
                          ].map((unit, index) => (
                            <TableRow key={index} className="border-b-inset">
                              <TableCell contentWidth="full" align="left">{unit.address}</TableCell>
                              <TableCell contentWidth="full" align="right">
                                {unit.totalArea} m²
                              </TableCell>
                              <TableCell contentWidth="full" align="right">{unit.type}</TableCell>
                            </TableRow>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TooltipProvider>
                </TileContent>
              )}
            </Tile>

            <Tile className="w-full">
              <TileHeader className={cn(building2Collapsed && "!border-b-0 !pb-0")}>
                <TileTitle>Building 2: Garage with space for one or two vehicles</TileTitle>
                <TileHeaderActions>
                  <Button
                    variant="inline"
                    size="md"
                    iconRight={
                      building2Collapsed ? (
                        <Icon name="ChevronDown" size="md" />
                      ) : (
                        <Icon name="ChevronUp" size="md" />
                      )
                    }
                    onClick={() => setBuilding2Collapsed((c) => !c)}
                  >
                    {building2Collapsed ? "expand" : "collapse"}
                  </Button>
                </TileHeaderActions>
              </TileHeader>
              {!building2Collapsed && (
                <TileContent>
                  <TooltipProvider>
                    <div className="overflow-x-auto rounded-lg bg-[var(--color-card)]">
                      <table className="data-table w-full min-w-[560px] border-collapse table-fixed">
                        <colgroup>
                          <col style={{ width: "33.33%" }} />
                          <col style={{ width: "33.33%" }} />
                          <col style={{ width: "33.34%" }} />
                        </colgroup>
                        <thead>
                          <tr>
                            <TableHeader
                              theme="light"
                              label="Address"
                              tooltipContent="Unit or property address."
                            />
                            <TableHeader
                              theme="light"
                              label="Rent"
                              tooltipContent="Rent amount."
                              align="right"
                            />
                            <TableHeader
                              theme="light"
                              label="Type"
                              tooltipContent="Unit type (e.g. Garage, Residential)."
                              align="right"
                            />
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { address: "Holbækvej 37, st. tv", rent: "0", type: "Garage" },
                            { address: "Holbækvej 37, st. th", rent: "350", type: "Garage" },
                            { address: "Holbækvej 37, 1. tv", rent: "0", type: "Garage" },
                            { address: "Holbækvej 37, 1. th", rent: "0", type: "Garage" },
                            { address: "Holbækvej 37, 2. tv", rent: "0", type: "Garage" },
                            { address: "Holbækvej 37, 2. th", rent: "700", type: "Garage" },
                          ].map((unit, index) => (
                            <TableRow key={index} className="border-b-inset">
                              <TableCell contentWidth="full" align="left">{unit.address}</TableCell>
                              <TableCell contentWidth="full" align="right">
                                {unit.rent} DKK
                              </TableCell>
                              <TableCell contentWidth="full" align="right">{unit.type}</TableCell>
                            </TableRow>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TooltipProvider>
                </TileContent>
              )}
            </Tile>
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
