import { system } from '../../../../theme/colors';
import { Box, HStack, ScrollView, VStack } from 'native-base';
import React from 'react';
import { Dimensions, Image, ImageSourcePropType } from 'react-native';
import Text from '../../text/text';

import entreprise from '../../../../../assets/images/home/svg/entreprise.svg';
import coucou from '../../../../../assets/images/home/svg/notif-coucou.svg';
import offer from '../../../../../assets/images/home/svg/notif-offre.svg';
import shop from '../../../../../assets/images/home/svg/notif-shop.svg';

import home1 from '../../../../../assets/images/home/images/visuel-carte-pc.png';
import home from '../../../../../assets/images/home/images/offre-client.png';
import { SvgXml } from 'react-native-svg';
import { IModalHomeTextProps } from '../../../../services/model/company';

export interface IModalHomeProps {
    dataModalHome: IModalHomeTextProps | undefined;
}

const ModalHome = (props: IModalHomeProps) => {
    const getHeight = (img: ImageSourcePropType) => {
        const { height, width } = Image.resolveAssetSource(img);
        const screenWidht = Dimensions.get('screen').width - 40;
        //console.log({ screenWidht });

        return (screenWidht / width) * height;
    };
    return (
        <ScrollView
            key="DefmarketModaldescriptionHome"
            flexGrow={1}
            paddingY={5}
            contentContainerStyle={{
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
            }}
            backgroundColor={'white'}
        >
            <VStack marginTop={5} marginBottom={5} marginX={6} space={2}>
                <Text
                    color={system[50]}
                    fontFamily="mono"
                    fontSize={22}
                    style={{
                        marginBottom: 10,
                    }}
                >
                    {props.dataModalHome?.title}
                </Text>

                <Text
                    color={system[50]}
                    fontFamily="body"
                    fontSize="dm-p"
                    textAlign="justify"
                    style={{
                        marginBottom: 10,
                    }}
                >
                    {props.dataModalHome?.description}
                </Text>

                <VStack space={4} marginTop={5}>
                    <HStack space={4} alignItems="center">
                        <SvgXml xml={entreprise} />
                        <Text
                            color={system[50]}
                            fontFamily="body"
                            fontSize="dm-p"
                            textAlign="justify"
                            style={{
                                marginBottom: 10,
                            }}
                        >
                            <Text
                                color={system[50]}
                                fontFamily="mono"
                                fontSize="dm-p"
                                textAlign="justify"
                                style={{
                                    marginBottom: 10,
                                }}
                            >
                                {props.dataModalHome?.step1}
                            </Text>
                            {props.dataModalHome?.textStep1}
                        </Text>
                    </HStack>
                    <HStack space={4} alignItems="center">
                        <SvgXml xml={shop} />
                        <Text
                            color={system[50]}
                            fontFamily="body"
                            fontSize="dm-p"
                            textAlign="justify"
                            style={{
                                marginBottom: 10,
                            }}
                        >
                            <Text
                                color={system[50]}
                                fontFamily="mono"
                                fontSize="dm-p"
                                textAlign="justify"
                                style={{
                                    marginBottom: 10,
                                }}
                            >
                                {props.dataModalHome?.step2}
                            </Text>{' '}
                            {props.dataModalHome?.textStep2}
                        </Text>
                    </HStack>

                    <HStack space={4} alignItems="center">
                        <SvgXml xml={offer} />
                        <Text
                            color={system[50]}
                            fontFamily="body"
                            fontSize="dm-p"
                            textAlign="justify"
                            style={{
                                marginBottom: 10,
                            }}
                        >
                            <Text
                                color={system[50]}
                                fontFamily="mono"
                                fontSize="dm-p"
                                textAlign="justify"
                                style={{
                                    marginBottom: 10,
                                }}
                            >
                                {props.dataModalHome?.step3}
                            </Text>{' '}
                            {props.dataModalHome?.textStep3}
                        </Text>
                    </HStack>

                    <HStack space={4} alignItems="center">
                        <SvgXml xml={coucou} />
                        <Text
                            color={system[50]}
                            fontFamily="body"
                            fontSize="dm-p"
                            textAlign="justify"
                            style={{
                                marginBottom: 10,
                            }}
                        >
                            <Text
                                color={system[50]}
                                fontFamily="mono"
                                fontSize="dm-p"
                                textAlign="justify"
                            >
                                {props.dataModalHome?.step4}
                            </Text>
                            {props.dataModalHome?.textStep4}
                        </Text>
                    </HStack>
                </VStack>
            </VStack>
            <Box
                alignItems="center"
                marginBottom={10}
                backgroundColor={system[300]}
            >
                <VStack marginTop={5} marginBottom={5} marginX={6} space={2}>
                    <Text
                        fontFamily="mono"
                        fontSize={22}
                        color={system[50]}
                        style={{
                            marginTop: 10,
                        }}
                    >
                        {props.dataModalHome?.question}
                    </Text>
                    <Text
                        color={system[50]}
                        fontFamily="body"
                        fontSize="dm-p"
                        textAlign="justify"
                        style={{
                            marginRight: 33,
                            marginTop: 10,
                        }}
                    >
                        {props.dataModalHome?.description1}
                    </Text>

                    <Image
                        accessibilityLabel="Home-modal"
                        key="home"
                        source={home}
                        style={{
                            marginVertical: 10,
                            width: Dimensions.get('screen').width - 40,
                            height: getHeight(home),
                        }}
                        resizeMode="stretch"
                    />
                    <Text
                        color={system[50]}
                        fontFamily="body"
                        fontSize="dm-p"
                        textAlign="justify"
                        style={{
                            marginRight: 33,
                            marginBottom: 10,
                        }}
                    >
                        {props.dataModalHome?.description2}
                        {'\n'}
                        {'\n'}
                        {props.dataModalHome?.description3}
                    </Text>

                    <Image
                        accessibilityLabel="Modal-Home1"
                        key="home1"
                        source={home1}
                        style={{
                            marginVertical: 20,
                            width: Dimensions.get('screen').width - 40,
                            height: getHeight(home),
                        }}
                        resizeMode="stretch"
                    />
                </VStack>
            </Box>
        </ScrollView>
    );
};

export default ModalHome;
