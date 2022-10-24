import { useNavigation } from '@react-navigation/native';
import { HStack, VStack } from 'native-base';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Dimensions, Image, Platform } from 'react-native';
import { Button, Text } from '../../../components/atomes';

//icons SVG
import shop from '../../../../assets/images/svg/shop-white.svg';
import etiquette from '../../../../assets/images/svg/etiquette-de-vente-white.svg';
import userSVG from '../../../../assets/images/svg/user.svg';
//icons PNG
import shopPNG from '../../../../assets/images/png/shop.png';
import etiquettePNG from '../../../../assets/images/png/etiquette-de-vente.png';
import userPNG from '../../../../assets/images/png/user.png';

import { SvgXml } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';
import { companyActions } from '../../../stores/slices/company/companySlice';
import { GetFirstStore } from '../../../services/methodes/store';
import Infodialog from '../../../components/molecules/dialog/info-dialog/Infodialog';

const Title = (props: { icon: any; text: string; description: string }) => {
    return (
        <HStack space={1}>
            {Platform?.OS === 'web' ? (
                <Image
                    accessibilityLabel="complete-account-configuration"
                    source={props.icon}
                    style={{
                        marginTop: 10,
                        marginRight: 20,
                        width: 40,
                        height: 40,
                    }}
                />
            ) : (
                <SvgXml
                    xml={props.icon}
                    style={{
                        marginTop: 10,
                        marginRight: 20,
                        width: 33,
                        height: 25,
                    }}
                />
            )}

            <VStack space={2} marginRight={8}>
                <Text
                    style={{ paddingTop: 10 }}
                    textAlign="left"
                    fontFamily="mono"
                    fontSize="dm-h2"
                >
                    {props.text}
                </Text>
                <Text textAlign="left" fontFamily="body" fontSize="dm-3p">
                    {props.description}
                </Text>
            </VStack>
        </HStack>
    );
};

const CompleteAccountConfiguration = () => {
    const { formatMessage } = useIntl();

    const navigation = useNavigation();

    const dispatch = useDispatch();

    const [loading, setLoading] = React.useState(false);

    const { user } = useSelector((state: any) => state.user);

    const [alert, setAlert] = React.useState<{
        open: boolean;
        title: string;
        msg: string;
    }>({
        open: false,
        title: '',
        msg: '',
    });

    const handleClick = () => {
        setLoading(true);
        if (
            !user?.completeRegistration?.storeCompleted ||
            !user?.completeRegistration?.offerCompleted
        ) {
            GetFirstStore()
                .then((data) => {
                    dispatch(companyActions.setSelectedStore(data));
                    if (!user?.completeRegistration?.storeCompleted) {
                        setLoading(false);
                        navigation.navigate('structureGroup', {
                            screen: 'UpdateStore',
                            initial: false,
                        });
                    } else if (!user?.completeRegistration?.offerCompleted) {
                        setLoading(false);
                        navigation.navigate('structureGroup', {
                            screen: 'AddOffer',
                            initial: false,
                        });
                    }
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                    setAlert({
                        open: true,
                        title: 'ERROR',
                        msg:
                            'Veuillez ajouter au moins une boutique pour pouvoir compléter la configuration.',
                    });
                });
        } else if (!user?.completeRegistration?.profileCompleted) {
            setLoading(false);
            // Todo navigate to profile screen when it's done
            navigation.navigate('menuGroup', {
                screen: 'Profile',
                initial: false,
            });
        }
    };
    return (
        <>
            <Infodialog
                isOpen={alert.open}
                onClose={() => {
                    setAlert((old) => ({ ...old, open: false }));
                    navigation.navigate('structureGroup', {
                        screen: 'MyStructures',
                        initial: false,
                    });
                }}
                title={alert.title}
                body={alert.msg}
            />
            <VStack
                space={5}
                margin={5}
                justifyContent="space-between"
                flexGrow={1}
            >
                <Text textAlign="left" fontFamily="body" fontSize="dm-3p">
                    <FormattedMessage
                        id="CPACCP"
                        defaultMessage="C'est presque fini, tu dois compléter quelques étapes pour être visible auprès de tes futurs clients !"
                    />
                </Text>
                <VStack space={5}>
                    <Title
                        icon={Platform?.OS === 'web' ? shopPNG : shop}
                        text={formatMessage({
                            id: 'GPCPB2',
                            defaultMessage: 'Configure ta boutique',
                        })}
                        description={formatMessage({
                            id: 'GPCPB3',
                            defaultMessage:
                                "Ajoute une photo de ta boutique, tes horaires d'ouverture, tes moyens de contact...",
                        })}
                    />
                    <Title
                        icon={Platform?.OS === 'web' ? etiquettePNG : etiquette}
                        text={formatMessage({
                            id: 'GPCPB4',
                            defaultMessage: 'Ajoute des offres',
                        })}
                        description={formatMessage({
                            id: 'GPCPB5',
                            defaultMessage:
                                'Pour attirer un maximum de clients et soutenir la Communauté Hypérion, ajoute tes meilleures offres.',
                        })}
                    />
                    <Title
                        icon={Platform?.OS === 'web' ? userPNG : userSVG}
                        text={formatMessage({
                            id: 'GPCPB6',
                            defaultMessage: 'Vérifie ton profil',
                        })}
                        description={formatMessage({
                            id: 'GPCPB7',
                            defaultMessage:
                                "Afin de garantir le bon fonctionnement et la sécurité de ton compte, ajoute un justificatif d'identité.",
                        })}
                    />
                </VStack>

                <Button
                    width={
                        Platform?.OS === 'web'
                            ? '300'
                            : Dimensions.get('window').width - 50
                    }
                    alignSelf={'center'}
                    maxWidth={
                        Platform?.OS === 'web'
                            ? '300'
                            : Dimensions.get('window').width - 50
                    }
                    spinner={loading}
                    label={formatMessage({
                        id: '4IsZks',
                        description: 'SUIVANT',
                        defaultMessage: 'SUIVANT',
                    })}
                    onPress={handleClick}
                />
            </VStack>
        </>
    );
};

export default CompleteAccountConfiguration;
