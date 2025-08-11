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
      state.item = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.item = null;
    },
  },
});

export default modalSlice;
