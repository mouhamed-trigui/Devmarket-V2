import React from 'react';
import { Flex, Image } from 'native-base';
import { ImageSourcePropType } from 'react-native';
import { Text } from '../../../atomes';

export interface IHeaderTitleProps {
    icon?: ImageSourcePropType;
    color?: string;
    title: string;
    rotate?: boolean;
}
const HeaderTitle = (props: IHeaderTitleProps) => {
    return (
        <Flex key="flex" flexDirection="row" alignItems="center">
            {props?.icon && (
                <Image
                    source={props.icon}
                    resizeMode="contain"
                    width={8}
                    height={8}
                    marginRight="3"
                    alt="icon"
                    style={
                        props?.rotate
                            ? { transform: [{ rotate: '90deg' }] }
                            : null
                    }
                />
            )}
            <Text
                key="title"
                color={props.color ? props.color : 'white'}
                fontSize="dm-h2"
                fontFamily="mono"
            >
                {props.title}
            </Text>
        </Flex>
    );
};

export default HeaderTitle;
