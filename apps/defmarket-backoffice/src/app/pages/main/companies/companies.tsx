import React, { useState, useContext, useEffect } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import './companies.module.scss';
import {
    DataGrid,
    frFR,
    GridColDef,
    GridRenderCellParams,
    GridToolbar,
    GridValueGetterParams,
} from '@mui/x-data-grid';

import { ICompany, IOwner } from '../../../services/model/accounts';
import {
    Box as muiBox,
    Button,
    Chip,
    IconButton,
    Stack,
    styled,
    Tooltip,
    Typography,
} from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from 'react-router-dom';
import {
    getAllCompanies,
    getCompanyById,
    getNextCompany,
} from '../../../services/methodes/companies';
import DeleteDialog from '../../../components/organisms/delete-dialog/DeleteDialog';
import { deleteCompany } from '../../../services/methodes/company';
import { IAddress } from '../../../services/model/common';
import DialogForm from '../../../components/organisms/dialog-form/DialogForm';
import AutoSearchInput from '../../../components/molecules/auto-search-input/auto-search-input';
import { colors } from '../../../theme/colors';
import { AlertContext } from '../../../context/alert/AlertProvider';
import { useIntl } from 'react-intl';
import { companyType } from '../../../extensions/i18n/defined-message';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
/* eslint-disable-next-line */
export interface CompaniesProps {}

interface BoutiqueItemProps {
    title: string;
    description: string;
    companyId: number;
    data: any;
}

const Box = styled(muiBox)`
    display: flex;
    padding: 5px;
`;

