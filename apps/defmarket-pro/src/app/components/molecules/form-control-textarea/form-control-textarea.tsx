import React from 'react';

import {
    FormControl as Control,
    TextArea,
    Stack,
    WarningOutlineIcon,
} from 'native-base';
import { Dimensions, Platform } from 'react-native';

/* eslint-disable-next-line */
export interface FormControlTextareaProps {
    label: string;
    placeholder: string;
    placeholderTextColor?: string;
    helperText: string | null;
    error: boolean | null;
    errorMessage: string | null;
    numberOfLines: number;
    value?: string;
    onChange: any;
    minWidth?: number | string;
    isRequired?: boolean;
}

export function FormControlTextarea(props: FormControlTextareaProps) {
    return (
        <Control
            isRequired={props?.isRequired}
            isInvalid={props?.error === true}
            mt="2"
            mb="2"
        >
            <Stack mx="4" alignItems="center">
                {props?.label?.length > 0 && (
                    <Control.Label>{props.label}</Control.Label>
                )}
                <TextArea
                    size="lg"
                    color="white"
                    minWidth={
                        props?.minWidth
                            ? props?.minWidth
                            : Platform?.OS === 'web'
                            ? '300'
                            : Dimensions.get('window').width - 50
                    }
                    fontSize="md"
                    fontStyle={props.value ? undefined : 'italic'}
                    opacity={props.value ? undefined : 0.8}
                    value={props.value}
                    placeholder={
                        props.isRequired
                            ? props.placeholder + ' * '
                            : props.placeholder
                    }
                    placeholderTextColor={props.placeholderTextColor}
                    onChangeText={props.onChange}
                    numberOfLines={props.numberOfLines}
                />

                {props?.helperText && (
                    <Control.HelperText>{props.helperText} </Control.HelperText>
                )}
                {props.error && (
                    <Control.ErrorMessage
                        minWidth={
                            Platform?.OS === 'web'
                                ? '300'
                                : Dimensions.get('window').width - 50
                        }
                        maxWidth={
                            Platform?.OS === 'web'
                                ? '300'
                                : Dimensions.get('window').width - 50
                        }
                        leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                        {props.errorMessage}
                    </Control.ErrorMessage>
                )}
            </Stack>
        </Control>
    );
}

export default FormControlTextarea;
