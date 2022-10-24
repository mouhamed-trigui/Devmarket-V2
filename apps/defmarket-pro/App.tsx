import React, { useEffect, useState } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { ScreenOrientation } from 'expo-sdk';
import { NativeBaseProvider } from 'native-base';
import { SSRProvider } from '@react-aria/ssr';
// i18n
import I18nProvider from './src/app/extensions/i18n';
// Redux
import { Provider } from 'react-redux';
import store from './src/app/stores/index';

// Screens
import Notification from './src/app/utils/notifications';

// Theme & Fonts
import { Theme } from './src/app/theme/index';
import { loadAsync, FontDisplay } from 'expo-sdk';

// Navigation
import NavigationState from './src/app/navigation/navigation';
import StatusBarProvider from './src/app/components/molecules/statusbar-style/StatusBarProvider';
import SpinnerProvider from './src/app/components/atomes/spinner/SpinnerProvider';

export default function App() {
    const [loaded, setLoaded] = useState(false);

    const loadFonts = async () => {
        await loadAsync({
            // Load a font `defmarket` from a static resource
            DefmarketFontPrimary: require('./src/assets/fonts/defmarket-font-primary.ttf'),
            DefmarketFontSecondary: require('./src/assets/fonts/defmarket-font-secondary.ttf'),
            DefmarketFontTertiary: require('./src/assets/fonts/defmarket-font-tertiary.ttf'),
            MiterBold: require('./src/assets/fonts/Miter/Mitr-Bold.ttf'),
            RobotoLight: require('./src/assets/fonts/Roboto/Roboto-Light.ttf'),
            RobotoMedium: require('./src/assets/fonts/Roboto/Roboto-Medium.ttf'),
            RobotoRegular: require('./src/assets/fonts/Roboto/Roboto-Regular.ttf'),
            RobotoBold: require('./src/assets/fonts/Roboto/Roboto-Bold.ttf'),
            WorkSansBold: require('./src/assets/fonts/WorkSans/WorkSans-Bold.ttf'),
            WorkSans: require('./src/assets/fonts/WorkSans/WorkSans-Regular.ttf'),
            'Montserrat-SemiBold': {
                uri: require('./src/assets/fonts/Montserrat/Montserrat-Black.ttf'),
                display: FontDisplay.FALLBACK,
            },
        });
        setLoaded(true);
    };

    useEffect(() => {
        loadFonts();
        // Any portrait orientation
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }, []);

    if (!loaded) {
        return null;
    } else
        return (
            <Provider store={store}>
                <StatusBarProvider>
                    <SSRProvider>
                        <I18nProvider locale={'fr'}>
                            {Platform.OS === 'web' ? (
                                <NativeBaseProvider theme={Theme}>
                                    <SpinnerProvider>
                                        <NavigationState />
                                    </SpinnerProvider>
                                </NativeBaseProvider>
                            ) : (
                                <Notification>
                                    <NativeBaseProvider theme={Theme}>
                                        <SpinnerProvider>
                                            <NavigationState />
                                        </SpinnerProvider>
                                    </NativeBaseProvider>
                                </Notification>
                            )}
                        </I18nProvider>
                    </SSRProvider>
                </StatusBarProvider>
            </Provider>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
