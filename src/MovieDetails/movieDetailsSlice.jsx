import { configureStore, createSlice } from '@reduxjs/toolkit';

const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState: {
    isOpen: false,
    item: null,
  },
  reducers: {
    openMovieDetails: (state, action) => {
      state.isOpen = true;
      state.item = action.payload;
    },
    closeMovieDetails: (state) => {
      state.isOpen = false;
      state.item = null;
    },
  },
});

export default movieDetailsSlice;
