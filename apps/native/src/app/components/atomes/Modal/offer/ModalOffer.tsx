import { system } from '../../../../theme/colors';
import { Box, HStack, ScrollView, VStack } from 'native-base';
import React from 'react';
import { Dimensions, Image, ImageSourcePropType } from 'react-native';
import Text from '../../text/text';

import exemple25 from '../../../../../assets/images/offre/images/exemple-25.png';
import exemple3 from '../../../../../assets/images/offre/images/exemple-3-articles.png';
import exemple10 from '../../../../../assets/images/offre/images/Exemple-10€.png';

import Condition from '../../../../../assets/images/offre/svg/condition.svg';
import Dates from '../../../../../assets/images/offre/svg/dates.svg';
import Description from '../../../../../assets/images/offre/svg/description.svg';
import Euros from '../../../../../assets/images/offre/svg/euros.svg';
import Promo from '../../../../../assets/images/offre/svg/promo.svg';
import BeneficiaireA from '../../../../../assets/images/offre/svg/beneficiaire-a.svg';
import BeneficiaireB from '../../../../../assets/images/offre/svg/beneficiaire-b.svg';
import BeneficiaireC from '../../../../../assets/images/offre/svg/beneficiaire-c.svg';

import { IModalOfferTextProps } from '../../../../services/model/company';

