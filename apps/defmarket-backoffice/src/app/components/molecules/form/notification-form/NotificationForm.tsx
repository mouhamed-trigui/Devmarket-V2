import React, { useState, useEffect } from 'react';
import { Button, Grid, IconButton, Stack, Typography } from '@mui/material';
import Input from '../../../atoms/form/input/Input';
import RadioGroup from '../../../atoms/form/radio/RadioGroup';
import Select from '../../../atoms/form/select/Select';
import Layout from '../../../atoms/layout/Layout';
import InputMUI from '../../../atoms/form/input/Input';

import { INotification } from '../../../../services/model/accounts';
import { IonIcon } from '@ionic/react';
import NotificationsIcon from '../../../../../assets/svg/bouton-notifications-bleu-f.svg';
import axios from 'axios';

import CloseIcon from '@mui/icons-material/Close';

import { AlertContext } from '../../../../context/alert/AlertProvider';
import AddressAutocomplete from '../../address-autocomplete/address-autocomplete';
import { getDepartmentNumber } from '../../../../utils/address/codeDepatement';

interface INotificationFormrops {
    notification?: INotification;
    setNotification: React.Dispatch<
        React.SetStateAction<INotification | undefined>
    >;
    withSearch?: boolean;
    gap?: number;
}

const NotificationForm = (props: INotificationFormrops) => {
    // Methode of search
    const [searchType, setSearchType] = React.useState<'locality' | 'city'>(
        'city'
    );

    const [gender, setGender] = React.useState('');

    const { showAlert } = React.useContext(AlertContext);

    return (
        <Stack width="100%">
            <Stack
                display={'flex'}
                flexDirection="row"
                width={'100%'}
                justifyContent={'space-between'}
                paddingBottom={2}
            >
                <Stack
                    display={'flex'}
                    flexDirection="row"
                    width={'500px'}
                    justifyContent={'space-arround'}
                    style={{ marginTop: 10 }}
                >
                    <IconButton
                        size="medium"
                        aria-label="notification icon"
                        color="inherit"
                        style={{ marginTop: -10 }}
                    >
                        <IonIcon
                            slot="start"
                            ios={NotificationsIcon}
                            md={NotificationsIcon}
                        />
                    </IconButton>
                    <Typography fontWeight="bold" variant="h2">
                        Ajouter une notification{' '}
                    </Typography>
                </Stack>
                <Select
                    fullWidth
                    required
                    value={props.notification?.notificationType ?? ''}
                    label="Type de notification"
                    defaultValue="PUSH"
                    options={[
                        {
                            value: 'PUSH',
                            label: 'Notification push',
                        },
                        {
                            value: 'INTERNAL',
                            label: 'Notification interne',
                        },
                    ]}
                    onChange={(value) => {
                        props.setNotification((notification) =>
                            notification
                                ? {
                                      ...notification,
                                      notificationType: value,
                                  }
                                : ({
                                      notificationType: value,
                                  } as INotification)
                        );
                    }}
                />
            </Stack>
            <Stack direction="row" spacing={2} width="100%">
                <Layout width="100%" padding={3}>
                    <Stack
                        direction="column"
                        flexGrow={1}
                        marginRight={5}
                        gap={props.withSearch ? 3 : 2}
                    >
                        <Stack>
                            <Typography fontWeight="bold" variant="body2">
                                Audience
                            </Typography>

                            <RadioGroup
                                disabled
                                id="gender"
                                required
                                value={gender}
                                directionRow
                                radioList={[
                                    { value: 'MALE', label: 'Hommes' },
                                    { value: 'FEMALE', label: 'Femmes' },
                                    { value: 'ALL', label: 'Tous' },
                                ]}
                                onChange={(value: any) => {
                                    setGender(value);
                                }}
                            />
                        </Stack>
                        <Typography fontWeight="bold" variant="body2">
                            Catégorie{' '}
                        </Typography>

                        <Stack
                            direction="row"
                            flexGrow={1}
                            gap={props?.gap ?? 8}
                            justifyContent="space-between"
                        >
                            <Stack
                                gap={2}
                                flexGrow={1}
                                marginTop={props.withSearch ? 1 : 0}
                            >
                                <Select
                                    value={props.notification?.storeType ?? ''}
                                    label="Type de commerce"
                                    options={[
                                        {
                                            value: 'PHYSICAL',
                                            label: 'Structure Physique',
                                        },
                                        {
                                            value: 'E_COMMERCE',
                                            label: 'Structure E-Commerce',
                                        },
                                        {
                                            value: 'PHYSICAL_AND_E_COMMERCE',
                                            label:
                                                'Structure Physique et e-Commerce',
                                        },
                                    ]}
                                    onChange={(value) => {
                                        props.setNotification((notification) =>
                                            notification
                                                ? {
                                                      ...notification,
                                                      storeType: value,
                                                  }
                                                : ({
                                                      storeType: value,
                                                  } as INotification)
                                        );
                                    }}
                                />

                                <Select
                                    value={
                                        props.notification?.storeCategoryId ??
                                        undefined
                                    }
                                    label="Type de structure"
                                    options={[
                                        {
                                            value: 1,
                                            label: 'Alimentaire & Ménager',
                                        },
                                        {
                                            value: 2,
                                            label: 'Loisirs & Culture',
                                        },
                                        {
                                            value: 3,
                                            label: 'Séjours & Vacances',
                                        },
                                        {
                                            value: 4,
                                            label: 'Mode & Accessoires',
                                        },
                                        {
                                            value: 5,
                                            label: 'Maison & Jardin',
                                        },
                                        {
                                            value: 6,
                                            label: 'Beauté & Bien-être',
                                        },
                                        {
                                            value: 7,
                                            label: 'Services & Professionnels',
                                        },
                                    ]}
                                    onChange={(value) => {
                                        props.setNotification((notification) =>
                                            notification
                                                ? {
                                                      ...notification,
                                                      storeCategoryId: value,
                                                  }
                                                : ({
                                                      storeCategoryId: value,
                                                  } as INotification)
                                        );
                                    }}
                                />

                                <Typography fontWeight="bold" variant="body2">
                                    Lieux{' '}
                                </Typography>

                                <Stack
                                    direction="column"
                                    flexGrow={1}
                                    justifyContent="space-between"
                                >
                                    <RadioGroup
                                        id="search"
                                        required
                                        directionRow
                                        defaultValue="city"
                                        value={searchType}
                                        radioList={[
                                            {
                                                value: 'city',
                                                label: 'Par Ville',
                                            },
                                            {
                                                value: 'locality',
                                                label: 'Par département',
                                            },
                                        ]}
                                        onChange={setSearchType}
                                    />

                                    <AddressAutocomplete
                                        variant="outlined"
                                        searchType={searchType}
                                        onClick={(item: any) => {
                                            const ads: any[] =
                                                props?.notification?.address ??
                                                [];

                                            if (
                                                (item?.department &&
                                                    searchType === 'city') ||
                                                (item?.postalCode &&
                                                    searchType === 'locality')
                                            ) {
                                                ads.push(
                                                    searchType === 'locality' &&
                                                        item?.postalCode
                                                        ? {
                                                              ...item,
                                                              department: getDepartmentNumber(
                                                                  item?.postalCode
                                                              ),
                                                              zipCode: null,
                                                              street: null,
                                                              city: null,
                                                              searchType: searchType,
                                                          }
                                                        : {
                                                              ...item,
                                                              department: null,
                                                              zipCode: null,
                                                              street: null,
                                                              city: item?.city,
                                                              searchType: searchType,
                                                          }
                                                );

                                                props.setNotification(
                                                    (notification) =>
                                                        notification
                                                            ? {
                                                                  ...notification,
                                                                  address: ads,
                                                              }
                                                            : ({
                                                                  address: ads,
                                                              } as INotification)
                                                );
                                            } else {
                                                showAlert(
                                                    'Veuillez tapez un code postal français valide.',
                                                    'error'
                                                );
                                            }
                                        }}
                                        placeholder={
                                            'Tapez le code postal du département"'
                                        }
                                    />

                                    <Grid
                                        container
                                        rowSpacing={0.5}
                                        columnSpacing={0.5}
                                        marginTop={2}
                                    >
                                        {props?.notification?.address &&
                                            props?.notification?.address
                                                ?.length > 0 &&
                                            props?.notification?.address?.map(
                                                (item, index) => (
                                                    <Grid item xs={6}>
                                                        <Button
                                                            onClick={() =>
                                                                props.setNotification(
                                                                    (
                                                                        notification
                                                                    ) =>
                                                                        notification
                                                                            ? {
                                                                                  ...notification,
                                                                                  address: notification?.address?.filter(
                                                                                      (
                                                                                          add
                                                                                      ) =>
                                                                                          add?.label !==
                                                                                          item.label
                                                                                  ),
                                                                              }
                                                                            : ({
                                                                                  address: undefined,
                                                                              } as INotification)
                                                                )
                                                            }
                                                            key={index + 1}
                                                            endIcon={
                                                                <CloseIcon />
                                                            }
                                                            variant="contained"
                                                            fullWidth
                                                            style={{
                                                                borderRadius: 28,
                                                                backgroundColor:
                                                                    '#00AAC7',
                                                                maxWidth: 200,
                                                                paddingLeft: 0,
                                                                paddingRight: 0,
                                                            }}
                                                        >
                                                            {item?.searchType ===
                                                            'city'
                                                                ? item?.city
                                                                      ?.length >
                                                                  10
                                                                    ? item?.city?.substring(
                                                                          0,
                                                                          10
                                                                      ) + '...'
                                                                    : item?.city
                                                                : `Département ${item?.department}`}
                                                        </Button>
                                                    </Grid>
                                                )
                                            )}
                                    </Grid>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </Layout>
                <Layout width="100%" padding={3}>
                    <Stack
                        direction="column"
                        flexGrow={1}
                        gap={props.withSearch ? 3 : 2}
                    >
                        <Typography fontWeight="bold" variant="body2">
                            Notification{' '}
                        </Typography>

                        <Stack
                            direction="row"
                            flexGrow={1}
                            gap={props?.gap ?? 8}
                            justifyContent="space-between"
                        >
                            <Stack
                                gap={2}
                                flexGrow={1}
                                marginTop={props.withSearch ? 1 : 0}
                            >
                                <Input
                                    required
                                    label="Titre"
                                    value={props.notification?.title ?? ''}
                                    onChange={(value) => {
                                        props.setNotification((notification) =>
                                            notification
                                                ? {
                                                      ...notification,
                                                      title: value,
                                                  }
                                                : ({
                                                      title: value,
                                                  } as INotification)
                                        );
                                    }}
                                />
                                <InputMUI
                                    required
                                    multiline
                                    label="Message"
                                    rows={6}
                                    value={props.notification?.message ?? ''}
                                    onChange={(value: string) => {
                                        props.setNotification((notification) =>
                                            notification
                                                ? {
                                                      ...notification,
                                                      message: value,
                                                  }
                                                : ({
                                                      message: value,
                                                  } as INotification)
                                        );
                                    }}
                                />
                            </Stack>
                        </Stack>
                    </Stack>
                </Layout>
            </Stack>
        </Stack>
    );
};

export default NotificationForm;
