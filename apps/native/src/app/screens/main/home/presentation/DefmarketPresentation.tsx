import React, { useState } from 'react';
import { Platform } from 'react-native';
import { Box, Divider, Modal, VStack } from 'native-base';
import { Text } from '../../../../components/atomes';
import PageContainer from '../../../../components/atomes/container/PageContainer';
import { system, secondary } from '../../../../theme/colors';
import { IFeatureDescriptionProps } from '../../../../services/model/company';

//images png
import businessPNG from '../../../../../assets/images/png/cible.png';
import entreprisePNG from '../../../../../assets/images/png/bureau-bleu-f_bis.png';
import boutiquePNG from '../../../../../assets/images/png/shop-bleu-f.png';
import offerPNG from '../../../../../assets/images/png/etiquette-de-vente_bis.png';
import CreateOfferPNG from '../../../../../assets/images/png/modifier_bis.png';
import clientsDefmarketPNG from '../../../../../assets/images/png/clients.png';
import monEspace from '../../../../../assets/images/Premiers-Pas/images/mon-espace-business.png';
import MesEntreprises from '../../../../../assets/images/Premiers-Pas/images/Mes-entreprises.png';
import MesBoutiques from '../../../../../assets/images/Premiers-Pas/images/Mes-boutiques.png';
import MesOffres2 from '../../../../../assets/images/Premiers-Pas/images/Mes-Offres-2.png';
import offres from '../../../../../assets/images/Premiers-Pas/images/offres.png';
import MesOffres4 from '../../../../../assets/images/Premiers-Pas/images/Mes-Offres-4.png';
import typePromo from '../../../../../assets/images/Premiers-Pas/images/type-promo.png';
import promos2 from '../../../../../assets/images/Premiers-Pas/images/promos2.png';
import promos4 from '../../../../../assets/images/Premiers-Pas/images/promos4.png';
import promos5 from '../../../../../assets/images/Premiers-Pas/images/promos5.png';
import promos6 from '../../../../../assets/images/Premiers-Pas/images/promos6.png';
import BoutiqueEnLigne from '../../../../../assets/images/Premiers-Pas/images/Boutique-en-ligne.png';
import BoutiquePhysique from '../../../../../assets/images/Premiers-Pas/images/Boutique-Physique.png';

//images svg
import BusinessSVG from '../../../../../assets/images/svg/cible.svg';
import EntrepriseSVG from '../../../../../assets/images/svg/bureau-bleu-f_bis.svg';
import BoutiqueSVG from '../../../../../assets/images/svg/shop-bleu-f.svg';
import OfferSVG from '../../../../../assets/images/svg/etiquette-de-vente_bis.svg';
import CreateOfferSVG from '../../../../../assets/images/svg/modifier_bis.svg';
import ClientsDefmarketSVG from '../../../../../assets/images/svg/clients.svg';

// Modal Content
import DefmarketFeatures from '../../../../components/molecules/defmarket-features/DefmarketFeatures';

// atome feature
import Feature from '../../../../components/atomes/feature/Feature';

