import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        songs: JSON.parse(localStorage.getItem('favorites')) || []
    },
    reducers: {
        toggleFavorite: (state, action) => {
            const songId = action.payload;
            if (state.songs.includes(songId)) {
                state.songs = state.songs.filter(id => id !== songId);
            } else {
                state.songs.push(songId);
            }
            localStorage.setItem('favorites', JSON.stringify(state.songs));
        }
    }
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice;
