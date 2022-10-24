import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import { USER_FEATURE_KEY, userReducer } from './slices/user/user';
import { LANGUAGE_FEATURE_KEY, languageReducer } from './slices/i18n/language';
import { storeReducer, STORE_FEATURE_KEY } from './slices/store/store';

const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    reducer: {
        [USER_FEATURE_KEY]: userReducer,
        [LANGUAGE_FEATURE_KEY]: languageReducer,
        [STORE_FEATURE_KEY]: storeReducer,
    },
    // Additional middleware can be passed to this array
    // middleware: [],
    devTools: process.env.NODE_ENV !== 'production',
    // Optional Redux store enhancers
    enhancers: [],
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
