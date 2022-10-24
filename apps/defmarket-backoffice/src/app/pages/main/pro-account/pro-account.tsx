import React, { useState, useEffect, useContext } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import {
    DataGrid,
    frFR,
    GridColDef,
    GridRenderCellParams,
    GridToolbar,
} from '@mui/x-data-grid';

import { getAllUsers } from '../../../services';
import {
    ICompany,
    IDocuments,
    IProAccountProps,
} from '../../../services/model/accounts';
import {
    Box as muiBox,
    Button,
    Chip,
    IconButton,
    List,
    Stack,
    styled,
    Tab,
    Tabs,
    Tooltip,
    Typography,
} from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import AddIcon from '@mui/icons-material/Add';
import { useHistory, useLocation } from 'react-router-dom';
import {
    deleteUser,
    getNextUser,
    getUserById,
} from '../../../services/methodes/accounts';
import DialogForm from '../../../components/organisms/dialog-form/DialogForm';
import AutoSearchInput from '../../../components/molecules/auto-search-input/auto-search-input';
import { AlertContext } from '../../../context/alert/AlertProvider';
import DeleteDialog from '../../../components/organisms/delete-dialog/DeleteDialog';
import { colors } from '../../../theme/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

const Box = styled(muiBox)`
    display: flex;
    padding: 5px;
`;

const StyledDataGrid = styled(DataGrid)`
    &.MuiDataGrid-root .MuiDataGrid-columnHeader:focus,
    &.MuiDataGrid-root .MuiDataGrid-cell:focus {
        outline: none;
    }
`;

