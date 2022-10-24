import React, { useEffect, useState } from 'react';
import { Image, Platform, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
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
import { loadAsync, FontDisplay } from 'expo-font';

// Navigation
import NavigationState from './src/app/navigation/navigation';
import StatusBarProvider from './src/app/components/molecules/statusbar-style/StatusBarProvider';
import SpinnerProvider from './src/app/components/atomes/spinner/SpinnerProvider';

import Splash from './assets/splash-defmarket-pro.png';
import SplashTablet from './assets/splash-defmarket-pro-tablette.png';

export default function App() {
    const [loaded, setLoaded] = useState(false);

    const loadFonts = async () => {
        await loadAsync({
            // Load a font `defmarket` from a static resource
            DefmarketFontPrimary: require('./src/assets/fonts/defmarket-font-primary.ttf'),
            DefmarketFontSecondary: require('./src/assets/fonts/defmarket-font-secondary.ttf'),
            DefmarketFontTertiary: require('./src/assets/fonts/defmarket-font-tertiary.ttf'),
            MiterBold: require('./src/assets/fonts/Miter/Mitr-Bold.ttf'),
            RobotoItalic: require('./src/assets/fonts/Roboto/Roboto-Italic.ttf'),
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
        if (Platform.OS === 'ios') {
            setTimeout(() => {
                loadFonts();
            }, 1000);
        } else {
            loadFonts();
        }
        // Any portrait orientation
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }, []);

    if (!loaded) {
        return Platform.OS === 'ios' ? (
            <View
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Image
                    source={Platform.isPad ? SplashTablet : Splash}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                    accessibilityLabel='"Splash'
                />
            </View>
        ) : null;
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
