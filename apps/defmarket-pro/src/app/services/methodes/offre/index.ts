import axiosInstance from '../../constants/api';
import {
    ALL_STORE_OFFER,
    OFFRE_API_URL,
    MORE_INFO_URL,
    DOWNLOAD_RESOURCE,
    ADD_OFFRE_API_URL,
    UPDATE_OFFER_IMAGE,
    UPDATE_OFFER_FILE,
} from '../../constants';
import { FileType, IOffreProps } from '../../model/company';
import { AxiosResponse } from 'axios';
import { refreshToken } from '../auth';

//create offer
export const addOffer = (
    storeId: number,
    data: { offre: IOffreProps; photo?: FileType; attachedFile?: FileType }
) => {
    return new Promise((resolve: (data: IOffreProps) => void, reject) => {
        try {
            const bodyFormData = new FormData();
            bodyFormData.append('storeId', storeId.toString());
            bodyFormData.append('offer', JSON.stringify(data.offre));
            if (data.photo) bodyFormData.append('photo', data.photo);
            if (data.attachedFile)
                bodyFormData.append('attachedFile', data.attachedFile);
            axiosInstance
                .post(ADD_OFFRE_API_URL, bodyFormData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                .then((res: AxiosResponse<IOffreProps>) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .post(ADD_OFFRE_API_URL, bodyFormData, {
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
            reject(error);
        }
    });
};

// Get offer by offer Id and Store Id
export const getOffre = (offreId: number) => {
    return new Promise((resolve: (data: IOffreProps) => void, reject) => {
        try {
            axiosInstance
                .get(OFFRE_API_URL(offreId))
                .then((res: AxiosResponse<IOffreProps>) => resolve(res.data))
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .get(OFFRE_API_URL(offreId))
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

// update offer
export const updateOffre = (offreId: number, data: IOffreProps) => {
    return new Promise((resolve: (data: IOffreProps) => void, reject) => {
        try {
            axiosInstance
                .put(OFFRE_API_URL(offreId), data)
                .then((res: AxiosResponse<IOffreProps>) => {
                    resolve(res?.data);
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .put(OFFRE_API_URL(offreId), data)
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

// delete offer
export const deleteOffer = (offreId: number) => {
    return new Promise((resolve, reject) => {
        try {
            axiosInstance
                .delete(OFFRE_API_URL(offreId))
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .delete(OFFRE_API_URL(offreId))
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

//Get all offers of store
export const getAllOffersOfStore = (
    storeId: number,
    page: number,
    size: number,
    sortBy: 'endOfOffer' | 'startOfOffer' | undefined | null,
    offerTypes:
        | Array<'GOOD_PLAN' | 'FLAT' | 'PERCENTAGE' | 'CONDITIONAL_REDUCTION'>
        | undefined
        | null,
    themeType:
        | Array<'HALLOWEEN' | 'NOEL' | 'PAQUES' | 'TOUSSAINT' | 'NO_THEME'>
        | undefined
        | null,
    status: 'EXPIRED' | 'ACTIVE' | undefined | null,
    categoryOfferType: 'PHYSICAL' | 'E_COMMERCE' | undefined | null
) => {
    return new Promise((resolve: (data: IOffreProps[]) => void, reject) => {
        try {
            axiosInstance
                .get(
                    ALL_STORE_OFFER(
                        storeId,
                        page,
                        size,
                        sortBy,
                        offerTypes,
                        themeType,
                        status,
                        categoryOfferType
                    )
                )
                .then((res) => resolve(res.data))
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .get(
                                    ALL_STORE_OFFER(
                                        storeId,
                                        page,
                                        size,
                                        sortBy,
                                        offerTypes,
                                        themeType,
                                        status,
                                        categoryOfferType
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
            reject(error);
        }
    });
};

// update offer photo
export const updateOfferImage = (offerId: number, logo: FileType) => {
    return new Promise((resolve: (data: IOffreProps) => void, reject) => {
        try {
            const formData = new FormData();
            if (logo) formData.append('photo', logo);
            axiosInstance
                .patch(UPDATE_OFFER_IMAGE(offerId), formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                .then((res: AxiosResponse<IOffreProps>) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .patch(UPDATE_OFFER_IMAGE(offerId), formData, {
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
            reject(error);
        }
    });
};

// update offer file
export const updateOfferFile = (offerId: number, file: FileType) => {
    return new Promise((resolve: (data: IOffreProps) => void, reject) => {
        try {
            const formData = new FormData();
            if (file) formData.append('file', file);
            axiosInstance
                .patch(UPDATE_OFFER_FILE(offerId), formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                .then((res: AxiosResponse<IOffreProps>) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .patch(UPDATE_OFFER_FILE(offerId), formData, {
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
            reject(error);
        }
    });
};

// download resource method

export const getOfferResource = (path: string) => {
    return new Promise((resolve: (data: string) => void, reject) => {
        try {
            axiosInstance
                .get(DOWNLOAD_RESOURCE(path))
                .then((res: AxiosResponse<string>) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .get(DOWNLOAD_RESOURCE(path))
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

// send more info
export const moreInfo = (
    storeId: number,
    practiceOfferBeforeDM: boolean,
    practiceOfferBeforeDMText: string,
    targetedJobsBeforeDM: string
) => {
    return new Promise((resolve: (data: any) => void, reject) => {
        try {
            axiosInstance
                .put(MORE_INFO_URL(storeId), {
                    practiceOfferBeforeDM,
                    practiceOfferBeforeDMText,
                    targetedJobsBeforeDM,
                })
                .then((res: any) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        refreshToken().then(() => {
                            axiosInstance
                                .put(MORE_INFO_URL(storeId), {
                                    practiceOfferBeforeDM,
                                    practiceOfferBeforeDMText,
                                    targetedJobsBeforeDM,
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
            reject(error);
        }
    });
};
