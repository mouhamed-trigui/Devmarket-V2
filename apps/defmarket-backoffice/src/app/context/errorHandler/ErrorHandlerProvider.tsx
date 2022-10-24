import { AxiosResponse } from 'axios';
import React, { createContext, FC, useContext } from 'react';
import { useIntl } from 'react-intl';
import { IErrorProps } from '../../services';
import { AlertContext } from '../alert/AlertProvider';

export const ErrorHandlerContext = createContext<{
    handleError: (
        error: AxiosResponse<IErrorProps> | undefined,
        overrideMessage?: IOverrideMessageProps
    ) => void;
}>({ handleError: () => undefined });

interface IOverrideMessageProps {
    notFound?: string;
    notValid?: string;
    unauthorized?: string;
    default?: string;
}

const ErrorHandlerProvider: FC = ({ children }) => {
    const { showAlert } = useContext(AlertContext);

    const { formatMessage } = useIntl();

    const handleError = (
        error: AxiosResponse<IErrorProps> | undefined,
        overrideMessage?: IOverrideMessageProps
    ) => {
        if (!error) return;
        console.error(error);

        switch (error.data.message) {
            case 'error.request.not-valid':
            case 'error.request.not-valid.siren':
            case 'error.request.not-valid.offer-value':
            case 'error.request.not-valid.redirection':
                showAlert(
                    overrideMessage?.notValid ??
                        formatMessage({
                            id: 'error.request.not-valid',
                            description:
                                'Les données saisies ne sont pas valides',
                            defaultMessage:
                                'Les données saisies ne sont pas valides',
                        }),
                    'error'
                );
                break;
            case 'error.entity.not-found':
                showAlert(
                    overrideMessage?.notFound ??
                        formatMessage({
                            id: 'error.entity.not-found',
                            description: 'Aucune donnée disponible',
                            defaultMessage: 'Aucune donnée disponible',
                        }),
                    'info'
                );
                break;
            case 'error.security.unauthorized':
                showAlert(
                    overrideMessage?.unauthorized ??
                        formatMessage({
                            id: 'error.security.unauthorized',
                            description: 'Non autorisé',
                            defaultMessage: 'Non autorisé',
                        }),
                    'error'
                );
                break;

            default:
                showAlert(
                    overrideMessage?.default ??
                        formatMessage({
                            id: 'error.default',
                            description: 'Une erreur est survenue',
                            defaultMessage: 'Une erreur est survenue',
                        }),
                    'error'
                );
                break;
        }
    };
    return (
        <ErrorHandlerContext.Provider value={{ handleError }}>
            {children}
        </ErrorHandlerContext.Provider>
    );
};

export default ErrorHandlerProvider;
