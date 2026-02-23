import * as React from "react";
import { cn } from "@/lib/utils";

export interface HotkeyBadgeProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The keys to display (e.g., "⌘K", "Ctrl+K")
   */
  keys?: string;
  /**
   * Automatically detect platform and show appropriate key
   * @default true
   */
  autoDetect?: boolean;
}

export const HotkeyBadge = React.forwardRef<HTMLElement, HotkeyBadgeProps>(
  ({ className, keys, autoDetect = true, ...props }, ref) => {
    const [isMac, setIsMac] = React.useState(true);

    React.useEffect(() => {
      if (autoDetect && typeof window !== "undefined") {
        setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform));
      }
    }, [autoDetect]);

    const displayKeys = keys || (isMac ? "⌘K" : "Ctrl+K");

    return (
      <kbd
        ref={ref}
        className={cn(
          "flex items-center justify-center text-center",
          "px-2 py-0.5 rounded-full",
          "font-sans text-sm font-medium leading-[18px]",
          "[mix-blend-mode:multiply]",
          className
        )}
        style={{
          backgroundColor: "var(--color-badge-bg)",
          color: "var(--color-gray-700)",
        }}
        {...props}
      >
        {displayKeys}
      </kbd>
    );
  }
);

HotkeyBadge.displayName = "HotkeyBadge";
