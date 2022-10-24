import React, { useState, useEffect } from 'react';
import { Atomes, Molecules } from '../../../../components';
import { SwipeListView } from 'react-native-swipe-list-view';
import OffersFab from '../../../../components/molecules/offers-fab/offers-fab';
import { useIntl, FormattedMessage } from 'react-intl';
import { Image, Divider, Box, Flex, HStack, ScrollView } from 'native-base';
import EditImage from '../../../../../assets/images/png/filtres.png';
import SearchImage from '../../../../../assets/images/png/search-blue-c.png';
import BoutiqueImage from '../../../../../assets/images/png/boutique.png';

import {
    getAllOffersOfStore,
    deleteOffer,
} from '../../../../services/methodes/offre';
import emptyOffers from '../../../../../assets/images/illustration/ILLUSTRATION_5_pas-d-offres.png';

import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView, TouchableOpacity } from 'react-native';

//PNG
import close from '../../../../../assets/images/png/close-white.png';
import { companyActions } from '../../../../stores/slices';
import { GetFirstStore } from '../../../../services/methodes/store';
import { useIsFocused } from '@react-navigation/native';
import Chip from '../../../../components/molecules/chip/Chip';

/* eslint-disable-next-line */
export interface OffersProps {
    route: any;
    navigation: any;
}

