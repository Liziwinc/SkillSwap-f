import type { ReactNode, ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'onClick' | 'onToggle'> {
  className: 'primary' | 'secondary' | 'outline' | 'color' | 'link';
  width?: number | string;
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
  disabled?: boolean;
  iconPosition?: 'left' | 'right';
  toggleMode?: boolean;
  toggledChildren?: ReactNode;
  toggledIcon?: ReactNode;
  toggledIconPosition?: 'left' | 'right';
  toggledClassName?: 'primary' | 'outline';
  isToggled?: boolean;
  onToggle?: (isToggled: boolean) => void;
  classNameNew?: string | '';
}