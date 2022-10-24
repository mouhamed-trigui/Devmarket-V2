import React, { useEffect } from 'react';
import { Text, Button } from '../../../../../components/atomes';
import { RadioGroup } from '../../../../../components/molecules';

import { HStack, Accordion, VStack, View } from 'native-base';
import { ScrollView } from 'native-base';

import { system } from '../../../../../theme/colors';
import { Image, Platform, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useIntl } from 'react-intl';

//PNG
import close from '../../../../../../assets/images/png/close.png';
//SVG
import closeSVG from '../../../../../../assets/images/svg/close.svg';
import filterSVG from '../../../../../../assets/images/svg/filtres-bleu-f.svg';

import { FormattedMessage } from 'react-intl';
import { SvgXml } from 'react-native-svg';
import { useSelector, useDispatch } from 'react-redux';

import { companyActions } from '../../../../../stores/slices';
import PageContainer from '../../../../../components/atomes/container/PageContainer';
import CheckBoxGroup from '../../../../../components/molecules/check-box-group/CheckBoxGroup';

/* eslint-disable-next-line */
export interface FilterOfferProps {}

export function FilterOffer(props: FilterOfferProps) {
    const navigation = useNavigation();

    const dispatch = useDispatch();

    const { formatMessage } = useIntl();

    //switch state
    const [promoType, setPromoType] = React.useState<string[]>([]);

    const [sortBy, setSortBy] = React.useState('');

    const [status, setStatus] = React.useState('');

    const [themeType, setThemeType] = React.useState<string[]>([]);

    const [categoryOfferType, setCategoryOfferType] = React.useState('');

    const [loading, setLoading] = React.useState(false);

    const { filter, selectedStore } = useSelector(
        (state: any) => state.company
    );

    const promotionOptions = [
        {
            value: 'PERCENTAGE',
            label: formatMessage({
                id: 'PERCENTAGE',
                description: 'Pourcentage',
                defaultMessage: 'Pourcentage',
            }),
        },
        {
            value: 'FLAT',
            label: formatMessage({
                id: 'FLAT',
                description: 'Réduction fixe',
                defaultMessage: 'Réduction fixe',
            }),
        },
        {
            value: 'GOOD_PLAN',
            label: formatMessage({
                id: 'GOOD_PLAN',
                description: 'Bon plan',
                defaultMessage: 'Bon plan',
            }),
        },
    ];

    const themeOptions = [
        {
            value: 'NOEL',
            label: formatMessage({
                id: 'NOEL',
                description: 'Noël',
                defaultMessage: 'Noël',
            }),
        },
        {
            value: 'HALLOWEEN',
            label: formatMessage({
                id: 'HALLOWEEN',
                description: 'Halloween',
                defaultMessage: 'Halloween',
            }),
        },
        {
            value: 'PAQUES',
            label: formatMessage({
                id: 'PAQUES',
                description: 'Paques',
                defaultMessage: 'Paques',
            }),
        },
        {
            value: 'TOUSSAINT',
            label: formatMessage({
                id: 'TOUSSAINT',
                description: 'Toussaint',
                defaultMessage: 'Toussaint',
            }),
        },
        {
            value: 'PROMO_FALSH',
            label: formatMessage({
                id: 'PROMO_FALSH',
                description: 'Promo Flash',
                defaultMessage: 'Promo Flash',
            }),
        },
        {
            value: 'BLACK_FRIDAY',
            label: formatMessage({
                id: 'BLACK_FRIDAY',
                description: 'Black Friday',
                defaultMessage: 'Black Friday',
            }),
        },
        {
            value: 'MOTHER_PARTY',
            label: formatMessage({
                id: 'MOTHER_PARTY',
                description: 'Fête des mères',
                defaultMessage: 'Fête des mères',
            }),
        },
        {
            value: 'FATHER_PARTY',
            label: formatMessage({
                id: 'FATHER_PARTY',
                description: 'Fête des pères',
                defaultMessage: 'Fête des pères',
            }),
        },
        {
            value: 'BACK_TO_SCHOOL',
            label: formatMessage({
                id: 'BACK_TO_SCHOOL',
                description: 'Rentrée des classes',
                defaultMessage: 'Rentrée des classes',
            }),
        },
        {
            value: 'NATIONAL_PARTY',
            label: formatMessage({
                id: 'NATIONAL_PARTY',
                description: 'Fête Nationale',
                defaultMessage: 'Fête Nationale',
            }),
        },
        {
            id: 11,
            value: 'SAINT_PATRICK',
            label: formatMessage({
                id: 'SAINT_PATRICK',
                description: 'Saint Patrick',
                defaultMessage: 'Saint Patrick',
            }),
        },
        {
            value: 'LIQUIDATION',
            label: formatMessage({
                id: 'LIQUIDATION',
                description: 'Liquidation',
                defaultMessage: 'Liquidation',
            }),
        },
        {
            value: 'YEARS_DAY',
            label: formatMessage({
                id: 'YEARS_DAY',
                description: "Jour de l'an",
                defaultMessage: "Jour de l'an",
            }),
        },
        {
            value: 'SAINT_VALENTIN',
            label: formatMessage({
                id: 'SAINT_VALENTIN',
                description: 'Saint Valentin',
                defaultMessage: 'Saint Valentin',
            }),
        },
        {
            value: 'NO_THEME',
            label: formatMessage({
                id: 'NO_THEME',
                description: 'AUCUN THÈME',
                defaultMessage: 'AUCUN THÈME',
            }),
        },
    ];

    useEffect(() => {
        if (filter !== null && filter !== undefined) {
            setPromoType(filter?.offerTypes);
            setSortBy(filter?.sortBy);
            setStatus(filter?.status);
            setThemeType(filter?.themes);
            setCategoryOfferType(filter?.categoryOfferType);
        }
    }, [
        filter?.offerTypes,
        filter?.sortBy,
        filter?.status,
        filter?.themes,
        filter?.categoryOfferType,
    ]);

    const applyFilter = () => {
        setLoading(true);
        dispatch(companyActions.setOfferTypes(promoType));
        dispatch(companyActions.setSortBy(sortBy));
        dispatch(companyActions.setStatus(status));
        dispatch(companyActions.setThemes(themeType));
        dispatch(companyActions.setCategoryOfferType(categoryOfferType));
        setLoading(false);
        navigation.goBack();
    };
    const resetFilter = () => {
        setLoading(true);
        dispatch(companyActions.resetFilter());
        setLoading(false);
        navigation.goBack();
    };

    return (
        <PageContainer>
            <View flexGrow={1} paddingY={5} backgroundColor={'white'}>
                <VStack marginX={5} marginTop={5} space={8}>
                    <HStack justifyContent="space-between">
                        <HStack space={3}>
                            {Platform.OS === 'web' ? (
                                <Image
                                    accessibilityLabel="filter-offer-img"
                                    source={filter}
                                    style={{ width: 25, height: 25 }}
                                />
                            ) : (
                                <SvgXml
                                    xml={filterSVG}
                                    style={{ width: 25, height: 25 }}
                                />
                            )}

                            <Text
                                fontSize="dm-h2"
                                fontFamily="mono"
                                color={system[50]}
                            >
                                <FormattedMessage
                                    id="FilOf2"
                                    defaultMessage="Mes filtres"
                                />
                            </Text>
                        </HStack>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            {Platform.OS === 'web' ? (
                                <Image
                                    accessibilityLabel="close-img"
                                    source={close}
                                    style={{ width: 25, height: 25 }}
                                />
                            ) : (
                                <SvgXml
                                    fill={system[50]}
                                    xml={closeSVG}
                                    style={{ width: 20, height: 20 }}
                                />
                            )}
                        </TouchableOpacity>
                    </HStack>
                </VStack>
                <ScrollView marginBottom={150}>
                    <VStack space={8} marginX={5} marginTop={5}>
                        <Text
                            fontSize="dm-h2"
                            fontFamily="mono"
                            color={system[50]}
                            style={{ marginTop: -10 }}
                        >
                            <FormattedMessage
                                id="FilOf3"
                                defaultMessage="Trier par :"
                            />
                        </Text>
                        <HStack space={3} alignItems="center" marginTop={-4}>
                            <Button
                                label={formatMessage({
                                    id: 'Filt03',
                                    description: "Date d'ajout",
                                    defaultMessage: "Date d'ajout",
                                })}
                                style={{
                                    borderRadius: 30,
                                    borderColor: '#00ABCB',
                                }}
                                height="40px"
                                paddingHorizontal={5}
                                fontSize={'dm-p'}
                                fontFamily="body"
                                variant="outline"
                                backgroundColor={
                                    sortBy === 'startOfOffer'
                                        ? '#00ABCB'
                                        : 'white'
                                }
                                textColor={
                                    sortBy === 'startOfOffer'
                                        ? 'white'
                                        : '#00ABCB'
                                }
                                onPress={() => setSortBy('startOfOffer')}
                            />
                            <Button
                                label={formatMessage({
                                    id: 'Filt04',
                                    description: "Date d'expiration",
                                    defaultMessage: "Date d'expiration",
                                })}
                                style={{
                                    borderRadius: 30,
                                    borderColor: '#00ABCB',
                                }}
                                height="40px"
                                paddingHorizontal={5}
                                fontSize={'dm-p'}
                                fontFamily="body"
                                variant="outline"
                                backgroundColor={
                                    sortBy === 'endOfOffer'
                                        ? '#00ABCB'
                                        : 'white'
                                }
                                textColor={
                                    sortBy === 'endOfOffer'
                                        ? 'white'
                                        : '#00ABCB'
                                }
                                onPress={() => setSortBy('endOfOffer')}
                            />
                        </HStack>

                        <Text
                            fontSize="dm-h2"
                            fontFamily="mono"
                            color={system[50]}
                        >
                            <FormattedMessage
                                id="FilOf4"
                                defaultMessage="Filtrer par :"
                            />
                        </Text>
                        <VStack>
                            <Accordion
                                allowMultiple
                                style={{
                                    borderWidth: 0,
                                    marginLeft: -8,
                                    marginTop: -30,
                                }}
                            >
                                {selectedStore?.eCommerceAndPhysicalStore ? (
                                    <Accordion.Item>
                                        <Accordion.Summary _expanded={{}}>
                                            <Text
                                                color={system[50]}
                                                fontSize="dm-2p"
                                                fontFamily="mono"
                                            >
                                                <FormattedMessage
                                                    id="FilOf5"
                                                    defaultMessage="Type d'offre"
                                                />
                                            </Text>{' '}
                                            <Accordion.Icon
                                                color={system[50]}
                                            />
                                        </Accordion.Summary>
                                        <Accordion.Details>
                                            <RadioGroup
                                                style={{}}
                                                flexDirection="column"
                                                radioColor="#003753"
                                                value={categoryOfferType}
                                                label={''}
                                                defaultValue=""
                                                name="categoryOfferType"
                                                color="#003753"
                                                items={[
                                                    {
                                                        label: formatMessage({
                                                            id: 'Filt07',
                                                            description:
                                                                'Toutes catégories',
                                                            defaultMessage:
                                                                'Toutes catégories',
                                                        }),
                                                        value: '',
                                                    },
                                                    {
                                                        label: formatMessage({
                                                            id: 'Filt08',
                                                            description:
                                                                'Structure physique',
                                                            defaultMessage:
                                                                'Structure physique',
                                                        }),
                                                        value: 'PHYSICAL',
                                                    },
                                                    {
                                                        label: formatMessage({
                                                            id: 'Filt09',
                                                            description:
                                                                'Commerce électronique',
                                                            defaultMessage:
                                                                'Commerce électronique',
                                                        }),
                                                        value: 'E_COMMERCE',
                                                    },
                                                ]}
                                                onChange={(value: any) => {
                                                    setCategoryOfferType(value);
                                                }}
                                            />
                                        </Accordion.Details>
                                    </Accordion.Item>
                                ) : (
                                    <Accordion.Item></Accordion.Item>
                                )}

                                <Accordion.Item>
                                    <Accordion.Summary
                                        _expanded={{}}
                                        style={{
                                            borderTopWidth: selectedStore?.eCommerceAndPhysicalStore
                                                ? 1
                                                : 0,
                                        }}
                                    >
                                        <Text
                                            color={system[50]}
                                            fontSize="dm-2p"
                                            fontFamily="mono"
                                        >
                                            <FormattedMessage
                                                id="FilOf6"
                                                defaultMessage="Type de promotion"
                                            />
                                        </Text>
                                        <Accordion.Icon color={system[50]} />
                                    </Accordion.Summary>
                                    <Accordion.Details>
                                        <VStack ml={3} mt={-3}>
                                            <CheckBoxGroup
                                                options={promotionOptions}
                                                onChange={setPromoType}
                                                chekedValues={promoType}
                                            />
                                        </VStack>
                                    </Accordion.Details>
                                </Accordion.Item>
                                <Accordion.Item>
                                    <Accordion.Summary _expanded={{}}>
                                        <Text
                                            color={system[50]}
                                            fontSize="dm-2p"
                                            fontFamily="mono"
                                        >
                                            <FormattedMessage
                                                id="FilOf7"
                                                defaultMessage="Thèmes"
                                            />
                                        </Text>{' '}
                                        <Accordion.Icon color={system[50]} />
                                    </Accordion.Summary>
                                    <Accordion.Details>
                                        <CheckBoxGroup
                                            options={themeOptions}
                                            onChange={setThemeType}
                                            chekedValues={themeType}
                                            columns={2}
                                        />
                                    </Accordion.Details>
                                </Accordion.Item>

                                <Accordion.Item>
                                    <Accordion.Summary _expanded={{}}>
                                        <Text
                                            color={system[50]}
                                            fontSize="dm-2p"
                                            fontFamily="mono"
                                        >
                                            <FormattedMessage
                                                id="FilOf1"
                                                defaultMessage="Statuts"
                                            />
                                        </Text>{' '}
                                        <Accordion.Icon color={system[50]} />
                                    </Accordion.Summary>
                                    <Accordion.Details>
                                        <RadioGroup
                                            value={status}
                                            label={''}
                                            defaultValue="ACTIVE"
                                            name="status"
                                            color="#003753"
                                            radioColor="#003753"
                                            items={[
                                                {
                                                    label: formatMessage({
                                                        id: 'Filt99',
                                                        description: 'Toutes',
                                                        defaultMessage:
                                                            'Toutes',
                                                    }),
                                                    value: '',
                                                },
                                                {
                                                    label: formatMessage({
                                                        id: 'Filt05',
                                                        description: 'Actives',
                                                        defaultMessage:
                                                            'Actives',
                                                    }),
                                                    value: 'ACTIVE',
                                                },
                                                {
                                                    label: formatMessage({
                                                        id: 'Filt06',
                                                        description: 'Expirées',
                                                        defaultMessage:
                                                            'Expirées',
                                                    }),
                                                    value: 'EXPIRED',
                                                },
                                            ]}
                                            onChange={(value: any) => {
                                                setStatus(value);
                                            }}
                                        />
                                    </Accordion.Details>
                                </Accordion.Item>
                            </Accordion>
                        </VStack>
                    </VStack>
                </ScrollView>

                <VStack
                    space={3}
                    style={{
                        position: 'absolute',
                        left: 20,
                        right: 20,
                        bottom: 50,
                    }}
                >
                    <Button
                        variant="outline"
                        color={'#00ABCB'}
                        backgroundColor="white"
                        textColor={'#00ABCB'}
                        style={{
                            borderColor: '#00ABCB',
                        }}
                        label={formatMessage({
                            id: 'Filt01',
                            description: 'Réinitialiser',
                            defaultMessage: 'Réinitialiser',
                        })}
                        onPress={() => resetFilter()}
                    />
                    <Button
                        label={formatMessage({
                            id: 'Filt02',
                            description: 'Appliquer les filtres',
                            defaultMessage: 'Appliquer les filtres',
                        })}
                        spinner={loading}
                        moreParams={{ disabled: loading }}
                        onPress={() => applyFilter()}
                    />
                </VStack>
            </View>
        </PageContainer>
    );
}

export default FilterOffer;
