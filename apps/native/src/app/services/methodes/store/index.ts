import { AxiosResponse } from 'axios';
import {
    GETFIRSTSTORE,
    GET_ALL_STORE_BY_COMPANY_ID,
    GET_STORE_CATEGORY,
    STORE_API_URL,
    TIMETABLE_OF_STORE,
    TOGGLE_VISIBILITY,
    UPDATE_TIMETABLE_LIST_OF_STORE,
} from '../../constants';
import axiosInstance from '../../constants/api';
import {
    FileUpload,
    IStoreProps,
    ITimetableProps,
    ITimetableWithTemporaryClosureProps,
    IStoreCategoryProps,
    IStoreOfCompanyProps,
} from '../../model/company';
import { refreshToken } from '../auth';

//Get stores of company
export const getAllStoresOfCompany = (companyId: number) => {
    return new Promise((resolve: (data: IStoreProps[]) => void, reject) => {
        try {
            axiosInstance
                .get(GET_ALL_STORE_BY_COMPANY_ID(companyId))
                .then((res) => resolve(res?.data))
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .get(GET_ALL_STORE_BY_COMPANY_ID(companyId))
                                .then((res) => {
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
            console.error('in auth > Get Stores of Company, Err===', error);
            reject(error);
        }
    });
};

export const getStore = (storeId: number) => {
    return new Promise((resolve: (data: IStoreProps) => void, reject) => {
        try {
            axiosInstance
                .get(STORE_API_URL(storeId))
                .then((res) => resolve(res?.data))
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .get(STORE_API_URL(storeId))
                                .then((res) => {
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

export const updateStore = (storeId: number, data: IStoreProps) => {
    return new Promise((resolve: (data: IStoreProps) => void, reject) => {
        try {
            axiosInstance
                .put(STORE_API_URL(storeId), data)
                .then((res: AxiosResponse<IStoreProps>) => {
                    resolve(res?.data);
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .put(STORE_API_URL(storeId), data)
                                .then((res) => {
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
            console.error('in auth > Update Store, Err===', error);
            reject(error);
        }
    });
};

export const updateStoreLogo = (storeId: number, logo: FileUpload | File) => {
    return new Promise((resolve: (data: IStoreProps) => void, reject) => {
        try {
            const formData = new FormData();
            formData.append('logo', logo);
            axiosInstance
                .patch(STORE_API_URL(storeId) + '/logo', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                .then((res: AxiosResponse<IStoreProps>) => {
                    resolve(res?.data);
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .patch(
                                    STORE_API_URL(storeId) + '/logo',
                                    formData,
                                    {
                                        headers: {
                                            'Content-Type':
                                                'multipart/form-data',
                                        },
                                    }
                                )
                                .then((res) => {
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
            console.error('in auth > Update Store logo, Err===', error);
            reject(error);
        }
    });
};

export const updateStoreCover = (storeId: number, cover: FileUpload | File) => {
    return new Promise((resolve: (data: IStoreProps) => void, reject) => {
        try {
            const formData = new FormData();
            formData.append('cover', cover);
            axiosInstance
                .patch(STORE_API_URL(storeId) + '/cover', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                .then((res: AxiosResponse<IStoreProps>) => {
                    resolve(res?.data);
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .patch(
                                    STORE_API_URL(storeId) + '/cover',
                                    formData,
                                    {
                                        headers: {
                                            'Content-Type':
                                                'multipart/form-data',
                                        },
                                    }
                                )
                                .then((res) => {
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
            console.error('in auth > Update Store cover, Err===', error);
            reject(error);
        }
    });
};

export const toggleStoreVisibility = (storeId: number) => {
    return new Promise((resolve: (data: IStoreProps) => void, reject) => {
        try {
            axiosInstance
                .patch(TOGGLE_VISIBILITY(storeId))
                .then((res: AxiosResponse<IStoreProps>) => {
                    resolve(res?.data);
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .patch(TOGGLE_VISIBILITY(storeId))
                                .then((res) => {
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
            console.error('in auth > Update visibility Store, Err===', error);
            reject(error);
        }
    });
};

export const deleteStore = (storeId: number) => {
    return new Promise((resolve, reject) => {
        try {
            axiosInstance
                .delete(STORE_API_URL(storeId))
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .delete(STORE_API_URL(storeId))
                                .then((res) => {
                                    resolve(res);
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
            console.error('in auth > Delete Store, Err===', error);
            reject(error);
        }
    });
};

//Store Timetable
export const getAllTimetableOfStore = (storeId: number) => {
    return new Promise((resolve: (data: ITimetableProps[]) => void, reject) => {
        try {
            axiosInstance
                .get(TIMETABLE_OF_STORE(storeId))
                .then((res) => resolve(res?.data))
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .get(TIMETABLE_OF_STORE(storeId))
                                .then((res) => {
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
            console.error('in auth > Get Timetables of Store, Err===', error);
            reject(error);
        }
    });
};

export const updateTimetableList = (
    storeId: number,
    data: ITimetableWithTemporaryClosureProps
) => {
    return new Promise(
        (
            resolve: (data: ITimetableWithTemporaryClosureProps) => void,
            reject
        ) => {
            try {
                axiosInstance
                    .put(UPDATE_TIMETABLE_LIST_OF_STORE(storeId), data)
                    .then((res) => resolve(res?.data))
                    .catch((err) => {
                        if (err?.response?.status === 401) {
                            refreshToken().then(() => {
                                axiosInstance
                                    .put(
                                        UPDATE_TIMETABLE_LIST_OF_STORE(storeId),
                                        data
                                    )
                                    .then((res) => {
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
                console.error('in auth > Update Timetable, Err===', error);
                reject(error);
            }
        }
    );
};

//////////// store categories //////////////
export const getStoreCategories = (type: string) => {
    return new Promise(
        (resolve: (data: IStoreCategoryProps[]) => void, reject) => {
            try {
                axiosInstance
                    .get(GET_STORE_CATEGORY(type))
                    .then((res: AxiosResponse<IStoreCategoryProps[]>) => {
                        resolve(res.data);
                    })
                    .catch((err) => {
                        if (err?.response?.status === 401) {
                            refreshToken().then(() => {
                                axiosInstance
                                    .get(GET_STORE_CATEGORY(type))
                                    .then((res) => {
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
                console.error('in auth > Get Store Categories, Err===', error);
                reject(error);
            }
        }
    );
};

// Get first Store

export const GetFirstStore = () => {
    return new Promise(
        (resolve: (data: IStoreOfCompanyProps) => void, reject) => {
            try {
                axiosInstance
                    .get(GETFIRSTSTORE())
                    .then((res: AxiosResponse<IStoreOfCompanyProps>) => {
                        resolve(res.data);
                    })
                    .catch((err) => {
                        if (err?.response?.status === 401) {
                            refreshToken().then(() => {
                                axiosInstance
                                    .get(GETFIRSTSTORE())
                                    .then((res) => {
                                        resolve(res.data);
                                    })
                                    .catch((err) => {
                                        reject(err);
                                    });
                            });
                        } else {
                            console.error('Get First Store , Err===', err);
                            reject(err);
                        }
                    });
            } catch (error) {
                console.error('in auth > Get Store , Err===', error);
                reject(error);
            }
        }
    );
};
