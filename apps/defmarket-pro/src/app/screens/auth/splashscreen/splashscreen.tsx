import { platform } from 'process';
import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, Linking, Platform } from 'react-native';
import styled from 'styled-components/native';
// components
import { Atomes } from '../../../components';
import { isUpdated } from '../../../services/methodes/versioning';
export interface SplashscreenProps {
    navigation?: any | undefined;
}

const StyledSplashscreen = styled.View`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
`;

export function Splashscreen(props: SplashscreenProps) {
    useEffect(() => {
        isUpdated()
            .then((versionCheck) => {
                if (versionCheck) {
                    try {
                        props?.navigation?.navigate('Start');
                    } catch (error) {
                        props.navigation.navigate('Login');
                    }
                } else {
                    if (versionCheck === false && Platform.OS !== 'web') {
                        Alert.alert(
                            'Votre version est obsolète',
                            'Veuillez mettre à jour votre application',
                            Platform.OS !== 'ios'
                                ? [
                                      {
                                          text: 'OK',
                                          onPress: () => BackHandler.exitApp(),
                                      },
                                      {
                                          text: 'Mettre à jour',
                                          onPress: () =>
                                              Linking.openURL(
                                                  'market://details?id=com.defmarket.pro'
                                              ),
                                      },
                                  ]
                                : [
                                      {
                                          text: 'Mettre à jour',
                                          onPress: () =>
                                              Linking.openURL(
                                                  'itms-apps://itunes.apple.com/fr/app/id1498790593'
                                              ),
                                      },
                                  ]
                        );
                    }
                }
            })
            .catch((err) => console.error(err));
    }, [props.navigation]);

    return (
        <StyledSplashscreen>
            <Atomes.LogoDefmarket />
        </StyledSplashscreen>
    );
}

export default Splashscreen;
