import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import PageContainer from '../../../components/atomes/container/PageContainer';
import { ThemeContext } from './../../../context/ThemeContext';
import { ModuleItemCard, SmallCard } from '../../../components/atomes/card';
import {
    BilletsWhite,
    CashBackWhite,
    Coeur,
    Shop,
    ShoppingBasket,
} from '../../../theme/svgs';
import ActionButtons from '../../../components/atomes/button/action-button/ActionButtons';
import Announcement from '../../../components/organisms/announcement-box/Announcement';
import { me } from './../../../services/methodes/auth/index';
import { userActions } from './../../../stores/slices/user/user';
import { useDispatch } from 'react-redux';

export default function Club({ navigation }) {
    const dispatch = useDispatch();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [modules, setModules] = useState([
        {
            title: 'Billetterie',
            description: 'Lorem ipsum lorem ipsum',
            icon: (
                <BilletsWhite
                    fill={theme.colors.info[200]}
                    height={50}
                    width={50}
                />
            ),
            textColor: theme.colors.info[50],
            bgColor: theme.colors.primary[100],
            path: 'Billetterie',
        },
        {
            title: 'Cash-Back',
            description: 'Lorem ipsum lorem ipsum',
            icon: (
                <CashBackWhite
                    fill={theme.colors.info[200]}
                    height={50}
                    width={50}
                />
            ),
            textColor: theme.colors.info[200],
            bgColor: theme.colors.primary[50],
            path: 'CashBack',
        },
        {
            title: 'Commerces de proximité',
            description: 'Lorem ipsum lorem ipsum',
            icon: <Shop fill={theme.colors.info[50]} height={50} width={50} />,
            textColor: theme.colors.info[50],
            bgColor: theme.colors.secondary[300],
            path: 'Commerce',
        },
    ]);

    const [pages, setPages] = useState([
        {
            title: 'Mes favoris',
            path: '',
            icon: (
                <Coeur fill={theme.colors.info[200]} height={60} width={60} />
            ),
        },
        {
            title: "Historique d'achat",
            path: '',
            icon: (
                <ShoppingBasket
                    fill={theme.colors.info[200]}
                    height={60}
                    width={60}
                />
            ),
        },
    ]);
    useEffect(() => {
        me()
            .then((res) => {
                dispatch(userActions.setUser(res));
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <View
            style={{
                position: 'relative',
                flex: 1,
            }}
        >
            <PageContainer
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
            >
                <Announcement />
                <View style={{ paddingHorizontal: '6%', paddingTop: 20 }}>
                    {modules.map((module, index) => (
                        <ModuleItemCard
                            key={index}
                            title={module.title}
                            description={module.description}
                            icon={module.icon}
                            textColor={module.textColor}
                            bgColor={module.bgColor}
                            path={module.path}
                            onPress={(path) => navigation.navigate(path)}
                        />
                    ))}
                </View>
                <View
                    style={{
                        paddingHorizontal: '6%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    {pages.map((page, index) => (
                        <SmallCard
                            key={index}
                            title={page.title}
                            icon={page.icon}
                            path={page.path}
                            height={160}
                            width={'47%'}
                            onPress={() => {}}
                        />
                    ))}
                </View>
            </PageContainer>
            <ActionButtons conciergerie={true} />
        </View>
    );
}
