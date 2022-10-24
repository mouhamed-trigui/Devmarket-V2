import { Box, HStack } from 'native-base';
import React from 'react';
import { Image, ImageSourcePropType, Platform } from 'react-native';
import { system } from '../../../theme/colors';
import { Text } from '../../atomes';
import chevronBleu from '../../../../assets/images/png/chevron-bleu-f.png';

const Title = (props: {
    icon: any;
    isSvg?: boolean;
    title: string;
    chevron?: boolean;
}) => {
    return (
        <HStack space={5} alignItems="center" justifyContent={'space-between'}>
            <HStack space={5}>
                {props.isSvg && Platform.OS !== 'web' ? (
                    props.icon
                ) : (
                    <Image
                        source={props.icon}
                        style={{ width: 30, height: 30 }}
                        resizeMode="contain"
                    />
                )}
                <Text
                    style={{ flexShrink: 1 }}
                    color={system[50]}
                    fontSize="dm-h2"
                    fontFamily="mono"
                >
                    {props.title}
                </Text>
            </HStack>
            {props?.chevron ? (
                <Image
                    style={{
                        transform: [
                            {
                                rotate: '-90deg',
                            },
                        ],
                        width: 20,
                        height: 20,
                    }}
                    source={chevronBleu}
                    resizeMode="contain"
                />
            ) : null}
        </HStack>
    );
};

export default Title;
