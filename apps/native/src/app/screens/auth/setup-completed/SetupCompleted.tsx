import React from 'react';

// PNG
import close from '../../../../assets/images/png/close.png';

// SVG
import CloseSVG from '../../../../assets/images/svg/close.svg';

// Illustration
import notification from '../../../../assets/images/illustration/ILLUSTRATION_6_configuration.png';
import PageContainer from '../../../components/atomes/container/PageContainer';
import { Center, VStack } from 'native-base';
import { Dimensions, Image, Platform, TouchableOpacity } from 'react-native';
import { system } from '../../../theme/colors';
import { Button, Text } from '../../../components/atomes';
import { useNavigation } from '@react-navigation/native';
import { FormattedMessage } from 'react-intl';

const SetupCompleted = () => {
    const navigation = useNavigation();
    return (
        <PageContainer>
            <VStack marginX={5} marginTop={5} space={8}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    {Platform.OS === 'web' ? (
                        <Image
                            source={close}
                            style={{
                                width: 25,
                                height: 25,
                                alignSelf: 'flex-end',
                            }}
                        />
                    ) : (
                        <CloseSVG
                            fill={system[50]}
                            style={{
                                width: 20,
                                height: 20,
                                alignSelf: 'flex-end',
                            }}
                        />
                    )}
                </TouchableOpacity>

                <Image
                    source={notification}
                    style={{
                        width: 250,
                        height: 250,
                        alignSelf: 'center',
                        marginTop: 50,
                    }}
                    resizeMode="contain"
                />
                <Center>
                    <Text fontSize="dm-h1" fontFamily="mono" color={system[50]}>
                        <FormattedMessage
                            id="COMPL2"
                            defaultMessage="Tu as réussi !"
                        />
                    </Text>
                </Center>
                <Center>
                    <Text
                        fontSize="dm-2p"
                        fontFamily="body"
                        color={system[50]}
                        textAlign="center"
                    >
                        <FormattedMessage
                            id="COMPL1"
                            defaultMessage="Ton compte a été vérifié et validé. {br} Profite de tous nos services !"
                            values={{
                                br: '\n',
                            }}
                        />
                    </Text>
                </Center>
                <Button
                    alignSelf="center"
                    label="C'est Parti !"
                    backgroundColor={'primary.50'}
                    style={{ marginTop: 40 }}
                    width={
                        Platform?.OS === 'web'
                            ? '300'
                            : Dimensions.get('window').width - 150
                    }
                    onPress={() => navigation.navigate('Home')}
                />
            </VStack>
        </PageContainer>
    );
};

export default SetupCompleted;
