import React from 'react';
import styles from './PopUpNotification.module.css';
interface NotificationProps {
  message: string;
  onClose: () => void;
  onTo: () => void;
}

export const Notification: React.FC<NotificationProps> = ({
  message,
  onClose,
  onTo
}) => {
  return (
    <div className={styles.notification}>
      <div className={styles.content}>
        <div className={styles.iconContainer}>
          <svg
            className={styles.iconLightbulb}
            width='20'
            height='20'
            viewBox='0 0 22 22'
            stroke='#253017'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M5.09 13.998C4.70066 13.118 4.49969 12.1663 4.5 11.204C4.5 7.49905 7.41 4.49805 11 4.49805C14.59 4.49805 17.5 7.50005 17.5 11.204C17.5003 12.1663 17.2993 13.118 16.91 13.998M11 0.998047V1.99805M21 10.998H20M2 10.998H1M18.07 3.92705L17.363 4.63405M4.637 4.63505L3.93 3.92805M13.517 18.305C14.527 17.978 14.933 17.053 15.047 16.123C15.081 15.845 14.852 15.614 14.572 15.614H7.477C7.40862 15.613 7.3408 15.6264 7.278 15.6535C7.21521 15.6806 7.15888 15.7207 7.11275 15.7712C7.06662 15.8216 7.03173 15.8813 7.0104 15.9463C6.98906 16.0113 6.98177 16.08 6.989 16.148C7.101 17.076 7.383 17.754 8.453 18.304M13.517 18.305L8.453 18.304M13.517 18.305C13.396 20.25 12.834 21.02 11.007 20.998C9.053 21.034 8.603 20.081 8.453 18.304' />
          </svg>
        </div>
        <span className={styles.message}>{message}</span>
      </div>

      <button
        className={styles.closeButton}
        onClick={onClose}
        aria-label='Закрыть уведомление'
      >
        <svg
          className={styles.iconClose}
          width='11'
          height='10'
          viewBox='0 0 11 10'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M10.7442 1.28919L2.25896 9.77447C1.96905 10.0644 1.48821 10.0644 1.1983 9.77447C0.908385 9.48456 0.908385 9.00372 1.1983 8.71381L9.68358 0.228528C9.9735 -0.0613857 10.4543 -0.0613858 10.7442 0.228528C11.0342 0.518442 11.0342 0.999274 10.7442 1.28919Z' />
          <path d='M10.7442 9.77343C10.4543 10.0633 9.9735 10.0633 9.68358 9.77343L1.1983 1.28814C0.908385 0.998229 0.908385 0.517396 1.1983 0.227482C1.48821 -0.0624313 1.96905 -0.0624313 2.25896 0.227483L10.7442 8.71277C11.0342 9.00268 11.0342 9.48351 10.7442 9.77343Z' />
        </svg>
      </button>
      <button
        className={styles.goToButton}
        onClick={onTo}
        aria-label='Закрыть уведомление и перейти'
      >
        <span>перейти</span>
      </button>
    </div>
  );
};
