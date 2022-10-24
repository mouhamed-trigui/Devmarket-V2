import { Box, Icon, Pressable, ScrollView, useTypeahead } from 'native-base';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Dimensions, Image, Platform, TouchableOpacity } from 'react-native';
import { FormControl } from '..';
import { primary, system } from '../../../theme/colors';
import { Text } from '../../atomes';
import axios from 'axios';

// assets
import markerIcon from '../../../../assets/images/png/place.png';
import { Ionicons } from '@expo/vector-icons';

interface IAddressProps {
    label: string;
    street?: string;
    country: string;
    city: string;
    postalCode: string;
    department: string;
    coordinates: { lon: number; lat: number };
}

interface IAddressAutocompleteProps {
    onChange?: {
        onStreetChange?: (street: string) => void;
        onCityChange?: (city: string) => void;
        onCountryChange?: (country: string) => void;
        onPostalCodeChange?: (postalCode: string) => void;
        onDepartmentChange?: (department: string) => void;
        onCoordinatesChange?: (coordinates: {
            lon: number;
            lat: number;
        }) => void;
    };
    values?: {
        street?: string;
        city?: string;
        department?: string;
        postalCode?: string;
        country?: string;
    };
    visibleFields?: {
        street?: boolean;
        city?: boolean;
        department?: boolean;
        postalCode?: boolean;
        country?: boolean;
    };
    inputColor?: string;
    placeholder?: string;
    type?:
        | 'country'
        | 'state'
        | 'city'
        | 'postcode'
        | 'street'
        | 'amenity'
        | 'locality';
    isRequired?: boolean;
    defaultValue?: string;
}

