import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../stores/slices';

// i18n
import I18nProvider from '../extensions/i18n';

// Components
import { Atomes } from '../components';

// Screens
import { Splashscreen } from '../screens/auth/splashscreen/splashscreen';
import WelcomePage from '../screens/auth/welcome-page/welcome-page';
import Registration from '../screens/auth/registration/registration';
import Confirmation from '../screens/auth/confirmation/confirmation';
import ConfirmationPassword from '../screens/auth/forgot-password/confirmationPassword';
import Identity from '../screens/auth/identity/identity';
import Login from '../screens/auth/login/login';
import ForgotPassword from '../screens/auth/forgot-password/forgot-password';
import Fingerprint from '../screens/auth/fingerprint/fingerprint';
import Home from '../screens/main';
import ActivationMail from '../screens/auth/activation/ActivationMail';
import CGV from '../screens/auth/cgv/cgv';
import Contact from '../screens/main/contact_page/contact';

// DeepLinking
import * as Linking from 'expo-linking';
// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Services
import { me } from '../services';
import axiosInstance from '../services/constants/api';
import { SafeArea, Text } from '../components/atomes';
import { system } from '../theme/colors';
import CompleteAccountConfiguration from '../screens/main/complete-account-configuration/CompleteAccountConfiguration';
import ChangeEmail from '../screens/deep-linking/change-email/ChangeEmail';
import ChangePassword from '../screens/auth/changePassword/ChangePassword';
import ConfirmationChangePassword from '../screens/auth/changePassword/ConfirmationChangePassword';
import SetupCompleted from '../screens/auth/setup-completed/SetupCompleted';
import PermissionProvider from '../extensions/permission/PermissionProvider';
import PushNotifications from '../screens/main/activity/PushNotifications';
import Communication from '../screens/auth/communication/communication';
import { Alert } from 'react-native';

/* eslint-disable-next-line */
export interface NavigationProps {
    navigation: any;
}

