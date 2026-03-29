import type { FC } from 'react';
import type { NotificationBellProps } from './NotificationBell.interface.ts';
import NotificationIcon from '../../../assets/icons/notification.svg';
import styles from './NotificationBell.module.css';

const NotificationBell: FC<NotificationBellProps> = ({
  hasNotifications = false,
  onClick
}) => {
  return (
    <div className={styles.notificationBell} onClick={onClick}>
      <NotificationIcon />
      {hasNotifications && <div className={styles.dot}/>}
    </div>
  );
};

export default NotificationBell;
