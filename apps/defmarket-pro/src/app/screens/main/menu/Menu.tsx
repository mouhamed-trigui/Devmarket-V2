import React from 'react';
import { Image, Platform, TouchableOpacity } from 'react-native';
// Redux
import { useDispatch } from 'react-redux';
import { userActions } from '../../../stores/slices';

// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeArea, Text } from '../../../components/atomes';
import { Divider, HStack, VStack } from 'native-base';
import { secondary } from '../../../theme/colors';
import * as WebBrowser from 'expo-web-browser';

//PNG
import etiquetteP from '../../../../assets/images/png/etiquette-de-vente.png';
import userP from '../../../../assets/images/png/user.png';
import chevronRight from '../../../../assets/images/png/chevron-blanc.png';
//SVG
import etiquette from '../../../../assets/images/svg/etiquette-de-vente-white.svg';
import user from '../../../../assets/images/svg/user.svg';
import { SvgXml } from 'react-native-svg';
import { FormattedMessage } from 'react-intl';
import { useNavigation } from '@react-navigation/native';
/* eslint-disable-next-line */
export interface MenuProps {
    navigation: any;
}
const Menu = (props: MenuProps) => {
    // Redux
    const dispatch = useDispatch();

    //navigation
    const navigation = useNavigation();

    // web browser
    const [result, setResult] = React.useState(null);

    const handleOpenBrowser = async (lien: string) => {
        const result = await WebBrowser.openBrowserAsync(lien);
        setResult(result);
    };

    const LogOut = async () => {
        // Clean up
        dispatch(userActions.setUser(null));
        dispatch(userActions.setIsLoggedIn(false));
        // TODO : Check with @amin (remove or save the access token)
        await AsyncStorage.removeItem('@Access_Token');
        await AsyncStorage.removeItem('@Refresh_Token');
        // Redirection
        props?.navigation?.navigate('Start');
    };
    return (
        <SafeArea>
            <VStack marginX={5} marginTop={10} space={8}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Profile')}
                >
                    <HStack justifyContent="space-between">
                        <HStack space={5}>
                            {Platform.OS === 'web' ? (
                                <Image
                                    accessibilityLabel="userP"
                                    source={userP}
                                    style={{
                                        width: 25,
                                        height: 25,
                                    }}
                                />
                            ) : (
                                <SvgXml
                                    xml={user}
                                    style={{
                                        width: 25,
                                        height: 25,
                                    }}
                                />
                            )}
                            <Text fontFamily="mono" fontSize="dm-h2">
                                <FormattedMessage
                                    id="IMPMP1"
                                    defaultMessage="Mon profil"
                                />
                            </Text>
                        </HStack>

                        <Image
                            accessibilityLabel="chevron-right"
                            source={chevronRight}
                            style={{
                                width: 20,
                                height: 20,
                                transform: [{ rotateY: '180deg' }],
                            }}
                            resizeMode="contain"
                        />
                    </HStack>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('structureGroup', {
                            screen: 'OfferList',
                            initial: false,
                        });
                    }}
                >
                    <HStack justifyContent="space-between">
                        <HStack space={5}>
                            {Platform.OS === 'web' ? (
                                <Image
                                    accessibilityLabel="etiquetteP"
                                    source={etiquetteP}
                                    style={{
                                        resizeMode: 'contain',
                                        width: 25,
                                        height: 25,
                                    }}
                                />
                            ) : (
                                <SvgXml
                                    xml={etiquette}
                                    style={{
                                        width: 25,
                                        height: 25,
                                    }}
                                />
                            )}
                            <Text fontFamily="mono" fontSize="dm-h2">
                                <FormattedMessage
                                    id="IMPMP2"
                                    defaultMessage="Mes offres"
                                />
                            </Text>
                        </HStack>

                        <Image
                            accessibilityLabel="chevron-right-png"
                            source={chevronRight}
                            style={{
                                width: 20,
                                height: 20,
                                transform: [{ rotateY: '180deg' }],
                            }}
                            resizeMode="contain"
                        />
                    </HStack>
                </TouchableOpacity>
            </VStack>

            <Divider bgColor={secondary[50]} thickness={2} my={8} />

            <VStack marginX={5} space={8}>
                <TouchableOpacity
                    onPress={() =>
                        handleOpenBrowser(
                            'https://operationhyperion.com/cgvu-application-defmarket-pro/'
                        )
                    }
                >
                    <HStack justifyContent="space-between">
                        <Text fontFamily="body" fontSize="dm-h2">
                            <FormattedMessage
                                id="IMPMP3"
                                defaultMessage="CGVU"
                            />
                        </Text>

                        <Image
                            accessibilityLabel="chevron-menu"
                            source={chevronRight}
                            style={{
                                width: 20,
                                height: 20,
                                transform: [{ rotateY: '180deg' }],
                            }}
                            resizeMode="contain"
                        />
                    </HStack>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() =>
                        handleOpenBrowser(
                            'https://operationhyperion.com/politique-de-confidentialite-commercants-application-defmarket-pro/'
                        )
                    }
                >
                    <HStack justifyContent="space-between">
                        <Text fontFamily="body" fontSize="dm-h2">
                            <FormattedMessage
                                id="IMBis3"
                                defaultMessage="Politique de confidentialité"
                            />
                        </Text>

                        <Image
                            accessibilityLabel="chevron-right-menu"
                            source={chevronRight}
                            style={{
                                width: 20,
                                height: 20,
                                transform: [{ rotateY: '180deg' }],
                            }}
                            resizeMode="contain"
                        />
                    </HStack>
                </TouchableOpacity>

                {/* <TouchableOpacity
                    onPress={() => navigation.navigate('pushNotificationMenu')}
                >
                    <HStack justifyContent="space-between">
                        <Text fontFamily="body" fontSize="dm-h2">
                            <FormattedMessage
                                id="IMPMP4"
                                defaultMessage="Notifications"
                            />
                        </Text>

                        <Image
                            source={chevronRight}
                            style={{
                                width: 20,
                                height: 20,
                                transform: [{ rotateY: '180deg' }],
                            }}
                            resizeMode="contain"
                        />
                    </HStack>
                </TouchableOpacity> */}

                <TouchableOpacity onPress={() => LogOut()}>
                    <HStack justifyContent="space-between">
                        <Text fontFamily="body" fontSize="dm-h2">
                            <FormattedMessage
                                id="IMPMP5"
                                defaultMessage="Déconnexion"
                            />
                        </Text>

                        <Image
                            accessibilityLabel="right-img"
                            source={chevronRight}
                            style={{
                                width: 20,
                                height: 20,
                                transform: [{ rotateY: '180deg' }],
                            }}
                            resizeMode="contain"
                        />
                    </HStack>
                </TouchableOpacity>
            </VStack>
        </SafeArea>
    );
};

export default Menu;
