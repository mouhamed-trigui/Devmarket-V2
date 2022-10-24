import React, { useContext, useEffect, useState } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import AccordionComponent from '../../../../../components/atomes/accordion/Accordion';
import OfferItem from '../../../../../components/atomes/card/offer-card/OfferItem';
import StoreDetailsCard from '../../../../../components/atomes/card/shop-card/StoreDetailsCard';
import PageContainer from '../../../../../components/atomes/container/PageContainer';
import HStack from '../../../../../components/atomes/stack/HStack';
import Text from '../../../../../components/atomes/text/Text';
import {
    AppelTelephonique,
    Cb,
    Chat,
    Cheques,
    Close,
    Courrier,
    Especes,
    EuroSign,
    Ihorloge,
    InformationBleu,
    Instagram,
    Internet,
    Lien,
    SalesTag,
} from '../../../../../theme/svgs';
import { ThemeContext } from '../../../../../context/ThemeContext';
import VStack from '../../../../../components/atomes/stack/VStack';
import { fonts, fontSizes } from '../../../../../theme/fonts';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import ActionButtons from '../../../../../components/atomes/button/action-button/ActionButtons';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../../../stores/slices';
import Modal from '../../../../../components/molecules/modal/Modal';
import { useIsFocused } from '@react-navigation/native';
import { storeActions } from './../../../../../stores/slices/store/store';
import { getStoreById } from '../../../../../services/methodes/store';
import {
    MediaTypeEnum,
    DayEnum,
    PaymentMethodEnum,
} from '../../../../../services/constants';
import moment from 'moment';
import { getFullStoreAddress, openMap } from '../../../../../helpers';
import { RootState } from '../../../../../stores/store';

export const getIconName = (socialMediaName: MediaTypeEnum, color: string) => {
    switch (socialMediaName.toLowerCase()) {
        case MediaTypeEnum.OTHER.toLowerCase():
            return <Lien fill={color} />;
        case MediaTypeEnum.PHONE.toLowerCase():
            return <AppelTelephonique fill={color} />;
        case MediaTypeEnum.EMAIL.toLowerCase():
            return <Courrier fill={color} />;
        case MediaTypeEnum.INSTAGRAM.toLowerCase():
            return <Instagram fill={color} />;
        case MediaTypeEnum.FACEBOOK.toLowerCase():
            return 'logo-facebook';
        case MediaTypeEnum.TWITTER.toLowerCase():
            return 'logo-twitter';
        case MediaTypeEnum.LINKEDIN.toLowerCase():
            return 'logo-linkedin';
        case MediaTypeEnum.YOUTUBE.toLowerCase():
            return 'logo-youtube';
        default:
            return <Internet fill={color} />;
    }
};
export interface StoreDetailsProps {
    route: any;
}

