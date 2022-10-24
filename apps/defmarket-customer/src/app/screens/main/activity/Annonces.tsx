import { Platform } from 'expo-modules-core';
import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { BigAnnonceCard, SmallPubCard } from '../../../components/atomes/card';
import PageContainer from '../../../components/atomes/container/PageContainer';
import Text from '../../../components/atomes/text/Text';
import { fonts, fontSizes } from './../../../theme/fonts';
import { ThemeContext } from '../../../context/ThemeContext';
import axiosInstance from '../../../services/constants/api';
import { annoncesProps } from '../../../services/model/annonces';
import { getRandomInt } from '../../../utils/math';
import { useIsFocused } from '@react-navigation/native';
import { GET_ANNOUNCEMENTS } from '../../../services/constants';

const Annonces = () => {
    const isFocused = useIsFocused();

    const { user } = useSelector((state: any) => state.user);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [smallPub, setSmallPub] = useState([]);

    const [bigPub, setBigPub] = useState([]);

    const getAnnouncementCardColor = (
        type?: 'Exclusifs' | 'Présentation',
        index?: number
    ) => {
        switch (type) {
            case 'Exclusifs':
                return {
                    textColor: theme.colors.info[200],
                    backgroundColor: theme.colors.primary[50],
                };
                break;

            case 'Présentation':
                return {
                    textColor: theme.colors.info[200],
                    backgroundColor: theme.colors.secondary[300],
                };
                break;
            default:
                const paletteColor = [
                    {
                        textColor: theme.colors.info[200],
                        backgroundColor: theme.colors.info[50],
                    },
                    {
                        textColor: theme.colors.info[50],
                        backgroundColor: theme.colors.info[200],
                    },
                    {
                        textColor: theme.colors.info[50],
                        backgroundColor: theme.colors.primary[100],
                    },
                ];

                return paletteColor[
                    index > paletteColor.length - 1 ? 0 : index ?? 0
                ];
                break;
        }
    };

    useEffect(() => {
        if (isFocused) {
            axiosInstance
                .get(GET_ANNOUNCEMENTS, { params: { category: 'éphémères' } })
                .then(({ data }) => {
                    setSmallPub(data.data);
                });

            axiosInstance
                .get(GET_ANNOUNCEMENTS, {
                    params: { category: 'perpétuelles' },
                })
                .then(({ data }) => {
                    setBigPub(data.data);
                });
        }
    }, [isFocused]);

    return (
        <PageContainer
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: '5%' }}
        >
            <Text
                moreParams={{ marginTop: 30 }}
                textAlign="left"
                fontSize={fontSizes['dm-h2']}
                fontFamily={fonts.mono}
                color={theme.colors.info[50]}
            >
                Les annonces éphémères
            </Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                    alignSelf: 'center',
                }}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                {smallPub?.map((pub: annoncesProps, index) => (
                    <SmallPubCard
                        key={pub.key}
                        backgroundColor={
                            getAnnouncementCardColor(pub?.type)?.backgroundColor
                        }
                        title={pub.title}
                        text={pub.text}
                    />
                ))}
            </ScrollView>
            <Text
                moreParams={{ marginTop: 10 }}
                textAlign="left"
                fontSize={fontSizes['dm-h2']}
                fontFamily={fonts.mono}
                color="#003753"
            >
                Les annonces perpétuelles
            </Text>

            {bigPub?.map((pub: annoncesProps, index) => {
                try {
                    const bg = getAnnouncementCardColor(undefined, index)
                        .backgroundColor;
                    const tc = getAnnouncementCardColor(undefined, index)
                        .textColor;
                    return (
                        <BigAnnonceCard
                            key={pub.key}
                            backgroundColor={bg}
                            textColor={tc}
                            title={pub.title}
                            text={pub.text}
                        />
                    );
                } catch (error) {
                    return null;
                }
            })}

            {(Platform.OS === 'android' || Platform.OS === 'ios') && (
                <View style={{ marginBottom: 100 }} />
            )}
        </PageContainer>
    );
};

export default Annonces;
