import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Activity from './Activity';

import {
    useNavigation,
    getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HeaderRight, HeaderTitle } from '../../../components/molecules/header';
import boutonNotifications from '../../../../assets/images/png/bouton-notifications-bleu-f.png';
import parametres from '../../../../assets/images/png/parametres.png';

import { useIntl } from 'react-intl';
import PushNotifications from './PushNotifications';
import Notifications from './Notifications';
import HasPermission from '../../../extensions/permission/HasPermission';

const Stack = createNativeStackNavigator();

const CompanyScreenNavigator = (props: any) => {
    const navigation = useNavigation();
    const { formatMessage } = useIntl();
    const safeAreaInsets = useSafeAreaInsets();

    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(props?.route);
        if (routeName && ['pushNotificationActivity']?.includes(routeName)) {
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
            if (routeName && !['']?.includes(routeName)) {
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

    return (
        <Stack.Navigator
            initialRouteName="Activity"
            screenOptions={{
                headerShadowVisible: false,
                headerBackTitleVisible: false,
                headerTintColor: '#003753',
            }}
        >
            {/** Activity STACK */}
            <Stack.Group>
                <Stack.Screen
                    name={formatMessage({
                        id: 'BTTBP3',
                        defaultMessage: 'Activité',
                    })}
                    options={{
                        headerTitle: () => (
                            <HeaderTitle
                                icon={boutonNotifications}
                                title="Mon Activité"
                                color="#003753"
                            />
                        ),
                        headerRight: () => (
                            <HeaderRight
                                icon={parametres}
                                onPress={() =>
                                    navigation.navigate(
                                        'pushNotificationActivity'
                                    )
                                }
                            />
                        ),
                    }}
                >
                    {() => (
                        <HasPermission to="NOTIFICATION">
                            <Notifications />
                        </HasPermission>
                    )}
                </Stack.Screen>
                <Stack.Screen
                    name="pushNotificationActivity"
                    options={{
                        presentation: 'modal',
                        headerShown: false,
                    }}
                >
                    {(props) => <PushNotifications />}
                </Stack.Screen>
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default CompanyScreenNavigator;
