import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { FiltresWhite, Localisation } from '../../../../theme/svgs';
import { ThemeContext } from '../../../../context/ThemeContext';
import CurrentLocation from '../../../molecules/location/CurrentLocation';

export interface LocationFilterProps {
    getGeolocation?: (geolocation: {
        latitude: number;
        longitude: number;
    }) => void;
}
export default function LocationFilter(props: LocationFilterProps) {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <View
            style={{
                backgroundColor: theme.colors.primary[50],
                height: 50,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: '6%',
            }}
        >
            <CurrentLocation />

            <FiltresWhite
                fill={theme.colors.info[200]}
                height={20}
                width={20}
                style={{ marginLeft: 'auto' }}
                onPress={() => {}}
            />
        </View>
    );
}
