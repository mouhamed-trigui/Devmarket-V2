import './notification.module.scss';
import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { DataGrid, frFR, GridColDef, GridToolbar } from '@mui/x-data-grid';

import {
    Box as muiBox,
    Button,
    styled,
    Tooltip,
    Typography,
    Chip,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import { getAllNotification } from '../../../services/methodes';
import DialogForm from '../../../components/organisms/dialog-form/DialogForm';

import { useIntl } from 'react-intl';
import { notficationsType } from '../../../extensions/i18n/defined-message';
import { INotification } from '../../../services/model/accounts';

/* eslint-disable-next-line */
export interface NotificationProps {}

const Box = styled(muiBox)`
    display: flex;
    padding: 5px;
`;

export function Notification(props: NotificationProps) {
    const [data, setData] = useState<INotification[]>([]);
    const [pageSize, setPageSize] = useState<number>(-1);
    const [page, setPage] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [loading, setLoading] = useState(false);

    const [dialogOpened, setDialogOpened] = useState(false);

    const { formatMessage } = useIntl();

    const columns: GridColDef[] = [
        {
            field: 'createdDate',
            headerName: 'Date',
            renderCell: (datum) => {
                return (
                    <Typography
                        noWrap
                        width="100%"
                        overflow="hidden"
                        key={datum?.value}
                        variant="body2"
                    >
                        {new Date(datum?.value)?.toLocaleDateString('fr')}
                    </Typography>
                );
            },
        },
        {
            field: 'notificationType',
            headerName: 'Type',
            renderCell: (datum) => {
                const result =
                    notficationsType[
                        datum?.value as keyof typeof notficationsType
                    ];
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
            field: 'title',
            headerName: 'titre',

            width: 180,
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

        // {
        //     field: 'message',
        //     headerName: 'Message',
        //     minWidth: 200,
        // },

        {
            field: 'status',
            headerName: 'Suivi',
            width: 150,
            renderCell: (datum) => {
                if (datum?.value === 'SUCCESS') {
                    return (
                        <Chip
                            variant={'filled'}
                            label="Terminé"
                            style={{ backgroundColor: '#7FD4E3', width: 80 }}
                        />
                    );
                } else if (datum?.value === 'IN_PROGRESS') {
                    return (
                        <Chip
                            variant={'filled'}
                            label="En cour"
                            style={{ backgroundColor: '#EAAE00', width: 80 }}
                        />
                    );
                } else
                    return (
                        <Chip
                            variant={'filled'}
                            label="Erreur"
                            style={{ backgroundColor: '#F0BFB5', width: 80 }}
                        />
                    );
            },
        },
        {
            field: 'gender',
            headerName: 'Genre',
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
                            {datum?.value ?? 'Tous les genres'}
                        </Typography>
                    </Tooltip>
                );
            },
        },
        {
            field: 'storeCategoryName',
            headerName: 'Catégories',
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
                            {datum?.value ?? 'Toutes les categories'}
                        </Typography>
                    </Tooltip>
                );
            },
            minWidth: 180,
        },
        {
            field: 'addressList',
            headerName: 'Couverture',
            width: 300,
            renderCell: (datum) => {
                return (
                    <Typography
                        noWrap
                        width="100%"
                        overflow="hidden"
                        key={datum?.value}
                        variant="body2"
                    >
                        {datum?.value?.map((item: any, index: number) =>
                            item?.department
                                ? `${index > 0 ? ', ' : ''} ` +
                                  `Département ${item?.department}`
                                : `${index > 0 ? ', ' : ''} ` + item?.city
                        )}
                    </Typography>
                );
            },
            minWidth: 150,
        },
        {
            field: 'totalTradersNumber',
            headerName: "Nombre d'utilisateur impacté",
            minWidth: 200,
        },
    ];

    const getNotification = async (page: number, size: number) => {
        setLoading(true);
        await getAllNotification(page, size)
            .then((data) => {
                setData(data.content);
                setTotalElements(data.totalElements);
            })
            .finally(() => setLoading(false));
    };

    React.useEffect(() => {
        getNotification(page, pageSize);
    }, [page, pageSize]);

    return (
        <IonPage>
            <IonContent fullscreen>
                <DialogForm
                    open={dialogOpened}
                    defaultStep={-1}
                    onClose={() => {
                        getNotification(page, pageSize);
                        setDialogOpened(false);
                    }}
                    setOpen={setDialogOpened}
                    source="store"
                    dialogTitle=""
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
                        Gestion des notifications push{' '}
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
                            startIcon={<AddIcon />}
                            variant="contained"
                            color="warning"
                            onClick={() => {
                                setDialogOpened(true);
                            }}
                        >
                            Ajouter une notification
                        </Button>
                    </div>
                </Box>

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

export default Notification;
