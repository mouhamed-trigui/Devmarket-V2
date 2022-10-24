import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HeaderRight, HeaderTitle } from '../../../components/molecules/header';

import Home from './home';

import {
    useNavigation,
    getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Redux
import { useSelector } from 'react-redux';

import wavingHand from '../../../../assets/images/png/waving-hand.png';
import aide from '../../../../assets/images/png/aide.png';
import DefmarketNextFeatures from './coming-soon/DefmarketNextFeatures';
import { primary, system } from '../../../theme/colors';
import HasPermission from '../../../extensions/permission/HasPermission';
import DefmarketPresentation from './presentation/DefmarketPresentation';
import { IconButton } from 'native-base';

import BackleftPng from '../../../../assets/images/png/backLeft.png';
import ChevronLeftSvg from '../../../../assets/images/svg/chevron-left.svg';
import { Image, Platform, TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator();

const HomeScreenNavigator = (props: any) => {
    const navigation = useNavigation();

    const safeAreaInsets = useSafeAreaInsets();

    const { user } = useSelector((state: any) => state.user);

    // modal state
    const [showModal, setShowModal] = React.useState(false);

    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(props?.route);
        if (routeName && ['defmarket_next_features', 'Presentation_Defmarket_Pro']?.includes(routeName)) {
            navigation.setOptions({ tabBarStyle: { display: 'none' } });
        } else {
            navigation.setOptions({
                tabBarStyle: {
                    backgroundColor: '#003753',
                    borderTopColor: '#003753',
                    height: 60 + safeAreaInsets.bottom,
                },
            });
        }
        return () => {
            if (routeName && ['']?.includes(routeName)) {
                navigation.setOptions({ tabBarStyle: { display: 'none' } });
            } else {
                navigation.setOptions({
                    tabBarStyle: {
                        backgroundColor: '#003753',
                        borderTopColor: '#003753',
                        height: 60 + safeAreaInsets.bottom,
                    },
                });
            }
        };
    }, [props?.navigation, props?.route]);

    // Use Effect to test identity is completed
    React.useEffect(() => {
        if (
            user?.completeRegistration?.identityValidated === false ||
            user?.completeRegistration?.companyCompleted === false ||
            user?.completeRegistration?.storeValidated === false
        ) {
            navigation.navigate('Identity');
        } else if (!user?.pushNotificationActive) {
            navigation.navigate('pushNotificationMain');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        navigation,
        user?.completeRegistration?.companyCompleted,
        user?.completeRegistration?.identityValidated,
        user?.completeRegistration?.storeValidated,
    ]);

    return (
        <Stack.Navigator
            initialRouteName="Accueil"
            screenOptions={{
                headerShadowVisible: false,
                headerBackTitleVisible: false,
                headerTintColor: '#003753',
            }}
        >
            {/** HOME STACK */}
            <Stack.Group>
                <Stack.Screen
                    name="Accueil"
                    options={{
                        headerTitle: () => (
                            <HeaderTitle
                                title={`Bonjour ${user?.firstName ?? ''}`}
                                icon={wavingHand}
                                color="#003753"
                            />
                        ),
                        headerRight: () => (
                            <HeaderRight
                                icon={aide}
                                onPress={() => setShowModal(true)}
                            />
                        ),
                    }}
                >
                    {() => (
                        <HasPermission to="HOME">
                            <Home show={showModal} setShow={setShowModal} />
                        </HasPermission>
                    )}
                </Stack.Screen>
                <Stack.Screen
                    name="defmarket_next_features"
                    component={DefmarketNextFeatures}
                    options={{
                        headerTintColor: system[200],
                        headerStyle: { backgroundColor: "#003753" },
                        headerTitle: () => (
                            <HeaderTitle
                                title="Bientôt sur Defmarket PRO"
                                color={system[200]}
                            />
                        ),
                    }}
                />
                <Stack.Screen
                    name="Presentation_Defmarket_Pro"
                    component={DefmarketPresentation}
                    options={{
                        headerTintColor: system[200],
                        headerStyle: { backgroundColor: primary[50] },
                        headerTitle: () => (
                            <HeaderTitle
                                title="Mes premiers pas"
                                color={system[200]}
                            />
                        ),
                    }}
                />
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default HomeScreenNavigator;
