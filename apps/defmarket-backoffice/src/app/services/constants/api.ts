import axios from 'axios';

export const baseURL = `${process.env.NX_API_URI}`; // `${process.env.NX_API_URI}` ?? "http://localhost:8080",

export const geoapifyKey = process.env.NX_GEOAPIFY_KEY
    ? `${process.env.NX_GEOAPIFY_KEY}`
    : 'de8d1469685d41eda89d566b48ab7f21';

const axiosInstance = axios.create({
    baseURL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
});

export default axiosInstance;
