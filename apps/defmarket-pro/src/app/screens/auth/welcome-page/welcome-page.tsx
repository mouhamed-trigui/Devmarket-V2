import React, { useState, useRef } from 'react';
import styled from 'styled-components/native';
// Components
import { Atomes, Molecules } from '../../../components';
import { View } from 'native-base';

import Swiper from 'react-native-swiper';

import { useIntl } from 'react-intl';

import { Image } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

/* eslint-disable-next-line */
export interface WelcomePageProps {
    navigation: any | undefined;
}

const StyledWelcomePage = styled.View`
    background-color: white;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledContent = styled.View`
    align-items: center;
    height: 55%;
`;

export function WelcomePage(props: WelcomePageProps) {
    const refSwiper = useRef(null);
    const { formatMessage } = useIntl();
    const [index, setIndex] = useState(0);
    // state result of webBrowser
    const [result, setResult] = React.useState<any>(null);
    const welcomePage = [
        {
            title: () =>
                formatMessage({
                    id: 'WCMPT1',
                    description: 'Bienvenue ',
                    defaultMessage: 'Bienvenue',
                }),
            pathImage: require('../../../../assets/images/illustration/ILLUSTRATION_8_commercant.png'),
            description: () =>
                formatMessage({
                    id: 'WCMPD1',
                    description:
                        'Cher professionnel, engage toi aux\ncôtés des soignants, des militaires, des\npompiers… en mettant en avant ton\nactivité sur notre plateforme d’offres et\nd’économie locale.',
                    defaultMessage:
                        'Cher professionnel, engage toi aux\ncôtés des soignants, des militaires, des\npompiers… en mettant en avant ton\nactivité sur notre plateforme d’offres et\nd’économie locale.',
                }),
            descriptionValue:
                'Cher professionnel, engage toi aux\ncôtés des soignants, des militaires, des\npompiers… en mettant en avant ton\nactivité sur notre plateforme d’offres et\nd’économie locale.',
            button: null,
        },
        {
            title: () =>
                formatMessage({
                    id: 'WCMPT2',
                    description: 'De nombreux avantages ',
                    defaultMessage: 'De nombreux avantages',
                }),
            pathImage: require('../../../../assets/images/illustration/ILLUSTRATION_1tel.png'),
            description: () =>
                formatMessage({
                    id: 'WCMPD2',
                    description:
                        'Inscription 100 % gratuite\n \nRapide, Simple et Sécurisé\n \nDécouvre tes potentiels clients',
                    defaultMessage:
                        'Inscription 100 % gratuite\n \nRapide, simple et sécurisé\n \nDécouvre tes potentiels clients',
                }),
            descriptionValue:
                'Inscription 100 % gratuite\n \nRapide, Simple et Sécurisé\n \nDécouvre tes potentiels clients',
            button: null,
        },
        {
            title: () =>
                formatMessage({
                    id: 'WCMPT3',
                    description: 'Favorisons le commerce\nlocal ',
                    defaultMessage: 'Favorisons le commerce local',
                }),
            pathImage: require('../../../../assets/images/illustration/ILLUSTRATION_2mag.png'),
            description: () =>
                formatMessage({
                    id: 'WCMPD3',
                    description:
                        'Gestion de ton activité en autonomie\n \nFidélisation de clients locaux et engagés\n \nVente directe, aucune\ncommission ou frais cachés',
                    defaultMessage:
                        'Gestion de ton activité en autonomie\n \nFidélisation de clients locaux et engagés\n \nVente directe, aucune\ncommission ou frais cachés',
                }),
            descriptionValue:
                'Gestion de ton activité en autonomie\n \nFidélisation de clients locaux et engagés\n \nVente direct, aucune\ncommission ou frais cachés',
            button: null,
        },
        {
            title: () =>
                formatMessage({
                    id: 'WCMPT4',
                    description: 'Ils s’engagent pour toi ! ',
                    defaultMessage: 'Ils s’engagent pour toi !',
                }),
            pathImage: require('../../../../assets/images/illustration/ILLUSTRATION_3-v2_ils-sengagent.png'),
            description: () =>
                formatMessage({
                    id: 'WCMPD4',
                    description:
                        'La communauté souscrit à une adhésion\npour garantir la gratuité de l’app et ﬁnancer\ndes projets solidaires.',
                    defaultMessage:
                        'La communauté souscrit à une adhésion\npour garantir la gratuité de l’app et ﬁnancer\ndes projets solidaires.',
                }),
            descriptionValue:
                'Cher professionnel, engagez-vous aux\ncôtés des soignants, des militaires, des\npompiers… en mettant en avant votre\nactivité sur notre plateforme d’offres et\nd’économie locale.',
            button: 'En savoir plus',
            link: 'https://operationhyperion.com',
        },
    ];
    const scroll = (num: number) => {
        if (refSwiper?.current && num > 0) {
            refSwiper.current?.scrollBy(1);
        }
    };

    const openBrowser = async (link: string) => {
        const result = await WebBrowser.openBrowserAsync(link);
        setResult(result);
    };

    return (
        <StyledWelcomePage>
            <Swiper
                ref={refSwiper}
                paginationStyle={{ marginBottom: 5 }}
                onIndexChanged={(num) => setIndex(num)}
                loop={false}
                activeDotColor={'#00AAC7'}
            >
                {welcomePage?.map((page, key: number) => (
                    <View key={key + 1}>
                        <Image
                            accessibilityLabel={'page- ' + key}
                            source={page.pathImage}
                            style={{
                                width: '75%',
                                height: '45%',
                                alignSelf: 'center',
                                marginTop: 50,
                            }}
                            resizeMode="contain"
                        />

                        <StyledContent>
                            <Atomes.Text
                                fontFamily="mono"
                                fontSize="dm-h1"
                                textAlign="center"
                                color="system.50"
                            >
                                {page.title()}
                            </Atomes.Text>
                            <Atomes.Text
                                fontFamily="body"
                                fontSize="dm-2p"
                                textAlign="center"
                                color="system.50"
                                moreParams={{ p: 5 }}
                            >
                                {page.description()}
                            </Atomes.Text>
                            {/* {key === 1 && (
                                <Image
                                    source={arrowIcon}
                                    width={39}
                                    height={42}
                                    style={{ marginTop: -2, marginBottom: 2 }}
                                />
                            )} */}
                            {page?.button && (
                                <Atomes.Button
                                    label={page.button}
                                    backgroundColor={'primary.50'}
                                    onPress={() => openBrowser(page?.link)}
                                />
                            )}
                        </StyledContent>
                    </View>
                ))}
            </Swiper>
            <Molecules.Separate
                index={index}
                setIndex={scroll}
                navigation={props.navigation}
            />
        </StyledWelcomePage>
    );
}

export default WelcomePage;
