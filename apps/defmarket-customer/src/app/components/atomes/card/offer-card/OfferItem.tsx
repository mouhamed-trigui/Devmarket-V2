import React, { useContext } from 'react';
import Text from '../../text/Text';
import moment from 'moment';
import { TouchableOpacity, View } from 'react-native';
import { fonts, fontSizes } from '../../../../theme/fonts';
import { ThemeContext } from '../../../../context/ThemeContext';
import HStack from '../../stack/HStack';
import VStack from '../../stack/VStack';
import { useNavigation } from '@react-navigation/native';
import { OfferTypeEnum } from '../../../../services/constants';
import { IOffer } from '../../../../services/model/offer';
/* eslint-disable-next-line */
export interface OfferItemProps {
    rowData: IOffer;
    rowMap?: any;
    navigation?: any;
}

export interface OfferItemHiddenItemProps {
    data: any;
    rowMap?: any;
}

export function OfferItem(props: OfferItemProps) {
    const navigation = useNavigation<any>();

    const { theme, toggleTheme } = useContext(ThemeContext);
    const getColor = (offerType: OfferTypeEnum) => {
        switch (offerType) {
            case OfferTypeEnum.PERCENTAGE:
                return theme.colors.secondary[100];
            case OfferTypeEnum.FLAT:
                return theme.colors.secondary[50];
            case OfferTypeEnum.GOOD_PLAN:
                return theme.colors.secondary[500];
            default:
                return theme.colors.secondary[50];
        }
    };
    const getTitle = (offerType: OfferTypeEnum, value: string) => {
        switch (offerType) {
            case OfferTypeEnum.PERCENTAGE:
                return `-${value}%`;
            case OfferTypeEnum.FLAT:
                return 'DIGITAL';
            case OfferTypeEnum.GOOD_PLAN:
                return 'BON\nPLAN';
            default:
                return 'CARTE\nCADEAU';

            /* case 'PERCENTAGE':
                return `-${value}%`;
            case 'FLAT':
                return `-${value}€`;
            case 'GOOD_PLAN':
                return 'BON\nPLAN';
            case 'GIFT':
                return 'CARTE\nCADEAU';
            default:
                return 'DIGITAL'; */
        }
    };
    /* 
    const selectOffer = () => {
        dispatch(
            companyActions.setSelectedOffer({
                ...props?.rowData,
                storeId: selectedStore.id,
                startOfOffer:
                    Platform.OS === 'web' && props?.rowData?.startOfOffer
                        ? props?.rowData?.startOfOffer.replace(':00Z', '')
                        : props?.rowData?.startOfOffer,
                endOfOffer:
                    Platform.OS === 'web' && props?.rowData?.endOfOffer
                        ? props?.rowData?.endOfOffer.replace(':00Z', '')
                        : props?.rowData?.endOfOffer,
            })
        );
        dispatch(userActions.setPreviousScreenName('listOffer'));
        props?.navigation?.navigate('OffreDetails');
    }; */

    const checkExpiration = () => {
        if (props?.rowData.endOfOffer) {
            return moment(new Date()).isAfter(moment(props?.rowData.endOfOffer))
                ? 'Expiré'
                : moment(props?.rowData.endOfOffer).format('DD/MM/YYYY');
        }
    };
    return (
        <TouchableOpacity
            style={{
                backgroundColor: theme.colors.info[200],
                borderRadius: 7,
                height: 55,
                marginBottom: 15,
            }}
            onPress={() => {
                navigation.navigate({
                    name: 'OfferDetails',
                    params: { offerId: props?.rowData?.id },
                });
                /* selectOffer() */
            }}
        >
            <HStack
                style={{
                    height: '100%',
                }}
            >
                <VStack
                    justifyContent="center"
                    alignItems="center"
                    style={{
                        backgroundColor: getColor(props?.rowData?.offerType),
                        borderTopLeftRadius: 7,
                        borderBottomLeftRadius: 7,
                        width: 55,
                        height: '100%',
                    }}
                >
                    <Text
                        textAlign="center"
                        fontFamily={fonts.bold}
                        color={theme.colors.info[200]}
                        fontSize={
                            props?.rowData?.offerType ===
                            OfferTypeEnum.PERCENTAGE
                                ? fontSizes['dm-3p']
                                : fontSizes['dm-sm']
                        }
                        hPadding={3}
                        numberOfLines={2}
                    >
                        {getTitle(
                            props?.rowData?.offerType,
                            props?.rowData?.value
                        )}
                    </Text>
                </VStack>
                <View
                    style={{
                        paddingLeft: 15,
                        width: '100%',
                    }}
                >
                    <Text
                        fontSize={fontSizes['dm-2p']}
                        fontFamily={fonts.mono}
                        color={theme.colors.info[50]}
                        textAlign="left"
                        numberOfLines={1}
                        width={'80%'}
                    >
                        {props?.rowData?.title}
                    </Text>
                    <Text
                        fontSize={fontSizes['dm-p']}
                        color={
                            props?.rowData.endOfOffer &&
                            moment(new Date()).isAfter(
                                moment(props?.rowData.endOfOffer)
                            )
                                ? theme.colors.danger[100]
                                : theme.colors.info[600]
                        }
                        textAlign="left"
                    >
                        {checkExpiration()}
                    </Text>
                </View>
            </HStack>
        </TouchableOpacity>
    );
}

export default OfferItem;
