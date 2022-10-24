import axiosInstance from '../../constants/api';
import { ALL_JOB_API_URL, JOB_BY_PARENT_ID_API_URL } from '../../constants';
import { JobProps } from '../../model/job';
import { refreshToken } from '../auth';

//Get All job Ref
export const getAllJobRef = (depth: number) => {
    return new Promise((resolve: (data: JobProps[]) => void, reject) => {
        try {
            axiosInstance
                .get(ALL_JOB_API_URL(depth))
                .then((res) => resolve(res.data))
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .get(ALL_JOB_API_URL(depth))
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
            console.error('in auth > Get Job, Err===', error);
            reject(error);
        }
    });
};

//Get job By Id
export const getJobsByParentId = (depth: number, parentId: number) => {
    return new Promise((resolve: (data: JobProps[]) => void, reject) => {
        try {
            axiosInstance
                .get(JOB_BY_PARENT_ID_API_URL(depth, parentId))
                .then((res) => resolve(res.data))
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .get(JOB_BY_PARENT_ID_API_URL(depth, parentId))
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
            console.error('in auth > Get Job, Err===', error);
            reject(error);
        }
    });
};
