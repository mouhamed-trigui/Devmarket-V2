import { useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'native-base';
import React, { useContext } from 'react';
import { ViewStyle } from 'react-native';
import { StatusBarContext } from '../../molecules/statusbar-style/StatusBarProvider';

export interface IPageContainerProps {
    children: any;
    backgroundColor?: string;
    style?: ViewStyle;
    paddingY?: number;
    contentContainerStyle?: ViewStyle;
}

const PageContainer = (props: IPageContainerProps) => {
    const isFocused = useIsFocused();
    const { setStatusBarStyle } = useContext(StatusBarContext);
    React.useEffect(() => {
        if (setStatusBarStyle && isFocused) setStatusBarStyle('dark');
    }, [isFocused, setStatusBarStyle]);

    return (
        <ScrollView
            key="pageContainer"
            style={props.style}
            flexGrow={1}
            paddingY={props.paddingY ?? 5}
            contentContainerStyle={
                props.contentContainerStyle ?? {
                    flexGrow: 1,
                }
            }
            backgroundColor={props.backgroundColor ?? 'white'}
        >
            {props.children}
        </ScrollView>
    );
};

export default PageContainer;
