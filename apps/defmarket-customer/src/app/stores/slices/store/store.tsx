import React from 'react';

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { IStoreDetails } from './../../../services/model/store/index';

// Declaration
export const storeAdapter = createEntityAdapter();
export const STORE_FEATURE_KEY = 'store';

export interface initialStoreStateProps {
    selectedStore: IStoreDetails;
    selectedStoreCategory: number;
    totalStoresByCity: number;
}
// Initial state
export const initialStoreState: initialStoreStateProps = storeAdapter.getInitialState(
    {
        selectedStore: {} as IStoreDetails,
        selectedStoreCategory: null,
        totalStoresByCity: null,
    }
);

const storeSlice = createSlice({
    name: STORE_FEATURE_KEY,
    initialState: initialStoreState,
    reducers: {
        setSelectedStore(state, action) {
            state.selectedStore = action.payload;
        },
        setSelectedStoreCategory(state, action) {
            state.selectedStoreCategory = action.payload;
        },
        setTotalStoresByCity(state, action) {
            state.totalStoresByCity = action.payload;
        },
    },
});

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 */
export const storeActions = storeSlice.actions; // setUser,...

/*
 * Export reducer for store configuration.
 */
export const storeReducer = storeSlice.reducer;
