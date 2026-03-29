import React, { useState } from 'react';
import type { InputProps } from './Input.interface';
import styles from './Input.module.css';
import CloseEyeIcon from '../../../assets/icons/eye-slash.svg';
import EyeIcon from '../../../assets/icons/eye.svg';

const Input: React.FC<InputProps> = ({
  id,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  className = ''
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordInput = type === 'password';
  const inputType = isPasswordInput && showPassword ? 'text' : type;

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        id={id}
        type={inputType}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`${styles.input} ${className}`}
      />
      {isPasswordInput && (
        <button
          type='button'
          className={styles.togglePasswordButton}
          onClick={handleTogglePassword}
        >
          {showPassword ? <EyeIcon /> : <CloseEyeIcon />}
        </button>
      )}
    </div>
  );
};

export default Input;
