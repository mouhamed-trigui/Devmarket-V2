import { AxiosResponse } from 'axios';
import {
    GET_ALL_STORES,
    GET_LAT_LONG_OF_CITY,
    GET_LOCATION_DETAILS,
    GET_STORE_BY_ID,
    Unauthorized,
} from '../../constants';
import { axiosInstance2, geoapifyKey } from '../../constants/api';
import { refreshToken } from '../auth';
import { IStore, IStoreDetails } from './../../model/store/index';
import { IPageProps, ILocation } from './../../model/index';
export const getAllStores = (
    page: number,
    categoryId: number,
    city: string,
    distance: number,
    geolocation: { latitude: number; longitude: number }
) => {
    return new Promise(
        (resolve: (data: IPageProps<IStore>) => void, reject) => {
            try {
                axiosInstance2
                    .get(GET_ALL_STORES, {
                        params: {
                            page: page ?? 0,
                            size: 3,
                            'geolocation.latitude': geolocation?.latitude,
                            'geolocation.longitude': geolocation?.longitude,
                            categoryId: categoryId ?? null,
                            city: city ?? null,
                            distance: distance ?? null,
                        },
                    })
                    .then((res: AxiosResponse<IPageProps<IStore>>) => {
                        resolve(res?.data);
                    })
                    .catch((err) => {
                        if (err.response.status === Unauthorized) {
                            refreshToken().then(() => {
                                axiosInstance2
                                    .get(GET_ALL_STORES, {
                                        params: {
                                            page: page ?? 0,
                                            size: 3,
                                            categoryId: categoryId ?? null,
                                        },
                                    })
                                    .then(
                                        (
                                            res: AxiosResponse<
                                                IPageProps<IStore>
                                            >
                                        ) => {
                                            resolve(res.data);
                                        }
                                    )
                                    .catch((err) => {
                                        reject(err);
                                    });
                            });
                        } else {
                            reject(err);
                        }
                    });
            } catch (error) {
                console.error('in auth > Get all Stores, Err===', error);
                reject(error);
            }
        }
    );
};

export const getStoreById = (storeId: number) => {
    return new Promise((resolve: (data: IStoreDetails[]) => void, reject) => {
        try {
            axiosInstance2
                .get(GET_STORE_BY_ID(storeId))
                .then((res: AxiosResponse<IStoreDetails[]>) => {
                    resolve(res?.data);
                })
                .catch((err) => {
                    if (err.response.status === Unauthorized) {
                        refreshToken().then(() => {
                            axiosInstance2
                                .get(GET_STORE_BY_ID(storeId))
                                .then((res: AxiosResponse<IStoreDetails[]>) => {
                                    resolve(res.data);
                                })
                                .catch((err) => {
                                    reject(err);
                                });
                        });
                    } else {
                        reject(err);
                    }
                });
        } catch (error) {
            console.error('in auth > Get Store by ID, Err===', error);
            reject(error);
        }
    });
};

export const getLocationDetails = (lat, lon) => {
    return new Promise(
        (resolve: (data: { results: ILocation[] }) => void, reject) => {
            try {
                axiosInstance2
                    .get(GET_LOCATION_DETAILS, {
                        params: {
                            lat,
                            lon,
                            apiKey: geoapifyKey,
                            format: 'json',
                            type: 'city',
                        },
                    })
                    .then((res: AxiosResponse<{ results: ILocation[] }>) => {
                        resolve(res?.data);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            } catch (error) {
                console.error('get current location, Err===', error);
                reject(error);
            }
        }
    );
};

export const getLatLongOfCity = (city, country?, postcode?) => {
    return new Promise(
        (resolve: (data: { results: ILocation[] }) => void, reject) => {
            try {
                axiosInstance2
                    .get(GET_LAT_LONG_OF_CITY, {
                        params: {
                            country,
                            city,
                            postcode,
                            apiKey: geoapifyKey,
                            format: 'json',
                        },
                    })
                    .then((res: AxiosResponse<{ results: ILocation[] }>) => {
                        resolve(res?.data);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            } catch (error) {
                console.error('get user city location, Err===', error);
                reject(error);
            }
        }
    );
};
