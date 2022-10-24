import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import ActionButtons from '../../../../components/atomes/button/action-button/ActionButtons';
import TicketCard from '../../../../components/atomes/card/ticket-card/ticket-card';
import PageContainer from '../../../../components/atomes/container/PageContainer';
import Announcement from '../../../../components/organisms/announcement-box/Announcement';
import {
    CategoryFilter,
    LocationFilter,
} from '../../../../components/organisms/filter';
import { ThemeContext } from '../../../../context/ThemeContext';
import { GET_TICKET } from '../../../../services/constants';
import axiosInstance from '../../../../services/constants/api';
import {
    CarteCadeau,
    Cinema,
    Famille,
    ParcDattractions,
    Vacances,
} from '../../../../theme/svgs';

/* eslint-disable-next-line */
export interface TicketProps {
    navigation: any;
}

export default function Ticket(props: TicketProps) {
    const { theme } = useContext(ThemeContext);
    const [TicketData, setTicketData] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            axiosInstance.get(GET_TICKET).then(({ data }) => {
                setTicketData(data.data);
            });
        }
    }, [isFocused]);

    return (
        <View>
            <PageContainer
                backgroundColor={theme.colors.info[700]}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <Announcement />
                <LocationFilter />
                <CategoryFilter
                    categories={[
                        {
                            title: 'Parcs',
                            icon: (
                                <ParcDattractions
                                    fill={theme.colors.info[50]}
                                />
                            ),
                        },
                        {
                            title: 'Vacances',
                            icon: <Vacances fill={theme.colors.info[50]} />,
                        },
                        {
                            title: 'Famille & Loisirs',
                            icon: <Famille fill={theme.colors.info[50]} />,
                        },
                        {
                            title: 'Cinéma',
                            icon: <Cinema fill={theme.colors.info[50]} />,
                        },
                        {
                            title: 'Carte Cadeau',
                            icon: <CarteCadeau fill={theme.colors.info[50]} />,
                        },
                    ]}
                />

                <View style={{ paddingHorizontal: '6%' }}>
                    <FlatList
                        data={TicketData}
                        onScroll={() => console.log('Load More ...')}
                        renderItem={({ item, index }) => (
                            <TicketCard
                                key={index}
                                {...item}
                                onPress={() => {
                                    props.navigation.navigate('TicketDetails', {
                                        ticket: item,
                                        paramKey: item.title,
                                    });
                                }}
                            />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                        style={{ marginTop: 10 }}
                    />
                </View>
            </PageContainer>
            <ActionButtons conciergerie={true} itineraire={false} />
        </View>
    );
}
