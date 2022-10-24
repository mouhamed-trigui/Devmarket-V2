import React, { ReactElement } from 'react';
import { Dimensions, View } from 'react-native';
import { fonts, fontSizes } from '../../../../theme/fonts';
import { Text } from '../../../atomes/text/Text';

export interface HeaderTitleProps {
    rotate?: boolean;
    title?: string;
    color?: string;
    icon?: string | ReactElement | any;
    fullWidth?: Boolean;
}
export default function HeaderTitle(props: HeaderTitleProps) {
    const screenWidth = Dimensions.get('window').width;
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                height: '100%',
                width: screenWidth - (props.fullWidth ? 85 : 135),
            }}
        >
            {props?.icon && props.icon}

            <Text
                key="title"
                color={props.color ? props.color : 'white'}
                fontSize={fontSizes['dm-h2']}
                fontFamily={fonts.mono}
                numberOfLines={1}
                width={'95%'}
                moreParams={{
                    paddingLeft: '3%',
                }}
            >
                {props.title}
            </Text>
        </View>
    );
}
