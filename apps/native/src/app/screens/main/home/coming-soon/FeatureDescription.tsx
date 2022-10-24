import React from 'react';
import { Box, VStack } from 'native-base';

import { Image, Platform } from 'react-native';
import { Text } from '../../../../../app/components/atomes';
import PageContainer from '../../../../../app/components/atomes/container/PageContainer';
import { system } from '../../../../../app/theme/colors';

import Delegate from '../../../../../assets/images/svg/delegate.svg';

import * as WebBrowser from 'expo-web-browser';
import { IFeatureDescriptionProps } from '../../../../services/model/company';
import FeatureStatus from './FeatureStatus';
export interface IFatureDescriptionProps {
    data: IFeatureDescriptionProps;
}
const FeatureDescription = (props: IFatureDescriptionProps) => {
    const [result, setResult] = React.useState<any>(null);
    const handlePressButton = async () => {
        const result = await WebBrowser.openBrowserAsync('https://google.fr');
        setResult(result);
    };
    return (
        <PageContainer
            contentContainerStyle={{
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
            }}
        >
            <VStack marginTop={5} marginBottom={10} marginX={6} space={2}>
                {Platform.OS === 'web' ? (
                    <Image
                        source={props.data.icon}
                        style={{
                            resizeMode: 'contain',
                            width: 20,
                            height: 20,
                        }}
                    />
                ) : (
                    <Delegate
                        style={{
                            marginTop: 10,
                            marginRight: 20,
                            width: 33,
                            height: 25,
                        }}
                    />
                )}
                <Text color={system[50]} fontFamily="mono" fontSize="dm-h1">
                    {props.data.title}
                </Text>
                <Box width="50%">
                    <FeatureStatus status={props.data.status} />
                </Box>
                {props.data.content &&
                    props.data.content.map((element) =>
                        element.type === 'text' ? (
                            <Text
                                color={system[50]}
                                fontFamily="body"
                                fontSize="dm-p"
                            >
                                {element.value}
                            </Text>
                        ) : (
                            <Image
                                source={element.value}
                                style={{
                                    marginVertical: 20,
                                    width: '100%',
                                    height: 200,
                                }}
                                resizeMode="stretch"
                            />
                        )
                    )}
            </VStack>
        </PageContainer>
    );
};

export default FeatureDescription;