export interface IModalOfferProps {
    dataModalOffer: IModalOfferTextProps | undefined;
}
const ModalOffer = (props: IModalOfferProps) => {
    const getHeight = (img: ImageSourcePropType) => {
        const { height, width } = Image.resolveAssetSource(img);
        const screenWidht = Dimensions.get('screen').width - 40;
        return (screenWidht / width) * height;
    };

    return (
        <ScrollView
            key="DefmarketModaldescriptionOffer"
            flexGrow={1}
            paddingY={5}
            contentContainerStyle={{
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
            }}
            backgroundColor={'white'}
        >
            <VStack marginTop={5} marginBottom={10} marginX={6} space={2}>
                <Text
                    color={system[50]}
                    fontFamily="mono"
                    fontSize={20}
                    style={{
                        marginBottom: 10,
                    }}
                >
                    {props.dataModalOffer?.title}
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
                    {props.dataModalOffer?.description}
                </Text>

                <VStack space={6} marginTop={5}>
                    <HStack width="80%" space={4}>
                        <Description />
                        <Text
                            color={system[50]}
                            fontFamily="body"
                            fontSize="dm-p"
                            textAlign="justify"
                            style={{
                                alignSelf: 'center',
                                marginBottom: 10,
                            }}
                        >
                            <Text
                                color={system[50]}
                                fontFamily="mono"
                                fontSize="dm-p"
                                textAlign="justify"
                                style={{
                                    alignSelf: 'center',
                                    marginBottom: 10,
                                }}
                            >
                                {props.dataModalOffer?.step1}
                            </Text>
                            {props.dataModalOffer?.textStep1}
                        </Text>
                    </HStack>

                    <HStack width="80%" space={4}>
                        <Promo />
                        <Text
                            color={system[50]}
                            fontFamily="body"
                            fontSize="dm-p"
                            textAlign="justify"
                            style={{
                                alignSelf: 'center',
                                marginBottom: 10,
                            }}
                        >
                            <Text
                                color={system[50]}
                                fontFamily="mono"
                                fontSize="dm-p"
                                textAlign="justify"
                                style={{
                                    alignSelf: 'center',
                                    marginBottom: 10,
                                }}
                            >
                                {props.dataModalOffer?.step2}
                            </Text>
                            {props.dataModalOffer?.textStep2}
                        </Text>
                    </HStack>

                    <HStack width="80%" space={4}>
                        <Euros />
                        <Text
                            color={system[50]}
                            fontFamily="body"
                            fontSize="dm-p"
                            textAlign="justify"
                            style={{
                                alignSelf: 'center',
                                marginBottom: 10,
                            }}
                        >
                            <Text
                                color={system[50]}
                                fontFamily="mono"
                                fontSize="dm-p"
                                textAlign="justify"
                                style={{
                                    alignSelf: 'center',
                                    marginBottom: 10,
                                }}
                            >
                                {props.dataModalOffer?.step3}
                            </Text>
                            {props.dataModalOffer?.textStep3}
                        </Text>
                    </HStack>

                    <HStack width="80%" space={4}>
                        <Condition />
                        <Text
                            color={system[50]}
                            fontFamily="body"
                            fontSize="dm-p"
                            textAlign="justify"
                            style={{
                                alignSelf: 'center',
                                marginBottom: 10,
                            }}
                        >
                            <Text
                                color={system[50]}
                                fontFamily="mono"
                                fontSize="dm-p"
                                textAlign="justify"
                                style={{
                                    alignSelf: 'center',
                                    marginBottom: 10,
                                }}
                            >
                                {props.dataModalOffer?.step4}
                            </Text>
                            {props.dataModalOffer?.textStep4}
                        </Text>
                    </HStack>

                    <HStack width="80%" space={4}>
                        <Description />
                        <Text
                            color={system[50]}
                            fontFamily="body"
                            fontSize="dm-p"
                            textAlign="justify"
                            style={{
                                alignSelf: 'center',
                                marginBottom: 10,
                            }}
                        >
                            <Text
                                color={system[50]}
                                fontFamily="mono"
                                fontSize="dm-p"
                                textAlign="justify"
                                style={{
                                    alignSelf: 'center',
                                    marginBottom: 10,
                                }}
                            >
                                {props.dataModalOffer?.step5}
                            </Text>
                            {props.dataModalOffer?.textStep5}
                        </Text>
                    </HStack>
                    <HStack width="80%" space={4}>
                        <Dates style={{ width: 33, height: 33 }} />
                        <Text
                            color={system[50]}
                            fontFamily="body"
                            fontSize="dm-p"
                            textAlign="justify"
                            style={{
                                alignSelf: 'center',
                                marginBottom: 10,
                            }}
                        >
                            <Text
                                color={system[50]}
                                fontFamily="mono"
                                fontSize="dm-p"
                                textAlign="justify"
                                style={{
                                    alignSelf: 'center',
                                    marginBottom: 10,
                                }}
                            >
                                {props.dataModalOffer?.step6}
                            </Text>
                            {props.dataModalOffer?.textStep6}
                        </Text>
                    </HStack>
                </VStack>
            </VStack>
            <Box alignItems="center" backgroundColor={system[300]}>
                <VStack marginTop={5} marginBottom={5} marginX={6} space={1}>
                    <Text
                        fontFamily="mono"
                        fontSize={22}
                        color={system[50]}
                        style={{
                            marginTop: 10,
                            marginBottom: 15,
                        }}
                    >
                        {props.dataModalOffer?.question}
                    </Text>
                    <Text
                        color={system[50]}
                        fontFamily="body"
                        fontSize="dm-p"
                        textAlign="justify"
                    >
                        {props.dataModalOffer?.description1}
                        <Text
                            color={system[50]}
                            fontFamily="mono"
                            fontSize="dm-p"
                            textAlign="justify"
                        >
                            {props.dataModalOffer?.percentage}
                        </Text>
                        {props.dataModalOffer?.description2}

                        <Text
                            italic
                            color={system[50]}
                            fontFamily="body"
                            fontSize="dm-p"
                            textAlign="justify"
                        >
                            {props.dataModalOffer?.example1}
                        </Text>
                    </Text>
                    <Image
                        key="exemple25"
                        source={exemple25}
                        style={{
                            width: Dimensions.get('screen').width - 40,
                            height: getHeight(exemple25),
                        }}
                        resizeMode="stretch"
                    />
                    <Text
                        color={system[50]}
                        fontFamily="body"
                        fontSize="dm-p"
                        textAlign="justify"
                    >
                        {props.dataModalOffer?.description1}
                        <Text
                            color={system[50]}
                            fontFamily="mono"
                            fontSize="dm-p"
                            textAlign="justify"
                        >
                            {props.dataModalOffer?.reduction}
                        </Text>
                        {props.dataModalOffer?.description4}

                        <Text
                            italic
                            color={system[50]}
                            fontFamily="body"
                            fontSize="dm-p"
                            textAlign="justify"
                        >
                            {props.dataModalOffer?.example2}
                        </Text>
                    </Text>
                    <Image
                        key="exemple10"
                        source={exemple10}
                        style={{
                            width: Dimensions.get('screen').width - 40,
                            height: getHeight(exemple10),
                        }}
                        resizeMode="stretch"
                    />
                    <Text
                        color={system[50]}
                        fontFamily="body"
                        fontSize="dm-p"
                        textAlign="justify"
                        style={{
                            marginBottom: 10,
                        }}
                    >
                        {props.dataModalOffer?.description1}
                        <Text
                            color={system[50]}
                            fontFamily="mono"
                            fontSize="dm-p"
                            textAlign="justify"
                        >
                            {props.dataModalOffer?.bonPlan}
                        </Text>
                        {props.dataModalOffer?.description5}

                        <Text
                            italic
                            color={system[50]}
                            fontFamily="body"
                            fontSize="dm-p"
                        >
                            {props.dataModalOffer?.example3}
                        </Text>
                    </Text>
                    <Image
                        key="exemple3"
                        source={exemple3}
                        style={{
                            width: Dimensions.get('screen').width - 40,
                            height: getHeight(exemple3),
                        }}
                        resizeMode="stretch"
                    />
                </VStack>
            </Box>
            <VStack marginTop={5} marginBottom={10} marginX={6} space={5}>
                <Text
                    fontFamily="mono"
                    fontSize={22}
                    color={system[50]}
                    style={{
                        marginBottom: 8,
                    }}
                >
                    {props.dataModalOffer?.title1}
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
                    {props.dataModalOffer?.description6}
                    <Text
                        color={system[50]}
                        fontFamily="mono"
                        fontSize="dm-p"
                        textAlign="justify"
                    >
                        {props.dataModalOffer?.description7}
                    </Text>
                    {props.dataModalOffer?.description8}
                </Text>
                <HStack width="80%" space={4}>
                    <BeneficiaireC style={{ marginTop: 3 }} />
                    <Text
                        color={system[50]}
                        fontFamily="body"
                        fontSize="dm-p"
                        textAlign="justify"
                    >
                        <Text
                            color={system[50]}
                            fontFamily="mono"
                            fontSize="dm-p"
                            textAlign="justify"
                        >
                            {props.dataModalOffer?.description9}
                        </Text>
                        {props.dataModalOffer?.description10}
                        <Text
                            color={system[50]}
                            fontFamily="mono"
                            fontSize="dm-p"
                            textAlign="justify"
                        >
                            {props.dataModalOffer?.description11}
                        </Text>
                    </Text>
                </HStack>
                <HStack width="80%" space={4}>
                    <BeneficiaireB style={{ marginTop: 3 }} />
                    <Text
                        color={system[50]}
                        fontFamily="body"
                        fontSize="dm-p"
                        textAlign="justify"
                    >
                        <Text
                            color={system[50]}
                            fontFamily="mono"
                            fontSize="dm-p"
                            textAlign="justify"
                        >
                            {props.dataModalOffer?.description12}
                        </Text>
                        {props.dataModalOffer?.description13}
                        <Text
                            color={system[50]}
                            fontFamily="mono"
                            fontSize="dm-p"
                            textAlign="justify"
                        >
                            {props.dataModalOffer?.description14}
                        </Text>
                        {props.dataModalOffer?.description15}
                        <Text
                            color={system[50]}
                            fontFamily="mono"
                            fontSize="dm-p"
                            textAlign="justify"
                        >
                            {props.dataModalOffer?.description16}
                        </Text>
                    </Text>
                </HStack>
                <HStack width="80%" space={4}>
                    <BeneficiaireA style={{ marginTop: 3 }} />
                    <Text
                        color={system[50]}
                        fontFamily="body"
                        fontSize="dm-p"
                        textAlign="justify"
                    >
                        <Text
                            color={system[50]}
                            fontFamily="mono"
                            fontSize="dm-p"
                            textAlign="justify"
                        >
                            {props.dataModalOffer?.description12}
                        </Text>
                        {props.dataModalOffer?.description13}
                        <Text
                            color={system[50]}
                            fontFamily="mono"
                            fontSize="dm-p"
                            textAlign="justify"
                        >
                            {props.dataModalOffer?.description17}
                        </Text>
                        {props.dataModalOffer?.description18}
                        <Text
                            color={system[50]}
                            fontFamily="mono"
                            fontSize="dm-p"
                            textAlign="justify"
                        >
                            {props.dataModalOffer?.description19}
                        </Text>
                    </Text>
                </HStack>
                <Text
                    color={system[50]}
                    fontFamily="body"
                    fontSize="dm-p"
                    textAlign="justify"
                    style={{
                        marginBottom: 10,
                    }}
                >
                    {props.dataModalOffer?.description20}
                    <Text
                        color={system[50]}
                        fontFamily="mono"
                        fontSize="dm-p"
                        textAlign="justify"
                    >
                        {props.dataModalOffer?.description21}
                    </Text>
                </Text>
            </VStack>
        </ScrollView>
    );
};

export default ModalOffer;
