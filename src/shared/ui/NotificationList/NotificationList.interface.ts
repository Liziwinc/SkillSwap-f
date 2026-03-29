import type { Notification } from '../NotificationItem/NotificationItem.interface';

export interface NotificationListProps {
  notifications: Notification[];
  markAllRead: () => void;
  clearRead: () => void;
}