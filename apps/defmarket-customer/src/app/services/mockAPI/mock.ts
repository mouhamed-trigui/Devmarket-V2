
import axiosInstance from '../constants/api';
import MockAdapter from 'axios-mock-adapter';

// MockAdapter
export const mock = new MockAdapter(axiosInstance);