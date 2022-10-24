import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { useIntl } from 'react-intl';
import moment from 'moment';

// Import Document Picker
import {
    FormControl,
    RadioGroup,
    FormControlSelect,
    FormControlGroup,
} from '../../molecules';

import { Platform, Dimensions } from 'react-native';
import { Divider, Stack } from 'native-base';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../../stores/slices';

import DatePickerModal from '../../atomes/datePicker/DatePickerModal';
import AddressAutocomplete from '../../molecules/address-autocomplete/AddressAutocomplete';

// Atomes
import { Button } from '../../../components/atomes';

// Services
import { signUpI0, errorProps } from '../../../services';
import {
    getAllJobRef,
    getJobsByParentId,
} from '../../../services/methodes/job';
import { JobProps } from '../../../services/model/job';
import { secondary } from '../../../theme/colors';
import { SpinnerContext } from '../../atomes/spinner/SpinnerProvider';

/* eslint-disable-next-line */
export interface FormIdentityRegistrationProps {
    // state to increment step
    nextStep: () => void;
}
const StyledFormIdentityRegistration = styled.View`
    padding: 20px;
`;

// interface props identity
export interface IUserIdentity {
    name: string;
    lastname: string;
    birthday: any;
    city: string;
    department: string;
    zipCode: string;
    phone: any;
    prefix: string;
    gender: 'MALE' | 'FEMALE';
    formerMember: undefined;
    inActivity: 'ACTIVE' | 'NOT_ACTIVE';
    category: string;
    job: number | null;
    source:
        | 'WEB_SITE'
        | 'RECOMMENDATION'
        | 'SOCIAL_MEDIA'
        | 'PARTNER'
        | 'OTHER';
    anotherSource: string;
}

