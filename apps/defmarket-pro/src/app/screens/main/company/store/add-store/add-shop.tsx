import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Organisms } from '../../../../../components';
import { useIntl } from 'react-intl';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Services
import { companyProps } from '../../../../../services';
import { FormControlSelect } from '../../../../../components/molecules';
import { KeyboardAvoidingView, View } from 'native-base';

/* eslint-disable-next-line */
export interface AddShopProps {
    navigation: any;
    route: any;
}

const StyledAddShop = styled.View``;

export function AddStore(props: AddShopProps) {
    // Translt
    const { formatMessage } = useIntl();

    const { companyList } = useSelector((state: any) => state.company);

    const [companyId, setCompanyId] = useState<number | undefined>(
        companyList.length === 1 ? companyList[0]?.id : undefined
    );
    const dispatch = useDispatch();

    return (
        <KeyboardAvoidingView
            h={{
                base: 'auto',
                lg: 'auto',
            }}
            behavior={'position'}
        >
            <View style={{ justifyContent: 'center', alignContent: 'center', marginTop: 30 }}>
                <FormControlSelect
                    isRequired
                    placeholder={formatMessage({
                        id: 'IDQ16s',
                        description: 'Choisis ta structure',
                        defaultMessage: 'Choisis ta structure',
                    })}
                    placeholderTextColor={'white'}
                    value={companyId?.toString()}
                    items={companyList.map((company: companyProps) => ({
                        label: company.name,
                        value: company.id.toString(),
                    }))}
                    onChange={(value: string) => setCompanyId(Number(value))}
                />
                <Organisms.FormIdentityShopRegistration
                    companyId={companyId}
                    successAction={() => {
                        props?.navigation?.navigate('MyStructures');
                    }}
                />
            </View>
        </KeyboardAvoidingView>
    );
}

export default AddStore;
