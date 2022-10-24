import { AxiosResponse } from 'axios';
import { GET_STORE_CATEGORY, Unauthorized } from '../../constants';
import { axiosInstance2 } from '../../constants/api';
import { refreshToken } from '../auth';
import { IStoreCategory } from './../../model/store-category/index';

export const getStoreCategory = () => {
    return new Promise((resolve: (data: any) => void, reject) => {
        try {
            axiosInstance2
                .get(GET_STORE_CATEGORY)
                .then((res: AxiosResponse<IStoreCategory[]>) => {
                    resolve(res?.data);
                })
                .catch((err) => {
                    if (err.response.status === Unauthorized) {
                        refreshToken().then(() => {
                            axiosInstance2
                                .get(GET_STORE_CATEGORY)
                                .then(
                                    (res: AxiosResponse<IStoreCategory[]>) => {
                                        resolve(res.data);
                                    }
                                )
                                .catch((err) => {
                                    reject(err);
                                });
                        });
                    } else {
                        reject(err);
                    }
                });
        } catch (error) {
            console.error('in auth > Get Store category , Err===', error);
            reject(error);
        }
    });
};
