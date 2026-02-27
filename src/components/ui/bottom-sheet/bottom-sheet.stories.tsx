import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BottomSheet } from "./bottom-sheet";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";

const meta: Meta<typeof BottomSheet> = {
  title: "UI/BottomSheet",
  component: BottomSheet,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "mobile1" },
  },
  argTypes: {
    open: { control: "boolean" },
    showHandle: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof BottomSheet>;

export const Default: Story = {
  render: function DefaultBottomSheet() {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ padding: 24, minHeight: "100vh" }}>
        <p className="text-sm text-muted-foreground mb-4">
          Tap the button to open the bottom sheet (mobile viewport recommended).
        </p>
        <Button onClick={() => setOpen(true)}>Open bottom sheet</Button>
        <BottomSheet
          open={open}
          onOpenChange={setOpen}
          heading="Edit value"
          headerActions={
            <Button
              type="button"
              variant="ghost"
              size="sm"
              iconLeft={<Icon name="X" />}
              onClick={() => setOpen(false)}
              aria-label="Close"
            />
          }
          footer={
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Save</Button>
            </div>
          }
        >
          <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              Use this space for forms or extra information when the user focuses
              an input on mobile.
            </p>
            <label className="text-sm font-medium">
              Total annual expenses
              <Input
                type="text"
                defaultValue="100.783"
                metric="DKK"
                className="mt-2 w-full"
                size="mobile"
                fontVariant="mono"
              />
            </label>
          </div>
        </BottomSheet>
      </div>
    );
  },
};

export const WithHandleOnly: Story = {
  render: function WithHandleOnlyStory() {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ padding: 24 }}>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <BottomSheet
          open={open}
          onOpenChange={setOpen}
          showHandle={true}
        >
          <p className="text-sm">
            No header or footer — just the drag handle and this content.
          </p>
        </BottomSheet>
      </div>
    );
  },
};

export const NoHandle: Story = {
  render: function NoHandleStory() {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ padding: 24 }}>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <BottomSheet
          open={open}
          onOpenChange={setOpen}
          showHandle={false}
          header={
            <h2 className="text-lg font-semibold">Title only</h2>
          }
        >
          <p className="text-sm">Content without the top handle.</p>
        </BottomSheet>
      </div>
    );
  },
};
