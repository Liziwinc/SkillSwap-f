import type { TSkillCategory } from "../../../shared/ui/SkillCategory/SkillCategory.interface";

export interface TSkillsCatalogProps extends React.HTMLAttributes<HTMLDivElement> {
  categories: TSkillCategory[];
  link?: string;
  onSkillClick?: (skillId: string) => void;
  onCategoryClick?: (skillId: string) => void;
  onDropdownClose?: () => void;
}