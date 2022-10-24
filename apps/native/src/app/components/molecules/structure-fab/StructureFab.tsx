import { Box, Drawer, HStack, Image, Pressable, VStack } from 'native-base';
import React from 'react';
import { system } from '../../../theme/colors';
import { Text } from '../../atomes';
import plus from '../../../../assets/images/png/plus.png';
import entreprise from '../../../../assets/images/png/entreprise.png';
import boutique from '../../../../assets/images/png/boutique.png';
import { useNavigation } from '@react-navigation/core';
import { TouchableWithoutFeedback } from 'react-native';
import { useSelector } from 'react-redux';
import YesNoDialog from '../dialog/yes-no-dialog/YesNoDialog';
import { FormattedMessage } from 'react-intl';

const StructureFab = () => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);

    const navigation = useNavigation();
    const { companyList } = useSelector((state: any) => state.company);

    const handleDialogAccept = () => {
        setIsDialogOpen(false);
        setIsOpen(false);
        navigation.navigate('AddStructure');
    };

    const handleDialogClose = () => setIsDialogOpen(false);

    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement="bottom"
                onClose={() => setIsOpen(false)}
            >
                <Box backgroundColor="white" borderTopRadius={5}>
                    <Text
                        style={{ paddingVertical: 10 }}
                        textAlign="center"
                        fontFamily="bold"
                        fontSize="dm-h1"
                        color="black"
                    >
                        <FormattedMessage
                            id="strFab"
                            defaultMessage="Ajouter une"
                        />
                    </Text>
                    <HStack
                        justifyContent="space-evenly"
                        alignItems="center"
                        marginX={10}
                        marginBottom={5}
                    >
                        <Pressable
                            onPress={() => {
                                setIsOpen(false);
                                navigation.navigate('AddStructure');
                            }}
                        >
                            <VStack alignItems="center" space="sm">
                                <Image
                                    source={entreprise}
                                    style={{ width: 50, height: 50 }}
                                    alt="Ajoute une entreprise"
                                />
                                <Text
                                    textAlign="center"
                                    fontFamily="body"
                                    fontSize="dm-h2"
                                    color={system[50]}
                                >
                                    <FormattedMessage
                                        id="strFa1"
                                        defaultMessage="Entreprise"
                                    />
                                </Text>
                            </VStack>
                        </Pressable>
                        <YesNoDialog
                            isOpen={isDialogOpen}
                            onClose={handleDialogClose}
                            onPress={handleDialogAccept}
                            title="Attention!"
                            body="Vous n'avez pas encore d'entreprise. Voulez-vous en ajouter une?"
                        />
                        <Pressable
                            onPress={() => {
                                if (companyList.length === 0) {
                                    setIsDialogOpen(true);
                                } else {
                                    setIsOpen(false);
                                    navigation.navigate('AddStore');
                                }
                            }}
                        >
                            <VStack alignItems="center" space="sm">
                                <Image
                                    source={boutique}
                                    style={{ width: 50, height: 50 }}
                                    alt="Ajoute une structure"
                                />
                                <Text
                                    textAlign="center"
                                    fontFamily="body"
                                    fontSize="dm-h2"
                                    color={system[50]}
                                >
                                    <FormattedMessage
                                        id="strFa2"
                                        defaultMessage="Boutique"
                                    />
                                </Text>
                            </VStack>
                        </Pressable>
                    </HStack>
                </Box>
            </Drawer>
            <TouchableWithoutFeedback onPress={() => setIsOpen(true)}>
                <Image
                    source={plus}
                    alt="plus"
                    height={20}
                    width={20}
                    position="absolute"
                    right={0}
                    bottom={0}
                />
            </TouchableWithoutFeedback>
        </>
    );
};

export default StructureFab;
