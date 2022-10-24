import { Image, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useContext, useState } from 'react';
import Text from '../../../../../components/atomes/text/Text';
import {
    Check,
    Close,
    Download,
    InformationBleu,
} from '../../../../../theme/svgs';
import { fonts, fontSizes } from '../../../../../theme/fonts';
import { hyperion, uneo, zalando } from '../../../../../theme/images';
import Badge from '../../../../../components/atomes/badge/Badge';
import { Card, ReductionCard } from '../../../../../components/atomes/card';
import { ThemeContext } from '../../../../../context/ThemeContext';
import PageContainer from '../../../../../components/atomes/container/PageContainer';
import HStack from '../../../../../components/atomes/stack/HStack';
import Modal from '../../../../../components/molecules/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../../../stores/slices';
import Button from '../../../../../components/atomes/button/general-button/Button';
import { IOffer } from '../../../../../services/model/offer';
import { getOfferByID } from '../../../../../services/methodes/offer';
import moment from 'moment';
import { RootState } from '../../../../../stores/store';

const OfferDetails = (props: any) => {
    const dispatch = useDispatch();

    const selectedLevel = useSelector((state: RootState) => state.user.level);

    const { theme } = useContext(ThemeContext);

    const offer = useSelector((state: RootState) => state.user.offer);

    const [modalState, setModalState] = useState({
        backGroundColor: undefined,
        level: '',
        description: '',
    });

    const [accessibleOffer, setAccessibleOffer] = useState('Offre minimum');

    const toggleModal = (modalName, status) => {
        dispatch(
            userActions.setModalStatus({
                modalName: modalName,
                modalStatus: status,
            })
        );
    };

    useEffect(() => {
        switch (selectedLevel) {
            case 'Offre minimum': {
                return setModalState({
                    description:
                        "Ce niveau est réservé aux utilisateurs ayant un compte validé. Pour obtenir cet avantage il vous suffit d'attendre la validation de votre compte ",
                    backGroundColor: theme.colors.info[400],
                    level: 'Niveau 1',
                });
            }
            case 'Offre medium': {
                return setModalState({
                    description:
                        "Ce niveau est réservé aux adhérents de l'association. Pour obtenir cet avantage il vous suffit de souscrire à l'adhésion CO.OPS",
                    backGroundColor: theme.colors.primary[100],
                    level: 'Niveau 2',
                });
            }
            case 'Offre premium': {
                return setModalState({
                    description:
                        "Ce niveau est réservé aux adhérents de l'association qui sont également bénévole. Ce niveau n'est pas encore disponible, vous recevrez une notification lorsqu'il sera débloqué par nos équipes",
                    backGroundColor: theme.colors.primary[50],
                    level: 'Niveau 3',
                });
            }
            default: {
                return undefined;
            }
        }
    }, [selectedLevel]);

    useEffect(() => {
        getOfferByID(props.route?.params?.offerId)
            .then((res) => {
                dispatch(userActions.setOffer(res));
            })
            .catch((err) => {
                console.log(err);
            });
    }, [props.route?.params?.offerId]);

    const renderOfferLevelModal = () => {
        return (
            <Modal
                modalName="offerLevel"
                borderRadius={20}
                vPadding={10}
                hPadding={15}
            >
                <>
                    <View
                        style={{
                            backgroundColor: modalState.backGroundColor,
                            height: 13,
                            borderRadius: 7,
                            marginVertical: 10,
                        }}
                    ></View>
                    <Text
                        fontFamily={fonts.mono}
                        fontSize={fontSizes['dm-3p']}
                        color={theme.colors.info[50]}
                        vPadding={10}
                    >
                        {modalState.level}
                    </Text>
                    <Text
                        fontFamily={fonts.body}
                        fontSize={fontSizes['dm-2p']}
                        color={theme.colors.info[50]}
                        numberOfLines={20}
                    >
                        {modalState.description}
                    </Text>
                    <View
                        style={{
                            marginVertical: 20,
                        }}
                    >
                        <Button
                            title={'En savoir plus '}
                            backgroundColor={theme.colors.primary[50]}
                            color={theme.colors.info[200]}
                            onPress={() => {
                                toggleModal('offerLevel', false);
                                toggleModal('general', true);
                            }}
                        />
                    </View>
                </>
            </Modal>
        );
    };
    const renderPartnerModal = () => {
        return (
            <Modal
                modalName="general"
                borderRadius={20}
                vPadding={10}
                hPadding={15}
                icon={<InformationBleu fill={theme.colors.info[50]} />}
                iconAction={() => {
                    toggleModal('general', false);
                }}
            >
                <>
                    <View
                        style={{
                            paddingHorizontal: 40,
                            paddingVertical: 20,
                        }}
                    >
                        <Image
                            source={hyperion}
                            resizeMode={'contain'}
                            style={{
                                height: 100,
                                width: 200,
                            }}
                        />
                        <HStack alignItems="flex-start">
                            <Text
                                fontFamily={fonts.body}
                                fontSize={fontSizes['dm-xl']}
                                color={theme.colors.info[50]}
                            >
                                &
                            </Text>
                            <Image
                                source={uneo}
                                resizeMode={'contain'}
                                style={{
                                    height: 120,
                                    width: 120,
                                    marginLeft: 30,
                                }}
                            />
                        </HStack>
                    </View>
                    <Text
                        fontFamily={fonts.mono}
                        color={theme.colors.info[50]}
                        fontSize={fontSizes['dm-3p']}
                    >
                        Lorem Ipsum
                    </Text>
                    <Text
                        fontFamily={fonts.body}
                        color={theme.colors.info[50]}
                        fontSize={fontSizes['dm-2p']}
                        vPadding={5}
                        numberOfLines={3}
                    >
                        Cette offre est issus de notre engagement et de soutien
                        d'un partenaire.
                    </Text>
                    <View style={{ marginVertical: 15 }}>
                        <Button
                            title={'Découvrir UNEO '}
                            backgroundColor={theme.colors.primary[50]}
                            color={theme.colors.info[200]}
                            style={{ marginVertical: 10 }}
                            onPress={() => {}}
                        />
                        <Button
                            title={'Découvrir Opération Hypérion'}
                            backgroundColor={theme.colors.primary[100]}
                            color={theme.colors.info[200]}
                            onPress={() => {}}
                        />
                    </View>
                </>
            </Modal>
        );
    };

    return (
        <PageContainer
            contentContainerStyle={{
                paddingHorizontal: 20,
                paddingVertical: 50,
            }}
        >
            <TouchableOpacity
                style={{
                    alignItems: 'flex-end',
                }}
                onPress={() => {
                    props.navigation.goBack();
                }}
            >
                <Close fill={theme.colors.info[50]} width={15} height={15} />
            </TouchableOpacity>
            <HStack
                style={{
                    justifyContent: 'center',
                    margin: 20,
                }}
            >
                <Badge
                    text="By Hyperion"
                    width={100}
                    textColor={theme.colors.info[200]}
                    backgroundColor={theme.colors.info[50]}
                />
                <Badge
                    text={offer?.offerCategory}
                    width={100}
                    textColor={theme.colors.info[50]}
                />
                <Badge
                    text={offer?.themeType}
                    width={100}
                    textColor={theme.colors.info[50]}
                />
            </HStack>

            <View
                style={{
                    alignSelf: 'center',
                    width: 250,
                }}
            >
                <Text
                    fontFamily={fonts.medium}
                    fontSize={fontSizes['dm-3p']}
                    color={theme.colors.info[50]}
                    numberOfLines={3}
                    textAlign="center"
                >
                    {offer?.title}
                </Text>
            </View>
            <HStack
                style={{
                    margin: 20,
                    justifyContent: 'center',
                }}
            >
                <Check />

                <Text
                    color={theme.colors.danger[50]}
                    textAlign="center"
                    moreParams={{
                        marginHorizontal: 5,
                    }}
                >
                    Offre vérifiée
                </Text>
            </HStack>
            <ReductionCard
                accessibleOffer={accessibleOffer}
                offerCategory={offer?.offerCategory}
                onPressCard={() =>
                    props.navigation.navigate({
                        name: 'PhysicalOfferValidated',
                        params: { data: accessibleOffer, offer: offer },
                    })
                }
                onPressActivateCode={() =>
                    accessibleOffer === 'Offre minimum'
                        ? props.navigation.navigate({
                              name: 'EcommerceOfferValidated',
                              params: { data: accessibleOffer, offer: offer },
                          })
                        : undefined
                }
                text={
                    accessibleOffer === 'Offre minimum'
                        ? 'Activer le code'
                        : 'Débloquer'
                }
                cardLevel="Offre minimum"
                percentage={offer?.minOfferValue}
                width="100%"
                height={70}
                backgroundColor={theme.colors.info[400]}
            />
            <ReductionCard
                accessibleOffer={accessibleOffer}
                offerCategory={offer?.offerCategory}
                onPressCard={() =>
                    props.navigation.navigate({
                        name: 'PhysicalOfferValidated',
                        params: { data: accessibleOffer, offer: offer },
                    })
                }
                onPressActivateCode={() =>
                    accessibleOffer === 'Offre medium'
                        ? props.navigation.navigate({
                              name: 'EcommerceOfferValidated',
                              params: { data: accessibleOffer, offer: offer },
                          })
                        : undefined
                }
                text={
                    accessibleOffer === 'Offre medium'
                        ? 'Activer le code'
                        : 'Débloquer'
                }
                cardLevel="Offre medium"
                percentage={offer?.midOfferValue}
                width="100%"
                height={70}
                backgroundColor={theme.colors.primary[100]}
            />
            <ReductionCard
                accessibleOffer={accessibleOffer}
                offerCategory={offer?.offerCategory}
                onPressCard={() =>
                    props.navigation.navigate({
                        name: 'PhysicalOfferValidated',
                        params: { data: accessibleOffer, offer: offer },
                    })
                }
                onPressActivateCode={() =>
                    accessibleOffer === 'Offre premium'
                        ? props.navigation.navigate({
                              name: 'EcommerceOfferValidated',
                              params: { data: accessibleOffer, offer: offer },
                          })
                        : undefined
                }
                text={
                    accessibleOffer === 'Offre premium'
                        ? 'Activer le code'
                        : 'Débloquer'
                }
                cardLevel="Offre premium"
                percentage={offer?.maxOfferValue}
                width="100%"
                height={70}
                backgroundColor={theme.colors.primary[50]}
            />
            <View
                style={{
                    marginVertical: 20,
                }}
            >
                <Text
                    fontFamily={fonts.bold}
                    fontSize={fontSizes['dm-p']}
                    color={theme.colors.info[50]}
                    moreParams={{ alignSelf: 'center' }}
                >
                    Conditions
                </Text>
                <Text
                    width={200}
                    numberOfLines={2}
                    textAlign="center"
                    fontFamily={fonts.body}
                    fontSize={13}
                    color={theme.colors.info[50]}
                    moreParams={{ alignSelf: 'center', marginVertical: 10 }}
                >
                    {offer?.description}
                </Text>
                <Text
                    fontFamily={fonts.body}
                    fontSize={fontSizes['dm-p']}
                    color={theme.colors.info[50]}
                    moreParams={{ alignSelf: 'center' }}
                >
                    Du {moment(offer?.startOfOffer).format(' DD/MM/YYYY ')} au{' '}
                    {moment(offer?.endOfOffer).format(' DD/MM/YYYY ')}
                </Text>
                <Card
                    borderRadius={7}
                    backgroundColor={theme.colors.info[200]}
                    vMargin={20}
                    height={45}
                >
                    <HStack
                        justifyContent="space-between"
                        alignItems="center"
                        style={{ height: '100%' }}
                    >
                        <Text
                            fontFamily={fonts.bold}
                            fontSize={fontSizes['dm-p']}
                            color={theme.colors.info[50]}
                            moreParams={{ marginHorizontal: 10 }}
                        >
                            Lorem Ipsum
                        </Text>
                        <TouchableOpacity>
                            <Download
                                fill={theme.colors.primary[50]}
                                style={{ marginHorizontal: 20 }}
                            />
                        </TouchableOpacity>
                    </HStack>
                </Card>

                <Image
                    source={zalando}
                    style={{
                        width: '100%',
                        height: 100,
                        alignSelf: 'center',
                    }}
                />
            </View>
            {/* Offer level modal */}
            {renderOfferLevelModal()}
            {/* Partner details modal */}
            {renderPartnerModal()}
        </PageContainer>
    );
};

export default OfferDetails;
