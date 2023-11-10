'use client';
import React from 'react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './Features/user/userSlice';

const rootReducer = combineReducers({
  user: userSlice,
  //add all your reducers here
});

export const store = configureStore({
  reducer: rootReducer,
});
