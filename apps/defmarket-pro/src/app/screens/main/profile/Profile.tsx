import {
    Box,
    Center,
    CircleIcon,
    HStack,
    IconButton,
    KeyboardAvoidingView,
    VStack,
} from 'native-base';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Dimensions, Image, Platform, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Text } from '../../../components/atomes';
import Card from '../../../components/atomes/card/Card';
import PageContainer from '../../../components/atomes/container/PageContainer';
import DatePickerModal from '../../../components/atomes/datePicker/DatePickerModal';
import {
    FormControl,
    FormControlGroup,
    FormControlSelect,
} from '../../../components/molecules';
import AddressAutocomplete from '../../../components/molecules/address-autocomplete/AddressAutocomplete';
import FilePicker from '../../../components/organisms/file-picker/FilePicker';
import {
    getAllJobRef,
    getJobsByParentId,
} from '../../../services/methodes/job';
import { updateProfile } from '../../../services/methodes/profile';
import { IProfileProps } from '../../../services/model/auth';
import { JobProps } from '../../../services/model/job';
import { alerts, primary, system } from '../../../theme/colors';
import { userActions } from '../../../stores/slices';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import informationBleuPNG from '../../../../assets/images/png/information-bleu.png';
import informationBleuSVG from '../../../../assets/images/svg/information-bleu.svg';
import Infodialog from '../../../components/molecules/dialog/info-dialog/Infodialog';
import { SpinnerContext } from '../../../components/atomes/spinner/SpinnerProvider';

