import axiosInstance, { baseURL } from '../../constants/api';
import {
    SIGNIN,
    FORGOTPASSWORD,
    RESETPASSWORD,
    ME,
    REFRESH_TOKEN,
    CHECKEMAIL,
} from '../../constants';
import { IErrorProps } from '../../model';
import { userActions } from '../../../store/user/index.slice';
import axios, { AxiosError, AxiosResponse } from 'axios';
import store from '../../../store';
// Redux

export const signIn = (email: string, password: string) => {
    return new Promise((resolve, reject) => {
        try {
            axiosInstance
                .post(SIGNIN, { email, password, userType: 'ADMIN' })
                .then((res) => {
                    // set TOKEN
                    axiosInstance.interceptors.request.use(
                        (config) => {
                            if (res?.data?.accessToken) {
                                config.headers['Authorization'] =
                                    'Bearer ' + res?.data?.accessToken;
                            }
                            return config;
                        },
                        (error) => {
                            return Promise.reject(error);
                        }
                    );
                    resolve(res);
                })
                .catch((err: IErrorProps) => {
                    reject(err);
                });
        } catch (error) {
            reject(error);
        }
    });
};

export const me = () => {
    return new Promise((resolve, reject) => {
        try {
            axiosInstance
                .get(ME)
                .then((res) => {
                    resolve(res);
                })
                .catch((err: AxiosError<IErrorProps>) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() =>
                            axiosInstance
                                .get(ME)
                                .then((res) => resolve(res))
                                .catch((err: AxiosError<IErrorProps>) =>
                                    reject(err?.response?.data)
                                )
                        );
                    } else reject(err?.response?.data);
                });
        } catch (error) {
            reject(error);
        }
    });
};

export const checkEmail = (email: string) => {
    return new Promise(
        (
            resolve,
            reject: (error: AxiosResponse<IErrorProps> | undefined) => void
        ) => {
            try {
                axiosInstance
                    .post(CHECKEMAIL, { email })
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err: AxiosError<IErrorProps>) => {
                        if (err?.response?.status === 401) {
                            refreshToken().then(() => {
                                axiosInstance
                                    .post(CHECKEMAIL, { email })
                                    .then((res) => {
                                        resolve(res);
                                    })
                                    .catch((err: AxiosError<IErrorProps>) => {
                                        reject(err?.response);
                                    });
                            });
                        } else {
                            reject(err?.response);
                        }
                    });
            } catch (error) {
                reject({
                    data: { message: 'error.axios' },
                } as AxiosResponse<IErrorProps>);
            }
        }
    );
};

export const forgotPassword = (email: string) => {
    return new Promise((resolve, reject) => {
        try {
            axiosInstance
                .post(FORGOTPASSWORD, { email: email })
                .then((res) => {
                    resolve(res);
                })
                .catch((err: IErrorProps) => {
                    // console.log('Forgot Password > axios err=', err);
                    reject(err);
                });
        } catch (error) {
            // console.error('in auth  >  Forgot Password, Err===', error);
            reject(error);
        }
    });
};

export const resetPassword = (token: string, password: string) => {
    return new Promise((resolve, reject) => {
        try {
            axiosInstance
                .post(RESETPASSWORD, { token, password })
                .then((res) => {
                    resolve(res);
                })
                .catch((err: IErrorProps) => {
                    // console.log('Forgot Password > axios err=', err);
                    reject(err);
                });
        } catch (error) {
            // console.error('in auth  >  Forgot Password, Err===', error);
            reject(error);
        }
    });
};

export const refreshToken = () => {
    return new Promise((resolve, reject) => {
        // Redux
        const dispatch = store.dispatch;
        try {
            const refreshToken = localStorage.getItem('@Refresh_Token');
            if (refreshToken) {
                axios
                    .post(baseURL + REFRESH_TOKEN, undefined, {
                        headers: {
                            Authorization: 'Bearer ' + refreshToken,
                        },
                    })
                    .then((res) => {
                        localStorage.setItem(
                            '@Access_Token',
                            res.data.accessToken
                        );
                        // set axios TOKEN
                        axiosInstance.defaults.headers.common['Authorization'] =
                            'Bearer ' + res?.data?.accessToken;
                        resolve(res);
                    })
                    .catch((err: IErrorProps) => {
                        localStorage.removeItem('@Access_Token');
                        localStorage.removeItem('@Refresh_Token');
                        // Clean up
                        dispatch(userActions.setUser(null));
                        dispatch(userActions.setIsLoggedIn(false));
                        reject(err);
                    });
            }
        } catch (error) {
            reject(error);
        }
    });
};