export function FormIdentityRegistration(props: FormIdentityRegistrationProps) {
    const { formatMessage } = useIntl();
    // Redux
    const dispatch = useDispatch();
    const { identity } = useSelector((identity: any) => identity.user);
    const { user } = useSelector((state: any) => state.user);

    const [date, setDate] = useState<any>(
        moment(new Date(1598051730000)).format('DD/MM/YYYY')
    );

    // jobs list
    const [jobsList, setJobsList] = useState<JobProps[]>([]);

    //state identity & errors
    const [userIdentity, setUserIdentity] = React.useState<IUserIdentity>(
        {} as IUserIdentity
    );
    const [error, setError] = useState<errorProps | undefined | null>(null);

    // job data state
    const [data, setData] = useState([{} as JobProps]);

    const { setSpinnerVisibily } = useContext(SpinnerContext);

    //use effect
    useEffect(() => {
        getAllJobRef(0).then((response: JobProps[]) => setData(response));
        return () => {
            setData([]);
        };
    }, []);

    // get Jobs by parent id
    const getJobsByParent = (value: number) => {
        getJobsByParentId(1, value).then((res: JobProps[]) => {
            setJobsList(res);
        });
    };

    const getDepartmentNumber = (zipCode: string) => {
        const departmentNumber = zipCode.substring(0, 2);
        if (departmentNumber === '97' || departmentNumber === '98') {
            return zipCode.substring(0, 3);
        } else {
            return departmentNumber;
        }
    };
    // Methode signup to add user
    const SIGNUP = async () => {
        setSpinnerVisibily(true);
        dispatch(
            userActions.setIdentity({
                ...identity,
                name: userIdentity.name,
                lastname: userIdentity?.lastname,
                gender: userIdentity?.gender,
                phone: userIdentity?.phone,
                prefix: userIdentity?.prefix,
                birthday: userIdentity?.birthday,
                city: userIdentity?.city,
                userDepartment: userIdentity?.department,
                userZipCode: userIdentity?.zipCode,
                category: userIdentity?.category,
                job: userIdentity.job,
                source: userIdentity?.source,
                inActivity: userIdentity?.inActivity,
                formerMember: userIdentity?.formerMember === 'true',
                anotherSource: userIdentity?.anotherSource,
            })
        );
        await signUpI0({
            firstName: userIdentity?.name,
            lastName: userIdentity?.lastname,
            gender: userIdentity?.gender,
            phone: {
                prefix: userIdentity?.prefix,
                number: userIdentity?.phone,
            },
            birthday: userIdentity?.birthday,
            address: {
                pays: '',
                department: userIdentity?.department ?? '',
                zipCode: userIdentity?.zipCode ?? '',
                city: userIdentity?.city,
                street: '',
            },
            jobId:
                userIdentity?.formerMember === 'true' ? userIdentity.job : null, //userIdentity?.job, // TODO : change job with jobId
            knowUsThrough: userIdentity?.source,
            activity:
                userIdentity?.formerMember === 'true'
                    ? userIdentity?.inActivity
                    : null,
            veteran: userIdentity?.formerMember === 'true',
            knowUsThroughOtherValue: userIdentity?.anotherSource, // TODO : validation mode !!!
            validationMode: { type: 'DOCUMENT', value: 'string' },
        })
            .then((response: any) => {
                setSpinnerVisibily(false);
                if (response.status === 200) {
                    dispatch(
                        userActions.setUser({
                            ...user,
                            completeRegistration: {
                                ...user.completeRegistration,
                                identityValidated: true,
                            },
                        })
                    );

                    props.nextStep();
                }
            })
            .catch((err: errorProps) => {
                setSpinnerVisibily(false);
                setError(err);
            });
    };
    return (
        <StyledFormIdentityRegistration style={{ paddingTop: 0 }}>
            <RadioGroup
                key="gender"
                value={userIdentity?.gender}
                label={formatMessage({
                    id: 'IDQ6ks',
                    description: 'Je suis :',
                    defaultMessage: 'Je suis :',
                })}
                name="gender"
                defaultValue="homme"
                items={[
                    {
                        label: formatMessage({
                            id: 'IDQ7ks',
                            description: 'Un homme',
                            defaultMessage: 'Un homme',
                        }),
                        value: 'MALE',
                    },
                    {
                        label: formatMessage({
                            id: 'IDQ8ks',
                            description: 'Une femme',
                            defaultMessage: 'Une femme',
                        }),
                        value: 'FEMALE',
                    },
                ]}
                onChange={(value: any) =>
                    setUserIdentity((userIdentity) => ({
                        ...userIdentity,
                        gender: value,
                    }))
                }
            />
            <FormControl
                isRequired
                value={userIdentity?.name}
                onChange={(value: string) =>
                    setUserIdentity((userIdentity) => ({
                        ...userIdentity,
                        name: value,
                    }))
                }
                label=""
                placeholder={formatMessage({
                    id: 'IDQ1ks',
                    description: 'Prénom',
                    defaultMessage: 'Prénom',
                })}
                type="input"
                error={null}
                errorMessage={null}
                helperText={null}
            />
            <FormControl
                isRequired
                label=""
                placeholder={formatMessage({
                    id: 'IDQ2ks',
                    description: 'Nom',
                    defaultMessage: 'Nom',
                })}
                value={userIdentity?.lastname}
                type="input"
                error={null}
                errorMessage={null}
                helperText={null}
                onChange={(value: string) =>
                    setUserIdentity((userIdentity) => ({
                        ...userIdentity,
                        lastname: value,
                    }))
                }
            />

            <Stack alignItems="center" key="birthDay">
                <DatePickerModal
                    mode="date"
                    style={{ marginVertical: 5 }}
                    color="#FFFFFF"
                    placeholder={formatMessage({
                        id: 'IDQ3ks',
                        description: 'Date de naissance',
                        defaultMessage: 'Date de naissance',
                    })}
                    value={userIdentity?.birthday}
                    onChange={(value: string) =>
                        setUserIdentity((userIdentity) => ({
                            ...userIdentity,
                            birthday: value,
                        }))
                    }
                />
            </Stack>
            <AddressAutocomplete
                type="city"
                onChange={{
                    onCityChange: (value: string) =>
                        setUserIdentity((userIdentity) => ({
                            ...userIdentity,
                            city: value,
                        })),
                    onPostalCodeChange: (value: string) =>
                        setUserIdentity((userIdentity) => ({
                            ...userIdentity,
                            department: value ? getDepartmentNumber(value) : '',
                            zipCode: value,
                        })),
                }}
                values={{
                    city: userIdentity?.city,
                }}
                placeholder={formatMessage({
                    id: 'IDQ4ks',
                    description: 'Ville de résidence',
                    defaultMessage: 'Ville de résidence',
                })}
            />
            <FormControlGroup
                isRequired
                placeholderPrefix="+33"
                valuePrefix={userIdentity?.prefix}
                onChangePrefix={(value: string) =>
                    setUserIdentity((userIdentity) => ({
                        ...userIdentity,
                        prefix: value,
                    }))
                }
                placeholder={formatMessage({
                    id: 'IDQ5ks',
                    description: 'Numéro de téléphone',
                    defaultMessage: 'Numéro de téléphone',
                })}
                value={userIdentity?.phone}
                onChange={(value: number) =>
                    setUserIdentity((userIdentity) => ({
                        ...userIdentity,
                        phone: value,
                    }))
                }
            />
            <Divider
                key="dividerPhone"
                bgColor={secondary[50]}
                style={{
                    width: Dimensions.get('window').width,
                }}
                thickness={4}
                my={5}
            />
            <RadioGroup
                key="formerMember"
                name="formerMember"
                label={formatMessage({
                    id: 'IDQ9ks',
                    description:
                        'Es-tu actuellement, ou as tu déjà été, un membre des 1ères lignes ?',
                    defaultMessage:
                        'Es-tu actuellement, ou as tu déjà été, un membre des 1ères lignes ?',
                })}
                labelAlign="center"
                value={userIdentity?.formerMember}
                defaultValue={undefined}
                items={[
                    {
                        label: formatMessage({
                            id: 'IDQ10s',
                            description: 'Oui',
                            defaultMessage: 'Oui',
                        }),
                        value: 'true',
                    },
                    {
                        label: formatMessage({
                            id: 'IDQ11s',
                            description: 'Non',
                            defaultMessage: 'Non',
                        }),
                        value: 'false',
                    },
                ]}
                textMarginBottom={20}
                onChange={(value: any) =>
                    setUserIdentity((userIdentity) => ({
                        ...userIdentity,
                        formerMember: value,
                    }))
                }
            />
            {userIdentity?.formerMember === 'true' && (
                <>
                    <FormControlSelect
                        isRequired
                        label=""
                        placeholderTextColor="white"
                        placeholder={formatMessage({
                            id: 'IDQA11b',
                            description: 'Catégorie professionnelle',
                            defaultMessage: 'Catégorie professionnelle',
                        })}
                        value={userIdentity?.category}
                        items={
                            data.map((item) => {
                                return {
                                    label: item.job.jobName,
                                    value: item.job.id.toString(),
                                };
                            }) ?? []
                        }
                        error={null}
                        errorMessage={null}
                        helperText={null}
                        onChange={(value: string) => {
                            setUserIdentity((userIdentity) => ({
                                ...userIdentity,
                                category: value,
                            }));
                            setJobsList([]);
                            getJobsByParent(Number(value));
                        }}
                    />
                    <FormControlSelect
                        isRequired
                        label=""
                        placeholderTextColor="white"
                        placeholder={formatMessage({
                            id: 'IDQA11c',
                            description: 'Institution',
                            defaultMessage: 'Institution',
                        })}
                        value={userIdentity?.job}
                        items={jobsList?.map((item) => {
                            return {
                                label: item.job.jobName,
                                value: item.job.id.toString(),
                            };
                        })}
                        error={null}
                        errorMessage={null}
                        helperText={null}
                        onChange={(value: any) =>
                            setUserIdentity((userIdentity) => ({
                                ...userIdentity,
                                job: value,
                            }))
                        }
                    />
                    {Boolean(userIdentity?.job) && (
                        <RadioGroup
                            key="inActivity"
                            name="inActivity"
                            label=""
                            value={userIdentity?.inActivity}
                            defaultValue={undefined}
                            items={[
                                {
                                    label: formatMessage({
                                        id: 'IDQ13s',
                                        description: 'En activité',
                                        defaultMessage: 'En activité',
                                    }),
                                    value: 'ACTIVE',
                                },
                                {
                                    label: formatMessage({
                                        id: 'IDQ14s',
                                        description: 'Pas en activité',
                                        defaultMessage: 'Pas en activité',
                                    }),
                                    value: 'NOT_ACTIVE',
                                },
                            ]}
                            onChange={(value: any) =>
                                setUserIdentity((userIdentity) => ({
                                    ...userIdentity,
                                    inActivity: value,
                                }))
                            }
                        />
                    )}
                </>
            )}
            <Divider
                key="dividerActivity"
                bgColor={secondary[50]}
                style={{
                    width: Dimensions.get('window').width,
                }}
                thickness={4}
                my={5}
            />
            <FormControlSelect
                isRequired
                label={formatMessage({
                    id: 'IDQ27s',
                    description: 'Comment as-tu connu \n DEFMARKET ?',
                    defaultMessage: 'Comment as-tu connu \n DEFMARKET ?',
                })}
                placeholderTextColor="white"
                placeholder={formatMessage({
                    id: 'IDQ19s',
                    description: 'Sélectionne une option',
                    defaultMessage: 'Sélectionne une option',
                })}
                value={userIdentity?.source}
                items={[
                    {
                        label: formatMessage({
                            id: 'IDQ40s',
                            description: 'Site Internet',
                            defaultMessage: 'Site Internet',
                        }),
                        value: 'WEB_SITE', // TODO : GET KEY
                    },
                    {
                        label: formatMessage({
                            id: 'IDQ20s',
                            description: "Partage d'un membre",
                            defaultMessage: "Partage d'un membre",
                        }),
                        value: 'RECOMMENDATION',
                    },
                    {
                        label: formatMessage({
                            id: 'IDQ41s',
                            description: 'Via un partenaire',
                            defaultMessage: 'Via un partenaire',
                        }),
                        value: 'PARTNER', // TODO : GET KEY
                    },

                    {
                        label: formatMessage({
                            id: 'IDQ24s',
                            description: 'Réseaux sociaux',
                            defaultMessage: 'Réseaux sociaux',
                        }),
                        value: 'SOCIAL_MEDIA',
                    },
                    {
                        label: formatMessage({
                            id: 'IDQ26s',
                            description: 'Autre',
                            defaultMessage: 'Autre',
                        }),
                        value: 'OTHER',
                    },
                ]}
                error={null}
                errorMessage={null}
                helperText={null}
                onChange={(value: any) =>
                    setUserIdentity((userIdentity) => ({
                        ...userIdentity,
                        source: value,
                    }))
                }
            />
            {userIdentity?.source === 'OTHER' && (
                <FormControl
                    label=""
                    placeholder={formatMessage({
                        id: 'IDQtks',
                        description: 'Dîtes nous',
                        defaultMessage: 'Dîtes nous',
                    })}
                    value={userIdentity?.anotherSource}
                    type="input"
                    error={null}
                    errorMessage={null}
                    helperText={null}
                    onChange={(value: string) =>
                        setUserIdentity((userIdentity) => ({
                            ...userIdentity,
                            anotherSource: value,
                        }))
                    }
                />
            )}

            <Button
                alignSelf="center"
                style={{ marginTop: 40 }}
                width={
                    Platform?.OS === 'web'
                        ? '300'
                        : Dimensions.get('window').width - 50
                }
                label={formatMessage({
                    id: '4IsZks',
                    description: 'Suivant',
                    defaultMessage: 'Suivant',
                })}
                moreParams={{
                    disabled:
                        userIdentity.formerMember === 'true'
                            ? !userIdentity.gender ||
                              !userIdentity.lastname ||
                              !userIdentity.name ||
                              !userIdentity.birthday ||
                              !userIdentity.city ||
                              !userIdentity.phone ||
                              !userIdentity.formerMember ||
                              !userIdentity.inActivity ||
                              !userIdentity.job ||
                              !userIdentity.source
                            : !userIdentity.gender ||
                              !userIdentity.lastname ||
                              !userIdentity.name ||
                              !userIdentity.birthday ||
                              !userIdentity.city ||
                              !userIdentity.phone ||
                              !userIdentity.formerMember ||
                              !userIdentity.source,
                }}
                onPress={SIGNUP}
            />
        </StyledFormIdentityRegistration>
    );
}

export default FormIdentityRegistration;
