import { Platform } from 'expo-modules-core';
import { Box, Center, HStack, ScrollView } from 'native-base';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Card from '../../../components/atomes/card/Card';
import PageContainer from '../../../components/atomes/container/PageContainer';
import Text from '../../../components/atomes/text/text';

const SmallPubCard = (props: {
    backgroundColor: string;
    title: string;
    text: string;
}) => (
    <Card backgroundColor={props.backgroundColor} style={{ flexGrow: 1 }}>
        <TouchableOpacity>
            <Text
                style={{
                    marginTop: -20,
                    marginBottom: 40,
                }}
                textAlign="right"
                fontSize="dm-h1"
            >
                ...
            </Text>
        </TouchableOpacity>
        <Text color="white" fontSize="dm-h1" textAlign="left">
            {props.title}
        </Text>
        <Text textAlign="left">{props.text}</Text>
    </Card>
);

const BigAnnonceCard = (props: {
    backgroundColor?: string;
    title: string;
    text: string;
    textColor?: string;
}) => (
    <Card
        width="90%"
        backgroundColor={props.backgroundColor}
        style={{ marginLeft: 20, marginTop: 20 }}
    >
        <Text
            style={{ marginTop: 50 }}
            color={props.textColor}
            fontSize="dm-h1"
            textAlign="left"
        >
            {props.title}
        </Text>
        <Text color={props.textColor} textAlign="left">
            {props.text}
        </Text>
    </Card>
);

const Annonces = () => {
    const { user } = useSelector((state: any) => state.user);
    return (
        <PageContainer backgroundColor="white">
            <Card
                style={{ alignSelf: 'center' }}
                width="90%"
                action={{ text: 'GO !', backgroundColor: '#eaae00' }}
            >
                <Text
                    // bold
                    fontSize="dm-h2"
                    textAlign="left"
                    fontFamily="mono"
                    color="#003753"
                >
                    Salut John
                </Text>
                <HStack space={2} marginTop="2">
                    <Text
                        textAlign="left"
                        style={{ flexShrink: 1 }}
                        color="#003753"
                    >
                        <FormattedMessage
                            id="AnCPg1"
                            defaultMessage="Pour profiter pleinement de votre compte, Faites {br} vérifier votre profil, configurez votre boutique et {br} ajoutez des offres !"
                            values={{
                                br: '\n',
                            }}
                        />
                    </Text>
                    <Box
                        alignSelf="center"
                        justifyContent="center"
                        backgroundColor="#003753"
                        borderRadius={50}
                        minWidth={50}
                        height={50}
                    >
                        <Center>
                            <Text color="white" bold>
                                {user?.completeRegistrationPercentage}
                            </Text>
                        </Center>
                    </Box>
                </HStack>
            </Card>
            <Text
                style={{ marginTop: 20, marginLeft: '5%' }}
                textAlign="left"
                fontSize="dm-h2"
                fontFamily="mono"
                color="#003753"
            >
                <FormattedMessage
                    id="AnCPg2"
                    defaultMessage="Les annonces éphémères"
                />
            </Text>
            <ScrollView
                horizontal
                marginTop="6"
                width="90%"
                alignSelf="center"
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <HStack space={5}>
                    <SmallPubCard
                        key="pub1"
                        backgroundColor="#00AAC7"
                        title="Annonce 1"
                        text="Exclusifs"
                    />
                    <SmallPubCard
                        key="pub2"
                        backgroundColor="#FF8A00"
                        title="Annonce 2"
                        text="Présentation"
                    />
                    <SmallPubCard
                        key="pub3"
                        backgroundColor="#003753"
                        title="Annonce 3"
                        text="Exclusifs"
                    />
                </HStack>
            </ScrollView>
            <Text
                style={{ marginTop: 20, marginLeft: '5%' }}
                textAlign="left"
                fontSize="dm-h2"
                fontFamily="mono"
                color="#003753"
            >
                <FormattedMessage
                    id="AnCPg3"
                    defaultMessage="Les annonces perpétuelles"
                />
            </Text>
            <BigAnnonceCard
                key="an1"
                backgroundColor="#EAAE00"
                title="Annonce 1"
                text="Test"
            />
            <BigAnnonceCard
                key="a2"
                backgroundColor="#003753"
                title="Annonce 2"
                text="Parrainez un commerçant"
            />
            <BigAnnonceCard
                key="an3"
                title="Annonce 3"
                text="Autres"
                textColor="#003753"
            />
            {(Platform.OS === 'android' || Platform.OS === 'ios') && (
                <Box marginBottom={10} />
            )}
        </PageContainer>
    );
};

export default Annonces;
