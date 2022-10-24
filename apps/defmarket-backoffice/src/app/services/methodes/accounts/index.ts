import { refreshToken } from './../auth/index';
import axiosInstance from '../../constants/api';
import { IErrorProps, IPageProps, IProAccountProps } from '../../model';
import {
    ALL_PRO_ACCOUNTS,
    BLOCK_USER,
    COUNT_PRO_ACCOUNTS,
    CREATE_USER,
    GET_USER_BY_NAME_EMAIL,
    NEXT_PRO_ACCOUNTS,
    PREVIOUS_PRO_ACCOUNTS,
    PRO_ACCOUNT_API_URL,
    PRO_ACCOUNT_UPDATE_API_URL,
    VALIDATE_PRO_ACCOUNTS,
    VALIDATE_PRO_ACCOUNTS_INFO,
    AUTO_SEARCH,
    REQUEST_MORE_INFO,
} from '../../constants';
import { AxiosResponse, AxiosError } from 'axios';
import { IUser, IUserUpdateRequest, ICompany } from '../../model/accounts';
import { IBlockActionProps } from '../../model/common';
import { IOffer } from '../../model/offer';
import { IStore } from '../../model/store';

//create user
export const createUser = (data: IUser) => {
    return new Promise(
        (
            resolve: (data: IProAccountProps) => void,
            reject: (error: AxiosResponse<IErrorProps> | undefined) => void
        ) => {
            try {
                axiosInstance
                    .post(CREATE_USER, { ...data })
                    .then((res: AxiosResponse<IProAccountProps>) => {
                        resolve(res.data);
                    })
                    .catch((err: AxiosError<IErrorProps>) => {
                        if (err?.response?.status === 401) {
                            refreshToken().then(() =>
                                axiosInstance
                                    .post(CREATE_USER, { ...data })
                                    .then(
                                        (
                                            res: AxiosResponse<IProAccountProps>
                                        ) => resolve(res.data)
                                    )
                                    .catch((err: AxiosError<IErrorProps>) =>
                                        reject(err?.response)
                                    )
                            );
                        } else reject(err?.response);
                    });
            } catch (error) {
                reject({
                    data: { message: 'error.axios' },
                } as AxiosResponse<IErrorProps>);
            }
        }
    );
};

// Get User by Id
export const getUserById = (proAccountId: number) => {
    return new Promise((resolve: (data: IProAccountProps) => void, reject) => {
        try {
            axiosInstance
                .get(PRO_ACCOUNT_API_URL(proAccountId))
                .then((res: AxiosResponse<IProAccountProps>) =>
                    resolve(res.data)
                )
                .catch((err: AxiosError<IErrorProps>) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() =>
                            axiosInstance
                                .get(PRO_ACCOUNT_API_URL(proAccountId))
                                .then((res: AxiosResponse<IProAccountProps>) =>
                                    resolve(res.data)
                                )
                                .catch((err: AxiosError<IErrorProps>) =>
                                    reject(err?.response?.data)
                                )
                        );
                    } else reject(err.response?.data);
                });
        } catch (error) {
            reject('Error in Get User by id axios!');
        }
    });
};

// validate user
export const validateUser = (userId: number) => {
    return new Promise((resolve, reject) => {
        try {
            axiosInstance
                .patch(VALIDATE_PRO_ACCOUNTS(userId))
                .then((res) => {
                    resolve(res);
                })
                .catch((err: AxiosError<IErrorProps>) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() =>
                            axiosInstance
                                .patch(VALIDATE_PRO_ACCOUNTS(userId))
                                .then((res) => resolve(res))
                                .catch((err: AxiosError<IErrorProps>) =>
                                    reject(err?.response?.data)
                                )
                        );
                    } else reject(err?.response?.data);
                });
        } catch (error) {
            reject('Error in Validate User axios!');
        }
    });
};

