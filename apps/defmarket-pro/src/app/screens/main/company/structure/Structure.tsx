import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageContainer from '../../../../components/atomes/container/PageContainer';
import EntrepriseItem from '../../../../components/molecules/EntrepriseItem/EntrepriseItem';
import StructureFab from '../../../../components/molecules/structure-fab/StructureFab';
import { companyProps, listCompany } from '../../../../services';
import { companyActions } from '../../../../stores/slices/company/companySlice';
// import { * as stores } from '../../../../stores';
const Structure = (props: any) => {
    const { companyList } = useSelector((state: any) => state.company);

    const dispatch = useDispatch();
    React.useEffect(() => {
        listCompany()
            .then((data) => dispatch(companyActions.setCompanyList(data)))
            .catch((err) => console.log(err));
    }, [dispatch]);

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
