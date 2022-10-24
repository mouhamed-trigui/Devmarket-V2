import { GET_OFFER_BY_ID, Unauthorized } from '../../constants';
import axiosInstance, { axiosInstance2 } from '../../constants/api';
import { IOffer } from '../../model/offer';
import { refreshToken } from '../auth';

// Get offer by offer Id
export const getOfferByID = (id: number) => {
    return new Promise<IOffer>((resolve, reject) => {
        try {
            axiosInstance2
                .get(GET_OFFER_BY_ID(id))
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    if (err?.response?.status === Unauthorized) {
                        refreshToken().then(() => {
                            axiosInstance2
                                .get(GET_OFFER_BY_ID(id))
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
            reject(error);
        }
    });
};
