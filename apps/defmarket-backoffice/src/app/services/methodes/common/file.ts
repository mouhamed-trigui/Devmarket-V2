import { AxiosResponse } from 'axios';
import { GET_FILE_AS_BASE64 } from '../../constants';
import axiosInstance, { baseURL } from '../../constants/api';
import { IErrorProps } from '../../model';

// get file as base64
export const getFileAsBase64 = (fileId: number) => {
    return new Promise((resolve: (data: string) => void, reject) => {
        try {
            axiosInstance
                .get(GET_FILE_AS_BASE64(fileId))
                .then((res: AxiosResponse<string>) => {
                    resolve(res.data);
                })
                .catch((err: IErrorProps) => {
                    reject('Error in Get File as base64 axios!');
                });
        } catch (error) {
            reject(error);
        }
    });
};

// get file url
export const getFileURL = (fileId: number, resource = false) => {
    if (!fileId) return '';
    if (resource) {
        return `${baseURL}/api/files/resources/${fileId}`;
    } else {
        return `${baseURL}/api/files/public/bytes/${fileId}`;
    }
};
