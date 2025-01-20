import { Meta, StoryObj } from '@storybook/react';

import { Container } from './container';

const meta: Meta<typeof Container> = {
  component: Container,
};

export default meta;

type Story = StoryObj<typeof Container>;

export const Default: Story = {
  args: {}
};
