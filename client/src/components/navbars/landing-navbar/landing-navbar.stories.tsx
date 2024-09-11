import { Meta, StoryObj } from '@storybook/react';

import { LandingNavbar } from './landing-navbar';

const meta: Meta<typeof LandingNavbar> = {
  component: LandingNavbar,
};

export default meta;

type Story = StoryObj<typeof LandingNavbar>;

export const Default: Story = {
  args: {}
};
