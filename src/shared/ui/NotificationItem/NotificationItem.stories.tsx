import type { Meta, StoryObj } from '@storybook/react';
import NotificationItem from './NotificationItem';
import type { Notification } from './NotificationItem.interface';

const meta = {
  title: 'Shared/UI/NotificationItem',
  component: NotificationItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Отдельный элемент списка уведомлений с пользователем, текстом и датой.'
      }
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof NotificationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseNotification: Notification = {
  id: '1',
  user: 'Иван',
  message: 'оставил отзыв на ваш курс',
  subText: 'Перейдите, чтобы прочитать',
  date: 'сегодня',
  isRead: false,
  onAction: () => console.log('action')
};

export const Unread: Story = {
  args: {
    notification: baseNotification
  }
};

export const Read: Story = {
  args: {
    notification: { ...baseNotification, isRead: true }
  }
};

export const WithAction: Story = {
  args: {
    notification: baseNotification
  },
  parameters: {
    docs: {
      description: {
        story: 'Элемент уведомления с кнопкой действия'
      }
    }
  }
};