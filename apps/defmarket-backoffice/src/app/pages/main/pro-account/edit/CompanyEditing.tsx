// assets
import { ReactComponent as CompanySvg } from '../../../../../assets/svg/notif-company.svg';

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

// components
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Stack,
    Typography,
} from '@mui/material';
import Select from '../../../../components/atoms/form/select/Select';
import CompanyForm from '../../../../components/molecules/form/company-form/CompanyForm';
import Actions from './Actions';
import Container from './Container';
import { ICompany } from '../../../../services/model/accounts';
import { FC, useContext, useEffect } from 'react';
import {
    blockCompany,
    updateCompany,
    validateCompany,
} from '../../../../services/methodes/company';
import { AlertContext } from '../../../../context/alert/AlertProvider';
import { ErrorHandlerContext } from '../../../../context/errorHandler/ErrorHandlerProvider';

interface ICompanyEditingProps {
    expanded?: boolean;
    handleAccordionChange?: () => void;
    next?: () => void;
    companies?: ICompany[];
    selectedCompany?: ICompany;
    setSelectedCompany: React.Dispatch<
        React.SetStateAction<ICompany | undefined>
    >;
    hideSelect?: boolean;
    updateBlockStatus: (
        from: 'COMPANY' | 'PROFILE' | 'OFFER' | 'STORE',
        isBlocked?: boolean
    ) => void;
}

const CompanyEditing: FC<ICompanyEditingProps> = ({
    expanded,
    handleAccordionChange,
    next,
    companies,
    selectedCompany,
    setSelectedCompany,
    hideSelect,
    updateBlockStatus,
}) => {
    const { showAlert } = useContext(AlertContext);
    const { handleError } = useContext(ErrorHandlerContext);

    useEffect(() => {
        if (companies && companies.length === 1) {
            setSelectedCompany(companies[0]);
        }
    }, [companies, setSelectedCompany]);

    const handleCompanyValidation = () => {
        if (selectedCompany) {
            validateCompany(selectedCompany.id)
                .then(() => {
                    setSelectedCompany((selectedCompany) =>
                        selectedCompany
                            ? {
                                  ...selectedCompany,
                                  validatedByAdmin: true,
                              }
                            : ({
                                  validatedByAdmin: true,
                              } as ICompany)
                    );
                    showAlert("l'entreprise a été validée", 'success');
                })
                .catch((err) => {
                    console.error(err);
                    showAlert(
                        "Une erreur est survenue lors de la validation de l'entreprise",
                        'error'
                    );
                });
        }
    };

    const handleCompanyUpdate = () => {
        if (selectedCompany)
            updateCompany(selectedCompany.id, selectedCompany)
                .then(() => {
                    if (next) next();
                    showAlert("l'entreprise a bien été mise à jour", 'success');
                })
                .catch((err) =>
                    handleError(err, {
                        default:
                            "Une erreur est survenue lors de la mise à jour de l'entreprise",
                    })
                );
    };

    const handleCompanyBlock = (block: boolean, reason: string) => {
        if (selectedCompany) {
            blockCompany(selectedCompany.id, { blockAction: block, reason })
                .then(() => {
                    updateBlockStatus('COMPANY', block);
                    showAlert(
                        `l'entreprise a bien été ${
                            block ? 'bloquée' : 'débloquée'
                        }`,
                        'success'
                    );
                })
                .catch((err) => {
                    console.error(err);
                    showAlert(
                        `Une erreur est survenue lors de la ${
                            block ? 'blocage' : 'déblocage'
                        } de l'entreprise`,
                        'error'
                    );
                });
        }
    };

    return (
        <Accordion
            disableGutters
            style={{ paddingInline: 70 }}
            expanded={expanded}
            onChange={handleAccordionChange}
        >
            <AccordionSummary>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    flexGrow={1}
                >
                    <Stack direction="row" alignItems="center">
                        <CompanySvg
                            width={25}
                            height={25}
                            style={{
                                marginRight: '10px',
                            }}
                        />
                        <Typography variant="h4" fontWeight="bold">
                            Entreprises de l'utilisateur
                        </Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="end"
                        gap={1}
                        width="200px"
                    >
                        {expanded && !hideSelect && (
                            <Select
                                required
                                fullWidth
                                label={'Entreprise'}
                                value={selectedCompany?.id ?? 0}
                                options={
                                    companies?.map((company) => ({
                                        label: company.name,
                                        value: company.id,
                                    })) ?? []
                                }
                                onChange={(value) =>
                                    setSelectedCompany(
                                        companies?.find(
                                            (company) =>
                                                company.id === Number(value)
                                        )
                                    )
                                }
                            />
                        )}
                        {selectedCompany ? (
                            selectedCompany?.blocked ? (
                                <CancelRoundedIcon
                                    color="error"
                                    fontSize="medium"
                                />
                            ) : (
                                <CheckCircleRoundedIcon
                                    color={
                                        selectedCompany?.validatedByAdmin
                                            ? 'success'
                                            : 'warning'
                                    }
                                    fontSize="medium"
                                />
                            )
                        ) : null}
                    </Stack>
                </Stack>
            </AccordionSummary>
            {selectedCompany && (
                <AccordionDetails>
                    <Container>
                        <CompanyForm
                            gap={5}
                            company={selectedCompany}
                            setCompany={setSelectedCompany}
                        />
                    </Container>
                    <Actions
                        isDisabled={
                            (companies && companies.length === 0) ||
                            !selectedCompany
                        }
                        block={{
                            onClick: handleCompanyBlock,
                            isBlocked: selectedCompany?.blocked,
                        }}
                        validate={{
                            onClick: handleCompanyValidation,
                        }}
                        showValidate={
                            !selectedCompany?.blocked &&
                            !selectedCompany?.validatedByAdmin
                        }
                        update={{
                            onClick: handleCompanyUpdate,
                        }}
                    />
                </AccordionDetails>
            )}
        </Accordion>
    );
};

export default CompanyEditing;
