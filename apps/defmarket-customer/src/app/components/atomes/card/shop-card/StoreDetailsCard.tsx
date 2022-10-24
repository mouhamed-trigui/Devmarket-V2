import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image, ImageBackground, View } from 'react-native';
import { fonts } from '../../../../theme/fonts';
import { ThemeContext } from '../../../../context/ThemeContext';
import Text from '../../text/Text';
import { fontSizes } from './../../../../theme/fonts';
import Card from './../general-card/Card';
import VStack from '../../stack/VStack';
import { ClosureTypeEnum, StoreTypeEnum } from '../../../../services/constants';
import { getFileURL } from '../../../../services/constants/api';
import StoreStatus from '../../../molecules/store-status/StoreStatus';
import { RootState } from '../../../../stores/store';

export const getStoreType = (storeType: StoreTypeEnum) => {
    switch (storeType) {
        case StoreTypeEnum.E_COMMERCE:
            return 'E-commerce';
        case StoreTypeEnum.PHYSICAL:
            return 'Physique';
        case StoreTypeEnum.PHYSICAL_AND_E_COMMERCE:
            return 'E-commerce et physique';
        default:
            return '';
    }
};

function StoreDetailsCard() {
    const { selectedStore } = useSelector((state: RootState) => state.store);
    const { theme, toggleTheme } = useContext(ThemeContext);

    const getAbbreviation = (title: string) => {
        if (title) {
            const chars = title.match(/\b(\w)/g);
            return chars.length >= 2 ? `${chars[0]}-${chars[1]}` : chars[0];
        } else {
            return '';
        }
    };

    const getClosureType = (closureType: ClosureTypeEnum) => {
        switch (closureType) {
            case ClosureTypeEnum.CONSTRUCTION:
                return 'Construction';
            case ClosureTypeEnum.HOLIDAYS:
                return 'Vacances';
            case ClosureTypeEnum.ANNUAL_CLOSURE:
                return ' Fermeture annuelle';
            default:
                return '';
        }
    };

    return (
        <View
            style={{
                paddingBottom: 25,
            }}
        >
            {selectedStore?.temporaryClosure && (
                <Card backgroundColor={theme.colors.danger[300]} height={80}>
                    <VStack
                        justifyContent="center"
                        alignItems="center"
                        style={{
                            height: '100%',
                            paddingHorizontal: 25,
                        }}
                    >
                        <Text
                            fontFamily={fonts.mono}
                            fontSize={fontSizes['dm-p']}
                            textAlign="center"
                            color={theme.colors.danger[200]}
                        >
                            {getClosureType(
                                selectedStore?.temporaryClosure?.closureType
                            )}
                        </Text>
                        <Text
                            fontFamily={fonts.body}
                            fontSize={fontSizes['dm-p']}
                            textAlign="center"
                            numberOfLines={2}
                            color={theme.colors.danger[200]}
                        >
                            {selectedStore?.temporaryClosure?.reason}
                        </Text>
                    </VStack>
                </Card>
            )}
            <ImageBackground
                source={{
                    uri: getFileURL(selectedStore?.cover?.id),
                }}
                style={{
                    height: 100,
                }}
            >
                <View
                    style={{
                        backgroundColor: theme.colors.info[50],
                        height: 25,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Text
                        color={theme.colors.info[200]}
                        fontFamily={fonts.workSans}
                        fontSize={fontSizes['dm-sm']}
                        textAlign="center"
                        vPadding={0}
                    >
                        {getStoreType(selectedStore?.storeType)}
                    </Text>
                </View>
                <View
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            backgroundColor: theme.colors.info[300],
                            borderColor: theme.colors.info[100],
                            borderWidth: 1,
                            height: 80,
                            width: 80,
                            borderRadius: 50,
                            marginTop: 30,
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        {selectedStore?.logo ? (
                            <Image
                                resizeMode={'cover'}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 50,
                                }}
                                source={{
                                    uri: getFileURL(selectedStore?.logo?.id),
                                }}
                            />
                        ) : (
                            <Text
                                fontFamily={fonts.mono}
                                fontSize={fontSizes['dm-h2']}
                                color={theme.colors.info[50]}
                                vPadding={5}
                                hPadding={10}
                                textAlign="center"
                            >
                                {getAbbreviation(selectedStore?.name)}
                            </Text>
                        )}
                    </View>
                </View>
            </ImageBackground>
            <View
                style={{
                    marginTop: 50,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {/* DESCRIPTION */}
                <Text
                    color={theme.colors.info[50]}
                    fontFamily={fonts.medium}
                    fontSize={fontSizes['dm-p']}
                    textAlign="center"
                    vPadding={5}
                    hPadding={30}
                    numberOfLines={3}
                >
                    {selectedStore?.description}
                </Text>
                {/* CATEGORY */}
                <View
                    style={{
                        backgroundColor: theme.colors.secondary[400],
                        borderColor: theme.colors.secondary[50],
                        borderWidth: 1,
                        maxWidth: '100%',
                        borderRadius: 7,
                        marginVertical: 18,
                    }}
                >
                    <Text
                        color={theme.colors.info[50]}
                        fontFamily={fonts.body}
                        fontSize={fontSizes['dm-p']}
                        textAlign="center"
                        vPadding={9}
                        hPadding={20}
                    >
                        {selectedStore?.category?.name}
                    </Text>
                </View>
                {/* STATUS */}
                <StoreStatus timeTable={selectedStore?.timeTable} />
            </View>
        </View>
    );
}

export default StoreDetailsCard;
