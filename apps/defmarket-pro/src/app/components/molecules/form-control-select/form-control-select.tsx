import React, { useMemo } from 'react';
import styled from 'styled-components/native';

import { AntDesign } from '@expo/vector-icons';
import { Dimensions, Platform, ViewStyle } from 'react-native';

import {
    FormControl as Control,
    Select,
    Stack,
    WarningOutlineIcon,
} from 'native-base';

/* eslint-disable-next-line */
export interface ItemsProps {
    label: string;
    value: string;
}

export interface FormControlSelectProps {
    label?: string;
    placeholder: string;
    placeholderTextColor?: string;
    helperText?: string | null;
    error?: boolean | null;
    errorMessage?: string | null;
    value: any;
    items?: Array<ItemsProps>;
    onChange: (value: string) => void;
    style?: ViewStyle;
    color?: string;
    isRequired?: boolean;
    disabled?: boolean;
}

const StyledBio = styled.Text`
    font-weight: 500;
    color: white;
`;
export function FormControlSelect(props: FormControlSelectProps) {
    return (
        <Control
            isRequired={props.isRequired}
            isInvalid={props?.error === true}
            marginY={2}
            style={props.style}
            alignSelf="center"
        >
            <Stack mx="4" alignSelf="center" alignItems="center">
                {props?.label !== undefined && props?.label?.length > 0 && (
                    <Control.Label>
                        <StyledBio style={{ marginBottom: 5 }}>
                            {props?.label}
                        </StyledBio>
                    </Control.Label>
                )}
                {props?.items && props?.items?.length > 0 && (
                    <Select
                        height={44}
                        width={
                            Platform?.OS === 'web'
                                ? '300'
                                : Dimensions.get('window').width - 50
                        }
                        color={props.color ?? 'white'}
                        fontSize="md"
                        fontFamily="medium"
                        fontStyle={props.value ? undefined : 'italic'}
                        opacity={props.value ? undefined : 0.8}
                        borderColor={props.color ?? 'white'}
                        accessibilityLabel="Choose Service"
                        placeholder={
                            props.isRequired
                                ? props.placeholder + ' * '
                                : props.placeholder
                        }
                        placeholderTextColor={props.placeholderTextColor}
                        onValueChange={props.onChange}
                        selectedValue={props.value}
                        _selectedItem={{
                            bg: 'primary.100',
                            endIcon: (
                                <AntDesign
                                    name={'check'}
                                    size={24}
                                    color="green"
                                />
                            ),
                        }}
                    >
                        {props?.items?.map((item: ItemsProps, key: number) => {
                            return (
                                <Select.Item
                                    isDisabled={props.disabled}
                                    key={key + 1}
                                    label={item.label}
                                    value={item.value}
                                />
                            );
                        })}
                    </Select>
                )}

                {props?.helperText && (
                    <Control.HelperText>{props.helperText} </Control.HelperText>
                )}
                {props.error && (
                    <Control.ErrorMessage
                        leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                        {props.errorMessage}
                    </Control.ErrorMessage>
                )}
            </Stack>
        </Control>
    );
}

export default FormControlSelect;
