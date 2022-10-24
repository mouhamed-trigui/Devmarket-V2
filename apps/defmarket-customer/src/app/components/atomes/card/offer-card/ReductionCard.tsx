import { TouchableOpacity, View } from 'react-native';
import React, { FC, useMemo } from 'react';
import Text from '../../text/Text';
import { info } from '../../../../theme/colors';
import { fonts, fontSizes } from '../../../../theme/fonts';
import { Info } from '../../../../theme/svgs';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from './../../../../stores/slices/user/user';
import HStack from '../../stack/HStack';
import VStack from '../../stack/VStack';
import * as Clipboard from 'expo-clipboard';
import { RootState } from '../../../../stores/store';

const ReductionCard: FC<{
    width?: string | number;
    height: string | number;
    backgroundColor: any;
    text?: string;
    percentage: string | number;
    cardLevel: 'Offre minimum' | 'Offre medium' | 'Offre premium';
    onPressCard?: () => void;
    onPressActivateCode?: () => void;
    validated?: boolean;
    offerCategory: 'PHYSICAL' | 'E_COMMERCE';
    accessibleOffer?: string;
}> = ({
    width,
    height,
    backgroundColor,
    text,
    percentage,
    cardLevel,
    onPressCard,
    onPressActivateCode,
    validated,
    offerCategory,
    accessibleOffer,
}) => {
    const dispatch = useDispatch();

    const selectedOffer = useSelector((state: RootState) => state.user.offer);

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

    const toggleModal = (modalName, status) => {
        dispatch(
            userActions.setModalStatus({
                modalName: modalName,
                modalStatus: status,
            })
        );
    };

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync('NOEL2022');
    };

    return (
        <View
            style={{
                backgroundColor: backgroundColor,
                borderRadius: 8,
                marginVertical: 5,
                height: height,
                width: width,
                alignSelf: 'center',
                opacity:
                    offerCategory === 'E_COMMERCE'
                        ? undefined
                        : cardLevel === accessibleOffer
                        ? undefined
                        : 0.6,
            }}
        >
            {offerCategory === 'PHYSICAL' ? (
                <>
                    {validated ? (
                        <View
                            style={{
                                alignItems: 'center',
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    alignSelf: 'flex-end',
                                    marginRight: 10,
                                    marginTop: 8,
                                }}
                                onPress={() => {
                                    dispatch(userActions.setLevel(cardLevel));
                                    toggleModal('offerLevel', true);
                                }}
                            >
                                <Info fill={info[200]} width={18} height={14} />
                            </TouchableOpacity>
                            <Text
                                fontFamily={fonts.bold}
                                fontSize={30}
                                color={info[200]}
                            >
                                {percentage + symbol}
                            </Text>
                            <Text
                                fontFamily={fonts.medium}
                                fontSize={12}
                                color={info[200]}
                            >
                                {cardLevel}
                            </Text>
                        </View>
                    ) : selectedOffer.offerType === 'GOOD_PLAN' ? (
                        <TouchableOpacity
                            disabled={accessibleOffer !== cardLevel}
                            onPress={onPressCard}
                            style={{
                                flex: 1,
                            }}
                        >
                            <HStack
                                style={{
                                    marginHorizontal: 10,
                                    flex: 1,
                                }}
                            >
                                <VStack
                                    style={{
                                        marginLeft: 10,
                                        justifyContent: 'flex-start',
                                        flex: 1,
                                    }}
                                >
                                    <Text
                                        fontFamily={fonts.bold}
                                        fontSize={15}
                                        color={info[200]}
                                        moreParams={{
                                            paddingRight: 15,
                                            alignSelf: 'center',
                                        }}
                                    >
                                        {percentage}
                                    </Text>
                                    <Text
                                        fontFamily={fonts.bold}
                                        fontSize={15}
                                        color={info[200]}
                                        moreParams={{
                                            alignSelf: 'center',
                                        }}
                                    >
                                        {cardLevel}
                                    </Text>
                                </VStack>
                                <TouchableOpacity
                                    onPress={() => {
                                        dispatch(
                                            userActions.setLevel(cardLevel)
                                        );
                                        toggleModal('offerLevel', true);
                                    }}
                                    style={{
                                        marginBottom: 33,
                                    }}
                                >
                                    <Info
                                        fill={info[200]}
                                        style={{ marginLeft: 10 }}
                                    />
                                </TouchableOpacity>
                            </HStack>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            disabled={accessibleOffer !== cardLevel}
                            onPress={onPressCard}
                            style={{
                                flex: 1,
                            }}
                        >
                            <HStack
                                style={{
                                    marginHorizontal: 10,
                                    flex: 1,
                                }}
                            >
                                <HStack
                                    style={{
                                        marginLeft: 10,
                                        justifyContent: 'flex-start',
                                        flex: 1,
                                    }}
                                >
                                    <Text
                                        fontFamily={fonts.bold}
                                        fontSize={30}
                                        color={info[200]}
                                        moreParams={{ paddingRight: 15 }}
                                    >
                                        {percentage + symbol + ' -'}
                                    </Text>
                                    <Text
                                        fontFamily={fonts.bold}
                                        fontSize={20}
                                        color={info[200]}
                                    >
                                        {cardLevel}
                                    </Text>
                                </HStack>
                                <TouchableOpacity
                                    onPress={() => {
                                        dispatch(
                                            userActions.setLevel(cardLevel)
                                        );
                                        toggleModal('offerLevel', true);
                                    }}
                                    style={{
                                        marginBottom: 33,
                                    }}
                                >
                                    <Info
                                        fill={info[200]}
                                        style={{ marginLeft: 10 }}
                                    />
                                </TouchableOpacity>
                            </HStack>
                        </TouchableOpacity>
                    )}
                </>
            ) : (
                <>
                    {validated ? (
                        <>
                            <HStack
                                justifyContent="space-between"
                                style={{
                                    marginHorizontal: 8,
                                    marginTop: 8,
                                }}
                            >
                                <Text
                                    fontFamily={fonts.bold}
                                    fontSize={12}
                                    color={info[200]}
                                >
                                    {cardLevel + '  ' + percentage}
                                </Text>
                                <TouchableOpacity onPress={onPressActivateCode}>
                                    <Info
                                        fill={info[200]}
                                        style={{ marginLeft: 10 }}
                                    />
                                </TouchableOpacity>
                            </HStack>
                            <HStack style={{ marginVertical: 10 }}>
                                <TouchableOpacity
                                    onPress={copyToClipboard}
                                    style={{
                                        marginLeft: 40,
                                        alignSelf: 'flex-start',
                                        width: 22,
                                        height: 28,
                                        borderWidth: 1,
                                        paddingLeft: 13,
                                        borderRadius: 3,
                                        borderColor: 'white',
                                    }}
                                >
                                    <View
                                        style={{
                                            alignSelf: 'center',
                                            width: 22,
                                            height: 28,
                                            marginTop: 5,
                                            borderRadius: 3,
                                            borderWidth: 1,
                                            borderTopWidth: 0.2,
                                            borderStartWidth: 0.2,
                                            borderBottomColor: 'white',
                                            borderRightColor: 'white',
                                            borderTopColor: 'white',
                                            borderLeftColor: 'white',
                                        }}
                                    ></View>
                                </TouchableOpacity>
                                <View
                                    style={{
                                        marginRight: 40,
                                        flexGrow: 1,
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text
                                        fontFamily={fonts.bold}
                                        fontSize={22}
                                        color={info[200]}
                                    >
                                        NOEL2022
                                    </Text>
                                </View>
                            </HStack>
                        </>
                    ) : (
                        <HStack
                            style={{
                                marginHorizontal: 8,
                                justifyContent: 'space-between',
                                flex: 1,
                            }}
                        >
                            <TouchableOpacity
                                onPress={onPressActivateCode}
                                style={{
                                    borderRadius: 8,
                                    justifyContent: 'center',
                                    backgroundColor: 'white',
                                    width: '40%',
                                    height: 40,
                                }}
                            >
                                <Text
                                    fontFamily={fonts.bold}
                                    fontSize={fontSizes['dm-p']}
                                    color={info[50]}
                                    moreParams={{
                                        alignSelf: 'center',
                                    }}
                                >
                                    {text}
                                </Text>
                            </TouchableOpacity>

                            <HStack>
                                <VStack>
                                    <Text
                                        fontFamily={fonts.bold}
                                        fontSize={12}
                                        color={info[200]}
                                    >
                                        {cardLevel}
                                    </Text>
                                </VStack>
                                <TouchableOpacity
                                    onPress={() => {
                                        dispatch(
                                            userActions.setLevel(cardLevel)
                                        );
                                        toggleModal('offerLevel', true);
                                    }}
                                    style={{
                                        marginBottom: 33,
                                    }}
                                >
                                    <Info
                                        fill={info[200]}
                                        style={{ marginLeft: 10 }}
                                    />
                                </TouchableOpacity>
                            </HStack>
                        </HStack>
                    )}
                </>
            )}
        </View>
    );
};

export default ReductionCard;
