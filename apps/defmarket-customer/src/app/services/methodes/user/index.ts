import axios from 'axios';
import axiosInstance, { baseURL } from '../../constants/api';
import { GET_USER, GET_USER_BY_ID } from './../../constants/index';

/* USER APIs */
export const getUser = async () => {
    return new Promise((resolve, reject) => {
        try {
            axios
                //.post(baseURL + GET_USER)
                .get('https://dog.ceo/api/breeds/list/all')
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
