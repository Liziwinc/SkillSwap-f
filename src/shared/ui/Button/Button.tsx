import type { ButtonProps } from './Button.interface';
import styles from './Button.module.css';
import { useState } from 'react';

const Button = ({
  children,
  className,
  width,
  onClick,
  icon,
  disabled,
  iconPosition = 'left',
  toggleMode = false,
  toggledChildren,
  toggledIcon,
  toggledIconPosition,
  toggledClassName,
  isToggled: controlledToggled,
  onToggle,
  classNameNew
}: ButtonProps) => {
  const [internalToggled, setInternalToggled] = useState(false);

  const isToggled =
    controlledToggled !== undefined ? controlledToggled : internalToggled;

  const handleClick = () => {

    if (toggleMode) {
      const newState = !isToggled;
      if (controlledToggled === undefined) {
        setInternalToggled(newState);
      }
      onToggle?.(newState);
    }
    onClick?.();
  };

  // Определяем текущие значения
  const currentChildren =
    toggleMode && isToggled && toggledChildren ? toggledChildren : children;

  const currentIcon =
    toggleMode && isToggled && toggledIcon ? toggledIcon : icon;

  const currentIconPosition =
    toggleMode && isToggled && toggledIconPosition
      ? toggledIconPosition
      : iconPosition;

  const currentClassName =
    toggleMode && isToggled && toggledClassName ? toggledClassName : className;

  const iconContainerClass =
    currentIconPosition === 'left' ? styles.iconLeft : styles.iconRight;

  const buttonStyle = width
    ? { width: typeof width === 'number' ? `${width}px` : width }
    : {};

  return (
    <button
      className={`${styles.button} ${classNameNew || ''} ${currentClassName ? styles[currentClassName] : ''}`}
      style={buttonStyle}
      onClick={handleClick}
      disabled={disabled}
    >
      {currentIcon && <div className={iconContainerClass}>{currentIcon}</div>}
      <div>{currentChildren}</div>
    </button>
  );
};

export default Button;