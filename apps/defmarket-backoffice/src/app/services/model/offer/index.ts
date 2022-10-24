import { IDocument } from '../common';

export interface IBasicOffer {
    id?: number;
    offerType: 'PERCENTAGE' | 'FLAT' | 'GOOD_PLAN';
    value: string;
    title: string;
    description: string;
    startOfOffer: string;
    endOfOffer: string | null;
    themeType:
        | ''
        | 'NOEL'
        | 'HALLOWEEN'
        | 'PAQUES'
        | 'TOUSSAINT'
        | 'NO_THEME'
        | 'PROMO_FALSH'
        | 'BLACK_FRIDAY'
        | 'MOTHER_PARTY'
        | 'FATHER_PARTY'
        | 'BACK_TO_SCHOOL'
        | 'NATIONAL_PARTY'
        | 'SAINT_PATRICK'
        | 'LIQUIDATION'
        | 'YEARS_DAY'
        | 'SAINT_VALENTIN';
    offerCategory: 'PHYSICAL_AND_E_COMMERCE' | 'E_COMMERCE' | 'PHYSICAL' | '';
    minOfferValue?: string;
    midOfferValue?: string;
    maxOfferValue?: string;
}

export interface IOffer extends IBasicOffer {
    id: number;
    photo?: IDocument;
    attachedFile?: IDocument;
    validatedByAdmin: boolean;
    blocked: boolean;
}

export interface IOfferRequestProps extends IBasicOffer {
    attachedFile?: File;
    photo?: File;
}

export interface IOfferFilter {
    validated?: boolean;
    blocked?: boolean;
    hasModeration?: boolean;
}
