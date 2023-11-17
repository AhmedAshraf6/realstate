'use client'; //this is a client side component

import { removeCookies } from '@/utils/axios';
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  getOpenedUserFromLocalStorage,
  addOpenedUserFromLocalStorage,
  removeOpenedUserFromLocalStorage,
} from '@/utils/localStorage';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: getUserFromLocalStorage(),
  openedUser: getOpenedUserFromLocalStorage(),
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
    setOpenedUser: (state, { payload }) => {
      state.openedUser = payload;
      addOpenedUserFromLocalStorage(payload);
    },
  },
});

export const { loginUser, clearStore, setOpenedUser } = userSlice.actions;

export default userSlice.reducer;
