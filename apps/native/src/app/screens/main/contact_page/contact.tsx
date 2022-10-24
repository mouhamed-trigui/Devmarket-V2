import React from 'react';
import styled from 'styled-components/native';
import { Image, View } from 'native-base';
import { Atomes } from '../../../components';
import { Linking, TouchableOpacity } from 'react-native';

import chevronBlanc from '../../../../assets/images/png/chevron-bleu-f.png';
import webIcon from '../../../../assets/images/png/web.png';
import emailIcon from '../../../../assets/images/png/email-.png';
import chatIcon from '../../../../assets/images/png/chat2.png';
import helpIcon from '../../../../assets/images/png/help.png';

/* eslint-disable-next-line */
export interface ContactProps {
    navigation: any;
}

const StyledContact = styled.View``;

const Item = (props: {
    link?: string;
    type: 'Email' | 'ExternalLink' | 'Local';
    icon: any | null | undefined;
    text: string;
    navigation: any;
}) => (
    <TouchableOpacity
        onPress={() =>
            props?.type === 'Email'
                ? Linking.openURL(`mailto:${props?.link}`)
                : props?.type === 'ExternalLink'
                ? Linking.openURL(`${props?.link}`)
                : props?.navigation.navigate(props?.link)
        }
        style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            height: 70,
            marginTop: 2,
            paddingLeft: 5,
            paddingRight: 5,
            backgroundColor: '#F6F6F7',
        }}
    >
        <View width={'10%'} height={28}>
            <Image width={6} height={6} source={props?.icon} alt="Icon" />
        </View>
        <View width={'80%'}>
            <Atomes.Text color="system.50" fontSize="dm-h2" textAlign="left">
                {props.text}
            </Atomes.Text>
        </View>
        <View width={'10%'}>
            <Image
                style={{
                    transform: [{ rotate: '-90deg' }],
                }}
                width={4}
                height={4}
                source={chevronBlanc}
                alt="chevronBlanc"
            />
        </View>
    </TouchableOpacity>
);

export function Contact(props: ContactProps) {
    return (
        <StyledContact>
            <Item
                icon={webIcon}
                text="www.operation-defmarket.com"
                link="https://www.operation-defmarket.com"
                type="ExternalLink"
                navigation={props?.navigation}
            />
            <Item
                icon={emailIcon}
                text="service.commerce@operation-defmarket.com"
                type="Email"
                navigation={props?.navigation}
            />
            <Item
                icon={chatIcon}
                text="Chat"
                link="Chat"
                type="Local"
                navigation={props?.navigation}
            />
            <Item
                icon={helpIcon}
                text="Centre d’aide"
                link="https://www.operation-defmarket.com"
                type="ExternalLink"
                navigation={props?.navigation}
            />
        </StyledContact>
    );
}

export default Contact;
