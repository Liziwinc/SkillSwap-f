import type { ReactNode } from 'react';

export interface CheckBoxProps {
  id: string;
  label: string;
  checked?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  indeterminate?: boolean;
  className?: string;
  children?: ReactNode;
  parentCheckbox?: boolean;
}

export interface CheckBoxGroupProps {
  children: ReactNode;
  className?: string;
}