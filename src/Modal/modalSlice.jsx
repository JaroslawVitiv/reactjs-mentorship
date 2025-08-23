import { configureStore, createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    item: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.isSubmitted = false;
      state.item = action.payload;
    },
    submitModal: (state) => {
      state.isSubmitted = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.isSubmitted = false;
      state.item = null;
    },
  },
});

export default modalSlice;
