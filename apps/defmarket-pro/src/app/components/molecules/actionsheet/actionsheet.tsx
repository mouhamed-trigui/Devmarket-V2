import React, { useState } from 'react';
import styled from 'styled-components/native';
import {
    Button,
    Actionsheet,
    useDisclose,
    Image,
    KeyboardAvoidingView,
} from 'native-base';
import { ScrollView } from 'native-base';
import FormControl from '../form-control/form-control';
import SearchImage from '../../../../assets/images/png/search-blue-c.png';
import { useIntl } from 'react-intl';
import { getAllStoresOfCompany } from '../../../services/methodes/store';
import { useDispatch } from 'react-redux';
import { companyActions } from '../../../stores/slices/company/companySlice';
import { TouchableOpacity } from 'react-native';

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

    const { isOpen, onOpen, onClose } = useDisclose();
    const [search, setSearch] = useState('');
    const [storeList, setStoreList] = useState([]);
    const [backupStoreList, setbackupStoreList] = useState([]);

    const findStore = (name: any) => {
        setSearch(name);
        if (name?.length === 0) {
            setStoreList(backupStoreList ?? []);
            return;
        } else {
            if (backupStoreList?.length > 0) {
                const filtredData = backupStoreList?.filter((item: any) =>
                    item?.name?.toUpperCase()?.includes(name.toUpperCase())
                );
                setStoreList(filtredData ?? []);
            }
        }
    };

    const openStoreList = () => {
        onOpen();
        getAllStoresOfCompany(props?.companyId).then((data: any) => {
            setStoreList(data);
            setbackupStoreList(data);
        });
    };
    const selectStore = (store: any) => {
        dispatch(
            companyActions.setSelectedStore({
                ...store,
                companyId: props?.companyId,
            })
        );
        props?.cleanUp();

        onClose();
    };
    return (
        <StyledActionsheet>
            {props?.IconButton ? (
                <TouchableOpacity onPress={openStoreList}>
                    {props?.IconButton}
                </TouchableOpacity>
            ) : (
                <Button onPress={openStoreList}> {props?.textButton} </Button>
            )}

            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <KeyboardAvoidingView
                    h={{
                        base: 'auto',
                        lg: 'auto',
                    }}
                    behavior="position"
                    style={{ width: '100%' }}
                >
                    <Actionsheet.Content maxHeight={'500px'}>
                        {storeList?.length > 4 ? (
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
                        <ScrollView width={'100%'}>
                            {storeList?.map((item: any, index: number) => (
                                <Actionsheet.Item
                                    key={index + 1}
                                    onPress={() => selectStore(item)}
                                >
                                    {item.name}
                                </Actionsheet.Item>
                            ))}
                        </ScrollView>
                    </Actionsheet.Content>
                </KeyboardAvoidingView>
            </Actionsheet>
        </StyledActionsheet>
    );
}

export default ActionSheet;
