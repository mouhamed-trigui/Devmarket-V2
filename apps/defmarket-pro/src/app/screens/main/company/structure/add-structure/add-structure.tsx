import React from 'react';
import { Organisms } from '../../../../../components';

// Redux
import { useDispatch } from 'react-redux';

// Services
import { View } from 'native-base';
import { Dimensions, Platform } from 'react-native';
import { companyActions } from '../../../../../stores/slices/company/companySlice';
import { Text } from '../../../../../components/atomes';
import { FormattedMessage } from 'react-intl';

/* eslint-disable-next-line */
export interface AddStructureProps {
    navigation: any;
}

export function AddStructure(props: AddStructureProps) {
    const dispatch = useDispatch();

    return (
        <View
            style={{
                alignItems: 'center',
                flexGrow: 1,
                paddingBottom: 10,
            }}
        >
            <Text
                width={300}
                fontFamily="body"
                fontSize="dm-2p"
                textAlign="center"
                color={'system.200'}
            >
                <FormattedMessage
                    id="kqpx53"
                    defaultMessage="Trouve automatiquement ton entreprise grâce à son nom ou SIREN. Tu peux aussi compléter les informations suivantes :"
                    values={{
                        br: '\n',
                    }}
                />
            </Text>
            <Organisms.FormIdentityEstablishmentRegistration
                successAction={(data) => {
                    dispatch(companyActions.addCompany(data));
                    props.navigation.goBack();
                }}
            />
        </View>
    );
}

export default AddStructure;
