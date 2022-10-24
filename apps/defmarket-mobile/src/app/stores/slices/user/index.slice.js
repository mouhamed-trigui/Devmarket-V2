import React from 'react';

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

// Declaration
export const userAdapter = createEntityAdapter();
export const USER_FEATURE_KEY = 'user';

// Initial state
export const initialUserState = userAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: null,
  user: 'Initial user',
});

const userSlice = createSlice({
  name: USER_FEATURE_KEY,
  initialState: initialUserState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 */
export const userActions = userSlice.actions; // setUser,...

/*
 * Export reducer for store configuration.
 */
export const userReducer = userSlice.reducer;
