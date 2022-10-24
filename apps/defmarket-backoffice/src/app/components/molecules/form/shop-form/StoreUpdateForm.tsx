import React, { useEffect, useState } from 'react';
import {
    Box,
    Chip,
    IconButton,
    InputAdornment,
    Stack,
    Typography,
    ListItemText,
    Divider,
    TextField,
} from '@mui/material';
import {
    IPaymentMethodProps,
    ISocialMediaProps,
    IStoreCategoryProps,
    IStoreUpdateRequestProps,
} from '../../../../services/model/store';
import ImageUploader from '../../image-uploader/ImageUploader';
import { colors } from '../../../../theme/colors';
import logoShop from '../../../../../assets/images/png/photo-white.png';
import logoBlue from '../../../../../assets/images/png/photo-blue.png';
import Select from '../../../atoms/form/select/Select';
import { getStoreCategories } from '../../../../services/methodes/store';
import Input from '../../../atoms/form/input/Input';
import Checkbox from '../../../atoms/form/checkbox/Checkbox';

import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PublicIcon from '@mui/icons-material/Public';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface StoreUpdateFormProps {
    store?: IStoreUpdateRequestProps;
    setStore: React.Dispatch<
        React.SetStateAction<IStoreUpdateRequestProps | undefined>
    >;
    onImageUpload: (field: 'cover' | 'logo', file: File) => void;
}

const PayementMethod: React.FC<{
    methodName: 'CASH' | 'CHECK' | 'CB';
    paymentMethods: IPaymentMethodProps[];
    setStore: React.Dispatch<
        React.SetStateAction<IStoreUpdateRequestProps | undefined>
    >;
}> = ({ methodName, paymentMethods, setStore }) => {
    let label = '';
    switch (methodName) {
        case 'CASH':
            label = 'Espéce';
            break;
        case 'CHECK':
            label = 'Chèque';
            break;
        case 'CB':
            label = 'Carte bancaire';
            break;
        default:
            label = '';
    }

    const checked =
        paymentMethods?.find((pay) => pay.name === methodName) !== undefined;
    return (
        <Stack flex={1}>
            <Checkbox
                label={label}
                value={methodName}
                checked={checked}
                onChange={(value) =>
                    value
                        ? setStore((store) =>
                              store
                                  ? {
                                        ...store,
                                        paymentMethods: [
                                            ...store.paymentMethods,
                                            {
                                                name: methodName,
                                                condition: '',
                                            },
                                        ],
                                    }
                                  : ({
                                        paymentMethods: [{ name: methodName }],
                                    } as IStoreUpdateRequestProps)
                          )
                        : setStore((store) =>
                              store
                                  ? {
                                        ...store,
                                        paymentMethods: store.paymentMethods.filter(
                                            (pay) => pay.name !== methodName
                                        ),
                                    }
                                  : undefined
                          )
                }
            />
            {checked && (
                <Input
                    label="Condition"
                    value={
                        paymentMethods?.find((pay) => pay.name === methodName)
                            ?.condition ?? ''
                    }
                    onChange={(value) =>
                        setStore((store) =>
                            store
                                ? {
                                      ...store,
                                      paymentMethods: store?.paymentMethods?.map(
                                          (pay) =>
                                              pay.name === methodName
                                                  ? {
                                                        ...pay,
                                                        condition: value,
                                                    }
                                                  : pay
                                      ),
                                  }
                                : ({
                                      paymentMethods: [
                                          {
                                              name: methodName,
                                              condition: value,
                                          },
                                      ],
                                  } as IStoreUpdateRequestProps)
                        )
                    }
                />
            )}
        </Stack>
    );
};

