import { HStack, VStack } from 'native-base';
import React from 'react';
import { Image, Platform } from 'react-native';
import { system } from '../../../theme/colors';
import { IFeatureDescriptionProps } from '../../../services/model/company';
import Text from '../text/text';
import Button from '../button/button';
import FeatureStatus from '../status/FeatureStatus';

interface IFeatureProps extends IFeatureDescriptionProps {
    buttonName: string;
    actions: () => void;
}
const Feature = (props: IFeatureProps) => {
    return (
        <VStack space={3}>
            <HStack justifyContent="space-between">
                <HStack space={3}>
                    {Platform.OS === 'web' ? (
                        <Image
                            source={props.icon}
                            style={{
                                resizeMode: 'contain',
                                width: 20,
                                height: 20,
                            }}
                        />
                    ) : (
                        props.icon
                    )}
                    <Text color={system[50]} fontFamily="mono" fontSize="dm-h2">
                        {props.title}
                    </Text>
                </HStack>
                <FeatureStatus status={props.status} />
            </HStack>
            <Text
                textAlign="justify"
                color={system[50]}
                fontFamily="body"
                fontSize="dm-p"
            >
                {props.description}
            </Text>
            <Button
                label={props.buttonName}
                onPress={props.actions}
                width={150}
                size="sm"
                fontSize={'dm-p'}
                style={{ height: 35 }}
            />
        </VStack>
    );
};

export default Feature;
