import { configureStore, createSlice } from '@reduxjs/toolkit';

const movieInfoSlice = createSlice({
  name: 'movieInfo',
  initialState: {
    isOpen: false,
    item: null,
  },
  reducers: {
    openMovieInfo: (state, action) => {
      state.isOpen = true;
      state.item = action.payload;
    },
    closeMovieInfo: (state) => {
      state.isOpen = false;
      state.item = null;
    },
  },
});

export default movieInfoSlice;
