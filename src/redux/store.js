import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import favoritesSlice from './favoritesSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        favorites: favoritesSlice.reducer,
    }
});
