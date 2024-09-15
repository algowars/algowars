import { Meta, StoryObj } from '@storybook/react';

import { LoginButton } from './login-button';

const meta: Meta<typeof LoginButton> = {
  component: LoginButton,
};

export default meta;

type Story = StoryObj<typeof LoginButton>;

export const Default: Story = {
  args: {}
};
