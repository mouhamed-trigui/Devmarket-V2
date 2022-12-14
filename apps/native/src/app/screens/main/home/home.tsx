import React, { useEffect, useRef } from 'react';
import { Box, Center, HStack, Image, VStack } from 'native-base';
import Card from '../../../components/atomes/card/Card';

// images png
import CustomerPng from '../../../../assets/images/png/customer.png';
import PresentationPng from '../../../../assets/images/png/presentation.png';
import image1 from '../../../../assets/images/home/image1.png';
import image2 from '../../../../assets/images/home/image2.png';
import image3 from '../../../../assets/images/home/image3.png';

import Text from '../../../components/atomes/text/text';
import PageContainer from '../../../components/atomes/container/PageContainer';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ModalDescription from '../../../components/atomes/Modal/ModalDescription';
import { IModalHomeTextProps } from '../../../services/model/company';
import { Animated, ScrollView, TouchableOpacity } from 'react-native';
import Infodialog from '../../../components/molecules/dialog/info-dialog/Infodialog';

const SmallCard = (props: {
    icon: any;
    title: string;
    text: string;
    backgroundColor: string;
    onPress?: () => void;
}) => (
    <TouchableOpacity
        onPress={props.onPress}
        style={{
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: '100%',
            minWidth: 158,
        }}
    >
        <Card backgroundColor={props.backgroundColor} style={{ flexGrow: 1 }}>
            <Image
                source={props.icon}
                style={{
                    width: 40,
                    height: 40,
                    marginBottom: 30,
                    alignSelf: 'flex-end',
                }}
                alt="customer"
            />
            <Text color="white" fontSize="dm-2p" textAlign="left">
                {props.title}
            </Text>
            <Text fontSize={12} textAlign="left">
                {props.text}
            </Text>
        </Card>
    </TouchableOpacity>
);

// create a component scroll view with animation that scroll to the right  then to the left
const ScrollViewWithAnimation = (props: {
    children: any;
    onScroll?: (event: any) => void;
}) => {
    const scrollViewRef = useRef<ScrollView>(null);

    const scrollToRef = useRef<Animated.Value>(new Animated.Value(0));

    const scrollTo = (x: number, y: number, animated: boolean) => {
        scrollToRef.current.setValue(x);
        scrollViewRef?.current?.scrollTo({ x: x, y: y, animated });
    };

    useEffect(() => {
        scrollTo(0, 0, false);
        setTimeout(() => scrollTo(120, 0, true), 500);
        setTimeout(() => scrollTo(0, 0, true), 1500);
    }, []);
    return (
        <ScrollView
            ref={scrollViewRef}
            onScroll={props.onScroll}
            horizontal
            contentContainerStyle={{
                flexGrow: 1,
            }}
            style={{
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: '100%',
                alignSelf: 'center',
                marginTop: 20,
            }}
        >
            {props.children}
        </ScrollView>
    );
};

/* eslint-disable-next-line */
export interface HomeProps {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Home(props: HomeProps) {
    const navigation = useNavigation();
    // Redux
    const { user } = useSelector((state: any) => state.user);

    const { formatMessage } = useIntl();

    const [alert, setAlert] = React.useState<{
        open: boolean;
        title: string;
        msg: string;
    }>({
        open: false,
        title: '',
        msg: '',
    });

