import React, { useMemo } from 'react';
import { Dimensions, Image, Platform, TouchableOpacity } from 'react-native';
import { Text } from '../../../../../components/atomes';
import { Badge, Box, Center, HStack, Icon, VStack } from 'native-base';
import PageContainer from '../../../../../components/atomes/container/PageContainer';
import traceImage from '../../../../../../assets/images/png/Trace.png';
import SolidImage from '../../../../../../assets/images/png/Solid.png';
import ReductionCard from '../../../../../components/atomes/offer-card/ReductionCard';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { alerts, system } from '../../../../../theme/colors';
import { getFileURL } from '../../../../../services/constants/api';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { FormattedMessage, useIntl } from 'react-intl';

// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';
// Info dialog
import Infodialog from '../../../../../components/molecules/dialog/info-dialog/Infodialog';
import { Ionicons } from '@expo/vector-icons';

const OffreDetails = () => {
    const { formatMessage } = useIntl();

    // redux
    const { selectedOffer } = useSelector((state: any) => state.company);

    // state Info dialog
    const [alert, setAlert] = React.useState<{ open: boolean; msg: string }>({
        open: false,
        msg: '',
    });

    //use memo
    const symbol = useMemo(
        () =>
            selectedOffer !== undefined
                ? selectedOffer.offerType === 'PERCENTAGE'
                    ? '%'
                    : '€'
                : '',
        [selectedOffer?.offerType]
    );

    const downloadFileOffer = async (file: any) => {
        const perm = await MediaLibrary.requestPermissionsAsync();
        //const perm = await MediaLibrary.getPermissionsAsync(); //it works also
        if (perm.status !== 'granted') {
            return;
        }
        const accessToken = await AsyncStorage.getItem('@Access_Token');
        const url = getFileURL(file, true);

        const path = url.split('/');
        const file_name = path[path.length - 1];
        FileSystem.downloadAsync(
            url,
            FileSystem.documentDirectory + file_name,
            {
                headers: { Authorization: 'Bearer ' + accessToken },
            }
        )
            .then(({ uri }) => {
                MediaLibrary.createAssetAsync(uri)
                    .then((asset) => {
                        MediaLibrary.createAlbumAsync('Defmarket-Pro', asset)
                            .then(() => {
                                setAlert({
                                    open: true,
                                    msg: formatMessage({
                                        id: 'DownS1',
                                        description:
                                            'Téléchargement avec succès',
                                        defaultMessage:
                                            'Téléchargement avec succès',
                                    }),
                                });
                            })
                            .catch((error) => {
                                setAlert({
                                    open: true,
                                    msg: formatMessage({
                                        id: 'DownF1',
                                        description: 'Téléchargement a échoué',
                                        defaultMessage:
                                            'Téléchargement a échoué',
                                    }),
                                });
                            });
                    })
                    .catch((error) => {
                        setAlert({
                            open: true,
                            msg: formatMessage({
                                id: 'DownF1',
                                description: 'Téléchargement a échoué',
                                defaultMessage: 'Téléchargement a échoué',
                            }),
                        });
                    });
            })
            .catch((error) => {
                console.error(error);
                setAlert({
                    open: true,
                    msg: formatMessage({
                        id: 'DownF1',
                        description: 'Téléchargement a échoué',
                        defaultMessage: 'Téléchargement a échoué',
                    }),
                });
            });
    };

    const attachedFileName = React.useMemo(() => {
        if (selectedOffer?.attachedFile) {
            const path = selectedOffer.attachedFile.split('/');
            const file_name = path[path.length - 1];
            return file_name;
        }
        return undefined;
    }, [selectedOffer?.attachedFile]);

    return (
        <PageContainer backgroundColor="system.300">
            <Infodialog
                isOpen={alert.open}
                onClose={() => setAlert((old) => ({ ...old, open: false }))}
                title="Téléchargement"
                body={alert.msg}
            />
            <Box
                alignSelf="center"
                justifyContent="center"
                borderRadius={50}
                minWidth={70}
                height={70}
                // backgroundColor="system.100"
            >
                <Center>
                    <Text
                        color="system.50"
                        fontSize={22}
                        bold={true}
                        fontFamily="mono"
                    >
                        {selectedOffer?.title?.substring(0, 2).toUpperCase()}
                    </Text>
                </Center>
            </Box>
            <HStack
                justifyContent="center"
                minWidth={
                    Platform?.OS === 'web'
                        ? '300'
                        : Dimensions.get('window').width - 50
                }
                maxWidth={
                    Platform?.OS === 'web'
                        ? '300'
                        : Dimensions.get('window').width - 50
                }
                space={2}
                marginTop={5}
                marginBottom={4}
                alignSelf="center"
            >
                <Badge
                    style={{
                        backgroundColor: 'system.300',
                        borderWidth: 0.2,
                        borderColor: 'system.100',
                        borderRadius: 5,
                    }}
                >
                    <Text color="system.50">
                        {selectedOffer?.offerCategory === 'PHYSICAL'
                            ? formatMessage({
                                  id: 'spT09s',
                                  description: 'Offre physique',
                                  defaultMessage: 'Offre physique',
                              })
                            : selectedOffer?.offerCategory === 'E_COMMERCE'
                            ? formatMessage({
                                  id: 'ecT15s',
                                  description: 'Offre e-commerce',
                                  defaultMessage: 'Offre e-commerce',
                              })
                            : ''}
                    </Text>
                </Badge>

                <Badge
                    style={{
                        backgroundColor: 'system.300',
                        borderWidth: 0.2,
                        borderColor: 'system.100',
                        borderRadius: 5,
                    }}
                >
                    <Text color="system.50">
                        {selectedOffer?.themeType === 'NOEL'
                            ? formatMessage({
                                  id: 'NOEL',
                                  description: 'Noël',
                                  defaultMessage: 'Noël',
                              })
                            : selectedOffer?.themeType === 'HALLOWEEN'
                            ? formatMessage({
                                  id: 'HALLOWEEN',
                                  description: 'Halloween',
                                  defaultMessage: 'Halloween',
                              })
                            : selectedOffer?.themeType === 'PAQUES'
                            ? formatMessage({
                                  id: 'PAQUES',
                                  description: 'Paques',
                                  defaultMessage: 'Paques',
                              })
                            : selectedOffer?.themeType === 'TOUSSAINT'
                            ? formatMessage({
                                  id: 'TOUSSAINT',
                                  description: 'Toussaint',
                                  defaultMessage: 'Toussaint',
                              })
                            : selectedOffer?.themeType === 'PROMO_FALSH'
                            ? formatMessage({
                                  id: 'PROMO_FALSH',
                                  description: 'Promo Flash',
                                  defaultMessage: 'Promo Flash',
                              })
                            : selectedOffer?.themeType === 'BLACK_FRIDAY'
                            ? formatMessage({
                                  id: 'BLACK_FRIDAY',
                                  description: 'Black Friday',
                                  defaultMessage: 'Black Friday',
                              })
                            : selectedOffer?.themeType === 'MOTHER_PARTY'
                            ? formatMessage({
                                  id: 'MOTHER_PARTY',
                                  description: 'Fête des mères',
                                  defaultMessage: 'Fête des mères',
                              })
                            : selectedOffer?.themeType === 'FATHER_PARTY'
                            ? formatMessage({
                                  id: 'FATHER_PARTY',
                                  description: 'Fête des pères',
                                  defaultMessage: 'Fête des pères',
                              })
                            : selectedOffer?.themeType === 'BACK_TO_SCHOOL'
                            ? formatMessage({
                                  id: 'BACK_TO_SCHOOL',
                                  description: 'Rentrée des classes',
                                  defaultMessage: 'Rentrée des classes',
                              })
                            : selectedOffer?.themeType === 'NATIONAL_PARTY'
                            ? formatMessage({
                                  id: 'NATIONAL_PARTY',
                                  description: 'Fête Nationale',
                                  defaultMessage: 'Fête Nationale',
                              })
                            : selectedOffer?.themeType === 'SAINT_PATRICK'
                            ? formatMessage({
                                  id: 'SAINT_PATRICK',
                                  description: 'Saint Patrick',
                                  defaultMessage: 'Saint Patrick',
                              })
                            : selectedOffer?.themeType === 'LIQUIDATION'
                            ? formatMessage({
                                  id: 'LIQUIDATION',
                                  description: 'Liquidation',
                                  defaultMessage: 'Liquidation',
                              })
                            : selectedOffer?.themeType === 'YEARS_DAY'
                            ? formatMessage({
                                  id: 'YEARS_DAY',
                                  description: "Jour de l'an",
                                  defaultMessage: "Jour de l'an",
                              })
                            : selectedOffer?.themeType === 'SAINT_VALENTIN'
                            ? formatMessage({
                                  id: 'SAINT_VALENTIN',
                                  description: 'Saint Valentin',
                                  defaultMessage: 'Saint Valentin',
                              })
                            : selectedOffer?.themeType === 'NO_THEME'
                            ? formatMessage({
                                  id: 'NO_THEME',
                                  description: 'Aucun thème',
                                  defaultMessage: 'Aucun thème',
                              })
                            : ''}
                    </Text>
                </Badge>
            </HStack>
            <Box alignSelf="center" justifyContent="center" width="60%">
                <Center>
                    <Text
                        color="system.50"
                        fontSize={22}
                        fontFamily="body"
                        textAlign="center"
                    >
                        {selectedOffer?.title}
                    </Text>
                </Center>
            </Box>
            <Box
                alignSelf="center"
                justifyContent="center"
                marginTop={3}
                marginBottom={3}
            >
                <HStack justifyContent="center" alignItems="center" space={2}>
                    {selectedOffer?.blocked === true ? (
                        <>
                            <Icon
                                color="red.500"
                                as={<Ionicons name="close-circle" size={20} />}
                                size={5}
                            />
                            <Text
                                color="alerts.100"
                                fontSize="dm-2p"
                                fontFamily="body"
                            >
                                <FormattedMessage
                                    id="OFDpB0"
                                    defaultMessage="Offre bloquée"
                                />
                            </Text>
                        </>
                    ) : selectedOffer?.validatedByAdmin === false ? (
                        <Text
                            color="alerts.100"
                            fontSize="dm-2p"
                            fontFamily="body"
                        >
                            <FormattedMessage
                                id="OFwpd2"
                                defaultMessage="En attente de vérification par l'administrateur "
                            />
                        </Text>
                    ) : (
                        <>
                            <Image
                                accessibilityLabel="offre-vérifée"
                                source={traceImage}
                                style={{
                                    width: 15,
                                    height: 15,
                                    paddingHorizontal: 10,
                                }}
                            />
                            <Text
                                color="alerts.50"
                                fontSize="dm-2p"
                                fontFamily="body"
                            >
                                <FormattedMessage
                                    id="OFDpd2"
                                    defaultMessage="Offre vérifiée"
                                />
                            </Text>
                        </>
                    )}
                </HStack>
            </Box>
            {selectedOffer?.offerCategory !== 'E_COMMERCE' &&
            selectedOffer?.offerType !== 'GOOD_PLAN' ? (
                <HStack
                    marginTop={3}
                    minWidth={
                        Platform?.OS === 'web'
                            ? '300'
                            : Dimensions.get('window').width - 50
                    }
                    maxWidth={
                        Platform?.OS === 'web'
                            ? '300'
                            : Dimensions.get('window').width - 50
                    }
                    // flexShrink={1}
                    alignSelf="center"
                    space={2}
                    justifyContent="space-between"
                >
                    {selectedOffer?.minOfferValue ? (
                        <ReductionCard
                            backgroundColor="#B60C1F"
                            value={
                                selectedOffer?.offerType === 'PERCENTAGE'
                                    ? selectedOffer?.minOfferValue + '%'
                                    : selectedOffer?.minOfferValue + '€'
                            }
                            description="Offre minimum"
                            textSize={11}
                        />
                    ) : null}
                    {selectedOffer?.midOfferValue ? (
                        <ReductionCard
                            backgroundColor="#EAAE00"
                            value={
                                selectedOffer?.offerType === 'PERCENTAGE'
                                    ? selectedOffer?.midOfferValue + '%'
                                    : selectedOffer?.midOfferValue + '€'
                            }
                            description="Offre medium"
                            textSize={11}
                        />
                    ) : null}
                    {selectedOffer?.maxOfferValue ? (
                        <ReductionCard
                            backgroundColor="#00AAC7"
                            value={
                                selectedOffer?.offerType === 'PERCENTAGE'
                                    ? selectedOffer?.maxOfferValue + '%'
                                    : selectedOffer?.maxOfferValue + '€'
                            }
                            description="Offre premium"
                            textSize={11}
                        />
                    ) : null}
                </HStack>
            ) : (
                <VStack padding={5} space={2}>
                    {selectedOffer?.minOfferValue ? (
                        <ReductionCard
                            backgroundColor="#B60C1F"
                            value={selectedOffer?.minOfferValue}
                            description="Offre minimum"
                            hideDescription={true}
                        />
                    ) : null}
                    {selectedOffer?.midOfferValue ? (
                        <ReductionCard
                            backgroundColor="#EAAE00"
                            value={selectedOffer?.midOfferValue}
                            description="Offre medium"
                            hideDescription={true}
                        />
                    ) : null}
                    {selectedOffer?.maxOfferValue ? (
                        <ReductionCard
                            backgroundColor="#00AAC7"
                            value={selectedOffer?.maxOfferValue}
                            description="Offre premium"
                            hideDescription={true}
                        />
                    ) : null}
                </VStack>
            )}

            <Box
                alignSelf="center"
                justifyContent="center"
                width="60%"
                marginTop={5}
            >
                <Center>
                    <Text
                        color="system.50"
                        fontSize="dm-2p"
                        bold={true}
                        fontFamily="body"
                    >
                        <FormattedMessage
                            id="OFDpd1"
                            defaultMessage="Conditions"
                        />
                    </Text>
                </Center>
                <Center marginTop={3}>
                    <Text
                        textAlign="center"
                        color={system[50]}
                        fontSize="dm-p"
                        fontFamily="body"
                    >
                        {selectedOffer?.description}
                    </Text>
                </Center>
                <Center marginTop={3}>
                    {selectedOffer?.endOfOffer ? (
                        <Text
                            color={system[50]}
                            fontSize="dm-p"
                            fontFamily="body"
                        >
                            Du{' '}
                            {Platform.OS === 'web'
                                ? moment(selectedOffer?.startOfOffer).format(
                                      'DD/MM/YYYY'
                                  )
                                : moment(selectedOffer?.startOfOffer).format(
                                      'DD/MM/YYYY'
                                  )}{' '}
                            au{' '}
                            {Platform.OS === 'web'
                                ? moment(selectedOffer?.endOfOffer).format(
                                      'DD/MM/YYYY'
                                  )
                                : moment(selectedOffer?.endOfOffer).format(
                                      'DD/MM/YYYY'
                                  )}
                        </Text>
                    ) : (
                        <Text
                            color={system[50]}
                            fontSize="dm-p"
                            fontFamily="body"
                        >
                            A partir Du{' '}
                            {Platform.OS === 'web'
                                ? moment(selectedOffer?.startOfOffer).format(
                                      'DD/MM/YYYY'
                                  )
                                : moment(selectedOffer?.startOfOffer).format(
                                      'DD/MM/YYYY'
                                  )}{' '}
                        </Text>
                    )}
                </Center>
            </Box>

            <Center>
                {selectedOffer?.attachedFile && (
                    <TouchableOpacity
                        onPress={() =>
                            downloadFileOffer(selectedOffer?.attachedFile)
                        }
                        style={{
                            position: 'relative',
                            overflow: 'hidden',
                            marginTop: 15,
                        }}
                    >
                        <HStack
                            justifyContent="space-between"
                            alignItems="center"
                            width={
                                Platform?.OS === 'web'
                                    ? '300'
                                    : Dimensions.get('window').width - 50
                            }
                            padding={2}
                            shadow="1"
                            borderRadius={5}
                            backgroundColor="white"
                            marginBottom={2}
                        >
                            <Text
                                color="system.50"
                                fontFamily="mono"
                                style={{ flexShrink: 1 }}
                                numberOfLines={1}
                            >
                                {attachedFileName}
                            </Text>
                            <Image
                                accessibilityLabel="solid-image"
                                source={SolidImage}
                                style={{
                                    width: 15,
                                    height: 15,
                                    marginHorizontal: 10,
                                }}
                            />
                        </HStack>
                    </TouchableOpacity>
                )}

                {selectedOffer?.photo && (
                    <Image
                        accessibilityLabel="detail-offer-img"
                        source={{ uri: getFileURL(selectedOffer?.photo) }}
                        style={{
                            marginTop: 5,
                            borderRadius: 5,
                            height: 130,
                            minWidth:
                                Platform?.OS === 'web'
                                    ? 300
                                    : Dimensions.get('window').width - 50,
                            maxWidth:
                                Platform?.OS === 'web'
                                    ? 300
                                    : Dimensions.get('window').width - 50,
                        }}
                    />
                )}
            </Center>
            {(Platform.OS === 'android' || Platform.OS === 'ios') && (
                <Box marginBottom={10} />
            )}
        </PageContainer>
    );
};

export default OffreDetails;
