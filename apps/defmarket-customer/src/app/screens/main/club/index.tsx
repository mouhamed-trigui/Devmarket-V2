import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HeaderRight, HeaderTitle } from '../../../components/molecules/header';
import LocalTradeModule from './local-trade';
import { ThemeContext } from './../../../context/ThemeContext';
import { Notifications, Parametres, WavingHand } from '../../../theme/svgs';
import CashBack from './cash-back/CashBack';
import Club from './Club';
import {
    useNavigation,
    getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../../stores/slices';
import CompanyScreenNavigator from './../activity/index';
import TicketScreenNavigator from './ticket/index';
import { Dimensions } from 'react-native';
const Stack = createNativeStackNavigator();

export default function ClubScreenNavigator(props) {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const dispatch = useDispatch();

    useEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(props?.route);
        dispatch(userActions.setCurrentRoute({ route: routeName }));
    }, [props?.navigation, props?.route]);

    const screenWidth = Dimensions.get('window').width;
    return (
        <Stack.Navigator
            initialRouteName="Default"
            screenOptions={({ navigation, route }) => ({
                headerShadowVisible: false,
                headerBackTitleVisible: false,
                headerTintColor: theme.colors.info[50],
                headerStyle: {
                    backgroundColor: theme.colors.info[700],
                },

                headerRight: () => (
                    <HeaderRight
                        onPress={() => {
                            navigation.navigate('ActivitySection');
                        }}
                        icon={<Notifications fill={theme.colors.info[50]} />}
                    />
                ),
            })}
        >
            <Stack.Screen
                name="Default"
                options={({ navigation, route }) => ({
                    headerTitle: () => (
                        <HeaderTitle
                            title="Salut Abdel"
                            color={theme.colors.info[50]}
                            icon={<WavingHand fill={theme.colors.info[50]} />}
                            fullWidth={true}
                        />
                    ),
                })}
            >
                {(props) => <Club {...props} />}
            </Stack.Screen>

            <Stack.Screen
                name="Billetterie"
                options={{
                    title: 'Billetterie',
                    headerShown: false,
                    headerShadowVisible: false,
                }}
            >
                {(props) => <TicketScreenNavigator {...props} />}
            </Stack.Screen>

            <Stack.Screen
                name="CashBack"
                options={{
                    title: 'Cash-Back',
                    headerTitle: () => (
                        <HeaderTitle
                            title="Cash-Back"
                            color={theme.colors.info[50]}
                        />
                    ),
                }}
            >
                {(props) => <CashBack {...props} />}
            </Stack.Screen>

            <Stack.Screen
                name="Commerce"
                options={{
                    title: 'Commerces de proximité',
                    headerShown: false,
                    headerTitle: () => (
                        <HeaderTitle
                            title="Commerces de proximité"
                            color={theme.colors.info[50]}
                        />
                    ),
                }}
            >
                {(props) => <LocalTradeModule {...props} />}
            </Stack.Screen>
            <Stack.Screen
                name="ActivitySection"
                options={({ navigation, route }) => ({
                    title: 'Mon Activité',
                    headerShown: false,
                    headerTitle: () => (
                        <HeaderTitle
                            title="Mon Activité"
                            color={theme.colors.info[50]}
                        />
                    ),
                    headerRight: () => (
                        <HeaderRight
                            icon={<Parametres fill={theme.colors.info[50]} />}
                            onPress={() => {
                                navigation.navigate('pushNotificationActivity');
                            }}
                        />
                    ),
                })}
            >
                {(props) => <CompanyScreenNavigator {...props} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
