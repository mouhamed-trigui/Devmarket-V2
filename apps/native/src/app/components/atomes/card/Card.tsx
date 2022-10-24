import { Box, Button, Card as NBCard } from 'native-base';
import React from 'react';
import { ImageBackground, ImageSourcePropType, ViewStyle } from 'react-native';
import { Text } from '..';
export interface IPropsCard {
    backgroundImage?: ImageSourcePropType;
    backgroundColor?: string;
    action?: { text: string; backgroundColor: string; onPress?: () => void };
    children: any;
    width?: number | string;
    style?: ViewStyle | undefined;
}
const Card = (props: IPropsCard) => {
    return (
        <NBCard
            style={{
                ...props.style,
                width: props.width,
                position: 'relative',
                backgroundColor: props.backgroundColor
                    ? props.backgroundColor
                    : 'white',
                shadowOffset: { width: 0, height: 0 },
                shadowColor: 'black',
                borderRadius: 10,
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
                    _pressed={{
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
                    }}
                >
                    <Text fontSize="dm-h2" fontFamily="mono">
                        {props.action?.text}
                    </Text>
                </Button>
            )}
            <Box style={{ marginBottom: props.action ? 40 : 0 }}>
                {props.children}
            </Box>
        </NBCard>
    );
};

export default Card;
