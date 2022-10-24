import React, { useState, useContext, useEffect } from 'react';
import './offers.module.scss';
import { IonContent, IonPage } from '@ionic/react';
import {
    DataGrid,
    frFR,
    GridColDef,
    GridRenderCellParams,
    GridToolbar,
    GridValueGetterParams,
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
import { IOffer } from '../../../services/model/offer';
import {
    deleteOffer,
    getAllOffers,
    getNextOffer,
    getOfferById,
} from '../../../services/methodes/offer';
import DialogForm from '../../../components/organisms/dialog-form/DialogForm';
import AutoSearchInput from '../../../components/molecules/auto-search-input/auto-search-input';
import { AlertContext } from '../../../context/alert/AlertProvider';
import { useIntl } from 'react-intl';
import {
    offerCategory,
    offerTheme,
    offerType,
} from '../../../extensions/i18n/defined-message';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { ErrorHandlerContext } from '../../../context/errorHandler/ErrorHandlerProvider';
/* eslint-disable-next-line */
export interface OffersProps {}
const Box = styled(muiBox)`
    display: flex;
    padding: 5px;
`;
export function Offers(props: OffersProps) {
    const [select, setSelect] = useState<any[]>([]);
    const [data, setData] = useState<IOffer[]>([]);
    const [pageSize, setPageSize] = useState<number>(-1);
    const [page, setPage] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [selectedFilter, setSelectedFilter] = React.useState(0);
    const [loading, setLoading] = useState(false);

    const { showAlert } = useContext(AlertContext);
    const { handleError } = useContext(ErrorHandlerContext);

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

    const handleOfferDelete = (id: number) => {
        deleteOffer(id)
            .then(() => {
                setData(data.filter((offer) => offer.id !== id));
                showAlert('Offre supprimée avec succès', 'success');
            })
            .catch((e) => {
                console.error(e);
                showAlert(
                    "Une erreur est survenue lors de la suppression de l'offre",
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
            field: 'title',
            headerName: 'Offre',

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
            field: 'value',
            headerName: 'Valeur',
            width: 70,
        },
        {
            field: 'description',
            headerName: 'Description',
            flex: 1,
            minWidth: 150,
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
            field: 'offerType',
            headerName: "Type d'offre",
            width: 120,
            valueGetter: (
                datum: GridValueGetterParams<
                    'PERCENTAGE' | 'FLAT' | 'GOOD_PLAN' | null,
                    IOffer
                >
            ) => {
                const key = datum?.value
                    ? (datum?.value as keyof typeof offerType)
                    : 'UNDEFINED';
                return formatMessage(offerType[key]);
            },
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
            field: 'themeType',
            headerName: "Théme d'offre",
            width: 150,
            valueGetter: (datum) => {
                const result =
                    offerTheme[datum.value as keyof typeof offerTheme];
                return formatMessage(result);
            },

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
            field: 'offerCategory',
            headerName: "Catégorie d'offre",
            width: 150,
            valueGetter: (datum) => {
                const result =
                    offerCategory[datum?.value as keyof typeof offerCategory];
                return formatMessage(result);
            },

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
            field: 'minOfferValue',
            headerName: "Valeur minimale de l'offre",
            renderCell: (params) => (
                <Tooltip
                    placement="top"
                    style={{ alignItems: 'center' }}
                    title={params?.value}
                >
                    <Typography
                        noWrap
                        width="100%"
                        overflow="hidden"
                        key={params?.value}
                        variant="body2"
                    >
                        {params?.value}
                    </Typography>
                </Tooltip>
            ),
        },
        {
            field: 'midOfferValue',
            headerName: "Valeur de l'offre moyenne",
            renderCell: (params) => (
                <Tooltip
                    placement="top"
                    style={{ alignItems: 'center' }}
                    title={params?.value}
                >
                    <Typography
                        noWrap
                        width="100%"
                        overflow="hidden"
                        key={params?.value}
                        variant="body2"
                    >
                        {params?.value}
                    </Typography>
                </Tooltip>
            ),
        },
        {
            field: 'maxOfferValue',
            headerName: "Valeur maximale de l'offre",
            renderCell: (params) => (
                <Tooltip
                    placement="top"
                    style={{ alignItems: 'center' }}
                    title={params?.value}
                >
                    <Typography
                        noWrap
                        width="100%"
                        overflow="hidden"
                        key={params?.value}
                        variant="body2"
                    >
                        {params?.value}
                    </Typography>
                </Tooltip>
            ),
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
                                    offer: datum.row,
                                })
                            }
                        >
                            Valider l'offre
                        </Button>
                    );
                } else {
                    return null;
                }
            },
            width: 110,
        },
        {
            field: 'validatedByAdmin',
            headerName: '',
            width: 50,
            disableColumnMenu: true,
            renderCell: (datum: GridRenderCellParams<boolean, IOffer>) => {
                if (datum.row.blocked) {
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
                                    offer: data.row,
                                })
                            }
                        >
                            <EditIcon />
                        </IconButton>
                        <DeleteDialog
                            onClick={() => handleOfferDelete(data.row.id)}
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

    const getOffers = async (page: number, size: number) => {
        setLoading(true);
        await getAllOffers(getFilters(), page, size)
            .then((data) => {
                setData(data.content);
                setTotalElements(data.totalElements);
            })
            .finally(() => setLoading(false));
    };

    const handleOffersValidation = () => {
        getNextOffer(0, {
            blocked: false,
            validated: false,
        })
            .then((data) => {
                if (data) {
                    history.replace(`/validate/${data.id}`, {
                        offer: data,
                    });
                } else {
                    showAlert('Aucune offre à valider', 'info');
                }
            })
            .catch((err) => {
                handleError(err, { notFound: 'Aucune offre à valider' });
            });
    };

    useEffect(() => {
        if (globalSearch && globalSearch?.entityType === 'OFFER') {
            getOfferById(globalSearch.id)
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
                        getOffers(page, pageSize);
                        setDialogOpened(false);
                    }}
                    setOpen={setDialogOpened}
                    source="offer"
                    dialogTitle="Ajouter une offre"
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
                        Liste des Offres
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
                            onClick={handleOffersValidation}
                        >
                            Valider les Offres
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
                            Ajouter une Offre
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
                                searchType="offer"
                                setContent={setData}
                                setBackupContent={() =>
                                    globalSearch?.entityType === 'OFFER'
                                        ? undefined
                                        : getOffers(page, pageSize)
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
                        overflow="auto"
                        marginTop={{ sm: 'unset', xs: '10px', lg: 'unset' }}
                    >
                        <Chip
                            variant={
                                selectedFilter === 0 ? 'filled' : 'outlined'
                            }
                            onClick={() => setSelectedFilter(0)}
                            label="Tous les Offres"
                        />

                        <Chip
                            variant={
                                selectedFilter === 1 ? 'filled' : 'outlined'
                            }
                            onClick={() => setSelectedFilter(1)}
                            label="Offres à valider"
                        />
                        <Chip
                            variant={
                                selectedFilter === 2 ? 'filled' : 'outlined'
                            }
                            onClick={() => setSelectedFilter(2)}
                            label="Offres à Modéré"
                        />

                        <Chip
                            variant={
                                selectedFilter === 3 ? 'filled' : 'outlined'
                            }
                            onClick={() => setSelectedFilter(3)}
                            label="Offres bloqués"
                        />
                        <Chip
                            variant={
                                selectedFilter === 4 ? 'filled' : 'outlined'
                            }
                            onClick={() => setSelectedFilter(4)}
                            label="Offres validés"
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

export default Offers;
