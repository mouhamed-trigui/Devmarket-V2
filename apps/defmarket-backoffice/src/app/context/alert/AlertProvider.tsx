import { useSnackbar, VariantType } from 'notistack';
import { createContext, FC } from 'react';

export const AlertContext = createContext<{
    showAlert: (message: string, type?: VariantType) => void;
}>({ showAlert: () => undefined });

const AlertProvider: FC = ({ children }) => {
    const { enqueueSnackbar } = useSnackbar();

    const showAlert = (
        message: string,
        type: VariantType = 'default'
    ): void => {
        enqueueSnackbar(message, { variant: type, autoHideDuration: 2000 });
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
        </AlertContext.Provider>
    );
};

export default AlertProvider;
