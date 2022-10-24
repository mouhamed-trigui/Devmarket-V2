import React, { useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Text from '../../text/Text';
import Card from '../general-card/Card';
import { fonts, fontSizes } from './../../../../theme/fonts';
import { ThemeContext } from '../../../../context/ThemeContext';
import VStack from '../../stack/VStack';

export default function SmallPubCard(props: {
    backgroundColor?: string;
    title: string;
    text: string;
}) {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <Card
            style={{
                marginVertical: 15,
                marginRight: 15,
                paddingBottom: 15,
                paddingHorizontal: 15,
            }}
            height={150}
            width={150}
            backgroundColor={props.backgroundColor}
            borderRadius={7}
        >
            <VStack
                style={{
                    height: '100%',
                }}
            >
                <TouchableOpacity>
                    <Text
                        textAlign="right"
                        fontSize={fontSizes['dm-h1']}
                        fontFamily={fonts.bold}
                        color={theme.colors.info[200]}
                    >
                        ...
                    </Text>
                </TouchableOpacity>
                <View
                    style={{
                        marginTop: 'auto',
                    }}
                >
                    <Text
                        moreParams={{ marginTop: 'auto' }}
                        color={theme.colors.info[200]}
                        fontSize={fontSizes['dm-h2']}
                        fontFamily={fonts.mono}
                        textAlign="left"
                    >
                        {props.title}
                    </Text>
                    <Text textAlign="left" color={theme.colors.info[200]}>
                        {props.text}
                    </Text>
                </View>
            </VStack>
        </Card>
    );
}
