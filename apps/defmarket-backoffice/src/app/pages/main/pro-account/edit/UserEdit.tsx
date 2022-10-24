// assets
import ProfilePng from '../../../../../assets/images/png/notif-profil.png';

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

// components
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import Input from '../../../../components/atoms/form/input/Input';
import RadioGroup from '../../../../components/atoms/form/radio/RadioGroup';
import Select from '../../../../components/atoms/form/select/Select';
import FileUploader from '../../../../components/molecules/file-uploader/FileUploader';
import { IAddress, IPhone } from '../../../../services/model/common';
import { FC, useContext, useEffect, useMemo, useState } from 'react';
import Actions from './Actions';
import Container from './Container';
import { IProAccountProps, updateUser } from '../../../../services';
import { JobProps } from '../../../../services/model/job';
import {
    validateUserInfo,
    blockUser,
} from '../../../../services/methodes/accounts';
import {
    getAllJobRef,
    getJobsByParentId,
} from '../../../../services/methodes/job';
import { AlertContext } from '../../../../context/alert/AlertProvider';

import { IAddressProps } from '../../../../services/model/common';
import AddressAutocomplete from '../../../../components/molecules/address-autocomplete/address-autocomplete';
import { getDepartmentNumber } from '../../../../utils/address/codeDepatement';
import { ErrorHandlerContext } from '../../../../context/errorHandler/ErrorHandlerProvider';

interface IUserEditProps {
    expanded?: boolean;
    handleAccordionChange?: () => void;
    next?: () => void;
    userData: IProAccountProps;
    setUserData: React.Dispatch<React.SetStateAction<IProAccountProps>>;
    handleUserBlock: (block: boolean, reason: string) => void;
    handleUserValidation: () => void;
}

