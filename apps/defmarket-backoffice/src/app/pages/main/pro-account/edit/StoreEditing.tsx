// assets
import ShopPng from '../../../../../assets/images/png/notif-shop.png';

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
// components
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Stack,
    Typography,
} from '@mui/material';
import {
    IStore,
    IStoreUpdateRequestProps,
} from '../../../../services/model/store';
import Select from '../../../../components/atoms/form/select/Select';
import StoreUpdateForm from '../../../../components/molecules/form/shop-form/StoreUpdateForm';
import Actions from './Actions';
import {
    blockStore,
    updateStore,
    updateStoreCover,
    updateStoreLogo,
    validateStore,
} from '../../../../services/methodes/store';
import { useContext } from 'react';
import { AlertContext } from '../../../../context/alert/AlertProvider';
import MessageDialog from '../../../../components/molecules/dialog/MessageDialog';
import { ErrorHandlerContext } from '../../../../context/errorHandler/ErrorHandlerProvider';

interface IStoreEditingProps {
    expanded?: boolean;
    handleAccordionChange?: () => void;
    next?: () => void;
    stores?: IStore[];
    selectedStore?: IStoreUpdateRequestProps;
    setSelectedStore: React.Dispatch<
        React.SetStateAction<IStoreUpdateRequestProps | undefined>
    >;
    handleStoreSelection: (storeId: number) => void;
    hideSelect?: boolean;
    updateBlockStatus: (
        from: 'COMPANY' | 'PROFILE' | 'OFFER' | 'STORE',
        isBlocked?: boolean
    ) => void;
}

const StoreEditing: React.FC<IStoreEditingProps> = ({
    expanded,
    handleAccordionChange,
    next,
    stores,
    selectedStore,
    setSelectedStore,
    handleStoreSelection,
    hideSelect,
    updateBlockStatus,
}) => {
    const { showAlert } = useContext(AlertContext);
    const { handleError } = useContext(ErrorHandlerContext);
    const handleStoreUpdate = () => {
        if (selectedStore)
            updateStore(selectedStore.id, selectedStore)
                .then(() => {
                    if (next) next();
                    showAlert('la boutique a bien été mise à jour', 'success');
                })
                .catch((err) => {
                    handleError(err, {
                        default:
                            'une erreur est survenue lors de la mise à jour',
                    });
                });
    };

    const handleStoreValidation = () => {
        if (selectedStore) {
            validateStore(selectedStore.id)
                .then(() => {
                    setSelectedStore((selectedStore) =>
                        selectedStore
                            ? {
                                  ...selectedStore,
                                  validatedByAdmin: true,
                              }
                            : ({
                                  validatedByAdmin: true,
                              } as IStoreUpdateRequestProps)
                    );
                    showAlert('la boutique a été validée', 'success');
                })
                .catch((err) => {
                    console.error(err);
                    showAlert(
                        'Une erreur est survenue lors de la validation de la boutique',
                        'error'
                    );
                });
        }
    };

    const handleStoreImageUpload = (field: 'cover' | 'logo', file: File) => {
        if (selectedStore)
            switch (field) {
                case 'cover':
                    updateStoreCover(selectedStore.id, file)
                        .then((data) => {
                            setSelectedStore((selectedStore) =>
                                selectedStore
                                    ? {
                                          ...selectedStore,
                                          cover: data.cover,
                                      }
                                    : ({
                                          cover: data.cover,
                                      } as IStoreUpdateRequestProps)
                            );
                            showAlert(
                                'la photo de couverture a bien été mise à jour',
                                'success'
                            );
                        })
                        .catch((err) => {
                            console.error(err);
                            showAlert('une erreur est survenue', 'error');
                        });
                    break;
                case 'logo':
                    updateStoreLogo(selectedStore.id, file)
                        .then((data) => {
                            setSelectedStore((selectedStore) =>
                                selectedStore
                                    ? {
                                          ...selectedStore,
                                          logo: data.logo,
                                      }
                                    : ({
                                          logo: data.logo,
                                      } as IStoreUpdateRequestProps)
                            );
                            showAlert(
                                'le logo a bien été mis à jour',
                                'success'
                            );
                        })
                        .catch((err) => {
                            console.error(err);
                            showAlert('une erreur est survenue', 'error');
                        });
                    break;
            }
    };

    const handleStoreBlock = (block: boolean, reason: string) => {
        if (selectedStore) {
            blockStore(selectedStore.id, { blockAction: block, reason })
                .then(() => {
                    updateBlockStatus('STORE', block);
                    showAlert(
                        `La boutique a bien été ${
                            block ? 'bloquée' : 'débloquée'
                        }`,
                        'success'
                    );
                })
                .catch((err) => {
                    console.error(err);
                    showAlert(
                        `Une erreur est survenue lors de la ${
                            block ? 'blocage' : 'déblocage'
                        } de la boutique`,
                        'error'
                    );
                });
        }
    };

    return (
        <Accordion
            disableGutters
            style={{ paddingInline: 70 }}
            expanded={expanded}
            onChange={handleAccordionChange}
        >
            <AccordionSummary>
                <Box display="flex" justifyContent="space-between" flexGrow={1}>
                    <Box display="flex" alignItems="center">
                        <img
                            src={ShopPng}
                            alt="Profil"
                            width={25}
                            height={25}
                            style={{
                                marginRight: '10px',
                            }}
                        />
                        <Typography variant="h4" fontWeight="bold">
                            Boutiques de l'utilisateur
                        </Typography>
                        {selectedStore?.practicedOfferBeforeDM &&
                            selectedStore?.practicedOfferBeforeDM
                                .practiceOfferBeforeDM && (
                                <MessageDialog
                                    message={
                                        selectedStore?.practicedOfferBeforeDM
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
                        {expanded && !hideSelect && (
                            <Select
                                required
                                fullWidth
                                label={'Boutique'}
                                value={selectedStore?.id ?? 0}
                                options={stores?.map((store) => ({
                                    value: store.id,
                                    label: store.name,
                                }))}
                                onChange={(value) =>
                                    handleStoreSelection(value)
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
                    <Stack position="relative">
                        <Box
                            width={20}
                            height={20}
                            left={24}
                            position="absolute"
                            top={-10}
                            style={{
                                backgroundColor: '#F6F6F6',
                                transform: 'rotate(45deg)',
                            }}
                        />
                        <StoreUpdateForm
                            store={selectedStore}
                            setStore={setSelectedStore}
                            onImageUpload={handleStoreImageUpload}
                        />
                    </Stack>
                    <Actions
                        isDisabled={!selectedStore}
                        block={{
                            onClick: handleStoreBlock,
                            isBlocked: selectedStore?.blocked,
                        }}
                        validate={{
                            onClick: handleStoreValidation,
                        }}
                        showValidate={
                            !selectedStore?.blocked &&
                            !selectedStore?.validatedByAdmin
                        }
                        update={{
                            onClick: handleStoreUpdate,
                        }}
                    />
                </AccordionDetails>
            )}
        </Accordion>
    );
};

export default StoreEditing;
