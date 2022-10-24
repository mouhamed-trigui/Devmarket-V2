import {
    View,
    Button as BButton,
    TouchableOpacity,
    Image,
    ViewStyle,
} from 'react-native';
import React, { FC, useContext } from 'react';
import Text from '../../text/Text';
import { BilletsWhite } from '../../../../theme/svgs';
import HStack from '../../stack/HStack';
import { fonts, fontSizes } from '../../../../theme/fonts';
import { ThemeContext } from '../../../../context/ThemeContext';

export interface ButtomProps {
    key?: string | number;
    viewWidth?: string | number;
    height?: string | number;
    title: string;
    color?: string;
    backgroundColor?: string;
    isDisabled?: boolean;
    leftIcon?: any;
    rightIcon?: any;
    style?: ViewStyle;
    onPress: () => void;
}
export default function Button({
    viewWidth,
    height,
    title,
    color,
    backgroundColor,
    key,
    isDisabled,
    leftIcon,
    rightIcon,
    style,
    onPress,
}: ButtomProps) {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <>
            <TouchableOpacity
                style={{
                    borderRadius: 5,
                    width: viewWidth ?? '100%',
                    height: height,
                    paddingHorizontal: 15,
                    backgroundColor:
                        backgroundColor ?? theme.colors.primary[50],
                    ...style,
                }}
                key={key}
                disabled={isDisabled}
                onPress={onPress}
            >
                <HStack justifyContent="center" alignItems="center">
                    {leftIcon}
                    <Text
                        vPadding={15}
                        hPadding={20}
                        fontFamily={fonts.bold}
                        fontSize={fontSizes['dm-2p']}
                        color={color}
                    >
                        {title}
                    </Text>
                    {rightIcon}
                </HStack>
            </TouchableOpacity>
        </>
    );
}
