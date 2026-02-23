import * as React from "react";
import { Dialog } from "@base-ui-components/react/dialog";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "@/lib/utils";
import styles from "./command.module.css";

// Command Root
export interface CommandProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive> {}

export const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  CommandProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(styles.command, className)}
    {...props}
  />
));

Command.displayName = CommandPrimitive.displayName;

// Command Dialog (uses Base UI Dialog with cmdk inside)
export interface CommandDialogProps {
  /** Whether the command dialog is open */
  open?: boolean;
  /** Callback when the dialog open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Dialog content */
  children: React.ReactNode;
}

export const CommandDialog: React.FC<CommandDialogProps> = ({
  open,
  onOpenChange,
  children,
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.dialogOverlay} />
        <Dialog.Popup className={styles.dialogContent}>
          <Command
            className={cn(
              styles.command,
              "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-4 [&_[cmdk-input-wrapper]_svg]:w-4 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-4 [&_[cmdk-item]_svg]:w-4"
            )}
          >
            {children}
          </Command>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

CommandDialog.displayName = "CommandDialog";

// Command Input
export interface CommandInputProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> {
  /** Icon to display at the start of the input */
  leadingIcon?: React.ReactNode;
  /** Icon to display at the end of the input */
  trailingIcon?: React.ReactNode;
  /** Callback when trailing icon is clicked */
  onTrailingIconClick?: () => void;
}

export const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  CommandInputProps
>(({ className, leadingIcon, trailingIcon, onTrailingIconClick, ...props }, ref) => (
  <div className={styles.inputWrapper} cmdk-input-wrapper="">
    {leadingIcon && (
      <span className={styles.inputIcon} aria-hidden="true">
        {leadingIcon}
      </span>
    )}
    <CommandPrimitive.Input
      ref={ref}
      className={cn(styles.input, "ui-mono-13", className)}
      {...props}
    />
    {trailingIcon && onTrailingIconClick && (
      <button
        type="button"
        onClick={onTrailingIconClick}
        className={styles.inputIconButton}
        aria-label="Close"
      >
        {trailingIcon}
      </button>
    )}
    {trailingIcon && !onTrailingIconClick && (
      <span className={styles.inputIcon} aria-hidden="true">
        {trailingIcon}
      </span>
    )}
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

// Command List
export interface CommandListProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.List> {}

export const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  CommandListProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn(styles.list, className)}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

// Command Empty
export interface CommandEmptyProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty> {}

export const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  CommandEmptyProps
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className={cn(styles.empty, "ui-sans-regular-14")}
    {...props}
  />
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

// Command Group
export interface CommandGroupProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group> {}

export const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  CommandGroupProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      styles.group,
      "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2",
      className
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

// Command Separator
export interface CommandSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator> {}

export const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  CommandSeparatorProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn(styles.separator, className)}
    {...props}
  />
));

CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

// Command Item
export interface CommandItemProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> {}

export const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  CommandItemProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(styles.item, "ui-sans-regular-14", className)}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

// Command Shortcut
export interface CommandShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const CommandShortcut: React.FC<CommandShortcutProps> = ({
  className,
  ...props
}) => {
  return (
    <span
      className={cn(styles.shortcut, "ui-mono-13", className)}
      {...props}
    />
  );
};

CommandShortcut.displayName = "CommandShortcut";
