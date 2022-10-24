import React, { useState } from 'react';

import {
    FormControl as Control,
    TextArea,
    Stack,
    WarningOutlineIcon,
} from 'native-base';

import { Dimensions, Image, Platform, TouchableOpacity } from 'react-native';
import Infodialog from '../dialog/info-dialog/Infodialog';

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
    infoIcon?: any;
    alert?: { title: string; message: string };
}

export function FormControlTextarea(props: FormControlTextareaProps) {
    const [alertIsOpened, setAlertIsOpened] = useState(false);

    return (
        <>
            {props.alert && (
                <Infodialog
                    isOpen={alertIsOpened}
                    onClose={() => setAlertIsOpened(false)}
                    title={props.alert.title}
                    body={props.alert.message}
                />
            )}
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
                    {props.infoIcon && (
                        <TouchableOpacity
                            style={{
                                width: 20,
                                marginRight: 10,
                                marginBottom: 10,
                                alignSelf: 'flex-end',
                            }}
                            onPress={() => setAlertIsOpened(true)}
                        >
                            <Image
                                source={props.infoIcon}
                                style={{
                                    width: 16,
                                    height: 16,
                                }}
                            />
                        </TouchableOpacity>
                    )}
                    <TextArea
                        /* InputRightElement={
                            
                        } */
                        size="lg"
                        color="white"
                        maxWidth={
                            props?.minWidth
                                ? props?.minWidth
                                : Platform?.OS === 'web'
                                ? '300'
                                : Dimensions.get('window').width - 50
                        }
                        minWidth={
                            props?.minWidth
                                ? props?.minWidth
                                : Platform?.OS === 'web'
                                ? '300'
                                : Dimensions.get('window').width - 50
                        }
                        fontSize={props.value ? 'md' : 15}
                        fontFamily={props.value ? 'body' : 'italic'}
                        opacity={props.value ? 1 : 0.7}
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
                        <Control.HelperText>
                            {props.helperText}{' '}
                        </Control.HelperText>
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
        </>
    );
}

export default FormControlTextarea;
