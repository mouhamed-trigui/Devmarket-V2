import React, { useContext } from 'react';
import { ScrollView, ViewStyle, SafeAreaView } from 'react-native';
import { ThemeContext } from '../../../context/ThemeContext';

export interface IPageContainerProps {
    children: any;
    backgroundColor?: string;
    paddingY?: number;
    style?: ViewStyle;
    contentContainerStyle?: ViewStyle;
    showsVerticalScrollIndicator?: boolean;
    closeToBttom?: (isBottom: boolean) => void;
}

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 10;
    return (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
    );
};
const PageContainer = (props: IPageContainerProps) => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <ScrollView
            key="pageContainer"
            style={props.style}
            showsVerticalScrollIndicator={
                props.showsVerticalScrollIndicator ?? true
            }
            contentContainerStyle={{
                backgroundColor:
                    props.backgroundColor ?? theme.colors.info[200],
                paddingVertical: props.paddingY ?? 0,
                ...props.contentContainerStyle,
            }}
            scrollEventThrottle={1000}
            onScroll={({ nativeEvent }) => {
                if (props?.closeToBttom && isCloseToBottom(nativeEvent)) {
                    props?.closeToBttom(true);
                }
            }}
        >
            {props.children}
        </ScrollView>
    );
};

export default PageContainer;