const StoreUpdateForm: React.FC<StoreUpdateFormProps> = ({
    store,
    setStore,
    onImageUpload,
}) => {
    const [storeCategories, setStoreCategories] = useState<
        IStoreCategoryProps[]
    >([]);

    const [
        selectedSocialMediaIndex,
        setSelectedSocialMediaIndex,
    ] = useState<number>();
    const [selectedPhoneIndex, setSelectedPhoneIndex] = useState<number>();

    const [newSocialMedia, setNewSocialMedia] = useState<{
        name: string;
        type:
            | 'OTHER'
            | 'FACEBOOK'
            | 'INSTAGRAM'
            | 'TWITTER'
            | 'LINKEDIN'
            | 'GOOGLEPLUS'
            | 'YOUTUBE';
    }>({ name: '', type: 'FACEBOOK' });

    const [newPhone, setNewPhone] = useState<{
        prefix: string;
        number: string;
    }>({ number: '', prefix: '+33' });

    useEffect(() => {
        getStoreCategories('PHYSICAL_AND_E_COMMERCE')
            .then((data) => setStoreCategories(data))
            .catch((err) => console.error(err));
    }, []);

    const getSocialMediaIcon = (socialMediaName: string) => {
        switch (socialMediaName?.toLowerCase()) {
            case 'facebook':
                return <FacebookIcon />;
            case 'twitter':
                return <TwitterIcon />;
            case 'instagram':
                return <InstagramIcon />;
            case 'linkedin':
                return <LinkedInIcon />;
            case 'youtube':
                return <YouTubeIcon />;
            default:
                return <PublicIcon />;
        }
    };

    const handleSocialMediaRemove = (socialMedia: ISocialMediaProps) => {
        setStore((old) =>
            old
                ? {
                      ...old,
                      socialMedia: old.socialMedia.filter(
                          (sm) =>
                              sm.value !== socialMedia.value &&
                              sm.type !== socialMedia.type
                      ),
                  }
                : undefined
        );

        if (socialMedia.id !== undefined) {
            const id: number = socialMedia.id;
            setStore((old) =>
                old
                    ? {
                          ...old,
                          socialMediaToRemove:
                              old.socialMediaToRemove === undefined
                                  ? [id]
                                  : [...old.socialMediaToRemove, id],
                      }
                    : ({
                          socialMediaToRemove: [id],
                      } as IStoreUpdateRequestProps)
            );
        }
    };

    const handleSocialMediaAdd = () => {
        if (['', undefined].includes(newSocialMedia.name)) {
            return;
        }

        if (store?.socialMedia === undefined) {
            setStore((old) =>
                old
                    ? {
                          ...old,
                          socialMedia: [
                              {
                                  type: newSocialMedia.type,
                                  value: newSocialMedia.name,
                              },
                          ],
                      }
                    : ({
                          socialMedia: [
                              {
                                  type: newSocialMedia.type,
                                  value: newSocialMedia.name,
                              },
                          ],
                      } as IStoreUpdateRequestProps)
            );
        } else {
            setStore((old) =>
                old
                    ? {
                          ...old,
                          socialMedia: [
                              ...old.socialMedia,
                              {
                                  type: newSocialMedia.type,
                                  value: newSocialMedia.name,
                              },
                          ],
                      }
                    : ({
                          socialMedia: [
                              {
                                  type: newSocialMedia.type,
                                  value: newSocialMedia.name,
                              },
                          ],
                      } as IStoreUpdateRequestProps)
            );
        }
        setNewSocialMedia({ name: '', type: 'FACEBOOK' });
    };

    const handleNewPhoneSubmit = () => {
        if (!newPhone.number) {
            return;
        }

        setStore((old) =>
            old
                ? {
                      ...old,
                      phoneList: [
                          ...old.phoneList,
                          {
                              number: newPhone.number,
                              prefix: newPhone.prefix,
                          },
                      ],
                  }
                : undefined
        );
        setNewPhone({ number: '', prefix: '+33' });
    };

    const handlePhoneRemove = (index: number, phoneId?: number) => {
        setStore((old) =>
            old
                ? {
                      ...old,
                      phoneList: old.phoneList.filter((_, i) => i !== index),
                  }
                : undefined
        );

        if (phoneId) {
            setStore((old) =>
                old
                    ? {
                          ...old,
                          phoneToRemove: old.phoneToRemove
                              ? [...old.phoneToRemove, phoneId]
                              : [phoneId],
                      }
                    : ({ phoneToRemove: [phoneId] } as IStoreUpdateRequestProps)
            );
        }
    };

    return (
        <Stack
            width="100%"
            paddingTop={3}
            paddingBottom={3}
            style={{
                backgroundColor: '#F6F6F6',
                borderRadius: 20,
            }}
        >
            <Box
                position="relative"
                marginBottom={5}
                style={{
                    width: '100%',
                    height: 70,
                    textAlign: 'end',
                    backgroundColor: colors.secondary,
                }}
            >
                <ImageUploader
                    value={store?.cover?.id}
                    onChange={(value) => onImageUpload('cover', value)}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'flex-end',
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
                                marginRight: 33,
                                position: 'absolute',
                            }}
                        />
                    }
                >
                    <img
                        src={logoShop}
                        alt="Profil"
                        width={18}
                        height={15}
                        style={{
                            marginRight: 33,
                        }}
                    />
                </ImageUploader>
                <ImageUploader
                    value={store?.logo?.id}
                    onChange={(value) => onImageUpload('logo', value)}
                    style={{
                        backgroundColor: '#F6F6F6',
                        width: 70,
                        height: 70,
                        bottom: -35,
                        left: 'calc(50% - 35px)',
                        border: '1px solid',
                        borderColor: colors.secondary,
                        borderRadius: 120,
                        position: 'absolute',
                        overflow: 'hidden',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <img src={logoBlue} alt="Profil" width={18} height={15} />
                </ImageUploader>
            </Box>
            <Stack direction="row" gap={2} paddingX={3}>
                <Stack flex={1} gap={2}>
                    <Typography
                        variant="body2"
                        fontWeight="bold"
                        marginBottom={-1}
                    >
                        Information
                    </Typography>
                    <Select
                        label="Catégorie"
                        value={store?.categoryId ?? 0}
                        options={storeCategories?.map((category) => ({
                            value: category.id,
                            label: category.name,
                        }))}
                        onChange={(value) =>
                            setStore((store) =>
                                store
                                    ? {
                                          ...store,
                                          categoryId: value,
                                      }
                                    : ({
                                          categoryId: value,
                                      } as IStoreUpdateRequestProps)
                            )
                        }
                    />
                    <Input
                        label="Nom"
                        value={store?.name ?? ''}
                        onChange={(value) =>
                            setStore((store) =>
                                store
                                    ? {
                                          ...store,
                                          name: value,
                                      }
                                    : ({
                                          name: value,
                                      } as IStoreUpdateRequestProps)
                            )
                        }
                    />
                    <Input
                        label="Description"
                        value={store?.description ?? ''}
                        multiline
                        rows={3}
                        onChange={(value) =>
                            setStore((store) =>
                                store
                                    ? {
                                          ...store,
                                          description: value,
                                      }
                                    : ({
                                          description: value,
                                      } as IStoreUpdateRequestProps)
                            )
                        }
                    />
                </Stack>
                <Stack flex={1} gap={2}>
                    <Typography
                        variant="body2"
                        fontWeight="bold"
                        marginBottom={-1}
                    >
                        Address
                    </Typography>
                    <Input
                        label="Adresse"
                        value={store?.address?.street ?? ''}
                        onChange={(value) =>
                            setStore((store) =>
                                store
                                    ? {
                                          ...store,
                                          address: {
                                              ...store.address,
                                              street: value,
                                          },
                                      }
                                    : ({
                                          address: { street: value },
                                      } as IStoreUpdateRequestProps)
                            )
                        }
                    />
                    <Input
                        label="Ville"
                        value={store?.address?.city ?? ''}
                        onChange={(value) =>
                            setStore((store) =>
                                store
                                    ? {
                                          ...store,
                                          address: {
                                              ...store.address,
                                              city: value,
                                          },
                                      }
                                    : ({
                                          address: { city: value },
                                      } as IStoreUpdateRequestProps)
                            )
                        }
                    />
                    <Input
                        label="Code postal"
                        value={store?.address?.zipCode ?? ''}
                        onChange={(value) =>
                            setStore((store) =>
                                store
                                    ? {
                                          ...store,
                                          address: {
                                              ...store.address,
                                              zipCode: value,
                                          },
                                      }
                                    : ({
                                          address: { zipCode: value },
                                      } as IStoreUpdateRequestProps)
                            )
                        }
                    />
                </Stack>
                <Stack flex={1} gap={2}>
                    <Typography
                        variant="body2"
                        fontWeight="bold"
                        marginBottom={-1}
                    >
                        Contact
                    </Typography>
                    <Input
                        label="Email"
                        value={store?.email ?? ''}
                        type="email"
                        onChange={(value) =>
                            setStore((store) =>
                                store
                                    ? {
                                          ...store,
                                          email: value,
                                      }
                                    : ({
                                          email: value,
                                      } as IStoreUpdateRequestProps)
                            )
                        }
                    />
                    <Stack direction="row" gap={1} flexWrap="wrap">
                        {store?.phoneList?.map((phone, index) => (
                            <Chip
                                key={`phone-${index}`}
                                color="primary"
                                variant={
                                    selectedPhoneIndex === index
                                        ? 'filled'
                                        : 'outlined'
                                }
                                label={`${phone.prefix} ${phone.number}`}
                                icon={<PhoneIphoneIcon />}
                                onDelete={() =>
                                    handlePhoneRemove(index, phone.id)
                                }
                                onClick={() =>
                                    selectedPhoneIndex === index
                                        ? setSelectedPhoneIndex(undefined)
                                        : setSelectedPhoneIndex(index)
                                }
                            />
                        ))}
                    </Stack>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <Stack>
                            <Input
                                placeholder="33 333 33 33"
                                label="Téléphone"
                                value={
                                    selectedPhoneIndex !== undefined
                                        ? store?.phoneList[selectedPhoneIndex]
                                              .number
                                        : newPhone?.number
                                }
                                onChange={(number) =>
                                    selectedPhoneIndex !== undefined
                                        ? setStore((old) =>
                                              old
                                                  ? {
                                                        ...old,
                                                        phoneList: old?.phoneList?.map(
                                                            (phone, index) =>
                                                                index ===
                                                                selectedPhoneIndex
                                                                    ? {
                                                                          ...phone,
                                                                          number,
                                                                      }
                                                                    : phone
                                                        ),
                                                    }
                                                  : ({
                                                        phoneList: [{ number }],
                                                    } as IStoreUpdateRequestProps)
                                          )
                                        : setNewPhone((old) =>
                                              old
                                                  ? { ...newPhone, number }
                                                  : { number, prefix: '+33' }
                                          )
                                }
                                startAdornment={
                                    <InputAdornment position="start">
                                        <TextField
                                            style={{ width: '40px' }}
                                            placeholder="+33"
                                            variant="standard"
                                            InputProps={{
                                                disableUnderline: true,
                                            }}
                                            value={
                                                selectedPhoneIndex !== undefined
                                                    ? store?.phoneList[
                                                          selectedPhoneIndex
                                                      ].prefix
                                                    : newPhone.prefix
                                            }
                                            onChange={(e) =>
                                                setNewPhone((old) => ({
                                                    ...old,
                                                    prefix: e.target.value,
                                                }))
                                            }
                                        />
                                    </InputAdornment>
                                }
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            type="submit"
                                            color="primary"
                                            edge="end"
                                            onMouseDown={(e) =>
                                                e.preventDefault()
                                            }
                                            onClick={() =>
                                                selectedPhoneIndex !== undefined
                                                    ? setSelectedPhoneIndex(
                                                          undefined
                                                      )
                                                    : handleNewPhoneSubmit()
                                            }
                                        >
                                            <AddCircleIcon />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </Stack>
                    </form>
                    <Checkbox
                        style={{ marginTop: -8 }}
                        label="Ne pas afficher mes contacts"
                        checked={store?.hideMyContacts ?? false}
                        onChange={(value) =>
                            setStore((store) =>
                                store
                                    ? {
                                          ...store,
                                          hideMyContacts: value,
                                      }
                                    : ({
                                          hideMyContacts: value,
                                      } as IStoreUpdateRequestProps)
                            )
                        }
                    />
                </Stack>
                <Stack flex={1} gap={2}>
                    <Typography
                        variant="body2"
                        fontWeight="bold"
                        marginBottom={-1}
                    >
                        Site web et réseaux sociaux
                    </Typography>
                    <Input
                        label="Site web"
                        value={store?.website?.value ?? ''}
                        type="url"
                        onChange={(value) =>
                            setStore((store) =>
                                store
                                    ? {
                                          ...store,
                                          website: {
                                              value,
                                              public:
                                                  store.website?.public ??
                                                  false,
                                          },
                                      }
                                    : ({
                                          website: { value, public: false },
                                      } as IStoreUpdateRequestProps)
                            )
                        }
                    />
                    <Checkbox
                        style={{ marginTop: -8 }}
                        label="Cette structure n'a pas de site web"
                        checked={store?.website?.public ?? false}
                        onChange={(value) =>
                            setStore((store) =>
                                store
                                    ? {
                                          ...store,
                                          website: {
                                              value: store.website?.value ?? '',
                                              public: value,
                                          },
                                      }
                                    : ({
                                          website: {
                                              public: value,
                                          },
                                      } as IStoreUpdateRequestProps)
                            )
                        }
                    />
                    <Stack direction="row" gap={1} flexWrap="wrap">
                        {store?.socialMedia?.map((socialMedia, index) => (
                            <Chip
                                key={`social-media-${index}`}
                                color="primary"
                                variant={
                                    selectedSocialMediaIndex === index
                                        ? 'filled'
                                        : 'outlined'
                                }
                                label={socialMedia.value}
                                icon={getSocialMediaIcon(socialMedia.type)}
                                onDelete={() =>
                                    handleSocialMediaRemove(socialMedia)
                                }
                                onClick={() =>
                                    selectedSocialMediaIndex === index
                                        ? setSelectedSocialMediaIndex(undefined)
                                        : setSelectedSocialMediaIndex(index)
                                }
                            />
                        ))}
                    </Stack>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <Input
                            label="Social Media"
                            placeholder="@nom_utilisateur"
                            value={
                                selectedSocialMediaIndex !== undefined
                                    ? store?.socialMedia[
                                          selectedSocialMediaIndex
                                      ].value
                                    : newSocialMedia?.name
                            }
                            onChange={(value) =>
                                selectedSocialMediaIndex !== undefined
                                    ? setStore((old) =>
                                          old
                                              ? {
                                                    ...old,
                                                    socialMedia: old?.socialMedia?.map(
                                                        (sm, index) =>
                                                            index ===
                                                            selectedSocialMediaIndex
                                                                ? {
                                                                      ...sm,
                                                                      value,
                                                                  }
                                                                : sm
                                                    ),
                                                }
                                              : undefined
                                      )
                                    : setNewSocialMedia((old) => ({
                                          ...old,
                                          name: value,
                                      }))
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <Stack direction="row" gap={1}>
                                        <IconButton
                                            type="submit"
                                            color="primary"
                                            edge="end"
                                            onMouseDown={(e) =>
                                                e.preventDefault()
                                            }
                                            onClick={() =>
                                                selectedSocialMediaIndex !==
                                                undefined
                                                    ? setSelectedSocialMediaIndex(
                                                          undefined
                                                      )
                                                    : handleSocialMediaAdd()
                                            }
                                        >
                                            <AddCircleIcon />
                                        </IconButton>
                                        <Divider
                                            orientation="vertical"
                                            style={{ height: 'auto' }}
                                        />
                                        <Select
                                            disableUnderline
                                            size="medium"
                                            variant="standard"
                                            value={
                                                selectedSocialMediaIndex !==
                                                undefined
                                                    ? store?.socialMedia[
                                                          selectedSocialMediaIndex
                                                      ].type
                                                    : newSocialMedia?.type
                                            }
                                            renderValue={(selected) => (
                                                <Stack marginTop={0.5}>
                                                    {getSocialMediaIcon(
                                                        selected
                                                    )}
                                                </Stack>
                                            )}
                                            options={[
                                                {
                                                    value: 'FACEBOOK',
                                                    label: (
                                                        <Stack
                                                            direction="row"
                                                            gap={1}
                                                        >
                                                            <FacebookIcon />
                                                            <ListItemText>
                                                                Facebook
                                                            </ListItemText>
                                                        </Stack>
                                                    ),
                                                },
                                                {
                                                    value: 'INSTAGRAM',
                                                    label: (
                                                        <Stack
                                                            direction="row"
                                                            gap={1}
                                                        >
                                                            <InstagramIcon />
                                                            <ListItemText>
                                                                Instagram
                                                            </ListItemText>
                                                        </Stack>
                                                    ),
                                                },
                                                {
                                                    value: 'TWITTER',
                                                    label: (
                                                        <Stack
                                                            direction="row"
                                                            gap={1}
                                                            alignItems="center"
                                                        >
                                                            <TwitterIcon />
                                                            <ListItemText>
                                                                Twitter
                                                            </ListItemText>
                                                        </Stack>
                                                    ),
                                                },
                                                {
                                                    value: 'LINKEDIN',
                                                    label: (
                                                        <Stack
                                                            direction="row"
                                                            gap={1}
                                                        >
                                                            <LinkedInIcon />
                                                            <ListItemText>
                                                                Linkedin
                                                            </ListItemText>
                                                        </Stack>
                                                    ),
                                                },
                                            ]}
                                            onChange={(value) =>
                                                selectedSocialMediaIndex !==
                                                undefined
                                                    ? setStore((old) =>
                                                          old
                                                              ? {
                                                                    ...old,
                                                                    socialMedia: old?.socialMedia?.map(
                                                                        (
                                                                            sm,
                                                                            index
                                                                        ) =>
                                                                            index ===
                                                                            selectedSocialMediaIndex
                                                                                ? {
                                                                                      ...sm,
                                                                                      type: value,
                                                                                  }
                                                                                : sm
                                                                    ),
                                                                }
                                                              : undefined
                                                      )
                                                    : setNewSocialMedia(
                                                          (old) => ({
                                                              ...old,
                                                              type: value,
                                                          })
                                                      )
                                            }
                                        />
                                    </Stack>
                                </InputAdornment>
                            }
                        />
                    </form>
                </Stack>
            </Stack>
            <Stack gap={1} marginTop={2} paddingX={3}>
                <Typography variant="body2" fontWeight="bold">
                    Configuration des moyens de paiement
                </Typography>
                <Stack direction="row" gap={2}>
                    <PayementMethod
                        paymentMethods={store?.paymentMethods ?? []}
                        setStore={setStore}
                        methodName="CASH"
                    />
                    <PayementMethod
                        paymentMethods={store?.paymentMethods ?? []}
                        setStore={setStore}
                        methodName="CB"
                    />
                    <PayementMethod
                        paymentMethods={store?.paymentMethods ?? []}
                        setStore={setStore}
                        methodName="CHECK"
                    />
                </Stack>
            </Stack>
        </Stack>
    );
};

export default StoreUpdateForm;
