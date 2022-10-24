import axiosInstance from '../../constants/api';
import { IErrorProps, IPageProps } from '../../model';
import {
    ALL_COMPANIES,
    GET_COMPANY_BY_ID,
    GET_NEXT_COMPANY_BY_ID,
    GET_PREVIOUS_COMPANY_BY_ID,
    ALL_NOTIFICATION
} from '../../constants';
import { ICompany, INotification } from '../../model/accounts';
import { AxiosError, AxiosResponse } from 'axios';
import { ICompanyFilter } from '../../model/company';
import { refreshToken } from '../auth';

//Get all getAllCompanies
export const getAllCompanies = (
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
        (resolve: (data: IPageProps<ICompany>) => void, reject) => {
            try {
                axiosInstance
                    .get(`${ALL_COMPANIES}${queryString}`)
                    .then((res: AxiosResponse<IPageProps<ICompany>>) =>
                        resolve(res.data)
                    )
                    .catch((err: AxiosError<IErrorProps>) => {
                        if (err?.response?.status === 401) {
                            refreshToken().then(() =>
                                axiosInstance
                                    .get(`${ALL_COMPANIES}${queryString}`)
                                    .then(
                                        (
                                            res: AxiosResponse<
                                                IPageProps<ICompany>
                                            >
                                        ) => resolve(res.data)
                                    )
                                    .catch((err: AxiosError<IErrorProps>) =>
                                        reject(err?.response?.data)
                                    )
                            );
                        } else reject(err.response?.data);
                    });
            } catch (error) {
                reject('Error in Get all Users axios!');
            }
        }
    );
};

//Get Company by id
export const getCompanyById = (companyId: number) => {
    return new Promise((resolve: (data: ICompany) => void, reject) => {
        try {
            axiosInstance
                .get(GET_COMPANY_BY_ID(companyId))
                .then((res: AxiosResponse<ICompany>) => resolve(res.data))
                .catch((err: AxiosError<IErrorProps>) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() =>
                            axiosInstance
                                .get(GET_COMPANY_BY_ID(companyId))
                                .then((res: AxiosResponse<ICompany>) =>
                                    resolve(res.data)
                                )
                                .catch((err: AxiosError<IErrorProps>) =>
                                    reject(err?.response?.data)
                                )
                        );
                    } else reject(err.response?.data);
                });
        } catch (error) {
            reject('Error in Get Company by id axios!');
        }
    });
};

// get next company by id
export const getNextCompany = (
    currentCompanyId: number,
    filter?: ICompanyFilter
) => {
    return new Promise((resolve: (data: ICompany) => void, reject) => {
        try {
            axiosInstance
                .get(GET_NEXT_COMPANY_BY_ID, {
                    params: { id: currentCompanyId, ...filter },
                })
                .then((res) => resolve(res.data))
                .catch((err: AxiosError<IErrorProps>) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() =>
                            axiosInstance
                                .get(GET_NEXT_COMPANY_BY_ID, {
                                    params: { id: currentCompanyId, ...filter },
                                })
                                .then((res) => resolve(res.data))
                                .catch((err: AxiosError<IErrorProps>) =>
                                    reject(err?.response?.data)
                                )
                        );
                    } else reject(err.response?.data);
                });
        } catch (error) {
            reject('Error in Get next company axios!');
        }
    });
};

// get previous company by id
export const getPreviousCompany = (
    currentCompanyId: number,
    filter?: ICompanyFilter
) => {
    return new Promise((resolve: (data: ICompany) => void, reject) => {
        try {
            axiosInstance
                .get(GET_PREVIOUS_COMPANY_BY_ID, {
                    params: { id: currentCompanyId, ...filter },
                })
                .then((res) => resolve(res.data))
                .catch((err: AxiosError<IErrorProps>) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() =>
                            axiosInstance
                                .get(GET_PREVIOUS_COMPANY_BY_ID, {
                                    params: { id: currentCompanyId, ...filter },
                                })
                                .then((res) => resolve(res.data))
                                .catch((err: AxiosError<IErrorProps>) =>
                                    reject(err?.response?.data)
                                )
                        );
                    } else reject(err.response?.data);
                });
        } catch (error) {
            reject('Error in Get previous company axios!');
        }
    });
};

// get company count
export const getCompanyCount = (filter?: ICompanyFilter) => {
    return new Promise((resolve: (data: number) => void, reject) => {
        try {
            axiosInstance
                .get(`${ALL_COMPANIES}/count`, {
                    params: filter,
                })
                .then((res) => resolve(res.data))
                .catch((err: AxiosError<IErrorProps>) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() =>
                            axiosInstance
                                .get(`${ALL_COMPANIES}/count`, {
                                    params: filter,
                                })
                                .then((res) => resolve(res.data))
                                .catch((err: AxiosError<IErrorProps>) =>
                                    reject(err?.response?.data)
                                )
                        );
                    } else reject(err.response?.data);
                });
        } catch (error) {
            reject('Error in Get company count axios!');
        }
    });
};



//Get all getAllNotification
export const getAllNotification = (
    page: number,
    size: number
) => {
    const queryString = `?page=${page}&size=${size}`;
    return new Promise(
        (resolve: (data: IPageProps<INotification>) => void, reject) => {
            try {
                axiosInstance
                    .get(`${ALL_NOTIFICATION}${queryString}`)
                    .then((res: AxiosResponse<IPageProps<INotification>>) =>
                        resolve(res.data)
                    )
                    .catch((err: AxiosError<IErrorProps>) => {
                        if (err?.response?.status === 401) {
                            refreshToken().then(() =>
                                axiosInstance
                                    .get(`${ALL_NOTIFICATION}${queryString}`)
                                    .then(
                                        (
                                            res: AxiosResponse<
                                                IPageProps<INotification>
                                            >
                                        ) => resolve(res.data)
                                    )
                                    .catch((err: AxiosError<IErrorProps>) =>
                                        reject(err?.response?.data)
                                    )
                            );
                        } else reject(err.response?.data);
                    });
            } catch (error) {
                reject('Error in Get all INotification axios!');
            }
        }
    );
};


