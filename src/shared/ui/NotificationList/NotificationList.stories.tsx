import type { Meta, StoryObj } from '@storybook/react';
import NotificationList from './NotificationList';
import type { Notification } from '../NotificationItem/NotificationItem.interface';

const meta = {
  title: 'Shared/UI/NotificationList',
  component: NotificationList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Панель уведомлений с разделением на новые и прочитанные.'
      }
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof NotificationList>;

export default meta;
type Story = StoryObj<typeof meta>;

const notifications: Notification[] = [
  {
    id: '1',
    user: 'Николай',
    message: 'принял ваш обмен',
    subText: 'Перейдите в профиль, чтобы обсудить детали',
    date: 'сегодня',
    isRead: false,
    onAction: () => console.log('action 1')
  },
  {
    id: '2',
    user: 'Татьяна',
    message: 'предлагает вам обмен',
    subText: 'Примите обмен, чтобы обсудить детали',
    date: 'сегодня',
    isRead: false,
    onAction: () => console.log('action 2')
  },
  {
    id: '3',
    user: 'Олег',
    message: 'предлагает вам обмен',
    subText: 'Примите обмен, чтобы обсудить детали',
    date: 'вчера',
    isRead: true
  },
  {
    id: '4',
    user: 'Игорь',
    message: 'принял ваш обмен',
    subText: 'Перейдите в профиль, чтобы обсудить детали',
    date: '23 мая',
    isRead: true
  }
];

export const Default: Story = {
  args: {
    notifications,
    markAllRead: () => console.log('markAllRead'),
    clearRead: () => console.log('clearRead')
  }
};

export const Empty: Story = {
  args: {
    notifications: [],
    markAllRead: () => console.log('markAllRead'),
    clearRead: () => console.log('clearRead')
  }
};