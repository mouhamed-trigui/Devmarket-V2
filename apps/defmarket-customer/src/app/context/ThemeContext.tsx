import React, { useState } from 'react';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import {
    blackInfo,
    danger,
    info,
    primary,
    secondary,
    success,
} from '../theme/colors';

const CustomTheme = {
    ...DefaultTheme,
    dark: false,
    colors: {
        ...DefaultTheme.colors,
        primary: { ...primary },
        secondary: { ...secondary },
        info: { ...info },
        danger: { ...danger },
        success: { ...success },
    },
};
const CustomDarkTheme = {
    ...DarkTheme,
    dark: true,
    colors: {
        ...DefaultTheme.colors,
        primary: { ...primary },
        secondary: { ...secondary },
        info: { ...blackInfo },
        danger: { ...danger },
        success: { ...success },
    },
};

export const ThemeContext = React.createContext({
    theme: CustomTheme,
    toggleTheme: () => undefined,
});

export function ThemeProvider(props) {
    const [theme, setTheme] = useState(CustomTheme);
    const toggleTheme = () => {
        if (theme.dark) {
            setTheme(CustomTheme);
        } else {
            setTheme(CustomDarkTheme);
        }
    };
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
}

export type ThemeType = typeof CustomTheme;