const Profile = () => {
    const { formatMessage } = useIntl();

    const dispatch = useDispatch();

    const userSelector = useSelector((state: any) => state.user);

    const { setSpinnerVisibily } = useContext(SpinnerContext);

    const [alert, setAlert] = React.useState<{
        open: boolean;
        title: string;
        msg: string;
    }>({
        open: false,
        title: '',
        msg: '',
    });

    const navigation = useNavigation();

    const [category, setCategory] = useState<number>();

    const getJobsByParent = (value: number) => {
        getJobsByParentId(1, value).then((res: JobProps[]) => {
            setJobsList(res);
        });
    };

    const initData: IProfileProps = useMemo(() => {
        let initData: IProfileProps = userSelector?.user as IProfileProps;
        if (userSelector?.user?.job) {
            initData = {
                ...userSelector?.user,
                jobId: userSelector?.user?.job.id,
            };
            getJobsByParent(userSelector?.user?.job?.parent?.id);
            setCategory(userSelector?.user?.job?.parent?.id);
        }
        return initData;
    }, [userSelector?.user]);

    const [user, setUser] = useState<IProfileProps>(initData);
    const [jobCategories, setJobCategories] = useState<JobProps[]>([]);
    const [jobsList, setJobsList] = useState<JobProps[]>([]);

    useEffect(() => {
        getAllJobRef(0).then((response: JobProps[]) =>
            setJobCategories(response)
        );
        return () => {
            setJobCategories([]);
        };
    }, []);

    const handleSubmit = () => {
        setSpinnerVisibily(true);
        updateProfile(
            user,
            typeof user.documents.justificationIdentity !== 'string'
                ? user.documents.justificationIdentity
                : null
        )
            .then((data) => {
                dispatch(userActions.setUser(data));
                setSpinnerVisibily(false);
                navigation.goBack();
            })
            .catch((err) => {
                console.error(err);
                setSpinnerVisibily(false);
            });
    };

    return (
        <KeyboardAvoidingView
            h={{
                base: 'auto',
                lg: 'auto',
            }}
            behavior={'position'}
        >
            <Infodialog
                isOpen={alert.open}
                onClose={() => setAlert((old) => ({ ...old, open: false }))}
                title={alert.title}
                body={alert.msg}
            />
            <PageContainer>
                {userSelector?.user?.completeRegistration?.profileCompleted !==
                true ? (
                    <Card style={{ marginHorizontal: 25, marginBottom: 10 }}>
                        <HStack space={2}>
                            <VStack flexShrink={1}>
                                <HStack space={3}>
                                    <Text
                                        bold
                                        fontSize="dm-h2"
                                        textAlign="left"
                                        fontFamily="mono"
                                        color="#003753"
                                    >
                                        <FormattedMessage
                                            id="PRofi1"
                                            defaultMessage="Valide ton compte"
                                        />
                                    </Text>
                                    {Platform.OS === 'web' ? (
                                        <TouchableOpacity
                                            onPress={() =>
                                                setAlert({
                                                    open: true,
                                                    title: 'Informations!',
                                                    msg:
                                                        'Pour des raisons de sécurité, il est important que tu complètes toutes ces informations.',
                                                })
                                            }
                                        >
                                            <Image
                                                accessibilityLabel="information-img-blue"
                                                source={informationBleuPNG}
                                                style={{
                                                    width: 15,
                                                    height: 15,
                                                    marginLeft: 5,
                                                }}
                                                resizeMode="contain"
                                            />
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity
                                            onPress={() =>
                                                setAlert({
                                                    open: true,
                                                    title: 'Informations!',
                                                    msg:
                                                        'Pour des raisons de sécurité, il est important que tu complètes toutes ces informations.',
                                                })
                                            }
                                        >
                                            <SvgXml
                                                width={20}
                                                height={19}
                                                xml={informationBleuSVG}
                                                style={{
                                                    marginTop: 5,
                                                }}
                                            />
                                        </TouchableOpacity>
                                    )}
                                </HStack>

                                <Text textAlign="left" color="#003753">
                                    <FormattedMessage
                                        id="PRofi2"
                                        defaultMessage="Complète les informations de ton profil pour faire valider ton compte."
                                    />
                                </Text>
                            </VStack>
                            <Box
                                alignSelf="center"
                                justifyContent="center"
                                backgroundColor="#003753"
                                borderRadius={70}
                                minWidth={70}
                                height={70}
                            >
                                <Center>
                                    <Text
                                        color="white"
                                        fontSize="dm-h2"
                                        fontFamily="mono"
                                    >
                                        {
                                            userSelector?.user
                                                ?.completeRegistrationPercentage
                                        }
                                    </Text>
                                </Center>
                            </Box>
                        </HStack>
                    </Card>
                ) : (
                    <Box
                        backgroundColor={system[300]}
                        padding={5}
                        marginX={5}
                        marginBottom={5}
                    >
                        <Text
                            fontSize="dm-h1"
                            fontFamily="mono"
                            color={system[50]}
                        >
                            <FormattedMessage
                                id="PRofi3"
                                defaultMessage="Vérification du compte"
                            />
                        </Text>

                        <VStack space={1}>
                            <HStack space={2}>
                                <CircleIcon size="5" color={alerts[50]} />
                                <Text color={system[50]}>
                                    <FormattedMessage
                                        id="PRofi4"
                                        defaultMessage="E-mail vérifié"
                                    />
                                </Text>
                            </HStack>
                            {/* <HStack space={2}>
                                <CircleIcon
                                    size="5"
                                    color={
                                        userSelector?.user?.completeRegistration
                                            ?.companyCompleted === true
                                            ? alerts[50]
                                            : alerts[100]
                                    }
                                />
                                <Text color={system[50]}>Entreprise vérifiée</Text>
                            </HStack> */}
                            <HStack space={2}>
                                <CircleIcon
                                    size="5"
                                    color={
                                        userSelector?.user?.completeRegistration
                                            ?.profileCompleted === true
                                            ? alerts[50]
                                            : alerts[100]
                                    }
                                />
                                <Text color={system[50]}>
                                    <FormattedMessage
                                        id="PRofi5"
                                        defaultMessage="Documents d'identité à jour"
                                    />
                                </Text>
                            </HStack>
                        </VStack>
                    </Box>
                )}
                <FormControl
                    isRequired
                    type={'input'}
                    placeholder={formatMessage({
                        id: 'IDQ1ks',
                        description: 'Prénom',
                        defaultMessage: 'Prénom',
                    })}
                    helperText={null}
                    color="primary.50"
                    borderColor="primary.50"
                    placeholderTextColor="primary.50"
                    value={user.firstName}
                    onChange={(firstName: string) =>
                        setUser({ ...user, firstName })
                    }
                />
                <FormControl
                    isRequired
                    type={'input'}
                    placeholder={formatMessage({
                        id: 'IDQ2ks',
                        description: 'Nom',
                        defaultMessage: 'Nom',
                    })}
                    helperText={null}
                    color="primary.50"
                    borderColor="primary.50"
                    placeholderTextColor="primary.50"
                    value={user.lastName}
                    onChange={(lastName: string) =>
                        setUser({ ...user, lastName })
                    }
                />

                <DatePickerModal
                    mode="date"
                    style={{ marginVertical: 5 }}
                    placeholder={formatMessage({
                        id: 'IDQ3ks',
                        description: 'Date de naissance',
                        defaultMessage: 'Date de naissance',
                    })}
                    value={user?.birthday}
                    onChange={(birthday: string) =>
                        setUser((user) => ({
                            ...user,
                            birthday,
                        }))
                    }
                    color={primary[50]}
                />
                <AddressAutocomplete
                    defaultValue={user?.residenceCity}
                    type="city"
                    onChange={{
                        onCityChange: (residenceCity: string) =>
                            setUser((user) => ({
                                ...user,
                                residenceCity,
                            })),
                    }}
                    values={{
                        city: user?.residenceCity,
                    }}
                    visibleFields={{
                        city: false,
                    }}
                    placeholder={formatMessage({
                        id: 'IDQ4ks',
                        description: 'Ville de résidence',
                        defaultMessage: 'Ville de résidence',
                    })}
                    inputColor={primary[50]}
                />
                <FormControlGroup
                    isRequired
                    placeholderPrefix="+33"
                    valuePrefix={user?.phone?.prefix ?? ''}
                    onChangePrefix={(prefix: string) =>
                        setUser((user) => ({
                            ...user,
                            phone: user.phone
                                ? {
                                      ...user.phone,
                                      prefix,
                                  }
                                : { prefix, number: '' },
                        }))
                    }
                    placeholder={formatMessage({
                        id: 'IDQ5ks',
                        description: 'Numéro de téléphone',
                        defaultMessage: 'Numéro de téléphone',
                    })}
                    value={user?.phone?.number ?? ''}
                    onChange={(number: string) =>
                        setUser((user) => ({
                            ...user,
                            phone: user.phone
                                ? {
                                      ...user.phone,
                                      number,
                                  }
                                : {
                                      prefix: '+33',
                                      number,
                                  },
                        }))
                    }
                    borderColor="primary.50"
                    placeholderTextColor="primary.50"
                />
                <FormControl
                    isRequired
                    type={'input'}
                    placeholder="Lieu de Naissance"
                    helperText={null}
                    color="primary.50"
                    borderColor="primary.50"
                    placeholderTextColor="primary.50"
                    value={user?.birthCity ?? ''}
                    onChange={(birthCity: string) =>
                        setUser({ ...user, birthCity })
                    }
                />
                {/* <AddressAutocomplete
                    onChange={{
                        onCityChange: (birthCity: string) =>
                            setUser((user) => ({
                                ...user,
                                birthCity,
                            })),
                    }}
                    values={{
                        city: user?.birthCity,
                    }}
                    placeholder={'Lieu de Naissance'}
                    inputColor={primary[50]}
                /> */}
                <FilePicker
                    value={
                        user?.documents?.justificationIdentity
                            ? typeof user?.documents?.justificationIdentity ===
                              'string'
                                ? user.documents?.justificationIdentity
                                      .split('/')
                                      .pop()
                                : user.documents?.justificationIdentity.name
                            : undefined
                    }
                    onChange={(img) => {
                        setUser((old) => ({
                            ...old,
                            documents: {
                                ...old.documents,
                                justificationIdentity: img,
                            },
                        }));
                    }}
                    placeholderTextColor={system[50]}
                    borderColor={primary[50]}
                    placeholder="Ajouter un justificatif"
                    information
                />
                {user.veteran === true && (
                    <Box
                        marginTop={5}
                        paddingY={5}
                        backgroundColor={system[300]}
                    >
                        <IconButton
                            onPress={() =>
                                setAlert({
                                    open: true,
                                    title: 'Informations',
                                    msg:
                                        'Cette donnée est enregistrée en préparation d’une prochaine version de l’application. Grâce à celle-ci, les commerçants membres de la communauté des 1 ères lignes bénéficieront d’un badge spécifique qu’ils pourront afficher sur leur boutique de l’application. ',
                                })
                            }
                            position="absolute"
                            _pressed={{
                                backgroundColor: 'transparent',
                                opacity: 0.2,
                            }}
                            right={21}
                            top={-2}
                            alignItems="center"
                            justifyContent="center"
                            icon={
                                <Image
                                    accessibilityLabel="info-blue-img-png"
                                    source={informationBleuPNG}
                                    resizeMode="contain"
                                    style={{
                                        width: 17,
                                        height: 17,
                                        alignSelf: 'flex-end',
                                    }}
                                />
                            }
                        />
                        <FormControlSelect
                            isRequired
                            color={system[50]}
                            placeholderTextColor={system[50]}
                            placeholder={formatMessage({
                                id: 'IDQA11b',
                                description: 'Catégorie professionnelle',
                                defaultMessage: 'Catégorie professionnelle',
                            })}
                            value={category?.toString()}
                            items={
                                jobCategories.map((item) => {
                                    return {
                                        label: item.job.jobName,
                                        value: item.job.id.toString(),
                                    };
                                }) ?? []
                            }
                            error={null}
                            errorMessage={null}
                            helperText={null}
                            onChange={(category: string) => {
                                setCategory(Number(category));
                                setJobsList([]);
                                getJobsByParent(Number(category));
                            }}
                        />
                        <FormControlSelect
                            isRequired
                            label=""
                            placeholderTextColor={primary[50]}
                            color={primary[50]}
                            placeholder={formatMessage({
                                id: 'IDQA11c',
                                description: 'Institution',
                                defaultMessage: 'Institution',
                            })}
                            value={user?.jobId?.toString()}
                            items={jobsList?.map((item) => {
                                return {
                                    label: item.job.jobName,
                                    value: item.job.id.toString(),
                                };
                            })}
                            error={null}
                            errorMessage={null}
                            helperText={null}
                            onChange={(jobId: any) =>
                                setUser((user) => ({
                                    ...user,
                                    jobId: Number(jobId),
                                }))
                            }
                        />
                    </Box>
                )}
                <Button
                    isDisabled={
                        (user.veteran && !user.jobId) ||
                        user.firstName === '' ||
                        user.lastName === '' ||
                        user.birthday === '' ||
                        user.residenceCity === '' ||
                        user.phone?.number === '' ||
                        user.birthCity === ''
                    }
                    onPress={handleSubmit}
                    alignSelf="center"
                    style={{ marginTop: 25 }}
                    width={
                        Platform?.OS === 'web'
                            ? '300'
                            : Dimensions.get('window').width - 50
                    }
                    label={formatMessage({
                        id: 'UCypVV',
                        description: 'Mettre à jour',
                        defaultMessage: 'Mettre à jour',
                    })}
                />
                <Box height={10} />
            </PageContainer>
        </KeyboardAvoidingView>
    );
};

export default Profile;
