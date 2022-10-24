import {
    errorProps,
    offerProps,
    signUpI0Props,
    signUpI1Props,
    signUpI2Props,
    signUpR0Props,
} from './auth';
import { companyProps,IValueProps } from './company';

export interface IPageProps<T> {
    content: T;
    totalPages: number;
    totalElements: number;
}

export {
    errorProps,
    offerProps,
    signUpI0Props,
    signUpI1Props,
    signUpI2Props,
    signUpR0Props,
    companyProps,
    IValueProps
};
