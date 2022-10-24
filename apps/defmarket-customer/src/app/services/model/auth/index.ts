export interface IMe {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    job: string;
    phone: string;
    pushNotificationActive: boolean;
    residenceCity: string;
    birthCity: string;
    activity: string;
    birthday: string;
    blocked: boolean;
    communication: string;
    completeRegistration: {
        companyCompleted: boolean;
        identityValidated: boolean;
        offerCompleted: boolean;
        profileCompleted: boolean;
        storeCompleted: boolean;
        storeValidated: boolean;
    };
    crispId: number;
    deleteRequestDate: string;
    documents: {
        avatar: string;
        justificationIdentity: string;
        justificationVeteran: string;
    };

    roles: RoleEnum[];
    validatedByAdmin: boolean;
    validatedInfoByAdmin: boolean;
    veteran: boolean;
}
export enum RoleEnum {
    'PERM_HOME',
    'PERM_HOME_READ',
    'PERM_NOTIFICATION',
    'PERM_NOTIFICATION_READ',
    'PERM_NOTIFICATION_DELETE',
    'PERM_ANNOUNCE',
    'PERM_ANNOUNCE_READ',
    'PERM_STORE',
    'PERM_STORE_CREATE',
    'PERM_STORE_READ',
    'PERM_STORE_UPDATE',
    'PERM_STORE_DELETE',
    'PERM_COMPANY',
    'PERM_COMPANY_CREATE',
    'PERM_COMPANY_READ',
    'PERM_COMPANY_UPDATE',
    'PERM_COMPANY_DELETE',
    'PERM_NEWSLETTER',
    'PERM_NEWSLETTER_READ',
    'PERM_CONTACT',
    'PERM_CONTACT_CREATE',
    'PERM_CONTACT_READ',
    'PERM_CONTACT_UPDATE',
    'PERM_CONTACT_DELETE',
    'PERM_PROFILE',
    'PERM_PROFILE_READ',
    'PERM_PROFILE_UPDATE',
    'PERM_PROFILE_DELETE',
    'PERM_OFFER',
    'PERM_OFFER_CREATE',
    'PERM_OFFER_READ',
    'PERM_OFFER_UPDATE',
    'PERM_OFFER_DELETE',
}
export interface errorProps {
    name?: string;
    message: string;
    objectErrors?: any;
    stack?: string;
}
