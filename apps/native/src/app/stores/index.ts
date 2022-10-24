import { USER_FEATURE_KEY, userReducer } from './slices/user/index.slice';
import { I18N_FEATURE_KEY, i18nReducer } from './slices/i18n/index.slice';
import companyReducer from './slices/company/companySlice';

import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        [USER_FEATURE_KEY]: userReducer,
        [I18N_FEATURE_KEY]: i18nReducer,
        company: companyReducer,
    },
    // Additional middleware can be passed to this array
    // middleware: [],
    devTools: process.env.NODE_ENV !== 'production',
    // Optional Redux store enhancers
    enhancers: [],
});

export default store;
