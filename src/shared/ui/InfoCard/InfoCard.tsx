import React from 'react';
import styles from './InfoCard.module.css';
import type { InfoCardProps } from './InfoCard.interface';

const InfoCard: React.FC<InfoCardProps> = ({
  imageSrc,
  imageAlt,
  title,
  text,
  buttons,
  className = ''
}) => {
  return (
    <div className={`${styles.card} ${className}`}>
      <img src={imageSrc} alt={imageAlt} className={styles.image} />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
      {buttons && <div className={styles.buttons}>{buttons}</div>}
    </div>
  );
};

export default InfoCard;