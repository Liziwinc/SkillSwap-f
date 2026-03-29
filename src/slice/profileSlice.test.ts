import { describe, it, expect } from '@jest/globals';

jest.mock('../api/skillswap-api', () => ({
  __esModule: true,
  getProfilesApi: jest.fn(),
  getProfileByIdApi: jest.fn(),
  createProfileApi: jest.fn(),
  updateProfileApi: jest.fn(),
  loginProfileApi: jest.fn(),
  getUsersCardsApi: jest.fn(),
  getUsersCardsByIdApi: jest.fn(),
  updateUsersCardsApi: jest.fn(),
  getNewestUsersFirstApi: jest.fn(),
  getPopularUsersFirstApi: jest.fn(),
  getSkillCategoriesApi: jest.fn(),
  getSkillCategoryByIdApi: jest.fn()
}));

import profileReducer, {
  initialState,
  init,
  logout,
  clearError,
  getProfilesThunk,
  getProfileByIdThunk,
  loginProfileThunk,
  createProfileThunk,
  updateProfileThunk
} from './profileSlice';

type TProfile = {
  id: string;
  avatarUrl: string;
  name: string;
  city: string;
  dateOfBirth: string;
  gender: string;
  categoriesWantToLearn: string;
  subcategoriesWantToLearn: string[];
  aboutMe: string;
  skillCanTeachName: string;
  skillCanTeachCategory: string;
  skillCanTeachSubCategory: string;
  skillCanTeachDescription: string;
  images: string[];
  email: string;
  password: string;
  myLikeArr: string[];
  auth: string;
};

const mockProfile: TProfile = {
  id: '1',
  avatarUrl: 'url',
  name: 'Test User',
  city: 'Moscow',
  dateOfBirth: '1990-01-01',
  gender: 'male',
  categoriesWantToLearn: 'Programming',
  subcategoriesWantToLearn: ['JavaScript'],
  aboutMe: 'About me text',
  skillCanTeachName: 'Teaching',
  skillCanTeachCategory: 'Education',
  skillCanTeachSubCategory: 'Tutoring',
  skillCanTeachDescription: 'I can teach',
  images: ['img1.jpg'],
  email: 'test@example.com',
  password: 'password',
  myLikeArr: [],
  auth: 'mock-auth-token'
};

