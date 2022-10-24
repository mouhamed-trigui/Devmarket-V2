import React, { useContext } from 'react';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { FormattedMessage, useIntl } from 'react-intl';
import { SvgXml } from 'react-native-svg';
import { Platform, TouchableOpacity } from 'react-native';
import confirmationSvg from '../../../../assets/images/svg/email.svg';

// Components
import { Atomes } from '../../../components';

// Local storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// send new mail activation service
import { sendNewMailActivation } from '../../../services/methodes/auth';

// Info dialog alert
import Infodialog from '../../../components/molecules/dialog/info-dialog/Infodialog';

// open the mailbox
import { openInbox } from 'react-native-email-link';
import * as IntentLauncher from 'expo-intent-launcher';
import { VStack } from 'native-base';
import { SpinnerContext } from '../../../components/atomes/spinner/SpinnerProvider';

/* eslint-disable-next-line */
export interface ConfirmationProps {}

const StyledConfirmation = styled.View`
    width: 100%;
    height: 100%;
    color: white;
`;
export function Confirmation(props: ConfirmationProps) {
    const { formatMessage } = useIntl();

    const navigation = useNavigation();

    const [loading, setLoading] = React.useState(false);

    const { setSpinnerVisibily } = useContext(SpinnerContext);

    // Local states for info dialog
    const [isOpen, setIsOpen] = React.useState(false);

    const [success, setSuccess] = React.useState<boolean | null>(null);

    const title = { 0: 'Mail envoyé', 1: "Echec de l'envoi du mail" };

    const description = {
        0: 'Un mail de confirmation a été envoyé avec succès.',
        1: "L'envoi du mail de confirmation a échoué.",
    };

    // Local state mail getted from localStorage
    const [mail, setMail] = React.useState<string | null>(null);

    // function to open mail
    const handleOpenEmailboxAsync = async () => {
        if (Platform.OS === 'ios') {
            try {
                setLoading(false);
                await openInbox({
                    message: 'Ouvrir ta boîte mail?',
                    cancelLabel: 'Cancel',
                });
            } catch (error) {
                setLoading(false);
                console.error(`OpenEmailbox > iOS Error > ${error}`);
            }
        }

        if (Platform.OS === 'android') {
            setLoading(false);
            const activityAction = 'android.intent.action.MAIN'; // Intent.ACTION_MAIN
            const intentParams: IntentLauncher.IntentLauncherParams = {
                flags: 268435456, // Intent.FLAG_ACTIVITY_NEW_TASK
                category: 'android.intent.category.APP_EMAIL', // Intent.CATEGORY_APP_EMAIL
            };

            IntentLauncher.startActivityAsync(activityAction, intentParams);
        }
    };

    //method to send new mail
    const sendNewMail = () => {
        setSpinnerVisibily(true);
        //service send new mail
        if (mail) {
            sendNewMailActivation(mail)
                .then((res) => {
                    setSpinnerVisibily(false);
                    setSuccess(true);
                    setIsOpen(true);
                })
                .catch((err) => {
                    setSpinnerVisibily(false);
                    setSuccess(false);
                    setIsOpen(true);
                });
        } else {
            setSpinnerVisibily(false);
            setSuccess(false);
            setIsOpen(true);
        }
    };

    // Method to get mail from local storage
    const getMail = async () => {
        AsyncStorage.getItem('@mail').then((mail) => {
            setMail(mail);
        });
    };

    // Use Effect
    React.useEffect(() => {
        getMail();
    }, []);

    return (
        <StyledConfirmation>
            <VStack justifyContent="space-between" flexGrow={1}>
                <VStack
                    alignItems="center"
                    justifyContent="center"
                    flexGrow={1}
                >
                    <Infodialog
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        title={title[success ? 0 : 1]}
                        body={description[success ? 0 : 1]}
                    />
                    <Atomes.LogoDefmarket
                        fontFamily="mono"
                        fontSize="dm-h1"
                        title={formatMessage({
                            id: 'VhQ1ks',
                            description: 'CONFIRMATION',
                            defaultMessage: 'CONFIRMATION',
                        })}
                    />

                    {Platform.OS === 'web' ? (
                        <Ionicons
                            name={'md-navigate'}
                            size={100}
                            color="white"
                            style={{
                                paddingRight: 10,
                                transform: [{ rotate: '25deg' }],
                                margin: 80,
                            }}
                        />
                    ) : (
                        <SvgXml
                            width={64}
                            height={64}
                            xml={confirmationSvg}
                            style={{ margin: 80 }}
                        />
                    )}
                    <Atomes.Text
                        fontFamily="body"
                        fontSize="dm-2p"
                        textAlign="center"
                        color="system.200"
                    >
                        <FormattedMessage
                            id="+MkrkM"
                            defaultMessage="Un e-mail de validation d’inscription{br} vient de t'être envoyé."
                            values={{
                                br: '\n',
                            }}
                        />
                    </Atomes.Text>
                    <Atomes.Text
                        fontFamily="body"
                        fontSize="dm-2p"
                        textAlign="center"
                        color="system.200"
                        moreParams={{ marginTop: 5 }}
                    >
                        <FormattedMessage
                            id="NqxUY1"
                            defaultMessage="Vériﬁe ta boîte mail, tes spams{br}et connecte toi en cliquant sur le {br} lien magique !"
                            values={{
                                br: '\n',
                            }}
                        />
                    </Atomes.Text>
                    <Atomes.Text
                        fontFamily="body"
                        fontSize="dm-2p"
                        textAlign="center"
                        color="system.200"
                        moreParams={{ marginTop: 5 }}
                    >
                        <FormattedMessage
                            id="CnFMa1"
                            defaultMessage="Je n'ai pas reçu l'e-mail."
                        />
                    </Atomes.Text>
                    <TouchableOpacity
                        style={{ marginBottom: 50 }}
                        onPress={sendNewMail}
                    >
                        <Atomes.Text
                            fontFamily="body"
                            fontSize="dm-2p"
                            textAlign="center"
                            color="system.200"
                            moreParams={{
                                p: 2,
                                bold: true,
                                underline: true,
                            }}
                        >
                            <FormattedMessage
                                id="CnFMa2"
                                defaultMessage="Renvoyez-moi un nouveau e-mail"
                            />
                        </Atomes.Text>
                    </TouchableOpacity>
                    <Atomes.Button
                        label={formatMessage({
                            id: 'TEsBks',
                            description: "J'ouvre l'email",
                            defaultMessage: "J'ouvre l'email",
                        })}
                        spinner={loading}
                        moreParams={{
                            style: { marginTop: 80 },
                            disabled: loading,
                        }}
                        onPress={() => {
                            setLoading(true);
                            handleOpenEmailboxAsync();
                        }}
                    />
                </VStack>
                <TouchableOpacity
                    style={{ marginTop: 40 }}
                    onPress={() => {
                        navigation.navigate('Login');
                    }}
                >
                    <Atomes.Text
                        fontFamily="body"
                        fontSize="dm-2p"
                        textAlign="center"
                        color={'system.200'}
                        moreParams={{
                            p: 6,
                            bold: true,
                            underline: true,
                        }}
                    >
                        <FormattedMessage
                            id="TEsNks"
                            defaultMessage="Je me connecte"
                        />
                    </Atomes.Text>
                </TouchableOpacity>
            </VStack>
        </StyledConfirmation>
    );
}

export default Confirmation;
