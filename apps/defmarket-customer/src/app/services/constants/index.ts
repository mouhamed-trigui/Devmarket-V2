export const Unauthorized = 401;

// ################## AUTH ##################
export const ME = `/api/auth/me`;
export const REFRESH_TOKEN = `/api/auth/refresh-token`;

// ################## USER ##################
export const GET_USER = `/api/user`; // HTTP POST
export const GET_USER_BY_ID = (id: number) => `/api/user/by-id/` + id;

// ################## ANNOUNCEMENTS ##################
export const GET_ANNOUNCEMENTS = `/api/announcements`; 
export const GET_TICKET = `/api/ticket`; 


// ################## STORE & OFFERS ##################
export const GET_OFFER_BY_STORE = (id: number) => `/api/store/${id}/offers`;

export const GET_OFFER_BY_LEVEL = (id: number) =>
    `/api/store/${id}/offers/level`;
export const GET_ALL_STORES = `/api/customer/store/page`;
export const GET_STORE_BY_ID = (id: number) => `/api/customer/store/${id}`;
export const GET_STORE = `/api/store`;

export const GET_OFFER_BY_ID = (id: number) => `/api/customer/offer/${id}`;

export const TIMETABLE_OF_STORE = (id: number) => `/api/store/${id}/timetable`;
// ################## STORE CATEGORY ##################
export const GET_STORE_CATEGORY = `/api/customer/store-category`;

// ################## LOCATION ##################
export const GET_LOCATION_DETAILS = `https://api.geoapify.com/v1/geocode/reverse`;
export const GET_LAT_LONG_OF_CITY = `https://api.geoapify.com/v1/geocode/search`;

/* ENUM */
export enum StoreTypeEnum {
    E_COMMERCE = 'E_COMMERCE',
    PHYSICAL = 'PHYSICAL',
    PHYSICAL_AND_E_COMMERCE = 'PHYSICAL_AND_E_COMMERCE',
}
export enum PaymentMethodEnum {
    CASH = 'CASH',
    CHECK = 'CHECK',
    CB = 'CB',
}

export enum MediaTypeEnum {
    LINK = 'Link',
    FACEBOOK = 'Facebook',
    INSTAGRAM = 'Instagram',
    TWITTER = 'Twitter',
    LINKEDIN = 'LinkedIn',
    GOOGLEPLUS = 'GooglePlus',
    YOUTUBE = 'Youtube',
    PHONE = 'Phone',
    EMAIL = 'Email',
    OTHER = 'Other',
}
export enum OfferTypeEnum {
    PERCENTAGE = 'PERCENTAGE',
    FLAT = 'FLAT',
    GOOD_PLAN = 'GOOD_PLAN',
    GIFT = 'GIFT',
}
export enum DayEnum {
    MONDAY = 'MONDAY',
    TUESDAY = 'TUESDAY',
    WEDNESDAY = 'WEDNESDAY',
    THURSDAY = 'THURSDAY',
    FRIDAY = 'FRIDAY',
    SATURDAY = 'SATURDAY',
    SUNDAY = 'SUNDAY',
}
export enum ClosureTypeEnum {
    CONSTRUCTION = 'CONSTRUCTION',
    ANNUAL_CLOSURE = 'ANNUAL_CLOSURE',
    HOLIDAYS = 'HOLIDAYS',
}
