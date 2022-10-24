import React, { useState, useEffect } from 'react';
import { Dimensions, Platform, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    Center,
    Image,
    KeyboardAvoidingView,
    Stack,
    VStack,
} from 'native-base';
import { Link } from '@react-navigation/native';
import fingerprintSVG from '../../../../assets/images/svg/empreinte-ID.svg';
import fingerprintPNG from '../../../../assets/images/png/empreinte-ID.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SvgXml } from 'react-native-svg';
// components
import { Atomes, Molecules } from '../../../components';
// Services
import { signIn, me, errorProps } from '../../../services';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../../stores/slices';
import { Text } from '../../../components/atomes';

/* eslint-disable-next-line */
export interface LoginProps {
    navigation: any | undefined;
}

const StyledLogin = styled.View`
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    color: white;
`;

const StyledForm = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledLink = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export function Login(props: LoginProps) {
    // Redux
    const dispatch = useDispatch();

    const { user } = useSelector((state: any) => state);

    const { formatMessage } = useIntl();

    // State
    const [identifier, setIdentifier] = useState('');

    const [password, setPassword] = useState('');

    const [error, setError] = useState<errorProps | undefined | null>(null);

    const [emptyField, setEmptyField] = useState(false);

    const [loading, setLoading] = useState(false);

    const SIGNIN = async () => {
        setLoading(true);
        if (!identifier || !password) {
            setEmptyField(true);
            return;
        }
        signIn(identifier, password, user?.expoToken ?? null)
            .then(async (response: any) => {
                if (response.status === 200) {
                    // save accessToken in localStorage
                    await AsyncStorage.setItem(
                        '@Access_Token',
                        response.data.accessToken
                    );
                    // save refreshToken in localStorage
                    await AsyncStorage.setItem(
                        '@Refresh_Token',
                        response.data.refreshToken
                    );

                    await me()
                        .then(async (res: any) => {
                            if (res.status === 200) {
                                setLoading(false);
                                await dispatch(userActions.setIsLoggedIn(true));
                                //dispatch(userActions.setUser(res?.data));
                                // TODO : Check with @amin skip all welcome page if the user is logged in
                                //dispatch(userActions.setIsVisited(true));
                                if (
                                    res?.data?.communication === undefined ||
                                    res?.data?.communication === null
                                ) {
                                    props.navigation.navigate('communication');
                                } else if (
                                    res?.data?.completeRegistration
                                        .identityValidated &&
                                    res?.data?.completeRegistration
                                        .companyCompleted &&
                                    res?.data?.completeRegistration
                                        .storeValidated
                                ) {
                                    if (!res?.data?.pushNotificationActive) {
                                        props.navigation.navigate(
                                            'pushNotificationMain'
                                        );
                                    } else {
                                        props.navigation.navigate('Home');
                                    }
                                } else {
                                    props.navigation.navigate('Identity');
                                }
                            }
                        })
                        .catch((err) => {
                            console.error(err);
                            setLoading(false);
                            setError(err);
                        });
                }
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
                setError(err.response.data);
            });
    };
    return (
        <StyledLogin>
            <VStack justifyContent="space-between" flexGrow={1}>
                <VStack
                    alignItems="center"
                    justifyContent="center"
                    flexGrow={1}
                >
                    <KeyboardAvoidingView
                        h={{
                            base: 'auto',
                            lg: 'auto',
                        }}
                        behavior={'position'}
                    >
                        <Atomes.LogoDefmarket title={null} fontSize={null} />
                        <Atomes.Text
                            fontFamily="body"
                            fontSize="dm-3p"
                            textAlign="center"
                            color={'system.200'}
                            moreParams={{ p: 0, bold: true }}
                            style={{ marginTop: 20 }}
                        >
                            <FormattedMessage
                                id="13jc1N"
                                defaultMessage="Heureux de te revoir !"
                            />
                        </Atomes.Text>
                        <Atomes.Text
                            fontFamily="body"
                            fontSize="dm-3p"
                            textAlign="center"
                            color={'system.200'}
                            moreParams={{ p: 5 }}
                            style={{ marginHorizontal: 8, marginVertical: 5 }}
                        >
                            <FormattedMessage
                                id="zgbfxb"
                                defaultMessage="Saisis ton e-mail et ton mot de passe pour t'identifier."
                                values={{
                                    '2br': '\n \n',
                                    br: '\n',
                                }}
                            />
                        </Atomes.Text>
                        <StyledForm>
                            <Molecules.FormControl
                                keyboardType="email-address"
                                label=""
                                placeholder={formatMessage({
                                    id: 'VbQ1ks',
                                    description: 'E-mail',
                                    defaultMessage: 'E-mail',
                                })}
                                value={identifier}
                                type="email"
                                helperText={null}
                                onChange={(value: string) =>
                                    setIdentifier(value)
                                }
                            />
                            <Molecules.FormControl
                                label=""
                                placeholder={formatMessage({
                                    id: 'VbQ3ks',
                                    description: 'Mot de passe',
                                    defaultMessage: 'Mot de passe',
                                })}
                                value={password}
                                type="password"
                                helperText={null}
                                onChange={(value: string) => {
                                    setError(null);
                                    setPassword(value);
                                }}
                            />
                            {error?.message && (
                                <Text
                                    fontFamily="body"
                                    fontSize="dm-p"
                                    textAlign="left"
                                    fontWeight={500}
                                    color={'system.500'}
                                    moreParams={{ bold: true }}
                                >
                                    <FormattedMessage id={error?.message} />
                                </Text>
                            )}
                        </StyledForm>
                        <TouchableOpacity
                            style={{
                                alignSelf: 'center',
                                margin: 20,
                                width:
                                    Platform?.OS === 'web'
                                        ? '40%'
                                        : Dimensions.get('window').width - 50,
                            }}
                            onPress={() =>
                                props.navigation.navigate('ForgotPassword')
                            }
                        >
                            <Atomes.Text
                                fontFamily="body"
                                fontSize="dm-2p"
                                textAlign="center"
                                color={'system.200'}
                                moreParams={{
                                    bold: true,
                                    underline: true,
                                }}
                            >
                                <FormattedMessage
                                    id="HIWp32"
                                    defaultMessage="Mot de passe oublié"
                                />
                            </Atomes.Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>

                    <Atomes.Button
                        isDisabled={!identifier || !password}
                        label={formatMessage({
                            id: 'TEsNks',
                            description: 'Je me connecte',
                            defaultMessage: 'Je me connecte',
                        })}
                        spinner={loading}
                        moreParams={{ disabled: loading }}
                        onPress={() => SIGNIN()}
                    />

                    <Center style={{ paddingTop: 25 }}>
                        {/* <Link to={{ screen: 'Fingerprint', params: {} }}>
                            {Platform.OS === 'web' ? (
                                <Image
                                    source={fingerprintPNG}
                                    alt="fingerprint"
                                />
                            ) : (
                                <SvgXml xml={fingerprintSVG} />
                            )}
                        </Link> */}
                    </Center>
                </VStack>
                <TouchableOpacity
                    style={{
                        width: 210,
                        alignSelf: 'center',
                    }}
                    onPress={() => props.navigation.navigate('Registration')}
                >
                    <StyledLink>
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
                                id="mvXLeS"
                                defaultMessage="Je n'ai pas de compte"
                            />
                        </Atomes.Text>
                    </StyledLink>
                </TouchableOpacity>
            </VStack>
        </StyledLogin>
    );
}

export default Login;
