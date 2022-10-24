import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { FormattedMessage } from 'react-intl';
import { Switch, VStack } from 'native-base';
import { Alert, Image, Platform, TouchableOpacity } from 'react-native';
import image from '../../../../assets/images/illustration/ILLUSTRATION_7_v2-acces_rapide.png';

// Components
import { Atomes } from '../../../components';

import * as LocalAuthentication from 'expo-local-authentication';
import { useNavigation } from '@react-navigation/native';
/* eslint-disable-next-line */
export interface FingerprintProps {
    image: any;
}

const StyledFingerprint = styled.View`
    background-color: white;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledLink = styled.View`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
`;

export function Fingerprint(props: FingerprintProps) {
    const navigation = useNavigation();
    const [isChecked, setisChecked] = useState(false);
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);
    const [isBiometricSaved, setIsBiometricSaved] = useState(false);
    const [biometrics, setBiometrics] = useState('');

    // Check if hardware supports biometrics
    useEffect(() => {
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setIsBiometricSupported(compatible);
        })();
    });

    const handleBiometricAuthScan = async () => {
        setisChecked(!isChecked);
        //scan Fingerprint
        const biometricAuth = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Login with Biometrics',
            disableDeviceFallback: true,
        });
        console.log('Scan Result:', biometricAuth);
        setBiometrics(JSON.stringify(biometricAuth));
    };

    const handleBiometricAuthCheck = async () => {
        //check ForFingerprints
        const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
        setIsBiometricSaved(savedBiometrics);
        if (!savedBiometrics)
            return Alert.alert(
                'Biometric record not found',
                'Please verify your identity with your password',
                [{ text: 'OK', onPress: () => handleBiometricAuthScan() }]
            );
    };

    useEffect(() => {
        if (isBiometricSupported) {
            handleBiometricAuthCheck();
        }
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return () => {};
    }, [isBiometricSupported]);

    const showAndroidAlert = () => {
        Alert.alert(
            'Fingerprint Scan',
            'Place your finger over the touch sensor and press scan.',
            [
                {
                    text: 'Scan',
                    onPress: () => {
                        handleBiometricAuthScan();
                    },
                },
                {
                    text: 'Cancel',
                    onPress: () => setisChecked(!isChecked),
                    style: 'cancel',
                },
            ]
        );
    };

    return (
        <StyledFingerprint>
            <Image
                source={image}
                style={{
                    width: '90%',
                    height: '45%',
                    alignSelf: 'center',
                    marginTop: 50,
                }}
                resizeMode="contain"
            />

            <Atomes.Text
                fontFamily="mono"
                fontSize="dm-h1"
                textAlign="center"
                color="system.50"
            >
                <FormattedMessage
                    id="JXiLyp"
                    defaultMessage="Ton accès rapide"
                />
            </Atomes.Text>
            <Atomes.Text
                fontFamily="body"
                fontSize="dm-2p"
                textAlign="center"
                color="system.50"
                moreParams={{ style: { marginTop: 15 } }}
            >
                <FormattedMessage
                    id="aMluFH"
                    defaultMessage="Pour faciliter ta connexion et sécuriser {br}ton compte chez nous, utilisez ton {br} empreinte ID."
                    values={{
                        br: '\n',
                    }}
                />
            </Atomes.Text>

            <Atomes.Text
                fontFamily="body"
                fontSize="dm-2p"
                textAlign="center"
                color="system.50"
                moreParams={{ style: { marginTop: 60 } }}
            >
                <FormattedMessage
                    id="aMluFK"
                    defaultMessage="J’active mon empreinte ID"
                />
            </Atomes.Text>
            <VStack space={4} alignItems="center">
                <Switch
                    onToggle={() =>
                        Platform.OS === 'android'
                            ? showAndroidAlert()
                            : handleBiometricAuthScan()
                    }
                    defaultIsChecked={isChecked}
                    isChecked={isChecked}
                    size="lg"
                    offTrackColor="orange.100"
                    onTrackColor="orange.200"
                    onThumbColor="orange.500"
                    offThumbColor="orange.50"
                />
            </VStack>
            {/* <StyledBio>
                {`isChecked : ${isChecked} || Compatible Device: ${isBiometricSupported} ||  Fingerprings Saved: ${isBiometricSaved} || Biometrics :${biometrics}`}
            </StyledBio> */}
            <Atomes.Text
                fontFamily="body"
                fontSize="dm-2p"
                textAlign="center"
                color="secondary.100"
            >
                {!isBiometricSupported && isChecked && (
                    <FormattedMessage
                        id="l6aZOe"
                        defaultMessage="Your device is not compatible with Biometrics"
                    />
                )}
            </Atomes.Text>
            <StyledLink>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Atomes.Text
                        style={{ marginBottom: 30 }}
                        fontFamily="workSans"
                        fontSize="dm-2p"
                        textAlign="center"
                        color="system.50"
                    >
                        <FormattedMessage id="CH0dmQ" defaultMessage="PASSER" />
                    </Atomes.Text>
                </TouchableOpacity>
            </StyledLink>
        </StyledFingerprint>
    );
}

export default Fingerprint;
