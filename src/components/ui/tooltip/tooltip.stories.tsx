import type { Meta, StoryObj } from "@storybook/react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./tooltip";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof Tooltip> = {
  title: "UI/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.

## Usage

\`\`\`tsx
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

<Tooltip>
  <TooltipTrigger>Hover</TooltipTrigger>
  <TooltipContent>
    <p>Add to library</p>
  </TooltipContent>
</Tooltip>
\`\`\`

With a button as trigger (same as doc example):

\`\`\`tsx
<Tooltip>
  <TooltipTrigger render={<Button variant="outline" />}>
    Hover
  </TooltipTrigger>
  <TooltipContent>
    <p>Add to library</p>
  </TooltipContent>
</Tooltip>
\`\`\`

Add \`TooltipProvider\` at the root of your app (e.g. in \`main.tsx\`).
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

/** Same as shadcn doc TooltipDemo: Button trigger, "Add to library" content */
export const TooltipDemo: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" />}>
        Hover
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  ),
};

/** Same as shadcn doc TooltipSides: side prop for position */
export const TooltipSides: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(["left", "top", "bottom", "right"] as const).map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger
            render={<Button variant="outline" className="w-fit capitalize" />}
          >
            {side}
          </TooltipTrigger>
          <TooltipContent side={side}>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
};

/** Same as shadcn doc TooltipDisabled: wrap disabled button in span */
export const TooltipDisabled: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger render={<span className="inline-block w-fit" />}>
        <Button variant="outline" disabled>
          Disabled
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This feature is currently unavailable</p>
      </TooltipContent>
    </Tooltip>
  ),
};

/** Plain trigger (no render prop) */
export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>Hover</TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  ),
};
