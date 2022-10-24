import {
    CREATE_STORE_API,
    GET_NEXT_STORE,
    GET_PREVIOUS_STORE,
    GET_STORE_BY_ID,
    GET_STORE_CATEGORY,
    UPDATE_STORE_API,
} from '../../constants';
import axiosInstance from '../../constants/api';
import {
    IStore,
    IStoreCategoryProps,
    IStoreDetails,
    IStoreFilter,
    IStoreRequestProps,
    IStoreUpdateRequestProps,
} from '../../model/store';
import { VALIDATE_STORE } from './../../constants/index';
import { AxiosResponse, AxiosError } from 'axios';
import {
    GET_ALL_STORES_OF_COMPANY,
    ALL_STORE,
    DELETE_STORE,
} from '../../constants';
import { IErrorProps, IPageProps } from '../../model';
import { IBlockActionProps } from '../../model/common';
import { refreshToken } from '../auth';

//create store
export const createStore = (data: IStoreRequestProps) => {
    return new Promise(
        (
            resolve: (data: IStore) => void,
            reject: (error: AxiosResponse<IErrorProps> | undefined) => void
        ) => {
            try {
                const bodyFormData = new FormData();
                bodyFormData.append('store', JSON.stringify({ ...data.store }));
                if (data.logo) bodyFormData.append('logo', data.logo);
                if (data.cover) bodyFormData.append('cover', data.cover);
                axiosInstance
                    .post(CREATE_STORE_API, bodyFormData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    })
                    .then((res: AxiosResponse<IStore>) => {
                        resolve(res.data);
                    })
                    .catch((err: AxiosError<IErrorProps>) => {
                        if (err?.response?.status === 401) {
                            refreshToken().then(() =>
                                axiosInstance
                                    .post(CREATE_STORE_API, bodyFormData, {
                                        headers: {
                                            'Content-Type':
                                                'multipart/form-data',
                                        },
                                    })
                                    .then((res: AxiosResponse<IStore>) => {
                                        resolve(res.data);
                                    })
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

// update store
export const updateStore = (
    storeId: number,
    data: IStoreUpdateRequestProps
) => {
    return new Promise(
        (
            resolve: (data: IStore) => void,
            reject: (error: AxiosResponse<IErrorProps> | undefined) => void
        ) => {
            try {
                axiosInstance
                    .put(UPDATE_STORE_API(storeId), data)
                    .then((res: AxiosResponse<IStore>) => resolve(res.data))
                    .catch((err: AxiosError<IErrorProps>) => {
                        if (err?.response?.status === 401) {
                            refreshToken().then(() =>
                                axiosInstance
                                    .put(UPDATE_STORE_API(storeId), data)
                                    .then((res: AxiosResponse<IStore>) =>
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

// update store logo
export const updateStoreLogo = (storeId: number, logo: File) => {
    return new Promise((resolve: (data: IStore) => void, reject) => {
        try {
            const bodyFormData = new FormData();
            bodyFormData.append('logo', logo);
            axiosInstance
                .patch(UPDATE_STORE_API(storeId) + '/logo', bodyFormData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                .then((res: AxiosResponse<IStore>) => resolve(res.data))
                .catch((err: AxiosError<IErrorProps>) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() =>
                            axiosInstance
                                .patch(
                                    UPDATE_STORE_API(storeId) + '/logo',
                                    bodyFormData,
                                    {
                                        headers: {
                                            'Content-Type':
                                                'multipart/form-data',
                                        },
                                    }
                                )
                                .then((res: AxiosResponse<IStore>) =>
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

// update store cover
export const updateStoreCover = (storeId: number, cover: File) => {
    return new Promise((resolve: (data: IStore) => void, reject) => {
        try {
            const bodyFormData = new FormData();
            bodyFormData.append('cover', cover);
            axiosInstance
                .patch(UPDATE_STORE_API(storeId) + '/cover', bodyFormData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                .then((res: AxiosResponse<IStore>) => resolve(res.data))
                .catch((err: AxiosError<IErrorProps>) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() =>
                            axiosInstance
                                .patch(
                                    UPDATE_STORE_API(storeId) + '/cover',
                                    bodyFormData,
                                    {
                                        headers: {
                                            'Content-Type':
                                                'multipart/form-data',
                                        },
                                    }
                                )
                                .then((res: AxiosResponse<IStore>) =>
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

// block store
export const blockStore = (storeId: number, data: IBlockActionProps) => {
    return new Promise((resolve, reject) => {
        try {
            axiosInstance
                .patch(UPDATE_STORE_API(storeId) + '/block-action', data)
                .then((res: AxiosResponse<any>) => {
                    resolve(res.data);
                })
                .catch((err: AxiosError<IErrorProps>) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() =>
                            axiosInstance
                                .patch(
                                    UPDATE_STORE_API(storeId) + '/block-action',
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
            reject('Error in Block Store axios!');
        }
    });
};

// get all store by company ID
export const getAllStoreByCompanyId = (companyId: number) => {
    return new Promise((resolve: (data: IStore[]) => void, reject) => {
        try {
            axiosInstance
                .get(GET_ALL_STORES_OF_COMPANY(companyId))
                .then((res: AxiosResponse<IStore[]>) => {
                    resolve(res.data);
                })
                .catch((err: AxiosError<IErrorProps>) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() =>
                            axiosInstance
                                .get(GET_ALL_STORES_OF_COMPANY(companyId))
                                .then((res: AxiosResponse<IStore[]>) => {
                                    resolve(res.data);
                                })
                                .catch((err: AxiosError<IErrorProps>) =>
                                    reject(err?.response?.data)
                                )
                        );
                    } else reject(err.response?.data);
                });
        } catch (error) {
            reject('Error in Get all store by company ID axios!');
        }
    });
};

// validate store
export const validateStore = (storeId: number) => {
    return new Promise((resolve: (data: any) => void, reject) => {
        try {
            axiosInstance
                .patch(VALIDATE_STORE(storeId))
                .then((res: AxiosResponse<any>) => {
                    resolve(res.data);
                })
                .catch((err: AxiosError<IErrorProps>) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() =>
                            axiosInstance
                                .patch(VALIDATE_STORE(storeId))
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
            reject('Error in Validate store axios!');
        }
    });
};

export const getStoreCategories = (type: string) => {
    return new Promise(
        (resolve: (data: IStoreCategoryProps[]) => void, reject) => {
            try {
                axiosInstance
                    .get(GET_STORE_CATEGORY(type))
                    .then((res: AxiosResponse<IStoreCategoryProps[]>) => {
                        resolve(res.data);
                    })
                    .catch((err: AxiosError<IErrorProps>) => {
                        if (err?.response?.status === 401) {
                            refreshToken().then(() =>
                                axiosInstance
                                    .get(GET_STORE_CATEGORY(type))
                                    .then(
                                        (
                                            res: AxiosResponse<
                                                IStoreCategoryProps[]
                                            >
                                        ) => {
                                            resolve(res.data);
                                        }
                                    )
                                    .catch((err: AxiosError<IErrorProps>) =>
                                        reject(err?.response?.data)
                                    )
                            );
                        } else reject(err.response?.data);
                    });
            } catch (error) {
                reject('Error in Get store categories axios!');
            }
        }
    );
};

export const getAllStores = (
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
        (resolve: (data: IPageProps<IStore>) => void, reject) => {
            try {
                axiosInstance
                    .get(`${ALL_STORE}/page${queryString}`)
                    .then((res) => resolve(res.data))
                    .catch((err: AxiosError<IErrorProps>) => {
                        if (err?.response?.status === 401) {
                            refreshToken().then(() =>
                                axiosInstance
                                    .get(`${ALL_STORE}/page${queryString}`)
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

// get Store by ID
export const getStoreById = (storeId: number) => {
    return new Promise((resolve: (data: IStoreDetails) => void, reject) => {
        try {
            axiosInstance
                .get(GET_STORE_BY_ID(storeId))
                .then((res: AxiosResponse<IStoreDetails>) => {
                    resolve(res.data);
                })
                .catch((err: AxiosError<IErrorProps>) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() =>
                            axiosInstance
                                .get(GET_STORE_BY_ID(storeId))
                                .then((res: AxiosResponse<IStoreDetails>) => {
                                    resolve(res.data);
                                })
                                .catch((err: AxiosError<IErrorProps>) =>
                                    reject(err?.response?.data)
                                )
                        );
                    } else reject(err.response?.data);
                });
        } catch (error) {
            reject('Error in Get store by ID axios!');
        }
    });
};

//delete company
export const deleteStore = (id: number) => {
    return new Promise((resolve, reject) => {
        try {
            axiosInstance
                .delete(DELETE_STORE(id))
                .then((res) => {
                    resolve(res);
                })
                .catch((err: AxiosError<IErrorProps>) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() =>
                            axiosInstance
                                .delete(DELETE_STORE(id))
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
            console.error('in store > Delete Store, Err===', error);
            reject(error);
        }
    });
};

// get next store
export const getNextStore = (storeId: number, filter?: IStoreFilter) => {
    return new Promise((resolve: (data: IStore) => void, reject) => {
        try {
            axiosInstance
                .get(GET_NEXT_STORE, { params: { id: storeId, ...filter } })
                .then((res: AxiosResponse<IStore>) => {
                    resolve(res.data);
                })
                .catch((err: AxiosError<IErrorProps>) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() =>
                            axiosInstance
                                .get(GET_NEXT_STORE, {
                                    params: { id: storeId, ...filter },
                                })
                                .then((res: AxiosResponse<IStore>) => {
                                    resolve(res.data);
                                })
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

// get previous store
export const getPreviousStore = (storeId: number, filter?: IStoreFilter) => {
    return new Promise((resolve: (data: IStore) => void, reject) => {
        try {
            axiosInstance
                .get(GET_PREVIOUS_STORE, { params: { id: storeId, ...filter } })
                .then((res: AxiosResponse<IStore>) => resolve(res.data))
                .catch((err: AxiosError<IErrorProps>) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() =>
                            axiosInstance
                                .get(GET_PREVIOUS_STORE, {
                                    params: { id: storeId, ...filter },
                                })
                                .then((res: AxiosResponse<IStore>) =>
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

// get store count
export const getStoreCount = (filter?: IStoreFilter) => {
    return new Promise((resolve: (data: number) => void, reject) => {
        try {
            axiosInstance
                .get(ALL_STORE + '/count', { params: filter })
                .then((res: AxiosResponse<number>) => resolve(res.data))
                .catch((err: AxiosError<IErrorProps>) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() =>
                            axiosInstance
                                .get(ALL_STORE + '/count', { params: filter })
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
            reject(error);
        }
    });
};
