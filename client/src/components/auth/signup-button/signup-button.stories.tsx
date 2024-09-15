import { Meta, StoryObj } from '@storybook/react';

import { SignupButton } from './signup-button';

const meta: Meta<typeof SignupButton> = {
  component: SignupButton,
};

export default meta;

type Story = StoryObj<typeof SignupButton>;

export const Default: Story = {
  args: {}
};
