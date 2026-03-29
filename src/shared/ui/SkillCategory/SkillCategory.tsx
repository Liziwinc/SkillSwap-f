import type { FC } from 'react';
import clsx from 'clsx';
import styles from './SkillCategory.module.css';
import type { TSkillCategoryProps } from './SkillCategory.interface';

export const SkillCategory: FC<TSkillCategoryProps> = ({
  category,
  backgroundColor,
  children,
  className,
  onCategoryClick,
  onDropdownClose,
  ...rest
}) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

      // Сначала закрываем дропдаун
      if (onDropdownClose) {
        onDropdownClose();
      }
    if (onCategoryClick) {
      onCategoryClick(category.id);
    }
  };

  return (
  <div className={clsx(styles.skills, className)} {...rest}>
    <div onClick={handleClick} className={styles.skillsCategory} data-category-id={category.id}>
      <img
        src={category.icon}
        className={styles.skillsCategoryIcon}
        style={{ background: backgroundColor }}
        aria-hidden='true'
      />
      <h2 className={styles.skillsCategoryTitle}>{category.name}</h2>
    </div>
    <ul className={styles.skillsList}>
      {children}
    </ul>
  </div>
  )
};
