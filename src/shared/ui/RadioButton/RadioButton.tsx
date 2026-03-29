import React from 'react';
import styles from './RadioButton.module.css';

interface RadioButtonProps {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  name,
  value,
  checked,
  onChange,
}) => {
  return (
    <label className={styles.radio}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className={styles.custom}></span>
      {label}
    </label>
  );
};
