import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { CommandBoxTrigger } from "@/components/ui/command/command-box-trigger";
import { HotkeyBadge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import styles from "./global-header.module.css";

export interface GlobalHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Visual variant of the header
   * - default: Logo and avatar only
   * - search: Includes centered CommandBoxTrigger between logo and avatar
   */
  variant?: "default" | "search";
  /**
   * Image source URL for the user avatar
   */
  avatarSrc?: string;
  /**
   * Alt text for the avatar image
   */
  avatarAlt?: string;
  /**
   * Fallback text for the avatar (typically user initials)
   */
  avatarFallback?: string;
  /**
   * Placeholder text for the command box trigger (only used with variant="search")
   */
  searchPlaceholder?: string;
  /**
   * Callback when command box trigger is clicked (only used with variant="search")
   */
  onSearchClick?: () => void;
  /**
   * Callback when the logo is clicked
   */
  onLogoClick?: () => void;
}

export const GlobalHeader = React.forwardRef<HTMLElement, GlobalHeaderProps>(
  (
    {
      className,
      variant = "default",
      avatarSrc,
      avatarAlt,
      avatarFallback,
      searchPlaceholder = "SEARCH PROPERTIES",
      onSearchClick,
      onLogoClick,
      ...props
    },
    ref
  ) => {
    return (
      <header
        ref={ref}
        className={cn(styles.header, className)}
        {...props}
      >
        <div className={styles.container}>
          {/* Logo Section */}
          <div className={styles.logoSection}>
            <button
              onClick={onLogoClick}
              className={styles.logoButton}
              aria-label="Go to home page"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.logo}
                viewBox="0 0 48 48"
                fill="none"
                aria-hidden="true"
              >
                <g clipPath="url(#clip0_1232_2504)">
                  <path
                    className={styles.logoPath}
                    d="M3.88696 23.9999C3.88696 25.556 4.064 27.0691 4.39664 28.5231L22.356 18.1356V22.6077L20.6661 23.586L17.2003 25.5909L5.65205 32.2695C8.5894 38.8003 14.8987 43.4794 22.356 44.0841V47.9891C13.4555 47.3871 5.88811 41.9206 2.27209 34.2234C1.71949 33.0462 1.2581 31.818 0.898641 30.5441C0.313854 28.4639 0 26.2682 0 23.9999C0 11.2742 9.86896 0.857205 22.356 0.0106201V3.91566C12.0177 4.75418 3.88696 13.4243 3.88696 23.9999Z"
                  />
                  <path
                    className={styles.logoPath}
                    d="M47.9977 24C47.9977 31.3854 44.674 37.9915 39.4431 42.4018L36.6828 39.6363C41.0607 36.0699 43.9122 30.692 44.1 24.6423L29.9095 32.8502L29.2952 33.2049V47.4571C28.0425 47.742 26.7495 47.9247 25.4297 48V0C26.7495 0.075252 28.0425 0.258007 29.2952 0.542889V28.7328L43.7808 20.353C43.2442 17.402 42.0639 14.6768 40.3927 12.3252C39.6416 11.2663 38.7913 10.2853 37.8524 9.39306L40.5993 6.64099C41.5328 7.53326 42.3939 8.50347 43.1718 9.54087C45.1086 12.1102 46.5384 15.0826 47.319 18.3077C47.6436 19.6381 47.8555 21.0087 47.944 22.417C47.9816 22.9384 47.9977 23.4679 47.9977 24Z"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1232_2504">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>

          {/* Center Section: CommandBoxTrigger (search variant only) */}
          <div className={styles.centerSection}>
            {variant === "search" && (
              <CommandBoxTrigger
                variant="header"
                placeholder={searchPlaceholder}
                leadingIcon={<Icon name="Search" />}
                rightSlot={<HotkeyBadge />}
                onClick={onSearchClick}
              />
            )}
          </div>

          {/* Avatar Section */}
          <div className={styles.avatarSection}>
            <Avatar
              src={avatarSrc}
              alt={avatarAlt || "User avatar"}
              fallback={avatarFallback}
              className={styles.avatar}
              size="sm"
            />
          </div>
        </div>
      </header>
    );
  }
);

GlobalHeader.displayName = "GlobalHeader";