export function ProAccount({ ...props }) {
    const [dialogOpened, setDialogOpened] = useState(false);
    const [select, setSelect] = useState<any[]>([]);
    const [data, setData] = useState<IProAccountProps[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [page, setPage] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [selectedFilter, setSelectedFilter] = React.useState(0);
    const [loading, setLoading] = useState(false);

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
                break;
            case 2:
                filters.push({ key: 'validated', value: false });
                filters.push({ key: 'blocked', value: false });
                filters.push({ key: 'canBeValidated', value: true });
                break;
            case 3:
                filters.push({
                    key: 'moreInfoRequestedByAdmin',
                    value: true,
                });
                break;
            case 4:
                filters.push({ key: 'blocked', value: true });
                break;
            case 5:
                filters.push({ key: 'validated', value: true });
                break;
        }
        return filters;
    };

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Id',
        },
        {
            field: 'lastName',
            headerName: 'Nom',
            renderCell: (datum) => {
                return (
                    <Tooltip
                        placement="top"
                        style={{ alignItems: 'center' }}
                        title={datum?.value}
                    >
                        <Typography
                            noWrap
                            width={68}
                            overflow="hidden"
                            key={datum?.value}
                            variant="body2"
                        >
                            {datum?.value}
                        </Typography>
                    </Tooltip>
                );
            },
        },
        {
            field: 'firstName',
            headerName: 'Prénom',
            renderCell: (datum) => {
                return (
                    <Tooltip
                        placement="top"
                        style={{ alignItems: 'center' }}
                        title={datum?.value}
                    >
                        <Typography
                            noWrap
                            width={68}
                            overflow="hidden"
                            key={datum?.value}
                            variant="body2"
                        >
                            {datum?.value}
                        </Typography>
                    </Tooltip>
                );
            },
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
            minWidth: 200,
            renderCell: (datum) => {
                return (
                    <Tooltip
                        placement="top"
                        style={{ alignItems: 'center' }}
                        title={datum?.value}
                    >
                        <Typography
                            noWrap
                            width="100%"
                            overflow="hidden"
                            key={datum?.value}
                            variant="body2"
                        >
                            {datum?.value}
                        </Typography>
                    </Tooltip>
                );
            },
        },
        {
            field: 'veteran',
            headerName: 'Membre DN',
            valueFormatter: (datum) => {
                if (datum?.value) {
                    return 'Oui';
                }
                return 'Non';
            },
        },
        {
            field: 'documents',
            headerName: "Justificatif d'identité",
            width: 150,
            renderCell: (
                params: GridRenderCellParams<IDocuments, IProAccountProps>
            ) => {
                return (
                    <Typography
                        variant="body2"
                        color={
                            params.row.validatedByAdmin
                                ? colors.success
                                : colors.warning
                        }
                    >
                        {params?.value?.justificationIdentity?.name ?? ''}
                    </Typography>
                );
            },
        },
        {
            field: 'companies',
            headerName: 'Entreprises',
            width: 200,
            renderCell: (datum) => {
                return (
                    <List
                        style={{
                            flex: 'auto',
                            maxHeight: '100%',
                            overflowY: 'auto',
                        }}
                    >
                        <Stack direction="column">
                            {datum?.value?.map((company: ICompany) => (
                                <Typography
                                    noWrap
                                    width="100%"
                                    overflow="hidden"
                                    key={company.name}
                                    variant="caption"
                                >
                                    {company.name}
                                </Typography>
                            ))}
                        </Stack>
                    </List>
                );
            },
        },
        {
            field: 'validation',
            renderCell: (datum) => {
                if (!datum.row.validatedByAdmin && !datum.row.blocked) {
                    return (
                        <Button
                            variant="contained"
                            size="small"
                            color="secondary"
                            onClick={() =>
                                history.replace(`/validate/${datum.row.id}`, {
                                    user: datum.row,
                                })
                            }
                        >
                            Valider le compte
                        </Button>
                    );
                } else {
                    return null;
                }
            },
            width: 140,
        },
        {
            field: 'validatedByAdmin',
            headerName: '',
            width: 50,
            disableColumnMenu: true,
            renderCell: (
                datum: GridRenderCellParams<boolean, IProAccountProps>
            ) => {
                if (datum.row?.blocked) {
                    return (
                        <CancelRoundedIcon color="error" fontSize="medium" />
                    );
                } else if (datum.value === true) {
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
                                backgroundColor: '#00AAC7',
                                borderRadius: '15%',
                            }}
                            onClick={() =>
                                history.replace(`/edit/${data.row.id}`, {
                                    user: data.row,
                                })
                            }
                        >
                            <EditIcon />
                        </IconButton>
                        <DeleteDialog
                            onClick={() => handleDeleteUser(data.row.id)}
                        >
                            <IconButton
                                color="inherit"
                                size="small"
                                style={{
                                    backgroundColor: '#E03616',
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

    const { showAlert } = useContext(AlertContext);

    const getUsers = (page: number, size: number) => {
        setLoading(true);
        getAllUsers(getFilters(), page, size)
            .then((data) => {
                setData(data.content);
                setTotalElements(data.totalElements);
            })
            .finally(() => setLoading(false));
    };

    const handleUserValidation = () => {
        getNextUser(0)
            .then((data) => {
                if (data) {
                    history.replace(`/validate/${data.id}`, {
                        user: data,
                    });
                } else {
                    showAlert('Aucun utilisateur à valider', 'info');
                }
            })
            .catch((err) => console.error(err));
    };

    const handleDeleteUser = (id: number) => {
        deleteUser(id)
            .then(() => {
                setData(data.filter((user) => user.id !== id));
                showAlert("L'utilisateur a bien été supprimé", 'success');
            })
            .catch((err) => {
                console.error(err);
                showAlert(
                    "Une erreur est survenue lors de la suppression de l'utilisateur",
                    'error'
                );
            });
    };

    useEffect(() => {
        if (globalSearch && globalSearch?.entityType === 'USER') {
            getUserById(globalSearch.id)
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
                        getUsers(page, pageSize);
                        setDialogOpened(false);
                    }}
                    setOpen={setDialogOpened}
                    source="compte"
                    dialogTitle="Ajouter un compte professionnel"
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
                        Comptes professionnels
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
                            onClick={handleUserValidation}
                        >
                            Valider les comptes
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
                            Ajouter un compte
                        </Button>
                    </div>
                </Box>
                <Stack
                    direction={{ sm: 'column', xs: 'column', lg: 'row' }}
                    marginTop={{ sm: 'unset', xs: '10px', lg: 'unset' }}
                    gap="5px"
                    paddingX="5px"
                >
                    {React.useMemo(() => {
                        return (
                            <AutoSearchInput
                                filters={getFilters()}
                                page={page}
                                size={pageSize}
                                searchType="trader"
                                setContent={setData}
                                setBackupContent={() =>
                                    globalSearch?.entityType === 'USER'
                                        ? undefined
                                        : getUsers(page, pageSize)
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
                        gap="5px"
                        paddingX="5px"
                        overflow="auto"
                        marginTop={{ sm: 'unset', xs: '10px', lg: 'unset' }}
                    >
                        <Chip
                            variant={
                                selectedFilter === 0 ? 'filled' : 'outlined'
                            }
                            onClick={() => setSelectedFilter(0)}
                            label="Tous les comptes"
                        />
                        <Chip
                            variant={
                                selectedFilter === 1 ? 'filled' : 'outlined'
                            }
                            onClick={() => setSelectedFilter(1)}
                            label="Nouveau comptes"
                        />
                        <Chip
                            variant={
                                selectedFilter === 2 ? 'filled' : 'outlined'
                            }
                            onClick={() => setSelectedFilter(2)}
                            label="Comptes à valider"
                        />
                        <Chip
                            variant={
                                selectedFilter === 3 ? 'filled' : 'outlined'
                            }
                            onClick={() => setSelectedFilter(3)}
                            label="Comptes en attente"
                        />
                        <Chip
                            variant={
                                selectedFilter === 4 ? 'filled' : 'outlined'
                            }
                            onClick={() => setSelectedFilter(4)}
                            label="Comptes bloqués"
                        />
                        <Chip
                            variant={
                                selectedFilter === 5 ? 'filled' : 'outlined'
                            }
                            onClick={() => setSelectedFilter(5)}
                            label="Comptes validés"
                        />
                    </Stack>
                </Stack>

                <div
                    style={{
                        height: 'calc(100% - 130px)',
                        minHeight: '200px',
                    }}
                >
                    <StyledDataGrid
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

export default ProAccount;
