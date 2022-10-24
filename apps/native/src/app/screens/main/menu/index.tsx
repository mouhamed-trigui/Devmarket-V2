import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Menu from './Menu';

import {
    useNavigation,
    getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useIntl } from 'react-intl';
import PushNotifications from '../activity/PushNotifications';
import Profile from '../profile/Profile';
import { SafeArea, Text } from '../../../components/atomes';
import { HeaderRight } from '../../../components/molecules/header';
import optionPNG from '../../../../assets/images/png/option.png';
import EditEmail from '../profile/EditEmail';
import EditPassword from '../profile/EditPassword';
import {
    deleteAccount,
    retractDeleteAccount,
} from '../../../services/methodes/profile';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../stores/slices';
import { me } from '../../../services';
import HasPermission from '../../../extensions/permission/HasPermission';

const Stack = createNativeStackNavigator();

const MenuScreenNavigator = (props: any) => {
    const navigation = useNavigation();
    const { formatMessage } = useIntl();
    const safeAreaInsets = useSafeAreaInsets();
    const { user } = useSelector((state: any) => state.user);
    const dispatch = useDispatch();

    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(props?.route);
        if (
            routeName &&
            ['pushNotificationMenu', 'EditEmail', 'EditPassword']?.includes(
                routeName
            )
        ) {
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
            if (routeName && ['Menu']?.includes(routeName)) {
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
            initialRouteName="Menu"
            screenOptions={{
                headerShown: false,
                headerShadowVisible: false,
                headerBackTitleVisible: false,
                headerTintColor: '#003753',
            }}
        >
            {/** MENU STACK */}
            <Stack.Group>
                <Stack.Screen
                    name={formatMessage({
                        id: 'BTTBP4',
                        defaultMessage: 'Menu',
                    })}
                    component={Menu}
                    options={{}}
                />
                <Stack.Screen
                    name="pushNotificationMenu"
                    options={{
                        presentation: 'modal',
                        headerShown: false,
                    }}
                >
                    {() => <PushNotifications />}
                </Stack.Screen>

                <Stack.Screen
                    name="Profile"
                    options={{
                        headerShown: true,
                        headerBackTitleVisible: false,
                        headerTintColor: '#003753',
                        headerTitle: () => (
                            <Text
                                fontSize="dm-h2"
                                fontFamily="mono"
                                color="system.50"
                            >
                                Mon Profil
                            </Text>
                        ),
                        headerRight: () => (
                            <HeaderRight
                                iconOption={optionPNG}
                                items={[
                                    {
                                        label: 'Modifier le mot de passe',
                                        onPress: () =>
                                            navigation.navigate('EditPassword'),
                                    },
                                    {
                                        label: "Modifier l'email",
                                        onPress: () =>
                                            navigation.navigate('EditEmail'),
                                    },
                                    {
                                        label: user?.deleteRequestDate
                                            ? 'Annuler la suppression de compte'
                                            : 'Supprimer mon compte',
                                        onPress: user?.deleteRequestDate
                                            ? () =>
                                                  retractDeleteAccount().then(
                                                      () =>
                                                          dispatch(
                                                              userActions.setUser(
                                                                  {
                                                                      ...user,
                                                                      deleteRequestDate: null,
                                                                  }
                                                              )
                                                          )
                                                  )
                                            : () =>
                                                  deleteAccount().then(() =>
                                                      me().then((res) =>
                                                          dispatch(
                                                              userActions.setUser(
                                                                  res?.data
                                                              )
                                                          )
                                                      )
                                                  ),
                                        confirmDialog: {
                                            title: user?.deleteRequestDate
                                                ? 'Annulation de la suppression de compte'
                                                : 'Suppression du compte',
                                            message: user?.deleteRequestDate
                                                ? 'Souhaitez-vous se rétracter pour la demande de suppression de votre compte'
                                                : 'Souhaites-tu supprimer ton compte définitivement?',
                                        },
                                    },
                                ]}
                            />
                        ),
                    }}
                >
                    {() => (
                        <HasPermission to="PROFILE">
                            <Profile />
                        </HasPermission>
                    )}
                </Stack.Screen>
                <Stack.Screen
                    name="EditEmail"
                    options={{
                        headerTransparent: true,
                        headerShown: true,
                        headerBackTitleVisible: false,
                        headerTintColor: 'white',
                        headerTitle: '',
                    }}
                >
                    {(props) => (
                        <HasPermission to="PROFILE">
                            <SafeArea bgIndicator={1}>
                                <EditEmail />
                            </SafeArea>
                        </HasPermission>
                    )}
                </Stack.Screen>
                <Stack.Screen
                    name="EditPassword"
                    options={{
                        headerTransparent: true,
                        headerShown: true,
                        headerBackTitleVisible: false,
                        headerTintColor: 'white',
                        headerTitle: '',
                    }}
                >
                    {(props) => (
                        <HasPermission to="PROFILE">
                            <SafeArea bgIndicator={1}>
                                <EditPassword />
                            </SafeArea>
                        </HasPermission>
                    )}
                </Stack.Screen>
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default MenuScreenNavigator;
