import React from 'react';
import styled from 'styled-components/native';
import { Text, Spinner, Button as NButton } from 'native-base';
import { ViewStyle } from 'react-native';

/* eslint-disable-next-line */
export interface ButtonProps {
    onPress: any;
    label?: string | undefined;
    size?: string | undefined;
    color?: string | undefined;
    backgroundColor?: string | undefined;
    spinner?: boolean;
    bordered?: boolean;
    width?: string | number;
    maxWidth?: any;
    alignSelf?: string;
    style?: ViewStyle;
    fontSize?: any;
    fontFamily?: any;
    textColor?: any;
    textStyle?: any;
    endIcon?: any;
    // get more params like disabled !
    moreParams?: any | undefined;
    leftIcon?: any;
    rightIcon?: any;
    variant?: 'link' | 'solid' | 'ghost' | 'outline' | 'unstyled' | 'subtle';
    isDisabled?: boolean;
    height?: string | number;
    paddingHorizontal?: number;
}

const StyledButton = styled.View``;

export function Button(props: ButtonProps) {
    return (
        <StyledButton>
            <NButton
                height={props.height ?? '48px'}
                _pressed={{ style: { ...props.style, opacity: 0.2 } }}
                width={props.width}
                variant={props.variant}
                alignSelf={props.alignSelf}
                maxWidth={props.maxWidth}
                size={props?.size ?? 'lg'}
                color={props?.color ?? 'white'}
                backgroundColor={props?.backgroundColor ?? 'primary.100'}
                isDisabled={props?.isDisabled}
                {...props?.moreParams}
                onPress={props?.onPress}
                bordered={props?.bordered}
                leftIcon={props?.leftIcon}
                endIcon={props?.endIcon}
                style={
                    props?.moreParams?.disabled
                        ? { ...props.style, opacity: 0.5 }
                        : { ...props.style }
                }
            >
                <Text
                    style={{
                        paddingHorizontal: props.paddingHorizontal ?? 24,
                    }}
                    fontSize={props.fontSize ?? 'dm-h2'}
                    fontFamily={props.fontFamily ?? 'RobotoBold'}
                    color={props.textColor ?? 'white'}
                >
                    {props?.spinner && (
                        <Spinner
                            color={props?.backgroundColor ?? 'system.200'}
                            marginRight={8}
                            accessibilityLabel="Loading posts"
                        />
                    )}
                    {props?.label}
                </Text>
            </NButton>
        </StyledButton>
    );
}

export default Button;
