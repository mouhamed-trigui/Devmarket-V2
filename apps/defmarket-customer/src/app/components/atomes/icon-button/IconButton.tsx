import React, { ReactElement } from 'react';
import {
    View,
    Image,
    ImageSourcePropType,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';
import { blueShadow } from '../../../theme/style';

/* eslint-disable-next-line */

export interface IconProps {
    active: ImageSourcePropType;
    inactive: ImageSourcePropType;
}
export interface IconButtonProps {
    key?: any;
    icon: ImageSourcePropType | IconProps | ReactElement | any;
    active?: boolean;
    index: number;
    onlyIcon: boolean;
    completed: boolean;
    width?: number;
    height?: number;
    bgColor?: string;
    rounded?: boolean;
    shadow?: boolean;
    onPress?: (index: number) => void;
    style?: ViewStyle;
}

export function IconButton(props: IconButtonProps) {
    const handlePress = () => {
        if (props.onPress) props.onPress(props.index);
    };

    const icon = React.useMemo(() => {
        if (props.icon?.active && props.icon?.inactive) {
            return props.active ? props.icon?.active : props.icon?.inactive;
        } else {
            return props.icon;
        }
    }, [props.active, props.icon]);
    const shadow = props.shadow ? { ...blueShadow } : {};
    return (
        <View>
            {props?.onlyIcon ? (
                <TouchableOpacity onPress={handlePress}>
                    <View
                        style={{
                            backgroundColor: props?.bgColor ?? 'none',
                            width: props?.width ?? 'auto',
                            height: props?.width ?? 'auto',
                            borderRadius: props?.rounded ? 50 : 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            ...shadow,
                            ...props.style,
                        }}
                    >
                        {icon}
                    </View>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    style={{
                        backgroundColor: props.completed ? '#c5bfbf' : 'white',
                        padding: 2.5,
                        borderRadius: 5,
                        width: 50,
                        height: 50,
                        alignContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={handlePress}
                >
                    <View
                        style={{
                            backgroundColor: props?.bgColor ?? 'none',
                            width: props?.width ?? 'auto',
                            height: props?.width ?? 'auto',
                            borderRadius: props?.rounded ? 50 : 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {icon}
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
}

export default IconButton;
