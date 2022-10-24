import { Autocomplete, Stack, TextField, Typography } from '@mui/material';
import { JobProps } from '../../../../services/model/job';
import { IProAccountProps, IUser } from '../../../../services/model/accounts';
import Input from '../../../atoms/form/input/Input';
import RadioGroup from '../../../atoms/form/radio/RadioGroup';
import Select from '../../../atoms/form/select/Select';
import {
    getAllJobRef,
    getJobsByParentId,
} from '../../../../services/methodes/job';
import React from 'react';
import { getUserByNameOrEmail } from '../../../../services/methodes/accounts';

import AddressAutocomplete from '../../address-autocomplete/address-autocomplete';
import { getDepartmentNumber } from '../../../../utils/address/codeDepatement';
interface IIdentityProps {
    user: IUser;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
    setUserId: React.Dispatch<React.SetStateAction<number | undefined>>;
    source?: 'compte' | 'company' | 'store' | 'offer' | undefined;
}

const IdentityForm = (props: IIdentityProps) => {
    // job categories List
    const [jobCategories, setJobCategories] = React.useState<JobProps[]>();

    // Subjobs data of the selected Job
    const [jobsList, setJobsList] = React.useState<JobProps[]>();

    const [inputValue, setInputValue] = React.useState('');

    const [users, setUsers] = React.useState<IProAccountProps[]>([]);

    //use effect to get job list
    React.useEffect(() => {
        getAllJobRef(0).then((response: JobProps[]) =>
            setJobCategories(response)
        );
        return () => {
            setJobCategories([]);
        };
    }, []);

    // get Jobs by parent id
    const getJobsByParent = (value: number) => {
        getJobsByParentId(1, value).then((res: JobProps[]) => {
            setJobsList(res);
        });
    };

    React.useEffect(() => {
        if (props.user.category) {
            getJobsByParent(props.user.category);
        }

        return () => {
            setJobsList(undefined);
        };
    }, [props.user.category]);

    React.useEffect(() => {
        if (inputValue.length > 0)
            getUserByNameOrEmail(inputValue).then((res: IProAccountProps[]) => {
                setUsers(res);
            });
    }, [inputValue]);

    return props.source === 'compte' ? (
        <Stack direction="row" flexGrow={1} gap={6}>
            <Stack flex={1}>
                <Typography
                    fontWeight={600}
                    fontSize={13}
                    color="black"
                    style={{ marginBottom: 5 }}
                    variant="body2"
                >
                    Information Personnelles
                </Typography>
                <RadioGroup
                    id="gender"
                    required
                    value={props.user.gender}
                    directionRow
                    radioList={[
                        { value: 'MALE', label: 'Un homme' },
                        { value: 'FEMALE', label: 'Une femme' },
                    ]}
                    onChange={(value: any) => {
                        props.setUser((user) => ({
                            ...user,
                            gender: value,
                        }));
                    }}
                />
                <Stack gap={2} marginTop={1}>
                    <Input
                        required
                        label="Nom"
                        value={props.user.firstName ?? ''}
                        onChange={(value) => {
                            props.setUser((user) => ({
                                ...user,
                                firstName: value,
                            }));
                        }}
                    />
                    <Input
                        required
                        label="Prénom"
                        value={props.user.lastName ?? ''}
                        onChange={(value) => {
                            props.setUser((user) => ({
                                ...user,
                                lastName: value,
                            }));
                        }}
                    />
                    <Input
                        required
                        type="date"
                        label="Date de naissance"
                        value={props.user.birthday}
                        onChange={(value) => {
                            props.setUser((user) => ({
                                ...user,
                                birthday: value,
                            }));
                        }}
                    />

                    <AddressAutocomplete
                        variant="filled"
                        searchType="city"
                        onClick={(item: any) => {
                            props.setUser((user) =>
                                user
                                    ? {
                                          ...user,
                                          address: {
                                              ...item,
                                              department:
                                                  getDepartmentNumber(
                                                      item?.postalCode
                                                  ) ?? item?.department,
                                          },
                                      }
                                    : ({
                                          address: {
                                              ...item,
                                              department:
                                                  getDepartmentNumber(
                                                      item?.postalCode
                                                  ) ?? item?.department,
                                          },
                                      } as any)
                            );
                        }}
                        defaultValue={props?.user?.address?.city ?? ''}
                        placeholder={'Ville'}
                    />

                    <Input
                        required
                        label="N° de téléphone"
                        type="tel"
                        value={props?.user?.phone?.number ?? ''}
                        onChange={(value) => {
                            props.setUser((user) => ({
                                ...user,
                                phone: { ...user.phone, number: value },
                            }));
                        }}
                    />
                    <Input
                        required
                        type="email"
                        label="Email"
                        value={props.user.email ?? ''}
                        onChange={(value) => {
                            props.setUser((user) => ({
                                ...user,
                                email: value,
                            }));
                        }}
                    />
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
                    Membre de la Défense National
                </Typography>
                <RadioGroup
                    id="veteran"
                    required
                    directionRow
                    value={props.user.veteran ?? false}
                    radioList={[
                        { value: true, label: 'Oui' },
                        { value: false, label: 'Non' },
                    ]}
                    onChange={(value) => {
                        props.setUser((user) => ({
                            ...user,
                            veteran: value,
                        }));
                    }}
                />
                {props.user.veteran === true && (
                    <Stack gap={2} marginTop={1}>
                        <Select
                            required
                            label="Catégorie professionnelle"
                            value={props.user.category ?? ''}
                            options={
                                jobCategories?.map((item) => {
                                    return {
                                        label: item.job.jobName,
                                        value: item.job.id,
                                    };
                                }) ?? []
                            }
                            onChange={(value) => {
                                props.setUser((user) => ({
                                    ...user,
                                    category:
                                        typeof value === 'number'
                                            ? value
                                            : Number(value),
                                }));
                            }}
                        />
                        <Select
                            required
                            label="Institution"
                            value={props.user.jobId ?? ''}
                            options={
                                jobsList?.map((item) => {
                                    return {
                                        label: item.job.jobName,
                                        value: item.job.id,
                                    };
                                }) ?? []
                            }
                            onChange={(value) =>
                                props.setUser((user) => ({
                                    ...user,
                                    jobId: Number(value),
                                }))
                            }
                        />
                        <RadioGroup
                            id="activity"
                            required
                            directionRow
                            value={props.user.activity}
                            radioList={[
                                {
                                    value: 'ACTIVE',
                                    label: 'En activité',
                                },
                                {
                                    value: 'NOT_ACTIVE',
                                    label: 'Pas en activité',
                                },
                            ]}
                            onChange={(value) => {
                                props.setUser((user) => ({
                                    ...user,
                                    activity: value,
                                }));
                            }}
                        />
                    </Stack>
                )}
            </Stack>
        </Stack>
    ) : (
        <Stack>
            <Autocomplete
                freeSolo
                id="user"
                disableClearable
                options={users}
                getOptionLabel={(option: any) =>
                    option?.firstName +
                    ' ' +
                    option?.lastName +
                    ' : ' +
                    option?.email
                }
                onChange={(e, value) =>
                    typeof value !== 'string'
                        ? props.setUserId(value.id)
                        : undefined
                }
                filterOptions={(x) => x}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                inputValue={inputValue}
                renderInput={(params) => (
                    <TextField
                        required
                        {...params}
                        label="Rechercher un commerçant"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            onKeyDown: (event) => {
                                if (event.key === 'Enter') {
                                    // Prevent's default 'Enter' behavior.
                                    event.stopPropagation();
                                }
                            },
                        }}
                    />
                )}
            />
        </Stack>
    );
};

export default IdentityForm;
