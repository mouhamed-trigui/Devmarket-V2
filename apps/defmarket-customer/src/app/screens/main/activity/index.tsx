import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    useNavigation,
    getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PushNotifications from './PushNotifications';
import Activity from './Activity';
import {
    HeaderLeft,
    HeaderRight,
    HeaderTitle,
} from '../../../components/molecules/header';
import { ChevronBleu, Close, Parametres } from '../../../theme/svgs';
import { ThemeContext } from '../../../context/ThemeContext';
const Stack = createNativeStackNavigator();

const CompanyScreenNavigator = (props: any) => {
    const navigation = useNavigation();
    const safeAreaInsets = useSafeAreaInsets();
    const { theme, toggleTheme } = useContext(ThemeContext);
    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(props?.route);

        if (routeName && ['pushNotificationActivity']?.includes(routeName)) {
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
        return () => {
            if (routeName && !['']?.includes(routeName)) {
                navigation.setOptions({ tabBarStyle: { display: 'none' } });
            } else {
                navigation.setOptions({
                    tabBarStyle: {
                        backgroundColor: theme.colors.info[50],
                        borderTopColor: theme.colors.info[50],
                        height: 60 + safeAreaInsets.bottom,
                    },
                });
            }
        };
    }, [props?.navigation, props?.route]);

    return (
        <Stack.Navigator
            initialRouteName="Activity"
            screenOptions={({ navigation, route }) => ({
                headerShown: true,
                headerShadowVisible: false,
                headerBackVisible: false,
                headerTintColor: theme.colors.info[50],
                headerStyle: {
                    backgroundColor: theme.colors.info[700],
                },
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
            {/** Activity STACK */}
            <Stack.Group>
                <Stack.Screen
                    name="Activity"
                    options={({ navigation, route }) => ({
                        title: 'Mon Activité',
                    })}
                >
                    {(props) => <Activity {...props} />}
                </Stack.Screen>
                <Stack.Screen
                    name="pushNotificationActivity"
                    options={{
                        presentation: 'modal',
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: theme.colors.info[200],
                        },
                        headerLeft: () => (
                            <HeaderLeft
                                icon={
                                    <Parametres fill={theme.colors.info[50]} />
                                }
                                onPress={() => {
                                    navigation.navigate('Activity');
                                }}
                                style={{
                                    paddingHorizontal: 5,
                                }}
                            />
                        ),
                        headerTitle: () => (
                            <HeaderTitle
                                title={'Notifications'}
                                color={theme.colors.info[50]}
                            />
                        ),
                        headerRight: () => (
                            <HeaderRight
                                onPress={() => {
                                    navigation.navigate('Activity');
                                }}
                                icon={
                                    <Close
                                        fill={theme.colors.info[50]}
                                        height={20}
                                        width={20}
                                    />
                                }
                            />
                        ),
                    }}
                >
                    {(props) => <PushNotifications {...props} />}
                </Stack.Screen>
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default CompanyScreenNavigator;
