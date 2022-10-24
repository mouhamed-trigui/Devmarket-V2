import { AxiosResponse, AxiosError } from 'axios';
import {
    CREATE_OFFER_API,
    GET_NEXT_OFFER,
    GET_OFFER_BY_ID,
    GET_OFFER_COUNT,
    GET_PREVIOUS_OFFER,
    UPDATE_OFFER_API,
} from '../../constants';
import axiosInstance from '../../constants/api';
import { IOffer, IOfferFilter, IOfferRequestProps } from '../../model/offer';
import {
    GET_ALL_OFFERS_OF_STORE,
    VALIDATE_OFFER,
    ALL_OFFER,
    DELETE_OFFER,
} from '../../constants';
import { IErrorProps, IPageProps } from '../../model';
import { IBlockActionProps } from '../../model/common';
import { refreshToken } from '../auth';

//create offer
export const createOffer = (data: {
    storeId: number;
    offer: IOfferRequestProps;
    photo?: File;
    attachedFile?: File;
}) => {
    return new Promise(
        (
            resolve: (data: IOfferRequestProps) => void,
            reject: (error: AxiosResponse<IErrorProps> | undefined) => void
        ) => {
            try {
                const bodyFormData = new FormData();
                bodyFormData.append('storeId', data.storeId.toString());
                bodyFormData.append('offer', JSON.stringify(data.offer));
                if (data.photo) bodyFormData.append('photo', data.photo);
                if (data.attachedFile)
                    bodyFormData.append('attachedFile', data.attachedFile);
                axiosInstance
                    .post(CREATE_OFFER_API, bodyFormData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    })
                    .then((res: AxiosResponse<IOfferRequestProps>) => {
                        resolve(res.data);
                    })
                    .catch((err: AxiosError<IErrorProps>) => {
                        if (err?.response?.status === 401) {
                            refreshToken().then(() =>
                                axiosInstance
                                    .post(CREATE_OFFER_API, bodyFormData, {
                                        headers: {
                                            'Content-Type':
                                                'multipart/form-data',
                                        },
                                    })
                                    .then(
                                        (
                                            res: AxiosResponse<IOfferRequestProps>
                                        ) => {
                                            resolve(res.data);
                                        }
                                    )
                                    .catch((err: AxiosError<IErrorProps>) =>
                                        reject(err?.response)
                                    )
                            );
                        } else reject(err.response);
                    });
            } catch (error) {
                reject({
                    data: { message: 'error.axios' },
                } as AxiosResponse<IErrorProps>);
            }
        }
    );
};

// update offer
export const updateOffer = (offerId: number, data: IOffer) => {
    return new Promise(
        (
            resolve: (data: IOffer) => void,
            reject: (error: AxiosResponse<IErrorProps> | undefined) => void
        ) => {
            try {
                axiosInstance
                    .put(UPDATE_OFFER_API(offerId), data)
                    .then((res: AxiosResponse<IOffer>) => resolve(res.data))
                    .catch((err: AxiosError<IErrorProps>) => {
                        if (err?.response?.status === 401) {
                            refreshToken().then(() =>
                                axiosInstance
                                    .put(UPDATE_OFFER_API(offerId), data)
                                    .then((res: AxiosResponse<IOffer>) =>
                                        resolve(res.data)
                                    )
                                    .catch((err: AxiosError<IErrorProps>) =>
                                        reject(err?.response)
                                    )
                            );
                        } else reject(err.response);
                    });
            } catch (error) {
                reject({
                    data: { message: 'error.axios' },
                } as AxiosResponse<IErrorProps>);
            }
        }
    );
};

// update offer photo
export const updateOfferPhoto = (offerId: number, photo: File) => {
    return new Promise((resolve: (data: IOffer) => void, reject) => {
        try {
            const bodyFormData = new FormData();
            bodyFormData.append('photo', photo);
            axiosInstance
                .patch(UPDATE_OFFER_API(offerId) + '/photo', bodyFormData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                .then((res: AxiosResponse<IOffer>) => resolve(res.data))
                .catch((err: AxiosError<IErrorProps>) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() =>
                            axiosInstance
                                .patch(
                                    UPDATE_OFFER_API(offerId) + '/photo',
                                    bodyFormData,
                                    {
                                        headers: {
                                            'Content-Type':
                                                'multipart/form-data',
                                        },
                                    }
                                )
                                .then((res: AxiosResponse<IOffer>) =>
                                    resolve(res.data)
                                )
                                .catch((err: AxiosError<IErrorProps>) =>
                                    reject(err?.response?.data)
                                )
                        );
                    } else reject(err.response?.data);
                });
        } catch (error) {
            reject(error);
        }
    });
};

