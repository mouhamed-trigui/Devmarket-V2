import { IErrorProps, signIn } from './auth';
import { companyProps } from './company';
import { IProAccountProps } from './accounts';
export interface IPageProps<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
}

export { IErrorProps, signIn, companyProps, IProAccountProps };
