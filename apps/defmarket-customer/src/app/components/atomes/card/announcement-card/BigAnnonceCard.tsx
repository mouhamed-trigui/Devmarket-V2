import React, { useContext } from 'react';
import Text from '../../text/Text';
import Card from '../general-card/Card';
import { fonts, fontSizes } from './../../../../theme/fonts';

export default function BigAnnonceCard(props: {
    backgroundColor?: string;
    title: string;
    text: string;
    textColor?: string;
}) {
    return (
        <Card
            backgroundColor={props.backgroundColor}
            vMargin={10}
            vPadding={12}
            hPadding={10}
            borderRadius={7}
        >
            <Text
                moreParams={{ marginTop: 50 }}
                color={props.textColor}
                fontSize={fontSizes['dm-h2']}
                fontFamily={fonts.mono}
                textAlign="left"
            >
                {props.title}
            </Text>
            <Text
                color={props.textColor}
                fontFamily={fonts.body}
                textAlign="left"
                vPadding={4}
            >
                {props.text}
            </Text>
        </Card>
    );
}
