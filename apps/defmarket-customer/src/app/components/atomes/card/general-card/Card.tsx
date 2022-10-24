import React from 'react';
import {
    Button,
    ImageBackground,
    ImageSourcePropType,
    View,
    ViewStyle,
} from 'react-native';
import { blueShadow } from '../../../../theme/style';
import Text from '../../text/Text';
import { fonts, fontSizes } from './../../../../theme/fonts';
export interface IPropsCard {
    backgroundImage?: ImageSourcePropType;
    backgroundColor?: string;
    borderRadius?: number;
    borderTopLeftRadius?: number;
    borderTopRightRadius?: number;
    borderBottomLeftRadius?: number;
    borderBottomRightRadius?: number;
    vMargin?: number;
    vPadding?: number;
    hMargin?: number;
    hPadding?: number;
    children: any;
    width?: number | string;
    height?: number | string;
    style?: ViewStyle | undefined;
    action?: { text: string; backgroundColor: string; onPress?: () => void };
}
const Card = (props: IPropsCard) => {
    return (
        <View
            style={{
                /* flex: 1, */
                width: props?.width,
                height: props?.height,
                position: 'relative',
                backgroundColor: props?.backgroundColor ?? 'white',
                borderTopRightRadius:
                    !props?.borderRadius && props?.borderTopRightRadius
                        ? props?.borderTopRightRadius
                        : props?.borderRadius,
                borderTopLeftRadius:
                    !props?.borderRadius && props?.borderTopLeftRadius
                        ? props?.borderTopLeftRadius
                        : props?.borderRadius,
                borderBottomLeftRadius:
                    !props?.borderRadius && props?.borderBottomLeftRadius
                        ? props?.borderBottomLeftRadius
                        : props?.borderRadius,
                borderBottomRightRadius:
                    !props?.borderRadius && props?.borderBottomRightRadius
                        ? props?.borderBottomRightRadius
                        : props?.borderRadius,

                paddingHorizontal: props?.hPadding,
                paddingVertical: props?.vPadding,
                marginHorizontal: props?.hMargin,
                marginVertical: props?.vMargin,
                ...props.style,
                ...blueShadow,
            }}
        >
            {props?.backgroundImage && (
                <ImageBackground
                    source={props.backgroundImage}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                    }}
                ></ImageBackground>
            )}
            {props?.action && (
                <Button
                    onPress={props.action.onPress}
                    style={{
                        backgroundColor: props.action?.backgroundColor,
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        paddingVertical: 10,
                        borderTopStartRadius: 0,
                        borderTopEndRadius: 0,
                    }}
                    /*   _pressed={{
                        style: {
                            opacity: 0.8,
                            backgroundColor: props.action?.backgroundColor,
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            paddingVertical: 10,
                            borderTopStartRadius: 0,
                            borderTopEndRadius: 0,
                        },
                    }} */
                >
                    <Text fontSize={fontSizes['dm-h2']} fontFamily={fonts.mono}>
                        {props.action?.text}
                    </Text>
                </Button>
            )}
            <View style={{ marginBottom: props.action ? 40 : 0 }}>
                {props.children}
            </View>
        </View>
    );
};

export default Card;
