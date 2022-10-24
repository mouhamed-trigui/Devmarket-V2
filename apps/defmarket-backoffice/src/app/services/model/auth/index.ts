export interface signIn {
    email: string;
    password: string;
}

export interface IErrorProps {
    name?: string;
    message: string;
    messageDetail?: string;
    objectErrors?: any;
    stack?: string;
}
