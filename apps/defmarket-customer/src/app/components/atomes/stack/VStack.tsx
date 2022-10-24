import React from 'react';
import { FlexAlignType, View, ViewStyle } from 'react-native';

export interface VStackProps {
    justifyContent?:
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'space-between'
        | 'space-around'
        | 'space-evenly';
    alignItems?: FlexAlignType;
    style?: ViewStyle;
    children: any;
}
function VStack(props: VStackProps) {
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: props.justifyContent ?? 'flex-start',
                alignItems: props.alignItems ?? 'flex-start',
                ...props.style,
            }}
        >
            {props.children}
        </View>
    );
}

export default VStack;
