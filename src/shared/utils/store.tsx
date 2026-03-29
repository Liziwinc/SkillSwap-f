import { configureStore } from '@reduxjs/toolkit';
import {
    type TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';
import { combineReducers } from 'redux';
import usersCardsSlice from '../../slice/cardsUserSlice';
import filtersReducer from '../../slice/filtersSlice';
import notificationsReducer from '../../slice/notificationsSlice';
import profileSlice from '../../slice/profileSlice';

export const rootReducer = combineReducers({
    profile: profileSlice,
    usersCards: usersCardsSlice,
    filters: filtersReducer,
    notifications: notificationsReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: import.meta.env.VITE_API_URL != 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;