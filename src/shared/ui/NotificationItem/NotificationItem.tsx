import IdeaIcon from '../../../assets/icons/idea.svg';
import Button from '../Button/Button';
import styles from './NotificationItem.module.css';
import type { NotificationItemProps } from './NotificationItem.interface';
import clsx from 'clsx';

function NotificationItem({
  notification: { user, message, subText, date, onAction },
}: NotificationItemProps) {
  return (
    <div className={styles.item}>
      <div className={styles.row}>
        <div className={styles.main}>
          <div className={styles.icon}>
            <IdeaIcon />
          </div>
          <div className={styles.content}>
            <div className={styles.title}>
              {user} {message}
            </div>
            <div className={clsx(styles.subText, 'caption')}>{subText}</div>
          </div>
        </div>
        <div className={styles.date}>{date}</div>
      </div>

      {onAction && (
        <div className={styles.button}>
          <Button className="primary" onClick={onAction}>
            Перейти
          </Button>
        </div>
      )}
    </div>
  );
}

export default NotificationItem;
