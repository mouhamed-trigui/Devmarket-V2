import { IonContent, IonPage } from '@ionic/react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Divider,
    IconButton,
    Stack,
    Typography,
} from '@mui/material';
import React, {
    useContext,
    useEffect,
    useLayoutEffect,
    useMemo,
    useState,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Select from '../../../../components/atoms/form/select/Select';
import { IProAccountProps } from '../../../../services';
import { IStore, IStoreDetails } from '../../../../services/model/store';
import { IOffer } from '../../../../services/model/offer';
import { ICompany } from '../../../../services/model/accounts';
import moment from 'moment';

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import {
    getAllStoreByCompanyId,
    getNextStore,
    getPreviousStore,
    getStoreById,
    getStoreCount,
    validateStore,
} from '../../../../services/methodes/store';
import {
    validateUser,
    getNextUser,
    getPreviousUser,
    validateUserInfo,
    getUserCount,
    requestMoreInfo,
} from '../../../../services/methodes/accounts';
import { validateCompany } from '../../../../services/methodes/company';
import {
    validateOffer,
    getAllOffersByStoreId,
    getOfferCount,
    getNextOffer,
    getPreviousOffer,
} from '../../../../services/methodes/offer';
import { getFileAsBase64 } from '../../../../services/methodes/common/file';

import ProfilePng from '../../../../../assets/images/png/notif-profil.png';
import ShopPng from '../../../../../assets/images/png/notif-shop.png';
import OfferPng from '../../../../../assets/images/png/notif-offre.png';

import { ReactComponent as EditSvg } from '../../../../../assets/svg/modif.svg';
import { ReactComponent as CompanySvg } from '../../../../../assets/svg/notif-company.svg';
import { getNextCompany } from '../../../../services/methodes';
import {
    getCompanyCount,
    getPreviousCompany,
} from '../../../../services/methodes/companies';
import SendMessage from '../../../../components/organisms/dialog-send-message/SendMessage';
import { AlertContext } from '../../../../context/alert/AlertProvider';
import CardOffer from '../../../../components/molecules/card-offer/CardOffer';
import { useIntl } from 'react-intl';
import {
    companyType,
    storeType,
    offerCategory,
    offerTheme,
    offerType,
} from '../../../../extensions/i18n/defined-message';
import MessageDialog from '../../../../components/molecules/dialog/MessageDialog';
import { ErrorHandlerContext } from '../../../../context/errorHandler/ErrorHandlerProvider';
import { IDocument } from '../../../../services/model/common';

type IAccordion = 'profile' | 'company' | 'store' | 'offer';

const ProAccountValidation: React.FC = () => {
    const history = useHistory();
    const { formatMessage } = useIntl();

    const { user, company, store, offer } = useLocation<{
        user?: IProAccountProps;
        company?: ICompany;
        store?: IStore;
        offer?: IOffer;
    }>()?.state ?? {
        user: undefined,
        company: undefined,
        store: undefined,
        offer: undefined,
    };

    const [moreInfoDialog, setMoreInfoDialog] = useState<{
        isOpen: boolean;
        data: {
            subject: string;
            message: string;
        };
        id: number;
        source: 'trader' | 'company' | 'store' | 'offer';
    }>({
        isOpen: false,
        data: { subject: '', message: '' },
        source: 'trader',
        id: 0,
    });

    const [currentUser, setCurrentUser] = useState<
        IProAccountProps | undefined
    >();

    const [selectedCompany, setSelectedCompany] = useState<
        ICompany | undefined
    >();

    const [storeList, setStoreList] = useState<IStore[]>([]);

    const [selectedStore, setSelectedStore] = useState<
        IStoreDetails | undefined
    >();

    const [offerList, setOfferList] = useState<IOffer[]>([]);

    const [selectedOffer, setSelectedOffer] = useState<IOffer | undefined>();

    const [selectedAccordion, setSelectedAccordion] = useState<
        IAccordion | undefined
    >('profile');

    const [totalElements, setTotalElements] = useState<number>();

    const [fileAsBase64List, setFileAsBase64List] = useState<
        {
            name: string;
            uri: string;
            fullScreen?: boolean;
        }[]
    >();

    const { showAlert } = useContext(AlertContext);
    const { handleError } = useContext(ErrorHandlerContext);

    useEffect(() => {
        setCurrentUser(user);
        setSelectedCompany(company);
        handleStoreSelect(store?.id);
        setSelectedOffer(offer);
        const getFirstAccordion = (): IAccordion | undefined => {
            if (user) {
                setCurrentUser(user);
                return 'profile';
            }
            if (company) {
                setSelectedCompany(company);
                return 'company';
            }
            if (store) {
                handleStoreSelect(store?.id);
                return 'store';
            }
            if (offer) {
                setSelectedOffer(offer);
                return 'offer';
            }
            return undefined;
        };

        setSelectedAccordion(getFirstAccordion());
    }, [company, offer, store, user]);

    const goBack = (
        company: any,
        history: any,
        offer: any,
        store: any,
        user: any
    ) => {
        if (user !== null && user !== undefined) {
            history.replace({ pathname: '/pro-account' });
        } else if (company !== null && company !== undefined) {
            history.replace({ pathname: '/companies' });
        } else if (store !== null && store !== undefined) {
            history.replace({ pathname: '/structures' });
        } else if (offer !== null && offer !== undefined) {
            history.replace({ pathname: '/offres' });
        }
    };

    useLayoutEffect(() => {
        // goBack
        return () => {
            setCurrentUser(undefined);
            setSelectedCompany(undefined);
            setStoreList([]);
            setSelectedStore(undefined);
            setOfferList([]);
            setSelectedOffer(undefined);
            setSelectedAccordion(undefined);
            if (history.action === 'POP') {
                goBack(company, history, offer, store, user);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [company, history, offer, store, user]);

    useEffect(() => {
        if (selectedCompany?.id) {
            getAllStoreByCompanyId(selectedCompany.id)
                .then((data) => {
                    setStoreList(data);
                    if (data.length > 0) {
                        handleStoreSelect(data[0].id);
                    } else {
                        setSelectedStore(undefined);
                    }
                })
                .catch((err) => console.error(err));
        }
    }, [selectedCompany]);

    useEffect(() => {
        if (selectedStore?.id) {
            getAllOffersByStoreId(selectedStore.id)
                .then((data) => {
                    setOfferList(data);
                    if (data.length > 0) {
                        setSelectedOffer(data[0]);
                    } else {
                        setSelectedOffer(undefined);
                    }
                })
                .catch((err) => console.error(err));
        }
    }, [selectedStore]);

    useEffect(() => {
        const docs: { doc: IDocument; name: string }[] = [];
        switch (selectedAccordion) {
            case 'profile':
                if (currentUser?.documents?.justificationIdentity?.id)
                    docs.push({
                        doc: currentUser.documents.justificationIdentity,
                        name: "Justificatif d'identité",
                    });
                break;
            case 'offer':
                if (selectedOffer?.attachedFile?.id)
                    docs.push({
                        doc: selectedOffer.attachedFile,
                        name: 'Piece jointe',
                    });

                if (selectedOffer?.photo?.id)
                    docs.push({
                        doc: selectedOffer.photo,
                        name: "Photo de l'offre",
                    });
                break;
            case 'store':
                if (selectedStore?.cover?.id)
                    docs.push({ doc: selectedStore.cover, name: 'Couverture' });

                if (selectedStore?.logo?.id)
                    docs.push({
                        doc: selectedStore.logo,
                        name: 'logo de la boutique',
                    });
                break;
        }
        const base64Promise = docs.map(async (doc) => ({
            uri: await getFileAsBase64(doc.doc?.id ?? 0),
            name: doc.name,
        }));

        Promise.all(base64Promise)
            .then((data) => setFileAsBase64List(data))
            .catch((err) => console.error(err));
    }, [
        currentUser?.documents?.justificationIdentity,
        selectedAccordion,
        selectedOffer,
        selectedStore?.cover,
        selectedStore?.logo,
    ]);

    const offerSign = useMemo(() => {
        switch (selectedOffer?.offerType) {
            case 'PERCENTAGE':
                return '%';
            case 'FLAT':
                return '€';
            default:
                return '';
        }
    }, [selectedOffer?.offerType]);

    useEffect(() => {
        if (user)
            getUserCount([
                { key: 'validated', value: false },
                { key: 'blocked', value: false },
                { key: 'canBeValidated', value: true },
            ])
                .then((data) => setTotalElements(data))
                .catch((err) => {
                    console.error(err);
                    setTotalElements(undefined);
                });
        if (company)
            getCompanyCount({
                validated: false,
                blocked: false,
                canBeValidated: true,
            })
                .then((data) => setTotalElements(data))
                .catch((err) => {
                    console.error(err);
                    setTotalElements(undefined);
                });
        if (store)
            getStoreCount({
                blocked: false,
                validated: false,
            })
                .then((data) => setTotalElements(data))
                .catch((err) => {
                    console.error(err);
                    setTotalElements(undefined);
                });
        if (offer)
            getOfferCount({
                blocked: false,
                validated: false,
            })
                .then((data) => setTotalElements(data))
                .catch((err) => {
                    console.error(err);
                    setTotalElements(undefined);
                });
    }, [
        user,
        currentUser?.id,
        company,
        selectedCompany?.id,
        store,
        selectedStore?.id,
        offer,
        selectedOffer?.id,
    ]);

    const handleNextUser = () => {
        if (currentUser?.id) {
            getNextUser(currentUser?.id)
                .then((data) => {
                    if (data) {
                        setCurrentUser(data);
                        if (data.companies && data.companies.length > 0) {
                            setSelectedCompany(data.companies[0]);
                        }
                    } else {
                        showAlert('Aucun utilisateur suivant', 'info');
                    }
                })
                .catch((err) => {
                    console.error(err);
                    showAlert('Aucun utilisateur suivant', 'info');
                });
        }
    };

    const handleNextCompany = () => {
        getNextCompany(selectedCompany?.id ?? 0, {
            blocked: false,
            validated: false,
            canBeValidated: true,
        })
            .then((data) => {
                if (data) {
                    setSelectedCompany(data);
                } else {
                    showAlert('Aucune entreprise suivante', 'info');
                }
            })
            .catch((err) => {
                console.error(err);
                showAlert('Aucune entreprise suivante', 'info');
            });
    };

    const handleNextStore = () => {
        getNextStore(selectedStore?.id ?? 0, {
            blocked: false,
            validated: false,
            canBeValidated: true,
        })
            .then((data) => {
                if (data) {
                    handleStoreSelect(data.id);
                } else {
                    showAlert('Aucune boutique suivante', 'info');
                }
            })
            .catch((err) => {
                console.error(err);
                showAlert('Aucune boutique suivante', 'info');
            });
    };

    const handleNextOffer = () => {
        getNextOffer(selectedOffer?.id ?? 0, {
            blocked: false,
            validated: false,
        })
            .then((data) => {
                if (data) {
                    setSelectedOffer(data);
                } else {
                    showAlert('Aucune offre suivante', 'info');
                }
            })
            .catch((err) => {
                console.error(err);
                showAlert('Aucune offre suivante', 'info');
            });
    };

    const handlePreviousUser = () => {
        if (currentUser?.id) {
            getPreviousUser(currentUser?.id)
                .then((data) => {
                    if (data) {
                        setCurrentUser(data);
                        if (data.companies && data.companies.length > 0) {
                            setSelectedCompany(data.companies[0]);
                        }
                    } else {
                        showAlert('Aucun utilisateur précédent', 'info');
                    }
                })
                .catch((err) => {
                    console.error(err);
                    showAlert('Aucun utilisateur précédent', 'info');
                });
        }
    };

    const handlePreviousCompany = () => {
        getPreviousCompany(selectedCompany?.id ?? 0, {
            blocked: false,
            validated: false,
            canBeValidated: true,
        })
            .then((data) => {
                if (data) {
                    setSelectedCompany(data);
                } else {
                    showAlert('Aucune entreprise précédente', 'info');
                }
            })
            .catch((err) => {
                console.error(err);
                showAlert('Aucune entreprise précédente', 'info');
            });
    };

    const handlePreviousStore = () => {
        getPreviousStore(selectedStore?.id ?? 0, {
            blocked: false,
            validated: false,
        })
            .then((data) => {
                if (data) {
                    handleStoreSelect(data.id);
                } else {
                    showAlert('Aucune boutique précédente', 'info');
                }
            })
            .catch((err) => {
                console.error(err);
                showAlert('Aucune boutique précédente', 'info');
            });
    };

    const handlePreviousOffer = () => {
        getPreviousOffer(selectedOffer?.id ?? 0, {
            blocked: false,
            validated: false,
        })
            .then((data) => {
                if (data) {
                    setSelectedOffer(data);
                } else {
                    showAlert('Aucune offre précédente', 'info');
                }
            })
            .catch((err) => {
                console.error(err);
                showAlert('Aucune offre précédente', 'info');
            });
    };

    const handleNext = () => {
        if (user) return handleNextUser();
        if (company) return handleNextCompany();
        if (store) return handleNextStore();
        if (offer) return handleNextOffer();
        return undefined;
    };

    const handlePrevious = () => {
        if (user) return handlePreviousUser();
        if (company) return handlePreviousCompany();
        if (store) return handlePreviousStore();
        if (offer) return handlePreviousOffer();
        return undefined;
    };

    const getName = () => {
        if (user)
            return `${currentUser?.firstName ?? ''} ${
                currentUser?.lastName ?? ''
            }`;
        if (company) return selectedCompany?.name;
        if (store) return selectedStore?.name;
        if (offer) return selectedOffer?.title;
        return '';
    };

    const isValidated = (): boolean => {
        if (
            user !== null &&
            user !== undefined &&
            currentUser?.validatedByAdmin
        )
            return currentUser?.validatedByAdmin;
        if (
            company !== null &&
            company !== undefined &&
            selectedCompany?.validatedByAdmin
        )
            return selectedCompany?.validatedByAdmin ?? false;
        if (
            store !== null &&
            store !== undefined &&
            selectedStore?.validatedByAdmin
        )
            return selectedStore?.validatedByAdmin ?? false;
        if (
            offer !== null &&
            offer !== undefined &&
            selectedOffer?.validatedByAdmin
        )
            return selectedOffer?.validatedByAdmin ?? false;
        return false;
    };

    useEffect(() => {
        if (
            currentUser?.validatedInfoByAdmin &&
            selectedCompany?.validatedByAdmin &&
            selectedStore?.validatedByAdmin &&
            selectedOffer?.validatedByAdmin
        ) {
            validateUser(currentUser?.id)
                .then(() => {
                    setCurrentUser({ ...currentUser, validatedByAdmin: true });
                })
                .catch((err) => console.error(err));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        currentUser?.validatedInfoByAdmin,
        selectedCompany?.validatedByAdmin,
        selectedOffer?.validatedByAdmin,
        selectedStore?.validatedByAdmin,
    ]);

    const handleProfileValidation = () => {
        if (currentUser?.id) {
            validateUserInfo(currentUser?.id)
                .then(() => {
                    setCurrentUser({
                        ...currentUser,
                        validatedInfoByAdmin: true,
                    });
                    setSelectedAccordion('company');
                    showAlert('Profil validé', 'success');
                })
                .catch((err) => {
                    console.error(err);
                    showAlert(
                        'Erreur lors de la validation du profil',
                        'error'
                    );
                });
        }
    };

    const handleCompanyValidation = () => {
        if (selectedCompany) {
            validateCompany(selectedCompany.id)
                .then(() => {
                    setSelectedCompany({
                        ...selectedCompany,
                        validatedByAdmin: true,
                    });
                    setSelectedAccordion('store');
                    showAlert('Entreprise validée', 'success');
                })
                .catch((err) => {
                    console.error(err);
                    showAlert(
                        "Erreur lors de la validation de l'entreprise",
                        'error'
                    );
                });
        } else {
            showAlert('Veuillez sélectionner une entreprise', 'warning');
        }
    };

    const handleStoreValidation = () => {
        if (selectedStore) {
            validateStore(selectedStore.id)
                .then(() => {
                    setSelectedStore({
                        ...selectedStore,
                        validatedByAdmin: true,
                    });
                    setSelectedAccordion('offer');
                    showAlert('Boutique validée', 'success');
                })
                .catch((err) => {
                    console.error(err);
                    showAlert(
                        'Erreur lors de la validation de la boutique',
                        'error'
                    );
                });
        } else {
            showAlert('Veuillez sélectionner une boutique', 'warning');
        }
    };

    const handleOfferValidation = () => {
        if (selectedOffer) {
            validateOffer(selectedOffer.id)
                .then(() => {
                    setSelectedOffer({
                        ...selectedOffer,
                        validatedByAdmin: true,
                    });
                    setSelectedAccordion(undefined);
                    showAlert('Offre validée', 'success');
                })
                .catch((err) => {
                    console.error(err);
                    showAlert(
                        "Erreur lors de la validation de l'offre",
                        'error'
                    );
                });
        } else {
            showAlert('Veuillez sélectionner une offre', 'warning');
        }
    };

    const handleAccordionChange = (value: IAccordion) => {
        if (selectedAccordion === value) {
            setSelectedAccordion(undefined);
        } else {
            setSelectedAccordion(value);
        }
    };

    const handleMoreInfoRequest = () => {
        requestMoreInfo(
            moreInfoDialog.id,
            moreInfoDialog.data.subject,
            moreInfoDialog.data.message,
            moreInfoDialog.source
        )
            .then(() => {
                setMoreInfoDialog({
                    isOpen: false,
                    data: { subject: '', message: '' },
                    source: 'trader',
                    id: 0,
                });
                showAlert('Demande envoyée', 'success');
            })
            .catch((err) => {
                console.error(err);
                showAlert("Erreur lors de l'envoi de la demande", 'error');
            });
    };

    const isCoupon = useMemo(
        () =>
            selectedOffer?.offerCategory === 'E_COMMERCE' ||
            selectedOffer?.offerType === 'GOOD_PLAN',
        [selectedOffer?.offerCategory, selectedOffer?.offerType]
    );

    const handleStoreSelect = (storeId?: number) => {
        if (storeId === undefined) return;
        getStoreById(storeId)
            .then((store) => setSelectedStore(store))
            .catch(handleError);
    };

    return (
        <IonPage>
            <IonContent fullscreen>
                <Stack height="100%" padding={1}>
                    <Stack
                        direction="row"
                        alignItems="center"
                        gap={1}
                        paddingY={1}
                    >
                        <IconButton
                            color="primary"
                            onClick={() =>
                                goBack(company, history, offer, store, user)
                            }
                        >
                            <ArrowBackIosNewRoundedIcon />
                        </IconButton>
                        <Typography variant="h1" color="primary">
                            Validation des comptes ({totalElements})
                        </Typography>
                    </Stack>
                    <Divider />
                    <SendMessage
                        isOpen={moreInfoDialog.isOpen}
                        onClose={() =>
                            setMoreInfoDialog((prevState) => ({
                                ...prevState,
                                isOpen: false,
                            }))
                        }
                        onSend={handleMoreInfoRequest}
                        data={{
                            subject: {
                                value: moreInfoDialog.data.subject,
                                onChange: (value) =>
                                    setMoreInfoDialog((prevState) => ({
                                        ...prevState,
                                        data: {
                                            ...prevState.data,
                                            subject: value,
                                        },
                                    })),
                            },
                            message: {
                                value: moreInfoDialog.data.message,
                                onChange: (value) =>
                                    setMoreInfoDialog((prevState) => ({
                                        ...prevState,
                                        data: {
                                            ...prevState.data,
                                            message: value,
                                        },
                                    })),
                            },
                        }}
                    />
                    <Stack flexGrow={1} justifyContent="space-between">
                        <Stack
                            direction="row"
                            gap={1}
                            marginTop={2}
                            flexGrow={1}
                        >
                            <Stack flexGrow={1}>
                                {user && (
                                    <Accordion
                                        expanded={
                                            selectedAccordion === 'profile'
                                        }
                                        onChange={() =>
                                            handleAccordionChange('profile')
                                        }
                                        disableGutters
                                        elevation={0}
                                    >
                                        <AccordionSummary>
                                            <Box
                                                display="flex"
                                                justifyContent="space-between"
                                                flexGrow={1}
                                            >
                                                <Stack
                                                    direction="row"
                                                    alignItems="center"
                                                >
                                                    <img
                                                        src={ProfilePng}
                                                        alt="Profil"
                                                        width={25}
                                                        height={25}
                                                        style={{
                                                            marginRight: '10px',
                                                        }}
                                                    />
                                                    <Typography
                                                        variant="h4"
                                                        fontWeight="bold"
                                                    >
                                                        Informations
                                                        personnelles de
                                                        l'utilisateur
                                                    </Typography>
                                                </Stack>
                                                {currentUser ? (
                                                    currentUser?.blocked ? (
                                                        <CancelRoundedIcon
                                                            color="error"
                                                            fontSize="medium"
                                                        />
                                                    ) : (
                                                        <CheckCircleRoundedIcon
                                                            color={
                                                                currentUser?.validatedInfoByAdmin
                                                                    ? 'success'
                                                                    : 'warning'
                                                            }
                                                            fontSize="medium"
                                                        />
                                                    )
                                                ) : null}
                                            </Box>
                                        </AccordionSummary>
                                        {currentUser && (
                                            <AccordionDetails>
                                                <Box
                                                    padding={3}
                                                    style={{
                                                        backgroundColor:
                                                            '#F6F6F6',
                                                        borderRadius: 20,
                                                    }}
                                                    position="relative"
                                                >
                                                    <Box
                                                        width={20}
                                                        height={20}
                                                        position="absolute"
                                                        top={-10}
                                                        style={{
                                                            backgroundColor:
                                                                '#F6F6F6',
                                                            transform:
                                                                'rotate(45deg)',
                                                        }}
                                                    />
                                                    <Stack
                                                        direction="row"
                                                        justifyContent="space-between"
                                                        alignItems="center"
                                                        paddingBottom={1}
                                                        borderBottom={1}
                                                        borderColor="secondary.main"
                                                    >
                                                        <Typography
                                                            variant="h3"
                                                            fontWeight="bolder"
                                                            color="primary.main"
                                                        >
                                                            {`${currentUser?.firstName} ${currentUser?.lastName}`}
                                                        </Typography>
                                                        <EditSvg
                                                            style={{
                                                                cursor:
                                                                    'pointer',
                                                            }}
                                                            onClick={() =>
                                                                history.push(
                                                                    `/edit/${currentUser.id}`,
                                                                    {
                                                                        user: currentUser,
                                                                        simpleNavigation: true,
                                                                    }
                                                                )
                                                            }
                                                        />
                                                    </Stack>
                                                    <Stack
                                                        direction="row"
                                                        justifyContent="space-between"
                                                        marginTop={2}
                                                    >
                                                        <Stack gap={1} flex={1}>
                                                            <Box>
                                                                <Typography
                                                                    variant="body2"
                                                                    fontWeight="bold"
                                                                >
                                                                    Nom
                                                                </Typography>
                                                                <Typography color="primary">
                                                                    {
                                                                        currentUser?.lastName
                                                                    }
                                                                </Typography>
                                                            </Box>
                                                            <Box>
                                                                <Typography
                                                                    variant="body2"
                                                                    fontWeight="bold"
                                                                >
                                                                    Ville de
                                                                    Résidence
                                                                </Typography>
                                                                <Typography color="primary">
                                                                    {
                                                                        currentUser?.residenceCity
                                                                    }
                                                                </Typography>
                                                            </Box>
                                                            <Box>
                                                                <Typography
                                                                    variant="body2"
                                                                    fontWeight="bold"
                                                                >
                                                                    Membre de la
                                                                    Défense
                                                                    Nationale
                                                                </Typography>
                                                                <Typography color="primary">
                                                                    {currentUser?.veteran
                                                                        ? 'Oui'
                                                                        : 'Non'}
                                                                </Typography>
                                                            </Box>
                                                        </Stack>
                                                        <Stack gap={1} flex={1}>
                                                            <Box>
                                                                <Typography
                                                                    variant="body2"
                                                                    fontWeight="bold"
                                                                >
                                                                    Prénom
                                                                </Typography>
                                                                <Typography color="primary">
                                                                    {
                                                                        currentUser?.firstName
                                                                    }
                                                                </Typography>
                                                            </Box>
                                                            <Box>
                                                                <Typography
                                                                    variant="body2"
                                                                    fontWeight="bold"
                                                                >
                                                                    Téléphone
                                                                </Typography>
                                                                <Typography color="primary">
                                                                    {`${
                                                                        currentUser
                                                                            ?.phone
                                                                            ?.prefix ??
                                                                        ''
                                                                    } ${
                                                                        currentUser
                                                                            ?.phone
                                                                            ?.number ??
                                                                        ''
                                                                    }`}
                                                                </Typography>
                                                            </Box>
                                                            <Box>
                                                                <Typography
                                                                    variant="body2"
                                                                    fontWeight="bold"
                                                                >
                                                                    Unité
                                                                </Typography>
                                                                <Typography color="primary">
                                                                    {currentUser
                                                                        .job
                                                                        ?.name ??
                                                                        ''}
                                                                </Typography>
                                                            </Box>
                                                        </Stack>
                                                        <Stack gap={1} flex={1}>
                                                            <Box>
                                                                <Typography
                                                                    variant="body2"
                                                                    fontWeight="bold"
                                                                >
                                                                    Date de
                                                                    naissance
                                                                </Typography>
                                                                <Typography color="primary">
                                                                    {moment(
                                                                        currentUser?.birthday
                                                                    ).format(
                                                                        'DD/MM/YYYY'
                                                                    )}
                                                                </Typography>
                                                            </Box>
                                                            <Box>
                                                                <Typography
                                                                    variant="body2"
                                                                    fontWeight="bold"
                                                                >
                                                                    Lieu de
                                                                    Naissance
                                                                </Typography>
                                                                <Typography color="primary">
                                                                    {currentUser?.birthCity ??
                                                                        'Non renseigné'}
                                                                </Typography>
                                                            </Box>
                                                            <Box>
                                                                <Typography
                                                                    variant="body2"
                                                                    fontWeight="bold"
                                                                >
                                                                    En activité
                                                                </Typography>
                                                                <Typography color="primary">
                                                                    {currentUser?.activity ===
                                                                    'ACTIVE'
                                                                        ? 'Oui'
                                                                        : 'Non'}
                                                                </Typography>
                                                            </Box>
                                                        </Stack>
                                                    </Stack>
                                                </Box>
                                                <Stack
                                                    direction="row"
                                                    gap={1}
                                                    marginTop={1}
                                                    justifyContent="end"
                                                >
                                                    <Button
                                                        variant="outlined"
                                                        color="secondary"
                                                        onClick={() => {
                                                            setMoreInfoDialog(
                                                                (
                                                                    prevState
                                                                ) => ({
                                                                    ...prevState,
                                                                    isOpen: true,
                                                                    id:
                                                                        currentUser?.id,
                                                                    source:
                                                                        'trader',
                                                                })
                                                            );
                                                        }}
                                                    >
                                                        Demander plus
                                                        d'informations
                                                    </Button>
                                                    {!currentUser?.validatedInfoByAdmin && (
                                                        <Button
                                                            variant="contained"
                                                            color="secondary"
                                                            onClick={
                                                                handleProfileValidation
                                                            }
                                                        >
                                                            Valider les
                                                            informations
                                                        </Button>
                                                    )}
                                                </Stack>
                                            </AccordionDetails>
                                        )}
                                    </Accordion>
                                )}
                                {(user || company) && (
                                    <Accordion
                                        expanded={
                                            selectedAccordion === 'company'
                                        }
                                        onChange={() =>
                                            handleAccordionChange('company')
                                        }
                                        disableGutters
                                        elevation={0}
                                    >
                                        <AccordionSummary>
                                            <Box
                                                display="flex"
                                                justifyContent="space-between"
                                                flexGrow={1}
                                            >
                                                <Stack
                                                    direction="row"
                                                    alignItems="center"
                                                >
                                                    <CompanySvg
                                                        width={25}
                                                        height={25}
                                                        style={{
                                                            marginRight: '10px',
                                                        }}
                                                    />
                                                    <Typography
                                                        variant="h4"
                                                        fontWeight="bold"
                                                    >
                                                        Entreprises de
                                                        l'utilisateur
                                                    </Typography>
                                                </Stack>
                                                <Stack
                                                    direction="row"
                                                    alignItems="center"
                                                    justifyContent="end"
                                                    gap={1}
                                                    width="200px"
                                                >
                                                    {selectedAccordion ===
                                                        'company' &&
                                                        company ===
                                                            undefined && (
                                                            <Select
                                                                required
                                                                fullWidth
                                                                label={
                                                                    'Entreprise'
                                                                }
                                                                value={
                                                                    selectedCompany !==
                                                                    undefined
                                                                        ? selectedCompany.id
                                                                        : undefined
                                                                }
                                                                options={
                                                                    currentUser?.companies?.map(
                                                                        (
                                                                            company
                                                                        ) => ({
                                                                            label:
                                                                                company.name,
                                                                            value:
                                                                                company.id,
                                                                        })
                                                                    ) ?? []
                                                                }
                                                                onChange={(
                                                                    value
                                                                ) =>
                                                                    setSelectedCompany(
                                                                        currentUser?.companies?.find(
                                                                            (
                                                                                company
                                                                            ) =>
                                                                                company.id ===
                                                                                Number(
                                                                                    value
                                                                                )
                                                                        )
                                                                    )
                                                                }
                                                            />
                                                        )}
                                                    {selectedCompany ? (
                                                        selectedCompany?.blocked ? (
                                                            <CancelRoundedIcon
                                                                color="error"
                                                                fontSize="medium"
                                                            />
                                                        ) : (
                                                            <CheckCircleRoundedIcon
                                                                color={
                                                                    selectedCompany?.validatedByAdmin
                                                                        ? 'success'
                                                                        : 'warning'
                                                                }
                                                                fontSize="medium"
                                                            />
                                                        )
                                                    ) : null}
                                                </Stack>
                                            </Box>
                                        </AccordionSummary>
                                        {selectedCompany && (
                                            <AccordionDetails>
                                                <Box
                                                    padding={3}
                                                    style={{
                                                        backgroundColor:
                                                            '#F6F6F6',
                                                        borderRadius: 20,
                                                    }}
                                                    position="relative"
                                                >
                                                    <Box
                                                        width={20}
                                                        height={20}
                                                        position="absolute"
                                                        top={-10}
                                                        style={{
                                                            backgroundColor:
                                                                '#F6F6F6',
                                                            transform:
                                                                'rotate(45deg)',
                                                        }}
                                                    />
                                                    <Stack
                                                        direction="row"
                                                        justifyContent="space-between"
                                                        alignItems="center"
                                                        paddingBottom={1}
                                                        borderBottom={1}
                                                        borderColor="secondary.main"
                                                    >
                                                        <Typography
                                                            variant="h3"
                                                            fontWeight="bolder"
                                                            color="primary.main"
                                                        >
                                                            {
                                                                selectedCompany?.name
                                                            }
                                                        </Typography>
                                                        <EditSvg
                                                            style={{
                                                                cursor:
                                                                    'pointer',
                                                            }}
                                                            onClick={() =>
                                                                history.push(
                                                                    `/edit/${selectedCompany.id}`,
                                                                    {
                                                                        company: selectedCompany,
                                                                        simpleNavigation: true,
                                                                    }
                                                                )
                                                            }
                                                        />
                                                    </Stack>
                                                    <Stack
                                                        direction="row"
                                                        justifyContent="space-between"
                                                        marginTop={2}
                                                    >
                                                        <Stack gap={1} flex={1}>
                                                            <Box>
                                                                <Typography
                                                                    variant="body2"
                                                                    fontWeight="bold"
                                                                >
                                                                    Type
                                                                    d'entreprise
                                                                </Typography>
                                                                <Typography color="primary">
                                                                    {formatMessage(
                                                                        companyType[
                                                                            selectedCompany?.companyType as keyof typeof companyType
                                                                        ]
                                                                    )}
                                                                </Typography>
                                                            </Box>
                                                            <Box>
                                                                <Typography
                                                                    variant="body2"
                                                                    fontWeight="bold"
                                                                >
                                                                    Nom
                                                                    d'entreprise
                                                                </Typography>
                                                                <Typography color="primary">
                                                                    {
                                                                        selectedCompany?.name
                                                                    }
                                                                </Typography>
                                                            </Box>
                                                            <Box>
                                                                <Typography
                                                                    variant="body2"
                                                                    fontWeight="bold"
                                                                >
                                                                    Nom du
                                                                    Dirigeant
                                                                </Typography>
                                                                <Typography color="primary">
                                                                    {selectedCompany?.ruler
                                                                        ? `${selectedCompany?.ruler.name} ${selectedCompany?.ruler.lastName}`
                                                                        : 'Non renseigné'}
                                                                </Typography>
                                                            </Box>
                                                        </Stack>
                                                        <Stack gap={1} flex={1}>
                                                            <Box>
                                                                <Typography
                                                                    variant="body2"
                                                                    fontWeight="bold"
                                                                >
                                                                    Adresse
                                                                </Typography>
                                                                <Typography color="primary">
                                                                    {
                                                                        selectedCompany
                                                                            ?.address
                                                                            .street
                                                                    }
                                                                </Typography>
                                                            </Box>
                                                            <Box>
                                                                <Typography
                                                                    variant="body2"
                                                                    fontWeight="bold"
                                                                >
                                                                    SIRET
                                                                </Typography>
                                                                <Typography color="primary">
                                                                    {
                                                                        selectedCompany?.siren
                                                                    }
                                                                </Typography>
                                                            </Box>
                                                        </Stack>
                                                        <Stack gap={1} flex={1}>
                                                            <Box>
                                                                <Typography
                                                                    variant="body2"
                                                                    fontWeight="bold"
                                                                >
                                                                    TVA
                                                                </Typography>
                                                                <Typography color="primary">
                                                                    {
                                                                        selectedCompany?.tva
                                                                    }
                                                                </Typography>
                                                            </Box>
                                                        </Stack>
                                                    </Stack>
                                                </Box>
                                                <Stack
                                                    direction="row"
                                                    gap={1}
                                                    marginTop={1}
                                                    justifyContent="end"
                                                >
                                                    <Button
                                                        variant="outlined"
                                                        color="secondary"
                                                        onClick={() => {
                                                            setMoreInfoDialog(
                                                                (
                                                                    prevState
                                                                ) => ({
                                                                    ...prevState,
                                                                    isOpen: true,
                                                                    id:
                                                                        selectedCompany.id,
                                                                    source:
                                                                        'company',
                                                                })
                                                            );
                                                        }}
                                                    >
                                                        Demander plus
                                                        d'informations
                                                    </Button>
                                                    {!selectedCompany?.validatedByAdmin && (
                                                        <Button
                                                            variant="contained"
                                                            color="secondary"
                                                            onClick={
                                                                handleCompanyValidation
                                                            }
                                                        >
                                                            Valider les
                                                            informations
                                                        </Button>
                                                    )}
                                                </Stack>
                                            </AccordionDetails>
                                        )}
                                    </Accordion>
                                )}
                                {offer === undefined && (
                                    <Accordion
                                        expanded={selectedAccordion === 'store'}
                                        onChange={() =>
                                            handleAccordionChange('store')
                                        }
                                        disableGutters
                                        elevation={0}
                                    >
                                        <AccordionSummary>
                                            <Box
                                                display="flex"
                                                justifyContent="space-between"
                                                flexGrow={1}
                                            >
                                                <Box
                                                    display="flex"
                                                    alignItems="center"
                                                >
                                                    <img
                                                        src={ShopPng}
                                                        alt="Profil"
                                                        width={25}
                                                        height={25}
                                                        style={{
                                                            marginRight: '10px',
                                                        }}
                                                    />
                                                    <Typography
                                                        variant="h4"
                                                        fontWeight="bold"
                                                    >
                                                        Boutiques de
                                                        l'utilisateur
                                                    </Typography>
                                                    {selectedStore?.practicedOfferBeforeDM &&
                                                        selectedStore
                                                            ?.practicedOfferBeforeDM
                                                            .practiceOfferBeforeDM && (
                                                            <MessageDialog
                                                                message={
                                                                    selectedStore
                                                                        ?.practicedOfferBeforeDM
                                                                        ?.practiceOfferBeforeDMText
                                                                }
                                                                jobs={selectedStore?.practicedOfferBeforeDM?.targetedJobsBeforeDM?.split(
                                                                    ';'
                                                                )}
                                                            />
                                                        )}
                                                </Box>
                                                <Stack
                                                    direction="row"
                                                    alignItems="center"
                                                    justifyContent="end"
                                                    gap={1}
                                                    width="200px"
                                                >
                                                    {selectedAccordion ===
                                                        'store' &&
                                                        store === undefined && (
                                                            <Select
                                                                required
                                                                fullWidth
                                                                label={
                                                                    'Boutique'
                                                                }
                                                                value={
                                                                    selectedStore?.id
                                                                }
                                                                options={storeList?.map(
                                                                    (
                                                                        store
                                                                    ) => ({
                                                                        value:
                                                                            store.id,
                                                                        label:
                                                                            store.name,
                                                                    })
                                                                )}
                                                                onChange={
                                                                    handleStoreSelect
                                                                }
                                                            />
                                                        )}
                                                    {selectedStore ? (
                                                        selectedStore?.blocked ? (
                                                            <CancelRoundedIcon
                                                                color="error"
                                                                fontSize="medium"
                                                            />
                                                        ) : (
                                                            <CheckCircleRoundedIcon
                                                                color={
                                                                    selectedStore?.validatedByAdmin
                                                                        ? 'success'
                                                                        : 'warning'
                                                                }
                                                                fontSize="medium"
                                                            />
                                                        )
                                                    ) : null}
                                                </Stack>
                                            </Box>
                                        </AccordionSummary>
                                        {selectedStore && (
                                            <AccordionDetails>
                                                <Box
                                                    padding={3}
                                                    style={{
                                                        backgroundColor:
                                                            '#F6F6F6',
                                                        borderRadius: 20,
                                                    }}
                                                    position="relative"
                                                >
                                                    <Box
                                                        width={20}
                                                        height={20}
                                                        position="absolute"
                                                        top={-10}
                                                        style={{
                                                            backgroundColor:
                                                                '#F6F6F6',
                                                            transform:
                                                                'rotate(45deg)',
                                                        }}
                                                    />
                                                    <Stack
                                                        direction="row"
                                                        justifyContent="space-between"
                                                        alignItems="center"
                                                        paddingBottom={1}
                                                        borderBottom={1}
                                                        borderColor="secondary.main"
                                                    >
                                                        <Typography
                                                            variant="h3"
                                                            fontWeight="bolder"
                                                            color="primary.main"
                                                        >
                                                            {
                                                                selectedStore?.name
                                                            }
                                                        </Typography>
                                                        <EditSvg
                                                            style={{
                                                                cursor:
                                                                    'pointer',
                                                            }}
                                                            onClick={() =>
                                                                history.push(
                                                                    `/edit/${selectedStore.id}`,
                                                                    {
                                                                        store: selectedStore,
                                                                        simpleNavigation: true,
                                                                    }
                                                                )
                                                            }
                                                        />
                                                    </Stack>
                                                    <Stack
                                                        direction="row"
                                                        justifyContent="space-between"
                                                        marginTop={2}
                                                    >
                                                        <Stack gap={1} flex={1}>
                                                            <Box>
                                                                <Typography
                                                                    variant="body2"
                                                                    fontWeight="bold"
                                                                >
                                                                    Activité
                                                                </Typography>
                                                                <Typography color="primary">
                                                                    {formatMessage(
                                                                        storeType[
                                                                            selectedStore.storeType as keyof typeof storeType
                                                                        ]
                                                                    )}
                                                                </Typography>
                                                            </Box>
                                                            <Box>
                                                                <Typography
                                                                    variant="body2"
                                                                    fontWeight="bold"
                                                                >
                                                                    Nom de la
                                                                    boutique
                                                                </Typography>
                                                                <Typography color="primary">
                                                                    {
                                                                        selectedStore?.name
                                                                    }
                                                                </Typography>
                                                            </Box>
                                                        </Stack>
                                                        <Stack gap={1} flex={1}>
                                                            <Box>
                                                                <Typography
                                                                    variant="body2"
                                                                    fontWeight="bold"
                                                                >
                                                                    Autre
                                                                    activité
                                                                </Typography>
                                                                <Typography color="primary">
                                                                    {selectedStore?.eCommerceAndPhysicalStore
                                                                        ? selectedStore.storeType ===
                                                                          'E_COMMERCE'
                                                                            ? 'Liée à une boutique physique'
                                                                            : 'Liée à un site e-commerce'
                                                                        : 'Non'}
                                                                </Typography>
                                                            </Box>
                                                            <Box>
                                                                <Typography
                                                                    variant="body2"
                                                                    fontWeight="bold"
                                                                >
                                                                    Description
                                                                    de la
                                                                    boutique
                                                                </Typography>
                                                                <Typography color="primary">
                                                                    {
                                                                        selectedStore?.description
                                                                    }
                                                                </Typography>
                                                            </Box>
                                                        </Stack>
                                                        <Stack gap={1} flex={1}>
                                                            <Box>
                                                                <Typography
                                                                    variant="body2"
                                                                    fontWeight="bold"
                                                                >
                                                                    Nombre
                                                                    d'offres
                                                                </Typography>
                                                                <Typography color="primary">
                                                                    {
                                                                        selectedStore?.offerNbr
                                                                    }
                                                                </Typography>
                                                            </Box>
                                                        </Stack>
                                                    </Stack>
                                                </Box>
                                                <Stack
                                                    direction="row"
                                                    gap={1}
                                                    marginTop={1}
                                                    justifyContent="end"
                                                >
                                                    <Button
                                                        variant="outlined"
                                                        color="secondary"
                                                        onClick={() => {
                                                            setMoreInfoDialog(
                                                                (
                                                                    prevState
                                                                ) => ({
                                                                    ...prevState,
                                                                    isOpen: true,
                                                                    id:
                                                                        selectedStore.id,
                                                                    source:
                                                                        'store',
                                                                })
                                                            );
                                                        }}
                                                    >
                                                        Demander plus
                                                        d'informations
                                                    </Button>
                                                    {!selectedStore?.validatedByAdmin && (
                                                        <Button
                                                            variant="contained"
                                                            color="secondary"
                                                            onClick={
                                                                handleStoreValidation
                                                            }
                                                        >
                                                            Valider les
                                                            informations
                                                        </Button>
                                                    )}
                                                </Stack>
                                            </AccordionDetails>
                                        )}
                                    </Accordion>
                                )}
                                <Accordion
                                    expanded={selectedAccordion === 'offer'}
                                    onChange={() =>
                                        handleAccordionChange('offer')
                                    }
                                    disableGutters
                                    elevation={0}
                                >
                                    <AccordionSummary>
                                        <Box
                                            display="flex"
                                            justifyContent="space-between"
                                            flexGrow={1}
                                        >
                                            <Box
                                                display="flex"
                                                alignItems="center"
                                            >
                                                <img
                                                    src={OfferPng}
                                                    alt="Profil"
                                                    width={25}
                                                    height={25}
                                                    style={{
                                                        marginRight: '10px',
                                                    }}
                                                />
                                                <Typography
                                                    variant="h4"
                                                    fontWeight="bold"
                                                >
                                                    Offres de l'utilisateur
                                                </Typography>
                                            </Box>
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="end"
                                                gap={1}
                                                width="200px"
                                            >
                                                {selectedAccordion ===
                                                    'offer' &&
                                                    offer === undefined && (
                                                        <Select
                                                            required
                                                            fullWidth
                                                            label={'Offre'}
                                                            value={
                                                                selectedOffer?.id
                                                            }
                                                            options={offerList?.map(
                                                                (offer) => ({
                                                                    value:
                                                                        offer.id,
                                                                    label:
                                                                        offer.title,
                                                                })
                                                            )}
                                                            onChange={(value) =>
                                                                setSelectedOffer(
                                                                    offerList.find(
                                                                        (
                                                                            offer
                                                                        ) =>
                                                                            offer.id ===
                                                                            Number(
                                                                                value
                                                                            )
                                                                    )
                                                                )
                                                            }
                                                        />
                                                    )}
                                                {selectedOffer ? (
                                                    selectedOffer?.blocked ? (
                                                        <CancelRoundedIcon
                                                            color="error"
                                                            fontSize="medium"
                                                        />
                                                    ) : (
                                                        <CheckCircleRoundedIcon
                                                            color={
                                                                selectedOffer?.validatedByAdmin
                                                                    ? 'success'
                                                                    : 'warning'
                                                            }
                                                            fontSize="medium"
                                                        />
                                                    )
                                                ) : null}
                                            </Stack>
                                        </Box>
                                    </AccordionSummary>
                                    {selectedOffer && (
                                        <AccordionDetails>
                                            <Box
                                                padding={3}
                                                style={{
                                                    backgroundColor: '#F6F6F6',
                                                    borderRadius: 20,
                                                }}
                                                position="relative"
                                            >
                                                <Box
                                                    width={20}
                                                    height={20}
                                                    position="absolute"
                                                    top={-10}
                                                    style={{
                                                        backgroundColor:
                                                            '#F6F6F6',
                                                        transform:
                                                            'rotate(45deg)',
                                                    }}
                                                />
                                                <Stack
                                                    direction="row"
                                                    justifyContent="space-between"
                                                    alignItems="center"
                                                    paddingBottom={1}
                                                    borderBottom={1}
                                                    borderColor="secondary.main"
                                                >
                                                    <Typography
                                                        variant="h3"
                                                        fontWeight="bolder"
                                                        color="primary.main"
                                                    >
                                                        {selectedOffer?.title}
                                                    </Typography>
                                                    <EditSvg
                                                        style={{
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={() =>
                                                            history.push(
                                                                `/edit/${selectedOffer.id}`,
                                                                {
                                                                    offer: selectedOffer,
                                                                    simpleNavigation: true,
                                                                }
                                                            )
                                                        }
                                                    />
                                                </Stack>
                                                <Stack
                                                    direction="row"
                                                    justifyContent="space-between"
                                                    marginTop={2}
                                                    gap={1}
                                                >
                                                    <Stack gap={1} flex={1}>
                                                        <Box>
                                                            <Typography
                                                                variant="body2"
                                                                fontWeight="bold"
                                                            >
                                                                Type d'offre
                                                            </Typography>
                                                            <Typography color="primary">
                                                                {formatMessage(
                                                                    offerCategory[
                                                                        selectedOffer?.offerCategory as keyof typeof offerCategory
                                                                    ]
                                                                )}
                                                            </Typography>
                                                        </Box>
                                                        {selectedOffer?.value && (
                                                            <Box>
                                                                <Typography
                                                                    variant="body2"
                                                                    fontWeight="bold"
                                                                >
                                                                    Réduction
                                                                </Typography>
                                                                <Typography color="primary">
                                                                    {selectedOffer?.value +
                                                                        offerSign}
                                                                </Typography>
                                                            </Box>
                                                        )}
                                                        <Box>
                                                            <Typography
                                                                variant="body2"
                                                                fontWeight="bold"
                                                            >
                                                                Description et
                                                                Conditions
                                                            </Typography>
                                                            <Typography color="primary">
                                                                {
                                                                    selectedOffer?.description
                                                                }
                                                            </Typography>
                                                        </Box>
                                                    </Stack>
                                                    <Stack gap={1} flex={2}>
                                                        <Stack
                                                            direction="row"
                                                            gap={1}
                                                        >
                                                            <Stack
                                                                gap={1}
                                                                flex={1}
                                                            >
                                                                <Box>
                                                                    <Typography
                                                                        variant="body2"
                                                                        fontWeight="bold"
                                                                    >
                                                                        Thème
                                                                    </Typography>
                                                                    <Typography color="primary">
                                                                        {formatMessage(
                                                                            offerTheme[
                                                                                selectedOffer?.themeType as keyof typeof offerTheme
                                                                            ]
                                                                        )}
                                                                    </Typography>
                                                                </Box>
                                                                <Box>
                                                                    <Typography
                                                                        variant="body2"
                                                                        fontWeight="bold"
                                                                    >
                                                                        Date de
                                                                        démarrage
                                                                    </Typography>
                                                                    <Typography color="primary">
                                                                        {selectedOffer?.startOfOffer
                                                                            ? moment(
                                                                                  selectedOffer?.startOfOffer
                                                                              ).format(
                                                                                  'DD/MM/YYYY'
                                                                              )
                                                                            : '-'}
                                                                    </Typography>
                                                                </Box>
                                                            </Stack>
                                                            <Stack
                                                                gap={1}
                                                                flex={1}
                                                            >
                                                                <Box>
                                                                    <Typography
                                                                        variant="body2"
                                                                        fontWeight="bold"
                                                                    >
                                                                        Type de
                                                                        promotion
                                                                    </Typography>
                                                                    <Typography color="primary">
                                                                        {formatMessage(
                                                                            offerType[
                                                                                selectedOffer?.offerType
                                                                                    ? (selectedOffer?.offerType as keyof typeof offerType)
                                                                                    : 'UNDEFINED'
                                                                            ]
                                                                        )}
                                                                    </Typography>
                                                                </Box>
                                                                <Box>
                                                                    <Typography
                                                                        variant="body2"
                                                                        fontWeight="bold"
                                                                    >
                                                                        Date
                                                                        d'expiration
                                                                    </Typography>
                                                                    <Typography color="primary">
                                                                        {selectedOffer?.endOfOffer
                                                                            ? moment(
                                                                                  selectedOffer?.endOfOffer
                                                                              ).format(
                                                                                  'DD/MM/YYYY'
                                                                              )
                                                                            : '-'}
                                                                    </Typography>
                                                                </Box>
                                                            </Stack>
                                                        </Stack>
                                                        <Stack>
                                                            <Box>
                                                                <Typography
                                                                    variant="body2"
                                                                    fontWeight="bold"
                                                                >
                                                                    Vue de la
                                                                    promotion
                                                                </Typography>

                                                                <Stack
                                                                    direction={
                                                                        isCoupon
                                                                            ? 'column'
                                                                            : 'row'
                                                                    }
                                                                    gap={1}
                                                                    marginTop={
                                                                        1
                                                                    }
                                                                >
                                                                    {selectedOffer?.minOfferValue && (
                                                                        <CardOffer
                                                                            isCoupon={
                                                                                isCoupon
                                                                            }
                                                                            backGroundColor="#B60C1F"
                                                                            value={
                                                                                selectedOffer?.minOfferValue ??
                                                                                ''
                                                                            }
                                                                            sign={
                                                                                offerSign
                                                                            }
                                                                            title={
                                                                                'offre minimum'
                                                                            }
                                                                        />
                                                                    )}
                                                                    {selectedOffer?.midOfferValue && (
                                                                        <CardOffer
                                                                            isCoupon={
                                                                                isCoupon
                                                                            }
                                                                            backGroundColor="#E9B51E"
                                                                            value={
                                                                                selectedOffer?.midOfferValue ??
                                                                                ''
                                                                            }
                                                                            sign={
                                                                                offerSign
                                                                            }
                                                                            title="offre medium"
                                                                        />
                                                                    )}
                                                                    {selectedOffer?.maxOfferValue && (
                                                                        <CardOffer
                                                                            isCoupon={
                                                                                isCoupon
                                                                            }
                                                                            backGroundColor="#00AAC7"
                                                                            value={
                                                                                selectedOffer?.maxOfferValue ??
                                                                                ''
                                                                            }
                                                                            sign={
                                                                                offerSign
                                                                            }
                                                                            title="offre premium"
                                                                        />
                                                                    )}
                                                                </Stack>
                                                            </Box>
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            </Box>
                                            <Stack
                                                direction="row"
                                                gap={1}
                                                marginTop={1}
                                                justifyContent="end"
                                            >
                                                <Button
                                                    variant="outlined"
                                                    color="secondary"
                                                    onClick={() => {
                                                        setMoreInfoDialog(
                                                            (prevState) => ({
                                                                ...prevState,
                                                                isOpen: true,
                                                                id:
                                                                    selectedOffer.id,
                                                                source: 'offer',
                                                            })
                                                        );
                                                    }}
                                                >
                                                    Demander plus d'informations
                                                </Button>
                                                {!selectedOffer?.validatedByAdmin && (
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        onClick={
                                                            handleOfferValidation
                                                        }
                                                    >
                                                        Valider les informations
                                                    </Button>
                                                )}
                                            </Stack>
                                        </AccordionDetails>
                                    )}
                                </Accordion>
                                {currentUser?.validatedByAdmin && (
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        flexGrow={1}
                                    >
                                        {/* <Button variant="contained" color="secondary">
                                    Valider le compte
                                </Button> */}
                                        <Stack
                                            fontSize={96}
                                            alignItems="center"
                                            border={1}
                                            borderColor="success.main"
                                            borderRadius={5}
                                            paddingY={10}
                                            paddingX={20}
                                            style={{
                                                backgroundColor: '#F6F6F6',
                                            }}
                                        >
                                            <CheckCircleRoundedIcon
                                                color="success"
                                                fontSize="inherit"
                                            />
                                            <Typography
                                                variant="h1"
                                                fontWeight="bold"
                                                color="primary.main"
                                            >
                                                Compte validé
                                            </Typography>
                                        </Stack>
                                    </Box>
                                )}
                            </Stack>
                            <Stack
                                width="40%"
                                gap={1}
                                height="calc(100vh - 250px)"
                                overflow="auto"
                            >
                                {fileAsBase64List ? (
                                    fileAsBase64List?.map(
                                        (fileAsBase64, index) => (
                                            <Stack
                                                padding={2}
                                                borderRadius={4}
                                                style={{
                                                    backgroundColor: '#F6F6F6',
                                                    zIndex: fileAsBase64.fullScreen
                                                        ? 2
                                                        : 1,
                                                    position: fileAsBase64.fullScreen
                                                        ? 'absolute'
                                                        : 'unset',
                                                    inset: 0,
                                                }}
                                            >
                                                <TransformWrapper>
                                                    {({ zoomIn, zoomOut }) => (
                                                        <>
                                                            <Stack
                                                                direction="row"
                                                                alignItems="center"
                                                                justifyContent="space-between"
                                                                marginBottom={1}
                                                            >
                                                                <Typography>
                                                                    {
                                                                        fileAsBase64?.name
                                                                    }
                                                                </Typography>
                                                                <Stack
                                                                    direction="row"
                                                                    alignItems="center"
                                                                    gap={1}
                                                                >
                                                                    <ZoomInIcon
                                                                        onClick={() =>
                                                                            zoomIn()
                                                                        }
                                                                        style={{
                                                                            cursor:
                                                                                'pointer',
                                                                        }}
                                                                    />
                                                                    <ZoomOutIcon
                                                                        onClick={() =>
                                                                            zoomOut()
                                                                        }
                                                                        style={{
                                                                            cursor:
                                                                                'pointer',
                                                                        }}
                                                                    />
                                                                    {fileAsBase64.fullScreen ? (
                                                                        <FullscreenExitIcon
                                                                            onClick={() =>
                                                                                setFileAsBase64List(
                                                                                    (
                                                                                        old
                                                                                    ) =>
                                                                                        old?.map(
                                                                                            (
                                                                                                fileAsBase64,
                                                                                                i
                                                                                            ) =>
                                                                                                i ===
                                                                                                index
                                                                                                    ? {
                                                                                                          ...fileAsBase64,
                                                                                                          fullScreen: !fileAsBase64.fullScreen,
                                                                                                      }
                                                                                                    : fileAsBase64
                                                                                        )
                                                                                )
                                                                            }
                                                                            style={{
                                                                                cursor:
                                                                                    'pointer',
                                                                            }}
                                                                        />
                                                                    ) : (
                                                                        <FullscreenIcon
                                                                            onClick={() =>
                                                                                setFileAsBase64List(
                                                                                    (
                                                                                        old
                                                                                    ) =>
                                                                                        old?.map(
                                                                                            (
                                                                                                fileAsBase64,
                                                                                                i
                                                                                            ) =>
                                                                                                i ===
                                                                                                index
                                                                                                    ? {
                                                                                                          ...fileAsBase64,
                                                                                                          fullScreen: !fileAsBase64.fullScreen,
                                                                                                      }
                                                                                                    : fileAsBase64
                                                                                        )
                                                                                )
                                                                            }
                                                                            style={{
                                                                                cursor:
                                                                                    'pointer',
                                                                            }}
                                                                        />
                                                                    )}
                                                                </Stack>
                                                            </Stack>
                                                            <TransformComponent
                                                                wrapperStyle={{
                                                                    width:
                                                                        '100%',
                                                                    height:
                                                                        '100%',
                                                                    borderRadius: 5,
                                                                }}
                                                            >
                                                                <img
                                                                    src={
                                                                        fileAsBase64?.uri
                                                                    }
                                                                    alt="document"
                                                                    style={{
                                                                        objectFit:
                                                                            'contain',
                                                                        borderRadius: 5,
                                                                    }}
                                                                />
                                                            </TransformComponent>
                                                        </>
                                                    )}
                                                </TransformWrapper>
                                            </Stack>
                                        )
                                    )
                                ) : (
                                    <Stack
                                        padding={2}
                                        borderRadius={4}
                                        flexGrow={1}
                                        style={{ backgroundColor: '#F6F6F6' }}
                                    ></Stack>
                                )}
                            </Stack>
                        </Stack>
                        <Stack
                            direction="row"
                            padding={3}
                            marginTop={2}
                            alignItems="center"
                            justifyContent="center"
                            style={{
                                backgroundColor: '#F6F6F6',
                                borderRadius: 20,
                            }}
                            gap={7}
                        >
                            <IconButton
                                color="inherit"
                                size="small"
                                style={{
                                    backgroundColor: '#00AAC7',
                                    borderRadius: '15%',
                                    color: 'white',
                                }}
                                onClick={handlePrevious}
                            >
                                <ArrowBackIosNewRoundedIcon />
                            </IconButton>

                            <Stack direction="row" gap={1}>
                                <Typography>{getName()}</Typography>
                                <CheckCircleRoundedIcon
                                    color={
                                        isValidated() ? 'success' : 'warning'
                                    }
                                />
                            </Stack>
                            <IconButton
                                color="inherit"
                                size="small"
                                style={{
                                    backgroundColor: '#00AAC7',
                                    borderRadius: '15%',
                                    color: 'white',
                                }}
                                onClick={handleNext}
                            >
                                <ArrowForwardIosRoundedIcon />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Stack>
            </IonContent>
        </IonPage>
    );
};

export default ProAccountValidation;
