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
  isSocketConnected: false,
  chats: [],
  messages: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, { payload }) => {
      state.user = payload;
      addUserToLocalStorage(payload);
    },
    clearStore: (state) => {
      state.user = null;
      state.openedUser = null;
      state.socket = null;
      state.chats = [];
      state.messages = [];
      removeCookies();
      removeUserFromLocalStorage();
      removeOpenedUserFromLocalStorage();
    },
    setOpenedUser: (state, { payload }) => {
      state.openedUser = payload;
      addOpenedUserFromLocalStorage(payload);
    },
    updateChats: (state, { payload }) => {
      state.chats = payload;
    },
    updateLastMessage: (
      state,
      { payload: { chatToUpdateId, message, keyMsg } }
    ) => {
      const index = state.chats.findIndex(
        (chat) => chat._id === chatToUpdateId
      );
      let foundObject = state.chats[index];
      state.chats.splice(index, 1);
      if (!foundObject.lastMessage) {
        foundObject = { ...foundObject, lastMessage: { [keyMsg]: message } };
      } else {
        console.log({ chatToUpdateId, message, keyMsg });
        foundObject.lastMessage[keyMsg] = message;
      }
      foundObject.updatedAt = Date.now();
      state.chats.unshift(foundObject);
    },
    setMessage: (state, { payload }) => {
      state.messages = payload;
    },
    updateMessages: (state, { payload }) => {
      state.messages.push(payload);
    },
    newChat: (state, { payload: { _id, members, lastMessage } }) => {
      const index = state.chats.findIndex((chat) => chat._id === _id);
      if (index === -1) {
        state.chats.unshift({ _id, members, lastMessage });
      }
    },
  },
});

export const {
  loginUser,
  clearStore,
  setOpenedUser,
  updateChats,
  updateLastMessage,
  updateMessages,
  setMessage,
  newChat,
} = userSlice.actions;

export default userSlice.reducer;
