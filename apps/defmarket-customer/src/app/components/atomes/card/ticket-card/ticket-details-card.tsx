import React, { useContext, useState } from 'react';
import { ImageBackground, View, StyleSheet } from 'react-native';
import { fonts } from '../../../../theme/fonts';
import { BoutonObtenirUnItineraire, RadioBlanc } from '../../../../theme/svgs';
import { ThemeContext } from '../../../../context/ThemeContext';
import Text from '../../text/Text';
import { fontSizes } from './../../../../theme/fonts';
import VStack from '../../stack/VStack';
import HStack from '../../stack/HStack';
import IconButton from '../../icon-button/IconButton';
function StoreDetailsCard(props) {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { ticket } = props;

    return (
        <View
            style={{
                paddingBottom: 10,
            }}
        >
            <ImageBackground
                source={{
                    uri: ticket.coverImage,
                }}
                style={{
                    height: 100,
                }}
            ></ImageBackground>

            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                }}
            >
                <ImageBackground
                    source={{
                        uri: ticket.image,
                    }}
                    imageStyle={{
                        height: '100%',
                        borderRadius: 15,
                    }}
                    resizeMode="cover"
                    style={{
                        width: '40%',
                        backgroundColor: theme.colors.info[300],
                        borderColor: theme.colors.info[100],
                        shadowColor: '#000000',
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        shadowOffset: {
                            height: 1,
                            width: 1,
                        },
                        borderWidth: 1,
                        height: 135,
                        width: 135,
                        borderRadius: 15,
                        marginTop: 20,
                        marginLeft: 20,
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    {ticket.type && ticket.type === 'E-billet' && (
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
                                {ticket.type}
                            </Text>
                        </View>
                    )}
                </ImageBackground>
                <View style={{ paddingTop: 22, width: '60%' }}>
                    <HStack display="flex" justifyContent="space-between">
                        <Text
                            fontFamily={fonts.mono}
                            fontSize={fontSizes['dm-h2']}
                            color={theme.colors.info[50]}
                            hPadding={10}
                            width={'80%'}
                        >
                            {ticket.title}
                        </Text>
                        <Text
                            fontSize={fontSizes['dm-p']}
                            color={theme.colors.info[50]}
                            moreParams={styles.textDecorationLine}
                            hPadding={10}
                        >
                            {ticket.prix}€
                        </Text>
                    </HStack>
                    <Text
                        fontFamily={fonts.body}
                        fontSize={fontSizes['dm-sm']}
                        color={theme.colors.info[50]}
                        vPadding={5}
                        hPadding={10}
                    >
                        {ticket.category}
                    </Text>
                    <HStack style={styles.from}>
                        <Text
                            hPadding={10}
                            fontFamily={fonts.italic}
                            fontSize={fontSizes['dm-p']}
                            color={theme.colors.info[50]}
                        >
                            À partir de
                        </Text>
                        <Text
                            fontFamily={fonts.mono}
                            fontSize={fontSizes['dm-p']}
                            color={theme.colors.info[50]}
                        >
                            {`${ticket.prix} €`}
                        </Text>
                    </HStack>
                    <VStack
                        style={
                            (styles.from, { paddingLeft: 10, paddingTop: 5 })
                        }
                        onPress={() => alert("M'y rendre")}
                    >
                        <IconButton
                            icon={<BoutonObtenirUnItineraire />}
                            index={0}
                            onlyIcon={true}
                            completed={false}
                            style={{
                                marginLeft: 12,
                            }}
                        />
                        <Text
                            fontFamily={fonts.body}
                            fontSize={fontSizes['dm-sm']}
                            color={theme.colors.info[50]}
                            vPadding={5}
                            textAlign="center"
                        >
                            M'y rendre
                        </Text>
                    </VStack>
                </View>
            </View>
            <View style={{ padding: 12 }}>
                <Text
                    fontFamily={fonts.mono}
                    fontSize={fontSizes['dm-h2']}
                    color={theme.colors.info[50]}
                    numberOfLines={2}
                    hPadding={10}
                >
                    {ticket.subTitle}
                </Text>
                <Text
                    fontFamily={fonts.body}
                    fontSize={fontSizes['dm-p']}
                    color={theme.colors.info[50]}
                    numberOfLines={2}
                    hPadding={10}
                    vPadding={5}
                >
                    {ticket.dueDate}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    textDecorationLine: {
        textDecorationLine: 'line-through',
    },
    from: {
        marginTop: 4,
    },
    helper: {
        padding: 5,
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 10,
        borderRadius: 10,
    },
});

export default StoreDetailsCard;
