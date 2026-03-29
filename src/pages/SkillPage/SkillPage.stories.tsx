import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import SkillPage from './SkillPage';
import { store } from '../../shared/utils/store';

const meta: Meta<typeof SkillPage> = {
  title: 'Pages/SkillPage',
  component: SkillPage,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof SkillPage>;

export const Default: Story = {
  render: () => <SkillPage />,
};
