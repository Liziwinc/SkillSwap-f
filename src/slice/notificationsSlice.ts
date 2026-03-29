import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

// Простая функция для генерации уникальных ID
const generateId = () => Math.random().toString(36).substr(2, 9);

export type Notification = {
  id: string;
  user: string;
  message: string;
  subText: string;
  date: string;
  isRead: boolean;
  onAction?: () => void;
};

export type Popup = {
  id: string;
  message: string;
};

interface NotificationsState {
  notifications: Notification[];
  popups: Popup[];
}

const initialState: NotificationsState = {
  notifications: [],
  popups: [],
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'isRead' | 'date'>>) => {
      state.notifications.unshift({
        ...action.payload,
        id: generateId(),
        isRead: false,
        date: new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      });
    },
    removeNotification: (state, action: PayloadAction<{ id: string }>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload.id);
    },
    markAsRead: (state, action: PayloadAction<{ id: string }>) => {
      const notification = state.notifications.find(n => n.id === action.payload.id);
      if (notification) {
        notification.isRead = true;
      }
    },
    markAllRead: (state) => {
      state.notifications.forEach(n => n.isRead = true);
    },
    clearRead: (state) => {
      state.notifications = state.notifications.filter(n => !n.isRead);
    },
    addPopup: (state, action: PayloadAction<{ message: string; id?: string }>) => {
      const newPopup = { id: action.payload.id || generateId(), message: action.payload.message };
      state.popups.push(newPopup);
    },
    removePopup: (state, action: PayloadAction<{ id: string }>) => {
      state.popups = state.popups.filter(p => p.id !== action.payload.id);
    },
  },
});

export const { 
  addNotification, 
  removeNotification, 
  markAsRead, 
  markAllRead, 
  clearRead, 
  addPopup, 
  removePopup 
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
