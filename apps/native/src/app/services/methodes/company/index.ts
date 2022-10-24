import axiosInstance from '../../constants/api';
import { companyProps } from '../../model';
import {
    ADDEDCOMPANY,
    UPDATEDCOMPANY,
    DELETEDCOMPANY,
    ALLCOMPANY,
    OTHER_ACTIVITY_STORE,
    GET_ALL_COMPANY_WITH_STORES,
} from '../../constants';
import { AxiosResponse } from 'axios';
import { refreshToken } from '../auth';

//add company
export const addCompany = (data: companyProps) => {
    return new Promise((resolve, reject) => {
        try {
            axiosInstance
                .post(ADDEDCOMPANY, data)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .post(ADDEDCOMPANY, data)
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
            console.error('in auth > Create company, Err===', error);
            reject(error);
        }
    });
};

//update company
export const updateCompany = (id: number, data: any) => {
    return new Promise((resolve: (data: companyProps) => void, reject) => {
        try {
            axiosInstance
                .put(UPDATEDCOMPANY(id), data)
                .then((res: AxiosResponse<companyProps>) => {
                    resolve(res?.data);
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .put(UPDATEDCOMPANY(id), data)
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
            console.error('in auth > Update Company, Err===', error);
            reject(error);
        }
    });
};

//delete company
export const deleteCompany = (id: number) => {
    return new Promise((resolve, reject) => {
        try {
            axiosInstance
                .delete(DELETEDCOMPANY(id))
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .delete(DELETEDCOMPANY(id))
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
            console.error('in auth > Delete Company, Err===', error);
            reject(error);
        }
    });
};

//Get company
export const listCompany = () => {
    return new Promise((resolve: (data: companyProps[]) => void, reject) => {
        try {
            axiosInstance
                .get(ALLCOMPANY)
                .then((res: AxiosResponse<companyProps[]>) => resolve(res.data))
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .get(ALLCOMPANY)
                                .then((res: AxiosResponse<companyProps[]>) => {
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
            console.error('in auth > Get Company, Err===', error);
            reject(error);
        }
    });
};

//**********Other Activity store************/

export const otherActivityStore = (id: number, data: any) => {
    return new Promise((resolve, reject) => {
        try {
            axiosInstance
                .put(OTHER_ACTIVITY_STORE(id), data)
                .then((res: any) => {
                    resolve(res);
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .put(OTHER_ACTIVITY_STORE(id), data)
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
            console.error('while sending request store, Err===', error);
            reject(error);
        }
    });
};

// ALL COMPANY & STORES

export const getAllCompanyWithStores = (page?: number, size?: number) => {
    return new Promise((resolve: (data: any) => void, reject) => {
        try {
            axiosInstance
                .get(GET_ALL_COMPANY_WITH_STORES(page, size))
                .then((res: any) => resolve(res.data))
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .get(GET_ALL_COMPANY_WITH_STORES(page, size))
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
            console.error('in auth > Get All Company, Err===', error);
            reject(error);
        }
    });
};
