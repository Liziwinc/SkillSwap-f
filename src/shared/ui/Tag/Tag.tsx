import React from "react";
import styles from "./Tag.module.css";
import clsx from "clsx";

interface TagProps {
  label: string;
  backgroundColor?: string;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ label, backgroundColor, className }) => {
  return (
    <p
      className={clsx(styles.tag, className)}
      style={{ backgroundColor }}
    >
      {label}
    </p>
  );
};