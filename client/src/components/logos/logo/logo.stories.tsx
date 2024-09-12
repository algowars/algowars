import { Meta, StoryObj } from "@storybook/react";

import { Logos } from "./logo";

const meta: Meta<typeof Logos> = {
  component: Logos,
};

export default meta;

type Story = StoryObj<typeof Logos>;

export const Default: Story = {
  args: {},
};
