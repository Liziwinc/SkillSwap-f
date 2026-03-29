import type { LiHTMLAttributes } from 'react';

export interface TSkill {
  id: string;
  name: string;
}

export interface TSkillElementProps extends LiHTMLAttributes<HTMLLIElement> {
  skill: TSkill;
  link?: string;
  onSkillClick?: (skillId: string) => void;
  onDropdownClose?: () => void;
}