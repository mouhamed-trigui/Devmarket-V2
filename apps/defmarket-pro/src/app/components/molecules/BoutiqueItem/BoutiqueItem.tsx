import { useNavigation } from '@react-navigation/core';
import { Box } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { IStoreProps } from '../../../services/model/company';
import { companyActions } from '../../../stores/slices/company/companySlice';
import { Text } from '../../atomes';

interface BoutiqueItemProps {
    title: string;
    description: string;
    companyId: number;
    data: IStoreProps;
}

const BoutiqueItem = (props: BoutiqueItemProps) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(
            companyActions.setSelectedStore({
                ...props.data,
                companyId: props.companyId,
            })
        );
        navigation.navigate('StructureDetails');
    };
    return (
        <TouchableOpacity onPress={handleClick}>
            <Box paddingX={5} paddingY={3}>
                <Text
                    color="#003753"
                    fontSize="dm-h2"
                    fontFamily="mono"
                    numberOfLines={1}
                    style={{ overflow: 'hidden' }}
                >
                    {props.title}
                </Text>
                <Text
                    color="#003753"
                    fontSize="dm-p"
                    fontFamily="body"
                    numberOfLines={2}
                    style={{ overflow: 'hidden' }}
                >
                    {props.description}
                </Text>
            </Box>
        </TouchableOpacity>
    );
};

export default BoutiqueItem;
