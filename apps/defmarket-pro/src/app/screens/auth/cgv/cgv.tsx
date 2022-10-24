import React from 'react';
import styled from 'styled-components/native';
import { Platform, ScrollView, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import closeSVG from '../../../../assets/images/svg/close.svg';
import closePNG from '../../../../assets/images/png/close.png';
import { Image, View } from 'native-base';
import cgvData from './cgv.json';

// Components
import { Atomes } from '../../../components';
/* eslint-disable-next-line */
export interface CgvProps {
    navigation: any;
}

const StyledCgv = styled.View`
    background-color: white;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const StyledTitleCgv = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 30px 30px 10px 30px;
`;

export function Cgv(props: CgvProps) {
    return (
        <StyledCgv>
            <StyledTitleCgv>
                <Atomes.Text
                    fontFamily="mono"
                    fontSize="dm-h1"
                    textAlign="left"
                    color="system.50"
                    moreParams={{ bold: true }}
                >
                    {'CONDITIONS GÉNÉRALES \nD’UTILISATION'}
                </Atomes.Text>
                <TouchableOpacity
                    onPress={() => props?.navigation?.goBack()}
                    style={{ marginTop: 10 }}
                >
                    {Platform.OS === 'web' ? (
                        <Image
                            width={18}
                            height={18}
                            source={closePNG}
                            verticalAlign="sub"
                            alt="close"
                        />
                    ) : (
                        <SvgXml width={18} height={18} xml={closeSVG} />
                    )}
                </TouchableOpacity>
            </StyledTitleCgv>
            <ScrollView contentContainerStyle={{ padding: 30, marginTop: -20 }}>
                {cgvData.map((item, key: number) => (
                    <View key={key + 1}>
                        <Atomes.Text
                            fontFamily="mono"
                            fontSize="dm-h1"
                            textAlign="left"
                            color="system.50"
                            moreParams={{ bold: true }}
                        >
                            {item?.title}
                        </Atomes.Text>
                        <Atomes.Text
                            fontFamily="body"
                            fontSize="dm-2p"
                            textAlign="justify"
                            color="system.50"
                        >
                            {item.description}{' '}
                        </Atomes.Text>
                    </View>
                ))}
            </ScrollView>
        </StyledCgv>
    );
}

export default Cgv;
