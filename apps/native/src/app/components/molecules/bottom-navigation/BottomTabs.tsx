import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../../screens/main/home';
import TabButton from './TabButton';
import Structure from '../../../screens/main/company';
import Contact from '../../../screens/main/contact/Contact';
import Activity from '../../../screens/main/activity';
import Menu from '../../../screens/main/menu';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
// assets

import HomeSvg from '../../../../assets/images/svg/home.svg';
import Shop from '../../../../assets/images/svg/shop.svg';
import Chat from '../../../../assets/images/svg/chat.svg';
import Notifications from '../../../../assets/images/svg/notifications.svg';
import Burger from '../../../../assets/images/svg/burger.svg';

// Redux
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    const { user } = useSelector((state: any) => state.user);

    const navigation = useNavigation();

    const checkIfSetupCompletedInStorage = async () => {
        await AsyncStorage.getItem('@isSetupCompleted').then(
            async (isSetupCompletedInStorage) => {
                console.log({ isSetupCompletedInStorage });
                if (!isSetupCompletedInStorage) {
                    if (
                        user?.completeRegistrationPercentage === '100%' &&
                        user?.validatedByAdmin === true
                    ) {
                        setIsSetupCompletedInStorage('true');
                        navigation?.navigate('SetupCompleted');
                    }
                }
            }
        );
    };

    const setIsSetupCompletedInStorage = async (isSetupCompleted: string) => {
        await AsyncStorage.setItem('@isSetupCompleted', isSetupCompleted);
    };

    useEffect(() => {
        checkIfSetupCompletedInStorage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.completeRegistrationPercentage]);

    const { formatMessage } = useIntl();
    const navigationOptions = [
        {
            name: 'homeGroup',
            label: formatMessage({ id: 'BTTBP1', defaultMessage: 'Accueil' }),
            Icon: (props: any) => <HomeSvg fill={props?.fill} />,
            component: Home,
            headerShown: false,
        },
        {
            name: 'structureGroup',
            label: formatMessage({ id: 'BTTBP2', defaultMessage: 'Business' }),
            Icon: (props: any) => <Shop fill={props?.fill} />,
            component: Structure,
            headerShown: false,
        },
        {
            name: 'contactGroup',
            label: formatMessage({ id: 'BTTBP5', defaultMessage: 'Contact' }),
            Icon: (props: any) => <Chat fill={props?.fill} />,
            component: Contact,
            headerShown: false,
        },
        {
            name: 'activityGroup',
            label: formatMessage({ id: 'BTTBP3', defaultMessage: 'Activités' }),
            Icon: (props: any) => <Notifications fill={props?.fill} />,
            component: Activity,
            headerShown: false,
        },
        {
            name: 'menuGroup',
            label: formatMessage({ id: 'BTTBP4', defaultMessage: 'Menu' }),
            Icon: (props: any) => <Burger fill={props?.fill} />,
            component: Menu,
            headerShown: false,
        },
    ];

    const safeAreaInsets = useSafeAreaInsets();
    return (
        <Tab.Navigator
            initialRouteName="Accueil"
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#003753',
                    borderTopColor: '#003753',
                    height: 60 + safeAreaInsets.bottom,
                },
                headerShadowVisible: false,
                headerTintColor: '#003753',
                headerStyle: {
                    borderBottomWidth: 0,
                    elevation: 0,
                },
            }}
            backBehavior="history"
        >
            {navigationOptions.map(
                ({ name, label, component, Icon, headerShown }) => (
                    <Tab.Screen
                        key={name}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <TabButton
                                    xml={
                                        <Icon
                                            fill={focused ? '#EAAE00' : 'white'}
                                        />
                                    }
                                    name={label}
                                    active={focused}
                                />
                            ),

                            headerShown: headerShown ?? true,
                        }}
                        name={name}
                        component={component}
                    />
                )
            )}
        </Tab.Navigator>
    );
};

export default BottomTabs;
