import { useNavigation } from '@react-navigation/native';
import { VStack } from 'native-base';
import React from 'react';
import { Image } from 'react-native';
import { Button, Text } from '../../components/atomes';
import { getHeight } from '../../utils/image';

// assets
import forbiddenPng from '../../../assets/images/png/Forbidden.png';
import { FormattedMessage } from 'react-intl';

const Forbidden = () => {
    const navigation = useNavigation();
    return (
        <VStack space={5} justifyContent="center" height="full">
            <Image
                source={forbiddenPng}
                style={{
                    width: '70%',
                    height: getHeight(forbiddenPng),
                    marginHorizontal: '15%',
                }}
                resizeMode="contain"
            />
            <Text
                style={{ alignSelf: 'center' }}
                width="80%"
                color="system.50"
                textAlign="center"
                fontFamily="body"
            >
                <FormattedMessage
                    id="FFoRbn"
                    defaultMessage="Oops, ton accès à cet espace est bloqué pour l’instant, contacte les administrateurs pour en savoir plus."
                />
            </Text>
            <Button
                label="Contact"
                onPress={() => navigation.navigate('contactGroup')}
                width="150"
                alignSelf="center"
                backgroundColor="primary.100"
            />
        </VStack>
    );
};

export default Forbidden;
