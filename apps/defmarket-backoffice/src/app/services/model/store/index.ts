import { IAddress, IDocument, IGeoLocation, IPhone } from '../common';

export interface IBasicStore {
    id?: number;
    name: string;
    description: string;
    storeType: 'E_COMMERCE' | 'PHYSICAL' | '';
    eCommerceAndPhysicalStore: boolean;
}

export interface IStore extends IBasicStore {
    id: number;
    logo?: IDocument;
    cover?: IDocument;
    visible: boolean;
    validatedByAdmin: boolean;
    offerNbr: number;
    blocked: boolean;
}

export interface IBasicStoreWithCompanyId extends IBasicStore {
    companyId: number;
}

export interface IStoreRequestProps {
    logo?: File;
    cover?: File;
    store: IBasicStoreWithCompanyId;
}

export interface ISocialMediaProps {
    id?: number;
    type:
        | 'FACEBOOK'
        | 'INSTAGRAM'
        | 'TWITTER'
        | 'LINKEDIN'
        | 'GOOGLEPLUS'
        | 'YOUTUBE'
        | 'OTHER';
    value: string;
}

export interface IPaymentMethodProps {
    name: 'CASH' | 'CHECK' | 'CB';
    condition: string;
}

export interface IStoreCategory {
    id: number;
    name: string;
    description: string;
    storeType: 'E_COMMERCE' | 'PHYSICAL' | 'PHYSICAL_AND_E_COMMERCE';
}

export interface IExpendedStore extends IStore {
    address: IAddress;
    geoLocation: IGeoLocation;
    phoneList: IPhone[];
    socialMedia: ISocialMediaProps[];
    paymentMethods: IPaymentMethodProps[];
    website?: { value: string; public: boolean };
    email?: string;
    hideMyContacts?: boolean;
    practicedOfferBeforeDM?: {
        practiceOfferBeforeDM: boolean;
        practiceOfferBeforeDMText: string;
        targetedJobsBeforeDM: string;
    };
}

export interface IStoreDetails extends IExpendedStore {
    category: IStoreCategory;
}

export interface IStoreUpdateRequestProps extends IExpendedStore {
    socialMediaToRemove?: number[];
    phoneToRemove?: number[];
    categoryId?: number;
}

export interface IStoreCategoryProps {
    id: number;
    name: string;
    description: string;
}

export interface IStoreFilter {
    blocked?: boolean;
    validated?: boolean;
    hasModeration?: boolean;
    canBeValidated?: boolean;
}
