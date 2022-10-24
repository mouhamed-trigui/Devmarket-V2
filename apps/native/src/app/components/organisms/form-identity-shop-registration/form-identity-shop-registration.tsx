import React, { useContext, useState } from 'react';
import styled from 'styled-components/native';
import { FormattedMessage, useIntl } from 'react-intl';

import {
    FormControl,
    FormControlTextarea,
    FormControlSelect,
} from '../../molecules';

// Services
import { signUpI2, errorProps } from '../../../services';
import { Text } from '../../atomes';

// Redux
import { useSelector } from 'react-redux';

import ImagePicker from '../image-picker/ImagePicker';
import {
    Checkbox,
    HStack,
    Image,
    KeyboardAvoidingView,
    View,
} from 'native-base';
import logoShop from '../../../../assets/images/png/photo-white.png';
import LogoShopSVG from '../../../../assets/images/svg/photo-white.svg';
import { FileType } from '../../../services/model/company';
import { Button } from '../../../components/atomes';
import { Dimensions, Keyboard, Platform } from 'react-native';
import { otherActivityStore } from '../../../services/methodes/company';
import Infodialog from '../../molecules/dialog/info-dialog/Infodialog';
import { SpinnerContext } from '../../atomes/spinner/SpinnerProvider';

/* eslint-disable-next-line */
export interface FormIdentityShopRegistrationProps {
    successAction: () => void;
    companyId: number | undefined;
    navigation?: any;
}

