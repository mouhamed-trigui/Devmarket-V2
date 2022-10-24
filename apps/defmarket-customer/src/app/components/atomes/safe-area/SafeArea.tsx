import React from 'react';
import { useHeaderHeight } from '@react-navigation/elements';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import SafeView from '../safe-view/SafeView';
/* eslint-disable-next-line */
export interface SafeAreaProps {
    children: any;
    bgIndicator?: number;
    noBackground?: boolean;
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        zIndex: 100000000,
    },
    scrollView: { padding: 0, flexGrow: 1 },
});

export function SafeArea(props: SafeAreaProps) {
    const headerHeight = useHeaderHeight();

    return (
        <SafeView noBackground={props.noBackground}>
            <SafeAreaView
                style={[styles.container, { paddingTop: headerHeight }]}
            >
                <ScrollView contentContainerStyle={styles.scrollView}>
                    {props.children}
                </ScrollView>
            </SafeAreaView>
        </SafeView>
    );
}

export default SafeArea;
