import * as React from "react";
import { Avatar as BaseAvatar } from "@base-ui-components/react/avatar";
import { cn } from "@/lib/utils";
import styles from "./avatar.module.css";

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof BaseAvatar.Root> {
  /**
   * The image source URL
   */
  src?: string;
  /**
   * Alt text for the image
   */
  alt?: string;
  /**
   * Fallback text to display when image fails to load (typically user initials)
   */
  fallback?: string;
  /**
   * Size variant for the avatar
   * @default "md"
   */
  size?: "sm" | "md";
}

export const Avatar = React.forwardRef<
  React.ElementRef<typeof BaseAvatar.Root>,
  AvatarProps
>(({ className, size = "md", src, alt, fallback, ...props }, ref) => {
  const sizeClass = size === "sm" ? styles.rootSm : styles.rootMd;
  const fallbackTextClass =
    size === "sm" ? "ui-sans-medium-12" : "ui-sans-medium-14";

  return (
    <BaseAvatar.Root
      ref={ref}
      className={cn(styles.root, sizeClass, className)}
      {...props}
    >
      {src && (
        <BaseAvatar.Image
          src={src}
          alt={alt || "Avatar"}
          className={styles.image}
        />
      )}
      {fallback && (
        <BaseAvatar.Fallback
          className={cn(styles.fallback, fallbackTextClass)}
        >
          {fallback}
        </BaseAvatar.Fallback>
      )}
    </BaseAvatar.Root>
  );
});

Avatar.displayName = "Avatar";
