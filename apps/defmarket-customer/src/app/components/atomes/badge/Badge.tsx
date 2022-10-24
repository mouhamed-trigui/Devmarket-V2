import { View } from 'react-native';
import React, { FC } from 'react';
import { info } from '../../../theme/colors';
import Text from '../text/Text';

const Badge: FC<{
    text: string;
    width: string | number;
    height?: string | number;
    backgroundColor?: string;
    textColor?: string;
}> = ({ text, backgroundColor, height, width, textColor }) => {
    return (
        <View
            style={{
                backgroundColor: backgroundColor,
                borderRadius: 8,
                marginHorizontal: 5,
                borderColor: info[700],
                borderWidth: 1,
                width: width,
                height: height,
            }}
        >
            <Text
                color={textColor}
                textAlign="center"
                moreParams={{ marginVertical: 2 }}
            >
                {text}
            </Text>
        </View>
    );
};

export default Badge;
