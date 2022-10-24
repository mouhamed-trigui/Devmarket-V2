import { Image, View } from 'react-native';
import { Spinner } from 'native-base';
import React from 'react';
import { Button, LogoDefmarket, Text } from '../../../components/atomes';
import { FormattedMessage, useIntl } from 'react-intl';
//navigation
import { useNavigation } from '@react-navigation/native';

import { SvgXml } from 'react-native-svg';

import valid from '../../../../assets/images/svg/sucess-icon.svg';
import echec from '../../../../assets/images/png/echec-icon.png';

const ConfirmationChangePassword = (props: any) => {
    const [success, setSuccess] = React.useState<boolean | null>(null);

    const [isFetching, setIsFetching] = React.useState<boolean>(true);

    const [loading, setLoading] = React.useState(false);

    const message = {
        0: 'Échec lors de la réinitialisé du mot de passe ',
        1: 'Votre mot de passe a été réinitialisé avec succès ',
    };

    // function translate
    const { formatMessage } = useIntl();

    // navigation
    const navigation = useNavigation();

    // setting passed in the navigation to get result success (true) or fail (false)
    const { result } = props?.route?.params;

    // set success from navigation setting
    React.useEffect(() => {
        setLoading(false);
        if (result === true) {
            setSuccess(true);
        } else {
            setSuccess(false);
        }
        setIsFetching(false);
    }, [result]);

    return (
        <View
            style={{
                alignItems: 'center',
                justifyContent: 'space-around',
                flexGrow: 1,
            }}
        >
            <LogoDefmarket
                fontFamily="mono"
                fontSize={'dm-h1'}
                title={formatMessage({
                    id: 'Vpw1ks',
                    description: 'CHANGER MOT DE PASSE',
                    defaultMessage: 'CHANGER MOT DE PASSE',
                })}
            />

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
                            accessibilityLabel="echec-change-password"
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
                            <Button
                                label={formatMessage({
                                    id: 'VerNks',
                                    description: 'Réessayer',
                                    defaultMessage: 'Réessayer',
                                })}
                                onPress={() => navigation.goBack()}
                            />
                        ) : (
                            <Button
                                label={formatMessage({
                                    id: 'VerLks',
                                    description: 'Me connecter',
                                    defaultMessage: 'Me connecter',
                                })}
                                isDisabled={loading}
                                spinner={loading}
                                onPress={() => {
                                    setLoading(true);
                                    navigation.navigate('Login');
                                }}
                            />
                        )}
                    </View>
                </>
            )}
        </View>
    );
};

export default ConfirmationChangePassword;
