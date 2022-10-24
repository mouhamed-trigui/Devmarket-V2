import axios from 'axios';

export const baseURL = 'http://192.168.1.2:8080'; // `${process.env.NX_API_URI}` ?? "http://localhost:8080",

const axiosInstance = axios.create({
    baseURL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
});

export default axiosInstance;

export const getFileURL = (path: string, resource = false) => {
    if (path === '') return '';
    if (resource) {
        return `${baseURL}/api/files/resources?path=/${path}`;
    } else {
        return `${baseURL}/api/files/bytes?path=/${path}`;
    }
};
