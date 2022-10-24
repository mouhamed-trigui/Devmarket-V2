import { FileType } from '../store';
import { IDocument } from './../store/index';

export interface IOfferProps {
    id?: number;
    description?: string;
    themeType?:
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
    title?: string;
    text: string;
    offerType?: 'GOOD_PLAN' | 'FLAT' | 'PERCENTAGE' | 'GIFT' | null | undefined;
    // offerType: 'Offre minimum' | 'Offre medium' | 'Offre premium' | undefined;
    value?: string | null | undefined;
    startOfOffer?: string;
    endOfOffer?: string;
    attachedFile?: FileType | IDocument;
    photo?: FileType | IDocument;
    offerCategory: 'PHYSICAL_AND_E_COMMERCE' | 'E_COMMERCE' | 'PHYSICAL' | '';
    minOfferValue?: string | null | undefined;
    midOfferValue?: string | null | undefined;
    maxOfferValue?: string | null | undefined;
    validatedByAdmin?: boolean;
    level?: 'niveau 1' | 'niveau 2' | 'niveau 3' | undefined;
    percentage: string | number;
    accessibleOffer?: string;
    validated: boolean;
}
