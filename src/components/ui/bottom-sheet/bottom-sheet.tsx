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
  /** Optional heading (ui/sans-serif/regular/20). Use with headerActions for consistent layout. Ignored if header is provided. */
  heading?: React.ReactNode;
  /** Optional subheading (ui/sans-serif/regular/14). Renders below the heading row. Ignored if header is provided. */
  subheading?: React.ReactNode;
  /** Optional actions (e.g. close button) shown on the right of the heading row. Use with heading for consistent layout. Ignored if header is provided. */
  headerActions?: React.ReactNode;
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
      heading,
      subheading,
      headerActions,
      children,
      footer,
      showHandle = true,
      className,
    },
    ref
  ) => {
    const [keyboardOffset, setKeyboardOffset] = React.useState(0);
    React.useEffect(() => {
      if (!open || typeof window === "undefined") { setKeyboardOffset(0); return; }
      const vv = window.visualViewport;
      if (!vv) return;
      const onResize = () => setKeyboardOffset(Math.max(0, window.innerHeight - vv.height - vv.offsetTop));
      vv.addEventListener("resize", onResize);
      onResize();
      return () => { vv.removeEventListener("resize", onResize); setKeyboardOffset(0); };
    }, [open]);

    const hasHeader =
      header != null ||
      heading != null ||
      subheading != null ||
      headerActions != null;

    const headerContent =
      header != null ? (
        header
      ) : (
        <>
          {(heading != null || headerActions != null) && (
            <div className={styles.headerRow}>
              {heading != null && (
                <div className={cn("ui-sans-regular-20", styles.headerHeading)}>
                  {heading}
                </div>
              )}
              {headerActions}
            </div>
          )}
          {subheading != null && (
            <div className={cn("ui-sans-regular-14", styles.headerSubheading)}>
              {subheading}
            </div>
          )}
        </>
      );

    return (
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Backdrop className={styles.backdrop} />
          <Dialog.Popup
            ref={ref}
            className={cn(styles.panel, className)}
            style={keyboardOffset > 0 ? { bottom: keyboardOffset } : undefined}
            aria-modal="true"
          >
            <div className={styles.bottomFill} aria-hidden="true" />
            {showHandle && (
              <div className={styles.handleWrap} aria-hidden="true">
                <span className={styles.handle} />
              </div>
            )}
            {hasHeader && (
              <div className={styles.header}>{headerContent}</div>
            )}
            <div className={styles.content} data-bottom-sheet-content>
              {children}
            </div>
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