export function Offers(props: OffersProps) {
    const { formatMessage } = useIntl();
    const dispatch = useDispatch();

    const { selectedStore, filter } = useSelector(
        (state: any) => state.company
    );

    const [offersList, setOffersList] = useState([]);

    const [backupOffersList, setbackupOffersList] = useState([]);

    const [search, setSearch] = useState('');

    const [showDialog, setShowDialog] = useState(false);

    const [rowData, setRowData] = useState();

    const [page, setPage] = useState(0);

    const [totalPage, setTotalPage] = useState(0);

    const isFocused = useIsFocused();

    const fetchOffers = (
        storeId: number,
        pageNumber: number,
        size: number,
        sortBy: 'endOfOffer' | 'startOfOffer' | undefined | null,
        offerTypes:
            | Array<
                  'GOOD_PLAN' | 'FLAT' | 'PERCENTAGE' | 'CONDITIONAL_REDUCTION'
              >
            | undefined
            | null,
        themeType:
            | Array<'HALLOWEEN' | 'NOEL' | 'PAQUES' | 'TOUSSAINT' | 'NO_THEME'>
            | undefined
            | null,
        status: 'EXPIRED' | 'ACTIVE' | undefined | null,
        categoryOfferType: 'PHYSICAL' | 'E_COMMERCE' | undefined | null
    ) => {
        getAllOffersOfStore(
            storeId,
            pageNumber,
            size,
            sortBy,
            offerTypes,
            themeType,
            status,
            categoryOfferType
        )
            .then((data: any) => {
                setTotalPage(data.totalPages);
                const combine: any = [...offersList, ...data.content];
                setOffersList(combine);
                const combineBackup: any = [
                    ...backupOffersList,
                    ...data.content,
                ];
                setbackupOffersList(combineBackup);
            })
            .catch((err) => {
                console.error(err);
                setOffersList([]);
                setbackupOffersList([]);
            });
    };

    const loadMoreOffer = () => {
        if (page + 1 < totalPage) {
            setPage(page + 1);
        }
    };

    const cleanUp = () => {
        return new Promise((resolve, reject) => {
            try {
                setPage(0);
                setOffersList([]);
                setbackupOffersList([]);
                resolve(true);
            } catch (error) {
                console.error(error);
                reject(false);
            }
        });
    };

    useEffect(() => {
        if (isFocused && !selectedStore) {
            //alert('store empty');
            GetFirstStore()
                .then((res) => {
                    dispatch(companyActions.setSelectedStore(res));
                })
                .catch((err) => console.error(err));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFocused, selectedStore]);

    useEffect(() => {
        return () => {
            if (isFocused) {
                //alert('clean up')
                setPage(0);
                setOffersList([]);
                setbackupOffersList([]);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFocused]);

    useEffect(() => {
        if (isFocused && selectedStore?.id) {
            //alert('page : '+page);
            fetchOffers(
                selectedStore?.id,
                page,
                15,
                filter?.sortBy,
                filter?.offerTypes,
                filter?.themes,
                filter?.status,
                filter?.categoryOfferType
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        isFocused,
        selectedStore?.id,
        page,
        filter.offerTypes,
        filter.sortBy,
        filter.status,
    ]);

    const deleteItem = (rowData: any) => {
        if (rowData?.index || rowData.index === 0) {
            deleteOffer(rowData?.item?.id)
                .then(() => {
                    const newData = [...offersList];
                    newData.splice(rowData.index, 1);
                    setOffersList(newData);
                    setShowDialog(false);
                    dispatch(
                        companyActions.setSelectedStore({
                            ...selectedStore,
                            offerNbr: selectedStore.offerNbr - 1,
                        })
                    );
                })
                .catch((err) => {
                    setShowDialog(false);
                    console.error(err);
                });
        }
    };

    const findOffer = (value: any) => {
        setSearch(value);
        if (value?.length === 0) {
            setOffersList(backupOffersList ?? []);
            return;
        } else {
            if (backupOffersList?.length > 0) {
                const filteredData = backupOffersList?.filter(
                    (item: any) =>
                        item?.title
                            ?.toUpperCase()
                            ?.includes(value.toUpperCase()) ||
                        item?.description
                            ?.toUpperCase()
                            ?.includes(value.toUpperCase())
                );
                setOffersList(filteredData ?? []);
            }
        }
    };
    return (
        <SafeAreaView
            style={[
                {
                    backgroundColor: '#FBFBFB',
                    height: '100%',
                },
            ]}
        >
            <Flex key="stores-offers" flexDirection="row" width={'100%'}>
                <Atomes.Text
                    fontSize="dm-h2"
                    fontFamily="RobotoRegular"
                    color="#575D6A"
                    textAlign="center"
                    bold
                    width={'100%'}
                >
                    {selectedStore?.name}
                </Atomes.Text>
                <Box key={1} style={{ position: 'absolute', right: 15 }}>
                    <Molecules.ActionSheet
                        IconButton={
                            <Image
                                source={BoutiqueImage}
                                resizeMode="contain"
                                width={6}
                                height={6}
                                marginRight="3"
                                alt="icon"
                                style={{ borderRadius: 3 }}
                            />
                        }
                        companyId={selectedStore?.companyId}
                        cleanUp={cleanUp}
                        fetchOffers={fetchOffers}
                    />
                </Box>
            </Flex>

            <Atomes.Text
                fontSize="dm-p"
                fontFamily="body"
                color="#76D0DF"
                textAlign="center"
            >
                {`${offersList?.length ?? 0} ${formatMessage({
                    id: 'OFF001',
                    description: 'offres',
                    defaultMessage: 'offres',
                })}`}
            </Atomes.Text>

            <Divider my="4" bg="#76D0DF" />

            <Box
                key={2}
                display={'flex'}
                flexDir={'row'}
                justifyContent={'space-evenly'}
                alignItems="center"
                style={{ marginLeft: 20, marginRight: 20 }}
            >
                <Box key={3}>
                    <Molecules.FormControl
                        InputRightElement={
                            <Image
                                source={SearchImage}
                                resizeMode="contain"
                                width={4}
                                height={4}
                                marginRight="3"
                                alt="search"
                            />
                        }
                        label=""
                        placeholder={formatMessage({
                            id: 'IMO001',
                            description: 'Rechercher une offre',
                            defaultMessage: 'Rechercher une offre',
                        })}
                        backgroundColor="system.200"
                        value={search}
                        moreParams={{
                            marginLeft: 20,
                        }}
                        type="input"
                        variant="rounded"
                        size="sm"
                        width={'95%'}
                        error={null}
                        placeholderTextColor="#003354"
                        errorMessage={null}
                        helperText={null}
                        onChange={(value: React.SetStateAction<string>) =>
                            findOffer(value)
                        }
                    />
                </Box>
                <TouchableOpacity
                    onPress={() => props?.navigation.navigate('FilterOffers')}
                >
                    <Image
                        source={EditImage}
                        resizeMode="contain"
                        width={6}
                        height={6}
                        marginRight="3"
                        alt="icon"
                    />
                </TouchableOpacity>
            </Box>
            {filter?.offerTypes && (
                <ScrollView
                    key="offer-type"
                    horizontal
                    width="90%"
                    paddingTop={2}
                    style={{ flexGrow: 0.01 }}
                    alignSelf="center"
                >
                    <HStack
                        key="offers-types"
                        style={{ flexGrow: 0.01 }}
                        space={2}
                    >
                        {filter?.offerTypes?.map(
                            (item: string, index: number) => (
                                <Chip
                                    key={`offerTypes-${index}`}
                                    closeIcon={
                                        <Image
                                            alt={`close-icon-${index}`}
                                            source={close}
                                            style={{
                                                width: 12,
                                                height: 12,
                                                marginRight: 8,
                                            }}
                                        />
                                    }
                                    selected
                                    onClose={() => {
                                        setOffersList([]);
                                        setbackupOffersList([]);
                                        dispatch(
                                            companyActions.setOfferTypes(
                                                filter?.offerTypes.filter(
                                                    (element: string) =>
                                                        element !== item
                                                )
                                            )
                                        );
                                    }}
                                    label={
                                        item === 'PERCENTAGE'
                                            ? 'Pourcentage'
                                            : item === 'FLAT'
                                            ? 'Réduction fixe'
                                            : 'Bon plan'
                                    }
                                />
                            )
                        )}
                    </HStack>
                </ScrollView>
            )}
            {offersList?.length > 0 ? (
                <>
                    <SwipeListView
                        key="offers-list"
                        style={{ marginTop: 10, marginBottom: 15 }}
                        data={offersList}
                        renderItem={(rowData: any, rowMap: any) => (
                            <Molecules.OfferItem
                                rowData={rowData}
                                rowMap={rowMap}
                                navigation={props?.navigation}
                            />
                        )}
                        renderHiddenItem={(rowData: any, rowMap: any) => (
                            <Molecules.OfferItemHiddenItem
                                setShowDialog={setShowDialog}
                                setRowData={() => setRowData(rowData)}
                                closeRow={() =>
                                    rowMap[rowData.item.key].closeRow()
                                }
                            />
                        )}
                        rightOpenValue={-70}
                        previewRowKey={'0'}
                        previewOpenValue={-30}
                        previewOpenDelay={3000}
                        disableRightSwipe={true}
                        onMomentumScrollEnd={() => loadMoreOffer()}
                    />
                    <Molecules.YesNoDialog
                        title="Suppression de l'offre"
                        body="Souhaitez-vous supprimer cette offre définitivement"
                        isOpen={showDialog}
                        onClose={() => setShowDialog(false)}
                        onPress={() => deleteItem(rowData)}
                    />
                </>
            ) : search?.length > 0 || filter?.isActive ? (
                <Box key={4}>
                    <Atomes.Text
                        fontSize="dm-3p"
                        fontFamily="body"
                        color="#575D6A"
                        textAlign="center"
                    >
                        <FormattedMessage
                            id="OFfPg2"
                            defaultMessage="{br} Oups... {br}"
                            values={{
                                br: '\n',
                            }}
                        />
                    </Atomes.Text>
                    <Atomes.Text
                        fontSize="dm-3p"
                        fontFamily="body"
                        color="#575D6A"
                        textAlign="center"
                    >
                        <FormattedMessage
                            id="OFfPg1"
                            defaultMessage="Nous n'avons pas trouvé d'offres {br} correspondantes à ta recherche"
                            values={{
                                br: '\n',
                            }}
                        />
                    </Atomes.Text>

                    <Image
                        source={emptyOffers}
                        style={{
                            width: '90%',
                            height: '45%',
                            alignSelf: 'center',
                            marginTop: 50,
                        }}
                        alt="empty_offers"
                        resizeMode="contain"
                    />
                </Box>
            ) : null}

            <OffersFab />
        </SafeAreaView>
    );
}

export default Offers;
