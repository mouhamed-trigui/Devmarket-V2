import React from 'react';
import { Input, Stack, InputGroup, FormControl as Control } from 'native-base';
import {
    Dimensions,
    NativeSyntheticEvent,
    Platform,
    TextInputSubmitEditingEventData,
} from 'react-native';

/* eslint-disable-next-line */
export interface FormControlProps {
    placeholder: string;
    placeholderPrefix: string;
    value: string;
    valuePrefix: string;
    onChange: any;
    onChangePrefix: any;
    borderColor?: string;
    placeholderTextColor?: string;
    InputRightElement?: JSX.Element | JSX.Element[];
    groupRightElement?: JSX.Element | JSX.Element[];
    isRequired?: boolean;
    onSubmitEditing?: (
        e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
    ) => void;
}

export function FormControl(props: FormControlProps) {
    return (
        <Control isRequired={props.isRequired} mt="2" mb="2" alignSelf="center">
            <Stack alignItems="center" mx="4">
                <InputGroup
                    flexShrink={1}
                    w={{
                        base:
                            Platform?.OS === 'web'
                                ? '300'
                                : Dimensions.get('window').width - 50,
                    }}
                    opacity={props.valuePrefix || props.value ? undefined : 0.8}
                >
                    <Input
                        borderColor={props?.borderColor}
                        type="text"
                        size="lg"
                        height={44}
                        fontSize="md"
                        fontFamily={props.valuePrefix ? undefined : 'italic'}
                        opacity={props.valuePrefix ? undefined : 0.8}
                        value={props.valuePrefix}
                        placeholder={props.placeholderPrefix}
                        onChangeText={props.onChangePrefix}
                        w={{
                            base: 50,
                        }}
                        color={props?.placeholderTextColor ?? 'system.200'}
                        placeholderTextColor={
                            props?.placeholderTextColor ?? 'system.200'
                        }
                        keyboardType="phone-pad"
                    />
                    <Input
                        onSubmitEditing={props.onSubmitEditing}
                        borderColor={props?.borderColor}
                        keyboardType="phone-pad"
                        height={44}
                        size="lg"
                        fontSize="md"
                        fontFamily={props.value ? undefined : 'italic'}
                        opacity={props.value ? undefined : 0.8}
                        // minWidth="250"
                        color={props?.placeholderTextColor ?? 'system.200'}
                        value={props.value}
                        placeholder={
                            props.isRequired
                                ? props.placeholder + ' * '
                                : props.placeholder
                        }
                        onChangeText={props.onChange}
                        placeholderTextColor={
                            props?.placeholderTextColor ?? 'system.200'
                        }
                        flexGrow={1}
                        flexShrink={1}
                        InputRightElement={props.InputRightElement}
                    />
                    {props.groupRightElement}
                </InputGroup>
            </Stack>
        </Control>
    );
}

export default FormControl;
