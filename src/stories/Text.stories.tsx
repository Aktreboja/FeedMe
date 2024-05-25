import { Meta, StoryObj } from '@storybook/react/*';

import Text from './Text';

const meta: Meta<typeof Text> = {
  title: 'Test/Text',
  component: Text,
};

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Caution: Story = {};

export default meta;
