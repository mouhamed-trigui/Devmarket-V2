import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: string;
        };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        status?: {
            danger?: string;
        };
    }
}
export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#003753',
            contrastText: '#fff',
        },
        secondary: {
            main: '#00AAC7',
            contrastText: '#fff',
        },
        error: {
            main: '#E03616',
            contrastText: '#fff',
        },
        warning: {
            main: '#EAAE00',
            contrastText: '#fff',
        },
        info: {
            main: '#f44336',
            contrastText: '#000',
        },
        success: {
            main: '#23ECA3',
            contrastText: '#fff',
        },
        text: { primary: '#003753', secondary: '#003753', disabled: '#E8E8E8' },
    },
    status: {
        danger: orange[500],
    },
    components: {
        MuiButton: { styleOverrides: { root: { textTransform: 'none' } } },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& fieldset': {
                        borderColor: '#003753',
                    },
                },
            },
        },
    },
    typography: {
        fontFamily: 'Roboto',
        fontSize: 14,
        h1: {
            fontSize: '32px',
            fontWeight: 'bold',
        },
        h2: {
            fontSize: '24px',
            fontWeight: 'bold',
        },
        h3: {
            fontSize: '18px',
            fontWeight: 'bold',
        },
        h4: {
            fontSize: '16px',
        },
        h5: {
            fontSize: '14px',
        },
        h6: {},
        subtitle1: {},
        subtitle2: {},
        body1: {},
        body2: { color: 'black', fontSize: '14px' },
        button: {
            fontSize: '16px',
        },
    },
});