    const textTranslated: IModalHomeTextProps = {
        title: formatMessage({
            id: 'MoDLH1',
            description: 'DEFMARKET PRO : Les ??tapes',
            defaultMessage: 'DEFMARKET PRO : Les ??tapes',
        }),

        description: formatMessage({
            id: 'MoDLH2',
            description:
                'Retrouve un tutoriel guid?? dans la section ???Mes premiers pas??? sur ton ??cran d???accueil. Tu trouveras ici toutes les grandes ??tapes pour tirer un maximum d???avantages de ton application :',
            defaultMessage:
                'Retrouve un tutoriel guid?? dans la section ???Mes premiers pas??? sur ton ??cran d???accueil. Tu trouveras ici toutes les grandes ??tapes pour tirer un maximum d???avantages de ton application :',
        }),

        step1: formatMessage({
            id: 'Modld1',
            description: '??tape 1 ',
            defaultMessage: '??tape 1 ',
        }),
        textStep1: formatMessage({
            id: 'MoDLH3',
            description: 'Ajoute ton entreprise',
            defaultMessage: 'Ajoute ton entreprise',
        }),

        step2: formatMessage({
            id: 'Modld2',
            description: '??tape 2 ',
            defaultMessage: '??tape 2 ',
        }),
        textStep2: formatMessage({
            id: 'MoDLH4',
            description: 'Ajoute et configure ta boutique',
            defaultMessage: 'Ajoute et configure ta boutique',
        }),

        step3: formatMessage({
            id: 'Modld3',
            description: '??tape 3 ',
            defaultMessage: '??tape 3 ',
        }),
        textStep3: formatMessage({
            id: 'MoDLH6',
            description: 'Ajoute tes offres',
            defaultMessage: 'Ajoute tes offres',
        }),

        step4: formatMessage({
            id: 'Modld4',
            description: '??tape 4 ',
            defaultMessage: '??tape 4 ',
        }),
        textStep4: formatMessage({
            id: 'MoDLH7',
            description: 'D??couvre tes nouveaux clients???',
            defaultMessage: 'D??couvre tes nouveaux clients???',
        }),

        question: formatMessage({
            id: 'MoDH12',
            description: 'Comment fonctionnent les offres pour tes clients ?',
            defaultMessage:
                'Comment fonctionnent les offres pour tes clients ?',
        }),

        description1: formatMessage({
            id: 'MoDLH8',
            description:
                "Ils se rendent dans ta boutique et te pr??sentent l'offre ?? laquelle ils sont ??ligibles",
            defaultMessage:
                "Ils se rendent dans ta boutique et te pr??sentent l'offre ?? laquelle ils sont ??ligibles",
        }),
        description2: formatMessage({
            id: 'MoDH10',
            description:
                "Tu appliques uniquement l'offre ?? laquelle le client est ??ligible.",
            defaultMessage:
                "Tu appliques uniquement l'offre ?? laquelle le client est ??ligible.",
        }),
        description3: formatMessage({
            id: 'MoDH11',
            description:
                'Pour une boutique en ligne, les clients renseignent un code promo au moment du paiement.',
            defaultMessage:
                'Pour une boutique en ligne, les clients renseignent un code promo au moment du paiement.',
        }),
    };

