import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    getNewestUsersFirstApi,
    getPopularUsersFirstApi,
    getUsersCardsApi,
    getUsersCardsByIdApi,
    updateUsersCardsApi
} from '../api/skillswap-api';
import type { TUsersCards } from '../shared/utils/types';

export interface UsersCardsState {
    isInit: boolean;
    isLoading: boolean;
    usersCards: TUsersCards[] | null;
    usersCard:TUsersCards | null;
    error: string | null;
}

export const initialState: UsersCardsState = {
    isInit: false,
    isLoading: false,
    usersCards: null,
    usersCard: null,
    error: null
}

export const getUsersCardsThunk = createAsyncThunk<TUsersCards[]>('usersCards/getCards', getUsersCardsApi);

export const getUsersCardsByIdThunk = createAsyncThunk<TUsersCards, string>(
    'usersCards/getCardById',
    async (id:string) => {
        const response = await getUsersCardsByIdApi(id);
        return response;
    }
);

export const updateUsersCardsThunk = createAsyncThunk<TUsersCards, { id: string; partialData: Partial<TUsersCards> }>(
    'usersCards/updateInfo',
    async (payload) => {
        const { id, partialData } = payload; 
        const response = await updateUsersCardsApi(id, partialData); 
        return response;
    }
);

export const getPopularUsersCardsThunk = createAsyncThunk<TUsersCards[]>('usersCards/popular', getPopularUsersFirstApi);

export const getNewestUsersCardsThunk = createAsyncThunk<TUsersCards[]>('usersCards/newest', getNewestUsersFirstApi);

export const usersCardsSlice = createSlice({
    name: 'usersCards',
    initialState,
    reducers: {
        init: (state) => {
        state.isInit = true;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getUsersCardsThunk.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getUsersCardsThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'ошибка при получении пользователей';
        })
        .addCase(getUsersCardsThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.usersCards = action.payload
        })
        .addCase(getUsersCardsByIdThunk.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getUsersCardsByIdThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'ошибка при получении пользователя по ид';
        })
        .addCase(getUsersCardsByIdThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.usersCard = action.payload;
        })
        .addCase(updateUsersCardsThunk.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(updateUsersCardsThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'ошибка при внесении изменений в карточку пользователей';
        })
        .addCase(updateUsersCardsThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.usersCard = action.payload;
        })
        .addCase(getPopularUsersCardsThunk.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getPopularUsersCardsThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'ошибка при загрузке новых пользователей';
        })
        .addCase(getPopularUsersCardsThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.usersCards = action.payload
        })
        .addCase(getNewestUsersCardsThunk.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getNewestUsersCardsThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'ошибка при загрузке популярных пользователей';
        })
        .addCase(getNewestUsersCardsThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.usersCards = action.payload
        })
    }
});

export const { init } = usersCardsSlice.actions;

export default usersCardsSlice.reducer;