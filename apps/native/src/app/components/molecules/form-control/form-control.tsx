import React, { useState } from 'react';
// import { Ionicons } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text } from '../../atomes';
import {
    FormControl as Control,
    Input,
    Stack,
    WarningOutlineIcon,
    Icon,
    TextArea,
    HStack,
} from 'native-base';
import {
    Image,
    KeyboardTypeOptions,
    NativeSyntheticEvent,
    TextInputSubmitEditingEventData,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';
import { Dimensions, Platform } from 'react-native';
import { isValidEmail } from '../../../utils/validator';
import Infodialog from '../dialog/info-dialog/Infodialog';

/* eslint-disable-next-line */
export interface FormControlProps {
    label?: string;
    infoIcon?: any;
    alert?: { title: string; message: string };
    type:
        | 'input'
        | 'text'
        | 'email'
        | 'password'
        | 'number'
        | 'tel'
        | 'textarea';
    size?: 'sm' | 'lg' | 'md';
    placeholder: string;
    helperText: string | null;
    error?: boolean | null;
    errorMessage?: string | string[] | null;
    value?: string | any;
    onChange?: any;
    variant?: 'outline' | 'underlined' | 'filled' | 'unstyled' | 'rounded';
    color?: string;
    width?: string | number;
    placeholderTextColor?: string;
    backgroundColor?: string;
    borderColor?: string;
    moreParams?: any;
    ErrorMessageColor?: string;
    keyboardType?: KeyboardTypeOptions;
    disabled?: boolean;
    readOnly?: boolean;
    InputLeftElement?: any;
    InputRightElement?: any;
    style?: ViewStyle;
    isRequired?: boolean;
    onSubmitEditing?: (
        e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
    ) => void;
    autoCompleteType?:
        | 'cc-csc'
        | 'cc-exp'
        | 'cc-exp-month'
        | 'cc-exp-year'
        | 'cc-number'
        | 'email'
        | 'name'
        | 'password'
        | 'postal-code'
        | 'street-address'
        | 'tel'
        | 'username'
        | 'off';
}

export function FormControl(props: FormControlProps) {
    const [showPassword, setShowPassword] = useState(false);

    const [alertIsOpened, setAlertIsOpened] = useState(false);

    const [emailError, setEmailError] = useState(false);

    React.useEffect(() => {
        const ErrorEmail = () => {
            if (
                props.type === 'email' &&
                props.value !== '' &&
                !isValidEmail(props.value)
            )
                setEmailError(true);
            else setEmailError(false);
        };
        const ErrorTimer = setTimeout(() => ErrorEmail(), 1000);

        return () => {
            clearTimeout(ErrorTimer);
            setEmailError(false);
        };
    }, [props.type, props.value]);
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
                style={props.style}
                isRequired={props.isRequired}
                isInvalid={props?.error === true || emailError}
                alignSelf="center"
                mt="2"
                mb="2"
                w={{
                    base: '75%',
                    md: '25%',
                }}
                minWidth={
                    Platform?.OS === 'web'
                        ? '332'
                        : props?.width
                        ? props?.width
                        : Dimensions.get('window').width - 18
                }
                maxWidth={
                    Platform?.OS === 'web'
                        ? '332'
                        : props?.width
                        ? props?.width
                        : Dimensions.get('window').width - 18
                }
            >
                <Stack alignItems="center" mx="4">
                    {props?.label !== undefined &&
                        props?.label?.trim()?.length > 0 && (
                            <HStack
                                width={
                                    Platform?.OS === 'web'
                                        ? '300'
                                        : Dimensions.get('window').width - 50
                                }
                                justifyContent="space-between"
                            >
                                <Control.Label alignSelf="flex-start">
                                    <Text
                                        color={
                                            props?.placeholderTextColor ??
                                            'system.200'
                                        }
                                    >
                                        {props?.label}
                                    </Text>
                                </Control.Label>
                                {props.infoIcon !== undefined && (
                                    <TouchableOpacity
                                        style={{
                                            width: 20,
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
                            </HStack>
                        )}
                    {props.type === 'textarea' ? (
                        <TextArea
                            onSubmitEditing={props?.onSubmitEditing}
                            keyboardType={props?.keyboardType}
                            size="lg"
                            isDisabled={props?.disabled}
                            color={props?.placeholderTextColor ?? 'system.200'}
                            fontFamily={props.value ? undefined : 'italic'}
                            opacity={props.value ? undefined : 0.8}
                            placeholderTextColor={
                                props?.placeholderTextColor ?? 'system.200'
                            }
                            width="100%"
                            backgroundColor={
                                props?.error
                                    ? 'system.400'
                                    : props?.backgroundColor ?? 'transparent'
                            }
                            borderColor={
                                props?.error
                                    ? 'system.500'
                                    : props?.borderColor ?? undefined
                            }
                            variant={props.variant ?? 'outline'}
                            value={props.value}
                            placeholder={
                                props.isRequired
                                    ? props.placeholder + ' * '
                                    : props.placeholder
                            }
                            onChangeText={props.onChange}
                            InputLeftElement={
                                props?.InputLeftElement ?? undefined
                            }
                        />
                    ) : (
                        <Input
                            contextMenuHidden={props.type === 'email' || props.type === 'password' ? true : false}
                            autoCompleteType={props?.autoCompleteType ?? 'off'}
                            onSubmitEditing={props?.onSubmitEditing}
                            keyboardType={
                                props.type === 'email'
                                    ? 'email-address'
                                    : props?.keyboardType
                            }
                            size={props?.size ?? 'lg'}
                            fontSize={props.value ? "md" : 15}
                            fontFamily={props.value ? undefined : 'italic'}
                            isDisabled={props?.disabled}
                            isReadOnly={props?.readOnly}
                            color={props?.placeholderTextColor ?? 'system.200'}
                            placeholderTextColor={
                                props?.placeholderTextColor ?? 'system.200'
                            }
                            width="100%"
                            height={44}
                            backgroundColor={
                                props?.error || emailError
                                    ? 'system.400'
                                    : props?.backgroundColor ?? 'transparent'
                            }
                            borderColor={
                                props?.error || emailError
                                    ? 'system.500'
                                    : props?.borderColor ?? undefined
                            }
                            variant={props.variant ?? 'outline'}
                            type={
                                props.type === 'password'
                                    ? showPassword
                                        ? 'text'
                                        : props.type
                                    : props.type
                            }
                            style={{
                                ...props?.moreParams,
                            }}
                            value={props.value}
                            opacity={props.value ? 1 : 0.7}
                            placeholder={
                                props.isRequired
                                    ? props.placeholder + ' * '
                                    : props.placeholder
                            }
                            onChangeText={props.onChange}
                            InputRightElement={
                                props?.InputRightElement ??
                                (props.type === 'password' ? (
                                    <Icon
                                        as={
                                            <Ionicons
                                                name={
                                                    showPassword
                                                        ? 'md-eye-off'
                                                        : 'md-eye'
                                                }
                                                size={32}
                                                color="white"
                                                style={{ paddingHorizontal: 5 }}
                                                onPress={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                            />
                                        }
                                        size={5}
                                        color="muted.400"
                                    />
                                ) : undefined)
                            }
                            InputLeftElement={
                                props?.InputLeftElement ?? undefined
                            }
                        />
                    )}

                    {props?.helperText && (
                        <Control.HelperText>
                            {props.helperText}{' '}
                        </Control.HelperText>
                    )}
                    {props.type === 'email' &&
                        props.value !== '' &&
                        !isValidEmail(props.value) && (
                            <Control.ErrorMessage
                                w={{
                                    base: '75%',
                                    md: '25%',
                                }}
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
                                marginTop={2}
                                leftIcon={
                                    <WarningOutlineIcon
                                        size="xs"
                                        color={'system.500'}
                                    />
                                }
                            >
                                <Text
                                    fontFamily="body"
                                    fontSize="dm-p"
                                    textAlign="left"
                                    fontWeight={500}
                                    color={
                                        props?.ErrorMessageColor ?? 'system.500'
                                    }
                                    moreParams={{ bold: true }}
                                >
                                    Ton e-mail est invalide
                                </Text>
                            </Control.ErrorMessage>
                        )}
                    {props?.error && props?.errorMessage ? (
                        typeof props?.errorMessage === 'string' ? (
                            <Control.ErrorMessage
                                w={{
                                    base: '75%',
                                    md: '25%',
                                }}
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
                                marginTop={2}
                                leftIcon={
                                    <WarningOutlineIcon
                                        size="xs"
                                        color={'system.500'}
                                    />
                                }
                            >
                                <Text
                                    fontFamily="body"
                                    fontSize="dm-p"
                                    textAlign="left"
                                    fontWeight={500}
                                    color={
                                        props?.ErrorMessageColor ?? 'system.500'
                                    }
                                    moreParams={{ bold: true }}
                                >
                                    {props?.errorMessage}
                                </Text>
                            </Control.ErrorMessage>
                        ) : (
                            props.errorMessage.map((item, index) => (
                                <Control.ErrorMessage
                                    key={`error-${index}`}
                                    w={{
                                        base: '75%',
                                        md: '25%',
                                    }}
                                    minWidth={
                                        Platform?.OS === 'web'
                                            ? '300'
                                            : Dimensions.get('window').width -
                                              50
                                    }
                                    maxWidth={
                                        Platform?.OS === 'web'
                                            ? '300'
                                            : Dimensions.get('window').width -
                                              50
                                    }
                                    marginTop={2}
                                    leftIcon={
                                        <WarningOutlineIcon
                                            size="xs"
                                            color={'system.500'}
                                        />
                                    }
                                >
                                    <Text
                                        fontFamily="body"
                                        fontSize="dm-p"
                                        textAlign="left"
                                        fontWeight={500}
                                        color={
                                            props?.ErrorMessageColor ??
                                            'system.500'
                                        }
                                        moreParams={{ bold: true }}
                                    >
                                        {item}
                                    </Text>
                                </Control.ErrorMessage>
                            ))
                        )
                    ) : null}
                </Stack>
            </Control>
        </>
    );
}

export default FormControl;
