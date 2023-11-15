'use client';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './Features/user/userSlice';
import filterSlice from './Features/filters/filterSlice';

const rootReducer = combineReducers({
  user: userSlice,
  filters: filterSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
