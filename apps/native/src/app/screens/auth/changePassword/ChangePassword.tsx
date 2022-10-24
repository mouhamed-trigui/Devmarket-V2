import { Alert, View } from 'react-native';
import React from 'react';
import { Button, Text, LogoDefmarket } from '../../../components/atomes';
import { Center, KeyboardAvoidingView, VStack } from 'native-base';
import FormRegistration from '../../../components/organisms/form-registration/form-registration';
import { FormattedMessage, useIntl } from 'react-intl';
import { errorProps } from '../../../services';
// Validator
import { passwordValidator } from '../../../utils/validator';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { changePassword } from '../../../services/methodes/auth';

const ChangePassword = (props: any) => {
    const { formatMessage } = useIntl();

    const navigation = useNavigation();
    const route = useRoute<RouteProp<{ ChangePassword: { token: string } }>>();

    const [error, setError] = React.useState<errorProps | undefined | null>(
        null
    );

    // local state password and confirmPassword
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const [loading, setLoading] = React.useState(false);

    // method de set new password
    const UPDATE = () => {
        setLoading(true);
        if (route?.params?.token) {
            changePassword(password, route?.params?.token)
                .then((res: any) => {
                    setLoading(false);
                    navigation.navigate('ConfirmationChangePassword', {
                        result: true,
                    });
                })
                .catch((err) => {
                    setLoading(false);
                    navigation.navigate('ConfirmationChangePassword', {
                        result: false,
                    });
                });
        } else {
            setLoading(false);
            Alert.alert(
                'Problème Technique',
                "Jeton d'authentification manquant"
            );
        }
    };

    return (
        <KeyboardAvoidingView
            h={{
                base: 'auto',
                lg: 'auto',
            }}
            behavior="position"
        >
            <View>
                <VStack space={10}>
                    <LogoDefmarket
                        fontFamily="mono"
                        fontSize={'dm-h1'}
                        title={formatMessage({
                            id: 'VbQ3ks',
                            description: 'MOT DE PASSE',
                            defaultMessage: 'MOT DE PASSE',
                        })}
                    />
                    <Center>
                        <Text
                            fontFamily="body"
                            fontSize="dm-2p"
                            textAlign="center"
                            color={'system.200'}
                            moreParams={{ p: 2 }}
                        >
                            <FormattedMessage
                                id="CHpSwd"
                                defaultMessage="Ta sécurité est notre priorité,{br} renseigne un nouveau mot de passe"
                                values={{
                                    br: '\n',
                                }}
                            />
                        </Text>
                    </Center>

                    <FormRegistration
                        FormControl1={{
                            label: '',
                            placeholder: formatMessage({
                                id: 'VbQ3ks',
                                description: 'Mot de passe',
                                defaultMessage: 'Mot de passe',
                            }),
                            value: password,
                            type: 'password',
                            error:
                                (confirmPassword !== password &&
                                    passwordValidator(confirmPassword)) ||
                                error?.message,
                            errorMessage: null,
                            helperText: null,
                            onChange: (value: any) => setPassword(value),
                        }}
                        FormControl2={{
                            label: '',
                            placeholder: formatMessage({
                                id: 'VbQ4ks',
                                description: 'Confirmer le mot de passe',
                                defaultMessage: 'Confirmer le mot de passe',
                            }),
                            value: confirmPassword,
                            type: 'password',
                            error:
                                password?.length === 0 &&
                                confirmPassword?.length === 0
                                    ? ''
                                    : (confirmPassword !== password &&
                                          passwordValidator(password)) ||
                                      error?.message
                                    ? true
                                    : false,
                            errorMessage:
                                confirmPassword?.length > 0
                                    ? confirmPassword !== password
                                        ? formatMessage({
                                              id: 'VbQ5ks',
                                              description:
                                                  "Le mot de passe n'est pas identique",
                                              defaultMessage:
                                                  "Le mot de passe n'est pas identique",
                                          })
                                        : error?.message
                                        ? error?.message
                                        : formatMessage({
                                              id: 'VbQ5kP',
                                              description:
                                                  'Le mot de passe ne répond pas aux exigences \nminimales.',
                                              defaultMessage:
                                                  'Le mot de passe ne répond pas aux exigences \nminimales.',
                                          })
                                    : confirmPassword !== password &&
                                      passwordValidator(password)
                                    ? formatMessage({
                                          id: 'VbQ6ks',
                                          description:
                                              'Confirme ton mot de passe ici',
                                          defaultMessage:
                                              'Confirme ton mot de passe ici',
                                      })
                                    : null,
                            helperText: null,
                            onChange: (value: any) => setConfirmPassword(value),
                        }}
                    />

                    <Button
                        alignSelf="center"
                        label="Je confirme"
                        spinner={loading}
                        moreParams={{
                            disabled:
                                loading ||
                                error?.message ||
                                confirmPassword !== password ||
                                !passwordValidator(confirmPassword),
                        }}
                        onPress={UPDATE}
                        style={{ marginTop: 5 }}
                    />
                </VStack>
            </View>
        </KeyboardAvoidingView>
    );
};

export default ChangePassword;