const Stack = createNativeStackNavigator();
export function NavigationState(props: NavigationProps) {
    // Redux
    const { i18n, user } = useSelector((state: any) => state);
    const dispatch = useDispatch();

    const getAccessToken = async () =>
        await AsyncStorage.getItem('@Access_Token').then(async (token) => {
            if (token) {
                // set access token in header axios
                axiosInstance.defaults.headers.common['Authorization'] =
                    'Bearer ' + token;
                // check user validity by access token
                me()
                    .then((res: any) => {
                        //dispatch(userActions.setUser(res?.data));
                        dispatch(userActions.setIsLoggedIn(true));
                    })
                    .catch(async (err: any) => {
                        console.error(err);
                        Alert.alert(
                            'Session expirée',
                            'Votre session est expirée, veuillez vous connecter de nouveau'
                        );
                    });
            } else {
                // clean up
                dispatch(userActions.setUser(null));
                dispatch(userActions.setIsLoggedIn(false));
                props?.navigation?.navigate('Login');
            }
        });

    // Life cycle
    useEffect(() => {
        getAccessToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // DeepLinking
    const [data, setData] = useState<Linking.ParsedURL | null>(null);

    //Deeplinking Configuration
    const prefix = Linking.createURL('/');
    const linking = {
        prefixes: [prefix],
        config: {
            screens: {
                ActivationMail: 'ActivationMail',
                changeEmail: 'changeEmail',
                changePassword: 'changePassword',
            },
        },
    };
    //HandelDeeplinking Function
    const handelDeepLink = (event: { url: any }) => {
        const data = Linking.parse(event.url);
        setData(data);
    };

    useEffect(() => {
        async function getInitialURL() {
            const initialURL = await Linking.getInitialURL();
            if (initialURL) setData(Linking.parse(initialURL));
        }

        Linking.addEventListener('url', handelDeepLink);
        if (!data) {
            getInitialURL();
        }
        return () => {
            Linking.removeEventListener('url', handelDeepLink);
        };
    }, [data]);

    return (
        // <I18nProvider locale={i18n?.locale ?? 'fr'}>
        <NavigationContainer linking={linking}>
            <PermissionProvider>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: true,
                        headerTransparent: true,
                        headerTintColor: 'white',
                        headerTitle: '',
                        headerShadowVisible: false,
                        headerStyle: {
                            backgroundColor: 'transparent',
                        },
                    }}
                >
                    {user.isLoggedIn ? (
                        // Screens for logged in users
                        <Stack.Group>
                            <Stack.Screen
                                name="Home"
                                options={{ headerShown: false }}
                            >
                                {(props) => <Home {...props} />}
                            </Stack.Screen>
                            <Stack.Screen
                                name="communication"
                                options={{
                                    headerShown: false,
                                    gestureEnabled: false,
                                }}
                            >
                                {(props) => (
                                    <Communication
                                        InMainNavigation={true}
                                        {...props}
                                    />
                                )}
                            </Stack.Screen>
                            <Stack.Screen
                                name="Identity"
                                options={{
                                    headerShown: false,
                                    gestureEnabled: false,
                                }}
                            >
                                {(props) => (
                                    <Atomes.SafeView bgIndicator={1}>
                                        <Identity {...props} />
                                    </Atomes.SafeView>
                                )}
                            </Stack.Screen>
                            <Stack.Screen
                                name="pushNotificationMain"
                                options={{
                                    headerShown: false,
                                    gestureEnabled: false,
                                }}
                            >
                                {(props) => (
                                    <PushNotifications
                                        InMainNavigation={true}
                                    />
                                )}
                            </Stack.Screen>
                            {/* Setup Completed */}
                            <Stack.Screen
                                name="SetupCompleted"
                                options={{ headerShown: false }}
                            >
                                {(props) => <SetupCompleted />}
                            </Stack.Screen>
                            {/* CompleteAccountConfiguration Profil  */}
                            <Stack.Screen
                                name="CompleteAccountConfiguration"
                                options={{
                                    headerShown: true,
                                    headerTintColor: 'white',
                                    headerTransparent: true,
                                    headerBackTitleVisible: false,
                                    headerTitle: () => (
                                        <Text
                                            fontSize="dm-h2"
                                            fontFamily="mono"
                                            color={system[200]}
                                        >
                                            Configure ton compte
                                        </Text>
                                    ),
                                }}
                            >
                                {(props) => (
                                    <SafeArea>
                                        <CompleteAccountConfiguration />
                                    </SafeArea>
                                )}
                            </Stack.Screen>
                            {/*  CompleteAccountConfiguration profil */}
                            <Stack.Screen
                                name="Contact"
                                options={{ headerShown: true }}
                            >
                                {(props) => <Contact {...props} />}
                            </Stack.Screen>
                            <Stack.Screen
                                name="changeEmail"
                                options={{
                                    headerShown: true,
                                    headerBackTitleVisible: false,
                                }}
                            >
                                {(props) => (
                                    <Atomes.SafeArea>
                                        <ChangeEmail data={data} />
                                    </Atomes.SafeArea>
                                )}
                            </Stack.Screen>
                        </Stack.Group>
                    ) : (
                        <Stack.Group>
                            <Stack.Screen
                                name="Splash"
                                options={{ headerShown: false }}
                            >
                                {(props) => (
                                    <Atomes.SafeView>
                                        <Splashscreen {...props} />
                                    </Atomes.SafeView>
                                )}
                            </Stack.Screen>
                            <Stack.Screen
                                name="Start"
                                options={{ headerShown: false }}
                            >
                                {(props) => <WelcomePage {...props} />}
                            </Stack.Screen>
                            <Stack.Screen
                                name="Login"
                                options={{ headerShown: false }}
                            >
                                {(props) => (
                                    <Atomes.SafeArea>
                                        <Login {...props} />
                                    </Atomes.SafeArea>
                                )}
                            </Stack.Screen>
                            <Stack.Screen
                                name="cgv"
                                options={{ headerShown: false }}
                            >
                                {(props) => <CGV {...props} />}
                            </Stack.Screen>
                            <Stack.Screen
                                name="Fingerprint"
                                options={{
                                    headerShown: true,
                                    headerTintColor: '#003753',
                                    headerBackTitleVisible: false,
                                }}
                            >
                                {(props) => (
                                    <Fingerprint
                                        {...props}
                                        image={require(`../../assets/images/image.jpg`)}
                                    />
                                )}
                            </Stack.Screen>
                            {/* screen forgot password */}
                            <Stack.Screen
                                name="ForgotPassword"
                                options={{
                                    headerBackTitleVisible: false,
                                }}
                            >
                                {(props) => (
                                    <Atomes.SafeArea>
                                        <ForgotPassword {...props} />
                                    </Atomes.SafeArea>
                                )}
                            </Stack.Screen>
                            {/* screen change password */}
                            <Stack.Screen
                                name="changePassword"
                                options={{
                                    headerBackTitleVisible: false,
                                }}
                            >
                                {(props) => (
                                    <Atomes.SafeArea>
                                        <ChangePassword data={data} />
                                    </Atomes.SafeArea>
                                )}
                            </Stack.Screen>
                            {/* screen confirmation change password with result success or fail */}
                            <Stack.Screen name="ConfirmationChangePassword">
                                {(props) => (
                                    <Atomes.SafeArea>
                                        <ConfirmationChangePassword
                                            {...props}
                                        />
                                    </Atomes.SafeArea>
                                )}
                            </Stack.Screen>
                            <Stack.Screen
                                name="Registration"
                                options={{
                                    headerShown: false,
                                }}
                            >
                                {(props) => (
                                    <Atomes.SafeArea>
                                        <Registration {...props} />
                                    </Atomes.SafeArea>
                                )}
                            </Stack.Screen>

                            <Stack.Screen
                                name="Confirmation"
                                options={{ headerShown: false }}
                            >
                                {(props) => (
                                    <Atomes.SafeArea>
                                        <Confirmation {...props} />
                                    </Atomes.SafeArea>
                                )}
                            </Stack.Screen>
                            <Stack.Screen
                                name="ActivationMail"
                                options={{ headerShown: false }}
                            >
                                {(props) => (
                                    <Atomes.SafeArea>
                                        <ActivationMail data={data} />
                                    </Atomes.SafeArea>
                                )}
                            </Stack.Screen>
                            <Stack.Screen
                                name="ConfirmationPassword"
                                options={{ headerShown: false }}
                            >
                                {(props) => (
                                    <Atomes.SafeArea>
                                        <ConfirmationPassword {...props} />
                                    </Atomes.SafeArea>
                                )}
                            </Stack.Screen>
                        </Stack.Group>
                    )}
                </Stack.Navigator>
            </PermissionProvider>
        </NavigationContainer>
        // </I18nProvider>
    );
}

export default NavigationState;
