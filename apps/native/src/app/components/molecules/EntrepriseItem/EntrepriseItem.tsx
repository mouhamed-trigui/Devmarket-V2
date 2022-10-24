import { Box, HStack, IconButton, Image, Menu } from 'native-base';
import React, { useContext } from 'react';
import { Text } from '../../atomes';
import optionP from '../../../../assets/images/png/option.png';
import BoutiqueItem from '../BoutiqueItem/BoutiqueItem';
import ChevronBleu from '../../../../assets/images/png/chevron-bleu-f.png';
import ChevronSVG from '../../../../assets/images/svg/chevron-bleu-f.svg';
import { IStoreProps, companyProps } from '../../../services/model/company';
import { deleteCompany } from '../../../services/methodes/company';
import { useNavigation } from '@react-navigation/core';
import { Platform, TouchableOpacity } from 'react-native';
import Options from '../../../../assets/images/svg/options.svg';
import { useDispatch } from 'react-redux';
import { companyActions } from '../../../stores/slices/company/companySlice';
import { getAllStoresOfCompany } from '../../../services/methodes/store';
import YesNoDialog from '../dialog/yes-no-dialog/YesNoDialog';
import { SpinnerContext } from '../../atomes/spinner/SpinnerProvider';
import { alerts } from '../../../theme/colors';
interface EntrepriseItemProps {
    data: companyProps;
}

const EntrepriseItem = (props: EntrepriseItemProps) => {
    const dispatch = useDispatch();

    const navigation = useNavigation();

    const [showStores, setShowStores] = React.useState(true);

    const [storeList, setStoreList] = React.useState<IStoreProps[]>([]);

    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const title = 'Suppression de ' + props.data.name;

    const description =
        'Souhaites-tu supprimer ' + props.data.name + ' définitivement ?';

    const onClose = () => setIsOpen(false);

    const { setSpinnerVisibility } = useContext(SpinnerContext);

    React.useEffect(() => {
        getAllStoresOfCompany(props.data.id).then((data) => setStoreList(data));
        const willFocusSubscription = navigation.addListener('focus', () =>
            getAllStoresOfCompany(props.data.id).then((data) =>
                setStoreList(data)
            )
        );
        return willFocusSubscription;
    }, [navigation, props.data.id]);

    const handleCompanyDelete = () => {
        setSpinnerVisibility(true);
        deleteCompany(props.data.id)
            .then(() => {
                dispatch(companyActions.deleteCompany(props.data.id));
            })
            .finally(() => setSpinnerVisibility(false));
    };

    return (
        <Box>
            <YesNoDialog
                isOpen={isOpen}
                onClose={onClose}
                onPress={handleCompanyDelete}
                title={title}
                body={description}
            />

            <HStack
                justifyContent="space-between"
                alignItems="center"
                paddingY={3}
                paddingX={5}
                borderBottomWidth={1}
                borderBottomColor="#97D5ED"
                backgroundColor="white"
            >
                <Text
                    numberOfLines={1}
                    style={{
                        flexShrink: 1,
                        overflow: 'hidden',
                    }}
                    color="#003753"
                    fontSize="dm-h1"
                    fontFamily="body"
                >
                    {props.data.name}
                </Text>

                <HStack space={2}>
                    {props.data.blocked && (
                        <Text
                            key="bloqué"
                            color={alerts[100]}
                            textAlign="center"
                            fontFamily="body"
                            style={{
                                overflow: 'hidden',
                                borderRadius: 10,
                                letterSpacing: 1,
                                backgroundColor: alerts[100] + '14',
                                paddingVertical: Platform.OS === 'ios' ? 7 : 5,
                                paddingHorizontal: 10,
                            }}
                        >
                            Bloquée
                        </Text>
                    )}
                    <Menu
                        offset={-30}
                        defaultIsOpen={false}
                        style={{
                            borderRadius: 10,
                        }}
                        trigger={(triggerProps) => {
                            return Platform.OS === 'web' ? (
                                <TouchableOpacity
                                    {...triggerProps}
                                    paddingX={5}
                                >
                                    <Image
                                        style={{
                                            resizeMode: 'contain',
                                        }}
                                        borderRadius={5}
                                        width={6}
                                        height={6}
                                        source={optionP}
                                        alt="ImgEnp"
                                    />
                                </TouchableOpacity>
                            ) : (
                                <IconButton
                                    {...triggerProps}
                                    width={10}
                                    alignItems="center"
                                    /*  height={5} */
                                    justifyContent="center"
                                    icon={<Options width={10} height={20} />}
                                />
                            );
                        }}
                    >
                        <Menu.Item
                            alignItems="center"
                            onPress={() =>
                                navigation.navigate('StructureEdit', {
                                    data: props.data,
                                })
                            }
                        >
                            {'Modifier'}
                        </Menu.Item>
                        <Menu.Item
                            alignItems="center"
                            onPress={() => setIsOpen(true)}
                        >
                            {'Supprimer'}
                        </Menu.Item>
                    </Menu>
                    {Platform.OS === 'web' ? (
                        <TouchableOpacity
                            onPress={() =>
                                setShowStores((oldState) => !oldState)
                            }
                        >
                            <Image
                                style={{
                                    transform: [
                                        {
                                            rotate: showStores
                                                ? '180deg'
                                                : '0deg',
                                        },
                                    ],
                                }}
                                width={5}
                                height={3}
                                source={ChevronBleu}
                                alt="ChevronBleu"
                            />
                        </TouchableOpacity>
                    ) : (
                        <IconButton
                            onPress={() =>
                                setShowStores((oldState) => !oldState)
                            }
                            icon={
                                <ChevronSVG
                                    style={{
                                        marginTop: 3,
                                        width: 10,

                                        transform: [
                                            {
                                                rotate: showStores
                                                    ? '180deg'
                                                    : '0deg',
                                            },
                                        ],
                                    }}
                                />
                            }
                        />
                    )}
                </HStack>
            </HStack>

            {showStores &&
                storeList.map((store) => (
                    <BoutiqueItem
                        key={store.id}
                        data={store}
                        companyId={props.data.id}
                        title={store.name}
                        description={store.description}
                    />
                ))}
        </Box>
    );
};

export default EntrepriseItem;
