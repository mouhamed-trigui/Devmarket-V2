import { IonContent, IonPage } from '@ionic/react';
import {
    Box,
    Button,
    Divider,
    IconButton,
    Typography,
    Stack,
} from '@mui/material';

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import ChatIcon from '@mui/icons-material/Chat';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import HistoryIcon from '@mui/icons-material/History';
import DeleteIcon from '@mui/icons-material/Delete';

import { useHistory, useLocation } from 'react-router-dom';

import {
    ReactNode,
    useContext,
    useEffect,
    useLayoutEffect,
    useState,
} from 'react';
import { IProAccountProps } from '../../../../services';
import { ICompany } from '../../../../services/model/accounts';
import {
    getAllStoreByCompanyId,
    getStoreById,
} from '../../../../services/methodes/store';
import {
    IStore,
    IStoreUpdateRequestProps,
} from '../../../../services/model/store';
import { getAllOffersByStoreId } from '../../../../services/methodes/offer';
import { IOffer } from '../../../../services/model/offer';
import {
    blockUser,
    validateUser,
    validateUserInfo,
} from '../../../../services/methodes/accounts';
import UserEdit from './UserEdit';
import CompanyEditing from './CompanyEditing';
import StoreEditing from './StoreEditing';
import OfferEditing from './OfferEditing';
import { AlertContext } from '../../../../context/alert/AlertProvider';
import Actions from './Actions';

type IAccordion = 'profile' | 'company' | 'store' | 'offer';

