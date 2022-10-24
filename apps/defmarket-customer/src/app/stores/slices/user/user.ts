import React from 'react';
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { ILocation } from './../../../services/model/index';
import { IMe } from './../../../services/model/auth/index';
// Declaration
export const userAdapter = createEntityAdapter();
export const USER_FEATURE_KEY = 'user';

export interface initialUserStatProps {
    isVisited: boolean;
    isLoggedIn: boolean;
    modalVisible: boolean;
    offer: IOffer;
    level: string;
    currentRoute: 'Commerce' | 'Billetterie';
    age: number;
    data: any;
    user: IMe;
    modalStatus: object;
    currentLocation: ILocation;
    distance: number;
}
// Initial state
export const initialUserState: initialUserStatProps = userAdapter.getInitialState(
    {
        currentLocation: {} as ILocation,
        distance: 1000000,
        isVisited: false,
        isLoggedIn: false,
        modalVisible: false,
        offer: undefined,
        level: '',
        modalStatus: {
            general: false,
            paymentMethodDetails: false,
            offerLevel: false,
        },
        currentRoute: 'Commerce',
        age: 0,
        data: [],
        user: {} as IMe,
    }
);

const userSlice = createSlice({
    name: USER_FEATURE_KEY,
    initialState: initialUserState,
    reducers: {
        setUser(state, action) {
            const user = action.payload;
            state.user = user;
        },
        setCurrentLocation(state, action) {
            state.currentLocation = action.payload;
        },
        setDistance(state, action) {
            state.distance = action.payload;
        },
        logout(state) {
            state.user = null;
            state.isLoggedIn = false;
            state.isVisited = false;
        },
        setAge(state, action) {
            state.age = action.payload;
        },
        setData(state, action) {
            state.data = action.payload.data.message.terrier;
        },
        setCurrentRoute(state, action) {
            state.currentRoute = action.payload.route;
        },
        setModalVisible(state, action) {
            state.modalVisible = action.payload;
        },
        setModalStatus(state, action) {
            state.modalStatus[action.payload.modalName] =
                action.payload.modalStatus;
        },
        setLevel(state, action) {
            state.level = action.payload;
        },
        setOffer(state, action) {
            state.offer = action.payload;
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
