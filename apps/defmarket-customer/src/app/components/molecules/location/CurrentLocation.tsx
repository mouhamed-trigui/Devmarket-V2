import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ThemeContext } from './../../../context/ThemeContext';
import * as Location from 'expo-location';
import { getLatLongOfCity } from '../../../services/methodes/store';
import { getLocationDetails } from './../../../services/methodes/store/index';
import { Localisation } from '../../../theme/svgs';
import { useDispatch, useSelector } from 'react-redux';
import Text from '../../atomes/text/Text';
import { userActions } from './../../../stores/slices/user/user';
import { RootState } from '../../../stores/store';

export default function LocationFilter() {
    const dispatch = useDispatch();
    const { currentLocation, distance, user } = useSelector(
        (state: RootState) => state.user
    );
    const totalStoresByCity = useSelector(
        (state: RootState) => state.store.totalStoresByCity
    );
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        getLocation();
    }, []);

    const getLocation = async () => {
        let haveLocationPermission = await checkLocationPermission();

        if (haveLocationPermission) {
            let currentPosition = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Highest,
            });
            locationDetails(
                currentPosition?.coords?.latitude,
                currentPosition?.coords?.longitude
            );
        } else {
            getLatLongOfCity(user?.residenceCity).then((res) =>
                getCityDetails(res)
            );
        }
    };

    const checkLocationPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return false;
        }
        return true;
    };

    const locationDetails = (latitude, longitude) => {
        if (longitude && longitude) {
            getLocationDetails(latitude, longitude).then((res) => {
                getCityDetails(res);
            });
        }
    };

    const getCityDetails = (data) => {
        if (data?.results?.length > 0) {
            let address = data?.results[0];
            dispatch(userActions.setCurrentLocation(address));
        }
    };
    return (
        <TouchableOpacity
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
            }}
            onPress={() => {}}
        >
            <Localisation
                fill={theme.colors.info[200]}
                height={22}
                width={22}
            />
            <Text color={theme.colors.info[200]} hPadding={15}>
                {currentLocation?.city ??
                    currentLocation?.formatted ??
                    ' Chargement ...'}
                {currentLocation?.city && totalStoresByCity !== null
                    ? ` (${totalStoresByCity}) `
                    : ''}
                {currentLocation?.city && distance
                    ? ` - ${(distance / 1000).toFixed()} km`
                    : ''}
            </Text>
        </TouchableOpacity>
    );
}
