import { createSlice } from '@reduxjs/toolkit';
import type { SkillCategory } from '../shared/ui/CategoryFilter/CategoryFilter';
import type { CategoryKey, IShowState } from '../shared/ui/Filters/type';

interface FiltersState {
  skillType: string;
  skillCategory: SkillCategory;
  skillExpert: string;
  skillCity: string[];
  categoriesIsShow: IShowState;
  searchQuery: string; //поиск по навыкам
}

const initialCategory = {
  category: [],
  subCategory: [],
};

const initialCategoriesIsShow = {
  'category-1': false,
  'category-2': false,
  'category-3': false,
  'category-4': false,
  'category-5': false,
  'category-6': false,
}

const initialState: FiltersState = {
  skillCategory: initialCategory,
  skillType: 'all',
  skillExpert: '0',
  skillCity: [],
  categoriesIsShow: initialCategoriesIsShow,
  searchQuery: '' // Инициализация пустой строкой
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSkillCategory: (state, action) => {
      state.skillCategory = action.payload;
    },
    setSkillType: (state, action) => {
      state.skillType = action.payload;
    },
    setSkillExpert: (state, action) => {
      state.skillExpert = action.payload;
    },
    setSkillCity: (state, action) => {
      state.skillCity = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setCategoriesIsShow: (state, action) => {
      const newStateCategory = !state.categoriesIsShow[action.payload as CategoryKey];
      const newState = {...state.categoriesIsShow, [action.payload as CategoryKey]: newStateCategory}
      state.categoriesIsShow = newState;
    },
    setCategoryIsShowFromAllSkills: (state, action) => {
      const newStateCategory = !state.categoriesIsShow[action.payload as CategoryKey];
      const newState = {...initialCategoriesIsShow, [action.payload as CategoryKey]: newStateCategory}
      state.categoriesIsShow = newState;
    },
    cleanFilters: () => {
      return initialState;
    },
  },
  selectors: {
    skillType: (state) => state.skillType,
    skillCategory: (state) => state.skillCategory,
    skillExpert: (state) => state.skillExpert,
    skillCity: (state) => state.skillCity,
    categoriesIsShow: (state) => state.categoriesIsShow,
    searchQuery: (state) => state.searchQuery,
  }
});

export const { setSkillCategory, setSkillExpert, setSkillCity, setSkillType, setCategoriesIsShow, setCategoryIsShowFromAllSkills, setSearchQuery, cleanFilters } = filtersSlice.actions;
export const filtersSelectors = filtersSlice.selectors;
export default filtersSlice.reducer;