import { Box, Button, Stack, Typography } from '@mui/material';
import {
    createCompany,
    createNotification,
} from '../../../services/methodes/company';
import React, { FC, useContext } from 'react';
import Layout from '../../atoms/layout/Layout';
import Dialog from '../../molecules/dialog/Dialog';
import CompanyForm from '../../molecules/form/company-form/CompanyForm';
import IdentityForm from '../../molecules/form/identity-form/IdentityForm';
import OfferForm from '../../molecules/form/offer-form/OfferForm';
import ShopForm from '../../molecules/form/shop-form/ShopForm';
import NotificationForm from '../../molecules/form/notification-form/NotificationForm';

import Stepper from '../../molecules/stepper/Stepper';
import { IBasicOffer, IOffer } from '../../../services/model/offer';
import { createStore } from '../../../services/methodes/store';
import {
    ICompany,
    INotification,
    IUser,
} from '../../../services/model/accounts';
import { createOffer } from '../../../services/methodes/offer';
import moment from 'moment';
import { createUser } from '../../../services';

//import userActive from '../../../../assets/images/png/notif-profil.png';
//import userInactive from '../../../../assets/images/png/user-bleu.png';
import { ReactComponent as UserActive } from '../../../../assets/svg/user-jaune.svg';
import { ReactComponent as UserInActive } from '../../../../assets/svg/user-bleu.svg';

//import companyActive from '../../../../assets/images/png/bureau-bleu-c.png';
//import companyInactive from '../../../../assets/images/png/bureau-bleu-f.png';
import { ReactComponent as CompanyActive } from '../../../../assets/svg/bureau-bleu-c.svg';
import { ReactComponent as CompanyInActive } from '../../../../assets/svg/bureau-bleu-f_bis.svg';

//import shopActive from '../../../../assets/images/png/notif-shop.png';
//import shopInactive from '../../../../assets/images/png/shop-bleu-f.png';
import { ReactComponent as ShopActive } from '../../../../assets/svg/notif-shop.svg';
import { ReactComponent as ShopInActive } from '../../../../assets/svg/shop.svg';

//import offreActive from '../../../../assets/images/png/notif-offer.png';
//import offreInactive from '../../../../assets/images/png/etiquette-de-vente-blue.png';
import { ReactComponent as OfferActive } from '../../../../assets/svg/notif-offre.svg';
import { ReactComponent as OfferInActive } from '../../../../assets/svg/etiquette-de-vente.svg';
import { IBasicStore, IStore } from '../../../services/model/store';
import { AlertContext } from '../../../context/alert/AlertProvider';
import { checkEmail } from '../../../services/methodes/auth';
import { ErrorHandlerContext } from '../../../context/errorHandler/ErrorHandlerProvider';

interface IFormDialogProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onClose: () => void;
    source: 'compte' | 'company' | 'store' | 'offer';
    dialogTitle: string;
    defaultStep?: number;
}

