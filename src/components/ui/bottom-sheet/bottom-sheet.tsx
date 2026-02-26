import * as React from "react";
import { Dialog } from "@base-ui-components/react/dialog";
import { cn } from "@/lib/utils";
import styles from "./bottom-sheet.module.css";

export interface BottomSheetProps {
  /** Whether the bottom sheet is open */
  open?: boolean;
  /** Callback when open state changes (e.g. backdrop tap or close) */
  onOpenChange?: (open: boolean) => void;
  /** Optional content for the top bar (title, close button). Rendered above the handle. */
  header?: React.ReactNode;
  /** Main content. Scrollable when tall. */
  children: React.ReactNode;
  /** Optional footer (actions, secondary content). Sticky at bottom. */
  footer?: React.ReactNode;
  /** Show the drag handle at the top. Default true. */
  showHandle?: boolean;
  /** Optional class name for the panel wrapper */
  className?: string;
}

/**
 * Bottom sheet overlay for mobile. Uses Base UI Dialog; panel is anchored to the bottom
 * with slide-up animation. Slot-based: header, children (content), footer.
 * Use for input focus flows or extra screen real estate on small viewports.
 */
export const BottomSheet = React.forwardRef<HTMLDivElement, BottomSheetProps>(
  (
    {
      open,
      onOpenChange,
      header,
      children,
      footer,
      showHandle = true,
      className,
    },
    ref
  ) => {
    return (
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Backdrop className={styles.backdrop} />
          <Dialog.Popup
            ref={ref}
            className={cn(styles.panel, className)}
            aria-modal="true"
          >
            {showHandle && (
              <div className={styles.handleWrap} aria-hidden="true">
                <span className={styles.handle} />
              </div>
            )}
            {header != null && (
              <div className={styles.header}>{header}</div>
            )}
            <div className={styles.content}>{children}</div>
            {footer != null && (
              <div className={styles.footer}>{footer}</div>
            )}
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }
);

BottomSheet.displayName = "BottomSheet";
