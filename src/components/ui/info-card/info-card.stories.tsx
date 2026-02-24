import type { Meta, StoryObj } from "@storybook/react";

import { InfoCard } from "./info-card";

import cashStackImage from "@/assets/images/cash-stack.png";

const meta: Meta<typeof InfoCard> = {
  title: "UI/InfoCard",
  component: InfoCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Info card with title, description, outline button and optional illustration (Figma 1335-27080).
Uses Button variant="outline". Illustration is positioned bottom-right.
        `,
      },
    },
  },
  argTypes: {
    onButtonClick: { action: "onButtonClick" },
  },
};

export default meta;
type Story = StoryObj<typeof InfoCard>;

export const Default: Story = {
  args: {
    title: "What is critical rent?",
    description:
      "Discover the rent threshold where your investment turns profitable.",
    buttonText: "LEARN MORE",
    illustration: <img src={cashStackImage} alt="" height={32} />,
  },
};

export const NoIllustration: Story = {
  args: {
    title: "What is critical rent?",
    description:
      "Discover the rent threshold where your investment turns profitable.",
    buttonText: "LEARN MORE",
  },
};
