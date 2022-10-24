import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TabButton from './TabButton';
import { BilletsWhite, SalesTag, ShoppingBasket } from '../../theme/svgs';
import { ThemeContext } from '../../context/ThemeContext';
import Ticket from '../../screens/main/club/ticket/Ticket';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores/store';
import Basket from '../../screens/main/club/ticket/Basket';
import Offers from '../../screens/main/club/local-trade/offer/Offers';
const Tab = createBottomTabNavigator();
export interface TabNavigationProps {
    tabs: [] | any;
    clubComponent?: { component: ReactElement | any };
    dynamicTab?: {
        name: string;
        label: string;
        headerShown: boolean;
        component: ReactElement | any;
        icon: ReactElement | any;
    };
}
export default function TabNavigation(props: TabNavigationProps) {
    const { theme, toggleTheme } = useContext(ThemeContext);
    let [tabs, setTabs] = useState([...props?.tabs]);
    const safeAreaInsets = useSafeAreaInsets();
    const { user } = useSelector((state: RootState) => state);

    useEffect(() => {
        let newTabs = [...tabs];
        let dynamicTab = getDynamicTab(user?.currentRoute);
        newTabs[2] = dynamicTab;
        setTabs(newTabs);
    }, [user?.currentRoute]);

    const getDynamicTab = (currentRoute) => {
        switch (currentRoute) {
            case 'Billetterie': {
                return {
                    name: 'BasketGroup',
                    label: 'Panier',
                    headerShown: true,
                    component: Basket,
                    icon: (focused) => (
                        <ShoppingBasket
                            height={25}
                            width={25}
                            fill={
                                focused
                                    ? theme.colors.primary[100]
                                    : theme.colors.info[200]
                            }
                        />
                    ),
                };
            }
            case 'Commerce': {
                return {
                    name: 'CommerceGroup',
                    label: 'Mes offres',
                    headerShown: true,
                    component: Offers,
                    icon: (focused) => (
                        <SalesTag
                            fill={
                                focused
                                    ? theme.colors.primary[100]
                                    : theme.colors.info[200]
                            }
                        />
                    ),
                };
            }
            default:
                return {
                    name: 'TicketsGroup',
                    label: 'Mes billets',
                    headerShown: true,
                    component: Ticket,
                    icon: (focused) => (
                        <BilletsWhite
                            fill={
                                focused
                                    ? theme.colors.primary[100]
                                    : theme.colors.info[200]
                            }
                        />
                    ),
                };
        }
    };
    return (
        <Tab.Navigator
            initialRouteName="ClubGroup"
            screenOptions={{
                headerTintColor: theme.colors.info[50],
                headerShadowVisible: false,
                headerStyle: {
                    shadowOpacity: 0,
                    elevation: 0,
                },
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: theme.colors.info[50],
                    borderTopColor: theme.colors.info[50],
                    height: 60 + safeAreaInsets.bottom,
                },
                tabBarActiveTintColor: theme.colors.primary[100],
                tabBarInactiveTintColor: theme.colors.info[200],
            }}
        >
            {tabs.map((screen, index) => {
                return (
                    <Tab.Screen
                        key={index}
                        name={screen.name}
                        options={{
                            tabBarLabel: screen.label,
                            headerShown: screen.headerShown ?? true,
                            tabBarIcon: ({ focused }) => (
                                <TabButton
                                    icon={screen.icon(focused)}
                                    active={focused}
                                    name={screen.label}
                                />
                            ),
                        }}
                        component={screen.component}
                    />
                );
            })}
        </Tab.Navigator>
    );
}
