import React, { useContext } from 'react';
import { View, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { ThemeContext } from '../../../../context/ThemeContext';
import { blueShadow } from './../../../../theme/style';
import Text from '../../text/Text';
import { fonts, fontSizes } from './../../../../theme/fonts';
import { BoutonObtenirUnItineraire } from '../../../../theme/svgs';
import IconButton from '../../icon-button/IconButton';
import { StoreTypeEnum } from '../../../../services/constants';
import { getFullStoreAddress, openMap } from '../../../../helpers';
import { getStoreType } from './StoreDetailsCard';
import StoreStatus from '../../../molecules/store-status/StoreStatus';
import { ITimeTable } from '../../../../services/model/store';

export interface ShopCardProps {
    title: string;
    abbreviationName?: string;
    status: string;
    location: {
        latitude: Number;
        longitude: Number;
    };
    address: {
        country: string;
        department: string;
        city: string;
        street: string;
        zipCode: string;
    };
    openingTime: Date | string;
    closingTime: Date | string;
    type?: StoreTypeEnum;
    image: string;
    coverImage: string;
    eCommerceAndPhysicalStore: boolean;
    timeTable: Array<ITimeTable>;
    distance: number;
    onPress: () => void;
}

function ShopCard(props: ShopCardProps) {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const getAbbreviation = (title) => {
        const chars = title.match(/\b(\w)/g);
        return chars.length >= 2 ? `${chars[0]}-${chars[1]}` : chars[0];
    };

    return (
        <TouchableOpacity
            style={{
                height: 180,
                backgroundColor: theme.colors.info[200],
                borderRadius: 7,
                marginBottom: 15,
                ...blueShadow,
            }}
            onPress={() => props.onPress()}
        >
            <View
                style={{
                    height: '45%',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'relative',
                }}
            >
                <ImageBackground
                    source={{ uri: props.coverImage }}
                    imageStyle={{
                        height: '100%',
                        borderTopLeftRadius: 7,
                        borderTopRightRadius: 7,
                    }}
                    resizeMode="cover"
                    style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                    }}
                />
                {props?.type &&
                    props?.type === StoreTypeEnum.PHYSICAL_AND_E_COMMERCE &&
                    props?.eCommerceAndPhysicalStore && (
                        <View
                            style={{
                                backgroundColor: theme.colors.info[50],
                                borderTopRightRadius: 7,
                                position: 'absolute',
                                top: 0,
                                right: 0,
                            }}
                        >
                            <Text
                                fontFamily={fonts.body}
                                fontSize={fontSizes['dm-sm']}
                                color={theme.colors.info[200]}
                                vPadding={5}
                                hPadding={10}
                            >
                                {getStoreType(props.type)}
                            </Text>
                        </View>
                    )}

                <View
                    style={{
                        height: 45,
                        width: 45,
                        borderRadius: 50,
                        marginHorizontal: 15,
                        backgroundColor: theme.colors.info[200],
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {props.image ? (
                        <Image
                            resizeMode={'cover'}
                            style={{ width: 45, height: 45, borderRadius: 50 }}
                            source={{
                                uri: props?.image,
                            }}
                        />
                    ) : (
                        <Text
                            fontFamily={fonts.mono}
                            fontSize={fontSizes['dm-p']}
                            color={theme.colors.info[50]}
                            vPadding={5}
                            hPadding={10}
                        >
                            {getAbbreviation(props.title)}
                        </Text>
                    )}
                </View>
            </View>
            <View
                style={{
                    height: '55%',
                    padding: 12,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <View
                    style={{
                        height: '100%',
                        width: '70%',
                    }}
                >
                    <Text
                        fontFamily={fonts.mono}
                        fontSize={fontSizes['dm-2p']}
                        color={theme.colors.info[50]}
                        numberOfLines={1}
                    >
                        {props.title}
                    </Text>
                    <StoreStatus timeTable={props?.timeTable} />
                    <View
                        style={{
                            marginTop: 'auto',
                        }}
                    >
                        <Text
                            fontFamily={fonts.italic}
                            fontSize={fontSizes['dm-sm']}
                            color={theme.colors.info[50]}
                        >
                            {props?.distance !== null &&
                            props?.distance !== undefined
                                ? `À ${(
                                      props?.distance / 1000
                                  ).toFixed()} km - `
                                : ''}

                            {getFullStoreAddress(props?.address)}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minWidth: '20%',
                    }}
                >
                    <IconButton
                        icon={<BoutonObtenirUnItineraire />}
                        index={0}
                        onlyIcon={true}
                        completed={false}
                        onPress={(id) => {
                            openMap({
                                ...props,
                                latitude: props?.location?.latitude,
                                longitude: props?.location?.longitude,
                            });
                        }}
                    />
                    <Text
                        fontFamily={fonts.body}
                        fontSize={fontSizes['dm-sm']}
                        color={theme.colors.info[50]}
                        vPadding={5}
                    >
                        M'y rendre
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
export default ShopCard;
