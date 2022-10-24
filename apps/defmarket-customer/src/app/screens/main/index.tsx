import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeContext } from '../../context/ThemeContext';
import TabNavigation from '../../navigation/tab-navigation/TabNavigation';
import {
    Badge,
    BilletsWhite,
    Burger,
    SearchWhite,
    User,
} from '../../theme/svgs';
import ClubScreenNavigator from './club';
import Search from './search/Search';
import Ticket from './club/ticket/Ticket';
import Account from './account/Account';
import Menu from './menu/Menu';

export default function MainScreenNavigator(props) {
    const { theme, toggleTheme } = useContext(ThemeContext);

    let [tabs, setTabs] = useState([
        {
            name: 'ClubGroup',
            label: 'Le club',
            headerShown: false,
            component: ClubScreenNavigator,
            icon: (focused) => (
                <Badge
                    fill={
                        focused
                            ? theme.colors.primary[100]
                            : theme.colors.info[200]
                    }
                />
            ),
        },
        {
            name: 'SearchGroup',
            label: 'Recherche',
            headerShown: false,
            component: Search,
            icon: (focused) => (
                <SearchWhite
                    fill={
                        focused
                            ? theme.colors.primary[100]
                            : theme.colors.info[200]
                    }
                />
            ),
        },
        {
            name: 'TicketsGroup',
            label: 'Mes billets',
            headerShown: false,
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
        },
        {
            name: 'AccountGroup',
            label: 'Compte',
            headerShown: false,
            component: Account,
            icon: (focused) => (
                <User
                    fill={
                        focused
                            ? theme.colors.primary[100]
                            : theme.colors.info[200]
                    }
                />
            ),
        },
        {
            name: 'MenuGroup',
            label: 'Menu',
            headerShown: false,
            component: Menu,
            icon: (focused) => (
                <Burger
                    fill={
                        focused
                            ? theme.colors.primary[100]
                            : theme.colors.info[200]
                    }
                />
            ),
        },
    ]);

    return <TabNavigation tabs={tabs} />;
}
