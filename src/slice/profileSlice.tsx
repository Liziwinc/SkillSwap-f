
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { TProfile } from '../shared/utils/types';
import {
  getProfilesApi,
  getProfileByIdApi,
  createProfileApi,
  updateProfileApi,
  loginProfileApi
} from '../api/skillswap-api';

export interface UsersCardsState {
  isInit: boolean;
  isLoading: boolean;
  profile: TProfile | null;
  profilesList: TProfile[];
  error: string | null;
  auth: string | '';
}

export const initialState: UsersCardsState = {
  isInit: false,
  isLoading: false,
  profile: null,
  profilesList: [],
  error: null,
  auth: ''
};

export const getProfilesThunk = createAsyncThunk<TProfile[]>(
  'profile/getProfilesAll',
  getProfilesApi
);

export const getProfileByIdThunk = createAsyncThunk<TProfile, string>(
  'profile/getProfileById',
  async (id: string) => {
    const response = await getProfileByIdApi(id);
    return response;
  }
);

export const loginProfileThunk = createAsyncThunk<
  TProfile,
  { email: string; password: string }
>('profile/login', async ({ email, password }) => {
  const response = await loginProfileApi({ email, password });
  return response;
});

export const createProfileThunk = createAsyncThunk<
  TProfile,
  Omit<TProfile, 'id' | 'auth'>
>('profile/register', async (data) => {
  const response = await createProfileApi(data);
  return response;
});

export const updateProfileThunk = createAsyncThunk<
  TProfile,
  { id: string; partialData: Partial<TProfile> }
>('profile/updateInfo', async (payload) => {
  const { id, partialData } = payload;
  const response = await updateProfileApi(id, partialData);
  return response;
});

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    init: (state) => {
      state.isInit = true;
    },
    initFromStorage: (state, action) => {
      const { auth, profile } = action.payload;
      state.auth = auth;
      state.profile = profile;
      state.isInit = true;
    },
    logout: (state) => {
      state.auth = '';
      state.profile = null;
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('userProfile');
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfilesThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProfilesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message ||
          'ошибка при получении списка всех пользователей';
      })
      .addCase(getProfilesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profilesList = action.payload;
      })

      .addCase(getProfileByIdThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProfileByIdThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'ошибка при получении профиля по ид';
      })
      .addCase(getProfileByIdThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })

      .addCase(loginProfileThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginProfileThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'ошибка при логине';
      })
      .addCase(loginProfileThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.profile = action.payload;
        state.auth = action.payload.auth;

        // Сохраняем в sessionStorage при успешном логине
        try {
          sessionStorage.setItem('authToken', action.payload.auth);
          sessionStorage.setItem('userProfile', JSON.stringify(action.payload));
        } catch (error) {
          console.error('Ошибка сохранения в sessionStorage:', error);
        }
      })

      .addCase(createProfileThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProfileThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'ошибка при регистрации';
      })
      .addCase(createProfileThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
        state.auth = action.payload.auth;
        state.profilesList = [...state.profilesList, action.payload];

        // Сохраняем в sessionStorage при регистрации
        try {
          sessionStorage.setItem('authToken', action.payload.auth);
          sessionStorage.setItem('userProfile', JSON.stringify(action.payload));
        } catch (error) {
          console.error('Ошибка сохранения при регистрации:', error);
        }
      })

      .addCase(updateProfileThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'ошибка при изменении данных пользователя';
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
        state.profilesList = state.profilesList.map((profile) =>
          profile.id === action.payload.id ? action.payload : profile
        );

        // Обновляем профиль в sessionStorage при изменении данных
        if (state.auth === action.payload.auth) {
          sessionStorage.setItem('userProfile', JSON.stringify(action.payload));
        }
      });
  }
});

export const { init, logout, clearError, initFromStorage } = profileSlice.actions;
export default profileSlice.reducer;