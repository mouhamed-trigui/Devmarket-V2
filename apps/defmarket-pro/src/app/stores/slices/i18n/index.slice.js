import React from 'react';

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

// Declaration
export const i18nAdapter = createEntityAdapter();
export const I18N_FEATURE_KEY = 'i18n';

// Initial state
export const initialI18nState = i18nAdapter.getInitialState({
  locale: 'fr',
});

const i18nSlice = createSlice({
  name: I18N_FEATURE_KEY,
  initialState: initialI18nState,
  reducers: {
    updateLocale(state, action) {
      state.i18n = action.payload;
    },
  },
});

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 */
export const i18nActions = i18nSlice.actions; // updateLocale,...

/*
 * Export reducer for store configuration.
 */
export const i18nReducer = i18nSlice.reducer;
