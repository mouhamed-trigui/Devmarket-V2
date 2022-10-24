import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';

import { FormControl, RadioGroup, FormControlSelect } from '../../molecules';
import { View, Icon, Divider, KeyboardAvoidingView } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dimensions, Keyboard, Platform } from 'react-native';

import { useIntl } from 'react-intl';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../../stores/slices';

// Atomes
import { Button } from '../../../components/atomes';

// Services
import { companyProps, findBySiren } from '../../../services';
import { findByDenomination } from '../../../services/methodes/auth';

// Services
import { signUpI1, errorProps } from '../../../services';
import { AxiosResponse } from 'axios';
import { secondary } from '../../../theme/colors';
import { SpinnerContext } from '../../atomes/spinner/SpinnerProvider';
import Infodialog from '../../molecules/dialog/info-dialog/Infodialog';
/* eslint-disable-next-line */

export interface FormIdentityEstablishmentRegistrationProps {
    successAction: (res: companyProps) => void;
}

// interface props company
export interface ICompany {
    establishmentName: string;
    establishmentOwnerName: string;
    establishmentOwnerLastName: string;
    type?: 'OTHER' | 'PRIVATE_PERSON' | 'PROFESSIONAL';
    address: string;
    department: string;
    zipCode: string;
    establishmentCity: string;
    country: string;
    siren: string;
    tvaNumber: string;
    post?: 'MANAGER' | 'PRESIDENT';
    typeSearch: string;
    search: string;
}
const StyledFormIdentityEstablishmentRegistration = styled.View`
    padding: 20px;
    align-self: center;
`;