describe('profileSlice', () => {
  describe('reducers', () => {
    it('should handle init', () => {
      const nextState = profileReducer(initialState, init());
      expect(nextState.isInit).toBe(true);
    });

    it('should handle logout', () => {
      const stateWithAuth = {
        ...initialState,
        auth: 'token',
        profile: mockProfile
      };
      const nextState = profileReducer(stateWithAuth, logout());
      expect(nextState.auth).toBe('');
      expect(nextState.profile).toBeNull();
    });

    it('should handle clearError', () => {
      const stateWithError = { ...initialState, error: 'Some error' };
      const nextState = profileReducer(stateWithError, clearError());
      expect(nextState.error).toBeNull();
    });
  });

  describe('extraReducers', () => {
    it('should handle getProfilesThunk.pending', () => {
      const nextState = profileReducer(
        initialState,
        getProfilesThunk.pending('')
      );
      expect(nextState.isLoading).toBe(true);
      expect(nextState.error).toBeNull();
    });

    it('should handle getProfilesThunk.fulfilled', () => {
      const mockProfiles = [mockProfile];
      const nextState = profileReducer(
        initialState,
        getProfilesThunk.fulfilled(mockProfiles, '')
      );
      expect(nextState.isLoading).toBe(false);
      expect(nextState.profilesList).toEqual(mockProfiles);
      expect(nextState.error).toBeNull();
    });

    it('should handle getProfilesThunk.rejected', () => {
      const errorMessage = 'Failed to fetch profiles';
      const nextState = profileReducer(
        initialState,
        getProfilesThunk.rejected(new Error(errorMessage), '')
      );
      expect(nextState.isLoading).toBe(false);
      expect(nextState.error).toBe(errorMessage);
    });

    it('should handle getProfileByIdThunk.pending', () => {
      const nextState = profileReducer(
        initialState,
        getProfileByIdThunk.pending('', '1')
      );
      expect(nextState.isLoading).toBe(true);
      expect(nextState.error).toBeNull();
    });

    it('should handle getProfileByIdThunk.fulfilled', () => {
      const nextState = profileReducer(
        initialState,
        getProfileByIdThunk.fulfilled(mockProfile, '', '1')
      );
      expect(nextState.isLoading).toBe(false);
      expect(nextState.profile).toEqual(mockProfile);
      expect(nextState.error).toBeNull();
    });

    it('should handle getProfileByIdThunk.rejected', () => {
      const errorMessage = 'Profile not found';
      const nextState = profileReducer(
        initialState,
        getProfileByIdThunk.rejected(new Error(errorMessage), '', 'invalid-id')
      );
      expect(nextState.isLoading).toBe(false);
      expect(nextState.error).toBe(errorMessage);
    });

    it('should handle loginProfileThunk.pending', () => {
      const nextState = profileReducer(
        initialState,
        loginProfileThunk.pending('', {
          email: 'test@example.com',
          password: 'password'
        })
      );
      expect(nextState.isLoading).toBe(true);
      expect(nextState.error).toBeNull();
    });

    it('should handle loginProfileThunk.fulfilled', () => {
      const nextState = profileReducer(
        initialState,
        loginProfileThunk.fulfilled(mockProfile, '', {
          email: 'test@example.com',
          password: 'password'
        })
      );
      expect(nextState.isLoading).toBe(false);
      expect(nextState.profile).toEqual(mockProfile);
      expect(nextState.auth).toBe(mockProfile.auth);
      expect(nextState.error).toBeNull();
    });

    it('should handle loginProfileThunk.rejected', () => {
      const errorMessage = 'Invalid credentials';
      const nextState = profileReducer(
        initialState,
        loginProfileThunk.rejected(new Error(errorMessage), '', {
          email: 'wrong@example.com',
          password: 'wrong'
        })
      );
      expect(nextState.isLoading).toBe(false);
      expect(nextState.error).toBe(errorMessage);
    });

    it('should handle createProfileThunk.pending', () => {
      const nextState = profileReducer(
        initialState,
        createProfileThunk.pending('', mockProfile)
      );
      expect(nextState.isLoading).toBe(true);
      expect(nextState.error).toBeNull();
    });

    it('should handle createProfileThunk.fulfilled', () => {
      const nextState = profileReducer(
        initialState,
        createProfileThunk.fulfilled(mockProfile, '', mockProfile)
      );
      expect(nextState.isLoading).toBe(false);
      expect(nextState.profile).toEqual(mockProfile);
      expect(nextState.auth).toBe(mockProfile.auth);
      expect(nextState.profilesList).toContainEqual(mockProfile);
      expect(nextState.error).toBeNull();
    });

    it('should handle createProfileThunk.rejected', () => {
      const errorMessage = 'Email already exists';
      const nextState = profileReducer(
        initialState,
        createProfileThunk.rejected(new Error(errorMessage), '', mockProfile)
      );
      expect(nextState.isLoading).toBe(false);
      expect(nextState.error).toBe(errorMessage);
    });

    it('should handle updateProfileThunk.pending', () => {
      const nextState = profileReducer(
        initialState,
        updateProfileThunk.pending('', {
          id: '1',
          partialData: { name: 'New Name' }
        })
      );
      expect(nextState.isLoading).toBe(true);
      expect(nextState.error).toBeNull();
    });

    it('should handle updateProfileThunk.fulfilled', () => {
      const updatedProfile = { ...mockProfile, name: 'Updated Name' };
      const stateWithProfile = { ...initialState, profilesList: [mockProfile] };
      const nextState = profileReducer(
        stateWithProfile,
        updateProfileThunk.fulfilled(updatedProfile, '', {
          id: '1',
          partialData: { name: 'Updated Name' }
        })
      );
      expect(nextState.isLoading).toBe(false);
      expect(nextState.profile).toEqual(updatedProfile);
      expect(nextState.profilesList[0].name).toBe('Updated Name');
      expect(nextState.error).toBeNull();
    });

    it('should handle updateProfileThunk.rejected', () => {
      const errorMessage = 'Update failed';
      const nextState = profileReducer(
        initialState,
        updateProfileThunk.rejected(new Error(errorMessage), '', {
          id: '1',
          partialData: { name: 'New Name' }
        })
      );
      expect(nextState.isLoading).toBe(false);
      expect(nextState.error).toBe(errorMessage);
    });
  });
});
