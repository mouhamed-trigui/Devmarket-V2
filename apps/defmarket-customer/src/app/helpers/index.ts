import { Linking, Platform } from 'react-native';

export const openMap = ({ title, latitude, longitude, address }) => {
    const latLng = `${latitude},${longitude}`;
    const label = title ? title.replace(/&/g, ' ') : '';
    const addressData = {
        street: address?.street ?? '',
        department: address?.department ?? '',
        city: address?.city ?? '',
        country: address?.country ?? '',
        zipCode: address?.zipCode ?? '',
    };
    const scheme = Platform.select({
        ios: `maps:${latLng}?q=`,
        android: `geo:${latLng}?q=`,
    });
    const fullAddress = `${addressData?.street},${addressData?.department},${addressData?.zipCode} ${addressData?.city},${addressData?.country}`;
    const url = Platform.select({
        android: `${scheme}${fullAddress}(${label})`,
        ios: `https://www.google.com/maps/?q=${fullAddress}+(${label})&center=${latLng}`,
    });

    Linking.canOpenURL(url)
        .then((supported) => {
            if (!supported) {
                const browser_url = encodeURI(
                    `${scheme}${fullAddress}(${label})`
                );
                console.log('not supported', browser_url);
                return Linking.openURL(browser_url);
            } else {
                return Linking.openURL(url);
            }
        })
        .catch((err) => console.log("Don't know how to open URI: " + url));
};

export const getFullStoreAddress = (address) => {
    const addressData = {
        department: address?.department ?? '',
        street: address?.street ?? '',
        city: address?.city ?? '',
        country: address?.country ?? '',
        zipCode: address?.zipCode ?? '',
    };
    return (
        addressData?.department +
        ' ' +
        addressData?.street +
        ' ' +
        addressData?.city +
        ' ' +
        addressData?.country +
        ' ' +
        addressData?.zipCode
    );
};
