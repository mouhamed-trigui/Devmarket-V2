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
                'Apprends ?? conna??tre ta nouvelle interface Defmarket PRO !',
            marginBottom: 3,
            hasButton: false,
            content: [
                {
                    type: 'text',
                    value:
                        "L'espace business se situe au bas de ton ??cran, dans la barre des t??ches.",
                },
                { type: 'image', value: monEspace },
                {
                    type: 'text',
                    value:
                        "Tu y trouveras tous les outils pour cr??er, modifier ou supprimer tes entreprises. C'est ??galement ici que tu pourras ajouter les offres que tu souhaites proposer ?? notre communaut??.",
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
            description: "C'est parti pour la premi??re ??tape !",
            marginBottom: 3,
            hasButton: false,
            content: [
                {
                    type: 'text',
                    value:
                        'Une entreprise correspond ?? une entit?? administrative, qui peut poss??der plusieurs points de vente : les boutiques. Tu peux en ajouter autant que tu en poss??des.',
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
                        "Une boutique correspond ?? un point de vente, qu'il soit physique ou en ligne. Tu peux renseigner son nom, son adresse, ses horaires, ses coordonn??es, ainsi que le lien de son site internet ou de ses r??seaux sociaux. Tu as ??galement la possibilit??  d'indiquer le secteur d'activit?? de ta boutique afin que les utilisateurs la trouvent plus facilement.",
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
            description: "D??couvre le syst??me d'offres Defmarket PRO !",
            marginBottom: 3,
            hasButton: false,
            content: [
                {
                    type: 'text',
                    value:
                        "Une offre correspond ?? l'avantage que tu souhaites offrir ?? la communaut?? Hyp??rion dans une boutique donn??e. Chaque boutique poss??de donc ses propres offres. Cela te permet de diff??rencier les avantages que tu proposes en fonction de tes points de vente.",
                },
                { type: 'image', value: MesOffres2 },
                { type: 'image', value: offres },
                { type: 'image', value: MesOffres4 },
                {
                    type: 'text',
                    value:
                        'Tu pourras donc les adapter selon la localisation de ta boutique ou encore tes diff??rents types de client??les. Elles peuvent concerner un de tes produits ou services, plusieurs ou m??me la totalit??.\n',
                },
                {
                    type: 'text',
                    value: 'Tu peux aussi d??terminer leur dur??e.\n',
                },
                {
                    type: 'text',
                    value:
                        "Tu es totalement libre des offres que tu souhaites publier et tu peux en cr??er un nombre illimit??. Toutefois, pour garder le niveau d'attractivit?? de l'application, et conform??ment aux CGU, il est n??cessaire d???assurer un niveau d'offres le plus ??lev?? vis-??-vis des autres plateformes sur lesquelles tu es pr??sent.\n",
                },
            ],
        },
        {
            title: 'Cr??er Mes Offres',
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
                'Attache ta ceinture et fais d??coller ta visibilit??, en proposant tes meilleures offres ?? notre communaut?? !',
            marginBottom: 3,
            hasButton: false,
            content: [
                {
                    type: 'text',
                    value:
                        'Pour ??tre visible aupr??s de tes clients, tu dois publier des offres sur ta boutique. Pas de panique : rien de plus simple !\n\nTu as trois possibilit??s : tu peux offrir un pourcentage promotionnel, une r??duction mon??taire fixe ou un bon plan.',
                },
                { type: 'image', value: typePromo },
                {
                    type: 'text',
                    value:
                        "Renseigne uniquement l'offre la plus importante que tu es en mesure d'offrir, nous nous occupons du reste. L'application cr??era automatiquement trois niveaux d'avantage pour cette offre, en fonction du maximum que tu auras renseign??.",
                },
                { type: 'image', value: promos2 },
                {
                    type: 'text',
                    value:
                        "Ces trois niveaux d'avantage correspondent aux trois cat??gories d'utilisateurs de l'app Defmarket :",
                },
                {
                    type: 'custom_text',
                    value: "L'offre la plus haute :",
                },
                {
                    type: 'text',
                    value:
                        "Elle correspond ?? l'offre la plus importante que tu es en mesure d'offrir. C'est aussi la seule offre que tu auras ?? renseigner.\nElle est accessible uniquement aux membres b??n??voles de l'association Hyp??rion D??fense et aux membres de ses structures partenaires.",
                },
                { type: 'image', value: promos4 },
                {
                    type: 'custom_text',
                    value: 'Offre interm??diaire :',
                },
                {
                    type: 'text',
                    value:
                        "Elle correspond aux deux tiers de l'offre la plus importante que tu es en mesure d'offrir. Il n'est pas n??cessaire de la modifier, elle se cr??e automatiquement. Elle est accessible uniquement aux adh??rents de l'association Hyp??rion D??fense, b??n??ficiant de la version payante de Defmarket. Ces fonds sont utilis??s pour mener des actions sociales en faveur de la Communaut?? Hyp??rion.",
                },
                { type: 'image', value: promos5 },
                {
                    type: 'custom_text',
                    value: 'Offre la plus basse :',
                },
                {
                    type: 'text',
                    value:
                        "Elle correspond au tiers de l'offre la plus importante que tu es en mesure d'offrir. Il n'est pas n??cessaire de la modifier, elle se cr??e automatiquement. Elle est accessible ?? tous les utilisateurs de l'application Defmarket.",
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
                                {'   '}Lors de la cr??ation d'une offre, celle-ci
                                est soumise ?? validation par les administrateurs
                                de l'application, avant d'??tre visible par ta
                                nouvelle client??le. Ceci dans le but de
                                t'accompagner et te proposer un service
                                s??curis??. Ton offre ne sera donc pas visible
                                tout de suite. Mais pas de panique, nos
                                administrateurs valideront ton offre dans les
                                plus brefs d??lais.
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
                'Pour b??n??ficier de tes offres exclusives, les utilisateurs devront montrer patte blanche !',
            marginBottom: 3,
            hasButton: false,
            content: [
                {
                    type: 'text',
                    value:
                        "Pour que la Communaut?? Defmarket profite de tes offres, rien n'est plus simple !",
                },
                {
                    type: 'custom_text',
                    value: 'Boutique physique :',
                },
                {
                    type: 'text',
                    value:
                        "Tes clients te pr??senteront l'offre ?? laquelle ils sont ??ligibles directement sur leur smartphone. Tu n'auras alors plus qu'?? l'appliquer sur les achats des membres Defmarket",
                },
                { type: 'image', value: BoutiquePhysique },
                {
                    type: 'custom_text',
                    value: 'Boutique en ligne :',
                },
                {
                    type: 'text',
                    value:
                        'Lors de la cr??ation de ton offre, renseigne trois codes promotionnels, que les membres de la Communaut?? pourront saisir lors du paiement sur ton site internet.',
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
                    D??couvre ta plateforme en toute simplicit?? et ma??trise
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
