import React, { useState, useEffect, useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { View, HStack, Icon, VStack, IconButton } from 'native-base';
import { Dimensions, Image, Platform } from 'react-native';
import { Button, Text } from '../../../../../components/atomes';
import DatePickerModal from '../../../../../components/atomes/datePicker/DatePickerModal';
import {
    FileType,
    IModalOfferTextProps,
    IOffreProps,
} from '../../../../../services/model/company';
import { Ionicons } from '@expo/vector-icons';
import { primary } from '../../../../../theme/colors';
import {
    FormControl,
    FormControlSelect,
    FormControlTextarea,
} from '../../../../../components/molecules';
import { useDispatch, useSelector } from 'react-redux';
import AddSVG from '../../../../../../assets/images/svg/bouton-ajouter.svg';

import {
    updateOfferFile,
    updateOfferImage,
    updateOffre,
} from '../../../../../services/methodes/offre';
import ReductionCard from '../../../../../components/atomes/offer-card/ReductionCard';
import FilePicker from '../../../../../components/organisms/file-picker/FilePicker';
import ImagePicker from '../../../../../components/organisms/image-picker/ImagePicker';
import PhotoSVG from '../../../../../../assets/images/svg/photo-white.svg';
import image from '../../../../../../assets/images/png/image.png';
import { useNavigation } from '@react-navigation/native';
import Infodialog from '../../../../../components/molecules/dialog/info-dialog/Infodialog';
import { companyActions } from '../../../../../stores/slices/company/companySlice';
import { getFileURL } from '../../../../../services/constants/api';
import { userActions } from '../../../../../stores/slices';
import { SpinnerContext } from '../../../../../components/atomes/spinner/SpinnerProvider';
import ModalDescription from '../../../../../components/atomes/Modal/ModalDescription';
import InfoIconWhite from '../../../../../../assets/images/png/information.png';

interface IValueProps {
    minimum: string | undefined;
    medium: string | undefined;
    premium: string | undefined;
}

export interface IUpdateOfferProps {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditOffer = (props: IUpdateOfferProps) => {
    const { selectedStore, selectedOffer } = useSelector(
        (state: any) => state.company
    );

    const { user } = useSelector((state: any) => state.user);

    const [dataOffre, setdataOffre] = useState<IOffreProps>(selectedOffer);

    const [values, setValues] = useState<IValueProps | undefined>(undefined);

    const [isValidOffre, setIsValidOffre] = useState(false);

    const navigation = useNavigation();

    const dispatch = useDispatch();

    const { formatMessage } = useIntl();

    const { setSpinnerVisibility } = useContext(SpinnerContext);

    const [alert, setAlert] = React.useState<{
        open: boolean;
        title?: string;
        msg: string;
    }>({
        open: false,
        title: '',
        msg: '',
    });

    const [duplicatedCodeReduction, setDuplicatedCodeReduction] = useState(
        false
    );

    const textTranslated: IModalOfferTextProps = {
        title: formatMessage({
            id: 'MODoF1',
            description: 'AJOUTE UNE OFFRE : Les ??tapes',
            defaultMessage: 'AJOUTE UNE OFFRE : Les ??tapes',
        }),
        description: formatMessage({
            id: 'MODoF2',
            description:
                "Retrouve un tutoriel guid?? dans la section ???Mes premiers pas??? sur ton ??cran d???accueil. Tu trouveras ici toutes les grandes ??tapes pour tirer un maximum d'avantages de ton application :",
            defaultMessage:
                "Retrouve un tutoriel guid?? dans la section ???Mes premiers pas??? sur ton ??cran d???accueil. Tu trouveras ici toutes les grandes ??tapes pour tirer un maximum d'avantages de ton application :",
        }),
        step1: formatMessage({
            id: 'Modld1',
            description: '??tape 1 : ',
            defaultMessage: '??tape 1 : ',
        }),
        textStep1: formatMessage({
            id: 'MODoF3',
            description: 'Donne un nom ?? ton offre',
            defaultMessage: 'Donne un nom ?? ton offre',
        }),
        step2: formatMessage({
            id: 'Modld2',
            description: '??tape 2 : ',
            defaultMessage: '??tape 2 : ',
        }),
        textStep2: formatMessage({
            id: 'MODoF4',
            description:
                'Renseigne le type de promotion que tu souhaites proposer (pourcentage, montant fixe, bon plan)',
            defaultMessage:
                'Renseigne le type de promotion que tu souhaites proposer (pourcentage, montant fixe, bon plan)',
        }),
        step3: formatMessage({
            id: 'Modld3',
            description: '??tape 3 : ',
            defaultMessage: '??tape 3 : ',
        }),
        textStep3: formatMessage({
            id: 'MODoF5',
            description: 'Renseigne la valeur de ton offre',
            defaultMessage: 'Renseigne la valeur de ton offre',
        }),
        step4: formatMessage({
            id: 'Modld4',
            description: '??tape 4 : ',
            defaultMessage: '??tape 4 : ',
        }),
        textStep4: formatMessage({
            id: 'MODoF6',
            description:
                'Pr??cise les conditions de cette offre. Exemples : d??s 30??? d???achat, d??s l???achat de 2 articles???',
            defaultMessage:
                'Pr??cise les conditions de cette offre. Exemples : d??s 30??? d???achat, d??s l???achat de 2 articles???',
        }),
        step5: formatMessage({
            id: 'Modld5',
            description: '??tape 5 : ',
            defaultMessage: '??tape 5 : ',
        }),
        textStep5: formatMessage({
            id: 'MODoF7',
            description: 'Ajoute une description attractive ?? ton offre',
            defaultMessage: 'Ajoute une description attractive ?? ton offre',
        }),
        step6: formatMessage({
            id: 'Modld6',
            description: '??tape 6 : ',
            defaultMessage: '??tape 6 : ',
        }),
        textStep6: formatMessage({
            id: 'MODoF8',
            description:
                'Renseigne les dates de validit?? de ton offre. La date de d??marrage est obligatoire mais la date d???expiration ne l???est pas',
            defaultMessage:
                'Renseigne les dates de validit?? de ton offre. La date de d??marrage est obligatoire mais la date d???expiration ne l???est pas',
        }),
        question: formatMessage({
            id: 'MoDH13',
            description:
                'Comment fonctionnent la configuration de tes offres ?',
            defaultMessage:
                'Comment fonctionnent la configuration de tes offres ?',
        }),
        title1: formatMessage({
            id: 'MoDH14',
            description: 'Quelques pr??cisions sur les 3 niveaux d???offres.',
            defaultMessage: 'Quelques pr??cisions sur les 3 niveaux d???offres.',
        }),
        percentage: formatMessage({
            id: 'MODo10',
            description: '???pourcentage???',
            defaultMessage: '???pourcentage???',
        }),
        reduction: formatMessage({
            id: 'MODa10',
            description: '???r??duction fixe???',
            defaultMessage: '???r??duction fixe???',
        }),
        bonPlan: formatMessage({
            id: 'MODb10',
            description: '???bon plan???',
            defaultMessage: '???bon plan???',
        }),
        example1: formatMessage({
            id: 'MODo12',
            description: 'Exemple : 25%',
            defaultMessage: 'Exemple : 25%',
        }),
        example2: formatMessage({
            id: 'MODo13',
            description: 'Exemple : 10???',
            defaultMessage: 'Exemple : 10???',
        }),
        example3: formatMessage({
            id: 'MODo14',
            description:
                'Exemples : 3 articles achet??s 1 article offert (offre minimum), 2 articles achet??s 1 article offert (offre m??dium), 1 articles achet??s 1 article offert (offre maximum)',
            defaultMessage:
                'Exemples : 3 articles achet??s 1 article offert (offre minimum), 2 articles achet??s 1 article offert (offre m??dium), 1 articles achet??s 1 article offert (offre maximum)',
        }),
        description1: formatMessage({
            id: 'MODoF9',
            description: 'Si tu optes pour l???option ',
            defaultMessage: 'Si tu optes pour l???option ',
        }),
        description2: formatMessage({
            id: 'MODo11',
            description:
                ', il te faudra renseigner le pourcentage maximum de r??duction que tu es en mesure de proposer.\n \n',
            defaultMessage:
                ', il te faudra renseigner le pourcentage maximum de r??duction que tu es en mesure de proposer.\n \n',
        }),
        description4: formatMessage({
            id: 'MODo15',
            description:
                ', il te faudra renseigner le montant maximum de r??duction que tu es en mesure de proposer.\n \n',
            defaultMessage:
                ', il te faudra renseigner le montant maximum de r??duction que tu es en mesure de proposer.\n \n',
        }),
        description5: formatMessage({
            id: 'MODo16',
            description:
                ', il te faudra en renseigner 3, du moins important au plus important.\n \n',
            defaultMessage:
                ', il te faudra en renseigner 3, du moins important au plus important.\n \n',
        }),

        description6: formatMessage({
            id: 'MODo17',
            description:
                'Lorsque tu publies une offre en pourcentage ou en montant fixe, ',
            defaultMessage:
                'Lorsque tu publies une offre en pourcentage ou en montant fixe, ',
        }),
        description7: formatMessage({
            id: 'MODo18',
            description: '3 niveaux d???offres sont automatiquement cr????s. ',
            defaultMessage: '3 niveaux d???offres sont automatiquement cr????s. ',
        }),
        description8: formatMessage({
            id: 'MODo19',
            description: " Ils correspondent aux 3 cat??gories d'utilisateurs :",
            defaultMessage:
                " Ils correspondent aux 3 cat??gories d'utilisateurs :",
        }),
        description9: formatMessage({
            id: 'MODo20',
            description: 'Les b??n??ficiaires de la version gratuite ',
            defaultMessage: 'Les b??n??ficiaires de la version gratuite ',
        }),
        description10: formatMessage({
            id: 'MODo21',
            description: 'de l???application auront ',
            defaultMessage: 'de l???application auront ',
        }),
        description11: formatMessage({
            id: 'MODo22',
            description: 'acc??s au niveau minimal d???offre.',
            defaultMessage: 'acc??s au niveau minimal d???offre.',
        }),
        description12: formatMessage({
            id: 'MODo23',
            description: 'Les b??n??ficiaires de la version payante ',
            defaultMessage: 'Les b??n??ficiaires de la version payante ',
        }),
        description13: formatMessage({
            id: 'MODo24',
            description: 'de l???application, ',
            defaultMessage: 'de l???application, ',
        }),
        description14: formatMessage({
            id: 'MODo25',
            description: 'cotisants ?? l???association Hyp??rion D??fense, ',
            defaultMessage: 'cotisants ?? l???association Hyp??rion D??fense, ',
        }),
        description15: formatMessage({
            id: 'MODo26',
            description: 'auront acc??s au ',
            defaultMessage: 'auront acc??s au ',
        }),
        description16: formatMessage({
            id: 'MODo27',
            description: 'niveau medium d???offre. ',
            defaultMessage: 'niveau medium d???offre. ',
        }),
        description17: formatMessage({
            id: 'MODo28',
            description: 'b??n??voles de l???association ou adh??rents ',
            defaultMessage: 'b??n??voles de l???association ou adh??rents ',
        }),
        description18: formatMessage({
            id: 'MODo29',
            description: 'aux structures partenaires, auront ',
            defaultMessage: 'aux structures partenaires, auront ',
        }),
        description19: formatMessage({
            id: 'MODo30',
            description: 'acc??s au niveau maximal d???offre.',
            defaultMessage: 'acc??s au niveau maximal d???offre.',
        }),
        description20: formatMessage({
            id: 'MODo31',
            description:
                'Ce sont ces trois niveaux qui permettent le bon fonctionnement de l???Op??ration Hyp??rion et la gratuit?? de ton application : ',
            defaultMessage:
                'Ce sont ces trois niveaux qui permettent le bon fonctionnement de l???Op??ration Hyp??rion et la gratuit?? de ton application : ',
        }),
        description21: formatMessage({
            id: 'MODo32',
            description:
                'il est donc important que tu joues le jeu et que tu appliques bien le niveau d???offre auquel le client est ??ligible !',
            defaultMessage:
                'il est donc important que tu joues le jeu et que tu appliques bien le niveau d???offre auquel le client est ??ligible !',
        }),
    };
    const calcValues = () => {
        if (dataOffre?.value && dataOffre?.value !== '') {
            if (dataOffre.offerType === 'PERCENTAGE' && dataOffre?.value) {
                // - inf??rieur ?? 4% : n???est pas acceptable
                if (Math.floor(Number(dataOffre.value)) <= 4) {
                    setValues(undefined);
                    setIsValidOffre(false);
                    setdataOffre((old) => ({
                        ...old,
                        minOfferValue: null,
                        midOfferValue: null,
                        maxOfferValue: null,
                    }));
                    setAlert({
                        open: true,
                        msg:
                            'Pour des raisons d???attractivit??, il n???est pas possible de proposer des r??ductions de moins de 5%.',
                    });
                    // - entre 5% -> 9% : ne pas diviser ( uniquement le moyen)
                } else if (
                    Math.floor(Number(dataOffre.value)) >= 5 &&
                    Math.floor(Number(dataOffre.value)) <= 9
                ) {
                    setValues({
                        minimum: undefined,
                        medium: Math.floor(Number(dataOffre.value)) + '%',
                        premium: undefined,
                    });
                    setdataOffre((old) => ({
                        ...old,
                        minOfferValue: null,
                        midOfferValue: Math.floor(
                            Number(dataOffre.value)
                        ).toString(),
                        maxOfferValue: null,
                    }));
                    setIsValidOffre(true);
                }
                // - entre 10% -> 14% : on divise par deux (bas et moyen)
                else if (
                    Math.floor(Number(dataOffre.value)) >= 10 &&
                    Math.floor(Number(dataOffre.value)) <= 14
                ) {
                    setValues({
                        minimum: Math.floor(Number(dataOffre.value) / 2) + '%',
                        medium: Math.floor(Number(dataOffre.value)) + '%',
                        premium: undefined,
                    });
                    setdataOffre((old) => ({
                        ...old,
                        minOfferValue: Math.floor(
                            Number(dataOffre.value) / 2
                        ).toString(),
                        midOfferValue: Math.floor(
                            Number(dataOffre.value)
                        ).toString(),
                        maxOfferValue: null,
                    }));
                    setIsValidOffre(true);
                }

                // - ?? partir de 15% : on divise par 3 (bas , moyen, haut)
                else {
                    setValues({
                        minimum: Math.floor(Number(dataOffre.value) / 3) + '%',
                        medium:
                            Math.floor((Number(dataOffre.value) * 2) / 3) + '%',
                        premium: Number(dataOffre.value) + '%',
                    });
                    setdataOffre((old) => ({
                        ...old,
                        minOfferValue: Math.floor(
                            Number(dataOffre.value) / 3
                        ).toString(),
                        midOfferValue: Math.floor(
                            (Number(dataOffre.value) * 2) / 3
                        ).toString(),
                        maxOfferValue: Number(dataOffre.value).toString(),
                    }));
                    setIsValidOffre(true);
                }
            } else if (dataOffre?.offerType === 'FLAT' && dataOffre?.value) {
                //  - inf??rieur ?? 0.99??? : n???est pas acceptable
                if (Number(dataOffre.value) <= 0.99) {
                    setValues(undefined);
                    setdataOffre((old) => ({
                        ...old,
                        minOfferValue: null,
                        midOfferValue: null,
                        maxOfferValue: null,
                    }));
                    setIsValidOffre(false);
                    setAlert({
                        open: true,
                        msg:
                            "Le niveau le plus bas ?? 1??? n???attirera pas beaucoup d???utilisateur, Veuillez augmenter la r??duction s'il vous pla??t",
                    });
                }
                // - entre 1??? -> 2??? : ne pas diviser ( uniquement le moyen)
                else if (
                    Number(dataOffre.value) >= 1 &&
                    Number(dataOffre.value) <= 2
                ) {
                    setValues({
                        minimum: undefined,
                        medium:
                            Number(Number(dataOffre.value).toFixed(2)) + '???',
                        premium: undefined,
                    });
                    setdataOffre((old) => ({
                        ...old,
                        minOfferValue: null,
                        midOfferValue: Number(
                            Number(dataOffre.value).toFixed(2)
                        ).toString(),
                        maxOfferValue: null,
                    }));
                    setIsValidOffre(true);
                }
                // - entre 2??? -> 2,99??? : on divise par deux (bas et moyen)
                else if (
                    Number(dataOffre.value) >= 2 &&
                    Number(dataOffre.value) <= 2.99
                ) {
                    setValues({
                        minimum:
                            Number((Number(dataOffre.value) / 2).toFixed(2)) +
                            '???',
                        medium:
                            Number(Number(dataOffre.value).toFixed(2)) + '???',
                        premium: undefined,
                    });
                    setdataOffre((old) => ({
                        ...old,
                        minOfferValue: (Number(dataOffre.value) / 2).toString(),
                        midOfferValue: Number(dataOffre.value).toString(),
                        maxOfferValue: null,
                    }));
                    setIsValidOffre(true);
                }
                // - ?? partir de 3??? : on divise par 3 (bas , moyen, haut)
                else {
                    setValues({
                        minimum:
                            Number((Number(dataOffre.value) / 3).toFixed(2)) +
                            '???',
                        medium:
                            Number(
                                ((Number(dataOffre.value) * 2) / 3).toFixed(2)
                            ) + '???',
                        premium: Number(dataOffre.value) + '???',
                    });
                    setdataOffre((old) => ({
                        ...old,
                        minOfferValue: Number(
                            (Number(dataOffre.value) / 3).toFixed(2)
                        ).toString(),
                        midOfferValue: Number(
                            ((Number(dataOffre.value) * 2) / 3).toFixed(2)
                        ).toString(),
                        maxOfferValue: Number(dataOffre.value).toString(),
                    }));
                    setIsValidOffre(true);
                }
            } else {
                setValues(undefined);
                setdataOffre((old) => ({
                    ...old,
                    minOfferValue: null,
                    midOfferValue: null,
                    maxOfferValue: null,
                }));
                setIsValidOffre(false);
            }
        }
    };

    useEffect(() => {
        if (!selectedStore?.eCommerceAndPhysicalStore) {
            setdataOffre((old) => ({
                ...old,
                offerCategory: selectedStore?.storeType,
            }));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedStore?.eCommerceAndPhysicalStore, selectedStore?.id]);

    useEffect(() => {
        if (dataOffre?.offerType === 'PERCENTAGE') {
            if (
                dataOffre?.minOfferValue &&
                Math.floor(Number(dataOffre?.minOfferValue)) <= 4
            ) {
                setIsValidOffre(false);
                setAlert({
                    open: true,
                    msg:
                        "Le niveau le plus bas ?? 5% n???attirera pas beaucoup d???utilisateur, Veuillez augmenter la r??duction s'il vous pla??t",
                });
            } else if (
                dataOffre?.midOfferValue &&
                (Math.floor(Number(dataOffre?.midOfferValue)) < 5 &&
                    Math.floor(Number(dataOffre?.midOfferValue))) > 9
            ) {
                setIsValidOffre(false);
                setAlert({
                    open: true,
                    msg:
                        "Le niveau moyen entre 5% -> 9%, Veuillez augmenter la r??duction s'il vous pla??t",
                });
            }
        } else if (dataOffre?.offerType === 'FLAT') {
            if (
                dataOffre?.minOfferValue &&
                Number(dataOffre?.minOfferValue) <= 0.99
            ) {
                setIsValidOffre(false);
                setAlert({
                    open: true,
                    msg:
                        "Le niveau le plus bas ?? 1??? n???attirera pas beaucoup d???utilisateur, Veuillez augmenter la r??duction s'il vous pla??t",
                });
            } else if (
                dataOffre?.midOfferValue &&
                Number(dataOffre?.midOfferValue) < 2 &&
                Number(dataOffre?.midOfferValue) > 2.99
            ) {
                setIsValidOffre(false);
                setAlert({
                    open: true,
                    msg:
                        "Le niveau moyen entre 2??? -> 2,99??? , Veuillez augmenter la r??duction s'il vous pla??t",
                });
            }
        }
    }, [
        dataOffre?.midOfferValue,
        dataOffre?.minOfferValue,
        dataOffre?.offerType,
    ]);

    const handleUpdateOfferPhoto = (fileToUpload?: FileType) => {
        if (fileToUpload) {
            updateOfferImage(selectedOffer.id, fileToUpload).then((data) =>
                dispatch(
                    companyActions.setSelectedOffer({
                        ...data,
                        storeId: selectedOffer.storeId,
                    })
                )
            );
        }
    };

    const handleUpdateOfferFile = (fileToUpload?: FileType) => {
        if (fileToUpload) {
            updateOfferFile(selectedOffer.id, fileToUpload).then((data) => {
                setdataOffre((old) => ({
                    ...old,
                    attachedFile: data.attachedFile,
                }));
                dispatch(
                    companyActions.setSelectedOffer({
                        ...data,
                        storeId: selectedOffer.storeId,
                    })
                );
            });
        }
    };

    useEffect(() => {
        const timer = setTimeout(calcValues, 1000);
        return () => {
            clearTimeout(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataOffre.value, dataOffre.offerType]);

    useEffect(() => {
        if (dataOffre?.offerCategory === 'E_COMMERCE') {
            if (
                (dataOffre?.minOfferValue &&
                    dataOffre?.minOfferValue?.length > 0 &&
                    dataOffre.midOfferValue &&
                    dataOffre.midOfferValue.length > 0 &&
                    dataOffre?.minOfferValue === dataOffre?.midOfferValue) ||
                (dataOffre?.minOfferValue &&
                    dataOffre?.minOfferValue?.length > 0 &&
                    dataOffre.maxOfferValue &&
                    dataOffre.maxOfferValue.length > 0 &&
                    dataOffre?.minOfferValue === dataOffre?.maxOfferValue) ||
                (dataOffre?.midOfferValue &&
                    dataOffre?.midOfferValue?.length > 0 &&
                    dataOffre.maxOfferValue &&
                    dataOffre.maxOfferValue.length > 0 &&
                    dataOffre?.midOfferValue === dataOffre?.maxOfferValue)
            ) {
                setDuplicatedCodeReduction(true);
                setAlert({
                    open: true,
                    title: 'Attention!',
                    msg:
                        'Tes codes de r??ductions doivent ??tre diff??rent pour chaque niveau d???offres',
                });
            } else {
                setDuplicatedCodeReduction(false);
            }
        }
    }, [
        dataOffre.maxOfferValue,
        dataOffre.midOfferValue,
        dataOffre.minOfferValue,
        dataOffre?.offerCategory,
        dataOffre?.offerType,
    ]);

    const handleUpdate = () => {
        setSpinnerVisibility(true);
        updateOffre(selectedOffer.id, {
            ...dataOffre,
            startOfOffer:
                Platform.OS === 'web' && dataOffre.startOfOffer
                    ? dataOffre.startOfOffer + ':00Z'
                    : dataOffre.startOfOffer,
            endOfOffer:
                Platform.OS === 'web' && dataOffre.endOfOffer
                    ? dataOffre.endOfOffer + ':00Z'
                    : dataOffre.endOfOffer,
        })
            .then((data) => {
                dispatch(
                    companyActions.setSelectedOffer({
                        ...data,
                        storeId: selectedStore.id,
                        startOfOffer:
                            Platform.OS === 'web' && data.startOfOffer
                                ? data.startOfOffer.replace(':00Z', '')
                                : data.startOfOffer,
                        endOfOffer:
                            Platform.OS === 'web' && data.endOfOffer
                                ? data.endOfOffer.replace(':00Z', '')
                                : data.endOfOffer,
                    })
                );
                dispatch(userActions.setPreviousScreenName('updateOffer'));
                dispatch(
                    userActions.setUser({
                        ...user,
                        completeRegistration: {
                            ...user.completeRegistration,
                            offerCompleted: true,
                        },
                    })
                );
                setSpinnerVisibility(false);
                navigation.navigate('OffreDetails');
            })
            .catch((err) => {
                console.log(err);
                setSpinnerVisibility(false);
            });
    };
    return (
        <View>
            {props.show && (
                <ModalDescription
                    type="offer"
                    showModal={props.show}
                    setShowModal={props.setShow}
                    dataModalOffer={textTranslated}
                />
            )}
            <Infodialog
                isOpen={alert.open}
                onClose={() => setAlert((old) => ({ ...old, open: false }))}
                title="Attention!"
                body={alert.msg}
            />
            <VStack marginBottom={5}>
                {selectedStore?.eCommerceAndPhysicalStore ? (
                    <FormControlSelect
                        isRequired={true}
                        label=""
                        placeholder={formatMessage({
                            id: 'IDQ15ss',
                            description: "Cat??gorie de l'offre",
                            defaultMessage: "Cat??gorie de l'offre",
                        })}
                        placeholderTextColor={'white'}
                        value={dataOffre?.offerCategory}
                        items={[
                            {
                                label: formatMessage({
                                    id: 'spT09s',
                                    description: 'Offre physique',
                                    defaultMessage: 'Offre physique',
                                }),
                                value: 'PHYSICAL',
                            },
                            {
                                label: formatMessage({
                                    id: 'ecT15s',
                                    description: 'Offre e-commerce',
                                    defaultMessage: 'Offre e-commerce',
                                }),
                                value: 'E_COMMERCE',
                            },
                        ]}
                        error={null}
                        errorMessage={null}
                        helperText={null}
                        onChange={(value: any) =>
                            setdataOffre((old) => ({
                                ...old,
                                offerCategory: value,
                                value: null,
                                offerType: null,
                                minOfferValue: null,
                                midOfferValue: null,
                                maxOfferValue: null,
                            }))
                        }
                    />
                ) : null}

                <FormControlSelect
                    label=""
                    placeholder={formatMessage({
                        id: 'OSCPG9',
                        description: 'Th??mes',
                        defaultMessage: 'Th??mes',
                    })}
                    placeholderTextColor={'white'}
                    value={dataOffre.themeType}
                    items={[
                        {
                            label: formatMessage({
                                id: 'NO_THEME',
                                description: 'Aucun th??me',
                                defaultMessage: 'Aucun th??me',
                            }),
                            value: 'NO_THEME',
                        },
                        {
                            label: formatMessage({
                                id: 'PROMO_FALSH',
                                description: 'Promo Flash',
                                defaultMessage: 'Promo Flash',
                            }),
                            value: 'PROMO_FALSH',
                        },
                        {
                            label: formatMessage({
                                id: 'BLACK_FRIDAY',
                                description: 'Black Friday',
                                defaultMessage: 'Black Friday',
                            }),
                            value: 'BLACK_FRIDAY',
                        },
                        {
                            label: formatMessage({
                                id: 'LIQUIDATION',
                                description: 'Liquidation',
                                defaultMessage: 'Liquidation',
                            }),
                            value: 'LIQUIDATION',
                        },
                        {
                            label: formatMessage({
                                id: 'NOEL',
                                description: 'No??l',
                                defaultMessage: 'No??l',
                            }),
                            value: 'NOEL',
                        },
                        {
                            label: formatMessage({
                                id: 'YEARS_DAY',
                                description: "Jour de l'an",
                                defaultMessage: "Jour de l'an",
                            }),
                            value: 'YEARS_DAY',
                        },
                        {
                            label: formatMessage({
                                id: 'SAINT_VALENTIN',
                                description: 'Saint Valentin',
                                defaultMessage: 'Saint Valentin',
                            }),
                            value: 'SAINT_VALENTIN',
                        },
                        {
                            label: formatMessage({
                                id: 'PAQUES',
                                description: 'Paques',
                                defaultMessage: 'Paques',
                            }),
                            value: 'PAQUES',
                        },
                        {
                            label: formatMessage({
                                id: 'MOTHER_PARTY',
                                description: 'F??te des m??res',
                                defaultMessage: 'F??te des m??res',
                            }),
                            value: 'MOTHER_PARTY',
                        },
                        {
                            label: formatMessage({
                                id: 'FATHER_PARTY',
                                description: 'F??te des p??res',
                                defaultMessage: 'F??te des p??res',
                            }),
                            value: 'FATHER_PARTY',
                        },
                        {
                            label: formatMessage({
                                id: 'BACK_TO_SCHOOL',
                                description: 'Rentr??e des classes',
                                defaultMessage: 'Rentr??e des classes',
                            }),
                            value: 'BACK_TO_SCHOOL',
                        },
                        {
                            label: formatMessage({
                                id: 'HALLOWEEN',
                                description: 'Halloween',
                                defaultMessage: 'Halloween',
                            }),
                            value: 'HALLOWEEN',
                        },
                        {
                            label: formatMessage({
                                id: 'NATIONAL_PARTY',
                                description: 'F??te Nationale',
                                defaultMessage: 'F??te Nationale',
                            }),
                            value: 'NATIONAL_PARTY',
                        },
                        {
                            label: formatMessage({
                                id: 'SAINT_PATRICK',
                                description: 'Saint Patrick',
                                defaultMessage: 'Saint Patrick',
                            }),
                            value: 'SAINT_PATRICK',
                        },
                        /*  {
                            label: formatMessage({
                                id: 'TOUSSAINT',
                                description: 'Toussaint',
                                defaultMessage: 'Toussaint',
                            }),
                            value: 'TOUSSAINT',
                        }, */
                    ]}
                    error={null}
                    errorMessage={null}
                    helperText={null}
                    onChange={(value: any) =>
                        setdataOffre((old) => ({ ...old, themeType: value }))
                    }
                />
                <FormControl
                    borderColor="white"
                    label=""
                    type="input"
                    placeholder={formatMessage({
                        id: 'OSCPG8',
                        description: "Nom de l'offre",
                        defaultMessage: "Nom de l'offre",
                    })}
                    placeholderTextColor="white"
                    helperText={null}
                    value={dataOffre.title}
                    onChange={(value: any) =>
                        setdataOffre((old) => ({ ...old, title: value }))
                    }
                />
                {dataOffre.offerCategory === 'E_COMMERCE' && (
                    <FormControlTextarea
                        infoIcon={InfoIconWhite}
                        alert={{
                            title: 'Information',
                            message:
                                "Pr??cise ici ton offre (ex : 20% de r??duction), n???oublie pas qu???il faut id??alement 2 ou 3 niveaux d'offre diff??rents pour nos diff??rents b??n??ficiaires",
                        }}
                        minWidth={
                            Platform?.OS === 'web'
                                ? '300'
                                : Dimensions.get('window').width - 50
                        }
                        label=""
                        value={dataOffre.description ?? ''}
                        placeholder={formatMessage({
                            id: 'OSCPG5',
                            description: 'Description et conditions',
                            defaultMessage: 'Description et conditions',
                        })}
                        placeholderTextColor={'white'}
                        error={null}
                        numberOfLines={10}
                        errorMessage={null}
                        helperText={null}
                        onChange={(value: any) =>
                            setdataOffre((old) => ({
                                ...old,
                                description: value,
                            }))
                        }
                    />
                )}
            </VStack>
            <VStack marginBottom={5}>
                {dataOffre.offerCategory !== 'E_COMMERCE' && (
                    <FormControlSelect
                        isRequired={true}
                        label=""
                        placeholder={formatMessage({
                            id: 'OSCPG7',
                            description: 'Type de promotion',
                            defaultMessage: 'Type de promotion',
                        })}
                        placeholderTextColor={'white'}
                        value={dataOffre?.offerType ?? ''}
                        items={[
                            {
                                label: formatMessage({
                                    id: 'PERCENTAGE',
                                    description: 'Pourcentage',
                                    defaultMessage: 'Pourcentage',
                                }),
                                value: 'PERCENTAGE',
                            },
                            {
                                label: formatMessage({
                                    id: 'FLAT',
                                    description: 'R??duction Fixe',
                                    defaultMessage: 'R??duction Fixe',
                                }),
                                value: 'FLAT',
                            },
                            {
                                label: formatMessage({
                                    id: 'GOOD_PLAN',
                                    description: 'Bon Plan',
                                    defaultMessage: 'Bon Plan',
                                }),
                                value: 'GOOD_PLAN',
                            },
                        ]}
                        error={null}
                        errorMessage={null}
                        helperText={null}
                        onChange={(value: any) =>
                            setdataOffre((old) => ({
                                ...old,
                                offerType: value,
                            }))
                        }
                    />
                )}
                {dataOffre?.offerType !== 'GOOD_PLAN' &&
                dataOffre.offerCategory !== 'E_COMMERCE' &&
                dataOffre?.offerType ? (
                    <FormControl
                        borderColor="white"
                        label=""
                        type="input"
                        placeholder={formatMessage({
                            id: 'OSlPG6',
                            description: 'R??duction %',
                            defaultMessage: 'R??duction %',
                        })}
                        placeholderTextColor="white"
                        helperText={null}
                        keyboardType="phone-pad"
                        value={dataOffre?.value ?? ''}
                        onChange={(value: any) => {
                            setdataOffre((old) => ({
                                ...old,
                                value: value,
                            }));
                        }}
                        InputRightElement={
                            dataOffre?.offerType === 'FLAT' ? (
                                <HStack space={1} alignItems="center">
                                    <IconButton
                                        onPress={() =>
                                            parseFloat(dataOffre?.value) > 0
                                                ? setdataOffre((old) => ({
                                                      ...old,
                                                      value: (
                                                          parseFloat(
                                                              dataOffre?.value
                                                          ) + 0.5
                                                      ).toString(),
                                                  }))
                                                : setdataOffre((old) => ({
                                                      ...old,
                                                      value: '0.5',
                                                  }))
                                        }
                                        _pressed={{
                                            backgroundColor: 'transparent',
                                        }}
                                        alignItems="center"
                                        justifyContent="center"
                                        icon={<AddSVG width={20} height={20} />}
                                    />
                                </HStack>
                            ) : null
                        }
                    />
                ) : null}
            </VStack>
            {dataOffre?.offerType === 'GOOD_PLAN' ||
            dataOffre.offerCategory === 'E_COMMERCE' ? (
                <VStack>
                    <FormControl
                        infoIcon={InfoIconWhite}
                        alert={{
                            title: 'Information',
                            message:
                                'Ce niveau d???offre est accessible ?? tous les utilisateurs de l???application Defmarket.',
                        }}
                        borderColor="white"
                        label={
                            dataOffre?.offerType === 'GOOD_PLAN'
                                ? formatMessage({
                                      id: 'OFFMI1',
                                      description: 'Offre minimum',
                                      defaultMessage: 'Offre minimum',
                                  })
                                : formatMessage({
                                      id: 'MMO1G6',
                                      description: 'Code de r??duction',
                                      defaultMessage: 'Code de r??duction',
                                  })
                        }
                        type="input"
                        placeholder={
                            dataOffre.offerCategory === 'E_COMMERCE'
                                ? formatMessage({
                                      id: 'MMO1G6',
                                      description: 'Code de r??duction',
                                      defaultMessage: 'Code de r??duction',
                                  })
                                : formatMessage({
                                      id: 'VMOPG6',
                                      description: 'Exemple : 5%',
                                      defaultMessage: 'Exemple : 5%',
                                  })
                        }
                        placeholderTextColor="white"
                        helperText={null}
                        value={dataOffre?.minOfferValue ?? ''}
                        onChange={(value: any) =>
                            setdataOffre((old) => ({
                                ...old,
                                minOfferValue: value,
                            }))
                        }
                    />
                    <FormControl
                        infoIcon={InfoIconWhite}
                        alert={{
                            title: 'Information',
                            message:
                                'Ce niveau d???offre est accessible uniquement aux adh??rents cotisants ?? l???association Hyp??rion D??fense.',
                        }}
                        borderColor="white"
                        label={
                            dataOffre?.offerType === 'GOOD_PLAN'
                                ? formatMessage({
                                      id: 'OFFMI2',
                                      description: 'Offre medium',
                                      defaultMessage: 'Offre medium',
                                  })
                                : formatMessage({
                                      id: 'MMO1G6',
                                      description: 'Code de r??duction',
                                      defaultMessage: 'Code de r??duction',
                                  })
                        }
                        type="input"
                        placeholder={
                            dataOffre.offerCategory === 'E_COMMERCE'
                                ? formatMessage({
                                      id: 'MMO1G6',
                                      description: 'Code de r??duction',
                                      defaultMessage: 'Code de r??duction',
                                  })
                                : formatMessage({
                                      id: 'VMMOG6',
                                      description: 'Exemple : 10%',
                                      defaultMessage: 'Exemple : 10%',
                                  })
                        }
                        placeholderTextColor="white"
                        helperText={null}
                        value={dataOffre?.midOfferValue ?? ''}
                        onChange={(value: any) =>
                            setdataOffre((old) => ({
                                ...old,
                                midOfferValue: value,
                            }))
                        }
                    />
                    <FormControl
                        infoIcon={InfoIconWhite}
                        alert={{
                            title: 'Information',
                            message:
                                'Ce niveau d???offre est accessible uniquement aux membres b??n??voles de l???association Hyp??rion D??fense et aux membres de ses structures partenaires.',
                        }}
                        borderColor="white"
                        label={
                            dataOffre?.offerType === 'GOOD_PLAN'
                                ? formatMessage({
                                      id: 'OFFMI3',
                                      description: 'Offre Premium',
                                      defaultMessage: 'Offre Premium',
                                  })
                                : formatMessage({
                                      id: 'MMO1G6',
                                      description: 'Code de r??duction',
                                      defaultMessage: 'Code de r??duction',
                                  })
                        }
                        type="input"
                        placeholder={
                            dataOffre.offerCategory === 'E_COMMERCE'
                                ? formatMessage({
                                      id: 'MMO1G6',
                                      description: 'Code de r??duction',
                                      defaultMessage: 'Code de r??duction',
                                  })
                                : formatMessage({
                                      id: 'VMHPG6',
                                      description: 'Exemple : 15%',
                                      defaultMessage: 'Exemple : 15%',
                                  })
                        }
                        placeholderTextColor="white"
                        helperText={null}
                        value={dataOffre?.maxOfferValue ?? ''}
                        onChange={(value: any) =>
                            setdataOffre((old) => ({
                                ...old,
                                maxOfferValue: value,
                            }))
                        }
                    />
                </VStack>
            ) : null}

            {dataOffre?.value &&
            !isNaN(Number(dataOffre?.value)) &&
            Number(dataOffre?.value) > 0 &&
            values &&
            dataOffre?.offerType !== 'GOOD_PLAN' ? (
                <HStack
                    minWidth={
                        Platform?.OS === 'web'
                            ? '300'
                            : Dimensions.get('window').width - 50
                    }
                    maxWidth={
                        Platform?.OS === 'web'
                            ? '300'
                            : Dimensions.get('window').width - 50
                    }
                    alignSelf="center"
                    space={2}
                    justifyContent="space-between"
                >
                    {values.minimum ? (
                        <ReductionCard
                            backgroundColor="#B60C1F"
                            value={values.minimum}
                            description="minimum"
                        />
                    ) : null}
                    {values.medium ? (
                        <ReductionCard
                            backgroundColor="#EAAE00"
                            value={values.medium}
                            description="medium"
                        />
                    ) : null}
                    {values.premium ? (
                        <ReductionCard
                            backgroundColor="#00AAC7"
                            value={values.premium}
                            description="premium"
                        />
                    ) : null}
                </HStack>
            ) : (
                <></>
            )}
            <VStack marginBottom={3} marginTop={5}>
                {dataOffre?.offerCategory !== 'E_COMMERCE' && (
                    <FormControlTextarea
                        minWidth={
                            Platform?.OS === 'web'
                                ? '300'
                                : Dimensions.get('window').width - 50
                        }
                        label=""
                        value={dataOffre.description ?? ''}
                        placeholder={formatMessage({
                            id: 'OSCPG5',
                            description: 'Description et conditions',
                            defaultMessage: 'Description et conditions',
                        })}
                        placeholderTextColor={'white'}
                        error={null}
                        numberOfLines={10}
                        errorMessage={null}
                        helperText={null}
                        onChange={(value: any) =>
                            setdataOffre((old) => ({
                                ...old,
                                description: value,
                            }))
                        }
                    />
                )}
                <DatePickerModal
                    required
                    mode="datetime"
                    style={{ marginVertical: 5 }}
                    placeholder={formatMessage({
                        id: 'OSCPG4',
                        description: 'Date de d??marrage',
                        defaultMessage: 'Date de d??marrage',
                    })}
                    value={dataOffre?.startOfOffer ?? undefined}
                    onChange={(value: any) => {
                        if (
                            new Date(value).getTime() >
                            new Date(dataOffre?.endOfOffer).getTime()
                        ) {
                            setdataOffre((old) => ({
                                ...old,
                                startOfOffer: value,
                                endOfOffer: value,
                            }));
                        } else {
                            setdataOffre((old) => ({
                                ...old,
                                startOfOffer: value,
                            }));
                        }
                    }}
                />
                <DatePickerModal
                    mode="datetime"
                    removeAction={true}
                    style={{ marginVertical: 2 }}
                    placeholder={formatMessage({
                        id: 'OSCPG3',
                        description: "Date d'expiration",
                        defaultMessage: "Date d'expiration",
                    })}
                    value={dataOffre.endOfOffer ?? undefined}
                    minimumDate={
                        dataOffre?.startOfOffer
                            ? new Date(dataOffre?.startOfOffer)
                            : undefined
                    }
                    onChange={(value: any) => {
                        setdataOffre((old) => ({
                            ...old,
                            endOfOffer: value,
                        }));
                    }}
                />
            </VStack>
            <VStack marginBottom={10} marginTop={10}>
                <FilePicker
                    value={
                        dataOffre?.attachedFile?.name
                            ? dataOffre.attachedFile.name
                            : undefined
                    }
                    onChange={(file) => handleUpdateOfferFile(file)}
                />
                <ImagePicker
                    style={{
                        marginTop: 5,
                        borderRadius: 10,
                        borderStyle: 'solid',
                        borderColor: 'white',
                        borderWidth: 1,
                        height: 100,
                        minWidth:
                            Platform?.OS === 'web'
                                ? 300
                                : Dimensions.get('window').width - 50,
                        maxWidth:
                            Platform?.OS === 'web'
                                ? 300
                                : Dimensions.get('window').width - 50,
                        alignSelf: 'center',
                    }}
                    value={getFileURL(dataOffre?.photo?.id)}
                    onChange={handleUpdateOfferPhoto}
                    successOverView={
                        Platform.OS === 'web' ? (
                            <Icon
                                as={
                                    <Ionicons
                                        name="camera"
                                        size={32}
                                        color={primary[50]}
                                    />
                                }
                                size={5}
                                style={{
                                    position: 'absolute',
                                    top: 10,
                                    right: 10,
                                    zIndex: 20,
                                }}
                            />
                        ) : (
                            <PhotoSVG
                                fill={primary[50]}
                                style={{
                                    alignSelf: 'flex-end',
                                    marginTop: 10,
                                    marginRight: 20,
                                    width: 33,
                                    height: 25,
                                }}
                            />
                        )
                    }
                >
                    <View marginTop={6}>
                        <HStack space={2} marginX={25}>
                            <Image
                                source={image}
                                style={{
                                    width: 45,
                                    height: 50,
                                }}
                            />
                            <Text
                                fontSize="dm-p"
                                fontFamily="body"
                                textAlign="center"
                                italic={true}
                                style={{ marginTop: 10, marginLeft: 10 }}
                            >
                                <FormattedMessage
                                    id="OFSCP1"
                                    defaultMessage="Ajouter une photo ?? mon offre"
                                />
                            </Text>
                        </HStack>
                    </View>
                </ImagePicker>
            </VStack>
            <VStack marginBottom={5}>
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
                    label={formatMessage({
                        id: '4IsZks',
                        description: 'Suivant',
                        defaultMessage: 'Suivant',
                    })}
                    moreParams={{
                        disabled:
                            dataOffre.offerCategory === 'E_COMMERCE'
                                ? duplicatedCodeReduction ||
                                  !dataOffre?.title ||
                                  dataOffre?.title === '' ||
                                  !dataOffre?.themeType ||
                                  dataOffre?.themeType === '' ||
                                  !dataOffre?.offerCategory ||
                                  !dataOffre?.description ||
                                  dataOffre?.description === '' ||
                                  !dataOffre?.startOfOffer ||
                                  dataOffre?.startOfOffer === '' ||
                                  ((!dataOffre.minOfferValue ||
                                      dataOffre.minOfferValue === '') &&
                                      (!dataOffre.midOfferValue ||
                                          dataOffre.midOfferValue === '') &&
                                      (!dataOffre.maxOfferValue ||
                                          dataOffre.maxOfferValue === ''))
                                : dataOffre?.offerType === 'GOOD_PLAN'
                                ? !dataOffre?.title ||
                                  dataOffre?.title === '' ||
                                  !dataOffre?.themeType ||
                                  dataOffre?.themeType === '' ||
                                  !dataOffre?.offerCategory ||
                                  !dataOffre?.description ||
                                  dataOffre?.description === '' ||
                                  !dataOffre?.startOfOffer ||
                                  dataOffre?.startOfOffer === '' ||
                                  ((!dataOffre.minOfferValue ||
                                      dataOffre.minOfferValue === '') &&
                                      (!dataOffre.midOfferValue ||
                                          dataOffre.midOfferValue === '') &&
                                      (!dataOffre.maxOfferValue ||
                                          dataOffre.maxOfferValue === ''))
                                : (!dataOffre?.title ||
                                      dataOffre?.title === '' ||
                                      !dataOffre?.themeType ||
                                      dataOffre?.themeType === '' ||
                                      !dataOffre?.offerCategory ||
                                      !dataOffre?.offerType ||
                                      !dataOffre?.description ||
                                      dataOffre?.description === '' ||
                                      !dataOffre?.startOfOffer ||
                                      dataOffre?.startOfOffer === '' ||
                                      !dataOffre?.value ||
                                      dataOffre.value === '' ||
                                      !isValidOffre) &&
                                  dataOffre.offerType === 'PERCENTAGE'
                                ? Number(dataOffre?.value) > 100 ||
                                  Number(dataOffre?.value) < 5
                                : Number(dataOffre?.value) < 1,
                    }}
                    onPress={handleUpdate}
                />
            </VStack>
        </View>
    );
};

export default EditOffer;