function StoreDetails(props: StoreDetailsProps) {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { selectedStore } = useSelector((state: RootState) => state.store);
    const [selectedPaymentMethode, setSelectedPaymentMethode] = useState({});

    useEffect(() => {
        if (isFocused) {
            getStoreById(props.route?.params?.storeId)
                .then((data) => {
                    dispatch(storeActions.setSelectedStore(data));
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [isFocused]);

    const renderPaymentMethodDetailsModal = () => {
        return (
            <Modal
                height={120}
                borderRadius={20}
                vPadding={10}
                hPadding={15}
                modalName="paymentMethodDetails"
                icon={<Close fill={theme.colors.info[50]} />}
                iconAction={() => {
                    toggleModal('paymentMethodDetails', false);
                }}
            >
                <Text
                    fontFamily={fonts.mono}
                    fontSize={fontSizes['dm-3p']}
                    color={theme.colors.info[50]}
                    vPadding={10}
                >
                    Moyen de paiement :{' '}
                    {selectedPaymentMethode?.name === PaymentMethodEnum.CB
                        ? 'Carte blue'
                        : selectedPaymentMethode?.name ===
                          PaymentMethodEnum.CHECK
                        ? 'Chèque'
                        : 'Espèces'}
                </Text>
                <Text
                    fontFamily={fonts.body}
                    fontSize={fontSizes['dm-p']}
                    color={theme.colors.info[50]}
                >
                    {selectedPaymentMethode?.condition}
                </Text>
            </Modal>
        );
    };

    const toggleModal = (modalName: string, status: boolean) => {
        dispatch(
            userActions.setModalStatus({
                modalName: modalName,
                modalStatus: status,
            })
        );
    };

    const renderAcceptedPayment = () => {
        return (
            <View style={{ paddingBottom: 10 }}>
                {renderPaymentMethodDetailsModal()}
                <HStack justifyContent="space-around">
                    {selectedStore?.paymentMethods?.map((payment, index) => {
                        switch (payment?.name) {
                            case PaymentMethodEnum.CB: {
                                return (
                                    <TouchableOpacity
                                        key={`payment-method${index}`}
                                        onPress={() => {
                                            toggleModal(
                                                'paymentMethodDetails',
                                                true
                                            );
                                            setSelectedPaymentMethode(payment);
                                        }}
                                    >
                                        <Cb
                                            style={{
                                                position: 'relative',
                                            }}
                                            fill={theme.colors.info[50]}
                                            height={60}
                                            width={60}
                                        />

                                        <InformationBleu
                                            style={{
                                                position: 'absolute',
                                                top: 5,
                                                left: -5,
                                            }}
                                        />
                                    </TouchableOpacity>
                                );
                            }
                            case PaymentMethodEnum.CHECK: {
                                return (
                                    <TouchableOpacity
                                        key={`payment-method${index}`}
                                        onPress={() => {
                                            toggleModal(
                                                'paymentMethodDetails',
                                                true
                                            );
                                            setSelectedPaymentMethode(payment);
                                        }}
                                    >
                                        <Cheques
                                            style={{ position: 'relative' }}
                                            fill={theme.colors.info[50]}
                                            height={60}
                                            width={60}
                                        />
                                        <InformationBleu
                                            style={{
                                                position: 'absolute',
                                                top: 5,
                                                left: -5,
                                            }}
                                        />
                                    </TouchableOpacity>
                                );
                            }
                            default: {
                                return (
                                    <Especes
                                        key={`payment-method${index}`}
                                        fill={theme.colors.info[50]}
                                        height={60}
                                        width={60}
                                    />
                                );
                            }
                        }
                    })}
                </HStack>
            </View>
        );
    };

    const renderStoreOffers = () => {
        if (selectedStore?.offers) {
            return selectedStore?.offers.map((offer, index) => (
                <OfferItem key={index} rowData={offer} />
            ));
        } else {
            return [];
        }
    };

    const renderSocialMedia = () => {
        return (
            <View style={{ paddingBottom: 10 }}>
                {selectedStore?.socialMedia?.map((media, index) => (
                    <HStack
                        key={`socialMedia-${index}`}
                        alignItems="center"
                        style={{ paddingBottom: 5, paddingLeft: 30 }}
                    >
                        {getIconName(
                            media.type.toLowerCase(),
                            theme.colors.info[50]
                        )}
                        <Text
                            key={`media-value-${index}`}
                            color={theme.colors.primary[50]}
                            hPadding={10}
                        >
                            {media.value}
                        </Text>
                    </HStack>
                ))}
            </View>
        );
    };

    const renderContact = () => {
        return (
            <View style={{ paddingBottom: 10 }}>
                {selectedStore?.phoneList?.map((phone, index) => (
                    <HStack
                        key={`phone-contact-${index}`}
                        alignItems="center"
                        style={{ paddingBottom: 5, paddingLeft: 30 }}
                    >
                        {getIconName(
                            MediaTypeEnum.PHONE,
                            theme.colors.info[50]
                        )}
                        <Text
                            key={`phone-contact-value-${index}`}
                            color={theme.colors.primary[50]}
                            hPadding={10}
                        >
                            {`${phone?.prefix} - ${phone?.number}`}
                        </Text>
                    </HStack>
                ))}
                <HStack
                    key={`email-contact`}
                    alignItems="center"
                    style={{ paddingBottom: 5, paddingLeft: 30 }}
                >
                    {getIconName(MediaTypeEnum.EMAIL, theme.colors.info[50])}
                    <Text
                        key={`email-contact-value`}
                        color={theme.colors.primary[50]}
                        hPadding={10}
                    >
                        {selectedStore?.email}
                    </Text>
                </HStack>
            </View>
        );
    };

    const getDay = (day: DayEnum) => {
        switch (day) {
            case DayEnum.MONDAY:
                return 'Lundi';
            case DayEnum.TUESDAY:
                return 'Mardi';
            case DayEnum.THURSDAY:
                return 'Mercredi';
            case DayEnum.WEDNESDAY:
                return 'Jeudi';
            case DayEnum.FRIDAY:
                return 'Vendredi';
            case DayEnum.SATURDAY:
                return 'Samedi';
            case DayEnum.SUNDAY:
                return 'Dimanche';
        }
    };

    const renderStoreHours = () => {
        return (
            <View style={{ paddingBottom: 20 }}>
                {selectedStore?.timeTable?.map((day, index) => (
                    <VStack
                        key={`timeTable-${index}`}
                        style={{
                            alignItems: 'center',
                            marginVertical: 1,
                        }}
                    >
                        <HStack
                            key={`day-${index}`}
                            justifyContent="space-between"
                            style={{ width: '70%', alignItems: 'flex-start' }}
                        >
                            <Text
                                key={`days-${index}`}
                                color={theme.colors.info[50]}
                            >
                                {getDay(day?.day)} :
                            </Text>
                            {day?.workingTime && day?.workingTime.length > 0 ? (
                                <VStack>
                                    {day?.workingTime.map((time) => (
                                        <HStack
                                            key={`workTime-${time.id}`}
                                            justifyContent="space-between"
                                            style={{
                                                width: 100,
                                            }}
                                        >
                                            <Text
                                                key={`day-workTime-${index}`}
                                                fontFamily={fonts.mono}
                                                color={theme.colors.info[50]}
                                            >
                                                {moment(
                                                    time.start,
                                                    'HH:mm:ss'
                                                ).format('HH:mm')}
                                            </Text>
                                            <Text
                                                key={`workTIme-day-end-${index}`}
                                                fontFamily={fonts.mono}
                                                color={theme.colors.info[50]}
                                            >
                                                {moment(
                                                    time.end,
                                                    'HH:mm:ss'
                                                ).format('HH:mm')}
                                            </Text>
                                        </HStack>
                                    ))}
                                </VStack>
                            ) : (
                                <Text
                                    key={`closed-${index}`}
                                    color={theme.colors.info[400]}
                                    fontFamily={fonts.mono}
                                >
                                    Fermé
                                </Text>
                            )}
                        </HStack>
                    </VStack>
                ))}
            </View>
        );
    };

    const renderStoreAddress = () => {
        return (
            <View style={{ paddingBottom: 20, paddingHorizontal: 20 }}>
                {selectedStore?.address && (
                    <Text key={'Storeaddress'} color={theme.colors.info[50]}>
                        {getFullStoreAddress(selectedStore?.address)}
                    </Text>
                )}
                {selectedStore?.geolocation && Platform.OS !== 'web' && (
                    <MapView
                        key={'MapView'}
                        customMapStyle={[]}
                        provider={PROVIDER_GOOGLE}
                        minZoomLevel={0}
                        maxZoomLevel={20}
                        /* initialRegion */ region={
                            selectedStore?.geolocation && {
                                latitude: selectedStore?.geolocation?.latitude,
                                longitude:
                                    selectedStore?.geolocation?.longitude,
                                latitudeDelta: 0.005,
                                longitudeDelta: 0.004,
                            }
                        }
                        style={{
                            marginTop: 10,
                            width: '100%',
                            height: 100,
                            borderRadius: 10,
                        }}
                        showsPointsOfInterest={true}
                    >
                        <Marker
                            key={'MapViewMarker'}
                            title={selectedStore?.name}
                            coordinate={
                                selectedStore?.geolocation && {
                                    latitude:
                                        selectedStore?.geolocation?.latitude,
                                    longitude:
                                        selectedStore?.geolocation?.longitude,
                                }
                            }
                        />
                    </MapView>
                )}
            </View>
        );
    };

    const sections = [
        {
            title: `Offres de la boutique (${selectedStore?.offerNbr})`,
            icon: <SalesTag fill={theme.colors.info[50]} />,
            childComponent: renderStoreOffers(),
        },
        {
            title: 'Moyens de paiement acceptés',
            icon: <EuroSign fill={theme.colors.info[50]} />,
            childComponent: renderAcceptedPayment(),
        },
        {
            title: 'Horaires de la boutique',
            icon: <Ihorloge fill={theme.colors.info[50]} />,
            childComponent: renderStoreHours(),
        },
        {
            title: 'Adresse de la boutique',
            icon: <Ihorloge fill={theme.colors.info[50]} />,
            childComponent: renderStoreAddress(),
        },
        {
            title: 'Site web et réseaux sociaux',
            icon: <Internet fill={theme.colors.info[50]} />,
            childComponent: renderSocialMedia(),
        },
        {
            title: 'Contact',
            icon: <Chat fill={theme.colors.info[50]} />,
            childComponent: renderContact(),
        },
    ];

    return (
        <View style={{ flex: 1 }}>
            <PageContainer
                backgroundColor={theme.colors.info[200]}
                style={{
                    flex: 1,
                }}
            >
                <View style={{ marginBottom: 100 }}>
                    <StoreDetailsCard />
                    <AccordionComponent sections={sections} />
                </View>
            </PageContainer>
            <ActionButtons
                conciergerie={true}
                itineraire={true}
                pressItineraire={() => {
                    openMap({
                        ...selectedStore,
                        title: selectedStore?.name,
                        latitude: selectedStore?.geolocation?.latitude,
                        longitude: selectedStore?.geolocation?.longitude,
                    });
                }}
            />
        </View>
    );
}

export default StoreDetails;
