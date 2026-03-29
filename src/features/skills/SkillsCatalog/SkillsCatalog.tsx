import type { FC } from 'react';
import clsx from 'clsx';
import styles from './SkillsCatalog.module.css';
import type { TSkillsCatalogProps } from './SkillsCatalog.interface';
import { SkillCategory } from '../../../shared/ui/SkillCategory';
import { SkillElement } from '../../../shared/ui/SkillElement';
import { getCategoryColor } from '../../../shared/utils/getCategoryColor';

export const SkillsCatalog: FC<TSkillsCatalogProps> = ({
  categories,
  className,
  onSkillClick,
  onCategoryClick,
  onDropdownClose,
  ...rest
}) => {
  return (
    <div className={clsx(styles.skillsCatalog, className)} {...rest}>
      {categories.map((category) => (
        <SkillCategory
          category={category}
          backgroundColor={getCategoryColor(category.name)}
          key={category.id}
          onDropdownClose={onDropdownClose}
          onCategoryClick={onCategoryClick}
        >
          {category.skills.map((skill) => (
            <SkillElement
              skill={skill}
              key={skill.id}
              onSkillClick={onSkillClick}
              onDropdownClose={onDropdownClose}
            />
          ))}
        </SkillCategory>
      ))}
    </div>
  );
};
