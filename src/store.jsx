import { configureStore, createSlice } from '@reduxjs/toolkit';
import modalSlice from './Modal/modalSlice';
import movieInfoSlice from './MovieInfo/movieInfoSlice';

const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    movieInfo: movieInfoSlice.reducer 
  },
});

export default store;