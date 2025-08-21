import { configureStore, createSlice } from '@reduxjs/toolkit';
import modalSlice from './Modal/modalSlice';
import movieDetailsSlice from './MovieDetails/movieDetailsSlice';

const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    movieDetails: movieDetailsSlice.reducer 
  },
});

export default store;