const AddressAutocomplete = (props: IAddressAutocompleteProps) => {
    const { formatMessage } = useIntl();
    const [addressOptions, setAddressOptions] = useState<IAddressProps[]>([]);
    const [searchedAddress, setSearchedAddress] = useState(
        props?.defaultValue ?? ''
    );

    const fetchAddress = async (address: string) => {
        axios
            .get(
                `https://api.geoapify.com/v1/geocode/autocomplete?lang=fr${
                    props.type ? '&type=' + props.type : ''
                }&text=${address}&apiKey=3af11a07c6ca4b9ba7e9c1d9aa707bfc`
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
        if (searchedAddress !== '') {
            const timer = setTimeout(() => {
                fetchAddress(searchedAddress);
            }, 500);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [searchedAddress]);

    const {
        isOpen,
        getInputProps,
        getMenuItemProps,
        getMenuProps,
        getToggleButtonProps,
    } = useTypeahead({
        items: addressOptions,
        itemToString: (item) => item.label,
        onInputValueChange: ({ inputValue }) => setSearchedAddress(inputValue),
    });

    const handleMenuItemPress = (item: IAddressProps, index: number) => {
        setSearchedAddress(item.label);
        if (props.onChange?.onCoordinatesChange)
            props.onChange?.onCoordinatesChange(item.coordinates);
        if (props.onChange?.onStreetChange)
            props.onChange?.onStreetChange(item.street ?? '');
        if (props.onChange?.onCityChange)
            props.onChange?.onCityChange(item.city);
        if (props.onChange?.onCountryChange)
            props.onChange?.onCountryChange(item.country);
        if (props.onChange?.onPostalCodeChange)
            props.onChange?.onPostalCodeChange(item.postalCode);
        if (props.onChange?.onDepartmentChange)
            props.onChange?.onDepartmentChange(item.department);

        getMenuItemProps(item, index).onPress();
        setAddressOptions([]);
    };

    return (
        <>
            <Box
                key="AdressAutoComplete"
                zIndex={
                    Platform.OS === 'ios' || Platform.OS === 'web'
                        ? 999
                        : undefined
                }
            >
                <FormControl
                    isRequired={props.isRequired}
                    borderColor={props?.inputColor}
                    type="input"
                    placeholder={
                        props?.placeholder ??
                        formatMessage({
                            id: 'AddAC1',
                            defaultMessage: 'Saisis ton adresse...',
                        })
                    }
                    placeholderTextColor={props?.inputColor}
                    helperText={null}
                    value={searchedAddress}
                    onChange={getInputProps().onChangeText}
                    InputRightElement={
                        addressOptions &&
                        addressOptions.length > 0 && (
                            <Icon
                                as={
                                    <Ionicons
                                        name={
                                            isOpen
                                                ? 'chevron-up'
                                                : 'chevron-down'
                                        }
                                    />
                                }
                                size="sm"
                                color={primary[50]}
                                onPress={getToggleButtonProps().onPress}
                            />
                        )
                    }
                />
                {isOpen && (
                    <Box
                        zIndex={999}
                        position="absolute"
                        top={53}
                        width={Dimensions.get('window').width - 50}
                        alignSelf="center"
                        height="250"
                        {...getMenuProps()}
                    >
                        <ScrollView>
                            {addressOptions.map((item, index) => (
                                <Pressable
                                    key={`${item.label}${index}`}
                                    onPress={() =>
                                        handleMenuItemPress(item, index)
                                    }
                                    flexDirection={'row'}
                                    alignItems={'center'}
                                    {...getMenuItemProps(item, index)
                                        .accessible}
                                    {...getMenuItemProps(item, index)
                                        .accessiblityRole}
                                    style={{
                                        backgroundColor: system[100],
                                        paddingVertical: 10,
                                        paddingLeft: 10,
                                        borderColor: system[300],
                                        borderBottomWidth:
                                            addressOptions.length - 1 === index
                                                ? 0
                                                : 1,
                                    }}
                                >
                                    <TouchableOpacity
                                        key={'touch-' + index}
                                        onPress={() =>
                                            handleMenuItemPress(item, index)
                                        }
                                        style={{
                                            flexDirection: 'row',
                                        }}
                                    >
                                        <Image
                                            accessibilityLabel="markerIcon"
                                            source={markerIcon}
                                            style={{
                                                width: 20,
                                                height: 20,
                                                marginRight: 10,
                                            }}
                                            resizeMode="contain"
                                        />
                                        <Text color={system[50]}>
                                            {item.label}
                                        </Text>
                                    </TouchableOpacity>
                                </Pressable>
                            ))}
                        </ScrollView>
                    </Box>
                )}
            </Box>
            {props.visibleFields?.street && (
                <FormControl
                    borderColor={props?.inputColor}
                    type="input"
                    placeholder={formatMessage({
                        id: 'AddStr',
                        defaultMessage: 'Rue',
                    })}
                    //disabled
                    placeholderTextColor={props?.inputColor}
                    helperText={null}
                    value={props?.values?.street ?? ''}
                    onChange={props.onChange?.onStreetChange}
                />
            )}
            {props.visibleFields?.city && (
                <FormControl
                    borderColor={props?.inputColor}
                    type="input"
                    placeholder={formatMessage({
                        id: 'AddCty',
                        defaultMessage: 'Ville',
                    })}
                    disabled
                    placeholderTextColor={props?.inputColor}
                    helperText={null}
                    value={props?.values?.city}
                />
            )}
            {props.visibleFields?.postalCode && (
                <FormControl
                    keyboardType="numeric"
                    borderColor={props?.inputColor}
                    type="input"
                    disabled
                    placeholder={formatMessage({
                        id: 'IMT06s',
                        defaultMessage: 'Code Postal',
                    })}
                    placeholderTextColor={props?.inputColor}
                    helperText={null}
                    value={props?.values?.postalCode}
                />
            )}
            {props.visibleFields?.department && (
                <FormControl
                    borderColor={props?.inputColor}
                    type="input"
                    disabled
                    placeholder={formatMessage({
                        id: 'AddDep',
                        description: 'Département',
                        defaultMessage: 'Département',
                    })}
                    placeholderTextColor={props?.inputColor}
                    helperText={null}
                    value={props?.values?.department}
                />
            )}
        </>
    );
};

export default AddressAutocomplete;
