import React from 'react';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Link } from '@react-navigation/native';

import { FormattedMessage, useIntl } from 'react-intl';
import { SvgXml } from 'react-native-svg';
import { Platform } from 'react-native';
import confirmationSvg from '../../../../assets/images/svg/email.svg';

// Components
import { Atomes } from '../../../components';

// open the mailbox
import { openInbox } from 'react-native-email-link';
import * as IntentLauncher from 'expo-intent-launcher';

/* eslint-disable-next-line */
export interface ConfirmationProps {}

const StyledConfirmation = styled.View`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
`;

const StyledLink = styled.View`
    margin-top: 40px;
`;
export function Confirmation(props: ConfirmationProps) {
    const { formatMessage } = useIntl();

    // function to open mail
    const handleOpenEmailboxAsync = async () => {
        if (Platform.OS === 'ios') {
            try {
                await openInbox({
                    message: 'Ouvrir ta boîte mail?',
                    cancelLabel: 'Cancel',
                });
            } catch (error) {
                console.error(`OpenEmailbox > iOS Error > ${error}`);
            }
        }

        if (Platform.OS === 'android') {
            const activityAction = 'android.intent.action.MAIN'; // Intent.ACTION_MAIN
            const intentParams: IntentLauncher.IntentLauncherParams = {
                flags: 268435456, // Intent.FLAG_ACTIVITY_NEW_TASK
                category: 'android.intent.category.APP_EMAIL', // Intent.CATEGORY_APP_EMAIL
            };

            IntentLauncher.startActivityAsync(activityAction, intentParams);
        }
    };
    return (
        <StyledConfirmation>
            <Atomes.LogoDefmarket
                fontFamily="workSans"
                bold
                fontSize="dm-h1"
                title={formatMessage({
                    id: 'Vdl1ks',
                    description: 'MOT DE PASSE OUBLIÉ',
                    defaultMessage: 'MOT DE PASSE OUBLIÉ',
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
                    id="COfPw1"
                    defaultMessage="Un email de changement de mot{br} de passe vient de t'être envoyé.{br}"
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
                moreParams={{ marginTop: 5, marginBottom: 100 }}
            >
                <FormattedMessage
                    id="COfPw2"
                    defaultMessage="Vérifie ta boîte mail, tes spams{br} pour confirmer ton nouveau mot {br} de passe !"
                    values={{
                        br: '\n',
                    }}
                />
            </Atomes.Text>

            <Atomes.Button
                label={formatMessage({
                    id: 'TEsBks',
                    description: "J'ouvre l'email",
                    defaultMessage: "J'ouvre l'email",
                })}
                moreParams={{ style: { marginTop: 80 } }}
                onPress={handleOpenEmailboxAsync}
            />

            <StyledLink>
                <Atomes.Text
                    fontFamily="body"
                    fontSize="dm-2p"
                    textAlign="center"
                    color={'system.200'}
                    moreParams={{
                        p: 2,
                        bold: true,
                        underline: true,
                    }}
                >
                    <Link to={{ screen: 'Login', params: {} }}>
                        <FormattedMessage
                            id="//I0hn"
                            defaultMessage="Je me connecte"
                        />
                    </Link>
                </Atomes.Text>
            </StyledLink>
        </StyledConfirmation>
    );
}

export default Confirmation;
