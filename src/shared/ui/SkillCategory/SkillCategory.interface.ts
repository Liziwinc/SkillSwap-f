import type { HTMLAttributes, ReactNode } from 'react';
import type { TSkill } from '../SkillElement/SkillElement.interface';

export interface TSkillCategory {
  id: string;
  name: string;
  icon: string;
  skills: TSkill[];
}

export interface TSkillCategoryProps extends HTMLAttributes<HTMLDivElement> {
  category: TSkillCategory;
  link?: string;
  backgroundColor: string;
  children: ReactNode;
  onSkillClick?: (skillId: string) => void;
  onDropdownClose?: () => void;
  onCategoryClick?: (skillId: string) => void;
}
