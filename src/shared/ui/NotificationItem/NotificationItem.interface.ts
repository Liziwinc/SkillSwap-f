export type Notification = {
  id: string;
  user: string;
  message: string;
  subText: string;
  date: string;
  isRead: boolean;
  onAction?: () => void;
};

export interface NotificationItemProps {
  notification: Notification;
}