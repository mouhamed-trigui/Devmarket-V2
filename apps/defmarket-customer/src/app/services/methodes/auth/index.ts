import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosResponse } from 'axios';
import { userActions } from '../../../stores/slices';
import store from '../../../stores/store';
import { ME, REFRESH_TOKEN } from '../../constants';
import axiosInstance, { axiosInstance2, baseURL } from '../../constants/api';
import { errorProps } from '../../model/auth';
import { Unauthorized } from './../../constants/index';
import { IMe } from './../../model/auth/index';

export const me = () => {
    return new Promise((resolve: (res: IMe) => void, reject) => {
        try {
            axiosInstance2
                .get(ME)
                .then((res: AxiosResponse<IMe>) => {
                    store.dispatch(userActions.setUser(res?.data));
                    resolve(res?.data);
                })
                .catch((err) => {
                    if (err?.response?.status === Unauthorized) {
                        refreshToken().then(() => {
                            axiosInstance2
                                .get(ME)
                                .then((res: AxiosResponse<IMe>) => {
                                    resolve(res?.data);
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
