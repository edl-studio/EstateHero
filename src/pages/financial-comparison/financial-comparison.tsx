import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tile, TileHeader, TileHeaderActions, TileTitle, TileContent } from "@/components/ui/tile";
import { ValueCard } from "@/components/ui/value-card";
import { Input, InputTrailingActions } from "@/components/ui/input";
import { TableHeader } from "@/components/ui/table-header";
import { TableRow } from "@/components/ui/table-row";
import { TableCell } from "@/components/ui/table-cell";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PropertyCard } from "@/components/ui/property-card";
import { GlobalHeader } from "@/components/ui/global-header";
import { PropertyHeader } from "@/components/ui/property-header";
import { MetadataItem } from "@/components/ui/metadata-item";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { InlineMessage } from "@/components/ui/inline-message";
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
import { Select as BaseSelect } from "@base-ui-components/react/select";

import { cn } from "@/lib/utils";
import { usePropertyNavigation } from "@/lib/use-property-navigation";
import { useIsMobile } from "@/lib/use-media-query";
import { BottomSheet } from "@/components/ui/bottom-sheet";

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
  const [simulationYield, setSimulationYield] = React.useState("5");
  const [operatingExpensesTotal, setOperatingExpensesTotal] = React.useState("100.783");

  const isMobile = useIsMobile();
  type MobileInputSheetContext =
    | "operatingExpensesTotal"
    | "simulationYield"
    | { type: "calculatedRental"; unit: string; field: "monthly" | "annual" | "perM2" }
    | null;
  const [mobileInputSheetOpen, setMobileInputSheetOpen] = React.useState(false);
  const [mobileInputSheetContext, setMobileInputSheetContext] =
    React.useState<MobileInputSheetContext>(null);
  const isClosingSheetRef = React.useRef(false);

  const openMobileInputSheet = React.useCallback(
    (context: MobileInputSheetContext) => {
      if (!isMobile) return;
      if (isClosingSheetRef.current) {
        isClosingSheetRef.current = false;
        return;
      }
      setMobileInputSheetContext(context);
      setMobileInputSheetOpen(true);
    },
    [isMobile]
  );

  const closeMobileInputSheet = React.useCallback(() => {
    isClosingSheetRef.current = true;
    setMobileInputSheetOpen(false);
  }, []);

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

  const [calculatedRentalValues, setCalculatedRentalValues] = React.useState<
    Record<string, { monthly: string; annual: string; perM2: string }>
  >(() => {
    const init: Record<string, { monthly: string; annual: string; perM2: string }> = {};
    rentalTableRows.forEach((r) => {
      init[r.unit] = { monthly: r.monthly, annual: r.annual, perM2: r.perM2 };
    });
    return init;
  });

  const updateCalculatedRental = (
    unit: string,
    field: "monthly" | "annual" | "perM2",
    value: string
  ) => {
    setCalculatedRentalValues((prev) => ({
      ...prev,
      [unit]: { ...prev[unit], [field]: value },
    }));
  };

  const clearCalculatedRentalField = (unit: string, field: "monthly" | "annual" | "perM2") => {
    setCalculatedRentalValues((prev) => ({
      ...prev,
      [unit]: { ...prev[unit], [field]: "" },
    }));
  };

  const operatingExpensesRows = React.useMemo(
    () => [
      { type: "Property tax & charges", total: "19.783", perM2: "59" },
      { type: "Renovation", total: "15.000", perM2: "45" },
      { type: "Shared electricity", total: "12.000", perM2: "36" },
      { type: "Insurance", total: "8.500", perM2: "25" },
      { type: "Administration (2.500 per tenancy)", total: "9.200", perM2: "27" },
      { type: "Cleaning & maintenance", total: "11.300", perM2: "34" },
      { type: "Landscaping", total: "10.000", perM2: "30" },
      { type: "Other", total: "15.000", perM2: "44" },
    ],
    []
  );

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
  const { navigateBack } = usePropertyNavigation(propertyId);

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
    <div
      className={cn(
        "flex min-h-screen min-w-0 max-w-full flex-col items-center overflow-x-hidden bg-[var(--color-surface)]",
        className
      )}
    >
      <section className="flex min-w-0 w-full max-w-full flex-col items-center overflow-x-hidden mb-[var(--spacing-xl)]">
        <GlobalHeader
          variant="search"
          avatarSrc="https://i.pravatar.cc/150?img=12"
          avatarAlt="User"
          avatarFallback="JD"
          searchPlaceholder="SEARCH PROPERTIES"
          onSearchClick={() => setIsSearchModalOpen(true)}
          onLogoClick={navigateBack}
          onBackClick={navigateBack}
          mobileCenterTitle="Financial Comparison"
          onDownloadClick={() => {}}
        />

        <div className="hidden min-w-0 w-full max-w-full px-4 pt-5 pb-4 md:flex md:flex-col md:items-center md:px-0 md:pt-5 md:pb-4">
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
                <Button variant="outline" iconLeft={<Icon name="Share2" />} data-hide-on-mobile>
                  Share
                </Button>
                <Button variant="primary" iconLeft={<Icon name="Download" />}>
                  Export
                </Button>
              </>
            }
          />
        </div>
      </section>

      <section className="flex min-w-0 w-full max-w-full justify-center overflow-x-hidden pt-0 pb-[var(--spacing-6xl)]">
        <div className="flex min-w-0 w-full max-w-full flex-col items-start gap-[var(--spacing-lg)] px-4 md:max-w-[1312px] md:px-0">
          <div className="hidden flex-wrap gap-[var(--spacing-sm)] md:flex">
              <TabItem
                isActive={false}
                onClick={() => navigate(`/property/${propertyId}`)}
              >
                Property Details
              </TabItem>
              <TabItem isActive>Financial Comparison</TabItem>
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
              <TabItem isActive={false} onClick={() => navigate(`/property/${propertyId}/neighborhood`)}>
                Neighborhood
              </TabItem>
            </div>

            {/* Mobile: tab selector as dropdown (Figma 712-26439); desktop: tabs stay in card header */}
            <div className="w-full md:hidden">
            <BaseSelect.Root
              value={activeTab}
              onValueChange={(v: string | null) => v != null && setActiveTab(v)}
              items={[
                { value: "comparison", label: "Comparison" },
                { value: "market", label: "Market" },
                { value: "calculated", label: "Calculated" },
                { value: "simulation", label: "Simulation" },
              ]}
            >
              <BaseSelect.Trigger
                aria-label="Financial comparison view"
                className={cn(
                  "flex h-10 w-full items-center justify-between gap-2 self-stretch",
                  "rounded-[8px] border border-[#D5D7DA] bg-white py-2 pl-[14px] pr-[14px]",
                  "text-[length:var(--text-sm)] font-[var(--font-normal)] leading-[var(--leading-tight)] text-[var(--color-content-primary)]",
                  "shadow-[0_1px_2px_0_rgba(10,13,18,0.05)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]"
                )}
              >
                <BaseSelect.Value />
                <BaseSelect.Icon>
                  <Icon name="ChevronDown" size="md" className="shrink-0 text-[var(--color-content-secondary)]" />
                </BaseSelect.Icon>
              </BaseSelect.Trigger>
              <BaseSelect.Portal>
                <BaseSelect.Positioner className="left-4 right-4 w-[calc(100vw-32px)]">
                  <BaseSelect.Popup
                    className={cn(
                      "z-50 w-full overflow-hidden rounded-[8px] border border-[#D5D7DA] bg-white py-1",
                      "shadow-[0_1px_2px_0_rgba(10,13,18,0.05)]"
                    )}
                  >
                    <BaseSelect.List className="max-h-[min(var(--popup-available-height,_300px),300px)] overflow-y-auto p-0">
                      <BaseSelect.Item
                        value="comparison"
                        className={cn(
                          "flex cursor-pointer items-center px-[14px] py-2 text-[length:var(--text-sm)] text-[var(--color-content-primary)]",
                          "data-[highlighted]:bg-[var(--color-control-hover)]"
                        )}
                      >
                        Comparison
                      </BaseSelect.Item>
                      <BaseSelect.Item
                        value="market"
                        className={cn(
                          "flex cursor-pointer items-center px-[14px] py-2 text-[length:var(--text-sm)] text-[var(--color-content-primary)]",
                          "data-[highlighted]:bg-[var(--color-control-hover)]"
                        )}
                      >
                        Market
                      </BaseSelect.Item>
                      <BaseSelect.Item
                        value="calculated"
                        className={cn(
                          "flex cursor-pointer items-center px-[14px] py-2 text-[length:var(--text-sm)] text-[var(--color-content-primary)]",
                          "data-[highlighted]:bg-[var(--color-control-hover)]"
                        )}
                      >
                        Calculated
                      </BaseSelect.Item>
                      <BaseSelect.Item
                        value="simulation"
                        className={cn(
                          "flex cursor-pointer items-center px-[14px] py-2 text-[length:var(--text-sm)] text-[var(--color-content-primary)]",
                          "data-[highlighted]:bg-[var(--color-control-hover)]"
                        )}
                      >
                        Simulation
                      </BaseSelect.Item>
                    </BaseSelect.List>
                  </BaseSelect.Popup>
                </BaseSelect.Positioner>
              </BaseSelect.Portal>
            </BaseSelect.Root>
            </div>

            <Card className="w-full">
              <div className="hidden md:block">
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
              </div>
              <CardContent className="p-2 md:!p-5">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsPanel value="comparison" className="mt-0">
                    <TablePage />
                  </TabsPanel>
                  <TabsPanel value="market" className="mt-0">
                    <div className={cn("flex flex-col gap-[var(--spacing-xl)] p-2 md:p-0")}>
                      <TileHeader>
                        <TileTitle>Valuation summary</TileTitle>
                      </TileHeader>
                      <div className="grid grid-cols-1 gap-[18px] md:grid-cols-4">
                        <ValueCard
                          label="Calculated value"
                          labelTooltip="AI-estimated or calculated property value."
                          value="5.080.421"
                          metric="DKK"
                          valueIcon={<Icon name="Sparkles" size="lg" />}
                        />
                        <ValueCard
                          label="Yield"
                          labelTooltip="Yield percentage."
                          value="5"
                          metric="%"
                          valueIcon={null}
                        />
                        <ValueCard
                          label="Value per M²"
                          labelTooltip="Property value per square meter."
                          value="336"
                          metric="M²"
                          valueIcon={null}
                        />
                        <ValueCard
                          label="Price per M²"
                          labelTooltip="Price per square meter."
                          value="23.000"
                          metric="DKK"
                          valueIcon={null}
                        />
                      </div>
                      <div className="w-full md:hidden">
                        <Button variant="primary" size="md" className="w-full">
                          View details
                        </Button>
                      </div>
                    </div>
                  </TabsPanel>
                  <TabsPanel value="calculated" className="mt-0">
                    <div className={cn("flex flex-col gap-[var(--spacing-xl)] p-2 md:p-0")}>
                      <TileHeader>
                        <TileTitle>Valuation summary</TileTitle>
                      </TileHeader>
                      <div className="grid grid-cols-1 gap-[18px] md:grid-cols-4">
                        <ValueCard
                          label="Calculated value"
                          labelTooltip="AI-estimated or calculated property value."
                          value="5.080.421"
                          metric="DKK"
                          valueIcon={<Icon name="Sparkles" size="lg" />}
                        />
                        <ValueCard
                          label="Yield"
                          labelTooltip="Yield percentage."
                          value="5"
                          metric="%"
                          valueIcon={null}
                        />
                        <ValueCard
                          label="Value per M²"
                          labelTooltip="Property value per square meter."
                          value="336"
                          metric="M²"
                          valueIcon={null}
                        />
                        <ValueCard
                          label="Price per M²"
                          labelTooltip="Price per square meter."
                          value="23.000"
                          metric="DKK"
                          valueIcon={null}
                        />
                      </div>
                      <div className="w-full md:hidden">
                        <Button variant="primary" size="md" className="w-full">
                          View details
                        </Button>
                      </div>
                    </div>
                  </TabsPanel>
                  <TabsPanel value="simulation" className="mt-0">
                    <div className={cn("flex flex-col gap-[var(--spacing-xl)] p-2 md:p-0")}>
                      <TileHeader>
                        <TileTitle>Valuation summary</TileTitle>
                      </TileHeader>
                      <div className="grid grid-cols-1 gap-[18px] md:grid-cols-4">
                        <ValueCard
                          label="Calculated value"
                          labelTooltip="AI-estimated or calculated property value."
                          value="5.080.421"
                          metric="DKK"
                          valueIcon={<Icon name="Sparkles" size="lg" />}
                        />
                        <ValueCard
                          variant="editable"
                          label="Yield"
                          labelTooltip="Yield percentage. Edit to simulate."
                          value={simulationYield}
                          metric="%"
                          valueIcon={null}
                          onInputChange={(e) => setSimulationYield(e.target.value)}
                          onInputConfirmKeyDown={() => {}}
                          onInputClearKeyDown={() => setSimulationYield("")}
                          onInputFocus={
                            isMobile ? () => openMobileInputSheet("simulationYield") : undefined
                          }
                          inputTrailingSlot={
                            <InputTrailingActions
                              onClear={() => setSimulationYield("")}
                              onConfirm={() => {}}
                              confirmShortcut
                              ariaLabelClear="Clear"
                              ariaLabelConfirm="Confirm"
                            />
                          }
                        />
                        <ValueCard
                          label="Value per M²"
                          labelTooltip="Property value per square meter."
                          value="336"
                          metric="M²"
                          valueIcon={null}
                        />
                        <ValueCard
                          label="Price per M²"
                          labelTooltip="Price per square meter."
                          value="23.000"
                          metric="DKK"
                          valueIcon={null}
                        />
                      </div>
                      <div className="w-full md:hidden">
                        <Button variant="primary" size="md" className="w-full">
                          View details
                        </Button>
                      </div>
                    </div>
                  </TabsPanel>
                </Tabs>
              </CardContent>
            </Card>

            {(activeTab === "market" || activeTab === "calculated" || activeTab === "simulation") && (
              <>
              <Tile className="w-full">
                <TileHeader>
                  <TileTitle>Rental income</TileTitle>
                  {activeTab === "calculated" && (
                    <TileHeaderActions>
                      <Button variant="inline" size="md" iconLeft={<Icon name="Upload" size="md" />}>
                        Upload Rent roll
                      </Button>
                    </TileHeaderActions>
                  )}
                  {activeTab === "simulation" && (
                    <TileHeaderActions>
                      <Button variant="inline" size="md" iconLeft={<Icon name="Plus" size="md" />}>
                        Add rental
                      </Button>
                    </TileHeaderActions>
                  )}
                </TileHeader>
                <TileContent
                  className={cn("flex flex-col gap-[var(--spacing-xl)]")}
                >
                  <div className="grid grid-cols-1 gap-[18px] md:grid-cols-4">
                    <ValueCard
                      label="Total annual income"
                      labelTooltip="Total rental income per year."
                      value="487.200"
                      metric="DKK"
                      valueIcon={null}
                    />
                    <ValueCard
                      label="Net rent"
                      labelTooltip="Net rent after deductions."
                      value="386.417"
                      metric="DKK"
                      valueIcon={null}
                    />
                    <ValueCard
                      label="Rent per M²"
                      labelTooltip="Rent per square meter."
                      value="1.450"
                      metric="DKK"
                      valueIcon={null}
                    />
                  </div>

                  <div className="w-full md:hidden">
                    <Button variant="primary" size="md" className="w-full">
                      View details
                    </Button>
                  </div>

                  {activeTab === "calculated" && (
                    <InlineMessage
                      variant="warning"
                      title="2 Issues detected in the table"
                    >
                      Please review the highlighted entries for potential discrepancies or necessary updates.
                    </InlineMessage>
                  )}
                  {activeTab === "market" && (
                    <div
                      className="hidden w-full items-center justify-between gap-[var(--spacing-sm)] md:flex"
                    >
                      <div style={{ width: "340px" }} className="min-w-0 shrink-0">
                        <Input
                          variant="default"
                          size="default"
                          fontVariant="sans"
                          placeholder="Search..."
                          leadingIcon={<Icon name="Search" size="md" />}
                          className="w-full"
                        />
                      </div>
                      <Button variant="outline" size="md" iconLeft={<Icon name="Columns" size="md" />}>
                        COLUMNS
                      </Button>
                    </div>
                  )}

                  <div className="hidden md:block">
                  <TooltipProvider>
                    <div className="overflow-x-auto rounded-lg bg-[var(--color-card)]">
                      <table className="data-table w-full min-w-[560px] border-collapse table-fixed">
                        <colgroup>
                          <col style={{ width: "auto" }} />
                          <col style={{ width: "120px" }} />
                          <col style={{ width: "auto" }} />
                          <col style={{ width: "auto" }} />
                          <col style={{ width: "auto" }} />
                          {activeTab === "calculated" && (
                            <col style={{ width: "120px" }} />
                          )}
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
                            {activeTab === "calculated" && (
                              <TableHeader
                                theme="light"
                                label="ACTIONS"
                                align="right"
                                className="w-[120px]"
                              />
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {sortedRentalRows.map((row) => {
                            const values = calculatedRentalValues[row.unit] ?? {
                              monthly: row.monthly,
                              annual: row.annual,
                              perM2: row.perM2,
                            };
                            return (
                              <TableRow key={row.unit} className="border-b-inset">
                                <TableCell align="left">{row.unit}</TableCell>
                                <TableCell align="right">{row.m2}</TableCell>
                                {activeTab === "calculated" ? (
                                  <>
                                    <TableCell contentWidth="full" align="right">
                                      <Input
                                        align="right"
                                        value={values.monthly}
                                        onChange={(e) =>
                                          updateCalculatedRental(row.unit, "monthly", e.target.value)
                                        }
                                        onMobileOpenSheet={
                                          isMobile
                                            ? () =>
                                                openMobileInputSheet({
                                                  type: "calculatedRental",
                                                  unit: row.unit,
                                                  field: "monthly",
                                                })
                                            : undefined
                                        }
                                        onConfirmKeyDown={() => {}}
                                        onClearKeyDown={() =>
                                          clearCalculatedRentalField(row.unit, "monthly")
                                        }
                                        metric=" DKK"
                                        trailingSlot={
                                          <InputTrailingActions
                                            onClear={() =>
                                              clearCalculatedRentalField(row.unit, "monthly")
                                            }
                                            onConfirm={() => {}}
                                            confirmShortcut
                                            ariaLabelClear="Clear"
                                            ariaLabelConfirm="Confirm"
                                          />
                                        }
                                      />
                                    </TableCell>
                                    <TableCell contentWidth="full" align="right">
                                      <Input
                                        align="right"
                                        value={values.annual}
                                        onChange={(e) =>
                                          updateCalculatedRental(row.unit, "annual", e.target.value)
                                        }
                                        onMobileOpenSheet={
                                          isMobile
                                            ? () =>
                                                openMobileInputSheet({
                                                  type: "calculatedRental",
                                                  unit: row.unit,
                                                  field: "annual",
                                                })
                                            : undefined
                                        }
                                        onConfirmKeyDown={() => {}}
                                        onClearKeyDown={() =>
                                          clearCalculatedRentalField(row.unit, "annual")
                                        }
                                        metric=" DKK"
                                        trailingSlot={
                                          <InputTrailingActions
                                            onClear={() =>
                                              clearCalculatedRentalField(row.unit, "annual")
                                            }
                                            onConfirm={() => {}}
                                            confirmShortcut
                                            ariaLabelClear="Clear"
                                            ariaLabelConfirm="Confirm"
                                          />
                                        }
                                      />
                                    </TableCell>
                                    <TableCell contentWidth="full" align="right">
                                      <Input
                                        align="right"
                                        value={values.perM2}
                                        onChange={(e) =>
                                          updateCalculatedRental(row.unit, "perM2", e.target.value)
                                        }
                                        onMobileOpenSheet={
                                          isMobile
                                            ? () =>
                                                openMobileInputSheet({
                                                  type: "calculatedRental",
                                                  unit: row.unit,
                                                  field: "perM2",
                                                })
                                            : undefined
                                        }
                                        onConfirmKeyDown={() => {}}
                                        onClearKeyDown={() =>
                                          clearCalculatedRentalField(row.unit, "perM2")
                                        }
                                        metric=" DKK"
                                        trailingSlot={
                                          <InputTrailingActions
                                            onClear={() =>
                                              clearCalculatedRentalField(row.unit, "perM2")
                                            }
                                            onConfirm={() => {}}
                                            confirmShortcut
                                            ariaLabelClear="Clear"
                                            ariaLabelConfirm="Confirm"
                                          />
                                        }
                                      />
                                    </TableCell>
                                  </>
                                ) : (
                                  <>
                                    <TableCell suffix=" DKK" align="right">
                                      {row.monthly}
                                    </TableCell>
                                    <TableCell suffix=" DKK" align="right">
                                      {row.annual}
                                    </TableCell>
                                    <TableCell suffix=" DKK" align="right">
                                      {row.perM2}
                                    </TableCell>
                                  </>
                                )}
                                {activeTab === "calculated" && (
                                  <TableCell align="right">
                                    <Button variant="inline" className="ml-auto">
                                      VIEW
                                    </Button>
                                  </TableCell>
                                )}
                              </TableRow>
                            );
                          })}
                        </tbody>
                        <tfoot>
                          <TableRow rowVariant="summary">
                            <TableCell align="left" contentVariant="label">Total</TableCell>
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
                            {activeTab === "calculated" && <TableCell />}
                          </TableRow>
                        </tfoot>
                      </table>
                    </div>
                  </TooltipProvider>
                  </div>
                </TileContent>
              </Tile>

              <Tile className="w-full">
                <TileHeader>
                  <TileTitle>Operating expenses</TileTitle>
                  <div className="hidden md:block">
                    <TileHeaderActions>
                      <Button variant="inline" size="md" iconLeft={<Icon name="RotateCw" size="md" />}>
                        RESET
                      </Button>
                      <Button variant="inline" size="md" iconLeft={<Icon name="Plus" size="md" />}>
                        Add expenses
                      </Button>
                    </TileHeaderActions>
                  </div>
                </TileHeader>
                <TileContent
                  className={cn("flex flex-col gap-[var(--spacing-xl)]")}
                >
                  <div className="grid grid-cols-1 gap-[18px] md:grid-cols-4">
                    <ValueCard
                      variant="editable"
                      label="Total annual expenses"
                      labelTooltip="Total operating expenses per year."
                      value={operatingExpensesTotal}
                      metric="DKK"
                      valueIcon={null}
                      onInputChange={(e) => setOperatingExpensesTotal(e.target.value)}
                      onInputConfirmKeyDown={() => {}}
                      onInputClearKeyDown={() => setOperatingExpensesTotal("")}
                      onInputFocus={
                        isMobile ? () => openMobileInputSheet("operatingExpensesTotal") : undefined
                      }
                      inputTrailingSlot={
                        <InputTrailingActions
                          onClear={() => setOperatingExpensesTotal("")}
                          onConfirm={() => {}}
                          confirmShortcut
                          ariaLabelClear="Clear"
                          ariaLabelConfirm="Confirm"
                        />
                      }
                    />
                    <ValueCard
                      label="Operating costs per M²"
                      labelTooltip="Operating costs per square meter."
                      value="300"
                      metric="DKK"
                      valueIcon={null}
                    />
                  </div>

                  <div className="w-full md:hidden">
                    <Button variant="primary" size="md" className="w-full">
                      View details
                    </Button>
                  </div>

                  {activeTab !== "simulation" && (
                    <div className="hidden w-full items-center md:flex">
                      <div style={{ width: "340px" }} className="min-w-0 shrink-0">
                        <Input
                          variant="default"
                          size="default"
                          fontVariant="sans"
                          placeholder="Search..."
                          leadingIcon={<Icon name="Search" size="md" />}
                          className="w-full"
                        />
                      </div>
                    </div>
                  )}

                  <div className="hidden md:block">
                  <TooltipProvider>
                    <div className="overflow-x-auto rounded-lg bg-[var(--color-card)]">
                      <table className="data-table w-full min-w-[560px] border-collapse table-fixed">
                        <colgroup>
                          <col style={{ width: "auto" }} />
                          <col style={{ width: "auto" }} />
                          <col style={{ width: "auto" }} />
                          <col style={{ width: "120px" }} />
                        </colgroup>
                        <thead>
                          <tr>
                            <TableHeader
                              theme="light"
                              label="Expenses type"
                              tooltipContent="Type of operating expense."
                            />
                            <TableHeader
                              theme="light"
                              label="Total expenses"
                              tooltipContent="Total amount in DKK."
                              align="right"
                            />
                            <TableHeader
                              theme="light"
                              label="Expenses per M²"
                              tooltipContent="Cost per square meter."
                              align="right"
                            />
                            <TableHeader
                              theme="light"
                              label="ACTIONS"
                              align="right"
                              className="w-[120px]"
                            />
                          </tr>
                        </thead>
                        <tbody>
                          {operatingExpensesRows.map((row) => (
                            <TableRow key={row.type} className="border-b-inset">
                              <TableCell align="left">{row.type}</TableCell>
                              <TableCell suffix=" DKK" align="right">
                                {row.total}
                              </TableCell>
                              <TableCell suffix=" DKK" align="right">
                                {row.perM2}
                              </TableCell>
                              <TableCell align="right">
                                <Button variant="inline" onClick={() => {}}>
                                  NOTES (1)
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </tbody>
                        <tfoot>
                          <TableRow rowVariant="summary">
                            <TableCell align="left" contentVariant="label">
                              Total
                            </TableCell>
                            <TableCell suffix=" DKK" align="right">
                              100.783
                            </TableCell>
                            <TableCell suffix=" DKK" align="right">
                              300
                            </TableCell>
                            <TableCell align="right" />
                          </TableRow>
                        </tfoot>
                      </table>
                    </div>
                  </TooltipProvider>
                  </div>
                </TileContent>
              </Tile>
              </>
            )}

            {activeTab === "comparison" && (
            <div className="flex w-full flex-col gap-[var(--spacing-2xl)] md:flex-row">
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
                    statusLabelTooltip="A buyer has made an offer and negotiations are ongoing. The property is not yet sold."
                    price="6.250.000"
                    currency="DKK"
                    priceChangePercent={2}
                    unitPrice="63.800 DKK / M²"
                  />
                  <PropertyCard
                    address="Amagerbrogade 102, 2300 Amager"
                    propertyType="Residential"
                    statusLabel="Under offer"
                    statusLabelTooltip="A buyer has made an offer and negotiations are ongoing. The property is not yet sold."
                    price="5.350.000"
                    currency="DKK"
                    priceChangePercent={-3}
                    unitPrice="56.900 DKK / M²"
                  />
                  <PropertyCard
                    address="Nørdre Fasanvej 112, 2000 Frederiksberg"
                    propertyType="Residential"
                    statusLabel="Under offer"
                    statusLabelTooltip="A buyer has made an offer and negotiations are ongoing. The property is not yet sold."
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
                    statusLabelTooltip="The transaction has been completed and ownership has been transferred to the buyer."
                    price="5.920.000"
                    currency="DKK"
                    priceChangePercent={3}
                    unitPrice="54.500 DKK / M²"
                  />
                  <PropertyCard
                    address="Bækkehusvej 12, 2000 Frederiksberg"
                    propertyType="Residential"
                    statusLabel="Sold"
                    statusLabelTooltip="The transaction has been completed and ownership has been transferred to the buyer."
                    price="5.420.000"
                    currency="DKK"
                    priceChangePercent={8}
                    unitPrice="68.208 DKK / M²"
                  />
                  <PropertyCard
                    address="Howitzvej 19, 2000 Frederiksberg"
                    propertyType="Residential"
                    statusLabel="Sold"
                    statusLabelTooltip="The transaction has been completed and ownership has been transferred to the buyer."
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

      {isMobile && (
        <BottomSheet
          open={mobileInputSheetOpen}
          onOpenChange={(open) => {
            if (!open) isClosingSheetRef.current = true;
            setMobileInputSheetOpen(open);
            if (!open) {
              setMobileInputSheetContext(null);
              setTimeout(() => (document.activeElement as HTMLElement)?.blur?.(), 0);
            }
          }}
          heading={
            mobileInputSheetContext === "operatingExpensesTotal"
              ? "Total annual expenses"
              : mobileInputSheetContext === "simulationYield"
                ? "Yield"
                : mobileInputSheetContext &&
                    typeof mobileInputSheetContext === "object" &&
                    mobileInputSheetContext.type === "calculatedRental"
                  ? `${mobileInputSheetContext.field === "monthly" ? "Monthly rent" : mobileInputSheetContext.field === "annual" ? "Annual rent" : "Rent per M²"} · ${mobileInputSheetContext.unit}`
                  : "Edit value"
          }
          subheading={
            mobileInputSheetContext === "operatingExpensesTotal"
              ? "Total operating expenses per year."
              : mobileInputSheetContext === "simulationYield"
                ? "Yield percentage. Edit to simulate."
                : mobileInputSheetContext &&
                    typeof mobileInputSheetContext === "object" &&
                    mobileInputSheetContext.type === "calculatedRental"
                  ? mobileInputSheetContext.unit
                  : undefined
          }
          headerActions={
            <Button
              type="button"
              variant="ghost"
              size="sm"
              iconLeft={<Icon name="X" />}
              onClick={closeMobileInputSheet}
              aria-label="Close"
            />
          }
        >
          {mobileInputSheetContext === "operatingExpensesTotal" && (
            <div className="w-full">
              <Input
                type="text"
                variant="default"
                size="default"
                fontVariant="mono"
                value={operatingExpensesTotal}
                onChange={(e) => setOperatingExpensesTotal(e.target.value)}
                metric="DKK"
                autoFocus
                trailingSlot={
                  <InputTrailingActions
                    onClear={() => setOperatingExpensesTotal("")}
                    onConfirm={closeMobileInputSheet}
                    confirmShortcut
                    ariaLabelClear="Clear"
                    ariaLabelConfirm="Confirm"
                  />
                }
                onConfirmKeyDown={closeMobileInputSheet}
                onClearKeyDown={() => setOperatingExpensesTotal("")}
                className="w-full"
                containerClassName="w-full"
              />
            </div>
          )}

          {mobileInputSheetContext === "simulationYield" && (
            <div className="w-full">
              <Input
                type="text"
                variant="default"
                size="default"
                fontVariant="mono"
                value={simulationYield}
                onChange={(e) => setSimulationYield(e.target.value)}
                metric="%"
                autoFocus
                trailingSlot={
                  <InputTrailingActions
                    onClear={() => setSimulationYield("")}
                    onConfirm={closeMobileInputSheet}
                    confirmShortcut
                    ariaLabelClear="Clear"
                    ariaLabelConfirm="Confirm"
                  />
                }
                onConfirmKeyDown={closeMobileInputSheet}
                onClearKeyDown={() => setSimulationYield("")}
                className="w-full"
                containerClassName="w-full"
              />
            </div>
          )}

          {mobileInputSheetContext &&
            typeof mobileInputSheetContext === "object" &&
            mobileInputSheetContext.type === "calculatedRental" && (
              <div className="w-full">
                <Input
                  type="text"
                  variant="default"
                  size="default"
                  fontVariant="mono"
                  align="right"
                  value={
                    (() => {
                      const row = rentalTableRows.find(
                        (r) => r.unit === mobileInputSheetContext.unit
                      );
                      const values =
                        calculatedRentalValues[mobileInputSheetContext.unit] ??
                        (row
                          ? {
                              monthly: row.monthly,
                              annual: row.annual,
                              perM2: row.perM2,
                            }
                          : { monthly: "", annual: "", perM2: "" });
                      return values[mobileInputSheetContext.field];
                    })()
                  }
                  onChange={(e) =>
                    updateCalculatedRental(
                      mobileInputSheetContext.unit,
                      mobileInputSheetContext.field,
                      e.target.value
                    )
                  }
                  metric=" DKK"
                  autoFocus
                  trailingSlot={
                      <InputTrailingActions
                        onClear={() =>
                          clearCalculatedRentalField(
                            mobileInputSheetContext.unit,
                            mobileInputSheetContext.field
                          )
                        }
                      onConfirm={closeMobileInputSheet}
                      confirmShortcut
                      ariaLabelClear="Clear"
                      ariaLabelConfirm="Confirm"
                    />
                  }
                  onConfirmKeyDown={closeMobileInputSheet}
                  onClearKeyDown={() =>
                    clearCalculatedRentalField(
                      mobileInputSheetContext.unit,
                      mobileInputSheetContext.field
                    )
                  }
                  className="w-full"
                  containerClassName="w-full"
                />
              </div>
            )}
        </BottomSheet>
      )}
    </div>
  );
};

FinancialComparisonPage.displayName = "FinancialComparisonPage";
