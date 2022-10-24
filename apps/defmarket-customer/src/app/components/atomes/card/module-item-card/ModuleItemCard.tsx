import React, { ReactElement, useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Text from '../../text/Text';
import { fonts, fontSizes } from '../../../../theme/fonts';
import { blueShadow } from '../../../../theme/style';
import { ThemeContext } from '../../../../context/ThemeContext';

export interface ModuleItemCardProps {
    title: string;
    description: string;
    icon: string | ReactElement | any;
    textColor?: string;
    bgColor?: string;
    iconColor?: string;
    path: string;
    onPress?: (data: string) => void;
}
export default function ModuleItemCard(props: ModuleItemCardProps) {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <TouchableOpacity
            onPress={() => {
                props?.onPress(props.path);
            }}
            style={{
                backgroundColor: props?.bgColor ?? theme.colors.primary[50],
                height: 140,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 10,
                padding: 20,
                marginBottom: 20,
                ...blueShadow,
            }}
        >
            <View
                style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                }}
            >
                {props?.icon}
            </View>
            <Text
                fontFamily={fonts.mono}
                fontSize={fontSizes['dm-h2']}
                color={props?.textColor ?? theme.colors.info[200]}
            >
                {props?.title}
            </Text>
            <Text
                fontFamily={fonts.body}
                fontSize={fontSizes['dm-p']}
                color={props?.textColor ?? theme.colors.info[200]}
            >
                {props?.description}
            </Text>
        </TouchableOpacity>
    );
}
