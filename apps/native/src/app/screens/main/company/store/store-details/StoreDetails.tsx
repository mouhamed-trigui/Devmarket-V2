import React, { useEffect } from 'react';
import PageContainer from '../../../../../components/atomes/container/PageContainer';
import { Text } from '../../../../../components/atomes';
import Card from '../../../../../components/atomes/card/Card';
import {
    Box,
    Button,
    Center,
    HStack,
    Icon,
    VStack,
    Image as ImageNB,
} from 'native-base';
import { alerts, primary, system } from '../../../../../theme/colors';
import {
    Image,
    Platform,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { getStore } from '../../../../../services/methodes';
import {
    IStoreOfCompanyProps,
    ITimetableProps,
} from '../../../../../services/model/company';
import { companyActions } from '../../../../../stores/slices/company/companySlice';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { getSocialMediaIconName } from '../store-edit/InternetBlock';
import { Ionicons } from '@expo/vector-icons';
import { getFileURL } from '../../../../../services/constants/api';
import Title from '../../../../../components/molecules/store-title/Title';
import {
    getAllTimetableOfStore,
    toggleStoreVisibility,
} from '../../../../../services/methodes/store';
import QRCode from 'react-native-qrcode-svg';

//assets
import etiquettePng from '../../../../../../assets/images/png/etiquette-de-vente-blue.png';
import horlogePng from '../../../../../../assets/images/png/horloge.png';
import placePng from '../../../../../../assets/images/png/place.png';
import internetPng from '../../../../../../assets/images/png/internet.png';
import chatPng from '../../../../../../assets/images/png/chat.png';
import QRcodePng from '../../../../../../assets/images/png/QRcode.png';
import plus from '../../../../../../assets/images/png/plus.png';
import CbSVG from '../../../../../../assets/images/svg/cb.svg';
import ChequesSVG from '../../../../../../assets/images/svg/cheques.svg';
import EspeceSVG from '../../../../../../assets/images/svg/especes.svg';
import EuroSignSVG from '../../../../../../assets/images/svg/euro-sign.svg';
import logoDefMarket from '../../../../../../assets/images/png/logoDefMarket.png';

const days = [
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY',
];

const StoreDetails = (props: any) => {
    const { formatMessage } = useIntl();
    const navigation = useNavigation();
    const { user } = useSelector((state: any) => state);

    const dispatch = useDispatch();
    const { selectedStore } = useSelector((state: any) => state.company);

    const store = React.useMemo<IStoreOfCompanyProps>(() => selectedStore, [
        selectedStore,
    ]);

    useEffect(() => {
        const fetchData = async () => {
            await getStore(selectedStore.id)
                .then((data) =>
                    dispatch(
                        companyActions.setSelectedStore({
                            ...data,
                            companyId: selectedStore.companyId,
                        })
                    )
                )
                .catch((err) => console.error(err));

            await getAllTimetableOfStore(selectedStore.id)
                .then((data) =>
                    dispatch(
                        companyActions.setSelectedStoreTimetables(
                            days.map(
                                (day) =>
                                    data.find((item) => item.day === day) ??
                                    ({ day } as ITimetableProps)
                            )
                        )
                    )
                )
                .catch((err) => console.log(err));
        };
        fetchData();
    }, [dispatch, selectedStore.companyId, selectedStore.id]);

    const handleVisibilityToggle = () => {
        toggleStoreVisibility(selectedStore.id)
            .then((data) => {
                dispatch(
                    companyActions.setSelectedStore({
                        ...selectedStore,
                        visible: data?.visible,
                    })
                );
            })
            .catch((err) => console.error(err));
    };

    return (
        <>
            <PageContainer paddingY={0}>
                {!user?.user?.completeRegistration?.storeCompleted && (
                    <Card
                        key={'storeNotCompletedCard'}
                        style={{
                            alignSelf: 'center',
                            marginBottom: 20,
                            marginTop: 5,
                        }}
                        width="90%"
                        action={{
                            text: 'GO !',
                            backgroundColor: '#eaae00',
                            onPress: () => {
                                let active = 0;
                                // eslint-disable-next-line array-callback-return
                                selectedStore?.timetables?.map(
                                    (item: ITimetableProps) => {
                                        if (item.active === true) active++;
                                    }
                                );
                                if (active === 0) {
                                    navigation.navigate('UpdateStoreTimetable');
                                } else {
                                    navigation.navigate('UpdateStore');
                                }
                            },
                        }}
                    >
                        <HStack key="store-infor" space={2} marginTop="2">
                            <VStack key="store-detail" flexShrink={1}>
                                <Text
                                    key="Config-Store"
                                    bold
                                    fontSize="dm-h2"
                                    textAlign="left"
                                    fontFamily="mono"
                                    color="#003753"
                                >
                                    {formatMessage({
                                        id: 'STDTS1',
                                        description:
                                            'Configuration de la boutique',
                                        defaultMessage:
                                            'Configuration de la boutique',
                                    })}
                                </Text>
                                <Text
                                    key="Config-Store-1"
                                    textAlign="left"
                                    color="#003753"
                                >
                                    {formatMessage({
                                        id: 'STDTS2',
                                        description:
                                            'Configure ta boutique sur cet écran et ajoute des offres !',
                                        defaultMessage:
                                            'Configure ta boutique sur cet écran et ajoute des offres !',
                                    })}
                                </Text>
                            </VStack>
                            <Box
                                alignSelf="center"
                                justifyContent="center"
                                backgroundColor="#003753"
                                borderRadius={70}
                                minWidth={70}
                                height={70}
                                key="config-store-percent"
                            >
                                <Center key={'center'}>
                                    <Text
                                        key="percentage"
                                        color="white"
                                        fontSize="dm-h2"
                                        fontFamily="mono"
                                    >
                                        {
                                            user?.user
                                                ?.completeRegistrationPercentage
                                        }
                                    </Text>
                                </Center>
                            </Box>
                        </HStack>
                    </Card>
                )}
                {selectedStore?.blocked === true ? (
                    <Text
                        key="validation-progress"
                        color={alerts[100]}
                        textAlign="center"
                        fontFamily="body"
                        style={{
                            letterSpacing: 1,
                            backgroundColor: alerts[100] + '14',
                            padding: 10,
                        }}
                    >
                        {formatMessage({
                            id: 'STDTb1',
                            description: 'Boutique Bloquée',
                            defaultMessage: 'Boutique Bloquée',
                        })}
                    </Text>
                ) : selectedStore?.validatedByAdmin === false ? (
                    <Text
                        key="validation-progress"
                        color={alerts[100]}
                        textAlign="center"
                        fontFamily="body"
                        style={{
                            letterSpacing: 1,
                            backgroundColor: alerts[100] + '14',
                            padding: 10,
                        }}
                    >
                        {formatMessage({
                            id: 'STDTS3',
                            description: 'Validation de la boutique en cours',
                            defaultMessage:
                                'Validation de la boutique en cours',
                        })}
                    </Text>
                ) : selectedStore?.temporaryClosure &&
                  selectedStore?.temporaryClosure?.closureType ? (
                    <VStack key="store-close-information">
                        <Text
                            key="close-info"
                            color={alerts[100]}
                            textAlign="center"
                            fontFamily="bold"
                            bold
                            style={{
                                backgroundColor: alerts[100] + '14',
                                paddingHorizontal: 10,
                                paddingTop: 10,
                            }}
                        >
                            <FormattedMessage
                                key={'temporaryClosure'}
                                id={
                                    selectedStore?.temporaryClosure?.closureType
                                }
                            />
                        </Text>
                        <Text
                            key="close-reason"
                            color={alerts[100]}
                            textAlign="center"
                            fontFamily="body"
                            style={{
                                backgroundColor: alerts[100] + '14',
                                paddingHorizontal: 10,
                                paddingBottom: 10,
                            }}
                        >
                            {selectedStore?.temporaryClosure?.reason}
                        </Text>
                    </VStack>
                ) : (
                    <></>
                )}

                <Box
                    key="store-cover"
                    height={'120px'}
                    backgroundColor={primary[50]}
                    position="relative"
                >
                    {selectedStore?.cover && (
                        <Image
                            key={'store-cover'}
                            accessibilityLabel="store-cover"
                            source={{
                                uri: getFileURL(selectedStore?.cover?.id),
                            }}
                            style={{ width: '100%', height: '100%' }}
                        />
                    )}
                    <Box
                        key="store-logo"
                        position="absolute"
                        bottom={-50}
                        left="50%"
                        style={{ transform: [{ translateX: -60 }] }}
                        height="120px"
                        width="120px"
                        borderRadius={120}
                        borderColor={system[300]}
                        borderWidth={1.5}
                        backgroundColor={system[200]}
                        overflow="hidden"
                    >
                        {selectedStore?.logo && (
                            <Image
                                key={'logo-store'}
                                accessibilityLabel="logo-store"
                                source={{
                                    uri: getFileURL(selectedStore?.logo?.id),
                                }}
                                style={{ width: '100%', height: '100%' }}
                            />
                        )}
                    </Box>
                </Box>
                <Button
                    key={'VisibilityButton'}
                    variant="outline"
                    width="100px"
                    colorScheme="dark"
                    backgroundColor="white"
                    borderColor="#e8e8e8"
                    marginTop="10px"
                    marginRight="10px"
                    alignSelf="flex-end"
                    onPress={handleVisibilityToggle}
                    leftIcon={
                        <Icon
                            key={'VisibilityIcon'}
                            as={
                                <Ionicons
                                    name={
                                        selectedStore.visible
                                            ? 'eye'
                                            : 'eye-off'
                                    }
                                />
                            }
                            size="sm"
                        />
                    }
                >
                    <Text key="visiblity" color={system[50]}>
                        {selectedStore.visible ? 'Visible' : 'Invisible'}
                    </Text>
                </Button>
                <Text
                    key="store-name"
                    color={system[50]}
                    style={{ marginTop: 10 }}
                    textAlign="center"
                    fontFamily="body"
                    fontSize={22}
                >
                    {selectedStore?.name}
                </Text>
                <Text
                    key="store-description"
                    width="80%"
                    italic={true}
                    color={system[50]}
                    style={{
                        marginTop: 10,
                        alignSelf: 'center',
                        overflow: 'hidden',
                    }}
                    textAlign="center"
                    numberOfLines={4}
                >
                    {[undefined, ''].includes(selectedStore?.description)
                        ? 'Ajouter une description'
                        : selectedStore?.description}
                </Text>
                <VStack key="store-offer-list" marginTop={4} space={1}>
                    <TouchableOpacity
                        key={'TouchableOpacityOfferList'}
                        onPress={() =>
                            props?.navigation.navigate('OfferList', {
                                store,
                            })
                        }
                    >
                        <Box
                            key="store-offers-nbr"
                            backgroundColor={system[300]}
                            paddingX={5}
                            paddingY={8}
                        >
                            <Title
                                key={'StoreOffersTitle'}
                                icon={etiquettePng}
                                title={`Offres de la boutique (${store.offerNbr})`}
                                chevron={true}
                            />
                        </Box>
                    </TouchableOpacity>
                    <Box
                        key="payment-methods"
                        backgroundColor={system[300]}
                        paddingX={5}
                        paddingY={8}
                    >
                        <Title
                            key={'StorePaymentMethodTitle'}
                            icon={<EuroSignSVG width={30} height={30} />}
                            isSvg
                            title="Moyens de paiement acceptés"
                        />
                        {Platform.OS !== 'web' && (
                            <HStack
                                key="H-5"
                                space={5}
                                marginLeft={47}
                                marginTop={2}
                            >
                                {store?.paymentMethods?.map((method, index) => {
                                    switch (method.name) {
                                        case 'CB':
                                            return <CbSVG key={'CbSVG'} />;
                                        case 'CHECK':
                                            return (
                                                <ChequesSVG
                                                    key={'ChequesSVG'}
                                                />
                                            );
                                        default:
                                            return (
                                                <EspeceSVG key={'EspeceSVG'} />
                                            );
                                    }
                                })}
                            </HStack>
                        )}
                    </Box>
                    <TouchableOpacity
                        key={'TouchableOpacityUpdateStoreTimetable'}
                        onPress={() =>
                            props?.navigation.navigate('UpdateStoreTimetable')
                        }
                    >
                        <Box
                            key="store-time-day"
                            backgroundColor={system[300]}
                            paddingX={5}
                            paddingY={8}
                        >
                            <Title
                                key={'StoreHoursTitle'}
                                icon={horlogePng}
                                title="Horaires de la boutique"
                                chevron={true}
                            />
                            <Box key="timetables-day" marginX={47}>
                                {store?.timetables?.map((day, index) => (
                                    <VStack
                                        key={`timetables-${index}`}
                                        marginTop={2}
                                    >
                                        <HStack
                                            key={`day-${index}`}
                                            justifyContent="space-between"
                                        >
                                            <Text
                                                key={`days-${index}`}
                                                color={system[50]}
                                            >
                                                <FormattedMessage
                                                    key={`FormattedMessage-${index}`}
                                                    id={day.day}
                                                />
                                                {' :'}
                                            </Text>
                                            {day.workingTime &&
                                            day.workingTime.length > 0 ? (
                                                <HStack
                                                    key={`workTime-${index}`}
                                                    space={5}
                                                >
                                                    <Text
                                                        key={`day-workTime-${index}`}
                                                        color={
                                                            day.active
                                                                ? system[50]
                                                                : system[50] +
                                                                  '1b'
                                                        }
                                                        fontFamily="mono"
                                                    >
                                                        {
                                                            day.workingTime[0]
                                                                .start
                                                        }
                                                    </Text>
                                                    <Text
                                                        key={`workTIme-day-end-${index}`}
                                                        color={
                                                            day.active
                                                                ? system[50]
                                                                : system[50] +
                                                                  '1b'
                                                        }
                                                        fontFamily="mono"
                                                    >
                                                        {day.workingTime[0].end}
                                                    </Text>
                                                </HStack>
                                            ) : (
                                                <Text
                                                    key={`closed-${index}`}
                                                    color={system[50]}
                                                    fontFamily="mono"
                                                >
                                                    Fermé
                                                </Text>
                                            )}
                                        </HStack>
                                        {day.workingTime?.map(
                                            (workingTime, i) =>
                                                i > 0 ? (
                                                    <HStack
                                                        key={`workingTime-${i}`}
                                                        space={5}
                                                        alignSelf="flex-end"
                                                    >
                                                        <Text
                                                            key={`start-${i}`}
                                                            color="system.50"
                                                            fontFamily="mono"
                                                        >
                                                            {workingTime.start}
                                                        </Text>
                                                        <Text
                                                            key={`end-${i}`}
                                                            color="system.50"
                                                            fontFamily="mono"
                                                        >
                                                            {workingTime.end}
                                                        </Text>
                                                    </HStack>
                                                ) : null
                                        )}
                                    </VStack>
                                ))}
                            </Box>
                        </Box>
                    </TouchableOpacity>
                    <Box
                        key={2}
                        backgroundColor={system[300]}
                        paddingX={5}
                        paddingY={8}
                    >
                        <Title
                            key={'storeAdressTitle'}
                            icon={placePng}
                            title="Adresse de la boutique"
                        />
                        <Box key={4} marginLeft={47}>
                            {store?.address && (
                                <Text key={'Storeaddress'} color={system[50]}>
                                    {Object.values(store?.address).join(' ')}
                                </Text>
                            )}
                            {store?.geolocation && Platform.OS !== 'web' && (
                                <MapView
                                    key={'MapView'}
                                    provider={PROVIDER_GOOGLE}
                                    minZoomLevel={15}
                                    initialRegion={
                                        store?.geolocation && {
                                            latitude:
                                                store?.geolocation?.latitude,
                                            longitude:
                                                store?.geolocation?.longitude,
                                            latitudeDelta: 0.0922,
                                            longitudeDelta: 0.0421,
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
                                        coordinate={
                                            store?.geolocation && {
                                                latitude:
                                                    store?.geolocation
                                                        ?.latitude,
                                                longitude:
                                                    store?.geolocation
                                                        ?.longitude,
                                            }
                                        }
                                    />
                                </MapView>
                            )}
                        </Box>
                    </Box>
                    <Box
                        key={5}
                        backgroundColor={system[300]}
                        paddingX={5}
                        paddingY={8}
                    >
                        <Title
                            key={'storeSocialTitle'}
                            icon={internetPng}
                            title={`Site web et réseaux sociaux (${
                                (store?.socialMedia?.length ?? 0) +
                                (['', null, undefined].includes(
                                    store?.website?.value
                                )
                                    ? 0
                                    : 1)
                            })`}
                        />
                        <Box key={6} marginLeft={47}>
                            <Text key="store-web" color={primary[50]}>
                                {store?.website?.value}
                            </Text>
                            {store?.socialMedia?.map((media, index) => (
                                <HStack
                                    key={`socialMedia-${index}`}
                                    alignItems="center"
                                >
                                    <Icon
                                        key={`socialMediaIcon-${index}`}
                                        as={
                                            <Ionicons
                                                key={`socialMediaIonicons-${index}`}
                                                name={getSocialMediaIconName(
                                                    media.type.toLowerCase()
                                                )}
                                                size={20}
                                                color={primary[50]}
                                                style={{
                                                    paddingHorizontal: 5,
                                                }}
                                            />
                                        }
                                        size={5}
                                    />
                                    <Text
                                        key={`media-value-${index}`}
                                        color={primary[50]}
                                    >
                                        {media.value}
                                    </Text>
                                </HStack>
                            ))}
                        </Box>
                    </Box>
                    <Box
                        key={4}
                        backgroundColor={system[300]}
                        paddingX={5}
                        paddingY={8}
                    >
                        <Title
                            key={'storeContactTitle'}
                            icon={chatPng}
                            title={`Contact (${
                                (store?.phoneList?.length ?? 0) +
                                (['', null, undefined].includes(store?.email)
                                    ? 0
                                    : 1)
                            })`}
                        />
                        <Box key={7} marginLeft={47}>
                            <Text key="email" color={primary[50]}>
                                {store?.email}
                            </Text>
                            {store?.phoneList?.map((phone, index) => (
                                <HStack
                                    key={`phoneList-${index}`}
                                    alignItems="center"
                                >
                                    <Text
                                        key={`store-phone-${index}`}
                                        color={primary[50]}
                                    >
                                        {phone?.prefix + ' ' + phone?.number}
                                    </Text>
                                </HStack>
                            ))}
                        </Box>
                    </Box>
                </VStack>
                {/*  <Text
                    color={system[50]}
                    fontSize="dm-h1"
                    textAlign="center"
                    style={{ marginVertical: 20 }}
                >
                    {formatMessage({
                        id: 'STDTS4',
                        description: 'QR Code',
                        defaultMessage: 'QR Code',
                    })}
                </Text>
                {user?.user?.completeRegistration?.storeCompleted ? (
                    <HStack
                        position="relative"
                        alignSelf="center"
                        borderWidth={2}
                        borderColor={alerts[50]}
                        padding={2}
                    >
                        <Image
                            source={logoDefMarket}
                            resizeMode="contain"
                            style={{
                                width: 100,
                                height: 100,
                                marginRight: 10,
                            }}
                        />
                        <QRCode
                            value={`exp://127.0.0.1:19000/--/StoreInfo/${store.id}`}
                        />
                        <Box
                            key='Box11'
                            position="absolute"
                            left={5}
                            right={5}
                            top={-2}
                            height={2}
                            backgroundColor="white"
                        />
                        <Box
                            key='Box12'
                            position="absolute"
                            left={5}
                            right={5}
                            bottom={-2}
                            height={2}
                            backgroundColor="white"
                        />
                        <Box
                            key='Box13'
                            position="absolute"
                            top={5}
                            bottom={5}
                            left={-2}
                            width={2}
                            backgroundColor="white"
                        />
                        <Box
                            key='Box14'
                            position="absolute"
                            top={5}
                            bottom={5}
                            right={-2}
                            width={2}
                            backgroundColor="white"
                        />
                    </HStack>
                ) : (
                    <>
                        <Image
                            source={QRcodePng}
                            style={{
                                width: 240,
                                height: 120,
                                opacity: 0.3,
                                alignSelf: 'center',
                            }}
                            resizeMode="contain"
                        />
                        <Text
                            color={system[50]}
                            textAlign="center"
                            style={{
                                marginTop: 20,
                                maxWidth: 240,
                                alignSelf: 'center',
                            }}
                        >
                            {formatMessage({
                                id: 'STDTS5',
                                description:
                                    'Pour générer un QR Code à afficher sur ta structure, merci de configurer la boutique.',
                                defaultMessage:
                                    'Pour générer un QR Code à afficher sur ta structure, merci de configurer la boutique.',
                            })}
                        </Text>
                    </>
                )}
 */}
                <Box key="B-margin" marginBottom={10} />
            </PageContainer>
            <TouchableWithoutFeedback
                key={'TouchableWithoutFeedbackAddOffer'}
                onPress={() => navigation.navigate('AddOffer')}
            >
                <ImageNB
                    key={'ImageNB'}
                    source={plus}
                    alt="plus"
                    height={20}
                    width={20}
                    position="absolute"
                    right={0}
                    bottom={0}
                />
            </TouchableWithoutFeedback>
        </>
    );
};

export default StoreDetails;
