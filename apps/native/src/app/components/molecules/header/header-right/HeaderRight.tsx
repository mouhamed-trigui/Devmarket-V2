import React, { useState } from 'react';
import { Divider, HStack, Image, Menu } from 'native-base';
import { ImageSourcePropType, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteOffer } from '../../../../services/methodes/offre';
import { useNavigation } from '@react-navigation/native';
import YesNoDialog from '../../dialog/yes-no-dialog/YesNoDialog';
import { companyActions } from '../../../../stores/slices/company/companySlice';
import { FormattedMessage } from 'react-intl';
import { system } from '../../../../theme/colors';
import { Text } from '../../../atomes';

interface IDialogProps {
    title: string;
    message: string;
    onPress: () => void;
}

const HeaderRight = (props: {
    icon?: ImageSourcePropType;
    onPress?: () => void;
    iconOption?: ImageSourcePropType;
    items?: {
        label: string;
        onPress: () => void;
        confirmDialog?: { title: string; message: string };
    }[];
}) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const [dialog, setDialog] = useState<IDialogProps>();

    const onClose = () => setIsOpen(false);

    const navigation = useNavigation();

    const dispatch = useDispatch();

    const { selectedOffer } = useSelector((state: any) => state.company);

    const { selectedStore } = useSelector((state: any) => state.company);

    const handleDelete = () => {
        deleteOffer(selectedOffer?.id).then(() => {
            dispatch(companyActions.unsetSelectedOffer());
            setIsOpen(false);
            dispatch(
                companyActions.setSelectedStore({
                    ...selectedStore,
                    offerNbr: selectedStore.offerNbr - 1,
                })
            );
            navigation.navigate('OfferList');
        });
    };

    const handleDuplicated = () => {
        dispatch(companyActions.setDuplicatedOffer());
        navigation.navigate('AddOffer');
    };

    const showDialog = (dialog: IDialogProps) => {
        setDialog(dialog);
        setIsOpen(true);
    };

    return (
        <HStack space={2}>
            <YesNoDialog
                isOpen={isOpen}
                onClose={onClose}
                onPress={
                    dialog
                        ? () => {
                              dialog.onPress();
                              setIsOpen(false);
                          }
                        : handleDelete
                }
                title={dialog ? dialog.title : 'suppression offre'}
                body={
                    dialog
                        ? dialog.message
                        : 'Vous allez supprimer cette offre. Êtes-vous sûr? Les données supprimées ne peuvent pas être récupérées.'
                }
            />
            {props.icon && (
                <TouchableOpacity onPress={props.onPress}>
                    <Image source={props.icon} width={6} height={6} alt="btn" />
                </TouchableOpacity>
            )}
            {props.iconOption && (
                <Menu
                    defaultIsOpen={false}
                    offset={-30}
                    placement="bottom right"
                    style={{
                        borderRadius: 10,
                    }}
                    trigger={(triggerProps) => {
                        return (
                            <TouchableOpacity {...triggerProps}>
                                <Image
                                    source={props.iconOption}
                                    width={6}
                                    height={6}
                                    resizeMode="contain"
                                    alt="btn"
                                />
                            </TouchableOpacity>
                        );
                    }}
                >
                    {props.items ? (
                        props.items.map((item, index) => (
                            <Menu.Item
                                key={item.label}
                                onPress={
                                    item?.confirmDialog
                                        ? () =>
                                              showDialog({
                                                  ...item?.confirmDialog,
                                                  onPress: item.onPress,
                                              } as IDialogProps)
                                        : item.onPress
                                }
                            >
                                <Text
                                    fontSize={16}
                                    color={system[50]}
                                    style={{
                                        marginHorizontal: 6,
                                        marginVertical: 3,
                                    }}
                                >
                                    {item.label}
                                </Text>
                            </Menu.Item>
                        ))
                    ) : (
                        <>
                            <Menu.Item
                                alignItems="center"
                                onPress={handleDuplicated}
                            >
                                <Text
                                    fontSize={16}
                                    color={system[50]}
                                    style={{
                                        marginHorizontal: 6,
                                        marginVertical: 3,
                                    }}
                                >
                                    <FormattedMessage
                                        id="DUPLiQ"
                                        defaultMessage="Dupliquer"
                                    />
                                </Text>
                            </Menu.Item>
                            <Menu.Item
                                alignItems="center"
                                onPress={() => setIsOpen(true)}
                            >
                                <Text
                                    fontSize={16}
                                    color={system[50]}
                                    style={{
                                        marginHorizontal: 6,
                                        marginVertical: 3,
                                    }}
                                >
                                    <FormattedMessage
                                        id="IMPMP6"
                                        defaultMessage="Supprimer"
                                    />
                                </Text>
                            </Menu.Item>
                        </>
                    )}
                </Menu>
            )}
        </HStack>
    );
};

export default HeaderRight;