export function Companies(props: CompaniesProps) {
    const [select, setSelect] = useState<any[]>([]);
    const [data, setData] = useState<ICompany[]>([]);
    const [pageSize, setPageSize] = useState<number>(-1);
    const [page, setPage] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [selectedFilter, setSelectedFilter] = React.useState(0);
    const [dialogOpened, setDialogOpened] = useState(false);
    const [loading, setLoading] = useState(false);

    const { showAlert } = useContext(AlertContext);

    const { formatMessage } = useIntl();

    /* const [sort, setSort] = useState<{
        property: string;
        direction: 'asc' | 'desc';
        external?: boolean;
    }>({
        property: 'id',
        direction: 'asc',
    }); */

    const history = useHistory();

    const { globalSearch } = useSelector((state: RootState) => state?.user);

    const getFilters = () => {
        const filters = [];
        switch (selectedFilter) {
            case 1:
                filters.push({ key: 'validated', value: false });
                filters.push({ key: 'blocked', value: false });
                filters.push({ key: 'canBeValidated', value: true });
                break;
            case 2:
                filters.push({ key: 'blocked', value: true });
                break;
            case 3:
                filters.push({ key: 'validated', value: true });
                break;
        }
        return filters;
    };

    const handleCompanyDelete = (id: number) => {
        deleteCompany(id)
            .then(() => {
                setData(data.filter((company) => company.id !== id));
                showAlert('La boutique a été supprimée avec succès', 'success');
            })
            .catch((e) => {
                console.error(
                    'Une erreur est survenue lors de la suppression',
                    e.message
                );
                showAlert(
                    "Une erreur s'est produite lors de la suppression de l'entreprise",
                    'error'
                );
            });
    };

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
        },
        {
            field: 'companyType',
            headerName: "Type d'entreprise",
            width: 130,
            renderCell: (data) => {
                const result =
                    companyType[data?.value as keyof typeof companyType];
                return (
                    <Tooltip
                        placement="top"
                        style={{ alignItems: 'center' }}
                        title={formatMessage(result)}
                    >
                        <Typography
                            noWrap
                            width="100%"
                            overflow="hidden"
                            key={data?.value}
                            variant="body2"
                        >
                            {formatMessage(result)}
                        </Typography>
                    </Tooltip>
                );
            },
        },
        {
            field: 'name',
            headerName: 'Entreprises',
            flex: 1,
            minWidth: 150,
            renderCell: (data) => {
                return (
                    <Tooltip
                        placement="top"
                        style={{ alignItems: 'center' }}
                        title={data?.value}
                    >
                        <Typography
                            noWrap
                            width="100%"
                            overflow="hidden"
                            key={data?.value}
                            variant="body2"
                        >
                            {data?.value}
                        </Typography>
                    </Tooltip>
                );
            },
        },
        {
            field: 'siren',
            headerName: 'SIREN',
            renderCell: (data) => {
                return (
                    <Tooltip
                        placement="top"
                        style={{ alignItems: 'center' }}
                        title={data?.value}
                    >
                        <Typography
                            noWrap
                            width="100%"
                            overflow="hidden"
                            key={data?.value}
                            variant="body2"
                        >
                            {data?.value}
                        </Typography>
                    </Tooltip>
                );
            },
        },
        {
            field: 'address',
            headerName: 'Villes',
            valueGetter: (data: GridValueGetterParams<IAddress>) => {
                return data?.value?.city ?? '';
            },
            renderCell: (data: GridValueGetterParams<IAddress>) => {
                return (
                    data?.value && (
                        <Tooltip
                            placement="top"
                            style={{ alignItems: 'center' }}
                            title={data?.value}
                        >
                            <Typography
                                noWrap
                                width="100%"
                                overflow="hidden"
                                key={data?.value.city}
                                variant="body2"
                            >
                                {data?.value}
                            </Typography>
                        </Tooltip>
                    )
                );
            },
        },
        {
            field: 'nbOfStores',
            headerName: 'Boutiques',
        },
        {
            field: 'OwnerEmail',
            minWidth: 200,
            headerName: 'E-mail de dirigent',
            valueGetter: (data: GridValueGetterParams<any, ICompany>) => {
                return data?.row?.owners
                    ?.map((owner) => owner.email)
                    .join('\n');
            },
            renderCell: (data) => {
                return (
                    <Tooltip
                        placement="top"
                        style={{ alignItems: 'center' }}
                        title={data?.value}
                    >
                        <Typography
                            noWrap
                            width="100%"
                            overflow="hidden"
                            key={data?.value}
                            variant="body2"
                        >
                            {data?.value}
                        </Typography>
                    </Tooltip>
                );
            },
        },
        {
            field: 'OwnerFullName',
            headerName: 'Nom du responsable',
            width: 150,
            valueGetter: (data: GridValueGetterParams<IOwner, ICompany>) => {
                if (data.row.leaderType === 'MANAGER') {
                    const firstOwner =
                        data?.row?.owners?.length > 0
                            ? data?.row?.owners[0]
                            : undefined;
                    return `${firstOwner?.firstName ?? ''} ${
                        firstOwner?.lastName ?? ''
                    }`;
                }
                return `${data.row.ruler?.name ?? ''} ${
                    data.row.ruler?.lastName ?? ''
                }`;
            },
            renderCell: (data) => {
                return (
                    <Tooltip
                        placement="top"
                        style={{ alignItems: 'center' }}
                        title={data?.value}
                    >
                        <Typography
                            noWrap
                            width="100%"
                            overflow="hidden"
                            key={data?.value}
                            variant="body2"
                        >
                            {data?.value}
                        </Typography>
                    </Tooltip>
                );
            },
        },
        {
            field: 'leaderType',
            headerName: 'Post',
            width: 110,
            valueGetter: (
                data: GridValueGetterParams<
                    'PRESIDENT' | 'MANAGER' | null,
                    ICompany
                >
            ) => {
                if (data.row.leaderType === 'MANAGER') {
                    return 'Dirigeant';
                }
                if (data.row.leaderType === 'PRESIDENT') {
                    return 'Responsable';
                }
                return '';
            },
        },
        {
            field: 'validation',
            headerName: 'Validation',
            renderCell: (datum) => {
                if (!datum.row.validatedByAdmin && !datum.row.blocked) {
                    return (
                        <Button
                            variant="contained"
                            size="small"
                            color="secondary"
                            onClick={() =>
                                history.replace(`/validate/${datum.row.id}`, {
                                    company: datum.row,
                                })
                            }
                        >
                            Valider l'entreprise
                        </Button>
                    );
                } else {
                    return null;
                }
            },
            width: 146,
        },
        {
            field: 'validatedByAdmin',
            headerName: '',
            width: 50,
            disableColumnMenu: true,
            renderCell: (datum: GridRenderCellParams<boolean, ICompany>) => {
                if (datum.row?.blocked) {
                    return (
                        <CancelRoundedIcon color="error" fontSize="medium" />
                    );
                } else if (datum.row?.validatedByAdmin === true) {
                    return (
                        <CheckCircleRoundedIcon
                            color="success"
                            fontSize="medium"
                        />
                    );
                }
                return (
                    <CheckCircleRoundedIcon color="warning" fontSize="medium" />
                );
            },
        },
        {
            field: 'actions',
            headerName: '',
            disableColumnMenu: true,
            sortable: false,
            width: 100,
            renderCell: (data) => {
                return (
                    <Box
                        display="flex"
                        flexDirection="row"
                        gap={'5px'}
                        color="white"
                    >
                        <IconButton
                            color="inherit"
                            size="small"
                            style={{
                                backgroundColor: colors.secondary,
                                borderRadius: '15%',
                            }}
                            onClick={() =>
                                history.replace(`/edit/${data.row.id}`, {
                                    company: data.row,
                                })
                            }
                        >
                            <EditIcon />
                        </IconButton>
                        <DeleteDialog
                            onClick={() => handleCompanyDelete(data.row.id)}
                        >
                            <IconButton
                                color="inherit"
                                size="small"
                                style={{
                                    backgroundColor: colors.error,
                                    borderRadius: '15%',
                                }}
                            >
                                <DeleteForeverOutlinedIcon />
                            </IconButton>
                        </DeleteDialog>
                    </Box>
                );
            },
        },
    ];

    const getCompanies = async (page: number, size: number) => {
        setLoading(true);
        await getAllCompanies(getFilters(), page, size)
            .then((data) => {
                setData(data.content);
                setTotalElements(data.totalElements);
            })
            .finally(() => setLoading(false));
    };

    const handleCompaniesValidation = () => {
        getNextCompany(0, {
            blocked: false,
            validated: false,
            canBeValidated: true,
        })
            .then((data) => {
                if (data) {
                    history.replace(`/validate/${data.id}`, {
                        company: data,
                    });
                } else {
                    showAlert('Aucune entreprise à valider', 'info');
                }
            })
            .catch((err) => {
                showAlert('Aucune entreprise à valider', 'info');
                console.error(err);
            });
    };

    useEffect(() => {
        if (globalSearch && globalSearch?.entityType === 'COMPANY') {
            getCompanyById(globalSearch.id)
                .then((res) => setData([res]))
                .catch((err) => console.error(err));
        }
    }, [globalSearch]);

    return (
        <IonPage>
            <IonContent fullscreen>
                <DialogForm
                    open={dialogOpened}
                    onClose={() => {
                        getCompanies(page, pageSize);
                        setDialogOpened(false);
                    }}
                    setOpen={setDialogOpened}
                    source="company"
                    dialogTitle="Ajouter une entreprise"
                />

                <Box
                    display="flex"
                    flexDirection={{ sm: 'row', xs: 'column', lg: 'row' }}
                    justifyContent="space-between"
                    marginTop={'20px'}
                    marginBottom={'10px'}
                    gap={2}
                >
                    <Typography
                        variant="h1"
                        color="primary"
                        marginTop={{ sm: 'unset', xs: '10px', lg: 'unset' }}
                        marginBottom={{ sm: 'unset', xs: '10px', lg: 'unset' }}
                    >
                        Liste des entreprises
                    </Typography>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 5,
                        }}
                    >
                        <Button
                            style={{ whiteSpace: 'nowrap' }}
                            variant="contained"
                            color="secondary"
                            onClick={handleCompaniesValidation}
                        >
                            Valider les entreprises
                        </Button>
                        <Button
                            style={{ whiteSpace: 'nowrap' }}
                            startIcon={<AddIcon />}
                            variant="contained"
                            color="warning"
                            onClick={() => {
                                setDialogOpened(true);
                            }}
                        >
                            Ajouter une entreprise
                        </Button>
                    </div>
                </Box>
                <Stack
                    direction={{ sm: 'column', xs: 'column', lg: 'row' }}
                    marginTop={{ sm: 'unset', xs: '5px', lg: 'unset' }}
                    gap="5px"
                    paddingX="5px"
                >
                    {React.useMemo(() => {
                        return (
                            <AutoSearchInput
                                filters={getFilters()}
                                page={page}
                                size={pageSize}
                                searchType="company"
                                setContent={setData}
                                setBackupContent={() =>
                                    globalSearch?.entityType === 'COMPANY'
                                        ? undefined
                                        : getCompanies(page, pageSize)
                                }
                            />
                        );
                        // eslint-disable-next-line react-hooks/exhaustive-deps
                    }, [
                        page,
                        pageSize,
                        selectedFilter,
                        globalSearch?.entityType,
                    ])}
                    <Stack
                        direction="row"
                        overflow={'auto'}
                        gap="5px"
                        marginTop={{ sm: 'unset', xs: '5px', lg: 'unset' }}
                    >
                        <Chip
                            variant={
                                selectedFilter === 0 ? 'filled' : 'outlined'
                            }
                            onClick={() => setSelectedFilter(0)}
                            label="Tous les entreprises"
                        />

                        <Chip
                            variant={
                                selectedFilter === 1 ? 'filled' : 'outlined'
                            }
                            onClick={() => setSelectedFilter(1)}
                            label="Entreprises à valider"
                        />

                        <Chip
                            variant={
                                selectedFilter === 2 ? 'filled' : 'outlined'
                            }
                            onClick={() => setSelectedFilter(2)}
                            label="Entreprises bloqués"
                        />
                        <Chip
                            variant={
                                selectedFilter === 3 ? 'filled' : 'outlined'
                            }
                            onClick={() => setSelectedFilter(3)}
                            label="Entreprises validés"
                        />
                    </Stack>
                </Stack>
                <div
                    style={{
                        height: 'calc(100% - 130px)',
                        minHeight: '200px',
                    }}
                >
                    <DataGrid
                        localeText={
                            frFR.components.MuiDataGrid.defaultProps.localeText
                        }
                        columns={columns}
                        rows={data}
                        paginationMode="server"
                        pagination
                        loading={loading}
                        onPageChange={setPage}
                        autoPageSize
                        onPageSizeChange={setPageSize}
                        rowCount={totalElements}
                        onSelectionModelChange={setSelect}
                        checkboxSelection
                        disableSelectionOnClick
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        style={{
                            marginInline: '5px',
                            marginTop: '10px',
                            flexGrow: 1,
                            flexShrink: 1,
                        }}
                    />
                </div>
            </IonContent>
        </IonPage>
    );
}

export default Companies;
