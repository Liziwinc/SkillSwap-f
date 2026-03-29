import { describe, it, expect } from '@jest/globals';
import filtersReducer, {
  setSkillType,
  setSkillExpert,
  setSkillCity,
  setSkillCategory,
  setSearchQuery,
  cleanFilters,
  setCategoriesIsShow,
  setCategoryIsShowFromAllSkills,
  filtersSelectors
} from '../slice/filtersSlice';
import type { SkillCategory } from '../shared/utils/types';

describe('filtersSlice', () => {
  const initialState = {
    skillCategory: {
      category: [],
      subCategory: []
    },
    skillType: 'all',
    skillExpert: '0',
    skillCity: [],
    categoriesIsShow: {
      'category-1': false,
      'category-2': false,
      'category-3': false,
      'category-4': false,
      'category-5': false,
      'category-6': false
    },
    searchQuery: ''
  };

  describe('reducers', () => {
    it('should handle setSkillType', () => {
      const nextState = filtersReducer(initialState, setSkillType('learn'));
      expect(nextState.skillType).toBe('learn');
    });

    it('should handle setSkillExpert', () => {
      const nextState = filtersReducer(initialState, setSkillExpert('1'));
      expect(nextState.skillExpert).toBe('1');
    });

    it('should handle setSkillCity', () => {
      const cities = ['Москва', 'Санкт-Петербург'];
      const nextState = filtersReducer(initialState, setSkillCity(cities));
      expect(nextState.skillCity).toEqual(cities);
    });

    it('should handle setSkillCategory', () => {
      const category: SkillCategory = {
        id: '1',
        name: 'Программирование',
        icon: 'code',
        skills: [{ id: '1', name: 'JavaScript' }]
      };
      const nextState = filtersReducer(
        initialState,
        setSkillCategory(category)
      );
      expect(nextState.skillCategory).toEqual(category);
    });

    it('should handle setSearchQuery', () => {
      const query = 'JavaScript';
      const nextState = filtersReducer(initialState, setSearchQuery(query));
      expect(nextState.searchQuery).toBe(query);
    });

    it('should handle cleanFilters', () => {
      const stateWithFilters = {
        ...initialState,
        skillType: 'learn',
        skillExpert: '1',
        skillCity: ['Москва']
      };
      const nextState = filtersReducer(stateWithFilters, cleanFilters());
      expect(nextState).toEqual(initialState);
    });

    it('should handle setCategoriesIsShow', () => {
      const nextState = filtersReducer(
        initialState,
        setCategoriesIsShow('category-1')
      );
      expect(nextState.categoriesIsShow['category-1']).toBe(true);
      expect(nextState.categoriesIsShow['category-2']).toBe(false);
    });

    it('should handle setCategoryIsShowFromAllSkills', () => {
      const stateWithOpenCategories = {
        ...initialState,
        categoriesIsShow: {
          ...initialState.categoriesIsShow,
          'category-1': true,
          'category-2': true
        }
      };
      const nextState = filtersReducer(
        stateWithOpenCategories,
        setCategoryIsShowFromAllSkills('category-3')
      );
      expect(nextState.categoriesIsShow['category-1']).toBe(false);
      expect(nextState.categoriesIsShow['category-2']).toBe(false);
      expect(nextState.categoriesIsShow['category-3']).toBe(true);
    });
  });

  describe('selectors', () => {
    const state = {
      filters: {
        ...initialState,
        skillType: 'teach',
        skillExpert: '2',
        skillCity: ['Москва'],
        searchQuery: 'test'
      }
    };

    it('should select skillType', () => {
      expect(filtersSelectors.skillType(state)).toBe('teach');
    });

    it('should select skillExpert', () => {
      expect(filtersSelectors.skillExpert(state)).toBe('2');
    });

    it('should select skillCity', () => {
      expect(filtersSelectors.skillCity(state)).toEqual(['Москва']);
    });

    it('should select searchQuery', () => {
      expect(filtersSelectors.searchQuery(state)).toBe('test');
    });
  });
});
