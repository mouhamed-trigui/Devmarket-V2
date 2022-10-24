import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { companyProps } from '../../../services';
import {
    IOfferOfStoreProps,
    IStoreOfCompanyProps,
    IOffreFilterProps,
    ITimetableProps,
} from '../../../services/model/company';

export interface CompanyState {
    companyList: companyProps[];
    selectedStore?: IStoreOfCompanyProps;
    selectedOffer?: IOfferOfStoreProps;
    duplicated?: boolean;
    filter: IOffreFilterProps;
}

const initialState: CompanyState = {
    companyList: [],
    selectedStore: undefined,
    selectedOffer: undefined,
    duplicated: false,
    filter: {
        sortBy: 'startOfOffer',
        offerTypes: undefined,
        themes: undefined,
        status: 'ACTIVE',
        categoryOfferType: undefined,
        isActive: false,
    },
};

export const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        setCompanyList: (state, action: PayloadAction<companyProps[]>) => {
            state.companyList = action.payload;
        },
        addCompany: (state, action: PayloadAction<companyProps>) => {
            state.companyList.push(action.payload);
        },
        updateCompany: (state, action: PayloadAction<companyProps>) => {
            const index = state.companyList.findIndex(
                (company) => company.id === action.payload.id
            );
            state.companyList[index] = action.payload;
        },
        deleteCompany: (state, action: PayloadAction<number>) => {
            const index = state.companyList.findIndex(
                (company) => company.id === action.payload
            );
            state.companyList.splice(index, 1);
        },
        /////////// selectedStore ///////////
        setSelectedStore: (
            state,
            action: PayloadAction<IStoreOfCompanyProps>
        ) => {
            state.selectedStore = action.payload;
        },
        unsetSelectedStore: (state) => {
            state.selectedStore = undefined;
        },
        setSelectedStoreTimetables: (
            state,
            action: PayloadAction<ITimetableProps[]>
        ) => {
            if (state.selectedStore) {
                state.selectedStore.timetables = action.payload;
            }
        },
        /************** selectedOffer ************** */
        setSelectedOffer: (
            state,
            action: PayloadAction<IOfferOfStoreProps>
        ) => {
            state.selectedOffer = action.payload;
        },
        unsetSelectedOffer: (state) => {
            state.selectedOffer = undefined;
        },
        /************  duplicated store   ******** */
        setDuplicatedOffer: (state) => {
            state.duplicated = true;
        },
        unsetDuplicatedOffer: (state) => {
            state.duplicated = false;
        },
        /************  offer - filter   ******** */
        setSortBy(state, action) {
            state.filter = {
                ...state.filter,
                isActive: true,
                sortBy: action.payload,
            };
        },
        setOfferTypes(state, action) {
            state.filter = {
                ...state.filter,
                isActive: true,
                offerTypes: action.payload,
            };
        },
        setThemes(state, action) {
            state.filter = {
                ...state.filter,
                isActive: true,
                themes: action.payload,
            };
        },
        setStatus(state, action) {
            state.filter = {
                ...state.filter,
                isActive: true,
                status: action.payload,
            };
        },
        setCategoryOfferType(state, action) {
            state.filter = {
                ...state.filter,
                categoryOfferType: action.payload,
            };
        },
        resetFilter(state, action) {
            state.filter = {
                sortBy: 'startOfOffer',
                offerTypes: undefined,
                themes: undefined,
                status: undefined,
                categoryOfferType: undefined,
                isActive: false,
            };
        },
    },
});

export const companyActions = companySlice.actions;

export default companySlice.reducer;
