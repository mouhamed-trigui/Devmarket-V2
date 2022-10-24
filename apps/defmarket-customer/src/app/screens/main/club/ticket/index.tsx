import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useContext } from 'react';
import HeaderRight from '../../../../components/molecules/header/header-right/HeaderRight';
import HeaderTitle from '../../../../components/molecules/header/header-title/HeaderTitle';
import { ThemeContext } from '../../../../context/ThemeContext';
import { Coeur, Notifications, Options } from '../../../../theme/svgs';
import Ticket from './Ticket';
import TiketDetails from './TiketDetails';

export default function TicketScreenNavigator(props: any) {
    const Stack = createNativeStackNavigator();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [favorite, setFavorite] = useState(false);
    const toggleFavorite = () => {
        setFavorite(!favorite);
    };
    return (
        <Stack.Navigator
            initialRouteName="Ticket"
            screenOptions={({ navigation, route }) => ({
                headerShadowVisible: true,
                headerShown: true,
            })}
        >
            <Stack.Screen
                name="Ticket"
                options={{
                    title: 'Billetterie',
                    headerTitle: () => (
                        <HeaderTitle
                            title="Billetterie"
                            color={theme.colors.info[50]}
                        />
                    ),
                    headerRight: () => (
                        <HeaderRight
                            onPress={() => {
                                props.navigation.navigate('ActivitySection');
                            }}
                            icon={
                                <Notifications fill={theme.colors.info[50]} />
                            }
                        />
                    ),
                }}
            >
                {(props) => <Ticket {...props} />}
            </Stack.Screen>
            <Stack.Screen
                name="TicketDetails"
                options={({ navigation, route }) => ({
                    headerStyle: {
                        backgroundColor: theme.colors.info[700],
                    },
                    headerTitle: () => (
                        <HeaderTitle
                            title={route.params?.paramKey}
                            color={theme.colors.info[50]}
                        />
                    ),

                    headerRight: () => (
                        <HeaderRight
                            icon={
                                favorite ? (
                                    <Coeur fill={theme.colors.info[400]}>
                                        :
                                    </Coeur>
                                ) : (
                                    <Coeur fill={theme.colors.info[50]} />
                                )
                            }
                            icon2={<Options fill={theme.colors.info[50]} />}
                            onPress={() => {
                                toggleFavorite();
                            }}
                            items={[
                                {
                                    title: "M'y rendre",
                                    onPressItem: () => {
                                        alert('Test');
                                    },
                                },
                                {
                                    title: 'Réclamation',
                                    onPressItem: () => {
                                        alert('Test');
                                    },
                                },
                            ]}
                        />
                    ),
                })}
            >
                {(props) => <TiketDetails {...props} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
