// assets
import OfferPng from '../../../../../assets/images/png/notif-offre.png';
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
import { IOffer } from '../../../../services/model/offer';
import OfferForm from '../../../../components/molecules/form/offer-form/OfferForm';
import Actions from './Actions';
import Container from './Container';
import Select from '../../../../components/atoms/form/select/Select';
import {
    blockOffer,
    updateOffer,
    updateOfferAttachedFile,
    updateOfferPhoto,
    validateOffer,
} from '../../../../services/methodes/offer';
import { useContext } from 'react';
import { AlertContext } from '../../../../context/alert/AlertProvider';
import { ErrorHandlerContext } from '../../../../context/errorHandler/ErrorHandlerProvider';

interface IOfferEditingProps {
    expanded?: boolean;
    handleAccordionChange?: () => void;
    next?: () => void;
    offers?: IOffer[];
    selectedOffer?: IOffer;
    setSelectedOffer: React.Dispatch<React.SetStateAction<IOffer | undefined>>;
    hideSelect?: boolean;
    updateBlockStatus: (
        from: 'COMPANY' | 'PROFILE' | 'OFFER' | 'STORE',
        isBlocked?: boolean
    ) => void;
}

const OfferEditing: React.FC<IOfferEditingProps> = ({
    expanded,
    handleAccordionChange,
    next,
    offers,
    selectedOffer,
    setSelectedOffer,
    hideSelect,
    updateBlockStatus,
}) => {
    const { showAlert } = useContext(AlertContext);
    const { handleError } = useContext(ErrorHandlerContext);
    const handleOfferImageUpload = (
        field: 'photo' | 'attachedFile',
        file: File
    ) => {
        if (selectedOffer?.id)
            switch (field) {
                case 'photo':
                    updateOfferPhoto(selectedOffer.id, file)
                        .then((data) => {
                            setSelectedOffer((selectedOffer) =>
                                selectedOffer
                                    ? {
                                          ...selectedOffer,
                                          photo: data.photo,
                                      }
                                    : ({
                                          photo: data.photo,
                                      } as IOffer)
                            );
                            showAlert(
                                "Image de l'offre modifiée avec succès",
                                'success'
                            );
                        })
                        .catch((err) => {
                            console.error(err);
                            showAlert(
                                "Une erreur est survenue lors de l'envoi de l'image de l'offre",
                                'error'
                            );
                        });
                    break;
                case 'attachedFile':
                    updateOfferAttachedFile(selectedOffer.id, file)
                        .then((data) => {
                            setSelectedOffer((selectedOffer) =>
                                selectedOffer
                                    ? {
                                          ...selectedOffer,
                                          attachedFile: data.attachedFile,
                                      }
                                    : ({
                                          attachedFile: data.attachedFile,
                                      } as IOffer)
                            );
                            showAlert(
                                "Fichier attaché à l'offre modifié avec succès",
                                'success'
                            );
                        })
                        .catch((err) => {
                            console.error(err);
                            showAlert(
                                "Une erreur est survenue lors de l'envoi du fichier attaché à l'offre",
                                'error'
                            );
                        });
                    break;
            }
    };

    const handleOfferValidation = () => {
        if (selectedOffer?.id) {
            validateOffer(selectedOffer.id)
                .then(() => {
                    setSelectedOffer((selectedOffer) =>
                        selectedOffer
                            ? {
                                  ...selectedOffer,
                                  validatedByAdmin: true,
                              }
                            : ({
                                  validatedByAdmin: true,
                              } as IOffer)
                    );
                    showAlert('Offre validée avec succès', 'success');
                })
                .catch((err) => {
                    console.error(err);
                    showAlert(
                        "Une erreur est survenue lors de la validation de l'offre",
                        'error'
                    );
                });
        }
    };

    const handleOfferUpdate = () => {
        if (selectedOffer)
            updateOffer(selectedOffer.id, selectedOffer)
                .then(() => {
                    if (next) next();
                    showAlert('Offre modifiée avec succès', 'success');
                })
                .catch((err) => {
                    handleError(err, {
                        default:
                            "Une erreur est survenue lors de la modification de l'offre",
                    });
                });
    };

    const handleOfferBlock = (block: boolean, reason: string) => {
        if (selectedOffer)
            blockOffer(selectedOffer.id, { blockAction: block, reason })
                .then(() => {
                    updateBlockStatus('OFFER', block);
                    showAlert(
                        block
                            ? 'Offre bloquée avec succès'
                            : 'Offre débloquée avec succès',
                        'success'
                    );
                })
                .catch((err) => {
                    console.error(err);
                    showAlert(
                        block
                            ? "Une erreur est survenue lors de la bloquage de l'offre"
                            : "Une erreur est survenue lors de la débloquage de l'offre",
                        'error'
                    );
                });
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
                            src={OfferPng}
                            alt="Profil"
                            width={25}
                            height={25}
                            style={{
                                marginRight: '10px',
                            }}
                        />
                        <Typography variant="h4" fontWeight="bold">
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
                        {expanded && !hideSelect && (
                            <Select
                                required
                                fullWidth
                                label={'Offre'}
                                value={selectedOffer?.id ?? 0}
                                options={offers?.map((offer) => ({
                                    value: offer.id,
                                    label: offer.title,
                                }))}
                                onChange={(value) =>
                                    setSelectedOffer(
                                        offers?.find(
                                            (offer) =>
                                                offer.id === Number(value)
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
                    <Container>
                        <OfferForm
                            offer={selectedOffer}
                            setOffer={setSelectedOffer}
                            onImageUpload={handleOfferImageUpload}
                        />
                    </Container>
                    <Actions
                        isDisabled={
                            !selectedOffer ||
                            (selectedOffer.offerType === 'PERCENTAGE' &&
                                (Number(selectedOffer.value) > 100 ||
                                    Number(selectedOffer.value) < 5))
                        }
                        block={{
                            onClick: handleOfferBlock,
                            isBlocked: selectedOffer.blocked,
                        }}
                        validate={{
                            onClick: handleOfferValidation,
                        }}
                        showValidate={
                            !selectedOffer?.blocked &&
                            !selectedOffer?.validatedByAdmin
                        }
                        update={{
                            onClick: handleOfferUpdate,
                        }}
                    />
                </AccordionDetails>
            )}
        </Accordion>
    );
};

export default OfferEditing;
