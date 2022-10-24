import React from 'react';
import I18n from '../../../extensions/i18n';

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';
// Declaration
export const languageAdapter = createEntityAdapter();
export const LANGUAGE_FEATURE_KEY = 'language';

// Initial state
export const initialLanguageState = languageAdapter.getInitialState({
    language: AsyncStorage.getItem('@language').toString() ?? 'fr', // get current lanuage
});

const languageSlice = createSlice({
    name: LANGUAGE_FEATURE_KEY,
    initialState: initialLanguageState,
    reducers: {
        setLanguage(state, action) {
            state.language = action.payload;
            I18n.locale = action.payload;
            AsyncStorage.setItem('@language', action.payload);
        },
    },
});

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 */
export const languageActions = languageSlice.actions; // setLanguage,...

/*
 * Export reducer for store configuration.
 */
export const languageReducer = languageSlice.reducer;
