import { FileType, IAddress, IPhoneProps } from '../company';

export interface offerProps {
    active: boolean;
    currency: number;
    description: string;
    endOfOffer: string;
    offerType:
        | 'CONDITIONAL_REDUCTION'
        | 'CONDITIONAL_REDUCTION'
        | 'FLAT'
        | 'GOOD_PLAN'
        | 'PERCENTAGE';
    startOfOffer: string;
    minOfferValue: string;
    midOfferValue: string;
    maxOfferValue: string;
    title: string;
    value: string;
}
// R0
export interface signUpR0Props {
    email: string;
    password: string;
}
// I0
export interface signUpI0Props {
    activity: 'ACTIVE' | 'NOT_ACTIVE' | null;
    address?: {
        city: string;
        department: string;
        pays: string;
        street?: string;
        zipCode: string;
    };
    birthday: Date;
    firstName: string;
    gender: 'MALE' | 'FEMALE';
    jobId: number | null;
    knowUsThrough:
        | 'WEB_SITE'
        | 'RECOMMENDATION'
        | 'SOCIAL_MEDIA'
        | 'PARTNER'
        | 'OTHER';
    knowUsThroughOtherValue: string;
    lastName: string;
    phone?: {
        number: string;
        prefix: string;
    };
    validationMode: {
        type: string;
        value: string;
    };
    veteran?: boolean;
}
// I1
export interface signUpI1Props {
    address: {
        city: string;
        department: string;
        pays: string;
        street: string;
        zipCode: string;
    };
    companyType?: 'OTHER' | 'PRIVATE_PERSON' | 'PROFESSIONAL';
    leaderType?: 'MANAGER' | 'PRESIDENT';
    name: string;
    siren: string;
    tva: string;
    ruler: { name: string; lastName: string };
}

// I2
export interface signUpI2Props {
    store: {
        description: string;
        storeType: string;
        name: string;
        eCommerceAndPhysicalStore: boolean;
    };
    logo?: any; //multipart
}

export interface errorProps {
    name?: string;
    message: string;
    objectErrors?: any;
    stack?: string;
}

export interface IProfileProps {
    id: number;
    firstName: string;
    lastName: string;
    birthday: string;
    phone?: IPhoneProps;
    residenceCity: string;
    birthCity: string;
    jobId?: number;
    veteran: boolean;
    documents: {
        justificationIdentity: FileType | string;
        justificationVeteran: FileType | string;
    };
}
