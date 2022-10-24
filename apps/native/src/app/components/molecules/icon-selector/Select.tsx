import { Ionicons } from '@expo/vector-icons';
import { HStack, Icon, Modal, VStack } from 'native-base';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { TouchableOpacity } from 'react-native';
import { primary, system } from '../../../theme/colors';
import { Text } from '../../atomes';

interface ISelectProps {
    items: { name: string; value: string; iconName: string }[];
    onChange: (value: string) => void;
    value?: string;
}

const Select = (props: ISelectProps) => {
    const { formatMessage } = useIntl();

    const [modalVisible, setModalVisible] = React.useState(false);

    const selectedItemIndex = useMemo(
        () =>
            props.value
                ? props.items.findIndex((item) => item.value === props.value)
                : 0,
        [props.items, props?.value]
    );

    const handleItemSelect = (index: number) => {
        props.onChange(props.items[index].value);
        setModalVisible(false);
    };

    return (
        <>
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{
                    borderLeftWidth: 1,
                    borderColor: primary[50],
                    paddingHorizontal: 8,
                }}
            >
                <HStack space={2}>
                    <Icon
                        as={
                            <Ionicons
                                name={props.items[selectedItemIndex].iconName}
                            />
                        }
                        size="sm"
                        color={primary[50]}
                    />
                    <Icon
                        as={<Ionicons name="chevron-down" />}
                        size="sm"
                        color={primary[50]}
                    />
                </HStack>
            </TouchableOpacity>
            <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                <Modal.Content>
                    <Modal.CloseButton color={system[50]} />
                    <Modal.Header color={system[50]}>
                        {formatMessage({
                            id: 'IDQ25s',
                            defaultMessage: 'Sélectionnez la plateforme',
                        })}
                    </Modal.Header>
                    <Modal.Body>
                        <VStack>
                            {props.items.map((item, index) => (
                                <TouchableOpacity
                                    style={{
                                        paddingHorizontal: 5,
                                        paddingVertical: 2,
                                        borderBottomWidth:
                                            props.items.length - 1 !== index
                                                ? 1
                                                : 0,
                                        borderColor: system[100],
                                        backgroundColor:
                                            index === selectedItemIndex
                                                ? system[100]
                                                : 'transparent',
                                    }}
                                    key={item.name}
                                    onPress={() => handleItemSelect(index)}
                                >
                                    <HStack space={2}>
                                        <Icon
                                            as={
                                                <Ionicons
                                                    name={item.iconName}
                                                />
                                            }
                                            size="sm"
                                            color={primary[50]}
                                        />
                                        <Text color={primary[50]}>
                                            {item.name}
                                        </Text>
                                    </HStack>
                                </TouchableOpacity>
                            ))}
                        </VStack>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </>
    );
};

export default Select;
