import React, { FC } from 'react';
import { Stack, Typography, Box } from '@mui/material';
import Select from '../../../atoms/form/select/Select';
import InputMUI from '../../../atoms/form/input/Input';
import { colors } from '../../../../theme/colors';
import logoBlue from '../../../../../assets/images/png/photo-blue.png';
import logoShop from '../../../../../assets/images/png/photo-white.png';
//import add from '../../../../../assets/images/png/bouton-ajouter-blue.png';
import CardOffer from '../../card-offer/CardOffer';
import { IOffer } from '../../../../services/model/offer';
import Alert from '../../../organisms/alert-dialog/Alert';
import ImageUploader from '../../image-uploader/ImageUploader';
import FileUploader from '../../file-uploader/FileUploader';

interface IOfferFormProps {
    offer?: IOffer;
    setOffer: React.Dispatch<React.SetStateAction<IOffer | undefined>>;
    categoryShop?:
        | 'PHYSICAL_AND_E_COMMERCE'
        | 'E_COMMERCE'
        | 'PHYSICAL'
        | ''
        | undefined;
    physicalEcommerce?: boolean;
    onImageUpload: (field: 'photo' | 'attachedFile', file: File) => void;
}

const OfferForm: FC<IOfferFormProps> = ({
    offer,
    setOffer,
    categoryShop,
    physicalEcommerce,
    onImageUpload,
}) => {
    const [alert, setAlert] = React.useState<{
        open: boolean;
        title: string;
        msg: string;
    }>({
        open: false,
        title: '',
        msg: '',
    });

    const signe = React.useMemo(() => {
        switch (offer?.offerType) {
            case 'PERCENTAGE':
                return '%';
            case 'FLAT':
                return '€';
            default:
                return '% ou €';
        }
    }, [offer?.offerType]);

    const calcValues = () => {
        if (offer?.value && offer?.value !== '') {
            if (offer?.offerType === 'PERCENTAGE' && offer?.value) {
                // - entre 0% -> 4% : n’est pas acceptable
                if (
                    Math.floor(Number(offer?.value)) > 0 &&
                    Math.floor(Number(offer?.value)) <= 4
                ) {
                    setOffer((offer) =>
                        offer
                            ? {
                                  ...offer,
                                  minOfferValue: undefined,
                                  midOfferValue: undefined,
                                  maxOfferValue: undefined,
                              }
                            : undefined
                    );

                    setAlert({
                        open: true,
                        title: 'Attention!',
                        msg:
                            "Le niveau le plus bas à 5% n’attirera pas beaucoup d’utilisateur, Veuillez augmenter la réduction s'il vous plaît",
                    });
                    // - entre 5% -> 9% : ne pas diviser ( uniquement le moyen)
                } else if (
                    Math.floor(Number(offer?.value)) >= 5 &&
                    Math.floor(Number(offer?.value)) <= 9
                ) {
                    setOffer((offer) =>
                        offer
                            ? {
                                  ...offer,
                                  minOfferValue: undefined,
                                  midOfferValue: Math.floor(
                                      Number(offer?.value)
                                  ).toString(),
                                  maxOfferValue: undefined,
                              }
                            : undefined
                    );
                }
                // - entre 10% -> 14% : on divise par deux (bas et moyen)
                else if (
                    Math.floor(Number(offer?.value)) >= 10 &&
                    Math.floor(Number(offer?.value)) <= 14
                ) {
                    setOffer((offer) =>
                        offer
                            ? {
                                  ...offer,
                                  minOfferValue: Math.floor(
                                      Number(offer?.value) / 2
                                  ).toString(),
                                  midOfferValue: Math.floor(
                                      Number(offer?.value)
                                  ).toString(),
                                  maxOfferValue: undefined,
                              }
                            : undefined
                    );
                }

                // - à partir de 15% : on divise par 3 (bas , moyen, haut)
                else {
                    setOffer((offer) =>
                        offer
                            ? {
                                  ...offer,
                                  minOfferValue: Math.floor(
                                      Number(offer?.value) / 3
                                  ).toString(),
                                  midOfferValue: Math.floor(
                                      (Number(offer?.value) * 2) / 3
                                  ).toString(),
                                  maxOfferValue: Number(
                                      offer?.value
                                  ).toString(),
                              }
                            : undefined
                    );
                }
            } else if (offer?.offerType === 'FLAT' && offer?.value) {
                //  - entre 0€ -> 0.99€ : n’est pas acceptable
                if (Number(offer?.value) > 0 && Number(offer?.value) <= 0.99) {
                    setOffer((offer) =>
                        offer
                            ? {
                                  ...offer,
                                  minOfferValue: undefined,
                                  midOfferValue: undefined,
                                  maxOfferValue: undefined,
                              }
                            : undefined
                    );

                    setAlert({
                        open: true,
                        title: 'Attention!',
                        msg:
                            "Le niveau le plus bas à 1€ n’attirera pas beaucoup d’utilisateur, Veuillez augmenter la réduction s'il vous plaît",
                    });
                }
                // - entre 1€ -> 2€ : ne pas diviser ( uniquement le moyen)
                else if (
                    Number(offer?.value) >= 1 &&
                    Number(offer?.value) <= 2
                ) {
                    setOffer((offer) =>
                        offer
                            ? {
                                  ...offer,
                                  minOfferValue: undefined,
                                  midOfferValue: Number(
                                      Number(offer?.value).toFixed(2)
                                  ).toString(),
                                  maxOfferValue: undefined,
                              }
                            : undefined
                    );
                }
                // - entre 2€ -> 2,99€ : on divise par deux (bas et moyen)
                else if (
                    Number(offer?.value) >= 2 &&
                    Number(offer?.value) <= 2.99
                ) {
                    setOffer((offer) =>
                        offer
                            ? {
                                  ...offer,
                                  minOfferValue: (
                                      Number(offer?.value) / 2
                                  ).toString(),
                                  midOfferValue: Number(
                                      offer?.value
                                  ).toString(),
                                  maxOfferValue: undefined,
                              }
                            : undefined
                    );
                }
                // - à partir de 3€ : on divise par 3 (bas , moyen, haut)
                else {
                    setOffer((offer) =>
                        offer
                            ? {
                                  ...offer,
                                  minOfferValue: Number(
                                      (Number(offer?.value) / 3).toFixed(2)
                                  ).toString(),
                                  midOfferValue: Number(
                                      ((Number(offer?.value) * 2) / 3).toFixed(
                                          2
                                      )
                                  ).toString(),
                                  maxOfferValue: Number(
                                      offer?.value
                                  ).toString(),
                              }
                            : undefined
                    );
                }
            } else {
                setOffer((offer) =>
                    offer
                        ? {
                              ...offer,
                              minOfferValue: undefined,
                              midOfferValue: undefined,
                              maxOfferValue: undefined,
                          }
                        : undefined
                );
            }
        }
    };

    React.useEffect(() => {
        const timer = setTimeout(calcValues, 1000);
        return () => {
            clearTimeout(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offer?.value, offer?.offerType]);

    React.useEffect(() => {
        if (!physicalEcommerce && categoryShop) {
            setOffer((offer) =>
                offer
                    ? {
                          ...offer,
                          offerCategory: categoryShop,
                      }
                    : ({ offerCategory: categoryShop } as IOffer)
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryShop, physicalEcommerce]);

    return (
        <Stack direction="row" flexGrow={1} gap={6}>
            <Alert
                isOpen={alert.open}
                title={alert.title}
                body={alert.msg}
                onClose={() => setAlert({ ...alert, open: false })}
            />
            <Stack flex={1}>
                <Typography
                    fontWeight={600}
                    fontSize={13}
                    color="black"
                    style={{ marginBottom: 5 }}
                    variant="body2"
                >
                    Activité de l'entreprise
                </Typography>

                <Stack gap={2} marginTop={1}>
                    {physicalEcommerce && (
                        <Select
                            required
                            disabled={!physicalEcommerce ? true : false}
                            label="Structure E-commerce"
                            value={offer?.offerCategory}
                            options={[
                                {
                                    value: 'PHYSICAL',
                                    label: 'offer physique',
                                },
                                {
                                    value: 'E_COMMERCE',
                                    label: 'offer E-commerce',
                                },
                            ]}
                            onChange={(value) => {
                                setOffer((offer) =>
                                    offer
                                        ? {
                                              ...offer,
                                              offerCategory: value,
                                          }
                                        : ({ offerCategory: value } as IOffer)
                                );
                            }}
                        />
                    )}
                    <Select
                        required
                        label="Thèmes"
                        value={offer?.themeType ?? ''}
                        options={[
                            {
                                value: 'NOEL',
                                label: 'Noêl',
                            },
                            {
                                value: 'HALLOWEEN',
                                label: 'Halloween',
                            },
                            {
                                value: 'PAQUES',
                                label: 'Paques',
                            },
                            {
                                value: 'TOUSSAINT',
                                label: 'Toussaint',
                            },
                            {
                                value: 'PROMO_FALSH',
                                label: 'Promo Flash',
                            },
                            {
                                value: 'BLACK_FRIDAY',
                                label: 'Black Friday',
                            },
                            {
                                value: 'MOTHER_PARTY',
                                label: 'Fête des mères',
                            },
                            {
                                value: 'FATHER_PARTY',
                                label: 'Fête des pères',
                            },
                            {
                                value: 'BACK_TO_SCHOOL',
                                label: 'Rentrée des classes',
                            },
                            {
                                value: 'NATIONAL_PARTY',
                                label: 'Fête Nationale',
                            },
                            {
                                value: 'SAINT_PATRICK',
                                label: 'Saint Patrick',
                            },
                            {
                                value: 'LIQUIDATION',
                                label: 'Liquidation',
                            },
                            {
                                value: 'YEARS_DAY',
                                label: "Jour de l'an",
                            },
                            {
                                value: 'SAINT_VALENTIN',
                                label: 'Saint Valentin',
                            },
                            {
                                value: 'NO_THEME',
                                label: 'Aucun thème',
                            },
                        ]}
                        onChange={(value) => {
                            setOffer((offer) =>
                                offer
                                    ? {
                                          ...offer,
                                          themeType: value,
                                      }
                                    : ({ themeType: value } as IOffer)
                            );
                        }}
                    />
                    <InputMUI
                        required
                        label="Nom de l'offre"
                        value={offer?.title ?? ''}
                        onChange={(value) => {
                            setOffer((offer) =>
                                offer
                                    ? {
                                          ...offer,
                                          title: value,
                                      }
                                    : ({ title: value } as IOffer)
                            );
                        }}
                    />
                    <InputMUI
                        required
                        multiline
                        label="Description"
                        rows={6}
                        value={offer?.description ?? ''}
                        onChange={(value) => {
                            setOffer((offer) =>
                                offer
                                    ? {
                                          ...offer,
                                          description: value,
                                      }
                                    : ({ description: value } as IOffer)
                            );
                        }}
                    />
                    <Box
                        border={1}
                        borderColor={colors.primary}
                        style={{
                            overflow: 'hidden',
                            width: '100%',
                            height: 112,
                            borderRadius: 4,
                        }}
                    >
                        <ImageUploader
                            value={offer?.photo?.id}
                            onChange={(file) => onImageUpload('photo', file)}
                            style={{
                                overflow: 'hidden',
                                width: '100%',
                                height: '100%',
                            }}
                            successOverView={
                                <img
                                    src={logoShop}
                                    alt="Profil"
                                    width={18}
                                    height={15}
                                    style={{
                                        position: 'absolute',
                                        top: 'calc(50% - 7.5px)',
                                        right: 33,
                                    }}
                                />
                            }
                        >
                            <Stack
                                direction="row"
                                gap={5}
                                flex={1}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <img
                                    src={logoBlue}
                                    alt="Profil"
                                    width={18}
                                    height={15}
                                />
                                <Typography
                                    fontSize={13}
                                    color={colors.primary}
                                    variant="body2"
                                >
                                    Ajouter une photo à mon offer
                                </Typography>
                            </Stack>
                        </ImageUploader>
                    </Box>
                </Stack>
            </Stack>
            <Stack flex={1}>
                <Typography
                    fontWeight={600}
                    fontSize={13}
                    color="black"
                    style={{ marginBottom: 5 }}
                    variant="body2"
                >
                    Détails de la promotion
                </Typography>
                <Stack gap={2} marginTop={1}>
                    {offer?.offerCategory !== 'E_COMMERCE' && (
                        <Select
                            required
                            label="Type de promotion"
                            value={offer?.offerType}
                            options={[
                                {
                                    value: 'PERCENTAGE',
                                    label: 'Pourcentage',
                                },
                                {
                                    value: 'GOOD_PLAN',
                                    label: 'Bon Plan',
                                },

                                {
                                    value: 'FLAT',
                                    label: 'Réduction Fixe',
                                },
                            ]}
                            onChange={(value) => {
                                setOffer((offer) =>
                                    offer
                                        ? {
                                              ...offer,
                                              offerType: value,
                                          }
                                        : ({ offerType: value } as IOffer)
                                );
                            }}
                        />
                    )}
                    {offer?.offerType !== 'GOOD_PLAN' &&
                    offer?.offerCategory !== 'E_COMMERCE' ? (
                        <InputMUI
                            required
                            type="number"
                            label={'Réduction ' + signe}
                            value={offer?.value}
                            min={
                                offer?.offerType === 'PERCENTAGE'
                                    ? 0
                                    : undefined
                            }
                            max={
                                offer?.offerType === 'PERCENTAGE'
                                    ? 100
                                    : undefined
                            }
                            onChange={(value) => {
                                setOffer((offer) =>
                                    offer
                                        ? {
                                              ...offer,
                                              value,
                                          }
                                        : ({ value } as IOffer)
                                );
                            }}
                        />
                    ) : null}
                    {(offer?.offerType === 'GOOD_PLAN' ||
                        offer?.offerCategory === 'E_COMMERCE') && (
                        <Stack>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                marginY={1}
                            >
                                <Typography>offer minimum</Typography>
                            </Stack>
                            <InputMUI
                                required
                                label={
                                    offer.offerCategory === 'E_COMMERCE'
                                        ? 'Code de réduction '
                                        : 'Example : 5 % ou €'
                                }
                                value={offer?.minOfferValue ?? ''}
                                onChange={(value) => {
                                    setOffer((offer) =>
                                        offer
                                            ? {
                                                  ...offer,
                                                  minOfferValue: value,
                                              }
                                            : ({
                                                  minOfferValue: value,
                                              } as IOffer)
                                    );
                                }}
                            />
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                marginY={1}
                            >
                                <Typography>offer medium</Typography>
                            </Stack>

                            <InputMUI
                                required
                                label={
                                    offer.offerCategory === 'E_COMMERCE'
                                        ? 'Code de réduction '
                                        : 'Example : 5 % ou €'
                                }
                                value={offer?.midOfferValue ?? ''}
                                onChange={(value) => {
                                    setOffer((offer) =>
                                        offer
                                            ? {
                                                  ...offer,
                                                  midOfferValue: value,
                                              }
                                            : ({
                                                  midOfferValue: value,
                                              } as IOffer)
                                    );
                                }}
                            />
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                marginY={1}
                            >
                                <Typography>offer premium</Typography>
                            </Stack>
                            <InputMUI
                                required
                                label={
                                    offer.offerCategory === 'E_COMMERCE'
                                        ? 'Code de réduction '
                                        : 'Example : 5 % ou €'
                                }
                                value={offer?.maxOfferValue ?? ''}
                                onChange={(value) => {
                                    setOffer((offer) =>
                                        offer
                                            ? {
                                                  ...offer,
                                                  maxOfferValue: value,
                                              }
                                            : ({
                                                  maxOfferValue: value,
                                              } as IOffer)
                                    );
                                }}
                            />
                        </Stack>
                    )}
                    <InputMUI
                        required
                        type="date"
                        label="Date début"
                        value={offer?.startOfOffer}
                        onChange={(value) => {
                            setOffer((offer) =>
                                offer
                                    ? {
                                          ...offer,
                                          startOfOffer: value,
                                      }
                                    : ({ startOfOffer: value } as IOffer)
                            );
                        }}
                    />
                    <InputMUI
                        type="date"
                        label="Date fin"
                        value={offer?.endOfOffer ?? null}
                        onChange={(value) => {
                            setOffer((offer) =>
                                offer
                                    ? {
                                          ...offer,
                                          endOfOffer: value,
                                      }
                                    : ({ endOfOffer: value } as IOffer)
                            );
                        }}
                    />
                    {offer?.value &&
                        !isNaN(Number(offer?.value)) &&
                        Number(offer?.value) > 0 &&
                        offer?.offerType !== 'GOOD_PLAN' && (
                            <Stack direction="row" spacing={1}>
                                {offer?.minOfferValue && (
                                    <CardOffer
                                        title="offer minimum"
                                        backGroundColor="red"
                                        value={offer?.minOfferValue}
                                        sign={signe}
                                    />
                                )}
                                {offer?.midOfferValue && (
                                    <CardOffer
                                        title="offer medium"
                                        backGroundColor="#E9B51E"
                                        value={offer?.midOfferValue}
                                        sign={signe}
                                    />
                                )}
                                {offer?.maxOfferValue && (
                                    <CardOffer
                                        title="offer premium"
                                        backGroundColor={colors.secondary}
                                        value={offer?.maxOfferValue}
                                        sign={signe}
                                    />
                                )}
                            </Stack>
                        )}

                    <FileUploader
                        value={offer?.attachedFile}
                        onChange={(file) => onImageUpload('attachedFile', file)}
                    />
                </Stack>
            </Stack>
        </Stack>
    );
};

export default OfferForm;
