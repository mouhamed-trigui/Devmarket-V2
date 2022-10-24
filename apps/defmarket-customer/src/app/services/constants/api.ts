import axios from 'axios';
const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJoYW16YV9ieUBsaXZlLmZyIiwibmJmIjoxNjYyNDc3MTQ4LCJyb2xlcyI6IlBFUk1fSE9NRSBQRVJNX0hPTUVfUkVBRCBQRVJNX05PVElGSUNBVElPTiBQRVJNX05PVElGSUNBVElPTl9SRUFEIFBFUk1fTk9USUZJQ0FUSU9OX0RFTEVURSBQRVJNX0FOTk9VTkNFIFBFUk1fQU5OT1VOQ0VfUkVBRCBQRVJNX1NUT1JFIFBFUk1fU1RPUkVfQ1JFQVRFIFBFUk1fU1RPUkVfUkVBRCBQRVJNX1NUT1JFX1VQREFURSBQRVJNX1NUT1JFX0RFTEVURSBQRVJNX0NPTVBBTlkgUEVSTV9DT01QQU5ZX0NSRUFURSBQRVJNX0NPTVBBTllfUkVBRCBQRVJNX0NPTVBBTllfVVBEQVRFIFBFUk1fQ09NUEFOWV9ERUxFVEUgUEVSTV9ORVdTTEVUVEVSIFBFUk1fTkVXU0xFVFRFUl9SRUFEIFBFUk1fQ09OVEFDVCBQRVJNX0NPTlRBQ1RfQ1JFQVRFIFBFUk1fQ09OVEFDVF9SRUFEIFBFUk1fQ09OVEFDVF9VUERBVEUgUEVSTV9DT05UQUNUX0RFTEVURSBQRVJNX1BST0ZJTEUgUEVSTV9QUk9GSUxFX1JFQUQgUEVSTV9QUk9GSUxFX1VQREFURSBQRVJNX1BST0ZJTEVfREVMRVRFIFBFUk1fT0ZGRVIgUEVSTV9PRkZFUl9DUkVBVEUgUEVSTV9PRkZFUl9SRUFEIFBFUk1fT0ZGRVJfVVBEQVRFIFBFUk1fT0ZGRVJfREVMRVRFIEpXVF9BQ0NFU1NfVE9LRU4iLCJpZCI6IjMiLCJleHAiOjE2NjM3NzMxNDh9.m6dFqrx6kbxxX1ArQkWOl3kQFGNxB2WWynSVyUGEZIEu1IEbFzOjAuSuxPewPFDEL23FFHA2puZlrJSWO7v1oDLr89C_QYJVt73YJtfrpjOQIfM6BGFnr1GFivbVudzSQCK-Hlacsbt4Cc1jcl12fmT9RGMu_5VJzaF175e1GzQUMhGAy2ZWrEiujNZRqYcJA-ErfVhOQ-hEmJfmqrwvzHS3Eu2cKToWFhwIFxOS5LJa7vufZ5J1I2K6_Ra5AmcmKlwy_-NtlKKW6LoI_O7-J-2IvBdO2lyP3uE8o9P-KHLmgOli8h49Notac0pxJXlCpihYSm7Ezpolxcf-9KFouA';
export const baseURL = 'http://192.168.1.5:8080'; // `${process.env.NX_API_URI}` ?? "http://localhost:8080",
export const geoapifyKey = 'de8d1469685d41eda89d566b48ab7f21';
const axiosInstance = axios.create({
    baseURL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
});

export default axiosInstance;

export const axiosInstance2 = axios.create({
    baseURL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        // Authorization: token,
    },
});
axiosInstance2.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export const getFileURL = (fileId?: number, resource = false) => {
    if (!fileId) return null;
    if (resource) {
        return `${baseURL}/api/files/resources/${fileId}`;
    } else {
        return `${baseURL}/api/files/public/bytes/${fileId}`;
    }
};
