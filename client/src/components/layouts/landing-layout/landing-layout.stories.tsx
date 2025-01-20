import { Meta, StoryObj } from '@storybook/react';

import { LandingLayout } from './landing-layout';

const meta: Meta<typeof LandingLayout> = {
  component: LandingLayout,
};

export default meta;

type Story = StoryObj<typeof LandingLayout>;

export const Default: Story = {
  args: {}
};
