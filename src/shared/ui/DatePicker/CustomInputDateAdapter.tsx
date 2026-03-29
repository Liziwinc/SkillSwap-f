import React, { forwardRef } from "react";
import styles from "./CustomInputDateAdapter.module.css";

interface InputDateAdapterProps {
  value?: string;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  profileStyle?: boolean;
}

const InputDateAdapter = forwardRef<HTMLInputElement, InputDateAdapterProps>(
  ({ value, onClick, onChange, placeholder, profileStyle = false }, ref) => {
    return (
      <div
        className={profileStyle ? styles.profileInput : styles.container}
        onClick={onClick}
      >
        <input
          ref={ref}
          value={value ?? ""}
          onChange={onChange}
          placeholder={placeholder}
          className={styles.input}
          readOnly
        />
        {!profileStyle && (
          <img src='src/assets/icons/calendar.svg' alt="Календарь" className={styles.icon} />
        )}
      </div>
    );
  }
);

InputDateAdapter.displayName = "InputDateAdapter";

export default InputDateAdapter;
