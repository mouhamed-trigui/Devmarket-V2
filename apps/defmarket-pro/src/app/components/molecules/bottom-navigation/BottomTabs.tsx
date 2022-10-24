import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../../screens/main/home';
import TabButton from './TabButton';
import Structure from '../../../screens/main/company';
import Contact from '../../../screens/main/contact/Contact';
import Activity from '../../../screens/main/activity';
import Menu from '../../../screens/main/menu';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// assets
import home from '../../../../assets/images/svg/home.svg';
import shop from '../../../../assets/images/svg/shop.svg';
import chat from '../../../../assets/images/svg/chat.svg';
import notifications from '../../../../assets/images/svg/notifications.svg';
import burger from '../../../../assets/images/svg/burger.svg';

// Redux
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    const { user } = useSelector((state: any) => state.user);

    // Setup Completed
    const [isSetupCompleted, setIsSetupCompleted] = useState<boolean>();
    const navigation = useNavigation();

    useEffect(() => {
        if (
            isSetupCompleted === undefined &&
            user?.completeRegistrationPercentage !== undefined
        ) {
            setIsSetupCompleted(
                user?.completeRegistrationPercentage === '100%'
            );
        } else if (
            isSetupCompleted === false &&
            user?.completeRegistrationPercentage === '100%'
        ) {
            setIsSetupCompleted(true);
            navigation?.navigate('SetupCompleted');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.completeRegistrationPercentage]);

    const { formatMessage } = useIntl();
    const navigationOptions = [
        {
            name: 'homeGroup',
            label: formatMessage({ id: 'BTTBP1', defaultMessage: 'Accueil' }),
            icon: home,
            component: Home,
            headerShown: false,
        },
        {
            name: 'structureGroup',
            label: formatMessage({ id: 'BTTBP2', defaultMessage: 'Business' }),
            icon: shop,
            component: Structure,
            headerShown: false,
        },
        {
            name: 'contactGroup',
            label: formatMessage({ id: 'BTTBP5', defaultMessage: 'Chat' }),
            icon: chat,
            component: Contact,
            headerShown: false,
        },
        {
            name: 'activityGroup',
            label: formatMessage({ id: 'BTTBP3', defaultMessage: 'Activités' }),
            icon: notifications,
            component: Activity,
            headerShown: false,
        },
        {
            name: 'menuGroup',
            label: formatMessage({ id: 'BTTBP4', defaultMessage: 'Menu' }),
            icon: burger,
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
        >
            {navigationOptions.map(
                ({ name, label, component, icon, headerShown }) => (
                    <Tab.Screen
                        key={name}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <TabButton
                                    xml={icon}
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
