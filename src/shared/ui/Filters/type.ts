import type { SkillCategory } from "../../utils/types";

export type SkillCategoryWithoutIcon = Omit<SkillCategory, 'icon'>;

export type CategoryKey = 'category-1' | 'category-2' | 'category-3' | 'category-4' | 'category-5' | 'category-6';

export type IShowState = {
    [key in CategoryKey]: boolean;
};

export type CategoryId = keyof IShowState;

export interface ICity {
    id: string;
    name: string;
};

export interface ISubCategory {
    id: string;
    name: string;
};