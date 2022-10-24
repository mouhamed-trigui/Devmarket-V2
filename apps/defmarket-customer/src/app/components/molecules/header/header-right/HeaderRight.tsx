import React, { ReactElement } from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';
import HeaderMenu from '../../../atomes/menu/HeaderMenu';

export interface HeaderRightProps {
    icon: string | ReactElement | any;
    icon2?: string | ReactElement | any;
    style?: ViewStyle;
    onPress?: () => void;
    items?: [
        {
            title: string;
            onPressItem: () => void;
        }
    ];
}
export default function HeaderRigh(props: HeaderRightProps) {
    const [visible, setVisible] = React.useState(false);

    return (
        <View
            style={{
                paddingRight: 5,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: props.icon2 ? 'space-between' : 'flex-end',
                width: 50,
                ...props.style,
            }}
        >
            <TouchableOpacity
                onPress={() => {
                    props?.onPress();
                }}
            >
                {props.icon}
            </TouchableOpacity>
            <HeaderMenu
                visible={visible}
                setVisible={setVisible}
                anchor={
                    <TouchableOpacity
                        onPress={() => {
                            setVisible(true);
                        }}
                    >
                        {props.icon2}
                    </TouchableOpacity>
                }
                items={props.items}
            />
        </View>
    );
}
