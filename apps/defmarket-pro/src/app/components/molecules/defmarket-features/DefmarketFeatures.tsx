import { Dimensions, Image, ImageSourcePropType, Platform } from 'react-native';
import React from 'react';
import { Box, CircleIcon, HStack, ScrollView, VStack } from 'native-base';
import { SvgXml } from 'react-native-svg';
import { IFeatureDescriptionProps } from '../../../services/model/company';
import { Button, Text } from '../../atomes';
import { system } from '../../../theme/colors';
import * as WebBrowser from 'expo-web-browser';

//atome status
import FeatureStatus from '../../atomes/status/FeatureStatus';

export interface IDefmarketProps {
    data: IFeatureDescriptionProps;
}
const DefmarketFeatures = (props: IDefmarketProps) => {
    // state result of webBrowser
    const [result, setResult] = React.useState<any>(null);

    const getHeight = (img: ImageSourcePropType) => {
        const { height, width } = Image.resolveAssetSource(img);
        const screenWidht = Dimensions.get('screen').width - 40;
        //console.log({ screenWidht });

        return (screenWidht / width) * height;
    };

    // funtion to open webBrowser
    const handlePressButton = async () => {
        const result = await WebBrowser.openBrowserAsync('https://google.fr');
        setResult(result);
    };
    return (
        <ScrollView
            key="DefmarketFeature"
            flexGrow={1}
            paddingY={5}
            contentContainerStyle={{
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
            }}
            backgroundColor={'white'}
        >
            <VStack marginTop={5} marginBottom={10} marginX={6} space={2}>
                {Platform.OS === 'web' ? (
                    <Image
                        accessibilityLabel="defmarket-feature-icon"
                        source={props.data.icon}
                        style={{
                            resizeMode: 'contain',
                            width: 20,
                            height: 20,
                        }}
                    />
                ) : (
                    <SvgXml
                        xml={props.data.icon}
                        style={{
                            marginTop: 10,
                            marginRight: 20,
                            width: 33,
                            height: 25,
                        }}
                    />
                )}
                <Text
                    color={system[50]}
                    fontFamily="mono"
                    fontSize="dm-h1"
                    style={{ marginBottom: props.data.marginBottom }}
                >
                    {props.data.title}
                </Text>
                {props.data.status && (
                    <Box width="50%">
                        <FeatureStatus status={props.data.status} />
                    </Box>
                )}
                {props.data.content &&
                    props.data.content.map((element, i) =>
                        element.type === 'text' ? (
                            <Text
                                key={i}
                                color={system[50]}
                                fontFamily="body"
                                fontSize="dm-p"
                                textAlign="justify"
                            >
                                {element.value}
                            </Text>
                        ) : element.type === 'image' ? (
                            <Image
                                accessibilityLabel="image-content"
                                key={i}
                                source={element.value}
                                style={{
                                    width: Dimensions.get('screen').width - 40,
                                    height: getHeight(element.value),
                                }}
                                resizeMode="contain"
                            />
                        ) : element.hideLeftCercleIcon ? (
                            <HStack
                                key={i}
                                space={3}
                                alignItems="center"
                                marginTop={6}
                            >
                                <Text textAlign="justify">{element.value}</Text>
                            </HStack>
                        ) : (
                            <HStack
                                key={i}
                                space={3}
                                alignItems="center"
                                marginLeft={5}
                                marginTop={6}
                            >
                                <CircleIcon size="3" color={system[50]} />
                                <Text
                                    color={system[50]}
                                    fontFamily="mono"
                                    fontSize="dm-h2"
                                    textAlign="justify"
                                >
                                    {element.value}
                                </Text>
                            </HStack>
                        )
                    )}
                {props.data.hasButton && (
                    <Button
                        label="En savoir plus"
                        onPress={handlePressButton}
                        width={150}
                        size="sm"
                        fontSize="dm-p"
                        style={{ height: 35, marginTop: 10, marginBottom: 30 }}
                    />
                )}
            </VStack>
        </ScrollView>
    );
};

export default DefmarketFeatures;
