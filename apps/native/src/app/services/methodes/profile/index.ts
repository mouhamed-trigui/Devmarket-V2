import { baseURL } from './../../constants/api';
import { IProfileProps } from './../../model/auth/index';
import {
    DELETE_ACCOUNT,
    RETRACT_DELETE_ACCOUNT,
    UPDATE_EMAIL,
    UPDATE_PASSWORD,
    UPDATE_PROFILE,
    VALIDATE_UPDATE_EMAIL,
} from '../../constants';
import axiosInstance from '../../constants/api';
import { refreshToken } from '../auth';
import { FileUpload } from '../../model/company';
import axios from 'axios';

export const updateProfile = (
    user: IProfileProps,
    justificationIdentity?: FileUpload | null
) => {
    return new Promise((resolve: (data: any) => void, reject) => {
        try {
            const form = new FormData();
            form.append('user', JSON.stringify(user));
            if (justificationIdentity) {
                form.append('justificationIdentity', justificationIdentity);
            }

            axiosInstance
                .put(UPDATE_PROFILE, form, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                .then((res) => {
                    resolve(res?.data);
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .put(UPDATE_PROFILE, form, {
                                    headers: {
                                        'Content-Type': 'multipart/form-data',
                                    },
                                })
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
            console.error('Update Profile, Err===', error);
            reject(error);
        }
    });
};

export const updatePassword = (password: {
    oldPassword: string;
    newPassword: string;
}) => {
    return new Promise((resolve: (data: any) => void, reject) => {
        try {
            axiosInstance
                .patch(UPDATE_PASSWORD, password)
                .then((res) => {
                    resolve(res?.data);
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .patch(UPDATE_PASSWORD, password)
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
            console.error('Update Password, Err===', error);
            reject(error);
        }
    });
};

export const updateEmail = (email: { oldEmail: string; newEmail: string }) => {
    return new Promise((resolve: (data: any) => void, reject) => {
        try {
            axiosInstance
                .patch(UPDATE_EMAIL, email)
                .then((res) => {
                    resolve(res?.data);
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .patch(UPDATE_EMAIL, email)
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
            console.error('Update Email, Err===', error);
            reject(error);
        }
    });
};

export const changeEmailValidation = (token: string) => {
    return new Promise((resolve: (data: any) => void, reject) => {
        try {
            axios
                .patch(baseURL + VALIDATE_UPDATE_EMAIL, undefined, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    resolve(res?.data);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            console.error('Change Email Validation, Err===', error);
            reject(error);
        }
    });
};

export const deleteAccount = () => {
    return new Promise((resolve: (data: any) => void, reject) => {
        try {
            axiosInstance
                .patch(DELETE_ACCOUNT)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .patch(DELETE_ACCOUNT)
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
            console.error('Delete Account, Err===', error);
            reject(error);
        }
    });
};

export const retractDeleteAccount = () => {
    return new Promise((resolve: (data: any) => void, reject) => {
        try {
            axiosInstance
                .patch(RETRACT_DELETE_ACCOUNT)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .patch(RETRACT_DELETE_ACCOUNT)
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
            console.error('Retract Delete Account, Err===', error);
            reject(error);
        }
    });
};
