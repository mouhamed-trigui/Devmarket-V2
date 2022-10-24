import React, { useContext } from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { fonts, fontSizes } from './../../../../theme/fonts';
import Text from '../../text/Text';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeContext } from '../../../../context/ThemeContext';
export interface AnnouncementCardProps {
    title: string;
    description: string;
    image: string;
    link: string;
    onPress?: (data: string) => void;
}

export default function AnnouncementCard(props: AnnouncementCardProps) {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <TouchableOpacity
            onPress={() => {
                props.onPress(props.link);
            }}
            style={{
                marginRight: 15,
            }}
        >
            <ImageBackground
                source={{
                    uri: props.image,
                }}
                resizeMode="cover"
                imageStyle={{ borderRadius: 7 }}
                style={{
                    height: 100,
                    width: 300,
                }}
            >
                <LinearGradient
                    colors={[
                        'transparent',
                        'rgba(0 ,54 ,82 ,0.2)',
                        'rgba(0 ,54 ,82 ,0.4)',
                        'rgba(0 ,54 ,82 ,0.7)',
                        'rgba(0 ,54 ,82 ,0.95)',
                    ]}
                    style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        padding: 15,
                        borderRadius: 7,
                    }}
                >
                    <Text
                        fontFamily={fonts.mono}
                        fontSize={fontSizes['dm-2p']}
                        color={theme?.colors.info['200'] ?? 'white'}
                    >
                        {props.title}
                    </Text>
                    <Text
                        fontSize={fontSizes['dm-p2']}
                        color={theme.colors?.info['200']}
                    >
                        {props.description}
                    </Text>
                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    );
}
