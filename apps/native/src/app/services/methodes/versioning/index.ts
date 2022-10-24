import axios from 'axios';
import { baseURL } from '../../constants/api';
import { version } from '../../../../../package.json';

export const isUpdated = () => {
    return new Promise((resolve: (data: boolean) => void, reject) => {
        try {
            axios
                .post(`${baseURL}/api/version?frontVersion=${version}`)
                .then((res) => resolve(res.data))
                .catch((err) => reject(err));
        } catch (err) {
            reject(err);
        }
    });
};
