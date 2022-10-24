import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import I18nContext from './app/context/i18n/i18nState';
import ErrorBoundary from './app/utils/error-boundary/error-boundary';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './app/theme/index';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';

import AlertProvider from './app/context/alert/AlertProvider';

import { IconButton } from '@mui/material';
import IconClose from '@mui/icons-material/Close';
import { useSnackbar } from 'notistack';
import store from './app/store';
import ErrorHandlerProvider from './app/context/errorHandler/ErrorHandlerProvider';

function SnackbarCloseButton({ key }) {
    const { closeSnackbar } = useSnackbar();

    return (
        <IconButton onClick={() => closeSnackbar(key)}>
            <IconClose style={{ color: 'white' }} />
        </IconButton>
    );
}

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                action={(key) => <SnackbarCloseButton key={key} />}
            >
                <AlertProvider>
                    <I18nContext>
                        <ErrorHandlerProvider>
                            <StrictMode>
                                <BrowserRouter>
                                    <ErrorBoundary>
                                        <App />
                                    </ErrorBoundary>
                                </BrowserRouter>
                            </StrictMode>
                        </ErrorHandlerProvider>
                    </I18nContext>
                </AlertProvider>
            </SnackbarProvider>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
);
