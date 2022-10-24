import React from 'react';
import { Box, Divider, Stack, Typography } from '@mui/material';
import Input from '../../../atoms/form/input/Input';
import RadioGroup from '../../../atoms/form/radio/RadioGroup';
import Select from '../../../atoms/form/select/Select';
import {
    findByDenomination,
    getCompanyByUserId,
} from '../../../../services/methodes/company';
import { ICompany, IRuler } from '../../../../services/model/accounts';
import { IAddress } from '../../../../services/model/common';
import { AxiosResponse } from 'axios';
import { IStructure } from '../../../../services/model/company';
import InputAutoComplete from '../../input-auto-complete/InputAutoComplete';

interface ICompanyFormProps {
    company?: ICompany;
    setCompany: React.Dispatch<React.SetStateAction<ICompany | undefined>>;
    setCompanyId?: React.Dispatch<React.SetStateAction<number | undefined>>;
    withSearch?: boolean;
    gap?: number;
    withSelect?: { userId?: number };
    source?: 'compte' | 'company' | 'store' | 'offer' | undefined;
}

const CompanyForm = (props: ICompanyFormProps) => {
    // Methode of search
    const [search, setSearch] = React.useState('');
    const [searchType, setSearchType] = React.useState<'SIREN' | 'NOM'>('NOM');

    const [company, setCompany] = React.useState<ICompany[]>([]);

    const [data, setData] = React.useState<IStructure[]>([]);

    const [selectedCompany, setSelectedCompany] = React.useState<IStructure>();

    const [showSearchData, setShowSearchData] = React.useState(false);

    React.useEffect(() => {
        if (props?.withSelect?.userId)
            getCompanyByUserId(props?.withSelect?.userId)
                .then((res) => {
                    setCompany(res);
                })
                .catch((err) => {
                    console.log(err);
                });
    }, [props?.withSelect?.userId]);

    React.useEffect(() => {
        props.setCompany((company) =>
            company
                ? {
                      ...company,
                      name: selectedCompany?.nom_complet ?? '',
                      address: {
                          city: selectedCompany
                              ? selectedCompany.siege?.libelle_commune
                              : '',
                          street:
                              selectedCompany?.siege?.adresse_complete ?? '',
                          zipCode: selectedCompany?.siege?.code_postal ?? '',
                      },
                      siren: selectedCompany?.siren ?? '',
                      tva: '',
                      ruler: {
                          name: '',
                          lastName: '',
                      } as IRuler,
                  }
                : ({
                      name: selectedCompany ? selectedCompany.nom_complet : '',
                      address: {
                          city: selectedCompany
                              ? selectedCompany.siege?.libelle_commune
                              : '',
                          street: selectedCompany
                              ? selectedCompany.siege?.adresse_complete
                              : '',
                          zipCode: selectedCompany
                              ? selectedCompany.siege?.code_postal
                              : '',
                      },
                      siren: selectedCompany ? selectedCompany.siren : '',
                      tva: '',
                      ruler: {
                          name: '',
                          lastName: '',
                      } as IRuler,
                  } as ICompany)
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCompany]);

    // use Effect for search company by name or siret
    React.useEffect(() => {
        const findCompany = async (search: string) => {
            if (search.length === 0) {
                setData([]);
                props.setCompany((company) =>
                    company
                        ? {
                              ...company,
                              name: '',
                              address: {} as IAddress,
                              siren: '',
                              tva: '',
                              ruler: {} as IRuler,
                          }
                        : undefined
                );
            } else {
                if (searchType === 'SIREN') {
                    if (search.length === 9) {
                        await findByDenomination(search)
                            .then((data) => {
                                setData(data);
                                setShowSearchData(!showSearchData);
                            })
                            .catch((err: AxiosResponse) => {
                                if (err.status === 410) {
                                    alert(
                                        'Service non disponible pour le moment.. Essaies de remlpir le formulaire manuellement'
                                    );
                                }
                                setData([]);
                                props.setCompany((company) =>
                                    company
                                        ? {
                                              ...company,
                                              name: '',
                                              address: {} as IAddress,
                                              siren: '',
                                              tva: '',
                                              ruler: {} as IRuler,
                                          }
                                        : undefined
                                );
                            });
                    }
                } else {
                    await findByDenomination(search.toUpperCase())
                        .then((data) => {
                            setData(data);
                            setShowSearchData(!showSearchData);
                        })
                        .catch((err: AxiosResponse) => {
                            if (err.status === 410) {
                                alert(
                                    'Service non disponible pour le moment.. Essaies de remlpir le formulaire manuellement'
                                );
                            }
                            setData([]);
                            props.setCompany((company) =>
                                company
                                    ? {
                                          ...company,
                                          name: '',
                                          address: {} as IAddress,
                                          siren: '',
                                          tva: '',
                                          ruler: {} as IRuler,
                                      }
                                    : undefined
                            );
                        });
                }
            }
        };

        if (props.withSearch) {
            const searchTimer = setTimeout(() => findCompany(search), 1000);
            return () => {
                clearTimeout(searchTimer);
            };
        } else {
            return () => null;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    return props.withSelect === undefined ? (
        <Stack direction="column" flexGrow={1} gap={props.withSearch ? 3 : 2}>
            <Typography fontWeight="bold" variant="body2">
                Information de l'entreprise
            </Typography>
            {props.withSearch && (
                <>
                    <Box>
                        <Stack
                            direction="row"
                            flexGrow={1}
                            gap={6}
                            justifyContent="space-between"
                        >
                            <RadioGroup
                                id="search"
                                required
                                directionRow
                                defaultValue="NOM"
                                value={searchType}
                                radioList={[
                                    { value: 'NOM', label: 'Par nom' },
                                    { value: 'SIREN', label: 'Par SIREN' },
                                ]}
                                onChange={setSearchType}
                            />
                            <InputAutoComplete
                                search={search}
                                data={data}
                                showSearchData={showSearchData}
                                setData={setData}
                                setSearch={setSearch}
                                setSelectedCompany={setSelectedCompany}
                                setShowSearchData={setShowSearchData}
                            />
                        </Stack>
                    </Box>
                    <Divider />
                </>
            )}
            <Stack
                direction="row"
                flexGrow={1}
                gap={props?.gap ?? 8}
                justifyContent="space-between"
            >
                <Stack
                    gap={2}
                    flexGrow={1}
                    marginTop={props.withSearch ? 1 : 0}
                >
                    <Select
                        required
                        value={props.company?.companyType ?? ''}
                        label="Type d'entreprise"
                        options={[
                            {
                                value: 'PRIVATE_PERSON',
                                label: 'Entreprise individuelle',
                            },
                            {
                                value: 'PROFESSIONAL',
                                label: 'Societé',
                            },
                            {
                                value: 'OTHER',
                                label: 'Autres (Centre commerciale, marque...)',
                            },
                        ]}
                        onChange={(value) => {
                            props.setCompany((company) =>
                                company
                                    ? {
                                          ...company,
                                          companyType: value,
                                      }
                                    : ({ companyType: value } as ICompany)
                            );
                        }}
                    />
                    <Input
                        required
                        label="Nom de l'entreprise"
                        value={props.company?.name ?? ''}
                        onChange={(value) => {
                            props.setCompany((company) =>
                                company
                                    ? {
                                          ...company,
                                          name: value,
                                      }
                                    : ({ name: value } as ICompany)
                            );
                        }}
                    />
                    <Input
                        required
                        label="Adresse de l'entreprise"
                        value={props.company?.address?.street ?? ''}
                        onChange={(value) => {
                            props.setCompany((company) =>
                                company
                                    ? {
                                          ...company,
                                          address: {
                                              ...company.address,
                                              street: value,
                                          },
                                      }
                                    : ({
                                          address: { street: value },
                                      } as ICompany)
                            );
                        }}
                    />
                    <Input
                        required
                        label="Code postal"
                        value={props.company?.address?.zipCode ?? ''}
                        onChange={(value) => {
                            props.setCompany((company) =>
                                company
                                    ? {
                                          ...company,
                                          address: {
                                              ...company.address,
                                              zipCode: value,
                                          },
                                      }
                                    : ({
                                          address: { zipCode: value },
                                      } as ICompany)
                            );
                        }}
                    />
                    <Input
                        required
                        label="Ville"
                        value={props.company?.address?.city ?? ''}
                        onChange={(value) => {
                            props.setCompany((company) =>
                                company
                                    ? {
                                          ...company,
                                          address: {
                                              ...company.address,
                                              city: value,
                                          },
                                      }
                                    : ({
                                          address: { city: value },
                                      } as ICompany)
                            );
                        }}
                    />
                </Stack>
                <Stack
                    flexGrow={1}
                    gap={2}
                    marginTop={props.withSearch ? 1 : 0}
                >
                    <Input
                        required
                        label="Numéro de SIREN"
                        value={props.company?.siren ?? ''}
                        onChange={(value) => {
                            props.setCompany((company) =>
                                company
                                    ? {
                                          ...company,
                                          siren: value,
                                      }
                                    : ({ siren: value } as ICompany)
                            );
                        }}
                    />
                    <Input
                        label="Numéro de TVA (facultatif)"
                        value={props.company?.tva ?? ''}
                        onChange={(value) => {
                            props.setCompany((company) =>
                                company
                                    ? {
                                          ...company,
                                          tva: value,
                                      }
                                    : ({ tva: value } as ICompany)
                            );
                        }}
                    />
                    <RadioGroup
                        id="leader"
                        required
                        directionRow
                        value={props.company?.leaderType ?? null}
                        radioList={[
                            { value: 'MANAGER', label: 'Dirigeant' },
                            { value: 'PRESIDENT', label: 'Responsable' },
                        ]}
                        onChange={(value: 'PRESIDENT' | 'MANAGER' | null) => {
                            props.setCompany((company) =>
                                company
                                    ? {
                                          ...company,
                                          leaderType: value,
                                      }
                                    : ({ leaderType: value } as ICompany)
                            );
                        }}
                    />
                    {props.company?.leaderType === 'PRESIDENT' && (
                        <>
                            <Input
                                required
                                label="Nom du dirigeant"
                                value={props.company?.ruler?.lastName ?? ''}
                                onChange={(value) => {
                                    props.setCompany((company) =>
                                        company
                                            ? {
                                                  ...company,
                                                  ruler: {
                                                      ...company.ruler,
                                                      lastName: value,
                                                  } as IRuler,
                                              }
                                            : ({
                                                  ruler: {
                                                      lastName: value,
                                                  } as IRuler,
                                              } as ICompany)
                                    );
                                }}
                            />
                            <Input
                                required
                                label="Prénom du dirigeant"
                                value={props.company?.ruler?.name ?? ''}
                                onChange={(value) => {
                                    props.setCompany((company) =>
                                        company
                                            ? {
                                                  ...company,
                                                  ruler: {
                                                      ...company.ruler,
                                                      name: value,
                                                  },
                                              }
                                            : ({
                                                  ruler: {
                                                      name: value,
                                                  } as IRuler,
                                              } as ICompany)
                                    );
                                }}
                            />
                        </>
                    )}
                </Stack>
            </Stack>
        </Stack>
    ) : (
        <Stack>
            <Select
                required
                label="Entreprises"
                options={
                    company?.map((item) => {
                        return {
                            label: item.name,
                            value: item.id,
                        };
                    }) ?? []
                }
                onChange={(value) => {
                    if (props.setCompanyId) props?.setCompanyId(value);
                }}
            />
        </Stack>
    );
};

export default CompanyForm;
