export interface IAddress {
    country?: string;
    department?: string;
    city: string;
    street: string;
    zipCode: string;
}

export interface IAddressProps extends IAddress {
    label: string;
    coordinates?: { lon: number; lat: number };
    searchType?: string;
}
export interface IPhone {
    id?: number;
    primary?: boolean;
    prefix: string;
    number: string;
}

export interface IGeoLocation {
    latitude: number;
    longitude: number;
}

export interface IBlockActionProps {
    blockAction: boolean;
    reason: string;
}

export type EntityType = 'USER' | 'COMPANY' | 'STORE' | 'OFFER';
export interface IGlobalSearch {
    id: number;
    text: string;
    entityType: EntityType;
}

export interface IDocument {
    id?: number;
    name: string;
    url: string;
}
