import React, { useState } from 'react';
import {
    Box,
    CircleIcon,
    HStack,
    KeyboardAvoidingView,
    List,
    VStack,
} from 'native-base';
import { Button, Text } from '../../../components/atomes';
import { FormControl } from '../../../components/molecules';
import { Alert, Dimensions } from 'react-native';
import { FormattedMessage } from 'react-intl';
import { updatePassword } from '../../../services/methodes/profile';
import { useNavigation } from '@react-navigation/native';
import { getStatusColor, passwordValidator } from '../../../utils/validator';

const EditPassword = () => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);

    const [isSubmitted, setIssubmitted] = useState(false);

    const [error, setError] = useState<undefined | null>(null);

    const [passwordForm, setPasswordForm] = useState<{
        oldPassword: string;
        newPassword: string;
        confirmPassword: string;
    }>({ oldPassword: '', newPassword: '', confirmPassword: '' });

    const handleSubmit = () => {
        setIssubmitted(true);
        if (!passwordForm.oldPassword || !passwordForm.newPassword) {
            return;
        }
        if (
            passwordValidator(passwordForm.newPassword) &&
            passwordForm.newPassword !== passwordForm.oldPassword &&
            passwordForm.newPassword === passwordForm?.confirmPassword
        ) {
            setLoading(true);
            updatePassword(passwordForm)
                .then(() => {
                    setIssubmitted(false);
                    Alert.alert(
                        'Mot de passe changé',
                        'Ton mot de passe a été mis à jour avec succès.',
                        [
                            {
                                text: 'OK',
                                onPress: () => {
                                    navigation.goBack();
                                },
                            },
                        ]
                    );
                })
                .catch((err) => {
                    if (err?.response?.status === 500) {
                        setError(
                            'Vérifies que ton ancien mot de passe est correcte.'
                        );
                    } else {
                        setError(err);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };
    return (
        <Box>
            <VStack justifyContent="space-between" height="full">
                <KeyboardAvoidingView
                    h={{
                        base: 'auto',
                        lg: 'auto',
                    }}
                    behavior={'position'}
                >
                    <VStack space={5} marginTop={5}>
                        <Text
                            fontFamily="mono"
                            textAlign="center"
                            fontSize="dm-h1"
                        >
                            <FormattedMessage
                                id="EDitP1"
                                defaultMessage="MODIFIER LE MOT DE PASSE"
                            />
                        </Text>
                        <Text
                            textAlign="center"
                            fontSize={'dm-2p'}
                            style={{ marginHorizontal: 25 }}
                        >
                            <FormattedMessage
                                id="EDitP2"
                                defaultMessage="Saisis ton mot de passe actuel puis \n ton nouveau mot de passe"
                            />
                        </Text>
                        <Box>
                            <FormControl
                                type="password"
                                isRequired
                                placeholder="Ancien mot de passe"
                                helperText={null}
                                value={passwordForm.oldPassword}
                                onChange={(oldPassword: string) =>
                                    setPasswordForm({
                                        ...passwordForm,
                                        oldPassword,
                                    })
                                }
                                error={isSubmitted && error !== null}
                                errorMessage={error}
                            />
                            <FormControl
                                type="password"
                                isRequired
                                placeholder="Nouveau mot de passe"
                                error={
                                    (isSubmitted &&
                                        passwordForm.oldPassword ===
                                            passwordForm.newPassword) ||
                                    (isSubmitted &&
                                        passwordForm.newPassword === '')
                                }
                                errorMessage={
                                    "Le nouveau mot de passe ne doit pas être le même que l'ancien"
                                }
                                helperText={null}
                                value={passwordForm.newPassword}
                                onChange={(newPassword: string) =>
                                    setPasswordForm({
                                        ...passwordForm,
                                        newPassword,
                                    })
                                }
                            />
                            <FormControl
                                type="password"
                                isRequired
                                placeholder="Confirmer le mot de passe"
                                error={
                                    (isSubmitted &&
                                        passwordForm.confirmPassword !==
                                            passwordForm.newPassword &&
                                        passwordForm.confirmPassword.length >
                                            0) ||
                                    (passwordForm.confirmPassword !==
                                        passwordForm.newPassword &&
                                        passwordForm.confirmPassword.length > 0)
                                }
                                errorMessage="Le mot de passe n'est pas identique"
                                helperText={null}
                                value={passwordForm.confirmPassword}
                                onChange={(confirmPassword: string) =>
                                    setPasswordForm({
                                        ...passwordForm,
                                        confirmPassword,
                                    })
                                }
                            />
                        </Box>
                        <Box>
                            <Text
                                fontFamily="body"
                                fontSize="dm-3p"
                                color={'system.200'}
                                textAlign="center"
                                moreParams={{ fontWeight: 800 }}
                            >
                                <FormattedMessage
                                    id="vDvX6s"
                                    defaultMessage="Exigences minimales"
                                />
                            </Text>
                            <Box width={180} alignSelf="center">
                                <List space={1} my={1} borderWidth={0}>
                                    <List.Item p={0}>
                                        <HStack space={1} alignItems="center">
                                            <CircleIcon
                                                size="5"
                                                color={getStatusColor(
                                                    passwordForm.newPassword,
                                                    '8 characters'
                                                )}
                                            />
                                            <Text
                                                fontFamily="body"
                                                fontSize="dm-2p"
                                                color={'system.200'}
                                            >
                                                <FormattedMessage
                                                    id="cW76+7"
                                                    defaultMessage="8 caractères"
                                                />
                                            </Text>
                                        </HStack>
                                    </List.Item>
                                    <List.Item p={0}>
                                        <HStack space={1} alignItems="center">
                                            <CircleIcon
                                                size="5"
                                                color={getStatusColor(
                                                    passwordForm.newPassword,
                                                    'one digit'
                                                )}
                                            />
                                            <Text
                                                fontFamily="body"
                                                fontSize="dm-2p"
                                                color={'system.200'}
                                            >
                                                <FormattedMessage
                                                    id="lgok95"
                                                    defaultMessage="1 chiffre"
                                                />
                                            </Text>
                                        </HStack>
                                    </List.Item>
                                    <List.Item p={0}>
                                        <HStack space={1} alignItems="center">
                                            <CircleIcon
                                                size="5"
                                                color={getStatusColor(
                                                    passwordForm.newPassword,
                                                    'one upper case'
                                                )}
                                            />
                                            <Text
                                                fontFamily="body"
                                                fontSize="dm-2p"
                                                color={'system.200'}
                                            >
                                                <FormattedMessage
                                                    id="E/8TNP"
                                                    defaultMessage="1 majuscule"
                                                />
                                            </Text>
                                        </HStack>
                                    </List.Item>
                                    <List.Item p={0}>
                                        <HStack space={1} alignItems="center">
                                            <CircleIcon
                                                size="5"
                                                color={getStatusColor(
                                                    passwordForm.newPassword,
                                                    'one lower case'
                                                )}
                                            />
                                            <Text
                                                fontFamily="body"
                                                fontSize="dm-2p"
                                                color={'system.200'}
                                            >
                                                <FormattedMessage
                                                    id="t7wYGM"
                                                    defaultMessage="1 minuscule"
                                                />
                                            </Text>
                                        </HStack>
                                    </List.Item>
                                    <List.Item p={0}>
                                        <HStack space={1} alignItems="center">
                                            <CircleIcon
                                                size="5"
                                                color={getStatusColor(
                                                    passwordForm.newPassword,
                                                    'special characters'
                                                )}
                                            />
                                            <Text
                                                fontFamily="body"
                                                fontSize="dm-2p"
                                                color={'system.200'}
                                            >
                                                <FormattedMessage
                                                    id="ONy84v"
                                                    defaultMessage="1 caractère spécial"
                                                />
                                            </Text>
                                        </HStack>
                                    </List.Item>
                                </List>
                            </Box>
                        </Box>
                    </VStack>
                    <Button
                        onPress={handleSubmit}
                        alignSelf="center"
                        style={{ marginBottom: 25, marginTop: 15 }}
                        width={Dimensions.get('window').width - 50}
                        label="Je confirme"
                        spinner={loading}
                        isDisabled={
                            loading ||
                            passwordForm.oldPassword === '' ||
                            passwordForm.newPassword === '' ||
                            passwordForm.confirmPassword === '' ||
                            passwordForm.newPassword !==
                                passwordForm.confirmPassword
                        }
                    />
                </KeyboardAvoidingView>
            </VStack>
        </Box>
    );
};

export default EditPassword;