export interface IShop {
    shopType: string;
    shopLogo: FileType;
    shopName: string;
    shopDescription: string;
    shopRequest: string;
    eCommerceAndPhysicalStore: boolean;
}
const StyledFormIdentityShopRegistration = styled.View`
    padding: 20px;
`;
export function FormIdentityShopRegistration(
    props: FormIdentityShopRegistrationProps
) {
    const { formatMessage } = useIntl();

    const [alert, setAlert] = React.useState<{ open: boolean; msg: string }>({
        open: false,
        msg: '',
    });

    // Redux & error
    const { user } = useSelector((state: any) => state.user);
    const [error, setError] = React.useState<errorProps | undefined | null>(
        null
    );

    //Local state shop
    const [shop, setShop] = useState<IShop>({} as IShop);

    // State checkbox
    const [isSelected, setIsSelected] = useState<boolean>(false);

    const { setSpinnerVisibility } = useContext(SpinnerContext);

    // Methods
    const uploadFile = (file: FileType) => {
        setShop((shop) => ({
            ...shop,
            shopLogo: file,
        }));
    };
    const [keyboardIsShown, setKeyboardIsShown] = useState(false);

    React.useEffect(() => {
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

    // Méthode handelRequest to send request
    const handelRequest = (request: string) => {
        if (props.companyId) {
            otherActivityStore(props.companyId, {
                otherActivity: request,
            })
                .then((response: any) => {
                    if (response.status === 200) {
                        props.successAction();
                    }
                })
                .catch((err: errorProps) => {
                    setError(err);
                });
        }
    };

    // on press button add store
    const handlePress = () => {
        if (
            user?.completeRegistration?.identityValidated === true &&
            user?.completeRegistration?.companyCompleted === true
        ) {
            if (shop?.shopType === 'OTHER') {
                handelRequest(shop.shopRequest);
            } else {
                SIGNUP();
            }
        } else if (user?.completeRegistration?.companyCompleted === false) {
            setAlert({
                open: true,
                msg: 'Vous devez complétez votre entreprise',
            });
        } else if (user?.completeRegistration?.identityValidated === false) {
            setAlert({
                open: true,
                msg: 'Vous devez complétez votre identity',
            });
        }
    };

    // Methode Signup to add store
    const SIGNUP = async () => {
        setSpinnerVisibility(true);
        if (props.companyId) {
            await signUpI2(props.companyId, {
                logo: shop?.shopLogo,
                store: {
                    name: shop?.shopName,
                    description: shop?.shopDescription,
                    storeType: shop.eCommerceAndPhysicalStore
                        ? 'PHYSICAL_AND_E_COMMERCE'
                        : shop?.shopType,
                    eCommerceAndPhysicalStore: isSelected,
                },
            })
                .then((response: any) => {
                    setSpinnerVisibility(false);
                    if (response.status === 200) {
                        props.successAction();
                    }
                })
                .catch((err: errorProps) => {
                    setError(err);
                    setSpinnerVisibility(false);
                });
        }
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
            keyboardVerticalOffset={-200}
        >
            <StyledFormIdentityShopRegistration style={{ paddingTop: 0 }}>
                <Infodialog
                    isOpen={alert.open}
                    onClose={() => setAlert((old) => ({ ...old, open: false }))}
                    title="Attention!"
                    body={alert.msg}
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
                    value={shop?.shopType}
                    items={[
                        {
                            label: formatMessage({
                                id: 'IkT01s',
                                description: 'Structure Physique',
                                defaultMessage: 'Structure Physique',
                            }),
                            value: 'PHYSICAL',
                        },
                        {
                            label: formatMessage({
                                id: 'IkT21s',
                                description: 'Structure E-Commerce',
                                defaultMessage: 'Structure E-Commerce',
                            }),
                            value: 'E_COMMERCE',
                        },
                    ]}
                    error={null}
                    errorMessage={null}
                    helperText={null}
                    onChange={(value: any) =>
                        setShop((shop) => ({
                            ...shop,
                            shopType: value,
                        }))
                    }
                />

                {shop?.shopType === 'OTHER' ? (
                    <>
                        <Text
                            fontFamily="body"
                            fontSize="dm-2p"
                            textAlign="center"
                            color={'system.200'}
                            moreParams={{ p: 5 }}
                        >
                            <FormattedMessage
                                id="ZWKFs9"
                                defaultMessage="Dis nous en plus sur ton activité et ta structure. Un administrateur te contactera rapidement pour t'accompagner."
                                values={{
                                    br: '\n',
                                }}
                            />
                        </Text>
                        <FormControlTextarea
                            isRequired
                            label=""
                            placeholder={formatMessage({
                                id: 'MkT03s',
                                description: 'Tes informations',
                                defaultMessage: 'Tes informations',
                            })}
                            placeholderTextColor="white"
                            value={shop?.shopRequest}
                            error={null}
                            numberOfLines={4}
                            errorMessage={null}
                            helperText={null}
                            onChange={(value: any) =>
                                setShop((shop) => ({
                                    ...shop,
                                    shopRequest: value,
                                }))
                            }
                        />
                    </>
                ) : (
                    <>
                        <ImagePicker
                            onChange={uploadFile}
                            value={shop?.shopLogo?.uri ?? undefined}
                            style={{
                                padding: shop?.shopLogo ? 0 : 30,
                                width: 130,
                                height: 130,
                                borderRadius: 100,
                                alignSelf: 'center',
                                borderWidth: 2,
                                borderColor: 'white',
                                marginVertical: 10,
                            }}
                        >
                            <View
                                alignItems="center"
                                justifyContent="center"
                                flex={1}
                                width={20}
                                height={20}
                            >
                                {Platform.OS === 'web' ? (
                                    <Image
                                        source={logoShop}
                                        style={{
                                            marginRight: 12,
                                            width: 20,
                                            height: 20,
                                            resizeMode: 'contain',
                                        }}
                                        alt="Logo boutique"
                                    />
                                ) : (
                                    <LogoShopSVG
                                        fill="white"
                                        style={{
                                            width: '100%',
                                            marginRight: 12,
                                        }}
                                    />
                                )}
                            </View>
                        </ImagePicker>
                        <Text
                            italic
                            style={{ marginTop: 20, marginBottom: 20 }}
                            textAlign="center"
                        >
                            <FormattedMessage
                                id="ADdSOh"
                                defaultMessage="Ajoute ton logo"
                            />
                        </Text>
                        <FormControl
                            isRequired
                            label=""
                            placeholder={formatMessage({
                                id: 'IkT02s',
                                description: 'Nom de la boutique',
                                defaultMessage: 'Nom de la boutique',
                            })}
                            value={shop?.shopName}
                            type="input"
                            error={null}
                            errorMessage={null}
                            helperText={null}
                            onChange={(value: any) =>
                                setShop((shop) => ({
                                    ...shop,
                                    shopName: value,
                                }))
                            }
                        />
                        <FormControlTextarea
                            isRequired
                            label=""
                            placeholderTextColor="white"
                            placeholder={formatMessage({
                                id: 'IkT03s',
                                description: 'Description',
                                defaultMessage: 'Description',
                            })}
                            value={shop?.shopDescription}
                            error={null}
                            numberOfLines={4}
                            errorMessage={null}
                            helperText={null}
                            onChange={(value: any) =>
                                setShop((shop) => ({
                                    ...shop,
                                    shopDescription: value,
                                }))
                            }
                        />

                        {shop.shopType && (
                            <View
                                alignSelf="center"
                                style={{ marginVertical: 15 }}
                                width={
                                    Platform?.OS === 'web'
                                        ? '300'
                                        : Dimensions.get('window').width - 50
                                }
                            >
                                <HStack key="HStack1" space={2}>
                                    <Checkbox
                                        accessibilityLabel="check if your store is eCommerce And Physical"
                                        isChecked={isSelected}
                                        value="eCommerceAndPhysicalStore"
                                        backgroundColor="transparent"
                                        onChange={() =>
                                            setIsSelected(!isSelected)
                                        }
                                    />
                                    {shop.shopType === 'PHYSICAL' ? (
                                        <Text
                                            key="text1"
                                            style={{ marginLeft: 10 }}
                                        >
                                            <FormattedMessage
                                                id="ADsHo1"
                                                defaultMessage="Cette boutique est liée à un site e-commerce"
                                            />
                                        </Text>
                                    ) : (
                                        <Text
                                            key="text2"
                                            style={{ marginLeft: 10 }}
                                        >
                                            <FormattedMessage
                                                id="ADsHo2"
                                                defaultMessage="Cette boutique est liée à une structure physique"
                                            />
                                        </Text>
                                    )}
                                </HStack>
                            </View>
                        )}
                    </>
                )}
                <Button
                    alignSelf="center"
                    style={{ marginTop: 20 }}
                    label={
                        shop?.shopType === 'OTHER'
                            ? formatMessage({
                                  id: '4IsZkR',
                                  description: "J'envoie mes informations",
                                  defaultMessage: "J'envoie mes informations",
                              })
                            : formatMessage({
                                  id: '3IsZks',
                                  description: "J'ajoute ma boutique",
                                  defaultMessage: "J'ajoute ma boutique",
                              })
                    }
                    width={
                        Platform?.OS === 'web'
                            ? '300'
                            : Dimensions.get('window').width - 50
                    }
                    moreParams={{
                        disabled:
                            shop.shopType === 'OTHER'
                                ? !shop.shopRequest
                                : !shop.shopType ||
                                  !shop.shopName ||
                                  !shop.shopDescription ||
                                  !props.companyId,
                    }}
                    onPress={handlePress}
                />
            </StyledFormIdentityShopRegistration>
        </KeyboardAvoidingView>
    );
}

export default FormIdentityShopRegistration;