export function FormIdentityEstablishmentRegistration(
    props: FormIdentityEstablishmentRegistrationProps
) {
    const { formatMessage } = useIntl();

    // Redux
    const dispatch = useDispatch();
    const { identity } = useSelector((identity: any) => identity.user);

    // state company & errors
    const [company, setCompany] = React.useState<ICompany>({} as ICompany);
    const [error, setError] = useState<errorProps | undefined | null>(null);

    const [dialog, setDialog] = useState<{
        open: boolean;
        title: string;
        msg: string;
    }>({
        open: false,
        title: '',
        msg: '',
    });

    // Methode
    const [search, setSearch] = useState('');

    const { setSpinnerVisibily } = useContext(SpinnerContext);

    const [keyboardIsShown, setKeyboardIsShown] = useState(false);

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardIsShown(true);
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardIsShown(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    useEffect(() => {
        const findCompany = async (search: string) => {
            if (search.length === 0) {
                setCompany((company) => ({
                    ...company,
                    establishmentCity: '',
                    establishmentName: '',
                    address: '',
                    zipCode: '',
                    siren: '',
                    tvaNumber: '',
                    establishmentOwnerName: '',
                    establishmentOwnerLastName: '',
                }));
            } else {
                if (company?.typeSearch === 'SIREN') {
                    if (search.length === 9) {
                        await findBySiren(parseInt(search))
                            .then((res: any) => {
                                if (res.status === 200) {
                                    const unite_legale = res.data.unite_legale;
                                    setCompany((company) => ({
                                        ...company,
                                        establishmentCity:
                                            unite_legale?.etablissement_siege
                                                ?.libelle_commune ?? '',
                                        establishmentName:
                                            unite_legale?.denomination ?? '',
                                        address:
                                            unite_legale?.etablissement_siege
                                                ?.geo_adresse ?? '',
                                        zipCode:
                                            unite_legale?.etablissement_siege
                                                ?.code_postal ?? '',
                                        siren: unite_legale?.siren ?? '',
                                        tvaNumber:
                                            unite_legale.numero_tva_intra ?? '',
                                        establishmentOwnerName:
                                            unite_legale?.prenom_1 ?? '',
                                        establishmentOwnerLastName:
                                            unite_legale?.prenom_2 ?? '',
                                    }));
                                }
                            })
                            .catch((err: any) => {
                                console.log(err);
                                setCompany((company) => ({
                                    ...company,
                                    establishmentCity: '',
                                    establishmentName: '',
                                    address: '',
                                    zipCode: '',
                                    siren: '',
                                    tvaNumber: '',
                                    establishmentOwnerName: '',
                                    establishmentOwnerLastName: '',
                                }));
                            });
                    }
                } else {
                    // if (search.length >= 3)
                    await findByDenomination(search.toUpperCase())
                        .then((res: any) => {
                            const unite_legale = res.data.unites_legales[0];
                            setCompany((company) => ({
                                ...company,
                                establishmentCity:
                                    unite_legale?.etablissement_siege
                                        ?.libelle_commune ?? '',
                                establishmentName:
                                    unite_legale?.denomination ?? '',
                                address:
                                    unite_legale?.etablissement_siege
                                        ?.geo_adresse ?? '',
                                zipCode:
                                    unite_legale?.etablissement_siege
                                        ?.code_postal ?? '',
                                siren: unite_legale?.siren ?? '',
                                tvaNumber: unite_legale.numero_tva_intra ?? '',
                                establishmentOwnerName:
                                    unite_legale?.prenom_1 ?? '',
                                establishmentOwnerLastName:
                                    unite_legale?.prenom_2 ?? '',
                            }));
                        })
                        .catch((err: any) => {
                            console.log(err);
                            setCompany((company) => ({
                                ...company,
                                establishmentCity: '',
                                establishmentName: '',
                                address: '',
                                zipCode: '',
                                siren: '',
                                tvaNumber: '',
                                establishmentOwnerName: '',
                                establishmentOwnerLastName: '',
                            }));
                        });
                }
            }
        };

        const searchTimer = setTimeout(() => findCompany(search), 1000);
        return () => {
            clearTimeout(searchTimer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    // Methode signup to add company
    const SIGNUP = async () => {
        setSpinnerVisibily(true);
        dispatch(
            userActions.setIdentity({
                ...identity,
                establishmentName: company?.establishmentName,
                establishmentOwnerName: company.establishmentOwnerName,
                establishmentOwnerLastName: company.establishmentOwnerLastName,
                type: company?.type,
                address: company?.address,
                department: company?.department,
                zipCode: company?.zipCode,
                establishmentCity: company?.establishmentCity,
                siren: company?.siren,
                tvaNumber: company?.tvaNumber,
                post: company?.post,
            })
        );
        await signUpI1({
            address: {
                city: company?.establishmentCity,
                department: company?.department,
                street: company?.address,
                pays: company?.country,
                zipCode: company?.zipCode,
            },
            companyType: company?.type,
            name: company?.establishmentName,
            siren: company?.siren,
            tva: company?.tvaNumber,
            leaderType: company?.post,
            ruler: {
                name: company.establishmentOwnerName,
                lastName: company.establishmentOwnerLastName,
            },
        })
            .then((response: AxiosResponse<companyProps>) => {
                setSpinnerVisibily(false);
                if (response.status === 200) {
                    props.successAction(response.data);
                }
            })
            .catch((err) => {
                setSpinnerVisibily(false);
                setError(err);

                if (err?.response?.status === 409) {
                    setDialog({
                        open: true,
                        title: 'Attention',
                        msg:
                            'Le SIREN de votre établissement est déjà utilisé, vous ne pouvez pas créer une structure avec ce SIREN. Pour en savoir plus contactez les administrateurs',
                    });
                } else {
                    setDialog({
                        open: true,
                        title: 'Attention',
                        msg: "Erreur lors de l'ajout d'une entreprise",
                    });
                }
            });
    };

    return (
        <KeyboardAvoidingView
            style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
            }}
            behavior="padding"
            enabled={keyboardIsShown}
            keyboardVerticalOffset={-550}
        >
            <StyledFormIdentityEstablishmentRegistration
                style={{ paddingTop: 0 }}
            >
                <Infodialog
                    isOpen={dialog.open}
                    onClose={() => setDialog({ ...dialog, open: false })}
                    title={dialog.title}
                    body={dialog.msg}
                />
                <RadioGroup
                    key="search-type"
                    value={company?.typeSearch}
                    label={''}
                    defaultValue="NOM"
                    name="filterby"
                    marginRight={5}
                    items={[
                        {
                            label: formatMessage({
                                id: 'IDQ31s',
                                description: 'Par nom',
                                defaultMessage: 'Par nom',
                            }),
                            value: 'NOM',
                        },
                        {
                            label: formatMessage({
                                id: 'IDQ32s',
                                description: 'Par numéro de SIREN',
                                defaultMessage: 'Par numéro de SIREN',
                            }),
                            value: 'SIREN',
                        },
                    ]}
                    onChange={(value: any) =>
                        setCompany((company) => ({
                            ...company,
                            typeSearch: value,
                        }))
                    }
                />

                <FormControl
                    InputLeftElement={
                        <Icon
                            as={
                                <Ionicons
                                    name={'md-search'}
                                    size={32}
                                    color="white"
                                    style={{ paddingHorizontal: 5 }}
                                />
                            }
                            size={5}
                            color="muted.400"
                        />
                    }
                    label=""
                    placeholder={formatMessage({
                        id: 'IMF03s',
                        description: 'Rechercher',
                        defaultMessage: 'Rechercher',
                    })}
                    value={search}
                    type="input"
                    variant="underlined"
                    error={null}
                    errorMessage={null}
                    helperText={null}
                    onChange={(value: React.SetStateAction<string>) =>
                        setSearch(value)
                    }
                />
                <FormControlSelect
                    isRequired
                    label=""
                    placeholderTextColor="white"
                    placeholder={formatMessage({
                        id: 'IDQ15s',
                        description: 'Type de structure',
                        defaultMessage: 'Type de structure',
                    })}
                    value={company?.type}
                    items={[
                        {
                            label: formatMessage({
                                id: 'IjT09s',
                                description: 'Entreprise individuelle',
                                defaultMessage: 'Entreprise individuelle',
                            }),
                            value: 'PRIVATE_PERSON',
                        },
                        {
                            label: formatMessage({
                                id: 'IjT15s',
                                description: 'Societé',
                                defaultMessage: 'Societé',
                            }),
                            value: 'PROFESSIONAL',
                        },
                        {
                            label: formatMessage({
                                id: 'IjT14s',
                                description:
                                    'Autres (Centre commerciale, marque...)',
                                defaultMessage:
                                    'Autres (Centre commerciale, marque...)',
                            }),
                            value: 'OTHER',
                        },
                    ]}
                    error={null}
                    errorMessage={null}
                    helperText={null}
                    onChange={(value: any) =>
                        setCompany((company) => ({
                            ...company,
                            type: value,
                        }))
                    }
                />
                <FormControl
                    label=""
                    isRequired
                    placeholder={formatMessage({
                        id: 'IMT04s',
                        description: "Nom de l'entreprise",
                        defaultMessage: "Nom de l'entreprise",
                    })}
                    value={company?.establishmentName}
                    type="input"
                    error={null}
                    errorMessage={null}
                    helperText={null}
                    onChange={(value: any) =>
                        setCompany((company) => ({
                            ...company,
                            establishmentName: value,
                        }))
                    }
                />
                <FormControl
                    label=""
                    isRequired
                    placeholder={formatMessage({
                        id: 'IMT05s',
                        description: "Adresse de l'entreprise",
                        defaultMessage: "Adresse de l'entreprise",
                    })}
                    value={company?.address}
                    type="input"
                    error={null}
                    errorMessage={null}
                    helperText={null}
                    onChange={(value: any) =>
                        setCompany((company) => ({
                            ...company,
                            address: value,
                        }))
                    }
                />
                <FormControl
                    label=""
                    isRequired
                    placeholder={formatMessage({
                        id: 'IMT06s',
                        description: 'Code Postal',
                        defaultMessage: 'Code Postal',
                    })}
                    value={company?.zipCode}
                    type="input"
                    error={null}
                    errorMessage={null}
                    helperText={null}
                    onChange={(value: any) =>
                        setCompany((company) => ({
                            ...company,
                            zipCode: value,
                        }))
                    }
                />
                <FormControl
                    label=""
                    isRequired
                    placeholder={formatMessage({
                        id: 'IDQ4ks',
                        description: "Ville de l'entreprise",
                        defaultMessage: "Ville de l'entreprise",
                    })}
                    value={company?.establishmentCity}
                    type="input"
                    error={null}
                    errorMessage={null}
                    helperText={null}
                    onChange={(value: any) =>
                        setCompany((company) => ({
                            ...company,
                            establishmentCity: value,
                        }))
                    }
                />

                <FormControl
                    label=""
                    isRequired
                    placeholder={formatMessage({
                        id: 'IMT07s',
                        description: 'Numéro de SIREN',
                        defaultMessage: 'Numéro de SIREN',
                    })}
                    value={company.siren}
                    type="input"
                    error={null}
                    errorMessage={null}
                    helperText={null}
                    onChange={(value: any) =>
                        setCompany((company) => ({
                            ...company,
                            siren: value,
                        }))
                    }
                />
                <FormControl
                    label=""
                    placeholder={formatMessage({
                        id: 'IMT08s',
                        description: 'Numéro de TVA (facultatif)',
                        defaultMessage: 'Numéro de TVA (facultatif)',
                    })}
                    value={company.tvaNumber}
                    type="input"
                    error={null}
                    errorMessage={null}
                    helperText={null}
                    onChange={(value: any) =>
                        setCompany((company) => ({
                            ...company,
                            tvaNumber: value,
                        }))
                    }
                />

                <Divider
                    bgColor={secondary[50]}
                    style={{
                        width: Dimensions.get('window').width,
                    }}
                    thickness={4}
                    my={5}
                />

                <RadioGroup
                    key="company-post"
                    name="post"
                    flexDirection="column"
                    label={formatMessage({
                        id: 'IDQ6ks',
                        description: 'Je suis :',
                        defaultMessage: 'Je suis :',
                    })}
                    value={company?.post}
                    defaultValue={undefined}
                    items={[
                        {
                            label: formatMessage({
                                id: 'IMT01s',
                                description: 'Le dirigeant',
                                defaultMessage: 'Le dirigeant',
                            }),
                            value: 'MANAGER',
                        },
                        {
                            label: formatMessage({
                                id: 'IMT02s',
                                description: 'Le responsable',
                                defaultMessage: 'Le responsable',
                            }),
                            value: 'PRESIDENT',
                        },
                    ]}
                    onChange={(value: any) =>
                        setCompany((company) => ({
                            ...company,
                            post: value,
                        }))
                    }
                />
                {company.post === 'PRESIDENT' && (
                    <View>
                        <FormControl
                            label=""
                            isRequired
                            placeholder={formatMessage({
                                id: 'IMT11s',
                                description: 'Nom du dirigeant',
                                defaultMessage: 'Nom du dirigeant',
                            })}
                            value={company.establishmentOwnerLastName}
                            type="input"
                            error={null}
                            errorMessage={null}
                            helperText={null}
                            onChange={(value: any) =>
                                setCompany((company) => ({
                                    ...company,
                                    establishmentOwnerLastName: value,
                                }))
                            }
                        />
                        <FormControl
                            label=""
                            isRequired
                            placeholder={formatMessage({
                                id: 'IMT10s',
                                description: 'Prénom du dirigeant',
                                defaultMessage: 'Prénom du dirigeant',
                            })}
                            value={company.establishmentOwnerName}
                            type="input"
                            error={null}
                            errorMessage={null}
                            helperText={null}
                            onChange={(value: any) =>
                                setCompany((company) => ({
                                    ...company,
                                    establishmentOwnerName: value,
                                }))
                            }
                        />
                    </View>
                )}
                <Button
                    alignSelf="center"
                    style={{ marginTop: 20 }}
                    label={formatMessage({
                        id: '3IsZkr',
                        description: "J'ajoute mon entreprise",
                        defaultMessage: "J'ajoute mon entreprise",
                    })}
                    width={
                        Platform?.OS === 'web'
                            ? '300'
                            : Dimensions.get('window').width - 50
                    }
                    moreParams={{
                        disabled:
                            company?.post === 'PRESIDENT'
                                ? company.type === undefined ||
                                  company.establishmentName === '' ||
                                  company.address === '' ||
                                  company.zipCode === '' ||
                                  company.establishmentCity === '' ||
                                  company.siren === '' ||
                                  company.establishmentOwnerName === '' ||
                                  company.establishmentOwnerLastName === ''
                                : company?.type === undefined ||
                                  company.establishmentName === '' ||
                                  company.address === '' ||
                                  company.zipCode === '' ||
                                  company.establishmentCity === '' ||
                                  company.siren === '' ||
                                  company.post === undefined,
                    }}
                    onPress={SIGNUP}
                />
            </StyledFormIdentityEstablishmentRegistration>
        </KeyboardAvoidingView>
    );
}

export default FormIdentityEstablishmentRegistration;
