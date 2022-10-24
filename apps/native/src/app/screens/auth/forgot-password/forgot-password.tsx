import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { FormattedMessage, useIntl } from 'react-intl';

// Components
import { Atomes, Molecules } from '../../../components';

// Services
import { forgotPassword, errorProps } from '../../../services';
import { KeyboardAvoidingView, VStack } from 'native-base';

// function to verify email validation
import { isValidEmail } from '../../../utils/validator';
import { Dimensions } from 'react-native';

/* eslint-disable-next-line */
export interface ForgotPasswordProps {
    navigation: any;
}

const StyledForgotPassword = styled.View`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    color: white;
`;

const StyledForm = styled.View`
    margin: 20%;
`;

export function ForgotPassword(props: ForgotPasswordProps) {
    // State
    const [identifier, setIdentifier] = useState('');

    // loading state
    const [loading, setLoading] = useState(false);

    // useEffect
    useEffect(() => {
        return () => {
            setLoading(false);
        };
    }, []);

    // Methode
    const forgetPass = async () => {
        //setIssubmitted(true);
        setLoading(true);
        if (identifier?.length > 0) {
            forgotPassword(identifier)
                .then((response: any) => {
                    setLoading(false);
                    props.navigation.navigate('ConfirmationPassword');
                })
                .catch((err: errorProps) => {
                    console.error(err);
                    setLoading(false);
                });
        }
    };

    const { formatMessage } = useIntl();
    return (
        <StyledForgotPassword>
            <VStack
                flexGrow={1}
                justifyContent="space-between"
                marginTop={10}
                marginBottom={10}
            >
                <KeyboardAvoidingView
                    h={{
                        base: 'auto',
                        lg: 'auto',
                    }}
                    behavior={'position'}
                >
                    <Atomes.LogoDefmarket
                        fontFamily="mono"
                        fontSize={'dm-h1'}
                        title={formatMessage({
                            id: 'VpH1ks',
                            description: 'MOT DE PASSE OUBLIÉ',
                            defaultMessage: 'MOT DE PASSE OUBLIÉ',
                        })}
                    />
                    <Atomes.Text
                        fontFamily="body"
                        fontSize="dm-2p"
                        textAlign="center"
                        color={'system.200'}
                        moreParams={{ p: 5 }}
                    >
                        <FormattedMessage
                            id="FORPW1"
                            defaultMessage="Saisis ton e-mail pour créer un nouveau mot de passe."
                        />
                    </Atomes.Text>
                    <StyledForm>
                        <Molecules.FormControl
                            label=""
                            placeholder={formatMessage({
                                id: 'VbQ1ks',
                                description: 'E-mail',
                                defaultMessage: 'E-mail',
                            })}
                            value={identifier}
                            type="email"
                            helperText={null}
                            onChange={(value: any) => setIdentifier(value)}
                        />
                    </StyledForm>
                </KeyboardAvoidingView>

                <Atomes.Button
                    style={{ marginBottom: 20 }}
                    label={formatMessage({
                        id: 'TEsZks',
                        description: 'Envoyer',
                        defaultMessage: 'Envoyer',
                    })}
                    spinner={loading}
                    moreParams={{
                        disabled: loading || !isValidEmail(identifier),
                    }}
                    width={Dimensions.get('window').width - 150}
                    alignSelf="center"
                    onPress={forgetPass}
                />
            </VStack>
        </StyledForgotPassword>
    );
}

export default ForgotPassword;
