import React from 'react';

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

// Declaration
export const userAdapter = createEntityAdapter();
export const USER_FEATURE_KEY = 'user';

// Initial state
export const initialUserState = userAdapter.getInitialState({
    loadingStatus: 'not loaded',
    error: null,
    user: null,
    isLoggedIn: false,
    isVisited: false,
    previousScreenName:null,
    expoToken: null,
    pushNotificationActive: false,
    communicationActive:false,
    // R0
    registration: {
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
        accept: false,
        index: 0,
    },
    identity: {
        // I0
        name: '',
        lastname: '',
        birthday: '',
        city: '',
        userDepartment: '',
        userZipCode: '',
        phone: '',
        prefix: '+33',
        gender: '',
        formerMember: undefined,
        inActivity: undefined,
        category: '',
        job: '',
        source: '',
        anotherSource: '',
        // I1
        establishmentName: '',
        establishmentOwnerName: '',
        establishmentOwnerLastName: '',
        type: '',
        address: '',
        department: '',
        zipCode: undefined,
        establishmentCity: '',
        siren: undefined,
        tvaNumber: undefined,
        post: undefined,
        typeSearch: '',
        search: '',
        // I2
        shopType: '',
        shopLogo: null,
        shopName: '',
        shopDescription: '',
        shopOffers: [],
        shopRequest: '',
    },
});

const userSlice = createSlice({
    name: USER_FEATURE_KEY,
    initialState: initialUserState,
    reducers: {
        setUser(state, action) {
            const user = action.payload;
            if (user?.completeRegistration) {
                let nbrOfTrue = 0;
                Object.values(user?.completeRegistration).forEach(
                    (value: boolean) => {
                        if (value) {
                            nbrOfTrue++;
                        }
                    }
                );
                user.completeRegistrationPercentage =
                    (
                        (nbrOfTrue /
                            Object.keys(user?.completeRegistration).length) *
                        100
                    ).toFixed(0) + '%';
            }
            state.user = user;
        },
        setRegistration(state, action) {
            state.registration = action.payload;
        },
        setIdentity(state, action) {
            state.identity = action.payload;
        },
        setExpoToken(state, action) {
            state.expoToken = action.payload;
        },
        setIsLoggedIn(state, action) {
            state.isLoggedIn = action.payload;
        },
        setIsVisited(state, action) {
            state.isVisited = action.payload;
        },
        setPreviousScreenName(state, action) {
            state.previousScreenName = action.payload;
        },
        setPushNotification(state, action) {
            state.user.pushNotificationActive = action.payload;
        },
        setCommunication(state, action) {
            state.user.communicationActive = action.payload;
        },
        logout(state) {
            state.user = null;
            state.isLoggedIn = false;
            state.isVisited = false;
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