    const handleCheckConfiguration = () => {
        if (
            user.completeRegistrationPercentage === '100%' &&
            !user?.validatedByAdmin
        ) {
            setAlert({
                open: true,
                title: 'INFORMATION',
                msg:
                    "Aucune inqui??tude tu as bien compl??t?? ton compte ! Nos petits g??nies s'occupent de le valider rapidement.",
            });
        } else {
            navigation.navigate('CompleteAccountConfiguration');
        }
    };
    return (
        <PageContainer backgroundColor="white" contentContainerStyle={{}}>
            <Infodialog
                isOpen={alert.open}
                onClose={() => {
                    setAlert((old) => ({ ...old, open: false }));
                }}
                title={alert.title}
                body={alert.msg}
            />
            {props.show && (
                <ModalDescription
                    type="home"
                    showModal={props.show}
                    setShowModal={props.setShow}
                    dataModalHome={textTranslated}
                />
            )}
            <VStack space={3}>
                {user.completeRegistrationPercentage !== '100%' ||
                !user?.validatedByAdmin ? (
                    <Card
                        style={{ alignSelf: 'center' }}
                        width="90%"
                        action={{
                            text: 'GO !',
                            backgroundColor: '#eaae00',
                            onPress: () => {
                                handleCheckConfiguration();
                            },
                        }}
                    >
                        <Text
                            bold
                            fontSize="dm-h2"
                            textAlign="left"
                            fontFamily="mono"
                            color="#003753"
                        >
                            <FormattedMessage
                                id="HOPGC1"
                                defaultMessage="Bienvenue sur Defmarket PRO"
                            />
                        </Text>
                        <HStack space={2} marginTop="2">
                            <Text
                                textAlign="left"
                                color="#003753"
                                style={{ flexShrink: 1 }}
                            >
                                <FormattedMessage
                                    id="HOPGC2"
                                    defaultMessage="Fais v??rifier ton profil, configure ta boutique et ajoute des offres pour profiter de nos services !"
                                />
                            </Text>
                            <Box
                                alignSelf="center"
                                justifyContent="center"
                                backgroundColor="#003753"
                                borderRadius={50}
                                minWidth={50}
                                height={50}
                            >
                                <Center>
                                    <Text
                                        color="white"
                                        bold={true}
                                        fontFamily="mono"
                                    >
                                        {user?.completeRegistrationPercentage}
                                    </Text>
                                </Center>
                            </Box>
                        </HStack>
                    </Card>
                ) : (
                    <Box marginX={5}>
                        <Text
                            fontFamily="mono"
                            fontSize="dm-h2"
                            textAlign="center"
                            color="system.50"
                            style={{
                                marginBottom: 5,
                            }}
                        >
                            Communaut?? Defmarket PRO
                        </Text>
                        <VStack space={3}>
                            {/* <Text textAlign="center" color="system.50">
                                <FormattedMessage
                                    id="HOPGR1"
                                    defaultMessage="{firstName}, je tiens ?? te remercier personnellement au {br} nom de l'ensemble de notre communaut?? pour ton {br} engagement citoyen."
                                    values={{
                                        br: '\n',
                                        firstName: user.firstName,
                                    }}
                                />
                            </Text> */}
                            <Text textAlign="center" color="system.50">
                                <FormattedMessage
                                    id="HOPGR2"
                                    defaultMessage="Tu es un h??ros du quotidien qui s'engage pour le {br} bien commun, et je suis fier de te compter parmi {br} les membres de notre communaut?? !"
                                    values={{
                                        br: '\n',
                                    }}
                                />
                            </Text>
                            <Text textAlign="center" color="system.50">
                                Boubou - Association Hyp??rion D??fense
                            </Text>
                        </VStack>
                    </Box>
                )}
                <ScrollView
                    horizontal
                    contentContainerStyle={{ flexGrow: 1 }}
                    style={{
                        width: '90%',
                        alignSelf: 'center',
                        marginTop: 20,
                    }}
                >
                    <HStack
                        alignSelf="center"
                        space={5}
                        justifyContent="space-between"
                        flexGrow={1}
                    >
                        <SmallCard
                            onPress={() =>
                                navigation.navigate(
                                    'Presentation_Defmarket_Pro'
                                )
                            }
                            key="Pr??sentation"
                            icon={PresentationPng}
                            title="Mes premiers pas"
                            text="Sur Defmarket PRO"
                            backgroundColor="#00AAC7"
                        />
                        <SmallCard
                            onPress={() =>
                                navigation.navigate('defmarket_next_features')
                            }
                            key="Bient??t"
                            icon={CustomerPng}
                            title="Bient??t"
                            text="Sur Defmarket PRO"
                            backgroundColor="#003753"
                        />
                    </HStack>
                </ScrollView>
                <ScrollViewWithAnimation>
                    <HStack space={6}>
                        <Image
                            source={image1}
                            style={{
                                width: 300,
                                height: 200,
                                resizeMode: 'cover',
                                borderTopRightRadius: 10,
                                borderBottomRightRadius: 10,
                            }}
                            alt="photo1"
                        />

                        <Image
                            source={image2}
                            style={{
                                width: 300,
                                height: 200,
                                resizeMode: 'cover',
                                borderRadius: 10,
                            }}
                            alt="photo2"
                        />

                        <Image
                            source={image3}
                            style={{
                                width: 300,
                                height: 200,
                                resizeMode: 'cover',
                                borderRadius: 10,
                            }}
                            alt="photo3"
                        />
                    </HStack>
                </ScrollViewWithAnimation>
            </VStack>
        </PageContainer>
    );
}

export default Home;