// validate user info
export const validateUserInfo = (userId: number) => {
    return new Promise((resolve, reject) => {
        try {
            axiosInstance
                .patch(VALIDATE_PRO_ACCOUNTS_INFO(userId))
                .then((res) => {
                    resolve(res);
                })
                .catch((err: AxiosError<IErrorProps>) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() =>
                            axiosInstance
                                .patch(VALIDATE_PRO_ACCOUNTS_INFO(userId))
                                .then((res) => resolve(res))
                                .catch((err: AxiosError<IErrorProps>) =>
                                    reject(err?.response?.data)
                                )
                        );
                    } else reject(err?.response?.data);
                });
        } catch (error) {
            reject('Error in Validate User Info axios!');
        }
    });
};

// block user
export const blockUser = (userId: number, data: IBlockActionProps) => {
    return new Promise((resolve, reject) => {
        try {
            axiosInstance
                .patch(BLOCK_USER(userId), data)
                .then((res) => {
                    resolve(res);
                })
                .catch((err: AxiosError<IErrorProps>) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() =>
                            axiosInstance
                                .patch(BLOCK_USER(userId), data)
                                .then((res) => resolve(res))
                                .catch((err: AxiosError<IErrorProps>) =>
                                    reject(err?.response?.data)
                                )
                        );
                    } else reject(err?.response?.data);
                });
        } catch (error) {
            reject('Error in Block User axios!');
        }
    });
};

//update User
export const updateUser = (
    proAccountId: number,
    data: IUserUpdateRequest,
    identity?: File
) => {
    return new Promise(
        (
            resolve: (data: IProAccountProps) => void,
            reject: (error: AxiosResponse<IErrorProps> | undefined) => void
        ) => {
            try {
                const bodyFormData = new FormData();
                bodyFormData.append('user', JSON.stringify(data));
                if (identity)
                    bodyFormData.append('justificationIdentity', identity);
                axiosInstance
                    .put(
                        PRO_ACCOUNT_UPDATE_API_URL(proAccountId),
                        bodyFormData,
                        {
                            headers: { 'Content-Type': 'multipart/form-data' },
                        }
                    )
                    .then((res: AxiosResponse<IProAccountProps>) => {
                        resolve(res?.data);
                    })
                    .catch((err: AxiosError<IErrorProps>) => {
                        if (err?.response?.status === 401) {
                            refreshToken().then(() =>
                                axiosInstance
                                    .put(
                                        PRO_ACCOUNT_UPDATE_API_URL(
                                            proAccountId
                                        ),
                                        bodyFormData,
                                        {
                                            headers: {
                                                'Content-Type':
                                                    'multipart/form-data',
                                            },
                                        }
                                    )
                                    .then(
                                        (
                                            res: AxiosResponse<IProAccountProps>
                                        ) => resolve(res.data)
                                    )
                                    .catch((err: AxiosError<IErrorProps>) =>
                                        reject(err?.response)
                                    )
                            );
                        } else reject(err?.response);
                    });
            } catch (error) {
                reject({
                    data: { message: 'error.axios' },
                } as AxiosResponse<IErrorProps>);
            }
        }
    );
};

// delete User
export const deleteUser = (proAccountId: number) => {
    return new Promise((resolve, reject) => {
        try {
            axiosInstance
                .delete(PRO_ACCOUNT_API_URL(proAccountId) + '/delete')
                .then((res) => {
                    resolve(res);
                })
                .catch((err: AxiosError<IErrorProps>) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() =>
                            axiosInstance
                                .delete(PRO_ACCOUNT_API_URL(proAccountId))
                                .then((res) => resolve(res))
                                .catch((err: AxiosError<IErrorProps>) =>
                                    reject(err?.response?.data)
                                )
                        );
                    } else reject(err?.response?.data);
                });
        } catch (error) {
            reject('Error in delete User axios!');
        }
    });
};

