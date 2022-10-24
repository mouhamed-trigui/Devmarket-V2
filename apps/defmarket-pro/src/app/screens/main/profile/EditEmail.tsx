import React, { useState } from 'react';
import { Box, KeyboardAvoidingView, VStack } from 'native-base';
import { Button, Text } from '../../../components/atomes';
import { FormControl } from '../../../components/molecules';
import { Dimensions } from 'react-native';
import { updateEmail } from '../../../services/methodes/profile';
import { useNavigation } from '@react-navigation/native';
import { isValidEmail } from '../../../utils/validator';
import Infodialog from '../../../components/molecules/dialog/info-dialog/Infodialog';
import { FormattedMessage } from 'react-intl';

const EditEmail = () => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);

    const [emailForm, setEmailForm] = useState<{
        oldEmail: string;
        newEmail: string;
        confirmEmail: string;
    }>({ oldEmail: '', newEmail: '', confirmEmail: '' });

    // Local states for info dialog
    const [isOpen, setIsOpen] = React.useState(false);
    const [success, setSuccess] = React.useState<boolean | null>(null);
    const title = { 0: 'Mail envoyé', 1: "Echec de l'envoi du mail" };
    const description = {
        0:
            "Un mail de confirmation a été envoyé sur l'adresse " +
            emailForm.oldEmail +
            ', Veuillez le consulter afin de finaliser le changement de votre email',
        1: "Un problème d'envoi de mail est survenu, veuillez réessayer dans quelques instants",
    };

    const handleSubmit = () => {
        setLoading(true);
        updateEmail(emailForm)
            .then(() => {
                setSuccess(true);
                setIsOpen(true);
                setLoading(false);
            })
            .catch((err) => {
                setSuccess(false);
                setIsOpen(true);
                setLoading(false);
                console.error(err);
            });
    };

    return (
        <Box>
            <Infodialog
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                    if (success) navigation.goBack();
                }}
                title={title[success ? 0 : 1]}
                body={description[success ? 0 : 1]}
            />
            <VStack justifyContent="space-between" height="full">
                <KeyboardAvoidingView
                    h={{
                        base: 'auto',
                        lg: 'auto',
                    }}
                    behavior={'position'}
                >
                    <Text
                        fontFamily="mono"
                        textAlign="center"
                        fontSize="dm-h1"
                        style={{ marginVertical: 10 }}
                    >
                        <FormattedMessage
                            id="EDitM1"
                            defaultMessage="MODIFIER L'E-MAIL"
                        />
                    </Text>
                    <Text
                        fontFamily="body"
                        textAlign="center"
                        fontSize={'dm-2p'}
                        style={{ marginHorizontal: 25, marginVertical: 20 }}
                    >
                        <FormattedMessage
                            id="EDitM2"
                            defaultMessage="Saisis ton e-mail actuel puis ton \n nouvel e-mail"
                        />
                    </Text>
                    <Box style={{ marginTop: 20 }}>
                        <FormControl
                            keyboardType="email-address"
                            isRequired
                            type="email"
                            placeholder="Ancien e-mail"
                            helperText={null}
                            value={emailForm.oldEmail}
                            onChange={(oldEmail: string) =>
                                setEmailForm({
                                    ...emailForm,
                                    oldEmail,
                                })
                            }
                        />
                        <FormControl
                            keyboardType="email-address"
                            isRequired
                            type="email"
                            placeholder="Nouveau e-mail"
                            helperText={null}
                            value={emailForm.newEmail}
                            onChange={(newEmail: string) =>
                                setEmailForm({
                                    ...emailForm,
                                    newEmail,
                                })
                            }
                        />
                        <FormControl
                            keyboardType="email-address"
                            isRequired
                            type="email"
                            placeholder="Confirmer l'e-mail"
                            helperText={null}
                            value={emailForm.confirmEmail}
                            onChange={(confirmEmail: string) =>
                                setEmailForm({
                                    ...emailForm,
                                    confirmEmail,
                                })
                            }
                            error={
                                emailForm.newEmail !== '' &&
                                emailForm.newEmail !== emailForm.confirmEmail
                            }
                            errorMessage="Les e-mails ne correspondent pas"
                        />
                    </Box>
                </KeyboardAvoidingView>

                <Button
                    onPress={handleSubmit}
                    alignSelf="center"
                    style={{ marginBottom: 50, marginTop: 15 }}
                    width={Dimensions.get('window').width - 50}
                    label="Je confirme"
                    spinner={loading}
                    isDisabled={
                        loading ||
                        emailForm.oldEmail === '' ||
                        emailForm.newEmail === '' ||
                        emailForm.confirmEmail === '' ||
                        emailForm.newEmail !== emailForm.confirmEmail ||
                        !isValidEmail(emailForm.newEmail)
                    }
                />
            </VStack>
        </Box>
    );
};

export default EditEmail;
