import axios from 'axios';
import { LOGIN } from '../constants';

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(LOGIN, { email, password })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          console.log('Login > axios err=', err);
          reject('Error in Login axios!');
        });
    } catch (error) {
      console.error('in login > Login, Err===', error);
      reject(error);
    }
  });
};
