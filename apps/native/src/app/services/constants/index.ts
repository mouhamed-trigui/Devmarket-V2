// ################## AUTH ##################
export const SIGNIN = `/api/auth/login`; // HTTP POST
export const FORGOTPASSWORD = `/api/auth/forgot-password`;
export const REFRESH_TOKEN = `/api/auth/refresh-token`;
export const CHECKEMAIL = `/api/auth/exists-by-email`;
export const ME = `/api/auth/me`;
export const ACTIVATION_EMAIL = '/api/auth/validate-email';
export const CHANGEPASSWORD = `/api/auth/confirm-new-password`;
export const SEND_NEW_MAIL_ACTIVATION = `/api/auth/resend-validate-email`;

// ################## PRO ACCOUNT REGISTRATION ##################
export const SIGNUP = `/api/pro/register`; //  R0 - HTTP POST
export const SIGNUPI0 = `/api/pro/complete-register`; //  I0 - HTTP PUT - TOKEN REQUIRED
export const SIGNUPI1 = `/api/pro/company`; //  I1 - HTTP POST - TOKEN REQUIRED
export const SIGNUPI2 = `/api/pro/store`; //  I2 - HTTP POST - TOKEN REQUIRED , ID COMPANY

// search company by name Or siren
export const DENOMINATION = (nom: string) =>
    `https://recherche-entreprises.api.gouv.fr/search?q=${nom}&page=1&per_page=10`;

// ################## PRO ACCOUNT PROFILE ##################
export const UPDATE_PROFILE = '/api/pro/profile';
export const UPDATE_PASSWORD = '/api/pro/update-password';
export const UPDATE_EMAIL = '/api/pro/update-email';
export const VALIDATE_UPDATE_EMAIL = '/api/pro/validate-update-email';
export const DELETE_ACCOUNT = '/api/pro/request-delete-account';
export const RETRACT_DELETE_ACCOUNT = '/api/pro/retract-delete-account';

// ################## COMPANY ##################
export const ADDEDCOMPANY = '/api/pro/company';
export const UPDATEDCOMPANY = (id: number) => `/api/pro/company/` + id;
export const DELETEDCOMPANY = (id: number) => `/api/pro/company/${id}`;
export const ALLCOMPANY = '/api/pro/company';
export const ALL_COMPANY_STORES = (companyId: number) =>
    `/api/pro/company/${companyId}/store`;

export const OTHER_ACTIVITY_STORE = (id: number) =>
    `/api/pro/company/${id}/other-activity`;

export const GET_ALL_COMPANY_WITH_STORES = (page?: number, size?: number) =>
    `/api/pro/company/getAllCompaniesWithStores?page=${page}&size=${size}&sort=DESC`;

// ################## STORE ##################
export const STORE_API_URL = (id_store: number) => `/api/pro/store/${id_store}`;
export const GET_ALL_STORE_BY_COMPANY_ID = (companyId: number) =>
    `/api/pro/store?companyId=${companyId}`;

export const TOGGLE_VISIBILITY = (id_store: number) =>
    `/api/pro/store/${id_store}/visibility`;
export const MORE_INFO_URL = (storeId: number) =>
    `/api/pro/store/${storeId}/more-info`;

export const GETFIRSTSTORE = () => `/api/pro/first-store`;
// ################## TIMETABLE ##################
export const TIMETABLE_OF_STORE = (storeId: number) =>
    `/api/pro/store/${storeId}/timetable`;

export const UPDATE_TIMETABLE_LIST_OF_STORE = (storeId: number) =>
    `/api/pro/store/${storeId}/timetable/list`;

//  ################## STORE CATEGORY ##################
export const GET_STORE_CATEGORY = (type: string) =>
    `/api/pro/store-category?type=${type}`;

//  ################## OFFRE ##################
export const ADD_OFFRE_API_URL = `/api/pro/offer`;
export const OFFRE_API_URL = (id_offer: number) => `/api/pro/offer/${id_offer}`;
export const UPDATE_OFFER_IMAGE = (id_offer: number) =>
    `/api/pro/offer/${id_offer}/update-photo`;
export const UPDATE_OFFER_FILE = (id_offer: number) =>
    `/api/pro/offer/${id_offer}/update-file`;
export const ALL_STORE_OFFER = (
    storeId: number,
    page: number,
    size: number,
    sortBy: 'endOfOffer' | 'startOfOffer' | undefined | null,
    offerTypes:
        | Array<'GOOD_PLAN' | 'FLAT' | 'PERCENTAGE' | 'CONDITIONAL_REDUCTION'>
        | undefined
        | null,
    themeType:
        | Array<'HALLOWEEN' | 'NOEL' | 'PAQUES' | 'TOUSSAINT' | 'NO_THEME'>
        | undefined
        | null,
    status: 'EXPIRED' | 'ACTIVE' | undefined | null,
    categoryOfferType: 'PHYSICAL' | 'E_COMMERCE' | undefined | null
) =>
    `/api/pro/offer?page=${page}&size=${size}&storeId=${storeId}&sort=ASC&sort=${
        sortBy ?? ''
    }${offerTypes ? offerTypes?.map((e) => '&offerType=' + e).join('') : ''}${
        themeType ? themeType?.map((e) => '&themeType=' + e).join('') : ''
    }&status=${status ?? ''}&offerCategory=${categoryOfferType ?? ''}`;

//  ################## Files ##################
export const DOWNLOAD_RESOURCE = (path: string) =>
    `/api/files/resources?path=/${path}`;

// ################## Notifications & communication ##################

export const PUSHNOTIFICATION_API_URL = (value: boolean) =>
    `/api/pro/push-notification?active=${value}`;

export const ADDEXPOTOKEN_API_URL = `/api/pro/add-expo-token`;

export const GET_ALL_ACTIVITY_NOTIFICATIONS = (page?: number, size?: number) =>
    `/api/pro/notifications?page=${page}&size=${size}&sort=createdDate,DESC`;

export const DELETE_NOTIFICATION = (id_notification: number) =>
    `/api/pro/notifications/${id_notification}`;

export const COMMUNICATION_API_URL = (value: boolean) =>
    `/api/pro/communication?communication=${value}`;

// ################## job ##################

export const ALL_JOB_API_URL = (depth: number) => `/api/pro/job?depth=${depth}`;

export const JOB_BY_PARENT_ID_API_URL = (depth: number, parentId: number) =>
    `/api/pro/job?depth=${depth}&parentId=${parentId}`;
