import { Flex } from 'native-base';
import React from 'react';
import { View, Text, Platform } from 'react-native';
import { SvgXml } from 'react-native-svg';

export interface ISvgButtonProps {
    xml: any;
    name?: string;
    active?: boolean;
}

const TabButton = (props: ISvgButtonProps) => {
    return (
        <View>
            <Flex align="center" width={10}>
                {Platform.OS === 'web' ? (
                    <View></View>
                ) : (
                    <SvgXml
                        fill={props.active ? '#EAAE00' : 'white'}
                        xml={props.xml}
                    />
                )}
                <Text
                    style={{
                        color: props.active ? '#EAAE00' : 'white',
                        fontSize: 9,
                    }}
                >
                    {props.name}
                </Text>
            </Flex>
        </View>
    );
};

export default TabButton;
