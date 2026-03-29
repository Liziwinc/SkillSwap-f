import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './LoginPage';

const meta: Meta<typeof LoginPage> = {
  title: 'Pages/LoginPage',
  component: LoginPage,
  decorators: [
    (StoryFn) => (
      <MemoryRouter>
        <StoryFn />
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof LoginPage>;

export const Default: Story = {
  render: () => <LoginPage />,
};
