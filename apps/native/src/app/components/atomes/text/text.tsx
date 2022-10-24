import React from 'react';
import { Text as TextNB } from 'native-base';
import { TextStyle } from 'react-native';
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
    color?: string;
    fontWeight?: number | string | undefined;
    // get more params
    bold?: boolean;
    italic?: boolean;
    width?: number | string;
    style?: TextStyle;
    moreParams?: any | undefined;
    numberOfLines?: number;
}

export function Text(props: TextProps) {
    return (
        <TextNB
            numberOfLines={props?.numberOfLines}
            italic={props.italic}
            bold={props.bold}
            fontFamily={props?.fontFamily ?? 'body'}
            fontSize={props?.fontSize ?? 'dm-p'}
            fontWeight={800}
            textAlign={props?.textAlign ?? 'left'}
            color={props?.color ?? 'system.200'}
            width={props.width}
            style={props.style}
            {...props.moreParams}
        >
            {props?.children}
        </TextNB>
    );
}

export default Text;
