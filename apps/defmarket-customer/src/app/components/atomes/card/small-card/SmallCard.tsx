import React, { useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Text from '../../text/Text';
import { fonts } from '../../../../theme/fonts';
import { fontSizes } from './../../../../theme/fonts';
import { blueShadow } from './../../../../theme/style';
import { ThemeContext } from '../../../../context/ThemeContext';

export interface SmallCardProps {
    title: string;
    icon: string | any;
    path: string;
    height: number | string;
    width: number | string;
    onPress: (data: string) => void;
}
export default function SmallCard(props: SmallCardProps) {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <TouchableOpacity
            onPress={() => {
                props.onPress(props.path);
            }}
            style={{
                backgroundColor: theme.colors.info[50],
                height: props.height ?? 150,
                width: props.width ?? 150,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: 10,
                paddingTop: 20,
                paddingBottom: 15,
                paddingHorizontal: 5,
                marginBottom: 20,
                ...blueShadow,
            }}
        >
            {props.icon}
            <Text
                fontFamily={fonts.mono}
                fontSize={fontSizes['dm-h2']}
                color={theme.colors.info[200]}
                textAlign="center"
                numberOfLines={2}
            >
                {props.title}
            </Text>
        </TouchableOpacity>
    );
}
