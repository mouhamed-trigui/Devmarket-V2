import React, { useContext, useEffect } from 'react';
import { View } from 'native-base';
import { Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
         <DegradeSVG/>,
        <DegradeMilitaireSVG/>,
        <BleuCMilitaireSVG/>,
        <BleuFMilitaireSVG/>,
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

    return Platform.OS === 'web' || Platform.isPad ? (
        <LinearGradient
            colors={['#00415E', '#007694', '#00A6C4']}
            style={{ flexGrow: 1 }}
        >
            {props?.children}
        </LinearGradient>
    ) : (
            <View style={{ flexGrow: 1, flex: 1 }}>
                <View 
                    style={{
                        position: 'absolute',
                        top: -1,
                        left: -1,
                        right: -1,
                        bottom: -1,
                    }}
                >
                    {bg[props?.bgIndicator ?? 1]}
                </View>
                {props?.children}
            </View>
    );
}

export default SafeView;
