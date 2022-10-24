import {
    createSlice,
    createEntityAdapter,
    PayloadAction,
} from '@reduxjs/toolkit';
import { IGlobalSearch } from '../../services/model/common';

// Declaration
export const userAdapter = createEntityAdapter();
export const USER_FEATURE_KEY = 'user';

type TInitialUserState = {
    error: any | null;
    user: import('../../services').IProAccountProps | null;
    isLoggedIn: boolean;
    globalSearch?: IGlobalSearch;
};

// Initial state
export const initialUserState: TInitialUserState = userAdapter.getInitialState({
    error: null,
    user: null,
    isLoggedIn: false,
    globalSearch: undefined,
});

const userSlice = createSlice({
    name: USER_FEATURE_KEY,
    initialState: initialUserState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        setIsLoggedIn(state, action) {
            state.isLoggedIn = action.payload;
        },
        logout(state) {
            state.user = null;
            state.isLoggedIn = false;
        },
        setError(state, action) {
            state.error = action.payload;
            state.isLoggedIn = false;
        },
        setGlobalSearch(
            state,
            action: PayloadAction<IGlobalSearch | undefined>
        ) {
            state.globalSearch = action.payload;
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
