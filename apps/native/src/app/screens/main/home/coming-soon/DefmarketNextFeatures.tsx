import { Box, Divider, Modal, VStack } from 'native-base';
import React, { useState } from 'react';
import { Text } from '../../../../components/atomes';
import PageContainer from '../../../../components/atomes/container/PageContainer';
import { secondary, system } from '../../../../theme/colors';
import { Platform } from 'react-native';

// images png
import LineBPNG from '../../../../../assets/images/png/LineB.png';
import statistiqueP from '../../../../../assets/images/png/statistique.png';
import CustomerPng from '../../../../../assets/images/png/customer_bis.png';

// images svg
import LineBSVG from '../../../../../assets/images/svg/LineB.svg';
import Statistique from '../../../../../assets/images/svg/statistique.svg';
import Customer from '../../../../../assets/images/svg/customer_bis.svg';

// Images
import Defmarket from '../../../../../assets/images/illustration/Defmarket.jpg';
import Defmarket_1 from '../../../../../assets/images/illustration/Defmarket_1.jpg';
import Defmarket_2 from '../../../../../assets/images/illustration/Defmarket_2.jpg';
import Defmarket_3 from '../../../../../assets/images/illustration/Defmarket_3.jpg';

// Data Model
import { IFeatureDescriptionProps } from '../../../../services/model/company';

// Modal Content
import DefmarketFeatures from '../../../../components/molecules/defmarket-features/DefmarketFeatures';

// Atome feature
import Feature from '../../../../components/atomes/feature/Feature';

const DefmarketNextFeatures = () => {
    // modal state
    const [showModal, setShowModal] = React.useState(false);

    // feature data
    const [features, setFeatures] = React.useState<IFeatureDescriptionProps[]>([
        {
            title: 'Billetterie',
            icon:
                Platform.OS === 'web' ? (
                    LineBPNG
                ) : (
                    <LineBSVG
                        style={{
                            width: 20,
                            height: 20,
                        }}
                    />
                ),
            description:
                "Toutes tes exp??riences Loisirs & Culture accessibles en un seul clic. Defmarket PRO te propose une s??lection d'offres exceptionnelles !",
            status: 'in_development',
            hasButton: false,
            content: [
                {
                    type: 'text',
                    value:
                        "Envie d'aller au cin??ma ? Au bowling ? De passer une journ??e de folie dans un parc d'attractions ? Defmarket PRO est l?? pour toi !\nVia ton application, tu auras bient??t un acc??s gratuitement ?? un espace billetterie. Au programme, des entr??es ?? prix r??duits dans tous tes lieux de divertissement favoris !",
                },
                { type: 'image', value: Defmarket },
                {
                    type: 'text',
                    value:
                        "Tu pourras acheter directement tes places, billets, pass et tickets sur Defmarket PRO, et les recevoir sur ton t??l??phone. Pratique non ?\nEt c'est pas fini??? Tu pourras m??me ??conomiser sur tes prochaines vacances au soleil ou ?? la montagne !",
                },
                { type: 'image', value: Defmarket_2 },
                {
                    type: 'text',
                    value:
                        'Tu seras inform?? par une petite notification, d??s le lancement de la fonctionnalit??.',
                },
            ],
        },
        {
            title: 'Statistiques',
            icon:
                Platform.OS === 'web' ? (
                    statistiqueP
                ) : (
                    <Statistique
                        style={{
                            width: 20,
                            height: 20,
                        }}
                    />
                ),
            description:
                'Apprends ?? mieux conna??tre tes clients ! Gr??ce ?? nos outils, tu auras acc??s en temps r??el aux informations cl??s sur leurs habitudes de consommation.',
            status: 'under_design',
            hasButton: false,
            content: [
                {
                    type: 'text',
                    value:
                        "Cette nouvelle fonctionnalit?? te permettra de mesurer la performance de ton commerce.\n \nTu auras par exemple acc??s au nombre de visites sur tes offres, au nombre de redirections sur ton site web ou encore au nombre des tes acheteurs.\n \nDes donn??es tr??s utiles pour augmenter toujours plus la visibilit?? de tes produits et services. Et ce n'est pas tout??? Tu recevras ??galement un accompagnement personnalis??, afin de t'aider ?? parfaitement communiquer aupr??s de nos utilisateurs.",
                },
                { type: 'image', value: Defmarket_1 },
            ],
        },
        {
            title: 'Services Exclusifs',
            icon:
                Platform.OS === 'web' ? (
                    CustomerPng
                ) : (
                    <Customer
                        style={{
                            width: 20,
                            height: 20,
                        }}
                    />
                ),
            description:
                "Parce que ton engagement est important pour nous, nous souhaitons t'accompagner au mieux dans ta vie personnelle comme professionnelle. Car ensemble, on va plus loin !",
            status: 'under_design',
            hasButton: false,
            content: [
                {
                    type: 'text',
                    value:
                        "Nous te pr??parons un cocktail des meilleurs services, adapt??s ?? tes besoins et ?? tes envies.\n \nTu pourras acc??der ?? notre conciergerie Defmarket, qui se fera une joie de t'aider au quotidien. Louer un v??hicule, trouver une nounou ou encore d??velopper son business, n'aura jamais ??t?? aussi facile !",
                },
                { type: 'image', value: Defmarket_3 },
            ],
        },
    ]);

    const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(0);

    // function to open modal
    const handleMoreInfo = (index: number) => {
        setSelectedFeatureIndex(index);
        setShowModal(true);
    };

    return (
        <PageContainer>
            {showModal && (
                <Modal
                    isOpen={showModal}
                    size="full"
                    animationPreset="slide"
                    onClose={() => setShowModal(false)}
                >
                    <Modal.Content
                        maxHeight="93%"
                        width="100%"
                        style={{
                            marginBottom: 0,
                            marginTop: 'auto',
                            borderRadius: 0,
                            borderTopRightRadius: 20,
                            borderTopLeftRadius: 20,
                        }}
                    >
                        <Modal.CloseButton />
                        <DefmarketFeatures
                            data={features[selectedFeatureIndex]}
                        />
                    </Modal.Content>
                </Modal>
            )}
            <VStack space={3} marginX={5}>
                <Text color={system[50]} fontFamily="mono" fontSize="dm-h1">
                    Les surprises ?? venir...
                </Text>
                <Text
                    textAlign="justify"
                    color={system[50]}
                    fontFamily="body"
                    fontSize="dm-p"
                >
                    Notre association s'engage ??galement ?? tes c??t??s.{'\n'}Nous
                    allons am??liorer ton espace de gestion et mettre ?? ta
                    disposition des services exclusifs.{'\n'}
                    {'\n'}Tu fais d??sormais partie de la Communaut?? Hyp??rion !
                </Text>
            </VStack>
            <Divider bgColor={secondary[50]} thickness={2} my={6} />
            <VStack space={5} marginX={5}>
                {features &&
                    features.map((feature, i) => (
                        <VStack space={5} key={i}>
                            <Feature
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                                buttonName="En savoir plus"
                                status={feature.status}
                                hasButton={feature.hasButton}
                                actions={() => handleMoreInfo(i)}
                                content={feature.content}
                            />
                            {features.length - 1 !== i && (
                                <Divider
                                    bgColor={system[100]}
                                    thickness={1}
                                    width="60%"
                                    alignSelf="center"
                                />
                            )}
                        </VStack>
                    ))}
            </VStack>
            {(Platform.OS === 'android' || Platform.OS === 'ios') && (
                <Box marginBottom={10} />
            )}
        </PageContainer>
    );
};

export default DefmarketNextFeatures;
