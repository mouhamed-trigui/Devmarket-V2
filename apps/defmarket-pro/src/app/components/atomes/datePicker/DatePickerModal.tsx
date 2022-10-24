import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {
    Dimensions,
    Platform,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';
import { Stack, Pressable, HStack, Icon } from 'native-base';
import { Text } from '../../atomes';
import { Ionicons } from '@expo/vector-icons';

export interface IDatePicker {
    placeholder: string | any;
    value?: string;
    onChange: any;
    style?: ViewStyle;
    mode?: 'date' | 'datetime' | 'time';
    inputStyle?: {
        web?: React.CSSProperties;
        container?: ViewStyle;
        text?: TextStyle;
    };
    color?: string;
    required?: boolean;
    removeAction?: boolean;
}

export default function DatePickerModal(props: IDatePicker) {
    const [show, setShow] = useState(false);

    const formattedValue = React.useMemo(() => {
        if (!props.value) return undefined;
        if (props.mode === 'datetime') {
            return moment(props.value).format('DD/MM/YYYY HH:mm');
        } else if (props.mode === 'date') {
            return moment(props.value).format('DD/MM/YYYY');
        } else {
            if (props.value.length === 5) {
                return props.value;
            } else return moment(props.value).format('HH:mm');
        }
    }, [props.mode, props.value]);

    return (
        <Stack key="datePickerModal" alignItems="center" style={props.style}>
            {Platform.OS === 'web' ? (
                <input
                    placeholder={
                        props.required
                            ? props.placeholder + '*'
                            : props.placeholder
                    }
                    value={props.value?.replace(':00Z', '')}
                    type={
                        props?.mode === undefined
                            ? 'date'
                            : props.mode === 'datetime'
                            ? 'datetime-local'
                            : props?.mode
                    }
                    onChange={(e) => props.onChange(e.target.value)}
                    style={
                        props?.inputStyle?.web ?? {
                            background: 'transparent',
                            height: 42,
                            maxWidth: '290px',
                            width: '100%',
                            color: props.color ?? 'white',
                            border: `1px ${props.color ?? 'white'} solid`,
                            borderRadius: '5px',
                            paddingInline: '5px',
                            marginBlock: '5px',
                        }
                    }
                />
            ) : (
                <>
                    <TouchableOpacity
                        key="date-picker-modal"
                        onPress={() => setShow(true)}
                        style={
                            props?.inputStyle?.container ?? {
                                borderColor: props.color ?? '#e5e5e5',
                                borderWidth: 1,
                                borderRadius: 5,
                                minWidth: Dimensions.get('window').width - 50,
                                maxWidth: Dimensions.get('window').width - 50,
                                height: 44,
                                marginVertical: 5,
                            }
                        }
                    >
                        <HStack
                            key="H-1"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Text
                                style={
                                    props?.inputStyle?.text ?? {
                                        textAlign: 'left',
                                        padding: 10,
                                        alignItems: 'center',
                                        height: 44,
                                        color: props.color ?? '#FFFFFF',
                                    }
                                }
                                italic={props.value ? undefined : true}
                                fontFamily="body"
                                fontSize="md"
                                textAlign="center"
                                fontWeight={400}
                            >
                                {formattedValue
                                    ? formattedValue
                                    : props.required
                                    ? props.placeholder + ' *'
                                    : props.placeholder}
                            </Text>
                            {!props.required &&
                                props.value !== undefined &&
                                props.removeAction && (
                                    <TouchableOpacity
                                        key="close"
                                        onPress={() =>
                                            props.onChange(undefined)
                                        }
                                    >
                                        <Icon
                                            style={{ marginRight: 5 }}
                                            color={props.color ?? '#FFFFFF'}
                                            size="md"
                                            as={<Ionicons name="close" />}
                                        />
                                    </TouchableOpacity>
                                )}
                        </HStack>
                    </TouchableOpacity>

                    <DateTimePickerModal
                        locale="fr"
                        isVisible={show}
                        mode={props?.mode ?? 'date'}
                        textColor="#fff"
                        isDarkModeEnabled={true}
                        onConfirm={(value: any) => {
                            props.onChange(value);
                            setShow(false);
                        }}
                        onCancel={() => setShow(false)}
                    />
                </>
            )}
        </Stack>
    );
}
