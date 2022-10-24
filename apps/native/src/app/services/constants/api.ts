import axios from 'axios';

export const baseURL = 'http://192.168.1.2:8080'; // `${process.env.NX_API_URI}` ?? "http://localhost:8080", https://defmarket.cleverapps.io

export const geoapifyKey = 'de8d1469685d41eda89d566b48ab7f21';

const axiosInstance = axios.create({
    baseURL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    timeout: 30000,
});

export default axiosInstance;

export const getFileURL = (fileId?: number, resource = false) => {
    if (!fileId) return '';
    if (resource) {
        return `${baseURL}/api/files/resources/${fileId}`;
    } else {
        return `${baseURL}/api/files/public/bytes/${fileId}`;
    }
};
