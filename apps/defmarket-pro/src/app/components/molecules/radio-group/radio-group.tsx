import React from 'react';
import { Radio, Stack, View } from 'native-base';
import { Text } from '../../atomes';
import { Dimensions, ViewStyle } from 'react-native';
/* eslint-disable-next-line */
export interface ItemsProps {
    label: string;
    value: string;
}

export interface RadioGroupProps {
    label?: string;
    labelAlign?: 'center' | 'left' | 'end';
    color?: string;
    name: string;
    defaultValue?: string | boolean;
    value: string | undefined;
    items: Array<ItemsProps>;
    textMarginBottom?: number;
    onChange: any;
    flexDirection?: 'row' | 'column';
    radioColor?: string;
    style?: ViewStyle;
    disabled?: boolean;
    marginRight?: number;
}

export function RadioGroup(props: RadioGroupProps) {
    return (
        <View
            paddingX={4}
            width={Dimensions.get('window').width - 18}
            style={props.style ?? { marginTop: 15 }}
            alignSelf="center"
        >
            {props.label !== undefined && props.label !== '' ? (
                <Text
                    fontFamily="bold"
                    fontSize="dm-2p"
                    textAlign={props?.labelAlign ?? 'left'}
                    color={'system.200'}
                    style={{
                        marginBottom: props.textMarginBottom ?? 10,
                    }}
                >
                    {props.label}
                </Text>
            ) : null}

            <Radio.Group
                aria-labelledby="radioButton"
                defaultValue={props.defaultValue?.toString()}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                style={{
                    marginBottom: 10,
                }}
            >
                <Stack direction={props.flexDirection ?? 'row'} space={5}>
                    {props?.items?.length > 0 &&
                        props?.items?.map((item: ItemsProps) => (
                            <Radio
                                isDisabled={props.disabled}
                                aria-labelledby="radio"
                                key={item.label}
                                colorScheme="yellow"
                                value={item.value}
                                alignSelf="flex-start"
                                marginRight={props.marginRight ?? null}
                            >
                                <Text
                                    style={{ marginLeft: 10 }}
                                    color={props?.radioColor}
                                >
                                    {item.label}
                                </Text>
                            </Radio>
                        ))}
                </Stack>
            </Radio.Group>
        </View>
    );
}

export default RadioGroup;
