import React, { useEffect, useState } from 'react';
import { Button, LogoDefmarket, Text } from '../../../components/atomes';
import { Spinner, View } from 'native-base';
import { useIntl } from 'react-intl';
import { useNavigation } from '@react-navigation/native';
import { changeEmailValidation } from '../../../services/methodes/profile';

const ChangeEmail = (props: any) => {
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>();
    const [retry, setRetry] = useState(0);
    const message = {
        0: "Échec de modifier l'e-mail\nveuillez réessayer",
        1: 'Votre email à ete modifie avec succès',
    };
    const { formatMessage } = useIntl();
    const navigation = useNavigation();

    useEffect(() => {
        if (props.data?.queryParams?.token !== undefined)
            changeEmailValidation(props.data?.queryParams?.token)
                .then(() => {
                    setIsFetching(false);
                    setSuccess(true);
                })
                .catch(() => {
                    setIsFetching(false);
                    setSuccess(false);
                });
    }, [props.data?.queryParams?.token, retry]);
    return (
        <View
            style={{
                alignItems: 'center',
                justifyContent: 'space-around',
                flexGrow: 1,
            }}
        >
            <LogoDefmarket
                fontSize={'4xl'}
                title={formatMessage({
                    id: 'Ver1ks',
                    description: 'VÉRIFICATION',
                    defaultMessage: 'VÉRIFICATION',
                })}
            />

            {isFetching ? (
                <>
                    <Spinner size="lg" color="white" />
                    <Text fontSize="dm-h1">Validation En cours</Text>
                </>
            ) : (
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
                            onPress={() => setRetry(retry + 1)}
                        />
                    ) : (
                        <Button
                            label={formatMessage({
                                id: 'VerLkr',
                                description: 'Retour',
                                defaultMessage: 'Retour',
                            })}
                            onPress={() => navigation.goBack()}
                        />
                    )}
                </View>
            )}
        </View>
    );
};

export default ChangeEmail;
