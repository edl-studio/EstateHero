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
import { TooltipProvider } from "@/components/ui/tooltip";
import { ValueCard } from "@/components/ui/value-card";
import { MortgageRateCard } from "@/components/ui/mortgage-rate-card";
import { InfoCard } from "@/components/ui/info-card";
import { InputTrailingActions } from "@/components/ui/input";
import { TableHeader } from "@/components/ui/table-header";
import { TableRow } from "@/components/ui/table-row";
import { TableCell } from "@/components/ui/table-cell";

import { cn } from "@/lib/utils";

import valueRatioImage from "@/assets/images/value-ratio.png";
import contributionRateImage from "@/assets/images/contribution-rate.png";
import mortgageInterestRateImage from "@/assets/images/mortgage-interest-rate.png";
import cashStackImage from "@/assets/images/cash-stack.png";

import { getPropertyDetails } from "@/pages/property-details/mock-property-details";
import {
  searchResults,
  getPropertyById,
  type PropertyItem,
} from "@/pages/home/mock-data";

export interface CriticalRentPageProps {
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

export const CriticalRentPage: React.FC<CriticalRentPageProps> = ({
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
  const [loanToValueRatio, setLoanToValueRatio] = React.useState("78%");
  const [contributionRate, setContributionRate] = React.useState("65%");
  const [mortgageDuration, setMortgageDuration] = React.useState<
    "20y" | "30y"
  >("20y");

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
              <TabItem isActive>Critical Rent</TabItem>
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

            <Tile className="w-full">
              <TileHeader>
                <TileTitle tooltip="Compare critical rent across different loan durations.">
                  loan duration comparison
                </TileTitle>
                <TileHeaderActions>
                  <Button variant="inline" size="md" iconLeft={<Icon name="Columns" size="md" />}>
                    COLUMNS
                  </Button>
                </TileHeaderActions>
              </TileHeader>
              <TileContent
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "var(--spacing-xl)",
                  flexWrap: "wrap",
                }}
              >
                <ValueCard
                  variant="illustration"
                  label="Loan to value ratio"
                  labelTooltip="Ratio of loan amount to property value."
                  value={loanToValueRatio}
                  onInputChange={(e) => setLoanToValueRatio(e.target.value)}
                  onInputConfirmKeyDown={() => {}}
                  onInputClearKeyDown={() => setLoanToValueRatio("")}
                  metric="DKK"
                  illustration={<img src={valueRatioImage} alt="" width={32} height={40} />}
                  valueIcon={null}
                  inputTrailingSlot={
                    <InputTrailingActions
                      onClear={() => setLoanToValueRatio("")}
                      onConfirm={() => {}}
                      confirmShortcut
                    />
                  }
                />
                <ValueCard
                  variant="illustration"
                  label="Contribution rate"
                  labelTooltip="Contribution rate for the loan."
                  value={contributionRate}
                  onInputChange={(e) => setContributionRate(e.target.value)}
                  onInputConfirmKeyDown={() => {}}
                  onInputClearKeyDown={() => setContributionRate("")}
                  metric="DKK"
                  illustration={<img src={contributionRateImage} alt="" width={32} height={40} />}
                  valueIcon={null}
                  inputTrailingSlot={
                    <InputTrailingActions
                      onClear={() => setContributionRate("")}
                      onConfirm={() => {}}
                      confirmShortcut
                    />
                  }
                />
                <MortgageRateCard
                  illustration={<img src={mortgageInterestRateImage} alt="" width={32} height={40} />}
                  label="Mortgage interest rate"
                  labelTooltip="Interest rate for the mortgage."
                  value={mortgageDuration === "20y" ? "3.85" : "5.45"}
                  metric="%"
                  duration={mortgageDuration}
                  onDurationChange={setMortgageDuration}
                />
                <InfoCard
                  title="What is critical rent?"
                  description="Discover the rent threshold where your investment turns profitable."
                  buttonText="LEARN MORE"
                  onButtonClick={() => {}}
                  illustration={<img src={cashStackImage} alt="" height={32} />}
                />
              </TileContent>

