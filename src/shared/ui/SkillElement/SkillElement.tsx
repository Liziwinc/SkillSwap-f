import type { FC } from 'react';
import clsx from 'clsx';
import styles from './SkillElement.module.css';
import type { TSkillElementProps } from './SkillElement.interface';

export const SkillElement: FC<TSkillElementProps> = ({
  skill,
  className,
  onSkillClick,
  onDropdownClose,
  link,
  ...rest
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onSkillClick) {
      e.preventDefault();
      e.stopPropagation();

      // Сначала закрываем дропдаун
      if (onDropdownClose) {
        onDropdownClose();
      }

      // Затем выполняем навигацию
      onSkillClick(skill.id);
    }
  };

  return (
    <li
      className={clsx(styles.skillsTitle, className)}
      data-skill-id={skill.id}
      {...rest}
    >
      <a
        href={link || `${skill.id}`}
        className={styles.skillsLink}
        onClick={handleClick}
      >
        {skill.name}
      </a>
    </li>
  );
};
