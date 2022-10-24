import React from 'react';
import { Button, Text } from '../../../components/atomes';
import PageContainer from '../../../components/atomes/container/PageContainer';

import { Center, HStack, VStack } from 'native-base';
import { system } from '../../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, Image, Platform, TouchableOpacity } from 'react-native';

//PNG
import close from '../../../../assets/images/png/close.png';
import filter from '../../../../assets/images/png/filter.png';
//SVG
import closeSVG from '../../../../assets/images/svg/close.svg';
import filterSVG from '../../../../assets/images/svg/filter.svg';

import communicationImage from '../../../../assets/images/png/communication.png';
import { FormattedMessage } from 'react-intl';
import { SvgXml } from 'react-native-svg';

import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../stores/slices';
import { communication } from '../../../services/methodes/notifications';

/* eslint-disable-next-line */
export interface CommunicationProps {
    InMainNavigation?: boolean;
}

export function Communication(props: CommunicationProps) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { user } = useSelector((state: any) => state.user);

    const handleClick = async (status: boolean) => {
        // endpoint call
        communication(status).then(() => {
            // redux - enable communication (services)
            dispatch(userActions.setCommunication(status));
        });
        if (props?.InMainNavigation) {
            if (
                user?.completeRegistration?.identityValidated === true &&
                user?.completeRegistration?.companyCompleted === true &&
                user?.completeRegistration?.storeValidated === true
            ) {
                if (user?.pushNotificationActive) {
                    navigation.navigate('Home');
                } else {
                    navigation.navigate('pushNotificationMain');
                }
            } else {
                navigation.navigate('Identity');
            }
        } else {
            navigation.goBack();
        }
    };
    return (
        <PageContainer>
            <VStack marginX={5} marginTop={10} /*space={8}*/>
                <HStack justifyContent="space-between">
                    {/* <HStack space={3}>
                        {Platform.OS === 'web' ? (
                            <Image
                                source={filter}
                                style={{ width: 25, height: 25 }}
                            />
                        ) : (
                            <SvgXml
                                xml={filterSVG}
                                style={{ width: 25, height: 25 }}
                            />
                        )}

                        <Text
                            fontSize="dm-h2"
                            fontFamily="mono"
                            color={system[50]}
                        >
                            <FormattedMessage
                                id="COMMT1"
                                defaultMessage="Communication"
                            />
                        </Text>
                    </HStack> */}

                    {!props?.InMainNavigation ? (
                        <TouchableOpacity
                            style={{ width: 25, height: 30 }}
                            onPress={() => navigation.goBack()}
                        >
                            {Platform.OS === 'web' ? (
                                <Image
                                    accessibilityLabel="close"
                                    source={close}
                                    style={{ width: 25, height: 25 }}
                                />
                            ) : (
                                <SvgXml
                                    fill={system[50]}
                                    xml={closeSVG}
                                    style={{ width: 20, height: 20 }}
                                />
                            )}
                        </TouchableOpacity>
                    ) : null}
                </HStack>
                <Image
                    accessibilityLabel="communication-Image"
                    source={communicationImage}
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
                            id="COMMT1"
                            defaultMessage="Communication"
                        />
                    </Text>
                </Center>
                <Center>
                    <Text
                        fontSize="dm-2p"
                        fontFamily="body"
                        color={system[50]}
                        textAlign="center"
                        moreParams={{ marginTop: 5 }}
                    >
                        <FormattedMessage
                            id="COMMP1"
                            defaultMessage="J'accepte qu'Hélios Stratégie utilise {br} mon adresse mail pour m'adresser {br} des communication sur les produits{br} et services offerts par Hélios Stratégie {br} et ses partenaires"
                            values={{
                                br: '\n',
                            }}
                        />
                    </Text>
                </Center>
                <Center marginTop={5}>
                    <Button
                        alignSelf="center"
                        label="J'accepte"
                        backgroundColor={'primary.50'}
                        style={{ marginTop: 40 }}
                        width={
                            Platform?.OS === 'web'
                                ? '300'
                                : Dimensions.get('window').width - 150
                        }
                        onPress={() => handleClick(true)}
                    />
                    <Button
                        alignSelf="center"
                        label="Je refuse"
                        backgroundColor={'white'}
                        textColor={'primary.50'}
                        style={{ marginTop: 20 }}
                        width={
                            Platform?.OS === 'web'
                                ? '300'
                                : Dimensions.get('window').width - 150
                        }
                        onPress={() => handleClick(false)}
                    />
                </Center>
            </VStack>
        </PageContainer>
    );
}

export default Communication;