const UserEdit: FC<IUserEditProps> = ({
    expanded,
    handleAccordionChange,
    next,
    userData,
    setUserData,
    handleUserBlock,
    handleUserValidation,
}) => {
    const [userIdentityFile, setUserIdentityFile] = useState<File>();

    const [userJobCategory, setUserJobCategory] = useState<number | undefined>(
        userData.job?.parent?.id
    );

    const [userJob, setUserJob] = useState<number | undefined>(
        userData.job?.id
    );

    // job categories List
    const [jobCategories, setJobCategories] = useState<JobProps[]>();

    // Subjobs data of the selected Job
    const [jobsList, setJobsList] = useState<JobProps[]>();

    const [newEmail, setNewEmail] = useState<{
        new: string;
        confirm: string;
    }>();
    const [newPassword, setNewPassword] = useState<{
        new: string;
        confirm: string;
    }>();

    // Methode of search
    const [search, setSearch] = useState('');
    const [addressOptions, setAddressOptions] = useState<IAddressProps[]>([]);
    const [showList, setShowList] = useState(false);

    const { showAlert } = useContext(AlertContext);
    const { handleError } = useContext(ErrorHandlerContext);

    useEffect(() => {
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

    const userInfo: any = useMemo(() => {
        if (userData?.job?.parent) {
            getJobsByParent(userData?.job?.parent?.id);
            setUserJobCategory(userData?.job?.parent?.id);
            setUserJob(userData.job?.id);
        }
    }, [userData?.job?.parent]);

    useEffect(() => {
        if (userJobCategory) {
            getJobsByParent(userJobCategory);
        }

        return () => {
            setJobsList(undefined);
        };
    }, [userJobCategory]);

    const handleUserDataChange = (key: string, value: any) => {
        setUserData((userData) =>
            userData
                ? {
                      ...userData,
                      [key]: value,
                  }
                : ({
                      [key]: value,
                  } as IProAccountProps)
        );
    };

    const handleUserJobChange = (value: number, category?: boolean) => {
        if (category) {
            setUserJobCategory(value);
        } else {
            setUserJob(value);
        }
    };

    const newEmailIsValid = useMemo(
        () =>
            newEmail?.new !== '' &&
            newEmail?.new !== undefined &&
            newEmail?.new !== newEmail?.confirm,
        [newEmail]
    );

    const newPasswordIsValid = useMemo(
        () =>
            newPassword?.new !== '' &&
            newPassword?.new !== undefined &&
            newPassword?.new !== newPassword?.confirm,
        [newPassword]
    );

    const handleUserUpdate = () => {
        updateUser(
            userData.id,
            {
                ...userData,
                address:
                    userData.address ??
                    ({ city: userData.residenceCity } as IAddress),
                jobId: userJob,
                password:
                    newPassword?.new &&
                    newPassword?.new === newPassword?.confirm
                        ? newPassword?.new
                        : undefined,
                email:
                    newEmail?.new && newEmail?.new === newEmail?.confirm
                        ? newEmail?.new
                        : userData.email,
            },
            userIdentityFile
        )
            .then(() => {
                if (next) next();
                showAlert('Le profil a été mis à jour avec succès', 'success');
            })
            .catch((err) => handleError(err));
    };

    return (
        <Accordion
            expanded={expanded}
            onChange={handleAccordionChange}
            disableGutters
            // elevation={0}
            style={{ paddingInline: 70 }}
        >
            <AccordionSummary>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    flexGrow={1}
                >
                    <Stack direction="row" alignItems="center">
                        <img
                            src={ProfilePng}
                            alt="Profil"
                            width={25}
                            height={25}
                            style={{ marginRight: '10px' }}
                        />
                        <Typography variant="h4" fontWeight="bold">
                            Informations personnelles de l'utilisateur
                        </Typography>
                    </Stack>
                    {userData?.blocked ? (
                        <CancelRoundedIcon color="error" fontSize="medium" />
                    ) : (
                        <CheckCircleRoundedIcon
                            color={
                                userData.validatedInfoByAdmin
                                    ? 'success'
                                    : 'warning'
                            }
                            fontSize="medium"
                        />
                    )}
                </Stack>
            </AccordionSummary>
            <AccordionDetails>
                <Container>
                    <Stack flex={1}>
                        <Typography variant="body2" fontWeight="bold">
                            Information Personnelles
                        </Typography>
                        <Stack gap={2} marginTop={1}>
                            <RadioGroup
                                directionRow
                                radioList={[
                                    {
                                        value: 'MALE',
                                        label: 'Un homme',
                                    },
                                    {
                                        value: 'FEMALE',
                                        label: 'Une femme',
                                    },
                                ]}
                                value={userData?.gender}
                                onChange={(value) =>
                                    handleUserDataChange('gender', value)
                                }
                            />
                            <Input
                                label="Nom"
                                value={userData?.lastName}
                                onChange={(value) =>
                                    handleUserDataChange('lastName', value)
                                }
                            />
                            <Input
                                key="firstName"
                                label="Prénom"
                                value={userData?.firstName}
                                onChange={(value) =>
                                    handleUserDataChange('firstName', value)
                                }
                            />
                            <Input
                                type="date"
                                label="Date de naissance"
                                value={userData?.birthday}
                                onChange={(date) =>
                                    handleUserDataChange('birthday', date)
                                }
                            />
                            <Input
                                label="Ville de naissance"
                                value={userData?.birthCity}
                                onChange={(value) =>
                                    handleUserDataChange('birthCity', value)
                                }
                            />

                            <AddressAutocomplete
                                variant="filled"
                                searchType="city"
                                onClick={(item: any) => {
                                    handleUserDataChange('address', {
                                        city: item?.city,
                                        street: item?.label,
                                        country: item?.country,
                                        department:
                                            getDepartmentNumber(
                                                item?.postalCode
                                            ) ?? item?.department,
                                        zipCode: item?.postalCode,
                                    } as IAddress);
                                }}
                                defaultValue={userData?.residenceCity}
                                placeholder={'Ville de résidence'}
                            />

                            <Input
                                label="N° de téléphone"
                                type="tel"
                                value={userData?.phone?.number ?? ''}
                                onChange={(value) =>
                                    setUserData((userData) => ({
                                        ...userData,
                                        phone: userData?.phone
                                            ? {
                                                  ...userData?.phone,
                                                  number: value,
                                              }
                                            : ({
                                                  number: value,
                                              } as IPhone),
                                    }))
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
                                                userData?.phone?.prefix ?? ''
                                            }
                                            onChange={(e) =>
                                                setUserData((userData) => ({
                                                    ...userData,
                                                    phone: userData?.phone
                                                        ? {
                                                              ...userData?.phone,
                                                              prefix:
                                                                  e.target
                                                                      .value,
                                                          }
                                                        : ({
                                                              prefix:
                                                                  e.target
                                                                      .value,
                                                          } as IPhone),
                                                }))
                                            }
                                        />
                                    </InputAdornment>
                                }
                            />
                        </Stack>
                    </Stack>
                    <Stack flex={1}>
                        <Typography variant="body2" fontWeight="bold">
                            Membre de la Défense National
                        </Typography>

                        <Stack gap={2} marginTop={1}>
                            <RadioGroup
                                directionRow
                                radioList={[
                                    { value: true, label: 'Oui' },
                                    { value: false, label: 'Non' },
                                ]}
                                value={userData?.veteran}
                                onChange={(value) =>
                                    handleUserDataChange('veteran', value)
                                }
                            />
                            {userData?.veteran === true && (
                                <>
                                    <Select
                                        label="Catégorie"
                                        options={jobCategories?.map(
                                            (category) => ({
                                                value: category.id,
                                                label: category.job.jobName,
                                            })
                                        )}
                                        value={userJobCategory}
                                        onChange={(value) =>
                                            handleUserJobChange(value, true)
                                        }
                                    />
                                    <Select
                                        label="Intitulé"
                                        options={jobsList?.map((job) => ({
                                            value: job.id,
                                            label: job.job.jobName,
                                        }))}
                                        value={userJob}
                                        onChange={(value) =>
                                            handleUserJobChange(value)
                                        }
                                    />

                                    <RadioGroup
                                        directionRow
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
                                        value={userData?.activity}
                                        onChange={(value) =>
                                            handleUserDataChange(
                                                'activity',
                                                value
                                            )
                                        }
                                    />
                                </>
                            )}
                        </Stack>
                        <FileUploader
                            value={userData?.documents?.justificationIdentity}
                            onChange={setUserIdentityFile}
                        />
                    </Stack>
                    <Stack flex={1}>
                        <Typography variant="body2" fontWeight="bold">
                            Identifiant
                        </Typography>
                        <Stack gap={2} marginTop={1}>
                            <Input
                                readOnly
                                label="E-mail"
                                type="email"
                                value={userData?.email}
                            />
                            <Input
                                label="Nouvel e-mail"
                                type="email"
                                value={newEmail?.new}
                                onChange={(value) =>
                                    setNewEmail((newEmail) =>
                                        newEmail
                                            ? {
                                                  ...newEmail,
                                                  new: value,
                                              }
                                            : {
                                                  new: value,
                                                  confirm: '',
                                              }
                                    )
                                }
                                error={newEmailIsValid}
                            />
                            <Input
                                label="Confirmer le nouvel e-mail"
                                type="email"
                                value={newEmail?.confirm}
                                onChange={(value) =>
                                    setNewEmail((newEmail) =>
                                        newEmail
                                            ? {
                                                  ...newEmail,
                                                  confirm: value,
                                              }
                                            : {
                                                  confirm: value,
                                                  new: '',
                                              }
                                    )
                                }
                                error={newEmailIsValid}
                                helperText={
                                    newEmailIsValid
                                        ? 'Les e-mails ne correspondent pas'
                                        : undefined
                                }
                            />
                        </Stack>
                        <Typography
                            variant="body2"
                            fontWeight="bold"
                            marginTop={6}
                        >
                            Mot de passe
                        </Typography>
                        <Stack gap={2} marginTop={1}>
                            {/* <Input
                                        label="Mot de passe"
                                        type="password"
                                    /> */}
                            <Input
                                label="Nouveau mot de passe"
                                type="password"
                                value={newPassword?.new}
                                onChange={(value) =>
                                    setNewPassword((newPassword) =>
                                        newPassword
                                            ? {
                                                  ...newPassword,
                                                  new: value,
                                              }
                                            : {
                                                  new: value,
                                                  confirm: '',
                                              }
                                    )
                                }
                                error={newPasswordIsValid}
                            />
                            <Input
                                label="Confirmer le nouveau mot de passe"
                                type="password"
                                value={newPassword?.confirm}
                                onChange={(value) =>
                                    setNewPassword((newPassword) =>
                                        newPassword
                                            ? {
                                                  ...newPassword,
                                                  confirm: value,
                                              }
                                            : {
                                                  confirm: value,
                                                  new: '',
                                              }
                                    )
                                }
                                error={newPasswordIsValid}
                                helperText={
                                    newPasswordIsValid
                                        ? 'Les mots de passe ne correspondent pas'
                                        : undefined
                                }
                            />
                        </Stack>
                    </Stack>
                </Container>
                <Actions
                    block={{
                        onClick: handleUserBlock,
                        isBlocked: userData?.blocked,
                    }}
                    validate={{
                        onClick: handleUserValidation,
                    }}
                    showValidate={
                        !userData?.validatedInfoByAdmin && !userData?.blocked
                    }
                    update={{
                        onClick: handleUserUpdate,
                    }}
                />
            </AccordionDetails>
        </Accordion>
    );
};

export default UserEdit;
