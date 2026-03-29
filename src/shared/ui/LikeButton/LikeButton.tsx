import styles from './LikeButton.module.css';
import type { LikeButtonUIProps } from './LikeButton.interaface';

const LikeButtonUI = ({
  className = '',
  showNumberLike,
  numberLikes,
  isActive,
  ...rest}: LikeButtonUIProps) => {

  return (
    <div className={`${styles.card__likeButton_wrapper} ${className}` }>
      <button
      className={`${styles.card__likeButton}`}
      aria-label={isActive ? 'Убрать лайк' : 'Поставить лайк'}
      {...rest}
    >
      <svg width="24" height="24" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.95 1C3.21619 1 1 3.1521 1 5.80682C1 10.6136 6.85 14.9835 10 16C13.15 14.9835 19 10.6136 19 5.80682C19 3.1521 16.7838 1 14.05 1C12.3759 1 10.8958 1.80707 10 3.04238C9.10419 1.80707 7.62414 1 5.95 1Z" fill={isActive ? '#ABD27A' : 'none'} stroke={isActive ? '#ABD27A' : '#253017'} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

    </button>
    {showNumberLike && <p className={`${styles.card__likeButton_number}`}>{numberLikes}</p>}
    </div>
    
  );
};

export default LikeButtonUI;