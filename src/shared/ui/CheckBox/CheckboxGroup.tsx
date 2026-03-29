import React from 'react';
import styles from './Checkbox.module.css';
import type { CheckBoxGroupProps } from './Checkbox.interface.ts';

const CheckboxGroup = ({ children, className = '' }: CheckBoxGroupProps) => {
  return (
    <div className={`${styles.checkboxGroup} ${className}`}>
      {children}
    </div>
  );
};

export default CheckboxGroup;