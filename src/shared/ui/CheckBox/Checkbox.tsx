import React, { useEffect, useState } from 'react';
import type { CheckBoxProps } from './Checkbox.interface.ts';
import styles from './Checkbox.module.css';

const Checkbox = ({
                    id,
                    label,
                    checked = false,
                    indeterminate = false,
                    onChange,
                    className = '',
                    children,
                    parentCheckbox = false
                  }: CheckBoxProps) => {
  const [isChecked, setIsChecked] = useState(checked);
  useEffect(() => setIsChecked(checked), [checked]);

  const checkboxClass = [
    styles.checkbox,
    isChecked ? styles.checked : '',
    indeterminate ? styles.indeterminate : '',
    parentCheckbox ? styles.parent : '',
    className
  ]
    .filter(Boolean)
    .join(' ');

  const CheckIcon = () => (
    <svg
      className={styles.checkIcon}
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );

  const IndeterminateIcon = () => (
    <svg
      className={styles.indeterminateIcon}
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div className={styles.checkboxWrapper}>
      <label className={styles.checkboxLabel} htmlFor={id}>
        <input
          type="checkbox"
          id={id}
          checked={isChecked}
          onChange={onChange}
          className={styles.hiddenInput}
        />
        <div className={checkboxClass}>
          {indeterminate ? (
            <IndeterminateIcon />
          ) : isChecked ? (
            <CheckIcon />
          ) : null}
        </div>
        <span className={styles.labelText}>{label}</span>
      </label>

      {children && (
        <div className={styles.childrenContainer}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Checkbox;