// update offer attached file
export const updateOfferAttachedFile = (offerId: number, file: File) => {
    return new Promise((resolve: (data: IOffer) => void, reject) => {
        try {
            const bodyFormData = new FormData();
            bodyFormData.append('file', file);
            axiosInstance
                .patch(UPDATE_OFFER_API(offerId) + '/file', bodyFormData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                .then((res: AxiosResponse<IOffer>) => resolve(res.data))
                .catch((err: AxiosError<IErrorProps>) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() =>
                            axiosInstance
                                .patch(
                                    UPDATE_OFFER_API(offerId) + '/file',
                                    bodyFormData,
                                    {
                                        headers: {
                                            'Content-Type':
                                                'multipart/form-data',
                                        },
                                    }
                                )
                                .then((res: AxiosResponse<IOffer>) =>
                                    resolve(res.data)
                                )
                                .catch((err: AxiosError<IErrorProps>) =>
                                    reject(err?.response?.data)
                                )
                        );
                    } else reject(err.response?.data);
                });
        } catch (error) {
            reject(error);
        }
    });
};

// get all offers by store ID
export const getAllOffersByStoreId = (storeId: number) => {
    return new Promise((resolve: (data: IOffer[]) => void, reject) => {
        try {
            axiosInstance
                .get(GET_ALL_OFFERS_OF_STORE(storeId))
                .then((res: AxiosResponse<IOffer[]>) => {
                    resolve(res.data);
                })
                .catch((err: AxiosError<IErrorProps>) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() =>
                            axiosInstance
                                .get(GET_ALL_OFFERS_OF_STORE(storeId))
                                .then((res: AxiosResponse<IOffer[]>) => {
                                    resolve(res.data);
                                })
                                .catch((err: AxiosError<IErrorProps>) =>
                                    reject(err?.response?.data)
                                )
                        );
                    } else reject(err.response?.data);
                });
        } catch (error) {
            reject('Error in Get all offers by store ID axios!');
        }
    });
};

// validate offer
export const validateOffer = (offerId: number) => {
    return new Promise((resolve: (data: any) => void, reject) => {
        try {
            axiosInstance
                .patch(VALIDATE_OFFER(offerId))
                .then((res: AxiosResponse<any>) => {
                    resolve(res.data);
                })
                .catch((err: AxiosError<IErrorProps>) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() =>
                            axiosInstance
                                .patch(VALIDATE_OFFER(offerId))
                                .then((res: AxiosResponse<any>) => {
                                    resolve(res.data);
                                })
                                .catch((err: AxiosError<IErrorProps>) =>
                                    reject(err?.response?.data)
                                )
                        );
                    } else reject(err.response?.data);
                });
        } catch (error) {
            reject('Error in Validate offer axios!');
        }
    });
};

// block offer
export const blockOffer = (offerId: number, data: IBlockActionProps) => {
    return new Promise((resolve, reject) => {
        try {
            axiosInstance
                .patch(UPDATE_OFFER_API(offerId) + '/block-action', data)
                .then((res: AxiosResponse<any>) => {
                    resolve(res.data);
                })
                .catch((err: AxiosError<IErrorProps>) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() =>
                            axiosInstance
                                .patch(
                                    UPDATE_OFFER_API(offerId) + '/block-action',
                                    data
                                )
                                .then((res: AxiosResponse<any>) => {
                                    resolve(res.data);
                                })
                                .catch((err: AxiosError<IErrorProps>) =>
                                    reject(err?.response?.data)
                                )
                        );
                    } else reject(err.response?.data);
                });
        } catch (error) {
            reject('Error in Block Offer axios!');
        }
    });
};

export const getAllOffers = (
    filters: {
        key: string;
        value: boolean;
    }[],
    page: number,
    size: number
) => {
    let queryString = `?page=${page}&size=${size}`;
    filters.forEach(
        (filter) => (queryString += `&${filter.key}=${filter.value}`)
    );

    return new Promise(
        (resolve: (data: IPageProps<IOffer>) => void, reject) => {
            try {
                axiosInstance
                    .get(`${ALL_OFFER}/page${queryString}`)
                    .then((res) => resolve(res.data))
                    .catch((err: AxiosError<IErrorProps>) => {
                        if (err?.response?.status === 401) {
                            refreshToken().then(() =>
                                axiosInstance
                                    .get(`${ALL_OFFER}/page${queryString}`)
                                    .then((res) => resolve(res.data))
                                    .catch((err: AxiosError<IErrorProps>) =>
                                        reject(err?.response?.data)
                                    )
                            );
                        } else reject(err.response?.data);
                    });
            } catch (error) {
                reject('Error in Get all Stores axios!');
            }
        }
    );
};

