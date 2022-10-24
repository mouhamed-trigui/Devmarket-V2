import React, { useEffect, useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import store from './src/app/stores/store';
import { FontDisplay, loadAsync } from 'expo-font';
import { Platform, View } from 'react-native';
import { ThemeProvider } from './src/app/context/ThemeContext';
import StripeProvider from './src/app/extensions/stripe/StripeProvider';
import NavigationContainer from './src/app/navigation/stack-navigation/navigation';
// mock API
import './src/app/services/mockAPI/index';
import DialogProvider from './src/app/components/atomes/dialog';
import { Provider as PaperProvider } from 'react-native-paper';

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
    }, []);

    if (!loaded) {
        return <View></View>;
    } else
        return (
            <Provider store={store}>
                <ThemeProvider>
                    <StripeProvider>
                        <PaperProvider>
                            <DialogProvider>
                                <NavigationContainer />
                            </DialogProvider>
                        </PaperProvider>
                    </StripeProvider>
                </ThemeProvider>
            </Provider>
        );
}
