import React, { useState, useEffect } from 'react';

import { Box, IconButton, InputBase, Stack, Typography } from '@mui/material';

import Input from '../../atoms/form/input/Input';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { colors } from '../../../theme/colors';
import SearchIcon from '@mui/icons-material/Search';
import AddLocationIcon from '@mui/icons-material/AddLocation';

import axios from 'axios';
import { AlertContext } from '../../../context/alert/AlertProvider';
import { geoapifyKey } from '../../../services/constants/api';

/* eslint-disable-next-line */
export interface AddressAutocompleteProps {
    placeholder: string;
    searchType: 'locality' | 'city';
    defaultValue?: string;
    variant: 'outlined' | 'filled';
    onClick: (item: any) => void;
}

export function AddressAutocomplete(props: AddressAutocompleteProps) {
    const { showAlert } = React.useContext(AlertContext);

    // Methode of search
    const [search, setSearch] = React.useState(props?.defaultValue ?? '');

    useEffect(() => {
        setSearch(props?.defaultValue ?? '');
    }, [props?.defaultValue]);

    const [showList, setShowList] = React.useState(false);

    const [addressOptions, setAddressOptions] = useState<any[]>([]);

    const fetchAddress = async (address: string) => {
        axios
            .get(
                `https://api.geoapify.com/v1/geocode/autocomplete?lang=fr${
                    props?.searchType ? '&type=' + props?.searchType : ''
                }&text=${address}&filter=countrycode:fr&apiKey=${geoapifyKey}`
            )
            .then((res) => {
                const { features } = res.data;
                const addresses = features.map((feature: any) => ({
                    label: feature.properties.formatted,
                    street: feature?.properties?.housenumber
                        ? feature?.properties?.housenumber +
                          ' ' +
                          feature?.properties?.street
                        : feature?.properties?.street,
                    country: feature.properties.country,
                    city: feature.properties.city,
                    department: feature.properties.county,
                    postalCode: feature.properties.postcode,
                    coordinates: {
                        lon: feature.properties.lon,
                        lat: feature.properties.lat,
                    },
                }));
                setAddressOptions(addresses);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        if (search !== '') {
            const timer = setTimeout(() => {
                fetchAddress(search);
            }, 500);
            return () => {
                clearTimeout(timer);
            };
        }
        return;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    return (
        <div style={{ position: 'relative' }}>
            {props?.variant === 'outlined' && (
                <InputBase
                    placeholder={props.placeholder}
                    required
                    value={search}
                    sx={{
                        border: 2,
                        borderRadius: 5,
                        // width: 400,
                        borderColor: colors.secondary,
                    }}
                    startAdornment={
                        <SearchIcon
                            style={{ marginLeft: 10 }}
                            color="primary"
                        />
                    }
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                    onClick={() => setShowList(true)}
                />
            )}
            {props?.variant === 'filled' && (
                <Input
                    required
                    label={props.placeholder}
                    fullWidth
                    value={search}
                    onChange={(value) => {
                        setSearch(value);
                    }}
                    onClick={() => setShowList(true)}
                />
            )}

            {addressOptions?.length > 0 && showList && (
                <Box
                    bgcolor="white"
                    position="absolute"
                    marginTop={0}
                    zIndex={4000}
                    right={0}
                    left={0}
                    borderColor={colors.primary}
                    borderLeft={1}
                    borderBottom={1}
                    borderRight={1}
                    borderRadius="0 0 5px 5px"
                >
                    <List dense={true}>
                        {addressOptions.map((item, index) => (
                            <ListItem
                                key={index + 1}
                                onClick={() => {
                                    props?.onClick(item);
                                    setShowList(false);
                                    setSearch(item?.label);
                                }}
                                secondaryAction={
                                    <IconButton
                                        edge="start"
                                        aria-label="delete"
                                    ></IconButton>
                                }
                                style={{ cursor: 'pointer' }}
                            >
                                <ListItemText
                                    primary={
                                        <Stack flexDirection={'row'}>
                                            <AddLocationIcon />
                                            <Typography
                                                fontWeight="bold"
                                                variant="body2"
                                                marginLeft={2}
                                            >
                                                {item.label}
                                            </Typography>
                                        </Stack>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}
        </div>
    );
}

export default AddressAutocomplete;
