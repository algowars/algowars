import { Meta, StoryObj } from '@storybook/react';

import { Layout } from './layout';

const meta: Meta<typeof Layout> = {
  component: Layout,
};

export default meta;

type Story = StoryObj<typeof Layout>;

export const Default: Story = {
  args: {}
};
