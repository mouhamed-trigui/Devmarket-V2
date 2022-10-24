import React, { useState, useContext, useEffect } from 'react';
import './structures.module.scss';
import { IonContent, IonPage } from '@ionic/react';
import {
    DataGrid,
    frFR,
    GridColDef,
    GridRenderCellParams,
    GridToolbar,
} from '@mui/x-data-grid';

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

import DeleteDialog from '../../../components/organisms/delete-dialog/DeleteDialog';
import { IStore } from '../../../services/model/store';
import {
    deleteStore,
    getAllStores,
    getNextStore,
    getStoreById,
} from '../../../services/methodes/store';
import DialogForm from '../../../components/organisms/dialog-form/DialogForm';
import AutoSearchInput from '../../../components/molecules/auto-search-input/auto-search-input';
import { AlertContext } from '../../../context/alert/AlertProvider';
import { useIntl } from 'react-intl';
import { storeType } from '../../../extensions/i18n/defined-message';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

/* eslint-disable-next-line */
export interface StructuresProps {}

const Box = styled(muiBox)`
    display: flex;
    padding: 5px;
`;
export function Structures(props: StructuresProps) {
    const [select, setSelect] = useState<any[]>([]);
    const [data, setData] = useState<IStore[]>([]);
    const [pageSize, setPageSize] = useState<number>(-1);
    const [page, setPage] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [selectedFilter, setSelectedFilter] = React.useState(0);
    const [loading, setLoading] = useState(false);

    const { showAlert } = useContext(AlertContext);

    const [dialogOpened, setDialogOpened] = useState(false);

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
                filters.push({ key: 'hasModeration', value: true });
                break;
            case 3:
                filters.push({ key: 'blocked', value: true });
                break;
            case 4:
                filters.push({ key: 'validated', value: true });
                break;
        }
        return filters;
    };

    const handleStructureDelete = (id: number) => {
        deleteStore(id)
            .then(() => {
                setData(data.filter((store) => store.id !== id));
                showAlert('La structure a bien été supprimée', 'success');
            })
            .catch((e) => {
                console.error(e);
                showAlert('Une erreur est survenue', 'error');
            });
    };

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
        },
        {
            field: 'name',
            headerName: 'Structure',

            width: 100,
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
            field: 'description',
            headerName: 'Description',
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
            field: 'storeType',
            headerName: 'Type de structure',
            renderCell: (datum) => {
                const result =
                    storeType[datum?.value as keyof typeof storeType];
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
                            key={datum?.value}
                            variant="body2"
                        >
                            {formatMessage(result)}
                        </Typography>
                    </Tooltip>
                );
            },
            minWidth: 150,
        },
        {
            field: 'eCommerceAndPhysicalStore',
            headerName: 'Physique & E-Commerce',
            width: 180,
            valueFormatter: (datum) => {
                if (datum?.value) {
                    return 'Oui';
                }
                return 'Non';
            },
        },
        {
            field: 'offerNbr',
            headerName: 'Offers',
            width: 70,
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
                                    store: datum.row,
                                })
                            }
                        >
                            Valider la boutique
                        </Button>
                    );
                } else {
                    return null;
                }
            },
            width: 148,
        },
        {
            field: 'validatedByAdmin',
            headerName: '',
            width: 50,
            disableColumnMenu: true,
            renderCell: (datum: GridRenderCellParams<boolean, IStore>) => {
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
                                backgroundColor: '#00AAC7',
                                borderRadius: '15%',
                            }}
                            onClick={() =>
                                history.replace(`/edit/${data.row.id}`, {
                                    store: data.row,
                                })
                            }
                        >
                            <EditIcon />
                        </IconButton>
                        <DeleteDialog
                            onClick={() => handleStructureDelete(data.row.id)}
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

    const getStructures = async (page: number, size: number) => {
        setLoading(true);
        await getAllStores(getFilters(), page, size)
            .then((data) => {
                setData(data.content);
                setTotalElements(data.totalElements);
            })
            .finally(() => setLoading(false));
    };

    const handleStoreValidation = () => {
        getNextStore(0, {
            blocked: false,
            validated: false,
            canBeValidated: true,
        })
            .then((data) => {
                if (data) {
                    history.replace(`/validate/${data.id}`, {
                        store: data,
                    });
                } else {
                    showAlert('Aucune boutique à valider', 'info');
                }
            })
            .catch((err) => {
                console.error(err);
                showAlert('Aucune boutique à valider', 'info');
            });
    };

    useEffect(() => {
        if (globalSearch && globalSearch?.entityType === 'STORE') {
            getStoreById(globalSearch.id)
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
                        getStructures(page, pageSize);
                        setDialogOpened(false);
                    }}
                    setOpen={setDialogOpened}
                    source="store"
                    dialogTitle="Ajouter une boutique"
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
                        Liste des boutiques
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
                            onClick={handleStoreValidation}
                        >
                            Valider les boutiques
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
                            Ajouter une boutique
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
                                searchType="store"
                                setContent={setData}
                                setBackupContent={() =>
                                    globalSearch?.entityType === 'STORE'
                                        ? undefined
                                        : getStructures(page, pageSize)
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
                            label="Toutes les Boutiques"
                        />

                        <Chip
                            variant={
                                selectedFilter === 1 ? 'filled' : 'outlined'
                            }
                            onClick={() => setSelectedFilter(1)}
                            label="Boutique à valider"
                        />
                        <Chip
                            variant={
                                selectedFilter === 2 ? 'filled' : 'outlined'
                            }
                            onClick={() => setSelectedFilter(2)}
                            label="Boutique à Modéré"
                        />
                        <Chip
                            variant={
                                selectedFilter === 3 ? 'filled' : 'outlined'
                            }
                            onClick={() => setSelectedFilter(3)}
                            label="Boutique Bloqué"
                        />
                        <Chip
                            variant={
                                selectedFilter === 4 ? 'filled' : 'outlined'
                            }
                            onClick={() => setSelectedFilter(4)}
                            label="Boutique Validé"
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

export default Structures;
