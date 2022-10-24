import { Box, Spinner } from 'native-base';
import React, { useState, useEffect } from 'react';
import { Image, View } from 'react-native';
import { Text } from '../../../components/atomes';
import { activationEmail } from '../../../services/methodes/auth';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigation } from '@react-navigation/core';

import echec from '../../../../assets/images/png/echec-icon.png';
import valid from '../../../../assets/images/svg/sucess-icon.svg';

// Components
import { Atomes } from '../../../components';
import { SvgXml } from 'react-native-svg';
const ActivationMail = (props: any) => {
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [success, setSuccess] = useState<boolean | null>(null);
    const message = {
        0: "Echec de vérification de\n l'e-mail, essaie encore",
        1: 'Ton email a été validé avec succès !',
    };
    const { formatMessage } = useIntl();
    const navigation = useNavigation();
    useEffect(() => {
        if (props.data?.queryParams?.token !== undefined)
            activationEmail(props.data?.queryParams?.token)
                .then(() => {
                    setSuccess(true);
                    setIsFetching(false);
                })
                .catch(() => {
                    setSuccess(false);
                    setIsFetching(false);
                });
    }, [props.data?.queryParams?.token]);
    return (
        <View
            style={{
                marginVertical: 20,
                alignItems: 'center',
                justifyContent: 'space-between',
                flexGrow: 1,
            }}
        >
            <Box marginTop={20}>
                <Atomes.LogoDefmarket
                    fontSize={'4xl'}
                    title={formatMessage({
                        id: 'Ver1ks',
                        description: 'VÉRIFICATION',
                        defaultMessage: 'VÉRIFICATION',
                    })}
                />
            </Box>

            {isFetching ? (
                <>
                    <Spinner size="lg" color="white" />
                    <Text fontSize="dm-h1">
                        <FormattedMessage
                            id="ACTiV1"
                            defaultMessage="Validation En cours"
                        />
                    </Text>
                </>
            ) : (
                <>
                    {success ? (
                        <SvgXml
                            xml={valid}
                            style={{ width: 100, height: 100 }}
                        />
                    ) : (
                        <Image
                            accessibilityLabel="echec-activation-mail"
                            source={echec}
                            style={{ width: 80, height: 80 }}
                        />
                    )}
                    <View style={{ width: '80%' }}>
                        <Text
                            fontSize="dm-h2"
                            textAlign="center"
                            style={{ marginBottom: 15 }}
                        >
                            {message[success ? 1 : 0]}
                        </Text>

                        {!success ? (
                            <Atomes.Button
                                label={formatMessage({
                                    id: 'VerNks',
                                    description: 'Je réessaie',
                                    defaultMessage: 'Je réessaie',
                                })}
                                onPress={() => {
                                    activationEmail(
                                        props.data?.queryParams?.token
                                    )
                                        .then(() => {
                                            setSuccess(true);
                                            setIsFetching(false);
                                        })
                                        .catch(() => {
                                            setSuccess(false);
                                            setIsFetching(false);
                                        });
                                }}
                            />
                        ) : (
                            <Atomes.Button
                                label={formatMessage({
                                    id: 'VerLks',
                                    description: 'Je me connecte',
                                    defaultMessage: 'Je me connecte',
                                })}
                                onPress={() => navigation.navigate('Login')}
                            />
                        )}
                    </View>
                </>
            )}
        </View>
    );
};

export default ActivationMail;
