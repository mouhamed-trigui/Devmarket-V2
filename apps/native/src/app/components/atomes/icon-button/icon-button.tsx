import React from 'react';
import { View } from 'native-base';
import { Image, ImageSourcePropType, TouchableOpacity } from 'react-native';

/* eslint-disable-next-line */

export interface IconProps {
    active: ImageSourcePropType;
    inactive: ImageSourcePropType;
}
export interface IconButtonProps {
    key?: any;
    icon: ImageSourcePropType | IconProps;
    active?: boolean;
    index: number;
    onPress?: (index: number) => void;
    onlyIcon: boolean;
    completed: boolean;
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

    return (
        <View>
            {props?.onlyIcon ? (
                <TouchableOpacity onPress={handlePress}>
                    <Image source={icon} style={{ width: 16, height: 16 }} />
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
                    <Image
                        source={icon}
                        style={{
                            width: '70%',
                            height: '70%',
                            resizeMode: 'contain',
                        }}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
}

export default IconButton;
