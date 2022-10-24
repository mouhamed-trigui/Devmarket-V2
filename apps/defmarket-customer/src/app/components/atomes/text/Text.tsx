import React from 'react';
import { StyleProp, StyleSheet, Text as TText, ViewStyle } from 'react-native';
import { Style } from 'util';
import { fonts, fontSizes } from '../../../theme/fonts';
/* eslint-disable-next-line */
export interface TextProps {
    children: string | any;
    fontFamily?: 'body' | 'heading' | 'mono' | 'workSans' | 'bold' | string;
    fontSize?: 'dm-h1' | 'dm-h2' | 'dm-p' | 'dm-2p' | 'dm-3p' | number | string;
    textAlign?:
        | 'justify'
        | 'center'
        | '-moz-initial'
        | 'end'
        | 'left'
        | 'right'
        | 'start'
        | 'revert'
        | 'inherit'
        | 'initial';
    color?: string | any;
    hPadding?: number | string;
    vPadding?: number | string;
    width?: number | string;
    numberOfLines?: number;
    // get more params
    moreParams?:
        | StyleProp<ViewStyle>
        | StyleSheet
        | ViewStyle
        | any
        | undefined;
}

export function Text(props: TextProps) {
    return (
        <TText
            numberOfLines={props.numberOfLines ?? 1}
            style={{
                color: props.color,
                fontFamily: props?.fontFamily ?? fonts.body,
                fontSize: props?.fontSize ?? fontSizes['dm-p'],
                textAlign: props?.textAlign ?? 'left',
                width: props?.width ?? 'auto',
                paddingHorizontal: props?.hPadding ?? null,
                paddingVertical: props?.vPadding ?? null,
                /*   paddingRight: 13, */
                ...props.moreParams,
            }}
        >
            {props.children}
        </TText>
    );
}

export default Text;
