import { AxiosError, AxiosResponse } from 'axios';
import { GLOBAL_SEARCH } from '../../constants';
import axiosInstance from '../../constants/api';
import { IErrorProps } from '../../model';
import { IGlobalSearch } from '../../model/common';
import { refreshToken } from '../auth';

export const globalSearch = (input: string) => {
    return new Promise((resolve: (data: IGlobalSearch[]) => void, reject) => {
        try {
            axiosInstance
                .get(GLOBAL_SEARCH(input))
                .then((res: AxiosResponse<IGlobalSearch[]>) =>
                    resolve(res.data)
                )
                .catch((err: AxiosError<IErrorProps>) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() =>
                            axiosInstance
                                .get(GLOBAL_SEARCH(input))
                                .then((res: AxiosResponse<IGlobalSearch[]>) =>
                                    resolve(res.data)
                                )
                                .catch((err: AxiosError<IErrorProps>) =>
                                    reject(err?.response?.data)
                                )
                        );
                    } else reject(err.response?.data);
                });
        } catch (error) {
            console.error('in search > Global Search, Err===', error);
            reject(error);
        }
    });
};