function ProAccountEdit() {
    const history = useHistory();

    const { user, company, store, offer, simpleNavigation } = useLocation<{
        user?: IProAccountProps;
        company?: ICompany;
        store?: IStore;
        offer?: IOffer;
        simpleNavigation?: boolean;
    }>()?.state ?? {
        user: undefined,
        company: undefined,
        store: undefined,
        offer: undefined,
        simpleNavigation: false,
    };

    const [userData, setUserData] = useState<IProAccountProps>(
        {} as IProAccountProps
    );

    const [selectedCompany, setSelectedCompany] = useState<
        ICompany | undefined
    >();

    const [storeList, setStoreList] = useState<IStore[]>([]);

    const [
        selectedStore,
        setSelectedStore,
    ] = useState<IStoreUpdateRequestProps>();

    const [offerList, setOfferList] = useState<IOffer[]>([]);

    const [selectedOffer, setSelectedOffer] = useState<IOffer>();

    const [selectedAccordion, setSelectedAccordion] = useState<
        IAccordion | undefined
    >('profile');

    useEffect(() => {
        setUserData(user ?? ({} as IProAccountProps));
        setSelectedCompany(company);
        setSelectedStore(store as IStoreUpdateRequestProps);
        setSelectedOffer(offer);
        const getFirstAccordion = (): IAccordion | undefined => {
            if (user) return 'profile';
            if (company) return 'company';
            if (store) return 'store';
            if (offer) return 'offer';
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
            setUserData({} as IProAccountProps);
            setSelectedCompany(undefined);
            setStoreList([]);
            setSelectedStore(undefined);
            setOfferList([]);
            setSelectedOffer(undefined);
            setSelectedAccordion(undefined);
            if (!simpleNavigation && history.action === 'POP') {
                goBack(company, history, offer, store, user);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [company, history, offer, store, user]);

    const handleAccordionChange = (value: IAccordion) => {
        if (selectedAccordion === value) {
            setSelectedAccordion(undefined);
        } else {
            setSelectedAccordion(value);
        }
    };

    useEffect(() => {
        if (store?.id) handleStoreSelection(store.id);
    }, [store?.id]);

    useEffect(() => {
        if (selectedCompany) {
            getAllStoreByCompanyId(selectedCompany.id)
                .then((data) => {
                    setStoreList(data);
                    if (data.length > 0) {
                        handleStoreSelection(data[0].id);
                    } else {
                        setSelectedStore(undefined);
                    }
                })
                .catch((err) => console.error(err));
        } else {
            setStoreList([]);
            setSelectedStore(undefined);
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
    }, [selectedStore?.id]);

    const handleCompteValidation = () => {
        if (userData) {
            validateUser(userData.id)
                .then(() => {
                    setUserData((userData) =>
                        userData
                            ? {
                                  ...userData,
                                  validatedByAdmin: true,
                              }
                            : ({
                                  validatedByAdmin: true,
                              } as IProAccountProps)
                    );
                })
                .catch((err) => console.error(err));
        }
    };

    const handleStoreSelection = (storeId: number) => {
        getStoreById(storeId)
            .then((data) =>
                setSelectedStore({ ...data, categoryId: data?.category?.id })
            )
            .catch((err) => console.error(err));
    };

    const getTitle = (): ReactNode => {
        if (userData && user)
            return (
                <>
                    <Typography variant="h1" color="primary">
                        {`Profil: ${userData?.firstName ?? ''} ${
                            userData?.lastName ?? ''
                        }`}
                    </Typography>
                    {userData?.blocked ? (
                        <CancelRoundedIcon color="error" fontSize="medium" />
                    ) : (
                        <CheckCircleRoundedIcon
                            color={
                                userData?.validatedByAdmin
                                    ? 'success'
                                    : 'warning'
                            }
                            fontSize="medium"
                        />
                    )}
                </>
            );
        else if (selectedCompany && company)
            return (
                <>
                    <Typography variant="h1" color="primary">
                        {`Entreprise: ${selectedCompany?.name}`}
                    </Typography>
                    {selectedCompany?.blocked ? (
                        <CancelRoundedIcon color="error" fontSize="medium" />
                    ) : (
                        <CheckCircleRoundedIcon
                            color={
                                selectedCompany?.validatedByAdmin
                                    ? 'success'
                                    : 'warning'
                            }
                            fontSize="medium"
                        />
                    )}
                </>
            );
        else if (selectedStore && store)
            return (
                <>
                    <Typography variant="h1" color="primary">
                        {`Boutique: ${selectedStore?.name ?? ''}`}
                    </Typography>
                    {selectedStore?.blocked ? (
                        <CancelRoundedIcon color="error" fontSize="medium" />
                    ) : (
                        <CheckCircleRoundedIcon
                            color={
                                selectedStore?.validatedByAdmin
                                    ? 'success'
                                    : 'warning'
                            }
                            fontSize="medium"
                        />
                    )}
                </>
            );
        else if (selectedOffer && offer)
            return (
                <>
                    <Typography variant="h1" color="primary">
                        {`Offre: ${selectedOffer?.title ?? ''}`}
                    </Typography>
                    {selectedOffer?.blocked ? (
                        <CancelRoundedIcon color="error" fontSize="medium" />
                    ) : (
                        <CheckCircleRoundedIcon
                            color={
                                selectedOffer?.validatedByAdmin
                                    ? 'success'
                                    : 'warning'
                            }
                            fontSize="medium"
                        />
                    )}
                </>
            );
        return '';
    };

    /**
     * fix: hide stack validate/bloque accounts , show/hide blocked icon based on blocked filed,refresh state
     * @param from
     * @param isValidated
     * @param isBlocked
     * @returns
     */

    const updateBlockStatus = (
        from: 'COMPANY' | 'PROFILE' | 'OFFER' | 'STORE',
        isBlocked?: boolean
    ) => {
        switch (from) {
            case 'PROFILE':
                // update user
                //foreach compaines
                setUserData((userData) =>
                    userData
                        ? {
                              ...userData,
                              blocked: isBlocked ?? !userData.blocked,
                              companies: userData?.companies?.map(
                                  (company: ICompany) => ({
                                      ...company,
                                      blocked: isBlocked ?? company.blocked,
                                  })
                              ),
                          }
                        : ({
                              blocked: isBlocked,
                          } as IProAccountProps)
                );
                //foreach offerList
                setSelectedCompany((selectedCompany) =>
                    selectedCompany
                        ? {
                              ...selectedCompany,
                              blocked: isBlocked ?? selectedCompany.blocked,
                          }
                        : ({
                              blocked: isBlocked,
                          } as ICompany)
                );
                //foreach storeList
                setStoreList(
                    storeList?.map((store: IStore) => ({
                        ...store,
                        blocked: isBlocked ?? store.blocked,
                    })) ?? []
                );
                setSelectedStore((selectedStore) =>
                    selectedStore
                        ? {
                              ...selectedStore,
                              blocked: isBlocked ?? selectedStore.blocked,
                          }
                        : ({
                              blocked: isBlocked,
                          } as IStoreUpdateRequestProps)
                );

                //foreach offerList
                setOfferList(
                    offerList?.map((offer) => ({
                        ...offer,
                        blocked: isBlocked ?? offer?.blocked,
                    })) ?? []
                );

                setSelectedOffer((selectedOffer) =>
                    selectedOffer
                        ? {
                              ...selectedOffer,
                              blocked: isBlocked ?? !!selectedStore?.blocked,
                          }
                        : ({
                              blocked: isBlocked,
                          } as IOffer)
                );
                break;
            case 'COMPANY':
                // update company List
                setUserData((userData) => ({
                    ...userData,
                    companies: userData.companies?.map((company: ICompany) =>
                        company.id === selectedCompany?.id
                            ? {
                                  ...company,
                                  blocked: isBlocked ?? !company.blocked,
                              }
                            : company
                    ),
                }));
                // update company data
                setSelectedCompany((selectedCompany) =>
                    selectedCompany
                        ? {
                              ...selectedCompany,
                              blocked: isBlocked ?? !selectedCompany.blocked,
                          }
                        : ({
                              blocked: isBlocked,
                          } as ICompany)
                );
                //foreach storeList
                setStoreList(
                    storeList?.map((store: IStore) => ({
                        ...store,
                        blocked: isBlocked ?? store.blocked,
                    })) ?? []
                );
                setSelectedStore((selectedStore) =>
                    selectedStore
                        ? {
                              ...selectedStore,
                              blocked: isBlocked ?? selectedStore.blocked,
                          }
                        : ({
                              blocked: isBlocked,
                          } as IStoreUpdateRequestProps)
                );
                //foreach offerList
                setOfferList(
                    offerList?.map((offer) => ({
                        ...offer,
                        blocked: isBlocked ?? offer?.blocked,
                    })) ?? []
                );
                setSelectedOffer((selectedOffer) =>
                    selectedOffer
                        ? {
                              ...selectedOffer,
                              blocked: isBlocked ?? !!selectedStore?.blocked,
                          }
                        : ({
                              blocked: isBlocked,
                          } as IOffer)
                );
                break;
            case 'STORE':
                setStoreList((storeList) =>
                    storeList?.map((store) =>
                        store.id === selectedStore?.id
                            ? {
                                  ...store,
                                  blocked: isBlocked ?? !store.blocked,
                              }
                            : store
                    )
                );
                setSelectedStore((selectedStore) =>
                    selectedStore
                        ? {
                              ...selectedStore,
                              blocked: isBlocked ?? !selectedStore.blocked,
                          }
                        : ({
                              blocked: isBlocked,
                          } as IStoreUpdateRequestProps)
                );
                //foreach offerList
                setOfferList(
                    offerList?.map((offer) => ({
                        ...offer,
                        blocked: isBlocked ?? !!selectedStore?.blocked,
                    })) ?? []
                );
                setSelectedOffer((selectedOffer) =>
                    selectedOffer
                        ? {
                              ...selectedOffer,
                              blocked: isBlocked ?? !!selectedStore?.blocked,
                          }
                        : ({
                              blocked: isBlocked,
                          } as IOffer)
                );
                break;
            case 'OFFER':
                setOfferList((offerList) =>
                    offerList.map((offer) =>
                        offer.id === selectedOffer?.id
                            ? {
                                  ...offer,
                                  blocked: isBlocked ?? !offer.blocked,
                              }
                            : offer
                    )
                );
                setSelectedOffer((selectedOffer) =>
                    selectedOffer
                        ? {
                              ...selectedOffer,
                              blocked: isBlocked ?? !selectedOffer?.blocked,
                          }
                        : ({
                              blocked: isBlocked,
                          } as IOffer)
                );
                break;
            default:
                return;
        }
    };

    const { showAlert } = useContext(AlertContext);

    const handleUserBlock = (block: boolean, reason: string) => {
        if (userData) {
            blockUser(userData.id, { blockAction: block, reason })
                .then(() => {
                    updateBlockStatus('PROFILE', block);
                    showAlert(
                        `Le profil a été ${block ? 'bloquée' : 'débloquée'}`,
                        'success'
                    );
                })
                .catch((err) => {
                    console.error(err);
                    showAlert('Une erreur est survenue', 'error');
                });
        }
    };

    const handleUserValidation = () => {
        if (userData) {
            validateUserInfo(userData.id)
                .then(() => {
                    setUserData((userData) =>
                        userData
                            ? {
                                  ...userData,
                                  validatedInfoByAdmin: true,
                              }
                            : ({
                                  validatedInfoByAdmin: true,
                              } as IProAccountProps)
                    );
                    showAlert('Le profil a été validé', 'success');
                })
                .catch((err) => {
                    console.error(err);
                    showAlert('Une erreur est survenue', 'error');
                });
        }
    };

    return (
        <IonPage>
            <IonContent fullscreen>
                <Box padding={1}>
                    <Box
                        paddingY={1}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            gap={1}
                            paddingY={1}
                        >
                            <IconButton
                                color="primary"
                                onClick={() =>
                                    simpleNavigation
                                        ? history.goBack()
                                        : goBack(
                                              company,
                                              history,
                                              offer,
                                              store,
                                              user
                                          )
                                }
                            >
                                <ArrowBackIosNewRoundedIcon />
                            </IconButton>
                            {getTitle()}
                        </Stack>
                        <Box display="flex" alignItems="center">
                            <IconButton color="secondary">
                                <ChatIcon />
                            </IconButton>
                            <IconButton color="secondary">
                                <FilePresentIcon />
                            </IconButton>
                            <IconButton color="secondary">
                                <HistoryIcon />
                            </IconButton>
                            <IconButton color="secondary">
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
                <Divider />
                {user && userData && (
                    <UserEdit
                        expanded={selectedAccordion === 'profile'}
                        handleAccordionChange={() =>
                            handleAccordionChange('profile')
                        }
                        next={() => handleAccordionChange('company')}
                        userData={userData}
                        setUserData={setUserData}
                        handleUserBlock={handleUserBlock}
                        handleUserValidation={handleUserValidation}
                    />
                )}
                {(user || company) && (
                    <CompanyEditing
                        companies={userData?.companies}
                        expanded={selectedAccordion === 'company'}
                        handleAccordionChange={() =>
                            handleAccordionChange('company')
                        }
                        next={() => handleAccordionChange('store')}
                        selectedCompany={selectedCompany}
                        setSelectedCompany={setSelectedCompany}
                        hideSelect={company !== undefined}
                        updateBlockStatus={updateBlockStatus}
                    />
                )}
                {!offer && (
                    <StoreEditing
                        stores={storeList}
                        expanded={selectedAccordion === 'store'}
                        selectedStore={selectedStore}
                        setSelectedStore={setSelectedStore}
                        handleStoreSelection={handleStoreSelection}
                        handleAccordionChange={() =>
                            handleAccordionChange('store')
                        }
                        next={() => handleAccordionChange('offer')}
                        hideSelect={store !== undefined}
                        updateBlockStatus={updateBlockStatus}
                    />
                )}
                <OfferEditing
                    offers={offerList}
                    expanded={selectedAccordion === 'offer'}
                    selectedOffer={selectedOffer}
                    setSelectedOffer={setSelectedOffer}
                    handleAccordionChange={() => handleAccordionChange('offer')}
                    next={() => setSelectedAccordion(undefined)}
                    hideSelect={offer !== undefined}
                    updateBlockStatus={updateBlockStatus}
                />
                {user && userData && (
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        margin={2}
                        marginTop={5}
                    >
                        <Typography variant="body2">
                            Ajouté le 24/12/2021
                        </Typography>
                        <Actions
                            block={{
                                onClick: handleUserBlock,
                                isBlocked: userData.blocked,
                                label: {
                                    block: 'Bloquer le compte',
                                    unblock: 'Débloquer le compte',
                                },
                            }}
                            validate={{
                                label: 'Valider le compte',
                                onClick: handleUserValidation,
                            }}
                            showValidate={!userData.validatedByAdmin}
                        />
                    </Stack>
                )}
            </IonContent>
        </IonPage>
    );
}

export default ProAccountEdit;