const Body: FC<{
    defaultStep?: number;
    open: boolean;
    source: 'compte' | 'company' | 'store' | 'offer';
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onClose: () => void;
}> = ({ source, setOpen, open, defaultStep, onClose }) => {
    const [step, setStep] = React.useState(defaultStep ?? 0);

    const { showAlert } = useContext(AlertContext);
    const { handleError } = useContext(ErrorHandlerContext);
    // state user
    const [user, setUser] = React.useState<IUser>({} as IUser);
    // id of user after add new user by admin
    const [userId, setUserId] = React.useState<number>();
    const [userCompleted, setUserCompleted] = React.useState(false);

    // state company
    const [company, setCompany] = React.useState<ICompany>();
    // id of user after add new company by admin
    const [companyId, setCompanyId] = React.useState<number>();
    const [companyCompleted, setCompanyCompleted] = React.useState(false);

    // state store
    const [store, setStore] = React.useState<IStore>();
    const [storeImages, setStoreImages] = React.useState<{
        logo?: File;
        cover?: File;
    }>();
    // id of user after add new shop by admin
    const [shopId, setShopId] = React.useState<number>();
    const [shopCompleted, setShopCompleted] = React.useState(false);

    // shop category state
    const [category, setCategory] = React.useState<
        'PHYSICAL_AND_E_COMMERCE' | 'E_COMMERCE' | 'PHYSICAL' | ''
    >();
    const [physicalEcommerce, setPhysicalEcommerce] = React.useState<boolean>();

    const [notification, setNotification] = React.useState<INotification>();

    const [loading, setLoading] = React.useState<boolean>(false);

    // state offer
    const [offer, setOffer] = React.useState<IOffer>();
    const [offerImages, setOfferImages] = React.useState<{
        photo?: File;
        attachedFile?: File;
    }>();

    const [offerCompleted, setOfferCompleted] = React.useState(false);

    React.useEffect(() => {
        if (!open) {
            setUser({} as IUser);
            setUserId(undefined);
            setUserCompleted(false);
            setCompany(undefined);
            setCompanyId(undefined);
            setCompanyCompleted(false);
            setStore(undefined);
            setStoreImages(undefined);
            setShopId(undefined);
            setShopCompleted(false);
            setOffer(undefined);
            setOfferImages(undefined);
            setOfferCompleted(false);
            setStep(0);
        }
    }, [open]);

    const handleCreateUser = () => {
        if (source === 'compte') {
            if (user.email) {
                checkEmail(user.email)
                    .then((response: any) => {
                        if (
                            response.status === 200 &&
                            !response?.data?.existingEmail
                        ) {
                            createUser(user)
                                .then((res) => {
                                    setUserId(res.id);
                                    setUserCompleted(true);
                                    setStep(step + 1);
                                })
                                .catch((err) => handleError(err));
                        } else {
                            showAlert('Email existant..', 'error');
                        }
                    })
                    .catch((err) => handleError(err));
            }
        } else {
            if (userId) {
                setStep(step + 1);
                setUserCompleted(true);
            }
        }
    };

    const handleCreateCompany = () => {
        if (source === 'company' || source === 'compte') {
            if (company && userId)
                createCompany({
                    ...company,
                    ownerId: userId,
                })
                    .then((res) => {
                        setCompanyId(res.id);
                        setCompanyCompleted(true);
                        setStep(step + 1);
                    })
                    .catch((err) => {
                        console.error(err);
                        if (err.message === 'error.request.not-valid.siren') {
                            showAlert(
                                'Le SIREN de cet établissement est déjà utilisé, vous ne pouvez pas créer une structure avec ce SIREN.',
                                'info'
                            );
                        } else {
                            showAlert(
                                "Erreur lors de l'ajout d'une entreprise",
                                'error'
                            );
                        }
                    });
        } else {
            if (companyId) {
                setStep(step + 1);
                setCompanyCompleted(true);
            }
        }
    };

    const handleCreateShop = () => {
        if (source === 'store' || source === 'company' || source === 'compte') {
            if (companyId)
                createStore({
                    logo: storeImages?.logo,
                    cover: storeImages?.cover,
                    store: { ...(store as IBasicStore), companyId },
                })
                    .then((res) => {
                        setShopId(res.id);
                        setCategory(res.storeType);
                        setPhysicalEcommerce(res.eCommerceAndPhysicalStore);
                        setShopCompleted(true);
                        setStep(step + 1);
                    })
                    .catch((err) => handleError(err));
        } else {
            if (shopId) {
                setStep(step + 1);
                setShopCompleted(true);
            }
        }
    };

    const handleCreateOffer = () => {
        if (shopId)
            createOffer({
                offer: {
                    ...(offer as IBasicOffer),
                    startOfOffer: moment(offer?.startOfOffer).format(
                        'YYYY-MM-DDTHH:MM:SS.SSSZ'
                    ),
                    endOfOffer: offer?.endOfOffer
                        ? moment(offer?.endOfOffer).format(
                              'YYYY-MM-DDTHH:MM:SS.SSSZ'
                          )
                        : null,
                },
                storeId: shopId,
                photo: offerImages?.photo,
                attachedFile: offerImages?.attachedFile,
            })
                .then(() => {
                    setOfferCompleted(true);
                    onClose();
                })
                .catch((err) => handleError(err));
    };

    const handleCreateNotification = async () => {
        if (
            !notification?.title ||
            !notification?.address ||
            !notification?.message ||
            !notification?.notificationType
        ) {
            return;
        }
        setLoading(true);
        await createNotification({
            ...notification,
            addressList: notification?.address,
        })
            .then((res) => {
                setNotification(undefined);
                setOpen(false);
                onClose();
            })
            .catch((err) => handleError(err))
            .finally(() => setLoading(false));
    };

    const handleCloseNotification = () => {
        setOpen(false);
        setNotification({} as INotification);
    };

    const handleStoreImageUpload = (field: 'cover' | 'logo', file: File) => {
        switch (field) {
            case 'cover':
                setStoreImages((storeImages) => ({
                    ...storeImages,
                    cover: file,
                }));
                break;
            case 'logo':
                setStoreImages((storeImages) => ({
                    ...storeImages,
                    logo: file,
                }));
                break;
        }
    };

    const handleOfferImageUpload = (
        field: 'photo' | 'attachedFile',
        file: File
    ) => {
        switch (field) {
            case 'photo':
                setOfferImages((storeImages) => ({
                    ...storeImages,
                    photo: file,
                }));
                break;
            case 'attachedFile':
                setOfferImages((storeImages) => ({
                    ...storeImages,
                    attachedFile: file,
                }));
                break;
        }
    };

    return (
        <Stack direction="column">
            {!defaultStep && (
                <Box alignSelf="center" marginBottom={3}>
                    <Stepper
                        activeIndex={step}
                        items={[
                            {
                                active: <UserActive />,
                                inactive: <UserInActive />,
                                completed: userCompleted,
                            },
                            {
                                active: <CompanyActive />,
                                inactive: <CompanyInActive />,
                                completed: companyCompleted,
                            },
                            {
                                active: <ShopActive />,
                                inactive: <ShopInActive />,
                                completed: shopCompleted,
                            },
                            {
                                active: <OfferActive />,
                                inactive: <OfferInActive />,
                                completed: offerCompleted,
                            },
                        ]}
                    />
                </Box>
            )}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    step === -1
                        ? handleCreateNotification()
                        : step === 0
                        ? handleCreateUser()
                        : step === 1
                        ? handleCreateCompany()
                        : step === 2
                        ? handleCreateShop()
                        : handleCreateOffer();
                }}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {defaultStep ? (
                    <NotificationForm
                        notification={notification}
                        setNotification={setNotification}
                    />
                ) : step === 0 ? (
                    <Layout
                        width={source === 'compte' ? '100%' : '50%'}
                        padding={3}
                    >
                        <IdentityForm
                            user={user}
                            setUser={setUser}
                            setUserId={setUserId}
                            source={source}
                        />
                    </Layout>
                ) : step === 1 ? (
                    <Layout
                        width={
                            source === 'company' || source === 'compte'
                                ? '100%'
                                : '50%'
                        }
                        padding={3}
                    >
                        <CompanyForm
                            company={company}
                            setCompany={setCompany}
                            setCompanyId={setCompanyId}
                            withSelect={
                                source === 'store' || source === 'offer'
                                    ? { userId }
                                    : undefined
                            }
                            source={source}
                            withSearch
                        />
                    </Layout>
                ) : step === 2 ? (
                    <Layout
                        width={
                            source === 'store' ||
                            source === 'company' ||
                            source === 'compte'
                                ? undefined
                                : '50%'
                        }
                        padding={3}
                    >
                        <ShopForm
                            store={store}
                            setStore={setStore}
                            onImageUpload={handleStoreImageUpload}
                            withSelect={
                                source === 'offer' ? { companyId } : undefined
                            }
                            source={source}
                            setShopId={setShopId}
                            setCategory={setCategory}
                        />
                    </Layout>
                ) : (
                    <Layout padding={3}>
                        <OfferForm
                            offer={offer}
                            setOffer={setOffer}
                            categoryShop={category}
                            physicalEcommerce={physicalEcommerce}
                            onImageUpload={handleOfferImageUpload}
                        />
                    </Layout>
                )}
                {defaultStep ? (
                    <Stack flexDirection={'row'} spacing={5} alignSelf="end">
                        <Button
                            variant="outlined"
                            style={{
                                height: 40,
                                alignSelf: 'center',
                                marginTop: 15,
                                borderColor: '#00AAC7',
                                marginRight: 20,
                            }}
                            onClick={() => handleCloseNotification()}
                        >
                            <Typography color="#00AAC7">Annuler</Typography>
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            style={{
                                height: 40,
                                alignSelf: 'center',
                                marginTop: 15,
                                backgroundColor: '#00AAC7',
                            }}
                        >
                            <Typography
                                color="white"
                                onClick={() => handleCreateNotification()}
                            >
                                Valider
                            </Typography>
                        </Button>
                    </Stack>
                ) : (
                    <Button
                        type="submit"
                        color="warning"
                        disabled={
                            loading ||
                            (step === 3 &&
                                offer?.offerType === 'PERCENTAGE' &&
                                (Number(offer.value) > 100 ||
                                    Number(offer.value) < 5))
                        }
                        variant="contained"
                        style={{
                            width: '25%',
                            height: 40,
                            alignSelf: 'center',
                            marginTop: 15,
                        }}
                    >
                        <Typography color="white">
                            {step < 3 ? 'Suivant' : 'valider'}
                        </Typography>
                    </Button>
                )}
            </form>
        </Stack>
    );
};

const DialogForm: FC<IFormDialogProps> = ({
    source,
    open,
    setOpen,
    onClose,
    dialogTitle,
    defaultStep,
}) => {
    const [step, setStep] = React.useState(defaultStep ?? 0);

    React.useEffect(() => {
        if (step === 4) {
            setOpen(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [step]);

    return (
        <Dialog
            onClose={onClose}
            separate
            fullWidth={true}
            maxWidth="md"
            isOpen={open}
            title={dialogTitle}
            body={
                <Body
                    source={source}
                    setOpen={setOpen}
                    onClose={onClose}
                    open={open}
                    defaultStep={defaultStep}
                />
            }
        />
    );
};

export default DialogForm;
