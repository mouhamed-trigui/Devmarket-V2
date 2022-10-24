// ################## AUTH ##################
export const SIGNIN = `/api/auth/login`; // HTTP POST
export const FORGOTPASSWORD = `/api/auth/forgotPassword`;
export const RESETPASSWORD = `/api/auth/resetPassword`;
export const ME = `/api/auth/me`;
export const REFRESH_TOKEN = `/api/auth/refresh-token`;
export const CHECKEMAIL = `/api/auth/exists-by-email`;

//  ################## PRO ACCOUNT ##################

export const PRO_ACCOUNT_API_URL = (proAccountId: number) =>
    `/api/admin/trader/${proAccountId}`;
export const BLOCK_USER = (proAccountId: number) =>
    `/api/admin/trader/${proAccountId}/block-action`;
export const PRO_ACCOUNT_UPDATE_API_URL = (proAccountId: number) =>
    `/api/admin/trader/${proAccountId}/update-trader`;

export const ALL_PRO_ACCOUNTS = `/api/admin/trader`;
export const CREATE_USER = `/api/admin/trader/register`;
export const GET_USER_BY_NAME_EMAIL = (input: string) =>
    `/api/admin/trader/search?input=${input}`;

export const REQUEST_MORE_INFO = (
    source: 'trader' | 'company' | 'store' | 'offer',
    id: number
) => `/api/admin/${source}/${id}/request-more-info`;
//  ################## CREATE COMPANY ##################

export const DENOMINATION = (
    nom: string // Search company by name Or siren
) =>
    `https://recherche-entreprises.api.gouv.fr/search?q=${nom}&page=1&per_page=10`;

// ################## job ##################

export const ALL_JOB_API_URL = (depth: number) => `/api/pro/job?depth=${depth}`;

export const JOB_BY_PARENT_ID_API_URL = (depth: number, parentId: number) =>
    `/api/pro/job?depth=${depth}&parentId=${parentId}`;
export const VALIDATE_PRO_ACCOUNTS = (traderId: number) =>
    `/api/admin/trader/${traderId}/validate-user`;
export const VALIDATE_PRO_ACCOUNTS_INFO = (traderId: number) =>
    `/api/admin/trader/${traderId}/validate-info`;
export const NEXT_PRO_ACCOUNTS = (traderId: number) =>
    `/api/admin/trader/${traderId}/next`;
export const PREVIOUS_PRO_ACCOUNTS = (traderId: number) =>
    `/api/admin/trader/${traderId}/previous`;
export const COUNT_PRO_ACCOUNTS = `/api/admin/trader/count`;

// ################## Company ##################
export const VALIDATE_COMPANY = (companyId: number) =>
    `/api/admin/company/${companyId}/validate-company`;

export const ALL_COMPANIES = `/api/admin/company`;

export const DELETE_COMPANY = (id: number) => `/api/admin/company/${id}`;
export const BLOCK_COMPANY = (id: number) =>
    `/api/admin/company/${id}/block-action`;

export const CREATE_COMPANY_API = `api/admin/company`;
export const UPDATE_COMPANY_API = (companyId: number) =>
    `api/admin/company/${companyId}`;

export const GET_COMPANY_BY_USER_ID = (userId: number) =>
    `/api/admin/company/user/${userId}`;
export const GET_NEXT_COMPANY_BY_ID = `/api/admin/company/next`;
export const GET_PREVIOUS_COMPANY_BY_ID = `/api/admin/company/previous`;
export const GET_COMPANY_BY_ID = (companyId: number) =>
    `/api/admin/company/${companyId}`;

// ################## Stores ##################
export const GET_ALL_STORES_OF_COMPANY = (companyId: number) =>
    `/api/admin/store?companyId=${companyId}`;
export const VALIDATE_STORE = (storeId: number) =>
    `/api/admin/store/${storeId}/validate-store`;

export const CREATE_STORE_API = `api/admin/store`;
export const UPDATE_STORE_API = (storeId: number) =>
    `api/admin/store/${storeId}`;
export const GET_STORE_BY_ID = (storeId: number) =>
    `/api/admin/store/${storeId}`;

export const GET_STORE_CATEGORY = (type: string) =>
    `/api/pro/store-category?type=${type}`;
export const ALL_STORE = `/api/admin/store`;
export const DELETE_STORE = (id: number) => `/api/admin/store/${id}`;
export const GET_NEXT_STORE = `/api/admin/store/next`;
export const GET_PREVIOUS_STORE = `/api/admin/store/previous`;

// ################## offers ##################
export const GET_ALL_OFFERS_OF_STORE = (storeId: number) =>
    `/api/admin/offer?storeId=${storeId}`;
export const VALIDATE_OFFER = (offerId: number) =>
    `/api/admin/offer/${offerId}/validate-offer`;

export const CREATE_OFFER_API = `api/admin/offer`;
export const UPDATE_OFFER_API = (offerId: number) =>
    `api/admin/offer/${offerId}`;
export const ALL_OFFER = `/api/admin/offer`;
export const GET_NEXT_OFFER = `/api/admin/offer/next`;
export const GET_PREVIOUS_OFFER = `/api/admin/offer/previous`;
export const GET_OFFER_COUNT = `/api/admin/offer/count`;
export const DELETE_OFFER = (id: number) => `/api/admin/offer/${id}`;
export const GET_OFFER_BY_ID = (offerId: number) =>
    `/api/admin/offer/${offerId}`;

// ################## files ##################
export const GET_FILE_AS_BASE64 = (fileId: number) =>
    `/api/files/base64/${fileId}`;

// ################## AUTO SEARCH ##################
export const AUTO_SEARCH = (searchType: string) =>
    `/api/admin/${searchType}/search`;

export const ALL_NOTIFICATION = `/api/admin/notification`;

export const GLOBAL_SEARCH = (input: string) =>
    `/api/admin/search?input=${input}`;
