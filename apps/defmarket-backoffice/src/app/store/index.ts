import { configureStore } from '@reduxjs/toolkit';
import { userReducer, USER_FEATURE_KEY } from './user/index.slice';

const store = configureStore({
    reducer: {
        [USER_FEATURE_KEY]: userReducer,
    },
    // Additional middleware can be passed to this array
    // middleware: [],
    devTools: process.env.NODE_ENV !== 'production',
    // Optional Redux store enhancers
    enhancers: [],
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
