import { refreshToken } from '../auth';
import { AxiosResponse } from 'axios';
import {
    ADDEXPOTOKEN_API_URL,
    COMMUNICATION_API_URL,
    DELETE_NOTIFICATION,
    GET_ALL_ACTIVITY_NOTIFICATIONS,
    PUSHNOTIFICATION_API_URL,
} from '../../constants';
import axiosInstance from '../../constants/api';
import { IPageProps } from '../../model';
import { INotificationProps } from '../../model/auth/notification';

// Add expo token
export const addExpoToken = (token: string) => {
    return new Promise((resolve, reject) => {
        try {
            axiosInstance
                .post(ADDEXPOTOKEN_API_URL, { expoToken: token })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .post(ADDEXPOTOKEN_API_URL, {
                                    expoToken: token,
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
            console.log('Errors add expo token', error);
            reject('Errors add expo token');
        }
    });
};

// push notification
export const pushNotification = (value: boolean) => {
    return new Promise((resolve, reject) => {
        try {
            axiosInstance
                .put(PUSHNOTIFICATION_API_URL(value))
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .put(PUSHNOTIFICATION_API_URL(value))
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
            console.log('Errors Push notification', error);
            reject('Errors Push notification');
        }
    });
};

// Get All Activity Notifications

export const allActivityNotifications = (page?: number, size?: number) => {
    return new Promise(
        (resolve: (data: IPageProps<INotificationProps[]>) => void, reject) => {
            try {
                axiosInstance
                    .get(GET_ALL_ACTIVITY_NOTIFICATIONS(page, size))
                    .then(
                        (
                            res: AxiosResponse<IPageProps<INotificationProps[]>>
                        ) => resolve(res.data)
                    )
                    .catch((err) => {
                        if (err?.response?.status === 401) {
                            refreshToken().then(() => {
                                axiosInstance
                                    .get(
                                        GET_ALL_ACTIVITY_NOTIFICATIONS(
                                            page,
                                            size
                                        )
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
                console.error('in auth > Get Notifications, Err===', error);
                reject(error);
            }
        }
    );
};

//delete notifications

export const deleteNotification = (id: number) => {
    return new Promise((resolve, reject) => {
        try {
            axiosInstance
                .delete(DELETE_NOTIFICATION(id))
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .delete(DELETE_NOTIFICATION(id))
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
            console.error('in auth > Delete Notifications, Err===', error);
            reject(error);
        }
    });
};

// push notification
export const communication = (value: boolean) => {
    return new Promise((resolve, reject) => {
        try {
            axiosInstance
                .patch(COMMUNICATION_API_URL(value))
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .patch(COMMUNICATION_API_URL(value))
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
            console.log('Errors Set Communication', error);
            reject('Errors Set Communication');
        }
    });
};
