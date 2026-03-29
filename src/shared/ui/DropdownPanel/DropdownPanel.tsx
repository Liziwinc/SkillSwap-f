import React, { useEffect, useRef, useState } from 'react';
import type { DropdownPanelProps } from './DropdownPanel.interface';
import styles from './DropdownPanel.module.css';

export const DropdownPanel: React.FC<DropdownPanelProps> = ({
  trigger,
  children,
  align = 'right',
  wide = false,
  onClose,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (isOpen) setIsRendered(true);
    else {
      timeoutRef.current = window.setTimeout(() => {
        setIsRendered(false);
      }, 0);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, [isOpen]);

  // Закрываем дропдаун и вызываем колбэк
  const closeDropdown = () => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  // Клонируем children и передаем функцию закрытия
  const childrenWithClose = React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement<any>, {
        onDropdownClose: closeDropdown
      })
    : children;

  return (
    <div className={styles.container} ref={dropdownRef}>
      <div onClick={() => setIsOpen((prev) => !prev)}>{trigger}</div>
      {isRendered && (
        <div
          className={[
            styles.dropdown,
            styles[align],
            wide ? styles.wide : '',
            isOpen ? styles.open : styles.close,
            className || ''
          ].join(' ')}
        >
          {childrenWithClose}
        </div>
      )}
    </div>
  );
};
