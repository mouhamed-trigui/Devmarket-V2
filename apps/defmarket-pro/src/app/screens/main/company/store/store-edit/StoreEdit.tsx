import React, { useContext, useEffect, useState } from 'react';
import { Box, HStack, Skeleton, VStack } from 'native-base';
import { primary, system } from '../../../../../theme/colors';
import PageContainer from '../../../../../components/atomes/container/PageContainer';
import {
    FormControl,
    FormControlSelect,
    YesNoDialog,
} from '../../../../../components/molecules';
import { useIntl } from 'react-intl';
import {
    FileType,
    IStoreCategoryProps,
    IStoreProps,
    ITimetableProps,
} from '../../../../../services/model/company';
import { Button, Text } from '../../../../../components/atomes';
import { Dimensions, Image, Platform, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import {
    me,
    updateStore,
    updateStoreLogo,
} from '../../../../../services/methodes';
import { companyActions } from '../../../../../stores/slices/company/companySlice';
import { useNavigation } from '@react-navigation/native';
import InternetBlock from './InternetBlock';
import ContactBlock from './ContactBlock';
import {
    deleteStore,
    getStoreCategories,
    updateStoreCover,
} from '../../../../../services/methodes/store';
import { getFileURL } from '../../../../../services/constants/api';
import Title from '../../../../../components/molecules/store-title/Title';
import ImagePicker from '../../../../../components/organisms/image-picker/ImagePicker';
import AddressAutocomplete from '../../../../../components/molecules/address-autocomplete/AddressAutocomplete';
import PaymentMethod from '../../../../../components/molecules/payement-method/PaymentMethod';

// assets
import etiquettePng from '../../../../../../assets/images/png/etiquette-de-vente-blue.png';
import horlogePng from '../../../../../../assets/images/png/horloge.png';
import placePng from '../../../../../../assets/images/png/place.png';
import photoBluePng from '../../../../../../assets/images/png/photo-blue.png';
import photoWhitePng from '../../../../../../assets/images/png/photo-white.png';
import addBtnPng from '../../../../../../assets/images/png/bouton-ajouter-blue.png';
import editImage from '../../../../../../assets/images/png/modif.png';
import euroSignSVG from '../../../../../../assets/images/svg/euro-sign.svg';
import { SpinnerContext } from '../../../../../components/atomes/spinner/SpinnerProvider';
import Infodialog from '../../../../../components/molecules/dialog/info-dialog/Infodialog';

const UpdateStore = (props: any) => {
    const { formatMessage } = useIntl();

    const dispatch = useDispatch();

    const navigation = useNavigation();

    const { selectedStore } = useSelector((state: any) => state.company);

    const [store, setStore] = useState<IStoreProps>({
        ...selectedStore,
        categoryId: selectedStore?.category?.id ?? '',
    });

    const [storeCategories, setStoreCategories] = useState<
        IStoreCategoryProps[]
    >();

    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const onClose = () => setIsOpen(false);

    const { setSpinnerVisibily } = useContext(SpinnerContext);

    const [alert, setAlert] = React.useState<{
        open: boolean;
        title: string;
        msg: string;
    }>({
        open: false,
        title: '',
        msg: '',
    });

    useEffect(() => {
        // const storeType = selectedStore.eCommerceAndPhysicalStore
        //     ? 'PHYSICAL_AND_E_COMMERCE'
        //     : selectedStore.storeType;
        const storeType = 'PHYSICAL_AND_E_COMMERCE';
        getStoreCategories(storeType)
            .then((data) => {
                setStoreCategories(data);
            })
            .catch((err) => {
                console.error(err);
            });
        return () => {
            setStoreCategories(undefined);
        };
    }, [selectedStore.storeType]);

    const handleUpdateStoreCover = (fileToUpload?: FileType) => {
        if (fileToUpload) {
            updateStoreCover(selectedStore.id, fileToUpload)
                .then((data) =>
                    dispatch(
                        companyActions.setSelectedStore({
                            ...data,
                            companyId: selectedStore.companyId,
                        })
                    )
                )
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    const handleUpdateStoreLogo = (fileToUpload?: FileType) => {
        if (fileToUpload) {
            updateStoreLogo(selectedStore.id, fileToUpload)
                .then((data) =>
                    dispatch(
                        companyActions.setSelectedStore({
                            ...data,
                            companyId: selectedStore.companyId,
                        })
                    )
                )
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    const handleTimeTable = () => {
        let active = 0;
        // eslint-disable-next-line array-callback-return
        selectedStore?.timetables?.map((item: ITimetableProps) => {
            if (item.active === true) active++;
        });

        if (active === 0) {
            setAlert({
                open: true,
                title: 'INFORMATION',
                msg:
                    "Afin de finaliser la configuration de votre boutique, veuillez renseigner les horaires d'ouverture.",
            });
        } else {
            handleUpdate();
        }
    };

    const handleUpdate = () => {
        setSpinnerVisibily(true);
        updateStore(selectedStore.id, store)
            .then((data) => {
                dispatch(
                    companyActions.setSelectedStore({
                        ...data,
                        companyId: selectedStore.companyId,
                    })
                );
                me();
                setSpinnerVisibily(false);
                navigation.goBack();
            })
            .catch((err) => {
                console.error(err);
                setSpinnerVisibily(false);
                setAlert({
                    open: true,
                    title: 'Erreur!',
                    msg: 'Mise à jour de la boutique échouée.. ',
                });
            });
    };

    const handlePaymentMethodChange = (
        value: 'CASH' | 'CHECK' | 'CB',
        isSelected: boolean
    ) => {
        if (isSelected) {
            setStore((store) => ({
                ...store,
                paymentMethods: [
                    ...store.paymentMethods,
                    { name: value, condition: '' },
                ],
            }));
        } else {
            setStore((store) => ({
                ...store,
                paymentMethods: store.paymentMethods.filter(
                    (method) => method.name !== value
                ),
            }));
        }
    };

    const handleStoreDelete = (id: number) => {
        deleteStore(id)
            .then(() => props?.navigation?.replace('MyStructures'))
            .catch((error) => console.log(error));
    };
    return (
        <PageContainer backgroundColor="white" paddingY={0}>
            <Infodialog
                isOpen={alert.open}
                onClose={() => {
                    setAlert((old) => ({ ...old, open: false }));
                    handleUpdate();
                }}
                title={alert.title}
                body={alert.msg}
            />
            <YesNoDialog
                isOpen={isOpen}
                onClose={onClose}
                onPress={() => handleStoreDelete(store?.id)}
                title="Supprimer"
                body="Voulez-vous vraiment supprimer ce boutique ?"
            />
            <Box
                key="StoreImage"
                height={'120px'}
                backgroundColor={primary[50]}
                position="relative"
                justifyContent="center"
                alignItems="flex-end"
            >
                <ImagePicker
                    onChange={handleUpdateStoreCover}
                    value={getFileURL(store?.cover ?? '')}
                    style={{ width: '100%', height: '100%' }}
                    successOverView={
                        <Image
                            accessibilityLabel="successOverView image"
                            source={photoWhitePng}
                            style={{
                                alignSelf: 'flex-end',
                                marginTop: 45,
                                width: 25,
                                height: 25,
                                marginRight: 30,
                            }}
                            resizeMode="contain"
                        />
                    }
                >
                    <Image
                        accessibilityLabel="Store's cover image"
                        source={photoWhitePng}
                        style={{
                            alignSelf: 'flex-end',
                            marginTop: 45,
                            width: 25,
                            height: 25,
                            marginRight: 30,
                        }}
                        resizeMode="contain"
                    />
                </ImagePicker>

                <ImagePicker
                    onChange={handleUpdateStoreLogo}
                    value={getFileURL(store?.logo ?? '')}
                    style={{
                        transform: [{ translateX: -60 }],
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        bottom: -50,
                        left: '50%',
                        height: 120,
                        width: 120,
                        borderRadius: 120,
                        backgroundColor: system[300],
                        overflow: 'hidden',
                    }}
                >
                    <Image
                        accessibilityLabel="Store's image"
                        source={photoBluePng}
                        style={{ width: 25, height: 25 }}
                        resizeMode="contain"
                    />
                </ImagePicker>
            </Box>
            <Skeleton
                width={
                    Platform?.OS === 'web'
                        ? '300'
                        : Dimensions.get('window').width - 50
                }
                height={44}
                alignSelf="center"
                borderRadius={5}
                marginY={2}
                style={{ marginTop: 80 }}
                isLoaded={storeCategories !== undefined}
            >
                <FormControlSelect
                    isRequired
                    style={{ marginTop: 80 }}
                    color={primary[50]}
                    placeholder="Catégorie de commerce"
                    placeholderTextColor={primary[50]}
                    value={store?.categoryId?.toString()}
                    items={storeCategories?.map((item) => ({
                        label: item.name,
                        value: item.id.toString(),
                    }))}
                    onChange={(categoryId: string) =>
                        setStore((store) => ({
                            ...store,
                            categoryId: Number(categoryId),
                        }))
                    }
                />
            </Skeleton>
            <FormControl
                isRequired
                borderColor={primary[50]}
                type="input"
                placeholder={formatMessage({
                    id: 'IkT02s',
                    description: 'Nom de la boutique',
                    defaultMessage: 'Nom de la boutique',
                })}
                placeholderTextColor={primary[50]}
                helperText={null}
                value={store?.name}
                onChange={(value: string) =>
                    setStore((old) => ({ ...old, name: value }))
                }
            />
            <FormControl
                isRequired
                borderColor={primary[50]}
                type="textarea"
                placeholder={formatMessage({
                    id: 'IkT03s',
                    description: 'Description',
                    defaultMessage: 'Description',
                })}
                placeholderTextColor={primary[50]}
                helperText={null}
                value={store?.description}
                onChange={(value: string) =>
                    setStore((old) => ({ ...old, description: value }))
                }
            />

            <VStack key="V-offer" marginTop={8} space={1}>
                <Box
                    key="offer"
                    backgroundColor={system[300]}
                    paddingX={5}
                    paddingY={8}
                >
                    <HStack justifyContent="space-between" alignItems="center">
                        <Title icon={etiquettePng} title="Ajoute des offres" />
                        <TouchableOpacity
                            onPress={() => navigation.navigate('AddOffer')}
                        >
                            <Image
                                accessibilityLabel="add offers"
                                source={addBtnPng}
                                style={{ width: 25, height: 25 }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </HStack>
                </Box>

                <Box
                    key="payementMethods"
                    backgroundColor={system[300]}
                    paddingX={5}
                    paddingY={8}
                >
                    <Title
                        icon={euroSignSVG}
                        isSvg
                        title="Configure tes moyens de paiement"
                    />
                    <VStack space={2} marginTop={2}>
                        <PaymentMethod
                            key="CASH"
                            methodName="CASH"
                            translate="Espèces"
                            defaultValue={
                                store.paymentMethods.find(
                                    (method) => method.name === 'CASH'
                                ) !== undefined
                            }
                            defaultCondition={
                                store.paymentMethods.find(
                                    (method) => method.name === 'CASH'
                                )?.condition ?? ''
                            }
                            onCheckChange={(checked) =>
                                handlePaymentMethodChange('CASH', checked)
                            }
                            onConditionChange={(condition: string) =>
                                setStore((old) => ({
                                    ...old,
                                    paymentMethods: old.paymentMethods.map(
                                        (method) =>
                                            method.name === 'CASH'
                                                ? {
                                                      ...method,
                                                      condition,
                                                  }
                                                : method
                                    ),
                                }))
                            }
                        />
                        <PaymentMethod
                            key="CB"
                            methodName="CB"
                            translate="Carte bleue"
                            defaultValue={
                                store.paymentMethods.find(
                                    (method) => method.name === 'CB'
                                ) !== undefined
                            }
                            defaultCondition={
                                store.paymentMethods.find(
                                    (method) => method.name === 'CB'
                                )?.condition ?? ''
                            }
                            onCheckChange={(checked) =>
                                handlePaymentMethodChange('CB', checked)
                            }
                            onConditionChange={(condition: string) =>
                                setStore((old) => ({
                                    ...old,
                                    paymentMethods: old.paymentMethods.map(
                                        (method) =>
                                            method.name === 'CB'
                                                ? {
                                                      ...method,
                                                      condition,
                                                  }
                                                : method
                                    ),
                                }))
                            }
                        />
                        <PaymentMethod
                            key="CHECK"
                            methodName="CHECK"
                            translate="Chèques"
                            defaultValue={
                                store.paymentMethods.find(
                                    (method) => method.name === 'CHECK'
                                ) !== undefined
                            }
                            defaultCondition={
                                store.paymentMethods.find(
                                    (method) => method.name === 'CHECK'
                                )?.condition ?? ''
                            }
                            onCheckChange={(checked) =>
                                handlePaymentMethodChange('CHECK', checked)
                            }
                            onConditionChange={(condition: string) =>
                                setStore((old) => ({
                                    ...old,
                                    paymentMethods: old.paymentMethods.map(
                                        (method) =>
                                            method.name === 'CHECK'
                                                ? {
                                                      ...method,
                                                      condition,
                                                  }
                                                : method
                                    ),
                                }))
                            }
                        />
                    </VStack>
                </Box>

                <Box
                    key="B-timetable"
                    backgroundColor={system[300]}
                    paddingX={5}
                    paddingY={8}
                >
                    <HStack
                        key="H-timetable"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Title
                            icon={horlogePng}
                            title="Configure tes horaires"
                        />
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('UpdateStoreTimetable')
                            }
                        >
                            <Image
                                accessibilityLabel="configure openning hours"
                                source={editImage}
                                style={{ width: 25, height: 25 }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </HStack>
                </Box>
                <Box
                    key="placePng"
                    backgroundColor={system[300]}
                    paddingX={5}
                    paddingY={8}
                >
                    <Title
                        icon={placePng}
                        title="Configure l'adresse de la boutique"
                    />
                    <AddressAutocomplete
                        isRequired={
                            selectedStore.eCommerceAndPhysicalStore ||
                            selectedStore?.storeType === 'PHYSICAL'
                        }
                        inputColor={primary[50]}
                        onChange={{
                            onStreetChange: (value: string) =>
                                setStore((old) => ({
                                    ...old,
                                    address: { ...old.address, street: value },
                                })),
                            onPostalCodeChange: (value: string) =>
                                setStore((old) => ({
                                    ...old,
                                    address: { ...old.address, zipCode: value },
                                })),
                            onDepartmentChange: (value: string) =>
                                setStore((old) => ({
                                    ...old,
                                    address: {
                                        ...old.address,
                                        department: value,
                                    },
                                })),
                            onCityChange: (value: string) =>
                                setStore((old) => ({
                                    ...old,
                                    address: {
                                        ...old.address,
                                        city: value,
                                    },
                                })),
                            onCoordinatesChange: (coordinates) =>
                                setStore((old) => ({
                                    ...old,
                                    geolocation: {
                                        latitude: coordinates.lat,
                                        longitude: coordinates.lon,
                                    },
                                })),
                        }}
                        values={{
                            street: store?.address?.street ?? '',
                            postalCode: store?.address?.zipCode ?? '',
                            city: store?.address?.city ?? '',
                            department: store?.address?.department ?? '',
                        }}
                        visibleFields={{
                            street: true,
                            postalCode: true,
                            city: true,
                        }}
                    />

                    {Platform.OS !== 'web' && (
                        <>
                            <Text
                                // width="100%"
                                style={{
                                    alignSelf: 'flex-start',
                                    marginLeft: -3,
                                    padding: 8,
                                }}
                                color="system.50"
                            >
                                Localisation sur la carte
                            </Text>
                            <MapView
                                provider={PROVIDER_GOOGLE}
                                minZoomLevel={15}
                                region={{
                                    longitude:
                                        store?.geolocation?.longitude ??
                                        2.2769953,
                                    latitude:
                                        store?.geolocation?.latitude ??
                                        48.8589466,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                                initialRegion={{
                                    latitude: 48.8589466,
                                    longitude: 2.2769953,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                                style={{
                                    width: Dimensions.get('window').width - 50,
                                    height: 150,
                                    alignSelf: 'center',
                                    borderRadius: 20,
                                    overflow: 'hidden',
                                }}
                                onPress={(e) => {
                                    const geolocation =
                                        e?.nativeEvent?.coordinate;
                                    if (geolocation) {
                                        setStore((old) => ({
                                            ...old,
                                            geolocation,
                                        }));
                                    }
                                }}
                                showsPointsOfInterest={true}
                            >
                                {store?.geolocation && (
                                    <Marker
                                        coordinate={store?.geolocation}
                                        draggable
                                        onDragEnd={(e) => {
                                            const geolocation =
                                                e?.nativeEvent?.coordinate;
                                            if (geolocation) {
                                                setStore((old) => ({
                                                    ...old,
                                                    geolocation,
                                                }));
                                            }
                                        }}
                                    />
                                )}
                            </MapView>
                        </>
                    )}
                </Box>
                <InternetBlock
                    isRequired={
                        selectedStore.eCommerceAndPhysicalStore ||
                        selectedStore?.storeType === 'E_COMMERCE'
                    }
                    store={store}
                    setStore={setStore}
                />
                <ContactBlock store={store} setStore={setStore} />
            </VStack>
            <VStack key="deleteStore" marginBottom={5} marginTop={5} space={5}>
                <Button
                    onPress={() => setIsOpen(true)}
                    variant="solid"
                    backgroundColor="secondary.100"
                    label="Supprimer la boutique"
                    alignSelf="center"
                    width={
                        Platform?.OS === 'web'
                            ? '300'
                            : Dimensions.get('window').width - 50
                    }
                    maxWidth={
                        Platform?.OS === 'web'
                            ? '300'
                            : Dimensions.get('window').width - 50
                    }
                />

                <Button
                    onPress={handleTimeTable}
                    variant="solid"
                    label="Mettre à jour"
                    alignSelf="center"
                    width={
                        Platform?.OS === 'web'
                            ? '300'
                            : Dimensions.get('window').width - 50
                    }
                    moreParams={{
                        disabled: selectedStore.eCommerceAndPhysicalStore
                            ? !store?.categoryId ||
                              !store?.name ||
                              !store?.description ||
                              !store?.address ||
                              store?.website?.value === ''
                            : selectedStore?.storeType === 'PHYSICAL'
                            ? !store?.categoryId ||
                              !store?.name ||
                              !store?.description ||
                              !store?.address
                            : !store?.categoryId ||
                              !store?.name ||
                              !store?.description ||
                              store?.website?.value === '',
                    }}
                    maxWidth={
                        Platform?.OS === 'web'
                            ? '300'
                            : Dimensions.get('window').width - 50
                    }
                />
            </VStack>
        </PageContainer>
    );
};

export default UpdateStore;
