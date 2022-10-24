import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { ShopCard } from '../../../../../components/atomes/card';
import PageContainer from '../../../../../components/atomes/container/PageContainer';
import {
    CategoryFilter,
    LocationFilter,
} from '../../../../../components/organisms/filter';
import Text from '../../../../../components/atomes/text/Text';
import { fonts } from '../../../../../theme/fonts';
import { ThemeContext } from '../../../../../context/ThemeContext';
import Announcement from '../../../../../components/organisms/announcement-box/Announcement';
import { fontSizes } from '../../../../../theme/fonts';
import ActionButtons from '../../../../../components/atomes/button/action-button/ActionButtons';
import axiosInstance from '../../../../../services/constants/api';
import { GET_STORE } from '../../../../../services/constants';
import { useIsFocused } from '@react-navigation/native';
import {
    Loisirs,
    MaisonEcologique,
    Mode,
    NourritureEtBoisson,
    Vacances,
} from '../../../../../theme/svgs';
import { getFileURL } from '../../../../../services/constants/api';
import { getAllStores } from './../../../../../services/methodes/store/index';
import { getStoreCategory } from '../../../../../services/methodes/store-category';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../stores/store';
import { userActions } from './../../../../../stores/slices/user/user';
import { storeActions } from './../../../../../stores/slices/store/store';

export interface LocalTradeProps {
    navigation: any;
}
export interface IGeolocation {
    latitude: number;
    longitude: number;
}
export default function LocalTrade(props: LocalTradeProps) {
    const isFocused = useIsFocused();
    const { currentLocation, distance } = useSelector(
        (state: RootState) => state.user
    );
    const selectedStoreCategory = useSelector(
        (state: RootState) => state.store.selectedStoreCategory
    );
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [shopData, setShopData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [resetStoreParamsStatus, setResetStoreParamsStatus] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        resetStoreParams().then((status: boolean) => {
            setResetStoreParamsStatus(status);
        });
    }, []);

    const resetStoreParams = () =>
        new Promise((resolve, reject) => {
            try {
                dispatch(userActions.setDistance(null));
                dispatch(userActions.setCurrentLocation(null));
                dispatch(storeActions.setSelectedStoreCategory(null));
                dispatch(storeActions.setTotalStoresByCity(null));
                resolve(true);
            } catch (error) {
                reject(false);
            }
        });

    useEffect(() => {
        getAllStoresByFilter(0, true);
    }, [currentLocation]);

    useEffect(() => {
        getAllStoresByFilter(0, true);
    }, [selectedStoreCategory]);

    useEffect(() => {
        if (isFocused) {
            getAllStoreCategory();
        }
    }, [isFocused]);

    const getAllStoresByFilter = (page: number, resetData: boolean) => {
        if (
            resetStoreParamsStatus &&
            currentLocation?.lat &&
            currentLocation?.lon
        ) {
            setLoading(true);
            if (resetData) {
                setShopData([]);
            }

            getAllStores(
                page,
                selectedStoreCategory,
                currentLocation.city,
                distance,
                {
                    latitude: currentLocation.lat,
                    longitude: currentLocation.lon,
                }
            )
                .then((data) => {
                    setLoading(false);
                    setTotalPages(data?.totalPages);
                    setCurrentPage(data?.pageable?.pageNumber);
                    dispatch(
                        storeActions.setTotalStoresByCity(data?.totalElements)
                    );
                    if (resetData) {
                        setShopData(data?.content);
                    } else {
                        setShopData(shopData.concat(data?.content));
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        }
    };

    const getAllStoreCategory = () => {
        getStoreCategory()
            .then((data) => {
                setCategories(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <PageContainer
                backgroundColor={theme.colors.info[700]}
                contentContainerStyle={{ paddingBottom: 100 }}
                closeToBttom={(isBottom: boolean) => {
                    if (isBottom) {
                        if (currentPage < totalPages - 1) {
                            getAllStoresByFilter(currentPage + 1, false);

                            setLoading(true);
                        } else {
                            setLoading(false);
                        }
                    }
                }}
            >
                <Announcement />
                <LocationFilter />
                <CategoryFilter
                    categories={categories}
                    disabled={currentLocation ? false : true}
                />

                <Text
                    fontFamily={fonts.mono}
                    fontSize={fontSizes['dm-2p']}
                    color={theme.colors.info[50]}
                    vPadding={15}
                    hPadding="6%"
                >
                    Boutiques à proximité
                </Text>
                <View style={{ paddingHorizontal: '6%' }}>
                    {shopData?.map((shop, index) => (
                        <ShopCard
                            key={index}
                            title={shop?.name}
                            status={shop?.status}
                            location={shop?.geolocation}
                            address={shop?.address}
                            openingTime={shop?.openingTime}
                            closingTime={shop?.closingTime}
                            type={shop?.storeType}
                            image={getFileURL(shop?.logo?.id)}
                            coverImage={getFileURL(shop?.cover?.id)}
                            timeTable={shop?.timeTable}
                            distance={shop?.distance}
                            eCommerceAndPhysicalStore={
                                shop?.eCommerceAndPhysicalStore
                            }
                            onPress={() => {
                                props.navigation.navigate('StoreDetails', {
                                    storeTitle: shop?.name,
                                    storeId: shop?.id,
                                });
                            }}
                            abbreviationName={''}
                        />
                    ))}
                </View>
                {loading && (
                    <ActivityIndicator
                        style={{
                            marginVertical: 10,
                        }}
                        size="large"
                        color={theme.colors.primary[50]}
                    />
                )}
            </PageContainer>
            <ActionButtons conciergerie={true} itineraire={false} />
        </>
    );
}
