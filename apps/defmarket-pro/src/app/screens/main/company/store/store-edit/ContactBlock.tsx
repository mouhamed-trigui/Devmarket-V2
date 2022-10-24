import React, { useState } from 'react';
import chatPng from '../../../../../../assets/images/png/chat.png';
import {
    FormControl,
    FormControlGroup,
} from '../../../../../components/molecules';
import {
    IPhoneProps,
    IStoreProps,
} from '../../../../../services/model/company';
import { primary, system } from '../../../../../theme/colors';
import {
    Box,
    Center,
    Checkbox,
    HStack,
    Icon,
    VStack,
    Image,
} from 'native-base';
import { FormattedMessage, useIntl } from 'react-intl';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import Title from '../../../../../components/molecules/store-title/Title';
import Chip from '../../../../../components/molecules/chip/Chip';
import { Text } from '../../../../../components/atomes';
import { Dimensions, Platform, TouchableOpacity } from 'react-native';
import addBtnPng from '../../../../../../assets/images/png/bouton-ajouter-blue.png';

interface IContactBlockProps {
    store: IStoreProps;
    setStore: React.Dispatch<React.SetStateAction<IStoreProps>>;
}

const ContactBlock = (props: IContactBlockProps) => {
    const { formatMessage } = useIntl();

    const [selectedPhoneIndex, setSelectedPhoneIndex] = useState<number>();
    const [newPhone, setNewPhone] = useState({ number: '', prefix: '+33' });

    const handlePhoneRemove = (phone: IPhoneProps, index: number) => {
        props.setStore((old) => ({
            ...old,
            phoneList: old.phoneList.filter((_, i) => i !== index),
        }));

        if (phone.id) {
            const id = phone.id;
            props.setStore((old) => ({
                ...old,
                phoneToRemove: old.phoneToRemove
                    ? [...old.phoneToRemove, id]
                    : [id],
            }));
        }
    };

    const handleNewPhoneSubmit = () => {
        if (!newPhone.number) {
            return;
        }

        props.setStore((old) => ({
            ...old,
            phoneList: [
                ...old.phoneList,
                {
                    number: newPhone.number,
                    prefix: newPhone.prefix,
                } as IPhoneProps,
            ],
        }));
        setNewPhone({ number: '', prefix: '+33' });
    };

    return (
        <Box key="chat" backgroundColor={system[300]} paddingX={5} paddingY={8}>
            <Title icon={chatPng} title="Contact" />
            <VStack marginY={3}>
                <Checkbox
                    isChecked={props.store?.hideMyContacts}
                    onChange={() =>
                        props.setStore((old) => ({
                            ...old,
                            hideMyContacts: !old?.hideMyContacts,
                        }))
                    }
                    value={''}
                    marginTop={2}
                    alignSelf="center"
                    borderRadius={10}
                    width={
                        Platform?.OS === 'web'
                            ? '300'
                            : Dimensions.get('window').width - 50
                    }
                >
                    <Text color={system[50]} style={{ marginLeft: 10 }}>
                        <FormattedMessage
                            id="CTNblc"
                            defaultMessage="Ne pas afficher mes contacts"
                        />
                    </Text>
                </Checkbox>
            </VStack>

            <FormControl
                keyboardType="email-address"
                borderColor={primary[50]}
                type="input"
                placeholder="E-mail"
                placeholderTextColor={primary[50]}
                helperText={null}
                value={props?.store?.email ?? ''}
                onChange={(email: string) =>
                    props?.setStore((old) => ({
                        ...old,
                        email,
                    }))
                }
            />
            <HStack space={2} paddingY={0} flexWrap="wrap">
                {props?.store?.phoneList?.map((phone, index) => (
                    <Chip
                        key={index}
                        label={`${phone.prefix} ${phone.number}`}
                        icon={<FontAwesome5 name="phone-alt" />}
                        onClose={() => handlePhoneRemove(phone, index)}
                        onPress={() =>
                            selectedPhoneIndex === index
                                ? setSelectedPhoneIndex(undefined)
                                : setSelectedPhoneIndex(index)
                        }
                        selected={selectedPhoneIndex === index}
                    />
                ))}
            </HStack>

            <FormControlGroup
                onSubmitEditing={
                    selectedPhoneIndex !== undefined
                        ? () => setSelectedPhoneIndex(undefined)
                        : handleNewPhoneSubmit
                }
                borderColor={primary[50]}
                placeholderTextColor={primary[50]}
                placeholderPrefix="+33"
                valuePrefix={
                    selectedPhoneIndex !== undefined
                        ? props?.store?.phoneList[selectedPhoneIndex].prefix
                        : newPhone.prefix
                }
                onChangePrefix={(prefix: string) =>
                    selectedPhoneIndex !== undefined
                        ? props?.setStore((old) => ({
                              ...old,
                              phoneList: old.phoneList.map((phone, index) =>
                                  index === selectedPhoneIndex
                                      ? {
                                            ...phone,
                                            prefix,
                                        }
                                      : phone
                              ),
                          }))
                        : setNewPhone((old) => ({
                              ...old,
                              prefix,
                          }))
                }
                placeholder="Téléphone"
                value={
                    selectedPhoneIndex !== undefined
                        ? props.store.phoneList[selectedPhoneIndex].number
                        : newPhone.number
                }
                onChange={(number: string) =>
                    selectedPhoneIndex !== undefined
                        ? props.setStore((old) => ({
                              ...old,
                              phoneList: old.phoneList.map((phone, index) =>
                                  index === selectedPhoneIndex
                                      ? {
                                            ...phone,
                                            number,
                                        }
                                      : phone
                              ),
                          }))
                        : setNewPhone({ ...newPhone, number })
                }
                // InputRightElement={
                //     <Icon
                //         as={<Ionicons name="arrow-forward" />}
                //         size="md"
                //         color={primary[50]}
                // onPress={
                //     selectedPhoneIndex !== undefined
                //         ? () => setSelectedPhoneIndex(undefined)
                //         : handleNewPhoneSubmit
                // }
                //     />
                // }
            />
            {
                <Center marginTop={3}>
                    <TouchableOpacity
                        onPress={
                            selectedPhoneIndex !== undefined
                                ? () => setSelectedPhoneIndex(undefined)
                                : handleNewPhoneSubmit
                        }
                    >
                        <Image
                            alt="button-add"
                            source={addBtnPng}
                            style={{ width: 25, height: 25 }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </Center>
            }
        </Box>
    );
};

export default ContactBlock;
