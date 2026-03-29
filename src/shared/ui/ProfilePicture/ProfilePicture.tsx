import React from 'react';
import styles from './ProfilePicture.module.css';

type ProfilePictureSize = 'small' | 'medium' | 'large';

interface ProfilePictureProps {
  src: string;
  alt: string;
  size: ProfilePictureSize;
  className?: string; 
}

export const ProfilePicture: React.FC<ProfilePictureProps> = ({
  src,
  alt,
  size,
  className = ''
}) => {
  const classNames = `${styles['profile-picture']} ${styles[`profile-picture--${size}`]} ${className}`;

  return <img src={src} alt={alt} className={classNames} />;
};