//Get all Users
export const getAllUsers = (
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
        (resolve: (data: IPageProps<IProAccountProps>) => void, reject) => {
            try {
                axiosInstance
                    .get(`${ALL_PRO_ACCOUNTS}${queryString}`)
                    .then((res: AxiosResponse<IPageProps<IProAccountProps>>) =>
                        resolve(res.data)
                    )
                    .catch((err: AxiosError<IErrorProps>) => {
                        if (err?.response?.status === 401) {
                            refreshToken().then(() =>
                                axiosInstance
                                    .get(`${ALL_PRO_ACCOUNTS}${queryString}`)
                                    .then(
                                        (
                                            res: AxiosResponse<
                                                IPageProps<IProAccountProps>
                                            >
                                        ) => resolve(res.data)
                                    )
                                    .catch((err: AxiosError<IErrorProps>) =>
                                        reject(err?.response?.data)
                                    )
                            );
                        } else reject(err?.response?.data);
                    });
            } catch (error) {
                reject('Error in Get all Users axios!');
            }
        }
    );
};

// getNextUser
export const getNextUser = (proAccountId: number) => {
    return new Promise(
        (resolve: (data: IProAccountProps | null) => void, reject) => {
            try {
                axiosInstance
                    .get(NEXT_PRO_ACCOUNTS(proAccountId))
                    .then((res: AxiosResponse<IProAccountProps | null>) =>
                        resolve(res.data)
                    )
                    .catch((err: AxiosError<IErrorProps>) => {
                        if (err?.response?.status === 401) {
                            refreshToken().then(() =>
                                axiosInstance
                                    .get(NEXT_PRO_ACCOUNTS(proAccountId))
                                    .then(
                                        (
                                            res: AxiosResponse<IProAccountProps | null>
                                        ) => resolve(res.data)
                                    )
                                    .catch((err: AxiosError<IErrorProps>) =>
                                        reject(err?.response?.data)
                                    )
                            );
                        } else reject(err?.response?.data);
                    });
            } catch (error) {
                reject('Error in Get Next User axios!');
            }
        }
    );
};

// getPreviousUser
export const getPreviousUser = (proAccountId: number) => {
    return new Promise(
        (resolve: (data: IProAccountProps | null) => void, reject) => {
            try {
                axiosInstance
                    .get(PREVIOUS_PRO_ACCOUNTS(proAccountId))
                    .then((res: AxiosResponse<IProAccountProps | null>) =>
                        resolve(res.data)
                    )
                    .catch((err: AxiosError<IErrorProps>) => {
                        if (err?.response?.status === 401) {
                            refreshToken().then(() =>
                                axiosInstance
                                    .get(PREVIOUS_PRO_ACCOUNTS(proAccountId))
                                    .then(
                                        (
                                            res: AxiosResponse<IProAccountProps | null>
                                        ) => resolve(res.data)
                                    )
                                    .catch((err: AxiosError<IErrorProps>) =>
                                        reject(err?.response?.data)
                                    )
                            );
                        } else reject(err?.response?.data);
                    });
            } catch (error) {
                reject('Error in Get Previous User axios!');
            }
        }
    );
};

// get User Count
export const getUserCount = (
    filters: {
        key: string;
        value: boolean;
    }[]
) => {
    let queryString = '';
    filters.forEach((filter, index) =>
        index === 0
            ? (queryString = `?${filter.key}=${filter.value}`)
            : (queryString += `&${filter.key}=${filter.value}`)
    );

    return new Promise((resolve: (data: number) => void, reject) => {
        try {
            axiosInstance
                .get(`${COUNT_PRO_ACCOUNTS}${queryString}`)
                .then((res: AxiosResponse<number>) => resolve(res.data))
                .catch((err: AxiosError<IErrorProps>) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() =>
                            axiosInstance
                                .get(`${COUNT_PRO_ACCOUNTS}${queryString}`)
                                .then((res: AxiosResponse<number>) =>
                                    resolve(res.data)
                                )
                                .catch((err: AxiosError<IErrorProps>) =>
                                    reject(err?.response?.data)
                                )
                        );
                    } else reject(err?.response?.data);
                });
        } catch (error) {
            reject('Error in Get User Count axios!');
        }
    });
};

