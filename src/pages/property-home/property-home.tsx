import * as React from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { GlobalHeader } from "@/components/ui/global-header";
import { PropertyHeader } from "@/components/ui/property-header";
import { MetadataItem } from "@/components/ui/metadata-item";
import { Card, CardContent } from "@/components/ui/card";
import { DataList, DataListItem } from "@/components/ui/data-list";
import { Icon, type IconName } from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

import magnifyingGraphic from "@/assets/images/magnifying.png";

import { getPropertyDetails } from "@/pages/property-details/mock-property-details";
import { searchResults, getPropertyById, type PropertyItem } from "@/pages/home/mock-data";

import { useIsMobile } from "@/lib/use-media-query";
import { usePropertyNavigation } from "@/lib/use-property-navigation";

/**
 * Defer redirect until after viewport has been measured.
 * useIsMobile() is false on first render (before useEffect runs), so we'd otherwise
 * redirect mobile users away from PropertyHome before they see it.
 */
function useCanRedirectToDetails(): boolean {
  const isMobile = useIsMobile();
  const [viewportsChecked, setViewportsChecked] = React.useState(false);

  React.useEffect(() => {
    const id = requestAnimationFrame(() => setViewportsChecked(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return viewportsChecked && !isMobile;
}

const SECTIONS: { path: string; label: string; icon: IconName }[] = [
  { path: "", label: "Property Details", icon: "ReceiptText" },
  { path: "/financial-comparison", label: "Financial Comparison", icon: "Chart" },
  { path: "/critical-rent", label: "Critical Rent", icon: "Scale" },
  { path: "/units", label: "Units", icon: "Home" },
  { path: "/tinglysning", label: "Tinglysning", icon: "Check" },
  { path: "/neighborhood", label: "Neighborhood", icon: "MapPin" },
];

function getColoredIcon(iconName: string, iconColor: PropertyItem["iconColor"]) {
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
}

export const PropertyHomePage: React.FC = () => {
  const { propertyId: routePropertyId } = useParams<{ propertyId: string }>();
  const navigate = useNavigate();
  const canRedirectToDetails = useCanRedirectToDetails();
  const { navigateToProperty } = usePropertyNavigation();

  const [isSearchModalOpen, setIsSearchModalOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const propertyId = routePropertyId ?? "";

  const filteredSearchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return searchResults;
    const query = searchQuery.toLowerCase().trim();
    return searchResults.filter((result) =>
      result.text.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const propertyItem = React.useMemo(() => getPropertyById(propertyId), [propertyId]);
  const propertyData = React.useMemo(() => getPropertyDetails(propertyId), [propertyId]);

  const address = propertyData?.address || "Property Address";
  const city = propertyData?.city || "City";
  const propertyType = propertyData?.propertyType || "home";

  const metaLabel = React.useMemo(() => {
    if (propertyItem) {
      const { iconColor } = propertyItem;
      if (iconColor === "success" || iconColor === "category-2") return "Commercial";
      if (iconColor === "info" || iconColor === "category-1") return "Residential";
    }
    return propertyType === "building" ? "Commercial" : "Residential";
  }, [propertyItem, propertyType]);

  if (canRedirectToDetails && propertyId) {
    return <Navigate to={`/property/${propertyId}`} replace />;
  }

  return (
    <div className="flex min-h-screen min-w-0 max-w-full flex-col items-center overflow-x-hidden bg-[var(--color-surface)]">
      <section className="flex min-w-0 w-full max-w-full flex-col items-center overflow-x-hidden">
        <GlobalHeader
          variant="search"
          avatarSrc="https://i.pravatar.cc/150?img=12"
          avatarAlt="User"
          avatarFallback="JD"
          searchPlaceholder="SEARCH PROPERTIES"
          onSearchClick={() => setIsSearchModalOpen(true)}
          onBackClick={() => navigate("/")}
        />

        <div className="min-w-0 w-full max-w-full px-4 pt-5 pb-4 md:flex md:flex-col md:items-center md:px-0 md:pt-5 md:pb-4">
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

      <section
        className="relative z-10 min-w-0 w-full max-w-full overflow-x-hidden px-4 pb-12 md:px-8"
        data-property-home-nav
      >
        <div className="mx-auto flex min-w-0 w-full max-w-full flex-col md:max-w-[800px]" style={{ gap: "var(--spacing-lg)" }}>
          <Card className="relative min-w-0 overflow-hidden">
            <CardContent className="p-0">
              <DataList>
                {SECTIONS.map(({ path, label, icon }) => (
                  <DataListItem
                    key={path || "details"}
                    variant="zebra"
                    onClick={() => navigate(`/property/${propertyId}${path}`)}
                  >
                    <Icon name={icon} className="text-[var(--color-content-accent)]" size="md" />
                    <span
                      className="min-w-0 flex-1"
                      style={{
                        fontSize: "var(--text-sm)",
                        fontWeight: "var(--font-normal)",
                        fontFamily: "var(--font-sans)",
                        color: "var(--color-content-primary)",
                        lineHeight: "var(--leading-tight)",
                      }}
                    >
                      {label}
                    </span>
                    <Icon name="ChevronRight" className="text-[var(--color-content-muted)]" size="sm" aria-hidden />
                  </DataListItem>
                ))}
              </DataList>
            </CardContent>
          </Card>
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
                    navigateToProperty(result.id);
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

PropertyHomePage.displayName = "PropertyHomePage";
