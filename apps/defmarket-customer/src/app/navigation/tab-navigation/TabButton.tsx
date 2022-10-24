import React, { useContext } from 'react';
import { View, Text, Platform } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import { fontSizes } from './../../theme/fonts';
export interface ISvgButtonProps {
    icon: any;
    name?: string;
    active?: boolean;
}

const TabButton = (props: ISvgButtonProps) => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <View>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: 55,
                    padding: 3,
                    borderRadius: 7,
                    backgroundColor: props.active
                        ? 'rgba(255, 255, 255, 0.2)'
                        : 'transparent',
                }}
            >
                {Platform.OS === 'web' ? <View></View> : props.icon}
                <Text
                    style={{
                        color: props.active
                            ? theme.colors.primary[100]
                            : theme.colors.info[200],
                        fontSize: fontSizes['dm-xs'],
                        paddingTop: 6,
                        textAlign: 'center',
                    }}
                >
                    {props.name}
                </Text>
            </View>
        </View>
    );
};

export default TabButton;