              <TileContent style={{ paddingTop: "var(--spacing-xl)" }}>
                <TooltipProvider>
                  <div className="overflow-x-auto rounded-lg bg-[var(--color-card)]">
                    <table className="data-table critical-rent-comparison-table w-full min-w-[640px] border-separate border-spacing-0" style={{ tableLayout: "fixed" }}>
                      <colgroup>
                        <col style={{ width: "224px" }} />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                      </colgroup>
                      <thead>
                        <tr>
                          <TableHeader theme="light" />
                          <TableHeader theme="light" label="MARKET" tooltipContent="Market values." colSpan={2} align="right" />
                          <TableHeader theme="light" label="CALCULATED" tooltipContent="Calculated values." colSpan={2} align="right" />
                          <TableHeader theme="light" label="SIMULATED" tooltipContent="Simulated values." colSpan={2} align="right" />
                        </tr>
                      </thead>
                      <tbody>
                        <TableRow className="border-b-inset">
                          <TableCell align="left" contentVariant="label" tooltip="Estimated property value.">
                            ESTIMATED VALUE
                          </TableCell>
                          <TableCell colSpan={2} suffix=" DKK" align="right">7.728.337</TableCell>
                          <TableCell colSpan={2} suffix=" DKK" align="right">5.080.421</TableCell>
                          <TableCell colSpan={2} suffix=" DKK" align="right">7.728.337</TableCell>
                        </TableRow>
                        <TableRow className="border-b-inset">
                          <TableCell align="left" contentVariant="label" tooltip="Maximum mortgage load.">
                            MAX MORTAGE LOAD
                          </TableCell>
                          <TableCell colSpan={2} suffix="%" align="right">4,70</TableCell>
                          <TableCell colSpan={2} suffix="%" align="right">4,75</TableCell>
                          <TableCell colSpan={2} suffix="%" align="right">4,65</TableCell>
                        </TableRow>
                        <TableRow className="border-b-inset">
                          <TableCell align="left" contentVariant="label" tooltip="Net rent.">
                            NET RENT
                          </TableCell>
                          <TableCell colSpan={2} suffix=" DKK" align="right">386.417</TableCell>
                          <TableCell colSpan={2} suffix=" DKK" align="right">254.021</TableCell>
                          <TableCell colSpan={2} suffix=" DKK" align="right">465.120</TableCell>
                        </TableRow>
                        <TableRow className="border-b-inset">
                          <TableCell align="left" contentVariant="label" tooltip="Cash deposit.">
                            CASH DEPOSIT
                          </TableCell>
                          <TableCell colSpan={2} suffix=" DKK" align="right">195.000</TableCell>
                          <TableCell colSpan={2} suffix=" DKK" align="right">210.000</TableCell>
                          <TableCell colSpan={2} suffix=" DKK" align="right">185.000</TableCell>
                        </TableRow>
                        <tr className="border-b-inset" data-section-header>
                          <TableHeader theme="light" label="CRITICAL RENT" />
                          <TableHeader theme="light" label="20 YEARS" align="right" />
                          <TableHeader theme="light" label="30 YEARS" align="right" />
                          <TableHeader theme="light" label="20 YEARS" align="right" />
                          <TableHeader theme="light" label="30 YEARS" align="right" />
                          <TableHeader theme="light" label="20 YEARS" align="right" />
                          <TableHeader theme="light" label="30 YEARS" align="right" />
                        </tr>
                        <TableRow className="border-b-inset">
                          <TableCell align="left" contentVariant="label" tooltip="Critical rent calculated from loan inputs.">CALCULATED</TableCell>
                          <TableCell align="right" prefix={<Icon name="Check" size="sm" className="text-[var(--color-green)]" />} suffix=" DKK">4.950.000</TableCell>
                          <TableCell align="right" prefix={<Icon name="Check" size="sm" className="text-[var(--color-green)]" />} suffix=" DKK">5.300.000</TableCell>
                          <TableCell align="right" prefix={<Icon name="X" size="sm" className="text-[var(--color-destructive)]" />} suffix=" DKK">3.250.000</TableCell>
                          <TableCell align="right" prefix={<Icon name="Check" size="sm" className="text-[var(--color-green)]" />} suffix=" DKK">3.550.000</TableCell>
                          <TableCell align="right" prefix={<Icon name="Check" size="sm" className="text-[var(--color-green)]" />} suffix=" DKK">5.900.000</TableCell>
                          <TableCell align="right" prefix={<Icon name="X" size="sm" className="text-[var(--color-destructive)]" />} suffix=" DKK">6.250.000</TableCell>
                        </TableRow>
                        <TableRow className="border-b-inset">
                          <TableCell align="left" contentVariant="label" tooltip="Maximum loan amount based on property value.">MAX. LOAN</TableCell>
                          <TableCell suffix=" DKK" align="right">6.030.000</TableCell>
                          <TableCell suffix=" DKK" align="right">6.030.000</TableCell>
                          <TableCell suffix=" DKK" align="right">4.064.000</TableCell>
                          <TableCell suffix=" DKK" align="right">4.064.000</TableCell>
                          <TableCell suffix=" DKK" align="right">6.064.000</TableCell>
                          <TableCell suffix=" DKK" align="right">6.064.000</TableCell>
                        </TableRow>
                        <TableRow className="border-b-inset">
                          <TableCell align="left" contentVariant="label" tooltip="Maximum mortgage as a percentage of property value.">MAX. MORTAGE (%)</TableCell>
                          <TableCell suffix="%" align="right">78</TableCell>
                          <TableCell suffix="%" align="right">78</TableCell>
                          <TableCell suffix="%" align="right">80</TableCell>
                          <TableCell suffix="%" align="right">80</TableCell>
                          <TableCell suffix="%" align="right">78,5</TableCell>
                          <TableCell suffix="%" align="right">78,5</TableCell>
                        </TableRow>
                        <TableRow className="border-b-inset">
                          <TableCell align="left" contentVariant="label" tooltip="Loan performance as a percentage.">PERFORMANCE (%)</TableCell>
                          <TableCell suffix="%" align="right">71</TableCell>
                          <TableCell suffix="%" align="right">73</TableCell>
                          <TableCell suffix="%" align="right">74</TableCell>
                          <TableCell suffix="%" align="right">75</TableCell>
                          <TableCell suffix="%" align="right">71</TableCell>
                          <TableCell suffix="%" align="right">72</TableCell>
                        </TableRow>
                        <TableRow className="border-b-inset">
                          <TableCell align="left" contentVariant="label" tooltip="Annual interest rate applied to the mortgage.">MORTAGE INTEREST RATE</TableCell>
                          <TableCell suffix="%" align="right">3,85</TableCell>
                          <TableCell suffix="%" align="right">3,95</TableCell>
                          <TableCell suffix="%" align="right">4,05</TableCell>
                          <TableCell suffix="%" align="right">3,90</TableCell>
                          <TableCell suffix="%" align="right">4,10</TableCell>
                          <TableCell suffix="%" align="right">3,80</TableCell>
                        </TableRow>
                      </tbody>
                    </table>
                  </div>
                </TooltipProvider>
              </TileContent>
            </Tile>
          </div>
        </section>
      </div>

      <CommandDialog open={isSearchModalOpen} onOpenChange={setIsSearchModalOpen}>
        <CommandInput
          placeholder="Search properties..."
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Properties">
            {filteredSearchResults.map((result) => (
              <CommandItem
                key={result.id}
                value={result.text}
                onSelect={() => {
                  navigate(`/property/${result.id}`);
                  setIsSearchModalOpen(false);
                  setSearchQuery("");
                }}
              >
                {getColoredIcon(result.icon, result.iconColor)}
                <span>{result.text}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};
