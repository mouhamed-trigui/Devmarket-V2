export const primary = {
    50: '#00AAC7', // Blue
    100: '#EAAE00', // Yellow
};

export const secondary = {
    50: '#90D2EC', // Light blue
    100: '#B60C1F', // Red
    200: '#F57D66', // Dark Orange
    300: '#FF8A00', // Orange
    400: '#ddf1f9', // Light blue 2
    500: '#36ce97', // Light green
};

export const info = {
    50: '#003753', // Dark Blue
    100: '#E8E8E8', // Light White
    200: '#FFFFFF', // White
    300: '#F6F6F7', // Light grey
    400: '#B60C1F', // Red
    500: '#E87564', // Orange
    600: '#828383', // Grey
    700: '#F2F2F2', // Light Grey 2
    800: '#00375380', //  Blue with 0.5 opacity
};
export const blackInfo = {
    50: '#23ECA3', // Dark Blue
    100: '#E8E8E8', // Light White
    200: '#000000', // White
    300: '#F6F6F7', // Light grey
    400: '#B60C1F', // Red
    500: '#E87564', // Orange
    600: '#828383', // Grey
    700: '#000000', // Light Grey 2
    800: '#00375380', //  Blue with 0.5 opacity
};

export const danger = {
    50: '#23ECA3', // Green
    100: '#E03616', // Red
    200: '#b60c1f', // Dark Red
    300: '#f9eced', // Light Red
    400:'#F0CED2'
};

export const success = {
    50: '#23ECA3', //Green
    100: '#E03616', //Red
};

export interface colorsType {
    background: string;
    border: string;
    card: string;
    notification: string;
    text: string;
    primary: {
        '100': string;
        '50': string;
    };

    info: {
        '100': string;
        '200': string;
        '300': string;
        '400': string;
        '50': string;
        '500': string;
        '600': string;
    };

    secondary: {
        '100': string;
        '200': string;
        '300': string;
        '50': string;
    };
    success: {
        '100': string;
        '50': string;
    };
    danger: {
        '100': string;
        '50': string;    
        '200': string;
        '300': string;
        '400': string;

    };
}
