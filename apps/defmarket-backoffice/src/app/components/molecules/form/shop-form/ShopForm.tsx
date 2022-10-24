import React from 'react';
import {
    Box,
    Checkbox,
    FormControlLabel,
    Stack,
    Typography,
} from '@mui/material';
import { colors } from '../../../../theme/colors';
import InputMUI from '../../../atoms/form/input/Input';
import logoShop from '../../../../../assets/images/png/photo-white.png';
import logoBlue from '../../../../../assets/images/png/photo-blue.png';
import Select from '../../../atoms/form/select/Select';
import ImageUploader from '../../image-uploader/ImageUploader';
import { IStore } from '../../../../services/model/store';
import { getAllStoreByCompanyId } from '../../../../services/methodes/store';

interface IStoreFormProps {
    store?: IStore;
    setStore: React.Dispatch<React.SetStateAction<IStore | undefined>>;
    onImageUpload: (field: 'cover' | 'logo', file: File) => void;
    source?: 'compte' | 'company' | 'store' | 'offer';
    withSelect?: { companyId?: number };
    setShopId?: React.Dispatch<React.SetStateAction<number | undefined>>;
    setCategory?: React.Dispatch<
        React.SetStateAction<
            | 'PHYSICAL_AND_E_COMMERCE'
            | 'E_COMMERCE'
            | 'PHYSICAL'
            | ''
            | undefined
        >
    >;
}

const ShopForm = (props: IStoreFormProps) => {
    const [store, setStore] = React.useState<IStore[]>([]);

    React.useEffect(() => {
        if (props?.withSelect?.companyId)
            getAllStoreByCompanyId(props?.withSelect?.companyId)
                .then((res) => {
                    setStore(res);
                })
                .catch((err) => {
                    console.log(err);
                });
    }, [props?.withSelect?.companyId]);

    return props.withSelect === undefined ? (
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
                marginBottom={4}
                style={{
                    width: '100%',
                    height: 70,
                    textAlign: 'end',
                    backgroundColor: colors.secondary,
                }}
            >
                <ImageUploader
                    value={props.store?.cover?.id}
                    onChange={(value) => props.onImageUpload('cover', value)}
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
                    value={props.store?.logo?.id}
                    onChange={(value) => props.onImageUpload('logo', value)}
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

            <Stack
                width="90%"
                alignSelf="center"
                direction="row"
                flexGrow={1}
                gap={6}
            >
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
                        <Select
                            required
                            label="Structure de l'entreprise"
                            value={props.store?.storeType ?? ''}
                            options={[
                                {
                                    value: 'PHYSICAL',
                                    label: 'Structure physique',
                                },
                                {
                                    value: 'E_COMMERCE',
                                    label: 'Structure E-commerce',
                                },
                            ]}
                            onChange={(value) =>
                                props.setStore((store) =>
                                    store
                                        ? {
                                              ...store,
                                              storeType: value,
                                          }
                                        : ({ storeType: value } as IStore)
                                )
                            }
                        />
                        <InputMUI
                            required
                            label="Nom de la boutique"
                            value={props.store?.name ?? ''}
                            onChange={(value) =>
                                props.setStore((store) =>
                                    store
                                        ? {
                                              ...store,
                                              name: value,
                                          }
                                        : ({ name: value } as IStore)
                                )
                            }
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={
                                        props.store
                                            ?.eCommerceAndPhysicalStore ?? false
                                    }
                                    defaultChecked={
                                        props.store?.eCommerceAndPhysicalStore
                                    }
                                    onChange={() =>
                                        props.setStore((store) =>
                                            store
                                                ? {
                                                      ...store,
                                                      eCommerceAndPhysicalStore:
                                                          !store?.eCommerceAndPhysicalStore ??
                                                          true,
                                                  }
                                                : ({
                                                      eCommerceAndPhysicalStore: true,
                                                  } as IStore)
                                        )
                                    }
                                />
                            }
                            label={
                                props.store?.storeType === 'PHYSICAL' ? (
                                    <Typography
                                        fontWeight={600}
                                        fontSize={11}
                                        color="black"
                                        variant="body2"
                                    >
                                        Cette boutique est liée à un site
                                        e-commerce
                                    </Typography>
                                ) : (
                                    <Typography
                                        fontWeight={600}
                                        fontSize={11}
                                        color="black"
                                        variant="body2"
                                    >
                                        Cette boutique est liée à une structure
                                        physique
                                    </Typography>
                                )
                            }
                        />
                    </Stack>
                </Stack>
                <Stack flex={1} marginTop={4}>
                    <InputMUI
                        required
                        multiline
                        label="Description"
                        rows={5}
                        value={props.store?.description ?? ''}
                        onChange={(value) =>
                            props.setStore((store) =>
                                store
                                    ? {
                                          ...store,
                                          description: value,
                                      }
                                    : ({ description: value } as IStore)
                            )
                        }
                    />
                </Stack>
            </Stack>
        </Stack>
    ) : (
        <Stack>
            <Select
                required
                label="Boutiques "
                options={
                    store?.map((item) => {
                        return {
                            label: item.name,
                            value: item.id,
                        };
                    }) ?? []
                }
                onChange={(value) => {
                    if (props.setShopId) props?.setShopId(value);
                    props.setStore(store?.find((item) => item.id === value));
                    if (props.setCategory)
                        props.setCategory(
                            store?.find((item) => item.id === value)?.storeType
                        );
                }}
            />
        </Stack>
    );
};

export default ShopForm;
