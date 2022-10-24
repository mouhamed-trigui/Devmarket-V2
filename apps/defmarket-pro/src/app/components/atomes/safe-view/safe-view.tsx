import React, { useContext, useEffect } from 'react';
import { View } from 'native-base';
import { Platform } from 'react-native';
import { LinearGradient, StatusBar } from 'expo-sdk';
import { SvgXml } from 'react-native-svg';
import { useIsFocused } from '@react-navigation/native';
import { StatusBarContext } from '../../molecules/statusbar-style/StatusBarProvider';
// assets
import DegradeSVG from '../../../../assets/splash/degradé.svg'; //0
import DegradeMilitaireSVG from '../../../../assets/splash/degradé-militaire.svg'; //1
import BleuCMilitaireSVG from '../../../../assets/splash/bleu-c-militaire.svg'; //2
import BleuFMilitaireSVG from '../../../../assets/splash/bleu-f-militaire.svg'; //3
/* eslint-disable-next-line */
export interface SafeViewProps {
    children: any;
    bgIndicator?: number;
    noBackground?: boolean;
}

export function SafeView(props: SafeViewProps) {
    const bg = [
        DegradeSVG,
        DegradeMilitaireSVG,
        BleuCMilitaireSVG,
        BleuFMilitaireSVG,
    ];

    const isFocused = useIsFocused();

    const { setStatusBarStyle } = useContext(StatusBarContext);

    useEffect(() => {
        if (props.noBackground) {
            if (setStatusBarStyle && isFocused) setStatusBarStyle('dark');
        } else {
            if (setStatusBarStyle && isFocused) setStatusBarStyle('light');
        }
        return () => {
            if (setStatusBarStyle) setStatusBarStyle('dark');
        };
    }, [isFocused, props.noBackground, setStatusBarStyle]);

    if (props.noBackground) {
        return props?.children;
    }

    return Platform.OS === 'web' ? (
        <LinearGradient
            colors={['#00415E', '#007694', '#00A6C4']}
            style={{ flexGrow: 1 }}
        >
            {props?.children}
        </LinearGradient>
    ) : (
        <View style={{ flexGrow: 1 }}>
            <SvgXml
                xml={bg[props?.bgIndicator ?? 1]}
                style={{
                    position: 'absolute',
                    top: -1,
                    left: -1,
                    right: -1,
                    bottom: -1,
                }}
            />
            {props?.children}
        </View>
    );
}

export default SafeView;
