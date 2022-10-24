import { Ionicons } from '@expo/vector-icons';
import { HStack, Icon } from 'native-base';
import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { primary } from '../../../theme/colors';
import { Text } from '../../atomes';

interface IChipProps {
    icon?: React.ReactNode;
    label: string;
    onPress?: () => void;
    closeIcon?: React.ReactNode;
    onClose?: () => void;
    selected?: boolean;

    style?: ViewStyle;
}

const Chip = (props: IChipProps) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={props.style}>
            <HStack
                space={3}
                borderWidth={1}
                borderColor={primary[50]}
                padding={1}
                borderRadius={999}
                backgroundColor={props.selected ? primary[50] : 'transparent'}
                alignItems="center"
            >
                {props?.icon && (
                    <Icon
                        as={props?.icon}
                        size="sm"
                        color={props.selected ? 'white' : primary[50]}
                        marginLeft={1}
                    />
                )}

                <Text
                    color={props.selected ? 'white' : primary[50]}
                    style={{ marginLeft: props?.icon ? 0 : 8 }}
                >
                    {props.label}
                </Text>
                {(props?.closeIcon || props?.onClose) && (
                    <TouchableOpacity onPress={props.onClose}>
                        <Icon
                            as={
                                props?.closeIcon ?? (
                                    <Ionicons name="close-circle" />
                                )
                            }
                            size="sm"
                            color={props.selected ? 'white' : primary[50]}
                        />
                    </TouchableOpacity>
                )}
            </HStack>
        </TouchableOpacity>
    );
};

export default Chip;