//get offer by id
export const getOfferById = (offerId: number) => {
    return new Promise((resolve: (data: IOffer) => void, reject) => {
        try {
            axiosInstance
                .get(GET_OFFER_BY_ID(offerId))
                .then((res: AxiosResponse<IOffer>) => {
                    resolve(res.data);
                })
                .catch((err: AxiosError<IErrorProps>) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() =>
                            axiosInstance
                                .get(GET_OFFER_BY_ID(offerId))
                                .then((res: AxiosResponse<IOffer>) => {
                                    resolve(res.data);
                                })
                                .catch((err: AxiosError<IErrorProps>) =>
                                    reject(err?.response?.data)
                                )
                        );
                    } else reject(err.response?.data);
                });
        } catch (error) {
            reject('Error in Get offer by id axios!');
        }
    });
};

//delete Offer
export const deleteOffer = (id: number) => {
    return new Promise((resolve, reject) => {
        try {
            axiosInstance
                .delete(DELETE_OFFER(id))
                .then((res) => {
                    resolve(res);
                })
                .catch((err: AxiosError<IErrorProps>) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() =>
                            axiosInstance
                                .delete(DELETE_OFFER(id))
                                .then((res) => {
                                    resolve(res);
                                })
                                .catch((err: AxiosError<IErrorProps>) =>
                                    reject(err?.response?.data)
                                )
                        );
                    } else reject(err.response?.data);
                });
        } catch (error) {
            console.error('in auth > Delete Offer, Err===', error);
            reject(error);
        }
    });
};

// get next offer
export const getNextOffer = (id: number, filter?: IOfferFilter) => {
    return new Promise(
        (
            resolve: (store: IOffer) => void,
            reject: (error: AxiosResponse<IErrorProps> | undefined) => void
        ) => {
            try {
                axiosInstance
                    .get(GET_NEXT_OFFER, { params: { id, ...filter } })
                    .then((res: AxiosResponse<IOffer>) => {
                        resolve(res.data);
                    })
                    .catch((err: AxiosError<IErrorProps>) => {
                        if (err?.response?.status === 401) {
                            refreshToken().then(() =>
                                axiosInstance
                                    .get(GET_NEXT_OFFER, {
                                        params: { id, ...filter },
                                    })
                                    .then((res: AxiosResponse<IOffer>) => {
                                        resolve(res.data);
                                    })
                                    .catch((err: AxiosError<IErrorProps>) =>
                                        reject(err?.response)
                                    )
                            );
                        } else reject(err.response);
                    });
            } catch (error) {
                console.error('in offer > Get Next Offer, Err===', error);
                reject({
                    data: { message: 'error.axios' },
                } as AxiosResponse<IErrorProps>);
            }
        }
    );
};

// get previous offer
export const getPreviousOffer = (id: number, filter?: IOfferFilter) => {
    return new Promise(
        (
            resolve: (store: IOffer) => void,
            reject: (error?: IErrorProps | unknown) => void
        ) => {
            try {
                axiosInstance
                    .get(GET_PREVIOUS_OFFER, { params: { id, ...filter } })
                    .then((res: AxiosResponse<IOffer>) => resolve(res.data))
                    .catch((err: AxiosError<IErrorProps>) => {
                        if (err?.response?.status === 401) {
                            refreshToken().then(() =>
                                axiosInstance
                                    .get(GET_PREVIOUS_OFFER, {
                                        params: { id, ...filter },
                                    })
                                    .then((res: AxiosResponse<IOffer>) =>
                                        resolve(res.data)
                                    )
                                    .catch((err: AxiosError<IErrorProps>) =>
                                        reject(err?.response?.data)
                                    )
                            );
                        } else reject(err.response?.data);
                    });
            } catch (error) {
                console.error('in offer > Get Previous Offer, Err===', error);
                reject(error);
            }
        }
    );
};

// get offer count
export const getOfferCount = (filter?: IOfferFilter) => {
    return new Promise(
        (
            resolve: (count: number) => void,
            reject: (error?: IErrorProps | unknown) => void
        ) => {
            try {
                axiosInstance
                    .get(GET_OFFER_COUNT, { params: filter })
                    .then((res: AxiosResponse<number>) => resolve(res.data))
                    .catch((err: AxiosError<IErrorProps>) => {
                        if (err?.response?.status === 401) {
                            refreshToken().then(() =>
                                axiosInstance
                                    .get(GET_OFFER_COUNT, { params: filter })
                                    .then((res: AxiosResponse<number>) =>
                                        resolve(res.data)
                                    )
                                    .catch((err: AxiosError<IErrorProps>) =>
                                        reject(err?.response?.data)
                                    )
                            );
                        } else reject(err.response?.data);
                    });
            } catch (error) {
                console.error('in offer > Get Offer Count, Err===', error);
                reject(error);
            }
        }
    );
};
