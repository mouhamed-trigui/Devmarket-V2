import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { FormattedMessage, useIntl } from 'react-intl';
import Chevron from '../../../../assets/images/svg/chevron-blanc.svg';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../../stores/slices';

// Components
import { Atomes, Organisms } from '../../../components';
import RegistrationData from '../../../screens/auth/registration/registration.json';

// Services
import { signUp, checkEmail, errorProps } from '../../../services';

// Validator
import { isValidEmail, passwordValidator } from '../../../utils/validator';
import {
    Checkbox,
    HStack,
    KeyboardAvoidingView,
    Stack,
    VStack,
} from 'native-base';
import { Text } from '../../../components/atomes';
import Loader from '../loader/loader';
import {
    Platform,
    TouchableOpacity,
    Text as TextRN,
    Dimensions,
} from 'react-native';
import { SvgXml } from 'react-native-svg';

import * as WebBrowser from 'expo-web-browser';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { platform } from 'os';

/* eslint-disable-next-line */
export interface RegistrationProps {
    navigation: any | undefined;
}

const StyledRegistration = styled.View`
    display: flex;
    flex-grow: 1;
    justify-content: center;
    color: white;
`;
const StyledCheckbox = styled.View`
    align-self: center;
    padding-bottom: 30px;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
`;
const StyledLink = styled.View`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export function Registration(props: RegistrationProps) {
    // Redux
    const dispatch = useDispatch();

    const { registration } = useSelector((state: any) => state.user);

    const { formatMessage } = useIntl();

    const [index, setIndex] = useState(0);

    const [acceptTC, setAcceptTC] = useState(false);

    const [error, setError] = useState<errorProps | undefined | null>(null);

    const [isSubmitted, setIssubmitted] = useState(false);

    const [loading, setLoading] = useState(false);

    const [showLoader, setShowLoader] = useState(true);

    const [existMail, setExistMail] = useState(false);

    const [errorMessage, setErrorMessage] = useState<string[]>([]);

    useEffect(() => {
        setIndex(0);
        if (registration?.confirmEmail?.length > 0) {
            if (
                registration?.confirmEmail?.toLowerCase() !==
                registration?.email?.toLowerCase()
            )
                setErrorMessage([
                    formatMessage({
                        id: 'VbQ5cs',
                        description: "L'adresse mail n'est pas identique",
                        defaultMessage: "L'adresse mail n'est pas identique",
                    }),
                ]);
            else if (error?.message) {
                setErrorMessage([error?.message]);
            } else setErrorMessage([]);
        } else {
            setErrorMessage([]);
        }
        if (existMail)
            setErrorMessage((errorMessage) => [
                ...errorMessage,
                'Ton email est déjà relié à un compte Defmarket Pro.',
            ]);
    }, [
        error?.message,
        existMail,
        formatMessage,
        registration?.confirmEmail,
        registration?.email,
    ]);
    // state result of webBrowser
    const [result, setResult] = React.useState<any>(null);

    useEffect(() => {
        setTimeout(() => {
            setShowLoader(false);
        }, 3000);
        return () => {
            setIssubmitted(false);
            setLoading(false);
        };
    }, []);

    // funtion to open CGVU
    const handlePressCGVU = async () => {
        const result = await WebBrowser.openBrowserAsync(
            'https://operationhyperion.com/cgvu-application-defmarket-pro/'
        );
        setResult(result);
    };

    // funtion to open Politique de confidentialité
    const handlePressPoliticConfidentiel = async () => {
        const result = await WebBrowser.openBrowserAsync(
            'https://operationhyperion.com/politique-de-confidentialite-commercants-application-defmarket-pro/'
        );
        setResult(result);
    };

    // Methode
    const SIGNUP = async () => {
        setLoading(true);
        await AsyncStorage.setItem('@mail', registration?.email);
        setIssubmitted(true);
        if (
            index === 0 &&
            isValidEmail(registration?.email) &&
            registration?.email?.length > 0 &&
            registration?.confirmEmail.toLowerCase() ===
                registration?.email.toLowerCase()
        ) {
            checkEmail(registration?.email)
                .then((response: any) => {
                    if (
                        response.status === 200 &&
                        !response?.data?.existingEmail
                    ) {
                        setIssubmitted(false);
                        setIndex(index + 1);
                    } else {
                        setExistMail(true);
                    }
                })
                .catch((err: errorProps) => {
                    setError(err);
                    setIssubmitted(false);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else if (
            isValidEmail(registration?.email) &&
            registration?.email &&
            registration?.password &&
            index === 1 &&
            registration?.confirmPassword === registration?.password &&
            passwordValidator(registration?.password)
        ) {
            await signUp({
                email: registration?.email?.toLowerCase(),
                password: registration?.password,
            })
                .then((response: any) => {
                    // if (response.status === 200) {
                    dispatch(
                        userActions.setRegistration({
                            ...registration,
                            email: '',
                            confirmEmail: '',
                            password: '',
                            confirmPassword: '',
                        })
                    );
                    setIssubmitted(false);
                    props.navigation.navigate('Confirmation');
                    // }
                })
                .catch((err: errorProps) => {
                    setError(err);
                    setIssubmitted(false);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    };

    return showLoader ? (
        <Loader />
    ) : (
        <VStack key="registration" justifyContent="space-between" flexGrow={1}>
            <VStack
                key="registration-1"
                space={0}
                marginTop={Platform.OS === 'android' ? 10 : 0}
                justifyContent="center"
                flexGrow={1}
            >
                {index === 1 && (
                    <TouchableOpacity onPress={() => setIndex(0)}>
                        <SvgXml
                            xml={Chevron}
                            style={{
                                marginLeft: 25,
                            }}
                        />
                    </TouchableOpacity>
                )}
                <StyledRegistration>
                    <KeyboardAvoidingView
                        h={{
                            base: 'auto',
                            lg: 'auto',
                        }}
                        behavior="position"
                    >
                        <Atomes.LogoDefmarket
                            fontFamily="mono"
                            fontSize={null}
                            title={RegistrationData[index].title}
                        />
                        <Atomes.Text
                            fontFamily="body"
                            fontSize="dm-3p"
                            textAlign="center"
                            color={'system.200'}
                            style={{ marginTop: 25 }}
                            moreParams={{ p: 2 }}
                        >
                            {RegistrationData[index].description}
                        </Atomes.Text>
                        {index === 0 ? (
                            <Text
                                fontFamily="bold"
                                fontSize="dm-3p"
                                textAlign="center"
                                color={'system.200'}
                                moreParams={{
                                    p: 2,

                                    underline: true,
                                }}
                                style={{ marginBottom: 40 }}
                            >
                                {RegistrationData[index].sub_description}
                            </Text>
                        ) : (
                            <Atomes.Text
                                fontFamily="bold"
                                fontSize="dm-3p"
                                textAlign="center"
                                color={'system.200'}
                            >
                                {RegistrationData[index].sub_description}
                            </Atomes.Text>
                        )}

                        {index === 0 && (
                            <>
                                <Organisms.FormRegistration
                                    {...RegistrationData[index]}
                                    FormControl1={{
                                        label: '',
                                        placeholder: formatMessage({
                                            id: 'VbQ1ks',
                                            description: 'E-mail',
                                            defaultMessage: 'E-mail',
                                        }),
                                        value: registration?.email,
                                        type: 'email',
                                        error:
                                            (isSubmitted &&
                                                isValidEmail(
                                                    registration?.email
                                                ) === false &&
                                                registration?.email?.length >
                                                    0) ||
                                            existMail
                                                ? true
                                                : false,
                                        helperText: null,
                                        onChange: (value: any) => {
                                            dispatch(
                                                userActions.setRegistration({
                                                    ...registration,
                                                    email: value,
                                                })
                                            );
                                            setExistMail(false);
                                        },
                                    }}
                                    FormControl2={{
                                        label: '',
                                        placeholder: formatMessage({
                                            id: 'VbQ2ks',
                                            description:
                                                "Confirmation de l'e-mail",
                                            defaultMessage:
                                                "Confirmation de l'e-mail",
                                        }),
                                        value: registration?.confirmEmail,
                                        type: 'email',
                                        error:
                                            (isSubmitted &&
                                                registration?.confirmEmail
                                                    ?.length === 0 &&
                                                registration?.email.length >
                                                    0) ||
                                            (isSubmitted &&
                                                registration?.confirmEmail?.toLowerCase() !==
                                                    registration?.email?.toLowerCase()) ||
                                            error?.message ||
                                            existMail
                                                ? true
                                                : false,
                                        errorMessage: errorMessage,
                                        helperText: null,
                                        onChange: (value: any) => {
                                            dispatch(
                                                userActions.setRegistration({
                                                    ...registration,
                                                    confirmEmail: value,
                                                })
                                            );
                                            setExistMail(false);
                                        },
                                    }}
                                    acceptTC={acceptTC}
                                    navigation={props?.navigation}
                                    setAcceptTC={() => setAcceptTC(!acceptTC)}
                                />

                                <StyledCheckbox>
                                    <Stack
                                        justifyContent="space-between"
                                        width={
                                            Platform?.OS === 'web'
                                                ? '300'
                                                : Dimensions.get('window')
                                                      .width - 50
                                        }
                                    >
                                        <Checkbox
                                            key="cgvu"
                                            value="accept"
                                            isChecked={acceptTC}
                                            backgroundColor="transparent"
                                            onChange={() =>
                                                setAcceptTC(!acceptTC)
                                            }
                                        >
                                            <HStack
                                                key="CVGV"
                                                marginLeft={1}
                                                space={1}
                                            >
                                                <Text
                                                    key="accept"
                                                    fontFamily="body"
                                                    fontSize={13}
                                                    style={{
                                                        marginLeft:
                                                            Platform?.OS ===
                                                            'android'
                                                                ? 8
                                                                : 0,
                                                    }}
                                                    textAlign="center"
                                                    color={'system.200'}
                                                >
                                                    <FormattedMessage
                                                        id="Yeg6p6"
                                                        defaultMessage="J’accepte les"
                                                    />
                                                </Text>
                                                <TouchableOpacity
                                                    onPress={handlePressCGVU}
                                                >
                                                    <Text
                                                        key="accept-CGV"
                                                        fontFamily="body"
                                                        fontSize={13}
                                                        textAlign="center"
                                                        color={'primary.50'}
                                                        moreParams={{
                                                            bold: true,
                                                            underline: true,
                                                        }}
                                                    >
                                                        <FormattedMessage
                                                            id="Yeg6p7"
                                                            defaultMessage="CGVU"
                                                        />
                                                    </Text>
                                                </TouchableOpacity>
                                                <Text
                                                    key="et"
                                                    fontFamily="body"
                                                    fontSize={13}
                                                    textAlign="center"
                                                    color={'system.200'}
                                                >
                                                    <FormattedMessage
                                                        id="Yeg6p8"
                                                        defaultMessage="et"
                                                    />
                                                </Text>
                                                <TouchableOpacity
                                                    onPress={
                                                        handlePressPoliticConfidentiel
                                                    }
                                                >
                                                    <Text
                                                        key="politique"
                                                        fontFamily="body"
                                                        fontSize={13}
                                                        textAlign="center"
                                                        color={'primary.50'}
                                                        moreParams={{
                                                            bold: true,
                                                            underline: true,
                                                        }}
                                                    >
                                                        <FormattedMessage
                                                            id="Yeg6p9"
                                                            defaultMessage="la politique de confidentialité"
                                                        />
                                                    </Text>
                                                </TouchableOpacity>
                                            </HStack>
                                        </Checkbox>
                                    </Stack>
                                </StyledCheckbox>
                            </>
                        )}

                        {index === 1 && (
                            <Organisms.FormRegistration
                                {...RegistrationData[index]}
                                FormControl1={{
                                    label: '',
                                    placeholder: formatMessage({
                                        id: 'VbQ3ks',
                                        description: 'Mot de passe',
                                        defaultMessage: 'Mot de passe',
                                    }),
                                    value: registration?.password,
                                    type: 'password',
                                    error: null,
                                    errorMessage: null,
                                    helperText: null,
                                    onChange: (value: any) =>
                                        dispatch(
                                            userActions.setRegistration({
                                                ...registration,
                                                password: value,
                                            })
                                        ),
                                }}
                                FormControl2={{
                                    label: '',
                                    placeholder: formatMessage({
                                        id: 'VbQ4ks',
                                        description:
                                            'Confirmation du mot de passe',
                                        defaultMessage:
                                            'Confirmation du mot de passe',
                                    }),
                                    value: registration?.confirmPassword,
                                    type: 'password',
                                    error:
                                        (isSubmitted &&
                                            registration?.confirmPassword
                                                ?.length === 0) ||
                                        (isSubmitted &&
                                            registration?.confirmPassword !==
                                                registration?.password) ||
                                        (isSubmitted &&
                                            !passwordValidator(
                                                registration?.confirmPassword
                                            )) ||
                                        (isSubmitted && error?.message)
                                            ? true
                                            : false,
                                    errorMessage:
                                        registration?.confirmPassword?.length >
                                        0
                                            ? registration?.confirmPassword !==
                                              registration?.password
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
                                            : formatMessage({
                                                  id: 'VbQ6ks',
                                                  description:
                                                      'Confirme ton mot de passe ici',
                                                  defaultMessage:
                                                      'Confirme ton mot de passe ici',
                                              }),
                                    helperText: null,
                                    onChange: (value: any) =>
                                        dispatch(
                                            userActions.setRegistration({
                                                ...registration,
                                                confirmPassword: value,
                                            })
                                        ),
                                }}
                                acceptTC={acceptTC}
                                navigation={props?.navigation}
                                setAcceptTC={() => setAcceptTC(!acceptTC)}
                            />
                        )}
                    </KeyboardAvoidingView>
                    <Atomes.Button
                        width="55%"
                        alignSelf="center"
                        label={RegistrationData[index].button}
                        moreParams={{
                            disabled:
                                loading ||
                                !acceptTC ||
                                registration?.email?.length < 1 ||
                                registration?.confirmEmail?.length < 1,
                        }}
                        spinner={loading}
                        onPress={() => SIGNUP()}
                        style={{ marginTop: index === 0 ? 10 : 40 }}
                    />
                </StyledRegistration>
            </VStack>
            <TouchableOpacity
                style={{
                    width: 200,
                    alignSelf: 'center',
                }}
                onPress={() => props.navigation.navigate('Login')}
            >
                <StyledLink>
                    <Atomes.Text
                        fontFamily="body"
                        fontSize="dm-2p"
                        textAlign="center"
                        color={'system.200'}
                        moreParams={{
                            p: Platform.OS === 'android' ? 6 : 2,
                            bold: true,
                            underline: true,
                        }}
                    >
                        <FormattedMessage
                            id="xmB0Av"
                            defaultMessage="J'ai déja un compte!"
                        />
                    </Atomes.Text>
                </StyledLink>
            </TouchableOpacity>
        </VStack>
    );
}

export default Registration;
