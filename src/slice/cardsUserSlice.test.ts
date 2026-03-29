import { describe, it, expect } from '@jest/globals';

jest.mock('../api/skillswap-api', () => ({
  __esModule: true,
  getUsersCardsApi: jest.fn(),
  getUsersCardsByIdApi: jest.fn(),
  updateUsersCardsApi: jest.fn(),
  getNewestUsersFirstApi: jest.fn(),
  getPopularUsersFirstApi: jest.fn()
}));

import usersCardsReducer, {
  init,
  getUsersCardsThunk,
  getUsersCardsByIdThunk,
  updateUsersCardsThunk,
  getPopularUsersCardsThunk,
  getNewestUsersCardsThunk
} from '../slice/cardsUserSlice';
import type { TUsersCards } from '../shared/utils/types';

describe('cardsUserSlice', () => {
  const initialState = {
    isInit: false,
    isLoading: false,
    usersCards: null,
    usersCard: null,
    error: null
  };

  const mockUserCard: TUsersCards = {
    id: '1',
    createdAt: '2023-01-01',
    name: 'Test User',
    city: 'Moscow',
    age: '30',
    numberLikes: 10,
    subcategoriesCanTeach: 'JavaScript',
    subcategoriesWantLearn: ['UI', 'UX'],
    aboutMe: 'About me text',
    categoriesCanTeach: 'Programming',
    nameCategoriesCanTeach: 'Web Development',
    descriptionCategoriesCanTeach: 'I can teach web development',
    imgArr: ['image1.jpg'],
    avatarURL: 'avatar.jpg',
    gender: 'male'
  };

  describe('reducers', () => {
    it('should handle init', () => {
      const nextState = usersCardsReducer(initialState, init());
      expect(nextState.isInit).toBe(true);
      expect(nextState.isLoading).toBe(false);
      expect(nextState.error).toBeNull();
    });
  });

  describe('extraReducers', () => {
    it('should handle getUsersCardsThunk.pending', () => {
      const nextState = usersCardsReducer(
        initialState,
        getUsersCardsThunk.pending('')
      );
      expect(nextState.isLoading).toBe(true);
      expect(nextState.error).toBeNull();
    });

    it('should handle getUsersCardsThunk.fulfilled', () => {
      const mockCards = [mockUserCard];
      const nextState = usersCardsReducer(
        initialState,
        getUsersCardsThunk.fulfilled(mockCards, '')
      );
      expect(nextState.isLoading).toBe(false);
      expect(nextState.usersCards).toEqual(mockCards);
      expect(nextState.error).toBeNull();
    });

    it('should handle getUsersCardsThunk.rejected', () => {
      const errorMessage = 'Failed to fetch users cards';
      const nextState = usersCardsReducer(
        initialState,
        getUsersCardsThunk.rejected(new Error(errorMessage), '')
      );
      expect(nextState.isLoading).toBe(false);
      expect(nextState.error).toBe(errorMessage);
      expect(nextState.usersCards).toBeNull();
    });

    it('should handle getUsersCardsByIdThunk.pending', () => {
      const nextState = usersCardsReducer(
        initialState,
        getUsersCardsByIdThunk.pending('', '1')
      );
      expect(nextState.isLoading).toBe(true);
      expect(nextState.error).toBeNull();
    });

    it('should handle getUsersCardsByIdThunk.fulfilled', () => {
      const nextState = usersCardsReducer(
        initialState,
        getUsersCardsByIdThunk.fulfilled(mockUserCard, '', '1')
      );
      expect(nextState.isLoading).toBe(false);
      expect(nextState.usersCard).toEqual(mockUserCard);
      expect(nextState.error).toBeNull();
    });

    it('should handle getUsersCardsByIdThunk.rejected', () => {
      const errorMessage = 'User not found';
      const nextState = usersCardsReducer(
        initialState,
        getUsersCardsByIdThunk.rejected(new Error(errorMessage), '', '999')
      );
      expect(nextState.isLoading).toBe(false);
      expect(nextState.error).toBe(errorMessage);
      expect(nextState.usersCard).toBeNull();
    });

    it('should handle updateUsersCardsThunk.pending', () => {
      const nextState = usersCardsReducer(
        initialState,
        updateUsersCardsThunk.pending('', { id: '1', partialData: {} })
      );
      expect(nextState.isLoading).toBe(true);
      expect(nextState.error).toBeNull();
    });

    it('should handle updateUsersCardsThunk.rejected', () => {
      const errorMessage = 'Update failed';
      const nextState = usersCardsReducer(
        initialState,
        updateUsersCardsThunk.rejected(new Error(errorMessage), '', {
          id: '1',
          partialData: { name: 'New Name' }
        })
      );
      expect(nextState.isLoading).toBe(false);
      expect(nextState.error).toBe(errorMessage);
    });

    it('should handle getPopularUsersCardsThunk.pending', () => {
      const nextState = usersCardsReducer(
        initialState,
        getPopularUsersCardsThunk.pending('')
      );
      expect(nextState.isLoading).toBe(true);
      expect(nextState.error).toBeNull();
    });

    it('should handle getPopularUsersCardsThunk.fulfilled', () => {
      const mockCards = [mockUserCard];
      const nextState = usersCardsReducer(
        initialState,
        getPopularUsersCardsThunk.fulfilled(mockCards, '')
      );
      expect(nextState.isLoading).toBe(false);
      expect(nextState.usersCards).toEqual(mockCards);
      expect(nextState.error).toBeNull();
    });

    it('should handle getPopularUsersCardsThunk.rejected', () => {
      const errorMessage = 'Server error';
      const nextState = usersCardsReducer(
        initialState,
        getPopularUsersCardsThunk.rejected(new Error(errorMessage), '')
      );
      expect(nextState.isLoading).toBe(false);
      expect(nextState.error).toBe(errorMessage);
    });

    it('should handle getNewestUsersCardsThunk.pending', () => {
      const nextState = usersCardsReducer(
        initialState,
        getNewestUsersCardsThunk.pending('')
      );
      expect(nextState.isLoading).toBe(true);
      expect(nextState.error).toBeNull();
    });

    it('should handle getNewestUsersCardsThunk.fulfilled', () => {
      const mockCards = [mockUserCard];
      const nextState = usersCardsReducer(
        initialState,
        getNewestUsersCardsThunk.fulfilled(mockCards, '')
      );
      expect(nextState.isLoading).toBe(false);
      expect(nextState.usersCards).toEqual(mockCards);
      expect(nextState.error).toBeNull();
    });

    it('should handle getNewestUsersCardsThunk.rejected', () => {
      const errorMessage = 'Network error';
      const nextState = usersCardsReducer(
        initialState,
        getNewestUsersCardsThunk.rejected(new Error(errorMessage), '')
      );
      expect(nextState.isLoading).toBe(false);
      expect(nextState.error).toBe(errorMessage);
    });
  });
});
