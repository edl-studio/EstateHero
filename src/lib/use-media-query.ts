import * as React from "react";

/**
 * Returns whether the viewport matches the given media query.
 * Uses window.matchMedia; safe for SSR (returns false until mounted).
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

/** Mobile breakpoint aligned with Tailwind md (768px). */
const MOBILE_QUERY = "(max-width: 767px)";

/**
 * Returns true when viewport is at or below the mobile breakpoint (< 768px).
 * Use for responsive input size, table layout, etc.
 */
export function useIsMobile(): boolean {
  return useMediaQuery(MOBILE_QUERY);
}
