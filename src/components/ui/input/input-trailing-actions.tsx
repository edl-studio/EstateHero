import * as React from "react";
import { X, Check, CornerDownLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./input.module.css";

export interface InputTrailingActionsProps {
  /**
   * Called when the clear (X) button is clicked.
   */
  onClear: () => void;
  /**
   * Called when the confirm (checkmark) button is clicked.
   */
  onConfirm: () => void;
  /**
   * Optional shortcut badge on the confirm button (e.g. Enter key).
   * Pass true to show the default Enter icon, or a ReactNode for custom content.
   */
  confirmShortcut?: boolean | React.ReactNode;
  /**
   * Accessible label for the clear button.
   */
  ariaLabelClear?: string;
  /**
   * Accessible label for the confirm button.
   */
  ariaLabelConfirm?: string;
  className?: string;
}

export const InputTrailingActions: React.FC<InputTrailingActionsProps> = ({
  onClear,
  onConfirm,
  confirmShortcut,
  ariaLabelClear = "Clear",
  ariaLabelConfirm = "Confirm",
  className,
}) => {
  const showBadge = confirmShortcut !== undefined && confirmShortcut !== false;
  const badgeContent =
    confirmShortcut === true ? (
      <CornerDownLeft size={10} aria-hidden />
    ) : (
      confirmShortcut
    );

  return (
    <div className={cn(styles.trailingActions, className)}>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={onClear}
        className={cn(styles.trailingActionBtn, styles.trailingActionBtnClear)}
        aria-label={ariaLabelClear}
      >
        <X size={12} aria-hidden />
      </button>
      <button
        type="button"
        onClick={onConfirm}
        className={cn(
          styles.trailingActionBtn,
          styles.trailingActionBtnConfirm,
          showBadge && styles.trailingActionBtnConfirmWithBadge
        )}
        aria-label={ariaLabelConfirm}
      >
        <span className={styles.trailingActionBtnConfirmIcon}>
          <Check size={12} aria-hidden />
        </span>
        {showBadge && (
          <span className={styles.confirmShortcutBadge} aria-hidden="true">
            {badgeContent}
          </span>
        )}
      </button>
    </div>
  );
};

InputTrailingActions.displayName = "InputTrailingActions";
