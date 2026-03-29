import type { ReactNode } from 'react';

export interface DropdownPanelProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: 'right' | 'left';
  wide?: boolean;
  onClose?: () => void;
  className?: string;
}
