import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tile, TileHeader, TileTitle, TileContent } from "@/components/ui/tile";
import { ValueCard } from "@/components/ui/value-card";
import { Input } from "@/components/ui/input";
import { TableHeader } from "@/components/ui/table-header";
import { TableRow } from "@/components/ui/table-row";
import { TableCell } from "@/components/ui/table-cell";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PropertyCard } from "@/components/ui/property-card";
import { GlobalHeader } from "@/components/ui/global-header";
import { PropertyHeader } from "@/components/ui/property-header";
import { MetadataItem } from "@/components/ui/metadata-item";
import { EmptyState } from "@/components/ui/empty-state";
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
import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/inline-tabs";

import { cn } from "@/lib/utils";

import { TablePage } from "@/pages/table/table";

import magnifyingGraphic from "@/assets/images/magnifying.png";

import { getPropertyDetails } from "@/pages/property-details/mock-property-details";
import {
  searchResults,
  getPropertyById,
  type PropertyItem,
} from "@/pages/home/mock-data";

export interface FinancialComparisonPageProps {
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

export const FinancialComparisonPage: React.FC<FinancialComparisonPageProps> = ({
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
  const [activeTab, setActiveTab] = React.useState("comparison");

  type RentalSortColumn = "unit" | "m2" | "monthly" | "annual" | "perM2";
  type RentalSortDirection = "asc" | "desc";
  const [rentalSortColumn, setRentalSortColumn] = React.useState<RentalSortColumn | null>(null);
  const [rentalSortDirection, setRentalSortDirection] = React.useState<RentalSortDirection>("asc");

  const rentalTableRows = React.useMemo(
    () => [
      { unit: "Holbækvej 37 st. tv", m2: "56", monthly: "6.766,67", annual: "81.200", perM2: "1.450" },
      { unit: "Holbækvej 37 st. th", m2: "56", monthly: "6.766,67", annual: "81.200", perM2: "1.450" },
      { unit: "Holbækvej 37 1. tv", m2: "56", monthly: "6.766,67", annual: "81.200", perM2: "1.450" },
      { unit: "Holbækvej 37 1. th", m2: "56", monthly: "6.766,67", annual: "81.200", perM2: "1.450" },
      { unit: "Holbækvej 37 2. tv", m2: "56", monthly: "6.766,67", annual: "81.200", perM2: "1.450" },
      { unit: "Holbækvej 37 2. th", m2: "56", monthly: "6.766,67", annual: "81.200", perM2: "1.450" },
    ],
    []
  );

  const sortedRentalRows = React.useMemo(() => {
    if (rentalSortColumn == null) return rentalTableRows;
    const dir = rentalSortDirection === "asc" ? 1 : -1;
    return [...rentalTableRows].sort((a, b) => {
      const aVal = a[rentalSortColumn];
      const bVal = b[rentalSortColumn];
      const numA = parseFloat(aVal.replace(/\./g, "").replace(",", "."));
      const numB = parseFloat(bVal.replace(/\./g, "").replace(",", "."));
      if (!Number.isNaN(numA) && !Number.isNaN(numB)) return (numA - numB) * dir;
      return String(aVal).localeCompare(String(bVal), undefined, { numeric: true }) * dir;
    });
  }, [rentalTableRows, rentalSortColumn, rentalSortDirection]);

  const handleRentalSort = (column: RentalSortColumn) => {
    setRentalSortColumn((prev) => {
      if (prev === column) {
        setRentalSortDirection((d) => (d === "asc" ? "desc" : "asc"));
        return prev;
      }
      setRentalSortDirection("asc");
      return column;
    });
  };

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

        <section
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            padding: "var(--spacing-6xl) 0",
          }}
        >
          <div
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
              <TabItem isActive>Financial Comparison</TabItem>
              <TabItem
                isActive={false}
                onClick={() => {}}
              >
                Critical Rent
              </TabItem>
              <TabItem isActive={false} onClick={() => {}}>
                Units
              </TabItem>
              <TabItem isActive={false} onClick={() => {}}>
                Tinglysning
              </TabItem>
              <TabItem isActive={false} onClick={() => {}}>
                Neighborhood
              </TabItem>
            </div>

