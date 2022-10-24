import axiosInstance, { baseURL } from '../../constants/api';
import { userActions } from '../../../stores/slices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    SIGNIN,
    CHECKEMAIL,
    SIGNUP,
    SIGNUPI0,
    SIGNUPI1,
    SIGNUPI2,
    FORGOTPASSWORD,
    ME,
    SIREN,
    DENOMINATION,
    ACTIVATION_EMAIL,
    CHANGEPASSWORD,
    REFRESH_TOKEN,
    SEND_NEW_MAIL_ACTIVATION,
} from '../../constants';
import {
    signUpR0Props,
    signUpI0Props,
    signUpI1Props,
    signUpI2Props,
    errorProps,
    companyProps,
} from '../../model';
import axios, { AxiosError, AxiosResponse } from 'axios';
import store from '../../../stores';

export const signIn = (
    email: string,
    password: string,
    expoToken: string | null | undefined
) => {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(baseURL + SIGNIN, {
                    email,
                    password,
                    expoToken,
                    userType: 'TRADER',
                })
                .then((res) => {
                    // set axios TOKEN
                    axiosInstance.defaults.headers.common[
                        'Authorization'
                    ] = `Bearer ${res.data.accessToken}`;
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            reject(error);
        }
    });
};

export const refreshToken = () => {
    return new Promise((resolve, reject) => {
        try {
            AsyncStorage.getItem('@Refresh_Token').then(
                async (refreshToken) => {
                    if (refreshToken) {
                        axios
                            .post(baseURL + REFRESH_TOKEN, undefined, {
                                headers: {
                                    Authorization: 'Bearer ' + refreshToken,
                                },
                            })
                            .then((res) => {
                                AsyncStorage.setItem(
                                    '@Access_Token',
                                    res.data.accessToken
                                );
                                // set axios TOKEN
                                axiosInstance.defaults.headers.common[
                                    'Authorization'
                                ] = 'Bearer ' + res?.data?.accessToken;
                                resolve(res);
                            })
                            .catch((err: errorProps) => {
                                AsyncStorage.removeItem('@Access_Token');
                                AsyncStorage.removeItem('@Refresh_Token');
                                store.dispatch(userActions.logout());
                                reject(err);
                            });
                    }
                }
            );
        } catch (error) {
            reject(error);
        }
    });
};

export const ModHeader = (type: 'JSON' | 'MULTIPART') => {
    axiosInstance.interceptors.request.use(
        (config) => {
            if (type === 'JSON') {
                console.log('json');
                config.headers['Accept'] = 'application/json';
                config.headers['Content-Type'] = 'application/json';
                config.headers['Access-Control-Allow-Origin'] = '*';
            } else if (type === 'MULTIPART') {
                console.log('mulipart');
                config.headers['Accept'] = 'application/json';
                config.headers['Content-Type'] = 'multipart/form-data';
                config.headers['Access-Control-Allow-Origin'] = '*';
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
};

export const me = () => {
    return new Promise((resolve: (res: AxiosResponse<any>) => void, reject) => {
        try {
            axiosInstance
                .get(ME)
                .then((res) => {
                    store.dispatch(userActions.setUser(res?.data));
                    resolve(res);
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .get(ME)
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
            reject(error);
        }
    });
};

export const checkEmail = (email: string) => {
    return new Promise((resolve, reject) => {
        try {
            axiosInstance
                .post(CHECKEMAIL, { email })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .post(CHECKEMAIL, { email })
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
            reject(error);
        }
    });
};

export const findBySiren = (siren: number) => {
    return new Promise((resolve, reject) => {
        try {
            axios
                .get(SIREN(siren))
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            reject(error);
        }
    });
};

export const findByDenomination = (nom: string) => {
    return new Promise((resolve, reject) => {
        try {
            axios
                .get(DENOMINATION(nom))
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            reject(error);
        }
    });
};

// R0 - HTTP POST
/**
 * Register for a new account
 * @type {(data:signUpR0Props) => Promise<unknown>} Function syntax */
export const signUp = (data: signUpR0Props) => {
    return new Promise((resolve, reject) => {
        try {
            axiosInstance
                .post(SIGNUP, { ...data })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .post(SIGNUP, { ...data })
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
            // console.error('in auth > Sign Up, Err===', error);
            reject(error);
        }
    });
};

// I0 - HTTP PUT - TOKEN REQUIRED
/**
 * Register - Set an identity provider
 * @type {(data:signUpI0Props) => Promise<unknown>} Function syntax */
export const signUpI0 = (data: signUpI0Props) => {
    return new Promise((resolve, reject) => {
        try {
            axiosInstance
                .put(SIGNUPI0, data)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .put(SIGNUPI0, data)
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
            // console.error('in auth > Sign Up, Err===', error);
            reject(error);
        }
    });
};

// I1 - HTTP POST - TOKEN REQUIRED
/**
 * Register - Set company identity
 * @type {(data:signUpI1Props) => Promise<unknown>} Function syntax */
export const signUpI1 = (data: signUpI1Props) => {
    return new Promise(
        (resolve: (res: AxiosResponse<companyProps>) => void, reject) => {
            try {
                axiosInstance
                    .post(SIGNUPI1, { ...data })
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        if (err?.response?.status === 401) {
                            refreshToken().then(() => {
                                axiosInstance
                                    .post(SIGNUPI1, { ...data })
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
                // console.error('in auth > Sign Up, Err===', error);
                reject(error);
            }
        }
    );
};
//I2 - HTTP POST - TOKEN REQUIRED , ID COMPANY
/**
 * Register - Set company activity
 * @type {(idCompany:number , data:signUpI2Props) => Promise<unknown>} Function syntax */
export const signUpI2 = (idCompany: number, data: signUpI2Props) => {
    return new Promise((resolve, reject) => {
        try {
            const bodyFormData = new FormData();
            bodyFormData.append(
                'store',
                JSON.stringify({ ...data.store, companyId: idCompany })
            );
            bodyFormData.append('logo', data.logo);
            axiosInstance
                .post(SIGNUPI2, bodyFormData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .post(SIGNUPI2, bodyFormData, {
                                    headers: {
                                        'Content-Type': 'multipart/form-data',
                                    },
                                })
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
            // console.error('in auth > Sign Up, Err===', error);
            reject(error);
        }
    });
};

export const forgotPassword = (email: string) => {
    return new Promise((resolve, reject) => {
        try {
            axiosInstance
                .post(FORGOTPASSWORD, { email })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .post(FORGOTPASSWORD, { email })
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
            reject(error);
        }
    });
};

export const activationEmail = (token: string) => {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(
                    baseURL + ACTIVATION_EMAIL,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((res) => {
                    resolve(res);
                })
                .catch((err: errorProps) => {
                    reject(err);
                });
        } catch (error) {
            reject(error);
        }
    });
};

//Change password
export const changePassword = (password: string, token: string) => {
    return new Promise((resolve, reject) => {
        try {
            axios
                .patch(
                    baseURL + CHANGEPASSWORD,
                    {
                        newPassword: password,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);

                    console.log('Failed axios');
                });
        } catch (error) {
            reject(error);
            console.log('Failed ');
        }
    });
};

// Send new activation mail
export const sendNewMailActivation = (mail: string) => {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(baseURL + SEND_NEW_MAIL_ACTIVATION, {
                    email: mail,
                })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            reject(error);
        }
    });
};