const DefmarketPresentation = () => {
    // modal feature description
    const [showModal, setShowModal] = React.useState(false);

    // Feature
    const [features, setFeatures] = React.useState<IFeatureDescriptionProps[]>([
        {
            title: 'Mon Espace Business',
            icon:
                Platform.OS === 'web' ? (
                    businessPNG
                ) : (
                    <BusinessSVG
                        style={{
                            width: 20,
                            height: 20,
                        }}
                    />
                ),
            description:
                'Apprends à connaître ta nouvelle interface Defmarket PRO !',
            marginBottom: 3,
            hasButton: false,
            content: [
                {
                    type: 'text',
                    value:
                        "L'espace business se situe au bas de ton écran, dans la barre des tâches.",
                },
                { type: 'image', value: monEspace },
                {
                    type: 'text',
                    value:
                        "Tu y trouveras tous les outils pour créer, modifier ou supprimer tes entreprises. C'est également ici que tu pourras ajouter les offres que tu souhaites proposer à notre communauté.",
                },
            ],
        },
        {
            title: 'Mes Entreprises',
            icon:
                Platform.OS === 'web' ? (
                    entreprisePNG
                ) : (
                    <EntrepriseSVG
                        style={{
                            width: 20,
                            height: 20,
                        }}
                    />
                ),
            description: "C'est parti pour la première étape !",
            marginBottom: 3,
            hasButton: false,
            content: [
                {
                    type: 'text',
                    value:
                        'Une entreprise correspond à une entité administrative, qui peut posséder plusieurs points de vente : les boutiques. Tu peux en ajouter autant que tu en possèdes.',
                },
                { type: 'image', value: MesEntreprises },
            ],
        },
        {
            title: 'Mes Boutiques',
            icon:
                Platform.OS === 'web' ? (
                    boutiquePNG
                ) : (
                    <BoutiqueSVG
                        style={{
                            width: 20,
                            height: 20,
                        }}
                    />
                ),
            description: 'Dis nous en plus sur ton commerce !',
            marginBottom: 3,
            hasButton: false,
            content: [
                {
                    type: 'text',
                    value:
                        "Une boutique correspond à un point de vente, qu'il soit physique ou en ligne. Tu peux renseigner son nom, son adresse, ses horaires, ses coordonnées, ainsi que le lien de son site internet ou de ses réseaux sociaux. Tu as également la possibilité  d'indiquer le secteur d'activité de ta boutique afin que les utilisateurs la trouvent plus facilement.",
                },
                { type: 'image', value: MesBoutiques },
            ],
        },
        {
            title: 'Mes Offres',
            icon:
                Platform.OS === 'web' ? (
                    offerPNG
                ) : (
                    <OfferSVG
                        style={{
                            width: 20,
                            height: 20,
                        }}
                    />
                ),
            description: "Découvre le système d'offres Defmarket PRO !",
            marginBottom: 3,
            hasButton: false,
            content: [
                {
                    type: 'text',
                    value:
                        "Une offre correspond à l'avantage que tu souhaites offrir à la communauté Hypérion dans une boutique donnée. Chaque boutique possède donc ses propres offres. Cela te permet de différencier les avantages que tu proposes en fonction de tes points de vente.",
                },
                { type: 'image', value: MesOffres2 },
                { type: 'image', value: offres },
                { type: 'image', value: MesOffres4 },
                {
                    type: 'text',
                    value:
                        'Tu pourras donc les adapter selon la localisation de ta boutique ou encore tes différents types de clientèles. Elles peuvent concerner un de tes produits ou services, plusieurs ou même la totalité.\n',
                },
                {
                    type: 'text',
                    value: 'Tu peux aussi déterminer leur durée.\n',
                },
                {
                    type: 'text',
                    value:
                        "Tu es totalement libre des offres que tu souhaites publier et tu peux en créer un nombre illimité. Toutefois, pour garder le niveau d'attractivité de l'application, et conformément aux CGU, il est nécessaire d’assurer un niveau d'offres le plus élevé vis-à-vis des autres plateformes sur lesquelles tu es présent.\n",
                },
            ],
        },
        {
            title: 'Créer Mes Offres',
            icon:
                Platform.OS === 'web' ? (
                    CreateOfferPNG
                ) : (
                    <CreateOfferSVG
                        style={{
                            width: 20,
                            height: 20,
                        }}
                    />
                ),
            description:
                'Attache ta ceinture et fais décoller ta visibilité, en proposant tes meilleures offres à notre communauté !',
            marginBottom: 3,
            hasButton: false,
            content: [
                {
                    type: 'text',
                    value:
                        'Pour être visible auprès de tes clients, tu dois publier des offres sur ta boutique. Pas de panique : rien de plus simple !\n\nTu as trois possibilités : tu peux offrir un pourcentage promotionnel, une réduction monétaire fixe ou un bon plan.',
                },
                { type: 'image', value: typePromo },
                {
                    type: 'text',
                    value:
                        "Renseigne uniquement l'offre la plus importante que tu es en mesure d'offrir, nous nous occupons du reste. L'application créera automatiquement trois niveaux d'avantage pour cette offre, en fonction du maximum que tu auras renseigné.",
                },
                { type: 'image', value: promos2 },
                {
                    type: 'text',
                    value:
                        "Ces trois niveaux d'avantage correspondent aux trois catégories d'utilisateurs de l'app Defmarket :",
                },
                {
                    type: 'custom_text',
                    value: "L'offre la plus haute :",
                },
                {
                    type: 'text',
                    value:
                        "Elle correspond à l'offre la plus importante que tu es en mesure d'offrir. C'est aussi la seule offre que tu auras à renseigner.\nElle est accessible uniquement aux membres bénévoles de l'association Hypérion Défense et aux membres de ses structures partenaires.",
                },
                { type: 'image', value: promos4 },
                {
                    type: 'custom_text',
                    value: 'Offre intermédiaire :',
                },
                {
                    type: 'text',
                    value:
                        "Elle correspond aux deux tiers de l'offre la plus importante que tu es en mesure d'offrir. Il n'est pas nécessaire de la modifier, elle se crée automatiquement. Elle est accessible uniquement aux adhérents de l'association Hypérion Défense, bénéficiant de la version payante de Defmarket. Ces fonds sont utilisés pour mener des actions sociales en faveur de la Communauté Hypérion.",
                },
                { type: 'image', value: promos5 },
                {
                    type: 'custom_text',
                    value: 'Offre la plus basse :',
                },
                {
                    type: 'text',
                    value:
                        "Elle correspond au tiers de l'offre la plus importante que tu es en mesure d'offrir. Il n'est pas nécessaire de la modifier, elle se crée automatiquement. Elle est accessible à tous les utilisateurs de l'application Defmarket.",
                },
                { type: 'image', value: promos6 },
                {
                    type: 'custom_text',
                    hideLeftCercleIcon: true,
                    value: (
                        <>
                            <Text
                                color={system[50]}
                                fontFamily="mono"
                                fontSize="dm-h2"
                            >
                                Remarque :
                            </Text>
                            <Text
                                color={system[50]}
                                fontFamily="body"
                                fontSize="dm-p"
                                textAlign="justify"
                            >
                                {'   '}Lors de la création d'une offre, celle-ci
                                est soumise à validation par les administrateurs
                                de l'application, avant d'être visible par ta
                                nouvelle clientèle. Ceci dans le but de
                                t'accompagner et te proposer un service
                                sécurisé. Ton offre ne sera donc pas visible
                                tout de suite. Mais pas de panique, nos
                                administrateurs valideront ton offre dans les
                                plus brefs délais.
                            </Text>
                        </>
                    ),
                },
            ],
        },
        {
            title: 'Mes Clients Defmarket',
            icon:
                Platform.OS === 'web' ? (
                    clientsDefmarketPNG
                ) : (
                    <ClientsDefmarketSVG
                        style={{
                            width: 20,
                            height: 20,
                        }}
                    />
                ),
            description:
                'Pour bénéficier de tes offres exclusives, les utilisateurs devront montrer patte blanche !',
            marginBottom: 3,
            hasButton: false,
            content: [
                {
                    type: 'text',
                    value:
                        "Pour que la Communauté Defmarket profite de tes offres, rien n'est plus simple !",
                },
                {
                    type: 'custom_text',
                    value: 'Boutique physique :',
                },
                {
                    type: 'text',
                    value:
                        "Tes clients te présenteront l'offre à laquelle ils sont éligibles directement sur leur smartphone. Tu n'auras alors plus qu'à l'appliquer sur les achats des membres Defmarket",
                },
                { type: 'image', value: BoutiquePhysique },
                {
                    type: 'custom_text',
                    value: 'Boutique en ligne :',
                },
                {
                    type: 'text',
                    value:
                        'Lors de la création de ton offre, renseigne trois codes promotionnels, que les membres de la Communauté pourront saisir lors du paiement sur ton site internet.',
                },
                { type: 'image', value: BoutiqueEnLigne },
            ],
        },
    ]);

    const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(0);

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
                    animationPreset={'slide'}
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
                    Mon petit guide
                </Text>
                <Text
                    textAlign="justify"
                    color={system[50]}
                    fontFamily="body"
                    fontSize="dm-p"
                >
                    Découvre ta plateforme en toute simplicité et maîtrise
                    l'outil Defmarket PRO en moins de 5 minutes.
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
                                hasButton={feature.hasButton}
                                buttonName="En savoir plus"
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

export default DefmarketPresentation;