            <Card className="w-full">
              <CardHeader
                style={{
                  padding: "var(--spacing-xl)",
                  paddingBottom: "0",
                  gap: "var(--spacing-xl)",
                }}
              >
                <CardTitle>Financial comparison</CardTitle>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTab value="comparison">Comparison</TabsTab>
                    <TabsTab
                      value="market"
                      icon={<Icon name="Globe" style={{ color: "var(--color-green)" }} />}
                    >
                      Market
                    </TabsTab>
                    <TabsTab
                      value="calculated"
                      icon={<Icon name="Sparkles" style={{ color: "var(--color-violet)" }} />}
                    >
                      Calculated
                    </TabsTab>
                    <TabsTab
                      value="simulation"
                      icon={<Icon name="Box" style={{ color: "var(--color-amber)" }} />}
                    >
                      Simulation
                    </TabsTab>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent style={{ padding: "20px" }}>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsPanel value="comparison" className="mt-0">
                    <TablePage />
                  </TabsPanel>
                  <TabsPanel value="market" className="mt-0">
                    <TileHeader>
                      <TileTitle>Valuation summary</TileTitle>
                    </TileHeader>
                    <div
                      className={cn("gap-[var(--spacing-xl)]")}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        marginTop: "var(--spacing-md)",
                      }}
                    >
                      <ValueCard
                        label="Calculated value"
                        value="5.080.421"
                        metric="DKK"
                        valueIcon={<Icon name="Sparkles" size="lg" />}
                      />
                      <ValueCard
                        label="Yield"
                        value="5"
                        metric="%"
                        valueIcon={null}
                      />
                      <ValueCard
                        label="Value per M²"
                        value="336"
                        metric="M²"
                        valueIcon={null}
                      />
                      <ValueCard
                        label="Price per M²"
                        value="23.000"
                        metric="DKK"
                        valueIcon={null}
                      />
                    </div>
                  </TabsPanel>
                  <TabsPanel value="calculated" className="mt-0">
                    <TablePage />
                  </TabsPanel>
                  <TabsPanel value="simulation" className="mt-0">
                    <TablePage />
                  </TabsPanel>
                </Tabs>
              </CardContent>
            </Card>

            {activeTab === "market" && (
              <Tile className="w-full">
                <TileHeader>
                  <TileTitle>Rental income</TileTitle>
                </TileHeader>
                <TileContent
                  className={cn("flex flex-col gap-[var(--spacing-xl)]")}
                >
                  <div
                    className={cn("gap-[var(--spacing-xl)]")}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                    }}
                  >
                    <ValueCard
                      label="Total annual income"
                      value="487.200"
                      metric="DKK"
                      valueIcon={null}
                    />
                    <ValueCard
                      label="Net rent"
                      value="386.417"
                      metric="DKK"
                      valueIcon={null}
                    />
                    <ValueCard
                      label="Rent per M²"
                      value="1.450"
                      metric="DKK"
                      valueIcon={null}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "var(--spacing-sm)",
                      alignItems: "center",
                      padding: "var(--spacing-sm)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-base)",
                      backgroundColor: "var(--color-card)",
                    }}
                  >
                    <Input
                      variant="default"
                      size="default"
                      fontVariant="sans"
                      placeholder="Search..."
                      leadingIcon={<Icon name="Search" size="md" />}
                      className="min-w-0 flex-1"
                    />
                    <Button variant="outline" size="md" iconLeft={<Icon name="Columns" size="md" />}>
                      COLUMNS
                    </Button>
                  </div>

                  <TooltipProvider>
                    <div className="overflow-x-auto rounded-lg bg-[var(--color-card)]">
                      <table className="data-table w-full min-w-[560px] border-collapse table-fixed">
                        <colgroup>
                          <col style={{ width: "auto" }} />
                          <col style={{ width: "120px" }} />
                          <col style={{ width: "auto" }} />
                          <col style={{ width: "auto" }} />
                          <col style={{ width: "auto" }} />
                        </colgroup>
                        <thead>
                          <tr>
                            <TableHeader
                              theme="light"
                              label="Unit address"
                              tooltipContent="Unit or property address."
                              sortDirection={rentalSortColumn === "unit" ? rentalSortDirection : "none"}
                              ariaSort={rentalSortColumn === "unit" ? (rentalSortDirection === "asc" ? "ascending" : "descending") : undefined}
                              onClick={() => handleRentalSort("unit")}
                              className="cursor-pointer"
                            />
                            <TableHeader
                              theme="light"
                              label="M²"
                              tooltipContent="Square meters."
                              sortDirection={rentalSortColumn === "m2" ? rentalSortDirection : "none"}
                              ariaSort={rentalSortColumn === "m2" ? (rentalSortDirection === "asc" ? "ascending" : "descending") : undefined}
                              onClick={() => handleRentalSort("m2")}
                              align="right"
                              className="cursor-pointer"
                            />
                            <TableHeader
                              theme="light"
                              label="Monthly rent"
                              tooltipContent="Rent per month."
                              sortDirection={rentalSortColumn === "monthly" ? rentalSortDirection : "none"}
                              ariaSort={rentalSortColumn === "monthly" ? (rentalSortDirection === "asc" ? "ascending" : "descending") : undefined}
                              onClick={() => handleRentalSort("monthly")}
                              align="right"
                              className="cursor-pointer"
                            />
                            <TableHeader
                              theme="light"
                              label="Annual rent"
                              tooltipContent="Rent per year."
                              sortDirection={rentalSortColumn === "annual" ? rentalSortDirection : "none"}
                              ariaSort={rentalSortColumn === "annual" ? (rentalSortDirection === "asc" ? "ascending" : "descending") : undefined}
                              onClick={() => handleRentalSort("annual")}
                              align="right"
                              className="cursor-pointer"
                            />
                            <TableHeader
                              theme="light"
                              label="Rent per m²"
                              tooltipContent="Rent per square meter."
                              sortDirection={rentalSortColumn === "perM2" ? rentalSortDirection : "none"}
                              ariaSort={rentalSortColumn === "perM2" ? (rentalSortDirection === "asc" ? "ascending" : "descending") : undefined}
                              onClick={() => handleRentalSort("perM2")}
                              align="right"
                              className="cursor-pointer"
                            />
                          </tr>
                        </thead>
                        <tbody>
                          {sortedRentalRows.map((row) => (
                            <TableRow key={row.unit} className="border-b-inset">
                              <TableCell align="left">{row.unit}</TableCell>
                              <TableCell align="right">{row.m2}</TableCell>
                              <TableCell suffix=" DKK" align="right">
                                {row.monthly}
                              </TableCell>
                              <TableCell suffix=" DKK" align="right">
                                {row.annual}
                              </TableCell>
                              <TableCell suffix=" DKK" align="right">
                                {row.perM2}
                              </TableCell>
                            </TableRow>
                          ))}
                        </tbody>
                        <tfoot>
                          <TableRow rowVariant="summary">
                            <TableCell align="left">Total</TableCell>
                            <TableCell align="right">336</TableCell>
                            <TableCell suffix=" DKK" align="right">
                              40.600
                            </TableCell>
                            <TableCell suffix=" DKK" align="right">
                              487.200
                            </TableCell>
                            <TableCell suffix=" DKK" align="right">
                              AVG. 1.450
                            </TableCell>
                          </TableRow>
                        </tfoot>
                      </table>
                    </div>
                  </TooltipProvider>
                </TileContent>
              </Tile>
            )}

            {activeTab === "comparison" && (
            <div
              style={{
                display: "flex",
                width: "100%",
                gap: "var(--spacing-2xl)",
              }}
            >
              <Tile className="w-full">
                <TileHeader>
                  <TileTitle>Under offer</TileTitle>
                </TileHeader>
                <TileContent
                  className={cn("flex flex-col gap-[var(--spacing-xl)]")}
                >
                  <PropertyCard
                    address="Smallegade 42, 2000 Frederiksberg"
                    propertyType="Residential"
                    statusLabel="Under offer"
                    price="6.250.000"
                    currency="DKK"
                    priceChangePercent={2}
                    unitPrice="63.800 DKK / M²"
                  />
                  <PropertyCard
                    address="Amagerbrogade 102, 2300 Amager"
                    propertyType="Residential"
                    statusLabel="Under offer"
                    price="5.350.000"
                    currency="DKK"
                    priceChangePercent={-3}
                    unitPrice="56.900 DKK / M²"
                  />
                  <PropertyCard
                    address="Nørdre Fasanvej 112, 2000 Frederiksberg"
                    propertyType="Residential"
                    statusLabel="Under offer"
                    price="5.875.000"
                    currency="DKK"
                    priceChangePercent={-1}
                    unitPrice="61.400 DKK / M²"
                  />
                </TileContent>
              </Tile>
              <Tile className="w-full">
                <TileHeader>
                  <TileTitle>Sold</TileTitle>
                </TileHeader>
                <TileContent
                  className={cn("flex flex-col gap-[var(--spacing-xl)]")}
                >
                  <PropertyCard
                    address="Istedgade 143, 1650 Vesterbro"
                    propertyType="Residential"
                    statusLabel="Sold"
                    price="5.920.000"
                    currency="DKK"
                    priceChangePercent={3}
                    unitPrice="54.500 DKK / M²"
                  />
                  <PropertyCard
                    address="Bækkehusvej 12, 2000 Frederiksberg"
                    propertyType="Residential"
                    statusLabel="Sold"
                    price="5.420.000"
                    currency="DKK"
                    priceChangePercent={8}
                    unitPrice="68.208 DKK / M²"
                  />
                  <PropertyCard
                    address="Howitzvej 19, 2000 Frederiksberg"
                    propertyType="Residential"
                    statusLabel="Sold"
                    price="5.590.000"
                    currency="DKK"
                    priceChangePercent={4}
                    unitPrice="59.208 DKK / M²"
                  />
                </TileContent>
              </Tile>
            </div>
            )}
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

FinancialComparisonPage.displayName = "FinancialComparisonPage";
