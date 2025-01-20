import { Meta, StoryObj } from '@storybook/react';

import { LogoutButton } from './logout-button';

const meta: Meta<typeof LogoutButton> = {
  component: LogoutButton,
};

export default meta;

type Story = StoryObj<typeof LogoutButton>;

export const Default: Story = {
  args: {}
};
