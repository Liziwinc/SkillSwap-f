import NotificationItem from '../NotificationItem/NotificationItem';
import Button from '../Button/Button';
import styles from './NotificationList.module.css';
import type { NotificationListProps } from './NotificationList.interface';
import type { Notification } from '../NotificationItem/NotificationItem.interface';

function NotificationList({
  notifications,
  markAllRead,
  clearRead,
}: NotificationListProps) {
  const { newNotifications, readNotifications } = notifications.reduce(
    (acc, n) => {
      (n.isRead ? acc.readNotifications : acc.newNotifications).push(n);
      return acc;
    },
    {
      newNotifications: [] as Notification[],
      readNotifications: [] as Notification[],
    }
  );

  const sections = [
    {
      title: 'Новые уведомления',
      items: newNotifications,
      actionLabel: 'Прочитать все',
      action: markAllRead,
    },
    {
      title: 'Просмотренные',
      items: readNotifications,
      actionLabel: 'Очистить',
      action: clearRead,
    },
  ];

  return (
    <div className={styles.panel}>
      {sections.map(({ title, items, actionLabel, action }) => (
        <div className={styles.section} key={title}>
          <div className={styles.header}>
            <span>{title}</span>
            {items.length > 0 && (
              <Button className="link" onClick={action}>
                {actionLabel}
              </Button>
            )}
          </div>
          <div className={styles.list}>
            {items.map((n) => (
              <NotificationItem key={n.id} notification={n} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotificationList;