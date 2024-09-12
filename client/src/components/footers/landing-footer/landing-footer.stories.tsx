import { Meta, StoryObj } from '@storybook/react';

import { LandingFooter } from './landing-footer';

const meta: Meta<typeof LandingFooter> = {
  component: LandingFooter,
};

export default meta;

type Story = StoryObj<typeof LandingFooter>;

export const Default: Story = {
  args: {}
};
