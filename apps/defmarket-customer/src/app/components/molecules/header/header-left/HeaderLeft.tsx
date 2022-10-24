import React, { ReactElement } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
export interface HeaderLeftProps {
    icon: string | ReactElement | any;
    style?: ViewStyle;
    onPress: () => void;
}
export default function HeaderLeft(props: HeaderLeftProps) {
    return (
        <TouchableOpacity
            style={{
                paddingHorizontal: '3%',
                ...props.style,
            }}
            onPress={() => {
                props.onPress();
            }}
        >
            {props.icon}
        </TouchableOpacity>
    );
}
