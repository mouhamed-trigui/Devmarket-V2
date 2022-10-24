import React, { useContext, useState } from 'react';
import styled from 'styled-components/native';
import {
    Button,
    Actionsheet,
    useDisclose,
    Image,
    KeyboardAvoidingView,
    Box,
    HStack,
    Spinner,
    Heading,
} from 'native-base';
import { ScrollView } from 'native-base';
import FormControl from '../form-control/form-control';
import SearchImage from '../../../../assets/images/png/search-blue-c.png';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { companyActions } from '../../../stores/slices/company/companySlice';
import { Alert, Platform, TouchableOpacity } from 'react-native';
import { Text } from '../../atomes';
import { getAllCompanyWithStores } from '../../../services/methodes/company';
import { ICompanyModel, IStoreModel } from '../../../services/model/company';
import { SpinnerContext } from '../../atomes/spinner/SpinnerProvider';

/* eslint-disable-next-line */
export interface ActionsheetProps {
    IconButton?: any;
    textButton?: string;
    companyId: number;
    fetchOffers: any;
    cleanUp: any;
}

const StyledActionsheet = styled.View``;

export function ActionSheet(props: ActionsheetProps) {
    const { formatMessage } = useIntl();
    const dispatch = useDispatch();
    const { setSpinnerVisibility } = useContext(SpinnerContext);

    const { selectedStore } = useSelector((state: any) => state.company);
    const { isOpen, onOpen, onClose } = useDisclose();
    const [search, setSearch] = useState('');
    const [companyListWithStores, setCompanyListWithStores] = useState<
        ICompanyModel[]
    >([]);
    const [
        backupCompanyListWithStores,
        setBackupCompanyListWithStores,
    ] = useState<ICompanyModel[]>([]);

    const [StoreNumber, setStoreNumber] = useState(0);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const findStore = (name: any) => {
        setSearch(name);
        if (name?.length === 0) {
            setCompanyListWithStores(backupCompanyListWithStores ?? []);
            return;
        } else {
            if (backupCompanyListWithStores?.length > 0) {
                let filteredStoreList = [];
                const filtredData = backupCompanyListWithStores.reduce(
                    (previousValue: any, currentValue: any) => {
                        filteredStoreList = currentValue?.storeList?.filter(
                            (item: any) =>
                                item.name
                                    ?.toUpperCase()
                                    ?.includes(name.toUpperCase())
                        );
                        if (filteredStoreList.length > 0) {
                            previousValue.push({
                                ...currentValue,
                                storeList: filteredStoreList,
                            });
                        }
                        return previousValue;
                    },
                    []
                );
                setCompanyListWithStores(filtredData);
            }
        }
    };

    const openStoreList = (pageNumber: number, showSpinner: boolean) => {
        if (showSpinner) {
            setSpinnerVisibility(true);
        }
        let storeCount = 0;
        getAllCompanyWithStores(pageNumber, 5)
            .then((data) => {
                setCompanyListWithStores((companyListWithStores) => [
                    ...companyListWithStores,
                    ...data.content,
                ]);
                if (showSpinner) {
                    setSpinnerVisibility(false);
                }
                setTotalPage(data.totalPages);
                setBackupCompanyListWithStores([
                    ...backupCompanyListWithStores,
                    ...data.content,
                ]);
                data.content.map((company: ICompanyModel) => {
                    storeCount += company.nbOfStores;
                });
                setStoreNumber(StoreNumber + storeCount);
                setLoading(false);
                if (!isOpen) {
                    onOpen();
                }
            })
            .catch((error) => {
                console.log(error);
                if (showSpinner) {
                    setSpinnerVisibility(false);
                }
                Alert.alert(
                    "Message d'erreur",
                    'Un problème est survenu lors du chargement des boutiques.'
                );
            });
    };

    const loadMoreCompany = () => {
        if (totalPage > page && !loading) {
            try {
                setLoading(true);
                setPage(page + 1);
                openStoreList(page + 1, false);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const selectStore = (store: any, companyId: number) => {
        if (selectedStore?.id !== store?.id) {
            props?.cleanUp();
            dispatch(
                companyActions.setSelectedStore({
                    ...store,
                    companyId: companyId,
                })
            );
        }
        handelClean();
    };

    const handelClean = () => {
        setPage(0);
        setTotalPage(1);
        setCompanyListWithStores([]);
        setBackupCompanyListWithStores([]);
        setStoreNumber(0);
        setSearch('');
        onClose();
        setLoading(true);
    };

    return (
        <StyledActionsheet>
            {props?.IconButton ? (
                <TouchableOpacity onPress={() => openStoreList(page, true)}>
                    {props?.IconButton}
                </TouchableOpacity>
            ) : (
                <Button onPress={() => openStoreList(page, true)}>
                    {' '}
                    {props?.textButton}{' '}
                </Button>
            )}

            <Actionsheet isOpen={isOpen} onClose={handelClean}>
                <KeyboardAvoidingView
                    h={{
                        base: 'auto',
                        lg: 'auto',
                    }}
                    behavior={Platform.OS === 'ios' ? 'position' : undefined}
                    style={{ width: '100%' }}
                >
                    <Actionsheet.Content maxHeight={'500px'}>
                        {StoreNumber > 4 ? (
                            <FormControl
                                InputRightElement={
                                    <Image
                                        source={SearchImage}
                                        resizeMode="contain"
                                        width={4}
                                        height={4}
                                        marginRight="3"
                                        alt="search"
                                    />
                                }
                                label=""
                                placeholder={formatMessage({
                                    id: 'BOT001',
                                    description: 'Rechercher boutique',
                                    defaultMessage: 'Rechercher boutique',
                                })}
                                // backgroundColor="system.200"
                                value={search}
                                moreParams={{ marginLeft: 20 }}
                                type="input"
                                variant="rounded"
                                size="sm"
                                width={'95%'}
                                error={null}
                                placeholderTextColor="#003354"
                                errorMessage={null}
                                helperText={null}
                                onChange={(
                                    value: React.SetStateAction<string>
                                ) => findStore(value)}
                            />
                        ) : null}
                        <ScrollView
                            width={'100%'}
                            onMomentumScrollEnd={() => loadMoreCompany()}
                        >
                            {companyListWithStores?.map(
                                (item: ICompanyModel, index: number) => (
                                    <Box
                                        paddingTop={5}
                                        paddingX={5}
                                        key={index + 1}
                                    >
                                        <Text
                                            key={'Company' + index}
                                            color="#003753"
                                            fontSize={20}
                                            bold
                                        >
                                            {item.companyName}
                                        </Text>
                                        {item?.storeList?.length > 0 &&
                                            item?.storeList.map(
                                                (
                                                    store: IStoreModel,
                                                    i: number
                                                ) => (
                                                    <Actionsheet.Item
                                                        key={
                                                            'ActionSheet' +
                                                            i +
                                                            1
                                                        }
                                                        onPress={() =>
                                                            selectStore(
                                                                store,
                                                                item?.companyId
                                                            )
                                                        }
                                                    >
                                                        <Text
                                                            key={'store' + i}
                                                            color="#003753"
                                                            fontSize={16}
                                                        >
                                                            {store.name}
                                                        </Text>
                                                    </Actionsheet.Item>
                                                )
                                            )}
                                    </Box>
                                )
                            )}
                        </ScrollView>
                        {loading && (
                            <HStack
                                space={2}
                                justifyContent="center"
                                style={{ marginBottom: 10, marginTop: 5 }}
                            >
                                <Spinner accessibilityLabel="Loading posts" />
                                <Heading color="primary.500" fontSize="md">
                                    Chargement
                                </Heading>
                            </HStack>
                        )}
                    </Actionsheet.Content>
                </KeyboardAvoidingView>
            </Actionsheet>
        </StyledActionsheet>
    );
}

export default ActionSheet;
