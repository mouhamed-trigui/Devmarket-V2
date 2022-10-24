export interface IPageProps<T> extends IPaging {
    content: T[];
}

export interface IPaging {
    totalPages: number;
    totalElements: number;
    numberOfElements: number;
    number: number;
    last: boolean;
    empty: boolean;
    pageable: IPageAble;
}

export interface IPageAble {
    pageNumber: number;
    pageSize: number;
    paged: boolean;
}
export interface ILocation {
    name: string;
    country: string;
    country_code: string;
    state: string;
    state_code: string;
    county: string;
    county_code: string;
    postcode: string;
    city: string;
    street: string;
    housenumber: string;
    lat: number;
    lon: number;
    formatted: string;
    address_line1: string;
    address_line2: string;
    category:
        | 'country'
        | 'state'
        | 'city'
        | 'postcode'
        | 'street'
        | 'amenity'
        | string;
    result_type:
        | 'unknown'
        | 'amenity'
        | 'building'
        | 'street'
        | 'suburb'
        | 'district'
        | 'postcode'
        | 'city'
        | 'county'
        | 'state'
        | 'country';
    distance: number;
    rank: Object;
    datasource: Object;
}
