'use client'; //this is a client side component

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  allListings: [],
  page: 1,
  numOfPage: 1,
  totalListing: 0,
  type: 'all',
  offer: false,
  parking: false,
  furnished: false,
  sort: 'latest',
  sortOptions: ['high to low', 'low to high', 'latest', 'oldest'],
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
  },
});

export const { handleChange, changePage } = filterSlice.actions;

export default filterSlice.reducer;
