import React from 'react';
import {
    Box,
    HStack,
    Icon,
    Pressable,
    Center,
    Text as TextNB,
} from 'native-base';
import { Text } from '../../../components/atomes';
import { MaterialIcons } from '@expo/vector-icons';
import { Platform } from 'expo-modules-core';
import CloseIcon from '../../../../assets/images/svg/close.svg';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { companyActions } from '../../../stores/slices/company/companySlice';
import { userActions } from '../../../stores/slices';
import { TouchableOpacity } from 'react-native';

/* eslint-disable-next-line */
export interface OfferItemProps {
    rowData: any;
    rowMap?: any;
    navigation: any;
}

export interface OfferItemHiddenItemProps {
    data: any;
    rowMap?: any;
}

export function OfferItem(props: OfferItemProps) {
    const dispatch = useDispatch();
    const { selectedStore } = useSelector((state: any) => state.company);
    const getColor = (offerType: string) => {
        switch (offerType) {
            case 'PERCENTAGE':
                return '#CA0000';
            case 'FLAT':
                return '#EFBE00';
            case 'GOOD_PLAN':
                return '#00FEAA';
            default:
                return '#91d1e9';
                break;
        }
    };
    const getTitle = (offerType: string, value: string) => {
        switch (offerType) {
            case 'PERCENTAGE':
                return `-${value}%`;
            case 'FLAT':
                return `-${value}€`;
            case 'GOOD_PLAN':
                return 'BON\nPLAN';
            default:
                return 'DIGITAL';
        }
    };

    const selectOffer = () => {
        dispatch(
            companyActions.setSelectedOffer({
                ...props?.rowData?.item,
                storeId: selectedStore.id,
                startOfOffer:
                    Platform.OS === 'web' && props?.rowData?.item?.startOfOffer
                        ? props?.rowData?.item?.startOfOffer.replace(':00Z', '')
                        : props?.rowData?.item?.startOfOffer,
                endOfOffer:
                    Platform.OS === 'web' && props?.rowData?.item?.endOfOffer
                        ? props?.rowData?.item?.endOfOffer.replace(':00Z', '')
                        : props?.rowData?.item?.endOfOffer,
            })
        );
        dispatch(userActions.setPreviousScreenName('listOffer'));
        props?.navigation?.navigate('OffreDetails');
    };
    return (
        <Box pl="3" pr="3" padding={1}>
            <TouchableOpacity
                style={{ borderRadius: 10, backgroundColor: 'white' }}
                onPress={() => selectOffer()}
            >
                <Box
                    pl="2"
                    pr="2"
                    py="2"
                    // borderTopWidth="1"
                    borderTopColor="#F6F6F7"
                >
                    <HStack alignItems="center" space={3} flexGrow={1}>
                        <Center
                            backgroundColor={getColor(
                                props?.rowData?.item?.offerType
                            )}
                            borderRadius={10}
                            style={{ width: 50, height: 50 }}
                        >
                            <TextNB
                                color={'system.200'}
                                fontSize={
                                    props?.rowData?.item?.offerType ===
                                        'PERCENTAGE' ||
                                    props?.rowData?.item?.offerType === 'FLAT'
                                        ? 14
                                        : 10
                                }
                                bold
                                textAlign={'center'}
                            >
                                {getTitle(
                                    props?.rowData?.item?.offerType,
                                    props?.rowData?.item?.value
                                )}
                            </TextNB>
                        </Center>
                        <Box ml={1} flexGrow={1} flexShrink={1}>
                            <Text
                                fontSize="dm-2p"
                                fontFamily="body"
                                color="#484848"
                                textAlign="left"
                                bold={true}
                            >
                                {props?.rowData?.item?.title}
                            </Text>
                            <Text
                                fontSize="dm-p"
                                // fontFamily="body"
                                style={{ flexGrow: 1 }}
                                color={
                                    props?.rowData.item?.endOfOffer &&
                                    moment(new Date()).isAfter(
                                        moment(props?.rowData.item?.endOfOffer)
                                    )
                                        ? '#CA0000'
                                        : '#B1B1B1'
                                }
                                textAlign="left"
                            >
                                {props?.rowData.item?.endOfOffer &&
                                moment(new Date()).isAfter(
                                    moment(props?.rowData.item?.endOfOffer)
                                )
                                    ? 'Expiré'
                                    : moment(
                                          props?.rowData.item?.startOfOffer
                                      ).format('DD/MM/YYYY')}
                            </Text>
                        </Box>
                    </HStack>
                </Box>
            </TouchableOpacity>
        </Box>
    );
}

export default OfferItem;

const selectedDeleteItem = (props: any) => {
    props?.setShowDialog(true);
    props?.setRowData();
    props?.closeRow();
};

export const OfferItemHiddenItem = (props: any) => {
    return (
        <Pressable
            w="70"
            flexGrow={1}
            ml="auto"
            bg="#E8E8E8"
            justifyContent="center"
            marginRight={3}
            borderTopRightRadius={10}
            borderBottomRightRadius={10}
            margin={1}
            alignItems="center"
            onPress={() => selectedDeleteItem(props)}
            _pressed={{
                opacity: 0.5,
            }}
        >
            {Platform.OS === 'web' ? (
                <Icon
                    as={<MaterialIcons name="close" />}
                    color="#003753"
                    size="xl"
                />
            ) : (
                <CloseIcon fill="#003753" />
            )}
        </Pressable>
    );
};
