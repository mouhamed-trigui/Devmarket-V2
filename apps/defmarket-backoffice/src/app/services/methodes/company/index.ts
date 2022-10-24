import { IBasicCompany, INotification } from './../../model/accounts/index';
import axios, { AxiosError } from 'axios';
import {
    BLOCK_COMPANY,
    CREATE_COMPANY_API,
    DENOMINATION,
    UPDATE_COMPANY_API,
    GET_COMPANY_BY_USER_ID,
    ALL_NOTIFICATION,
} from '../../constants';
import axiosInstance from '../../constants/api';
import { companyProps } from '../../model';
import { AxiosResponse } from 'axios';
import { VALIDATE_COMPANY, DELETE_COMPANY } from '../../constants';
import { IErrorProps } from '../../model';
import { ICompany } from '../../model/accounts';
import { refreshToken } from '../auth';
import { IBlockActionProps } from '../../model/common';
import { IStructure } from '../../model/company';

export const findByDenomination = (nom: string) => {
    return new Promise<IStructure[]>((resolve, reject) => {
        try {
            axios
                .get(DENOMINATION(nom))
                .then((res) => {
                    resolve(res.data.results);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            reject(error);
        }
    });
};

//create notification
export const createNotification = (data: any) => {
    return new Promise(
        (
            resolve: (data: INotification) => void,
            reject: (error: AxiosResponse<IErrorProps> | undefined) => void
        ) => {
            try {
                axiosInstance
                    .post(ALL_NOTIFICATION, data)
                    .then((res: AxiosResponse<INotification>) => {
                        resolve(res.data);
                    })
                    .catch((err: AxiosError<IErrorProps>) => {
                        if (err?.response?.status === 401) {
                            refreshToken().then(() =>
                                axiosInstance
                                    .post(ALL_NOTIFICATION, data)
                                    .then((res) => resolve(res.data))
                                    .catch((err: AxiosError<IErrorProps>) =>
                                        reject(err?.response)
                                    )
                            );
                        } else reject(err.response);
                    });
            } catch (error) {
                console.error(
                    'in company > Create NOTIFICATION, Err===',
                    error
                );
                reject({
                    data: { message: 'error.axios' },
                } as AxiosResponse<IErrorProps>);
            }
        }
    );
};

//create company
export const createCompany = (data: companyProps) => {
    return new Promise(
        (
            resolve: (data: ICompany) => void,
            reject: (error: AxiosResponse<IErrorProps> | undefined) => void
        ) => {
            try {
                axiosInstance
                    .post(CREATE_COMPANY_API, data)
                    .then((res: AxiosResponse<ICompany>) => {
                        resolve(res.data);
                    })
                    .catch((err: AxiosError<IErrorProps>) => {
                        if (err?.response?.status === 401) {
                            refreshToken().then(() =>
                                axiosInstance
                                    .post(CREATE_COMPANY_API, data)
                                    .then((res) => resolve(res.data))
                                    .catch((err: AxiosError<IErrorProps>) =>
                                        reject(err?.response)
                                    )
                            );
                        } else reject(err.response);
                    });
            } catch (error) {
                console.error('in company > Create company, Err===', error);
                reject({
                    data: { message: 'error.axios' },
                } as AxiosResponse<IErrorProps>);
            }
        }
    );
};

// update company with id
export const updateCompany = (id: number, data: IBasicCompany) => {
    return new Promise(
        (
            resolve: (data: ICompany) => void,
            reject: (error: AxiosResponse<IErrorProps> | undefined) => void
        ) => {
            try {
                axiosInstance
                    .put(UPDATE_COMPANY_API(id), data)
                    .then((res: AxiosResponse<ICompany>) => {
                        resolve(res.data);
                    })
                    .catch((err: AxiosError<IErrorProps>) => {
                        if (err?.response?.status === 401) {
                            refreshToken().then(() =>
                                axiosInstance
                                    .put(UPDATE_COMPANY_API(id), data)
                                    .then((res: AxiosResponse<ICompany>) => {
                                        resolve(res.data);
                                    })
                                    .catch((err: AxiosError<IErrorProps>) =>
                                        reject(err?.response)
                                    )
                            );
                        } else reject(err.response);
                    });
            } catch (error) {
                console.error('in company > Update company, Err===', error);
                reject({
                    data: { message: 'error.axios' },
                } as AxiosResponse<IErrorProps>);
            }
        }
    );
};

// validate company
export const validateCompany = (companyId: number) => {
    return new Promise((resolve: (data: any) => void, reject) => {
        try {
            axiosInstance
                .patch(VALIDATE_COMPANY(companyId))
                .then((res: AxiosResponse<any>) => {
                    resolve(res.data);
                })
                .catch((err: AxiosError<IErrorProps>) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() =>
                            axiosInstance
                                .patch(VALIDATE_COMPANY(companyId))
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
            reject('Error in Validate company axios!');
        }
    });
};

//block company
export const blockCompany = (companyId: number, data: IBlockActionProps) => {
    return new Promise((resolve: (data: any) => void, reject) => {
        try {
            axiosInstance
                .patch(BLOCK_COMPANY(companyId), data)
                .then((res: AxiosResponse<any>) => {
                    resolve(res.data);
                })
                .catch((err: AxiosError<IErrorProps>) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() =>
                            axiosInstance
                                .patch(BLOCK_COMPANY(companyId), data)
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
            reject('Error in block company axios!');
        }
    });
};

//delete company
export const deleteCompany = (id: number) => {
    return new Promise((resolve, reject) => {
        try {
            axiosInstance
                .delete(DELETE_COMPANY(id))
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .delete(DELETE_COMPANY(id))
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
            console.error('in company > Delete Company, Err===', error);
            reject(error);
        }
    });
};

// get all company by user id
export const getCompanyByUserId = (userId: number) => {
    return new Promise((resolve: (res: ICompany[]) => void, reject) => {
        try {
            axiosInstance
                .get(GET_COMPANY_BY_USER_ID(userId))
                .then((res: AxiosResponse<ICompany[]>) => {
                    resolve(res.data);
                })
                .catch((err: AxiosError<IErrorProps>) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() =>
                            axiosInstance
                                .get(GET_COMPANY_BY_USER_ID(userId))
                                .then((res: AxiosResponse<ICompany[]>) => {
                                    resolve(res.data);
                                })
                                .catch((err: AxiosError<IErrorProps>) =>
                                    reject(err?.response?.data)
                                )
                        );
                    } else reject(err.response?.data);
                });
        } catch (error) {
            console.error('in company > Get company by user id, Err===', error);
            reject(error);
        }
    });
};
