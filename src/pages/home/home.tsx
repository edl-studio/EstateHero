import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TabsRoot, TabsList, TabsTab, TabsPanel } from "@/components/ui/inline-tabs";
import { BadgeHome } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { GlobalHeader } from "@/components/ui/global-header";
import { IconContainer } from "@/components/ui/icon-container";
import { Icon, type IconName } from "@/components/ui/icon";
import {
  DataList,
  DataListItem,
} from "@/components/ui/data-list";
import {
  CommandBoxTrigger,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

import { FlashingGrid } from "@/components/ui/flashing-grid";
import bookmarkGraphic from "@/assets/images/bookmark.png";
import magnifyingGraphic from "@/assets/images/magnifying.png";

import { useIsMobile } from "@/lib/use-media-query";
import { usePropertyNavigation } from "@/lib/use-property-navigation";
import {
  recentProperties,
  savedProperties,
  searchResults,
  emptySearchResults,
  type PropertyItem,
} from "./mock-data";

export interface HomePageProps {
  /** Override recent properties data */
  recentData?: PropertyItem[];
  /** Override saved properties data */
  savedData?: PropertyItem[];
  /** Show search modal */
  showSearchModal?: boolean;
  /** Use empty search results */
  useEmptySearchResults?: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
  recentData = recentProperties,
  savedData = savedProperties,
  showSearchModal = false,
  useEmptySearchResults = false,
}) => {
  const isMobile = useIsMobile();
  const { navigateToProperty } = usePropertyNavigation();
  const [isSearchModalOpen, setIsSearchModalOpen] = React.useState(showSearchModal);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("saved");

  // Keyboard shortcut for opening command dialog
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

  // Get icon component with IconContainer using only green and blue variants (for table lists)
  const getIconComponent = (iconName: string, iconColor: PropertyItem["iconColor"]) => {
    const iconMap: Record<string, IconName> = {
      home: "Home",
      building: "Building",
      star: "Star",
      search: "Search",
    };
    const mappedIconName = iconMap[iconName] || "Home";
    
    // Map iconColor to IconContainer color variants (only green and blue)
    const getContainerColor = (color: PropertyItem["iconColor"]): "green" | "blue" => {
      // Map all success/positive colors to green
      if (color === "success" || color === "category-2") {
        return "green";
      }
      // Map all info/primary colors to blue
      return "blue";
    };
    
    return (
      <IconContainer 
        color={getContainerColor(iconColor)} 
        icon={{ name: mappedIconName }} 
      />
    );
  };

  // Get icon with color only (for search results, no container)
  const getColoredIcon = (iconName: string, iconColor: PropertyItem["iconColor"]) => {
    const iconMap: Record<string, IconName> = {
      home: "Home",
      building: "Building",
      star: "Star",
      search: "Search",
    };
    const mappedIconName = iconMap[iconName] || "Home";
    
    // Map iconColor to text color classes
    const getIconColor = (color: PropertyItem["iconColor"]): string => {
      // Map all success/positive colors to green
      if (color === "success" || color === "category-2") {
        return "text-green-700";
      }
      // Map all info/primary colors to blue
      return "text-blue-700";
    };
    
    return <Icon name={mappedIconName} className={getIconColor(iconColor)} />;
  };

  // Current search results
  const currentSearchResults = useEmptySearchResults ? emptySearchResults : searchResults;

  // Filter search results based on search query
  const filteredSearchResults = React.useMemo(() => {
    if (!searchQuery.trim()) {
      return currentSearchResults;
    }
    
    const query = searchQuery.toLowerCase().trim();
    return currentSearchResults.filter((result) => 
      result.text.toLowerCase().includes(query)
    );
  }, [searchQuery, currentSearchResults]);

  return (
    <div
      className="flex min-h-screen min-w-0 w-full max-w-full flex-col overflow-x-hidden relative"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      {/* Absolute positioned container - Background element (hidden on mobile). Width adapts to viewport, max 1312px. */}
      <div
        className="hidden md:block absolute top-[96px] left-1/2 z-0 h-[584px] w-full max-w-[1312px] -translate-x-1/2 overflow-hidden"
        style={{ borderRadius: "var(--radius-base)", backgroundColor: "var(--color-surface-dark)" }}
      >
        {/* Flashing grid - pinned bottom-left, 540×540, with radial gradient fade */}
        <div
          className="absolute left-0 bottom-0 w-[540px] h-[540px]"
          style={{ position: "absolute" }}
        >
          <FlashingGrid blocks={6} className="size-full" aria-hidden />
          <div
            className="absolute inset-0"
            style={{
              pointerEvents: "none",
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(238, 234, 231, 0) 0%, var(--color-surface-dark) 100%)",
            }}
            aria-hidden
          />
        </div>
        {/* Flashing grid - pinned top-right, 540×540, with radial gradient fade */}
        <div
          className="absolute right-0 top-0 w-[540px] h-[540px]"
          style={{ position: "absolute" }}
        >
          <FlashingGrid blocks={6} className="size-full" aria-hidden />
          <div
            className="absolute inset-0"
            style={{
              pointerEvents: "none",
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(238, 234, 231, 0) 0%, var(--color-surface-dark) 100%)",
            }}
            aria-hidden
          />
        </div>
      </div>

      {/* Global Header - pointer-events-auto so header stays interactive; grid receives hover elsewhere */}
      <div className="relative z-10 min-w-0 w-full max-w-full pointer-events-none">
        <div className="pointer-events-auto">
          <GlobalHeader
          avatarSrc="https://i.pravatar.cc/150?img=12"
          avatarAlt="User"
          avatarFallback="JD"
          onLogoClick={() => {
            // Already on home page, scroll to top
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
        </div>
      </div>

      {/* Hero Section - 16px/32px horizontal padding; inner content constrained to avoid side scroll */}
      <section className="relative z-10 min-w-0 w-full max-w-full overflow-x-hidden px-4 pt-4 pointer-events-none md:px-8 md:pt-16">
        <div className="welcome mx-auto min-w-0 w-full max-w-full md:max-w-6xl">
          {/* Hero Heading */}
          <div className="mb-2 md:mb-8 text-left md:text-center" id="welcome">
            <p className="text-left md:text-center mb-1" style={{ 
              fontSize: 'var(--text-lg)', 
              color: 'var(--color-gray-500)', 
              fontFamily: 'var(--font-sans)', 
              fontWeight: 'var(--font-normal)', 
              lineHeight: 'var(--leading-tight)' 
            }}>
              Welcome back, Filippa
            </p>
            <h1 className="text-left md:text-center" style={{ 
              fontFamily: 'var(--font-sans)', 
              fontSize: 'var(--text-4xl)', 
              fontWeight: 'var(--font-medium)', 
              color: 'var(--color-content-primary)', 
              lineHeight: 'var(--leading-tight)', 
              letterSpacing: 'var(--tracking-tighter)' 
            }}>
              Let's dive into the data
            </h1>
           
          </div>

          {/* Coming Soon Banner - under welcome on mobile only */}
          <div className="mx-auto mb-4 min-w-0 w-full max-w-2xl pointer-events-auto md:hidden">
            <div className="flex min-w-0 items-center gap-2 self-stretch" style={{ paddingRight: "var(--spacing-md)" }}>
              <BadgeHome>
                COMING SOON
              </BadgeHome>
              <a href="#" className="hover:underline flex items-center gap-1 min-w-0 flex-1" style={{ color: 'var(--color-content-primary)', fontSize: 'var(--text-sm)' }}>
                <span className="truncate">Business property search launches November 6</span>
                <Icon name="ChevronRight" className="flex-shrink-0 text-muted-foreground" />
              </a>
            </div>
          </div>

          {/* Search Container - pointer-events-auto so search and buttons are clickable */}
          <div className="mx-auto mb-4 min-w-0 w-full max-w-2xl pointer-events-auto">
            {/* Wrapper with card background, shadow and radius from globals */}
            <div
              className="flex min-w-0 flex-col"
              style={{
                backgroundColor: "var(--color-card)",
                boxShadow: "var(--shadow-sm)",
                borderRadius: "var(--radius-base)",
              }}
            >
              {/* Command Box Trigger */}
              <div className="flex min-w-0 items-start self-stretch">
                <CommandBoxTrigger
                    variant="home"
                    placeholder={isMobile ? "Search properties" : "Search properties by address or BFE number..."}
                    trailingIcon={<Icon name="HelpCircle" />}
                    onClick={() => setIsSearchModalOpen(true)}
                  />
              </div>

              {/* Actions Row - 2 buttons and icon button (hidden on mobile) */}
              <div className="hidden md:flex items-center gap-3" style={{ padding: 'var(--spacing-md)' }}>
                  {/* Left side - 2 buttons */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconLeft={<Icon name="Compare" style={{ color: 'var(--color-teal)' }} />}
                    >
                      COMPARE
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconLeft={<Icon name="MapPin" style={{ color: 'var(--color-teal)' }} />}
                    >
                      FIND ON MAP
                    </Button>
                  </div>

                  {/* Right side - Icon-only action button */}
                  <Button
                    variant="primary"
                    size="lg"
                    iconRight={<Icon name="ChevronRight" size="lg" />}
                    className="ml-auto"
                  />
              </div>
            </div>
          </div>

          {/* Coming Soon Banner - under search on desktop only */}
          <div className="mx-auto hidden min-w-0 w-full max-w-2xl pointer-events-auto mb-[64px] md:block">
            <div className="flex min-w-0 items-center gap-2 self-stretch" style={{ paddingLeft: "var(--spacing-md)", paddingRight: "var(--spacing-md)" }}>
              <BadgeHome>
                COMING SOON
              </BadgeHome>
              <a href="#" className="hover:underline flex items-center gap-1" style={{ color: 'var(--color-content-primary)', fontSize: 'var(--text-sm)' }}>
                Business property search launches November 6
                <Icon name="ChevronRight" className="text-muted-foreground" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Data Tables Section - 16px/32px horizontal padding; inner content constrained to avoid side scroll */}
      <section className="relative z-10 min-w-0 w-full max-w-full overflow-x-hidden px-4 pb-12 pointer-events-none md:px-8">
        <div className="mx-auto flex min-w-0 w-full max-w-full flex-col pointer-events-auto md:max-w-[800px]" style={{ gap: "var(--spacing-lg)" }}>
          {/* Last Visited Card */}
          <Card className="relative z-10 min-w-0">
            <CardHeader style={{ 
              paddingTop: 'var(--spacing-lg)', 
              paddingRight: 'var(--spacing-6xl)', 
              paddingBottom: 'var(--spacing-lg)', 
              paddingLeft: 'var(--spacing-xl)', 
              gap: 'var(--spacing-lg)' 
            }}>
              <CardTitle>Last Visited</CardTitle>
            </CardHeader>
            <CardContent>
              <DataList>
                {recentData.map((property) => (
                  <DataListItem
                    key={property.id}
                    variant="zebra"
                    onClick={() => navigateToProperty(property.id)}
                  >
                    {getIconComponent(property.icon, property.iconColor)}
                    <span className="min-w-0 flex-1" style={{ 
                      fontSize: 'var(--text-sm)', 
                      fontWeight: 'var(--font-normal)', 
                      fontFamily: 'var(--font-sans)', 
                      color: 'var(--color-content-primary)', 
                      lineHeight: 'var(--leading-tight)' 
                    }}>
                      {property.text}
                    </span>
                    <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>{property.units} units</span>
                    <span className="text-muted-foreground min-w-[80px] text-right" style={{ fontSize: 'var(--text-sm)' }}>{property.area} m²</span>
                  </DataListItem>
                ))}
              </DataList>
            </CardContent>
          </Card>

          {/* Saved Properties Card with Tabs */}
          <Card className="relative z-10 min-w-0">
            <CardHeader style={{ padding: 'var(--spacing-xl)', paddingBottom: '0', gap: 'var(--spacing-xl)' }}>
              <CardTitle>Saved</CardTitle>

              <TabsRoot value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTab value="saved">My properties</TabsTab>
                  <TabsTab value="interest">Properties of interest</TabsTab>
                </TabsList>
              </TabsRoot>
            </CardHeader>
            <CardContent>
              <TabsRoot value={activeTab} onValueChange={setActiveTab}>
                {/* Saved Tab Panel */}
                <TabsPanel value="saved" className="mt-0">
                  {savedData.length > 0 ? (
                    <DataList>
                      {savedData.map((property) => (
                        <DataListItem
                          key={property.id}
                          variant="zebra"
                          onClick={() => navigateToProperty(property.id)}
                        >
                          {getIconComponent(property.icon, property.iconColor)}
                          <span className="min-w-0 flex-1" style={{ 
                            fontSize: 'var(--text-sm)', 
                            fontWeight: 'var(--font-normal)', 
                            fontFamily: 'var(--font-sans)', 
                            color: 'var(--color-content-primary)', 
                            lineHeight: 'var(--leading-tight)' 
                          }}>
                            {property.text}
                          </span>
                          <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>{property.units} units</span>
                          <span className="text-muted-foreground min-w-[80px] text-right" style={{ fontSize: 'var(--text-sm)' }}>{property.area} m²</span>
                        </DataListItem>
                      ))}
                    </DataList>
                  ) : (
                    <EmptyState
                      variant="default"
                      title="No saved properties"
                      description="Properties you save will appear here for easy access."
                    />
                  )}
                </TabsPanel>

                {/* Properties of Interest Tab Panel */}
                <TabsPanel value="interest" className="mt-0">
                  <EmptyState
                    variant="illustration"
                    illustration={
                      <img 
                        src={bookmarkGraphic} 
                        alt="" 
                        className="h-30 w-30 object-contain"
                      />
                    }
                    title="No saved project yet"
                    description="Search and save to keep track of your favourites here."
                  />
                </TabsPanel>
              </TabsRoot>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Command Dialog */}
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
                      style={{
                        color: 'var(--color-content-primary)',
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-normal)',
                        lineHeight: 'var(--leading-tight)',
                      }}
                    >
                      {result.text}
                    </span>
                    {result.supportingText && (
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>{result.supportingText}</span>
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

HomePage.displayName = "HomePage";
