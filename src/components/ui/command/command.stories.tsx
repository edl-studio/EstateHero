import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "./command";
import { CommandBoxTrigger } from "./command-box-trigger";
import { Icon } from "@/components/ui/icon";

const meta = {
  title: "Components/Command",
  component: Command,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic command menu with groups and items
 */
export const Default: Story = {
  render: () => (
    <div className="w-[600px]">
      <Command className="rounded-lg border border-border shadow-lg">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Icon name="Calendar" className="mr-2" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Icon name="Search" className="mr-2 h-4 w-4" />
              <span>Search Properties</span>
            </CommandItem>
            <CommandItem>
              <Icon name="Star" className="mr-2" />
              <span>Saved Properties</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <Icon name="HelpCircle" className="mr-2" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Icon name="HelpCircle" className="mr-2" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
};

/**
 * Command dialog that can be opened with a trigger
 */
export const Dialog: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setOpen((open) => !open);
        }
      };

      document.addEventListener("keydown", down);
      return () => document.removeEventListener("keydown", down);
    }, []);

    return (
      <div className="w-full">
        <p className="text-sm text-muted-foreground mb-4">
          Press{" "}
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-xs font-medium">
            <span className="text-xs">⌘K</span>
          </kbd>{" "}
          or click the button to open the command dialog
        </p>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Open Command Dialog
        </button>

        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Properties">
              <CommandItem>
                <Icon name="Home" className="mr-2" />
                <span>Residential Properties</span>
              </CommandItem>
              <CommandItem>
                <Icon name="Building" className="mr-2" />
                <span>Commercial Properties</span>
              </CommandItem>
              <CommandItem>
                <Icon name="MapPin" className="mr-2" />
                <span>Find on Map</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Actions">
              <CommandItem>
                <Icon name="Search" className="mr-2 h-4 w-4" />
                <span>Search Properties</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Icon name="Star" className="mr-2" />
                <span>View Saved</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    );
  },
};

/**
 * Command box trigger that looks like an input but acts as a button
 */
export const Trigger: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="w-[600px]">
        <div className="bg-white shadow-sm rounded-md p-5">
          <CommandBoxTrigger
            variant="home"
            placeholder="Search properties by address or BFE number..."
            trailingIcon={<Icon name="Search" className="h-5 w-5" />}
            onClick={() => setOpen(true)}
          />
        </div>

        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput
            placeholder="Search properties..."
            leadingIcon={<Icon name="Search" />}
          />
          <CommandList>
            <CommandEmpty>No properties found.</CommandEmpty>
            <CommandGroup heading="Recent Properties">
              <CommandItem>
                <Icon name="Home" className="mr-2" />
                <span>123 Main Street, Stockholm</span>
              </CommandItem>
              <CommandItem>
                <Icon name="Building" className="mr-2" />
                <span>456 Business Ave, Gothenburg</span>
              </CommandItem>
              <CommandItem>
                <Icon name="Home" className="mr-2" />
                <span>789 Park Lane, Malmö</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    );
  },
};

/**
 * Command trigger variants
 */
export const TriggerVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[600px]">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Header variant:</p>
        <CommandBoxTrigger
          variant="header"
          placeholder="Search properties..."
          leadingIcon={<Icon name="Search" className="h-6 w-6" />}
        />
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-2">Home variant:</p>
        <CommandBoxTrigger
          variant="home"
          placeholder="Search properties by address or BFE number..."
          trailingIcon={<Icon name="Search" />}
        />
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-2">With keyboard shortcut badge:</p>
        <CommandBoxTrigger
          variant="header"
          placeholder="Search properties..."
          leadingIcon={<Icon name="Search" className="h-6 w-6" />}
          rightSlot={
            <span className="bg-[#f1efe9] px-2 py-0.5 rounded-full text-sm font-medium text-[#414651]">
              ⌘K
            </span>
          }
        />
      </div>
    </div>
  ),
};

/**
 * Command with keyboard shortcuts
 */
export const WithShortcuts: Story = {
  render: () => (
    <div className="w-[600px]">
      <Command className="rounded-lg border border-border shadow-lg">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem>
              <Icon name="Home" className="mr-2" />
              <span>Home</span>
              <CommandShortcut>⌘H</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Icon name="Search" className="mr-2 h-4 w-4" />
              <span>Search</span>
              <CommandShortcut>⌘K</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Icon name="Star" className="mr-2" />
              <span>Favorites</span>
              <CommandShortcut>⌘F</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Account">
            <CommandItem>
              <Icon name="HelpCircle" className="mr-2" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Icon name="HelpCircle" className="mr-2" />
              <span>Settings</span>
              <CommandShortcut>⌘,</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
};

/**
 * Scrollable command menu with many items
 */
export const Scrollable: Story = {
  render: () => (
    <div className="w-[600px]">
      <Command className="rounded-lg border border-border shadow-lg">
        <CommandInput placeholder="Search properties..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Properties">
            {Array.from({ length: 25 }, (_, i) => (
              <CommandItem key={i}>
                <Icon name="Home" className="mr-2" />
                <span>Property {i + 1} - Address {i + 1}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
};
