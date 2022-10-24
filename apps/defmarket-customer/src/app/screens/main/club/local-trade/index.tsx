import React, { useContext, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeContext } from '../../../../context/ThemeContext';
import {
    HeaderLeft,
    HeaderRight,
    HeaderTitle,
} from '../../../../components/molecules/header';
import {
    ChevronBleu,
    Close,
    Coeur,
    Notifications,
    Options,
} from '../../../../theme/svgs';
import LocalTrade from './trader/LocalTrade';
import StoreDetails from './store/StoreDetails';
import OfferDetails from './offer/OfferDetails';
import {
    useNavigation,
    getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EcommerceOfferValidated from './offer/EcommerceOfferValidated';
import { TouchableOpacity } from 'react-native';
import PhysicalOfferValidated from './offer/PhysicalOfferValidated';

export default function LocalTradeScreenNavigator(props) {
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();
    const safeAreaInsets = useSafeAreaInsets();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [favorite, setFavorite] = useState(false);

    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(props?.route);
        if (
            routeName &&
            [
                'OfferDetails',
                'ValidateOffer',
                'PhysicalOfferValidated',
            ]?.includes(routeName)
        ) {
            navigation.getParent().setOptions({
                tabBarStyle: {
                    display: 'none',
                },
            });
        } else {
            navigation.getParent().setOptions({
                tabBarStyle: {
                    backgroundColor: theme.colors.info[50],
                    borderTopColor: theme.colors.info[50],
                    height: 60 + safeAreaInsets.bottom,
                },
            });
        }
    }, [props?.navigation, props?.route]);

    const toggleFavorite = () => {
        setFavorite(!favorite);
    };
    return (
        <Stack.Navigator
            initialRouteName="LocalTrade"
            screenOptions={({ navigation, route }) => ({
                headerShadowVisible: false,
                headerShown: true,
                headerTintColor: theme.colors.info[50],
                headerStyle: {
                    backgroundColor: theme.colors.info[700],
                },
            })}
        >
            <Stack.Screen
                name="LocalTrade"
                options={({ navigation, route }) => ({
                    headerBackVisible: false,
                    headerLeft: () => (
                        <HeaderLeft
                            onPress={() => {
                                navigation.goBack();
                            }}
                            icon={<ChevronBleu fill={theme.colors.info[50]} />}
                        />
                    ),
                    headerTitle: () => (
                        <HeaderTitle
                            title="Commerces de proximité"
                            color={theme.colors.info[50]}
                        />
                    ),
                    headerRight: () => (
                        <HeaderRight
                            onPress={() => {
                                navigation.navigate('ActivitySection');
                            }}
                            icon={
                                <Notifications fill={theme.colors.info[50]} />
                            }
                        />
                    ),
                })}
            >
                {(props) => <LocalTrade {...props} />}
            </Stack.Screen>
            <Stack.Screen
                name="StoreDetails"
                options={({ navigation, route }) => ({
                    headerStyle: {
                        backgroundColor: theme.colors.info[700],
                    },
                    headerTitle: () => (
                        <HeaderTitle
                            title={route.params?.storeTitle}
                            color={theme.colors.info[50]}
                        />
                    ),

                    headerRight: () => (
                        <HeaderRight
                            icon={
                                favorite ? (
                                    <Coeur fill={theme.colors.info[400]}>
                                        :
                                    </Coeur>
                                ) : (
                                    <Coeur fill={theme.colors.info[50]} />
                                )
                            }
                            icon2={<Options fill={theme.colors.info[50]} />}
                            onPress={() => {
                                toggleFavorite();
                            }}
                            items={[
                                {
                                    title: "M'y rendre",
                                    onPressItem: () => {
                                        alert('Test');
                                    },
                                },
                                {
                                    title: 'Réclamation',
                                    onPressItem: () => {
                                        alert('Test');
                                    },
                                },
                            ]}
                        />
                    ),
                })}
            >
                {(props) => <StoreDetails {...props} />}
            </Stack.Screen>
            <Stack.Screen
                name="OfferDetails"
                options={({ navigation, route }) => ({
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: theme.colors.info[700],
                    },
                    /*         headerTitle: () => (
                        <HeaderTitle
                            title={route.params?.paramKey}
                            color={theme.colors.info[50]}
                        />
                    ),

                    headerRight: () => (
                        <HeaderRight
                            icon={
                                favorite ? (
                                    <Coeur fill={theme.colors.info[400]}>
                                        :
                                    </Coeur>
                                ) : (
                                    <Coeur fill={theme.colors.info[50]} />
                                )
                            }
                            icon2={<Options fill={theme.colors.info[50]} />}
                            onPress={() => {
                                toggleFavorite();
                            }}
                            onPress2={() => {}}
                        />
                    ), */
                })}
            >
                {(props) => <OfferDetails {...props} />}
            </Stack.Screen>
            <Stack.Screen
                name="EcommerceOfferValidated"
                options={{
                    headerShown: true,
                    headerBackVisible: false,
                    title: 'Remise chez Zalando',
                    headerStyle: {
                        backgroundColor: theme.colors.info[200],
                    },
                    headerRight: () => (
                        <TouchableOpacity
                            style={{
                                alignItems: 'flex-end',
                            }}
                            onPress={() => {
                                navigation.navigate('OfferDetails');
                            }}
                        >
                            <Close
                                fill={theme.colors.info[50]}
                                width={15}
                                height={15}
                            />
                        </TouchableOpacity>
                    ),
                }}
            >
                {(props) => <EcommerceOfferValidated {...props} />}
            </Stack.Screen>
            <Stack.Screen
                name="PhysicalOfferValidated"
                options={{
                    headerShown: true,
                    headerBackVisible: false,
                    title: "Déjeuner à l'entracte",
                    headerStyle: {
                        backgroundColor: theme.colors.info[200],
                    },
                    headerRight: () => (
                        <TouchableOpacity
                            style={{
                                alignItems: 'flex-end',
                            }}
                            onPress={() => {
                                navigation.navigate('OfferDetails');
                            }}
                        >
                            <Close
                                fill={theme.colors.info[50]}
                                width={15}
                                height={15}
                            />
                        </TouchableOpacity>
                    ),
                }}
            >
                {(props) => <PhysicalOfferValidated {...props} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
