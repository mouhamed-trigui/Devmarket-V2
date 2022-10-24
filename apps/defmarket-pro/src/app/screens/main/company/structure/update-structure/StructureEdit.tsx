import React, { useContext, useState } from 'react';
import { useIntl } from 'react-intl';
import { Dimensions, Platform } from 'react-native';
import {
    FormControl,
    FormControlSelect,
    RadioGroup,
    YesNoDialog,
} from '../../../../../components/molecules';
import { companyProps, deleteCompany } from '../../../../../services';
import { Divider, View, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/core';
import { useDispatch } from 'react-redux';
import { companyActions } from '../../../../../stores/slices/company/companySlice';
import { Button, SafeArea } from '../../../../../components/atomes';
import { secondary } from '../../../../../theme/colors';
import Infodialog from '../../../../../components/molecules/dialog/info-dialog/Infodialog';
import { SpinnerContext } from '../../../../../components/atomes/spinner/SpinnerProvider';

export interface ICompanyEdit {
    route: any;
}

const StructureEdit = (props: ICompanyEdit) => {
    // data passed with navigation
    const data = props.route?.params?.data;

    // local state company
    const [company, setCompany] = useState<companyProps>(data);

    // navigation
    const navigation = useNavigation();

    // redux dispatch
    const dispatch = useDispatch();

    const { setSpinnerVisibily } = useContext(SpinnerContext);

    // translate
    const { formatMessage } = useIntl();

    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const onClose = () => setIsOpen(false);

    // Local states for info dialog
    const [info, setInfo] = React.useState(false);

    const title = 'Information';

    const description =
        'Veuillez contacter un administrateur afin de modifier les données de votre entreprise.';

    // Methode
    /* const handleUpdate = async () => {
        updateCompany(company.id, company).then((data) => {
            dispatch(companyActions.updateCompany(data));
            navigation.goBack();
        });
    }; */

    const handleCompanyDelete = () => {
        setSpinnerVisibily(true);
        deleteCompany(company.id)
            .then(() => {
                dispatch(companyActions.deleteCompany(company.id));
                navigation.goBack();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => setSpinnerVisibily(false));
    };

    return (
        <SafeArea>
            <Infodialog
                isOpen={info}
                onClose={() => setInfo(false)}
                title={title}
                body={description}
            />
            <YesNoDialog
                isOpen={isOpen}
                onClose={onClose}
                onPress={handleCompanyDelete}
                title="Supprimer l'entreprise"
                body="Vous allez supprimer cette entreprise et toutes ses boutiques. Êtes-vous sûr? Les données supprimées ne peuvent pas être récupérées."
            />
            <VStack space={2} flexGrow={1}>
                <View marginTop="20px">
                    <FormControl
                        disabled
                        isRequired
                        label=""
                        type="input"
                        placeholder={formatMessage({
                            id: 'IMT04s',
                            description: "Nom de l'entreprise",
                            defaultMessage: "Nom de l'entreprise",
                        })}
                        placeholderTextColor="system.200"
                        helperText={null}
                        value={company?.name}
                        onChange={(value: string) =>
                            setCompany((old) => ({ ...old, name: value }))
                        }
                    />
                    <FormControlSelect
                        disabled
                        isRequired
                        label=""
                        placeholderTextColor="white"
                        placeholder={formatMessage({
                            id: 'IDQ15s',
                            description: 'choisir...',
                            defaultMessage: 'choisir...',
                        })}
                        value={company?.companyType}
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
                                companyType: value,
                            }))
                        }
                    />
                    <FormControl
                        disabled
                        isRequired
                        label=""
                        type="input"
                        placeholder={formatMessage({
                            id: 'IMT05s',
                            description: "Adresse de l'entreprise",
                            defaultMessage: "Adresse de l'entreprise",
                        })}
                        placeholderTextColor="system.200"
                        helperText={null}
                        value={company?.address.street}
                        onChange={(value: string) =>
                            setCompany((old) => ({
                                ...old,
                                address: { ...old.address, street: value },
                            }))
                        }
                    />
                    <FormControl
                        disabled
                        isRequired
                        label=""
                        type="input"
                        placeholder={formatMessage({
                            id: 'IMT06s',
                            description: 'Code Postal',
                            defaultMessage: 'Code Postal',
                        })}
                        placeholderTextColor="system.200"
                        helperText={null}
                        value={company?.address.zipCode}
                        onChange={(value: string) =>
                            setCompany((old) => ({
                                ...old,
                                address: { ...old.address, zipCode: value },
                            }))
                        }
                    />
                    <FormControl
                        disabled
                        isRequired
                        label=""
                        type="input"
                        placeholder={formatMessage({
                            id: 'IMT03s',
                            description: "Ville de l'entreprise",
                            defaultMessage: "Ville de l'entreprise",
                        })}
                        placeholderTextColor="system.200"
                        helperText={null}
                        value={company?.address.city}
                        onChange={(value: string) =>
                            setCompany((old) => ({
                                ...old,
                                address: { ...old.address, city: value },
                            }))
                        }
                    />
                    <FormControl
                        disabled
                        isRequired
                        label=""
                        type="input"
                        placeholder={formatMessage({
                            id: 'IMT07s',
                            description: 'Numéro de SIRET ou SIREN',
                            defaultMessage: 'Numéro de SIRET ou SIREN',
                        })}
                        placeholderTextColor="system.200"
                        helperText={null}
                        value={company?.siren}
                        onChange={(value: string) =>
                            setCompany((old) => ({ ...old, siren: value }))
                        }
                    />
                    <FormControl
                        disabled
                        label=""
                        type="input"
                        placeholder={formatMessage({
                            id: 'IMT08s',
                            description: 'Numéro de TVA (facultatif)',
                            defaultMessage: 'Numéro de TVA (facultatif)',
                        })}
                        placeholderTextColor="system.200"
                        helperText={null}
                        value={company?.tva}
                        onChange={(value: string) =>
                            setCompany((old) => ({ ...old, tva: value }))
                        }
                    />
                </View>

                <Divider bgColor={secondary[50]} thickness={4} my={5} />

                <RadioGroup
                    disabled
                    name="leaderType"
                    flexDirection="column"
                    label={formatMessage({
                        id: 'IDQ6ks',
                        description: 'Je suis :',
                        defaultMessage: 'Je suis :',
                    })}
                    value={company?.leaderType}
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
                            leaderType: value,
                        }))
                    }
                />
                {company.leaderType === 'PRESIDENT' && (
                    <View>
                        <FormControl
                            disabled
                            label=""
                            isRequired
                            placeholder={formatMessage({
                                id: 'IMT10s',
                                description: 'Prénom du dirigeant',
                                defaultMessage: 'Prénom du dirigeant',
                            })}
                            value={company.ruler.name}
                            type="input"
                            error={null}
                            errorMessage={null}
                            helperText={null}
                            onChange={(value: any) =>
                                setCompany((company) => ({
                                    ...company,
                                    ruler: { ...company.ruler, name: value },
                                }))
                            }
                        />
                        <FormControl
                            disabled
                            label=""
                            isRequired
                            placeholder={formatMessage({
                                id: 'IMT11s',
                                description: 'Nom du dirigeant',
                                defaultMessage: 'Nom du dirigeant',
                            })}
                            value={company.ruler.lastName}
                            type="input"
                            error={null}
                            errorMessage={null}
                            helperText={null}
                            onChange={(value: any) =>
                                setCompany((company) => ({
                                    ...company,
                                    ruler: {
                                        ...company.ruler,
                                        lastName: value,
                                    },
                                }))
                            }
                        />
                    </View>
                )}
            </VStack>
            <VStack space={5} marginTop={30} marginBottom={50}>
                <Button
                    backgroundColor="secondary.100"
                    width="100%"
                    alignSelf="center"
                    maxWidth={
                        Platform?.OS === 'web'
                            ? '300'
                            : Dimensions.get('window').width - 50
                    }
                    label={formatMessage({
                        id: 'UCypHH',
                        description: "Supprimer l'entreprise",
                        defaultMessage: "Supprimer l'entreprise",
                    })}
                    onPress={() => setIsOpen(true)}
                />
                <Button
                    width="100%"
                    alignSelf="center"
                    maxWidth={
                        Platform?.OS === 'web'
                            ? '300'
                            : Dimensions.get('window').width - 50
                    }
                    label={formatMessage({
                        id: 'UCypVV',
                        description: 'Mettre à jour',
                        defaultMessage: 'Mettre à jour',
                    })}
                    moreParams={{
                        disabled:
                            company?.leaderType === 'PRESIDENT'
                                ? company.name === '' ||
                                  company.address.street === '' ||
                                  company.address.zipCode === '' ||
                                  company.address.city === '' ||
                                  company.siren === '' ||
                                  company.ruler.name === '' ||
                                  company.ruler.lastName === ''
                                : company.name === '' ||
                                  company.address.street === '' ||
                                  company.address.zipCode === '' ||
                                  company.address.city === '' ||
                                  company.siren === '' ||
                                  company.leaderType === undefined,
                    }}
                    onPress={() => setInfo(true)}
                />
            </VStack>
        </SafeArea>
    );
};

export default StructureEdit;
