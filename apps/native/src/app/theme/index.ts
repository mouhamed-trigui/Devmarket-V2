import { primary, secondary, alerts, system } from './colors';
import { extendTheme } from 'native-base';

export const Theme = extendTheme({
    colors: { primary, secondary, alerts, system },
    fontSizes: {
        'dm-h1': 24,
        'dm-h2': 18,
        'dm-p': 14,
        'dm-2p': 16,
        'dm-3p': 18,
    },
    fonts: {
        heading: 'MiterBold', // H1
        body: 'RobotoRegular', // P
        mono: 'WorkSansBold', // H1,H2
        medium: 'RobotoMedium',
        bold: 'RobotoBold',
        workSans: 'WorkSans',
        light: 'RobotoLight',
        italic: 'RobotoItalic',
    },
    config: {},
});
