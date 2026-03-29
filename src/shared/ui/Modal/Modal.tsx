import { useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import styles from './modal.module.css';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  icon?: React.ReactNode;
  title: string;
  message: string;
  primaryButton?: string;
  secondaryButton?: string;
  onPrimaryClick?: () => void;
  children?: ReactNode;
};

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  icon,
  title,
  message,
  primaryButton = 'Войти',
  secondaryButton = 'Отмена',
  onPrimaryClick,
  children
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        
        {icon && <div className={styles.image}>{icon}</div>}
        {!children && 
          <>
            <div className={styles.header}>
              <h1 className={styles.title}>{title}</h1>
              <p className={styles.message}>{message}</p>
            </div>

            <div className={styles.buttons}>
              <button
                className={`${styles.button} ${styles.buttonCancel}`}
                onClick={onClose}
              >
                {secondaryButton}
              </button>
              <button
                className={`${styles.button} ${styles.buttonPrimary}`}
                onClick={onPrimaryClick || onClose}
              >
                {primaryButton}
              </button>
            </div>
          </>
        }
        
        {children}
      </div>
    </div>
  );
};

export default Modal;
