import { useIsFocused } from '@react-navigation/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageContainer from '../../../../components/atomes/container/PageContainer';
import EntrepriseItem from '../../../../components/molecules/EntrepriseItem/EntrepriseItem';
import StructureFab from '../../../../components/molecules/structure-fab/StructureFab';
import { companyProps, listCompany } from '../../../../services';
import { companyActions } from '../../../../stores/slices/company/companySlice';
// import { * as stores } from '../../../../stores';

const Structure = () => {
    const { companyList } = useSelector((state: any) => state.company);

    const isFocused = useIsFocused();

    const dispatch = useDispatch();

    React.useEffect(() => {
        if (isFocused) {
            listCompany()
                .then((data) => dispatch(companyActions.setCompanyList(data)))
                .catch((err) => console.log(err));
        }
    }, [dispatch, isFocused]);

    return (
        <>
            <PageContainer paddingY={0}>
                {companyList &&
                    companyList?.map((company: companyProps) => (
                        <EntrepriseItem key={company.id} data={company} />
                    ))}
            </PageContainer>

            <StructureFab />
        </>
    );
};

export default Structure;