// get user by name or email

export const getUserByNameOrEmail = (searchedValue: string) => {
    return new Promise(
        (resolve: (data: IProAccountProps[]) => void, reject) => {
            try {
                axiosInstance
                    .get(GET_USER_BY_NAME_EMAIL(searchedValue))
                    .then((res: AxiosResponse<IPageProps<IProAccountProps>>) =>
                        resolve(res.data.content)
                    )
                    .catch((err: AxiosError<IErrorProps>) => {
                        if (err?.response?.status === 401) {
                            refreshToken().then(() =>
                                axiosInstance
                                    .get(GET_USER_BY_NAME_EMAIL(searchedValue))
                                    .then(
                                        (
                                            res: AxiosResponse<
                                                IPageProps<IProAccountProps>
                                            >
                                        ) => resolve(res.data.content)
                                    )
                                    .catch((err: AxiosError<IErrorProps>) =>
                                        reject(err?.response?.data)
                                    )
                            );
                        } else reject(err?.response?.data);
                    });
            } catch (error) {
                reject('Error in Get users axios!');
            }
        }
    );
};

// ADVANCED SEARCH API
export const autoSearchApi = (
    filters:
        | {
              key: string;
              value: boolean;
          }[]
        | null,
    search: string | null,
    searchType: string,
    page?: number,
    size?: number
) => {
    let queryString = `?page=${page}&size=${size}${
        search !== null && search !== undefined ? `&input=${search}` : ``
    }`;
    filters?.forEach(
        (filter) => (queryString += `&${filter.key}=${filter.value}`)
    );

    return new Promise(
        (
            resolve: (
                data: IPageProps<ICompany[] | IOffer[] | IStore[]>
            ) => void,
            reject
        ) => {
            try {
                axiosInstance
                    .get(`${AUTO_SEARCH(searchType)}${queryString}`)
                    .then(
                        (
                            res: AxiosResponse<
                                IPageProps<ICompany[] | IOffer[] | IStore[]>
                            >
                        ) => resolve(res.data)
                    )
                    .catch((err: AxiosError<IErrorProps>) => {
                        if (err?.response?.status === 401) {
                            refreshToken().then(() =>
                                axiosInstance
                                    .get(
                                        `${AUTO_SEARCH(
                                            searchType
                                        )}${queryString}`
                                    )
                                    .then(
                                        (
                                            res: AxiosResponse<
                                                IPageProps<
                                                    | ICompany[]
                                                    | IOffer[]
                                                    | IStore[]
                                                >
                                            >
                                        ) => resolve(res.data)
                                    )
                                    .catch((err: AxiosError<IErrorProps>) =>
                                        reject(err?.response?.data)
                                    )
                            );
                        } else reject(err?.response?.data);
                    });
            } catch (error) {
                reject('Error in Get autoSearchApi axios!');
            }
        }
    );
};

// request more info
export const requestMoreInfo = (
    id: number,
    subject: string,
    message: string,
    source: 'trader' | 'company' | 'store' | 'offer'
) => {
    return new Promise((resolve: (data: IProAccountProps) => void, reject) => {
        try {
            axiosInstance
                .post(REQUEST_MORE_INFO(source, id), {
                    subject,
                    message,
                })
                .then((res: AxiosResponse<IProAccountProps>) =>
                    resolve(res.data)
                )
                .catch((err: AxiosError<IErrorProps>) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() =>
                            axiosInstance
                                .post(REQUEST_MORE_INFO(source, id), {
                                    subject,
                                    message,
                                })
                                .then((res: AxiosResponse<IProAccountProps>) =>
                                    resolve(res.data)
                                )
                                .catch((err: AxiosError<IErrorProps>) =>
                                    reject(err?.response?.data)
                                )
                        );
                    } else reject(err?.response?.data);
                });
        } catch (error) {
            reject('Error in request more info axios!');
        }
    });
};
