import React from 'react';
import { FlexAlignType, View, ViewStyle } from 'react-native';

export interface HStackProps {
    display?: 'none' | 'flex' | undefined;
    justifyContent?:
        | 'center'
        | 'flex-start'
        | 'flex-end'
        | 'space-between'
        | 'space-around'
        | 'space-evenly';
    alignItems?: FlexAlignType | undefined;
    style?: ViewStyle;
    children: any;
}

function HStack(props: HStackProps) {
    return (
        <View
            style={{
                display: props.display ?? 'flex',
                flexDirection: 'row',
                justifyContent: props.justifyContent ?? 'flex-start',
                alignItems: props.alignItems ?? 'center',
                ...props.style,
            }}
        >
            {props.children}
        </View>
    );
}

export default HStack;
