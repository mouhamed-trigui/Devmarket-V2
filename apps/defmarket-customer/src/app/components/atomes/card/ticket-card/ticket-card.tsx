import React, { useContext } from 'react';
import {
    View,
    ImageBackground,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
import { ThemeContext } from '../../../../context/ThemeContext';
import { blueShadow } from './../../../../theme/style';
import Text from '../../text/Text';
import { fonts, fontSizes } from './../../../../theme/fonts';

/* eslint-disable-next-line */
export interface TicketCardProps {
    title: string;
    discount: Number;
    prix: Number;
    type?: string;
    status?: string;
    category: string;
    coverImage: string;
    onPress: () => void;
}

export function TicketCard(props: TicketCardProps) {
    const { theme } = useContext(ThemeContext);
    const styles = StyleSheet.create({
        container: {
            height: 200,
            backgroundColor: theme.colors.info[200],
            borderRadius: 12,
            marginBottom: 15,
            width: '45%',
            margin: 8,
            ...blueShadow,
        },
        imageStyle: {
            height: '100%',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
        },
        view: {
            height: '60%',
            padding: 12,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        flexView: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        flexViewCenter: {
            display: 'flex',
            justifyContent: 'center',
        },
        textDecorationLine: {
            textDecorationLine: 'line-through',
        },
    });

    let getAbbreviation = (title) => {
        let chars = title.match(/\b(\w)/g);
        return chars.length >= 2 ? `${chars[0]}-${chars[1]}` : chars[0];
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => props.onPress()}
        >
            <ImageBackground
                source={{
                    uri: props.coverImage,
                }}
                imageStyle={styles.imageStyle}
                resizeMode="cover"
                style={{
                    height: '40%',
                    ...styles.flexViewCenter,
                }}
            >
                {props.type && props.type === 'E-billet' && (
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
                            {props.type}
                        </Text>
                    </View>
                )}
            </ImageBackground>
            <View style={styles.view}>
                <View
                    style={{
                        height: '100%',
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
                    <View
                        style={{
                            ...styles.flexView,
                            marginVertical: 3,
                        }}
                    >
                        <Text
                            fontFamily={fonts.body}
                            fontSize={fontSizes['dm-sm']}
                            color={theme.colors.info[50]}
                        >
                            {props.category}
                        </Text>
                    </View>
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
                            À partir de
                        </Text>
                        <View style={styles.flexView}>
                            <Text
                                fontFamily={fonts.mono}
                                fontSize={fontSizes['dm-p']}
                                color={theme.colors.info[50]}
                            >
                                {props.prix} €
                            </Text>

                            <Text
                                fontSize={fontSizes['dm-p']}
                                color={theme.colors.info[50]}
                                moreParams={styles.textDecorationLine}
                            >
                                {`${
                                    props.prix -
                                    (props.discount / 100) * props.prix
                                } €`}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default TicketCard;
