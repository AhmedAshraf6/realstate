'use client'; //this is a client side component

import { removeCookies } from '@/utils/axios';
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '@/utils/localStorage';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: getUserFromLocalStorage(),
};

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    loginUser: (state, { payload }) => {
      state.user = payload;
      addUserToLocalStorage(payload);
    },
    clearStore: (state) => {
      state.user = null;
      removeCookies();
      removeUserFromLocalStorage();
    },
  },
});

export const { loginUser, clearStore } = userSlice.actions;

export default userSlice.reducer;
