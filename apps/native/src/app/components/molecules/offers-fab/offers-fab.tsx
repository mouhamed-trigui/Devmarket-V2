import { Image } from 'native-base';
import React from 'react';

import plus from '../../../../assets/images/png/plus.png';

import { useNavigation } from '@react-navigation/core';
import { TouchableWithoutFeedback } from 'react-native';

const StructureFab = () => {
    const navigation = useNavigation();

    return (
        <TouchableWithoutFeedback
            onPress={() => navigation.navigate('AddOffer')}
        >
            <Image
                source={plus}
                alt="plus"
                height={20}
                width={20}
                position="absolute"
                right={0}
                bottom={0}
            />
        </TouchableWithoutFeedback>
    );
};

export default StructureFab;
