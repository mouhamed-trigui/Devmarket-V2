import React, { useContext } from 'react';
import { useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import {
    NavigationContainer as NNavigationContainer,
    DefaultTheme,
    DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { primary, secondary, info, danger, success } from '../../theme/colors';
import I18n from '../../extensions/i18n';
import { ThemeContext } from '../../context/ThemeContext';
import MainScreenNavigator from './../../screens/main/index';
/* eslint-disable-next-line */
export interface NavigationContainerProps {}

const Stack = createNativeStackNavigator();

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
export default function NavigationContainer(props: NavigationContainerProps) {
    const scheme = useColorScheme();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { language } = useSelector((state: any) => state);
    React.useEffect(() => {
        I18n.locale = language.language;
    }, []);

    return (
        <NNavigationContainer
            theme={scheme === 'dark' ? DarkTheme : CustomTheme}
        >
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShadowVisible: false,
                    headerBackTitleVisible: false,
                    headerTintColor: theme.colors.info[50],
                    headerStyle: {
                        backgroundColor: theme.colors.info[700],
                    },
                }}
            >
                <Stack.Screen
                    name="Home"
                    options={({ navigation, route }) => ({
                        headerShown: false,
                    })}
                >
                    {(props) => <MainScreenNavigator {...props} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NNavigationContainer>
    );
}
