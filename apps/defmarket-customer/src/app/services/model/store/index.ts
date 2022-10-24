import {
    ClosureTypeEnum,
    DayEnum,
    PaymentMethodEnum,
    StoreTypeEnum,
} from '../../constants';

export interface IBasicStore {
    id: number;
    name: string;
    description: string;
    logo: IDocument;
    cover: IDocument;
    storeType: StoreTypeEnum;
    eCommerceAndPhysicalStor1e?: boolean;
    validatedByAdmin: boolean;
    visible: boolean;
    blocked: boolean;
    address: IAddress;
    geolocation: IStoreGeolocation;
    offerNbr: number;
    ecommerceAndPhysicalStore?: boolean;
    timeTable: ITimeTable[];
}

export interface IStore extends IBasicStore {
    distance: number;
}
export interface IStoreDetails extends IBasicStore {
    email: string;
    website: IPersonalInfoProps<string>;
    temporaryClosure?: ITemporaryClosureProps;
    category: IStoreCategory;
    phoneList: IPhoneProps[] | null;
    socialMedia: ISocialMedia[] | null;
    paymentMethods: IStorePaymentMethod[] | null;
    offers: IOfferStore[] | null;
    hideMyContacts: boolean;
}

export interface IDocument {
    id: number;
    name: string;
}

export interface FileUpload extends File {
    uri: string;
    name: string;
    type: string;
}

export type FileType = FileUpload | File | null;

export interface ISocialMedia {
    id?: number;
    value: string;
    type:
        | 'FACEBOOK'
        | 'INSTAGRAM'
        | 'TWITTER'
        | 'LINKEDIN'
        | 'GOOGLEPLUS'
        | 'YOUTUBE'
        | 'OTHER';
}

export interface ITimeTable {
    id: number;
    day: DayEnum;
    open24h: boolean;
    workingTime: IStoreWorkingTime[];
}
export interface IStoreWorkingTime {
    id: number;
    start: string;
    end: string;
}
export interface IAddress {
    city: string;
    department: string;
    country: string;
    street: string;
    zipCode: string;
}

export interface IPersonalInfoProps<T> {
    public: boolean;
    value: T;
}

export interface IPhoneProps {
    id?: number;
    prefix: string;
    number: string;
    primary: boolean;
}

export interface ITemporaryClosureProps {
    closureType: ClosureTypeEnum;
    reason: string;
}

export interface IOfferStore {
    id: number;
    offerType: 'PERCENTAGE' | 'FLAT' | 'GOOD_PLAN';
    value: string;
    title: string;
    description: string;
    startOfOffer: string;
    endOfOffer: string;
    photo: string;
    attachedFile: any;
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
    minOfferValue: number;
    midOfferValue: number;
    maxOfferValue: number;
    validatedByAdmin: boolean;
}
export interface IStoreCategory {
    id: number;
    name: string;
    description: string;
    storeType: StoreTypeEnum;
}
export interface IStorePaymentMethod {
    name: PaymentMethodEnum;
    condition: string;
}

export interface IStoreGeolocation {
    latitude: number;
    longitude: number;
}
