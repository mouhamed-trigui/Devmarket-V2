import { IAddress, IAddressProps, IDocument, IPhone } from '../common';

export interface IDocuments {
    avatar?: IDocument;
    justificationVeteran?: IDocument;
    justificationIdentity?: IDocument;
}

interface ICompleteRegistration {
    profileCompleted: boolean;
    companyCompleted: boolean;
    storeCompleted: boolean;
    offerCompleted: boolean;
    identityValidated: boolean;
    storeValidated: boolean;
}

export interface IRuler {
    id: number;
    name?: string;
    lastName?: string;
}

export interface IOwner {
    firstName: string;
    email: string;
    lastName: string;
}
export interface IBasicCompany {
    id?: number;
    companyType: 'PROFESSIONAL' | 'PRIVATE_PERSON' | 'OTHER' | '';
    name: string;
    siren: string;
    tva: string;
    leaderType: 'PRESIDENT' | 'MANAGER' | null;
    address: IAddress;
    ruler: IRuler;
}

export interface ICompany extends IBasicCompany {
    id: number;
    validatedByAdmin: boolean;
    otherActivity?: string | null;
    blocked: boolean;
    nbOfStores: number;
    owners: Array<IOwner>;
}

export interface IJob {
    id: number;
    name: string;
    parent?: IJob;
}

interface IBasicUser {
    id?: number;
    firstName: string;
    email: string;
    lastName: string;
    birthday: string;
    birthCity: string;
    gender: 'MALE' | 'FEMALE';
    phone?: IPhone;
    veteran: boolean;
    activity?: 'ACTIVE' | 'NOT_ACTIVE' | null;
    documents: IDocuments;
}

export interface IProAccountProps extends IBasicUser {
    id: number;
    completeRegistration: ICompleteRegistration;
    pushNotificationActive: boolean;
    validatedByAdmin: boolean;
    validatedInfoByAdmin: boolean;
    deleteRequestDate?: string;
    companies?: ICompany[];
    blocked: boolean;
    residenceCity: string;
    address?: IAddress;
    job?: IJob;
}

export interface IUserUpdateRequest extends IBasicUser {
    id: number;
    password?: string;
    address?: IAddress;
    jobId?: number;
}

export interface IUser {
    gender: 'MALE' | 'FEMALE';
    firstName: string;
    lastName: string;
    birthday: string;
    address: IAddress;
    phone: IPhone;
    email: string;
    veteran: boolean;
    category: number;
    jobId?: number;
    activity: 'ACTIVE' | 'NOT_ACTIVE' | null;
}

export interface INotification {
    id?: number;
    message: string;
    title: string;
    notificationType: 'PUSH' | 'INTERNAL' | '';
    storeType: 'E_COMMERCE' | 'PHYSICAL' | 'PHYSICAL_AND_E_COMMERCE' | '';
    storeCategoryId?: number;
    gender?: 'MALE' | 'FEMALE';
    status?: 'SUCCESS' | 'FAILED' | 'IN_PROGRESS';
    address?: IAddressProps[];
    iconType?: 'WELCOME' | 'OFFER' | 'STORE' | 'COMPANY' | 'PROFILE';
}
