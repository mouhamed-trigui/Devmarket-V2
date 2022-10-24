import React, { useState, useMemo, useRef } from 'react';
import styled from 'styled-components/native';
import { FormattedMessage, useIntl } from 'react-intl';
import { useHeaderHeight } from '@react-navigation/elements';

// Components
import { Atomes, Organisms, Molecules } from '../../../components';

// Redux
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../../../stores/slices';

// Import images
import shopJaune from '../../../../assets/images/png/shop-jaune.png';
import shopBleu from '../../../../assets/images/png/shop-bleu-f.png';

import bureauBleu from '../../../../assets/images/png/bureau-bleu-f.png';
import company from '../../../../assets/images/png/bureau-bleu-c.png';
import bureauJaune from '../../../../assets/images/png/bureau-jaune.png';

import userBleu from '../../../../assets/images/png/user-bleu-c.png';
import userJaune from '../../../../assets/images/png/user-jaune.png';

// services company list
import { listCompany, me } from '../../../services';
import { KeyboardAvoidingView, ScrollView } from 'native-base';
import { SafeAreaView, BackHandler } from 'react-native';

/* eslint-disable-next-line */
export interface IdentityProps {
    navigation: any;
}

const StyledIdentity = styled.View`
    flex-grow: 1;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    padding-top: 20px;
    padding-bottom: 10px;
    color: white;
`;

export function Identity(props: IdentityProps) {
    // Redux
    const { user } = useSelector((state: any) => state.user);
    const { formatMessage } = useIntl();
    const [step, setStep] = useState(0);
    const [identityValidated, setIdentityValidated] = useState(false);
    const [companyCompleted, setCompanyCompleted] = useState(false);
    const [companyId, setcompanyId] = useState<number>();
    const dispatch = useDispatch();

    const scrollRef = useRef<any>();

    const scrollUp = () => {
        scrollRef.current?.scrollTo({
            y: 0,
            //animated: true,
        });
    };

    React.useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => true
        );
        return () => backHandler.remove();
    }, []);

    // get company id when reload app and store is not validated
    React.useEffect(() => {
        if (user?.completeRegistration?.companyCompleted === true) {
            listCompany().then((res) => {
                setcompanyId(res[0].id);
            });
        }
    }, [user?.completeRegistration?.companyCompleted]);

    React.useEffect(() => {
        if (
            user?.completeRegistration?.identityValidated === true &&
            user?.completeRegistration?.companyCompleted === true &&
            user?.completeRegistration?.storeValidated === true
        ) {
            if (user.pushNotificationActive) {
                props.navigation.navigate('Home');
            } else {
                props.navigation.navigate('pushNotificationMain');
            }
        }
        if (user?.completeRegistration?.identityValidated === true) {
            if (user?.completeRegistration?.companyCompleted === false) {
                setStep(1);
                setIdentityValidated(true);
            } else {
                setStep(2);
                setCompanyCompleted(true);
                setIdentityValidated(true);
            }
        } else if (user?.completeRegistration?.companyCompleted) {
            setCompanyCompleted(true);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        user?.completeRegistration?.companyCompleted,
        user?.completeRegistration?.identityValidated,
        user?.completeRegistration?.storeValidated,
    ]);

    const headerHeight = useHeaderHeight();

    return (
        <SafeAreaView style={{ paddingTop: headerHeight }}>
            <ScrollView ref={scrollRef} contentContainerStyle={{ flexGrow: 1 }}>
                <StyledIdentity>
                    {useMemo(
                        () => (
                            <Molecules.Stepper
                                activeIndex={step}
                                setActiveIndex={setStep}
                                divider={true}
                                onlyIcon={false}
                                items={[
                                    {
                                        inactive: userBleu,
                                        active: userJaune,
                                        completed: identityValidated,
                                    },
                                    {
                                        inactive:
                                            step !== 2 ? bureauBleu : company,
                                        active: bureauJaune,
                                        completed: companyCompleted,
                                    },
                                    {
                                        inactive: shopBleu,
                                        active: shopJaune,
                                    },
                                ]}
                            />
                        ),
                        [companyCompleted, identityValidated, step]
                    )}

                    <Atomes.LogoDefmarket
                        fontFamily="workSans"
                        bold
                        fontSize={'dm-h1'}
                        title={
                            step === 0
                                ? formatMessage({
                                      id: 'VbH1ks',
                                      description: 'Ton identité',
                                      defaultMessage: 'Ton identité',
                                  })
                                : step === 1
                                ? formatMessage({
                                      id: 'cbH1ks',
                                      description: 'Ton entreprise',
                                      defaultMessage: 'Ton entreprise',
                                  })
                                : formatMessage({
                                      id: 'xbH1ks',
                                      description: 'Ton Activité',
                                      defaultMessage: 'Ton Activité',
                                  })
                        }
                    />

                    <Atomes.Text
                        width={300}
                        fontFamily="body"
                        fontSize="dm-2p"
                        textAlign="center"
                        color={'system.200'}
                    >
                        {step === 0 ? (
                            <FormattedMessage
                                id="KL4Mt5"
                                defaultMessage="Ces données sont conﬁdentielles,{br}seuls les administrateurs peuvent y{br}accéder pour sécuriser l’accès à{br}ton compte."
                                values={{
                                    br: '\n',
                                }}
                            />
                        ) : step === 1 ? (
                            <FormattedMessage
                                id="kqpx53"
                                defaultMessage="Trouve automatiquement ton entreprise grâce à son nom ou SIREN. Tu peux aussi compléter les informations suivantes :"
                            />
                        ) : null}
                    </Atomes.Text>

                    {step === 0 && (
                        <Organisms.FormIdentityUserRegistration
                            nextStep={() => {
                                setStep(step + 1);
                                scrollUp();
                            }}
                        />
                    )}

                    {step === 1 && (
                        <Organisms.FormIdentityEstablishmentRegistration
                            successAction={(data) => {
                                dispatch(
                                    userActions.setUser({
                                        ...user,
                                        completeRegistration: {
                                            ...user.completeRegistration,
                                            companyCompleted: true,
                                        },
                                    })
                                );
                                setcompanyId(data.id);
                                setStep(step + 1);
                                scrollUp();
                            }}
                        />
                    )}
                    {step === 2 && (
                        <Organisms.FormIdentityShopRegistration
                            companyId={companyId}
                            successAction={() => {
                                me();
                                dispatch(userActions.setIdentity(undefined));
                            }}
                        />
                    )}
                </StyledIdentity>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Identity;
