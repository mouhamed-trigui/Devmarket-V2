import React, { useContext } from 'react';
import { Image, Switch, TouchableOpacity, View } from 'react-native';
//PNG
import { close, filter, notification } from '../../../theme/images';
import { useDispatch, useSelector } from 'react-redux';
import Text from '../../../components/atomes/text/Text';
import { ThemeContext } from '../../../context/ThemeContext';
import { fonts } from '../../../theme/fonts';
import { fontSizes } from './../../../theme/fonts';
import VStack from '../../../components/atomes/stack/VStack';
import HStack from '../../../components/atomes/stack/HStack';

export interface NotificationPushProps {
    InMainNavigation?: boolean;
}

const PushNotifications = (props: any) => {
    //const navigation = useNavigation();
    const dispatch = useDispatch();
    const { theme, toggleTheme } = useContext(ThemeContext);

    const { pushNotificationActive } = useSelector(
        (state: any) => state.user.user
    );
    //switch state
    const [isChecked, setIsChecked] = React.useState(false);

    React.useEffect(() => {
        setIsChecked(pushNotificationActive);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCheck = async () => {
        if (!isChecked) {
            setIsChecked(!isChecked);
            /* await registerForPushNotificationsAsync().then((token: string) => {
                if (token) {
                    setIsChecked(!isChecked);
                    dispatch(userActions.setExpoToken(token));

                    // endpoint for both action: save expo token and update pushNotificationActive
                    addExpoToken(token).then(() => {
                        // redux
                        dispatch(userActions.setPushNotification(!isChecked));
                    });
                }
            }); */
        } else {
            setIsChecked(!isChecked);
            /* pushNotification(!isChecked).then(() => {
                // redux
                dispatch(userActions.setPushNotification(!isChecked));
            }); */
        }
        /*  if (props?.InMainNavigation) {
            navigation.navigate('Home');
        } */
    };
    return (
        <VStack
            style={{
                flex: 1,
                backgroundColor: theme.colors.info[200],
                paddingTop: '12%',
                paddingHorizontal: '5%',
            }}
        >
            {/* Hide  Header */}
            <HStack
                style={{
                    justifyContent: 'space-between',
                    display: 'none',
                }}
            >
                <HStack>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.goBack();
                        }}
                    >
                        <Image
                            source={filter}
                            style={{ width: 25, height: 25 }}
                        />
                    </TouchableOpacity>

                    <Text
                        color={theme.colors.info[50]}
                        fontFamily={fonts.mono}
                        fontSize={fontSizes['dm-h2']}
                        textAlign="center"
                        hPadding={15}
                    >
                        Notifications
                    </Text>
                </HStack>
                {!props?.InMainNavigation ? (
                    <TouchableOpacity
                        style={{ width: 25, height: 25 }}
                        onPress={() => {
                            props.navigation.goBack();
                        }}
                    >
                        <Image
                            source={close}
                            style={{ width: 20, height: 20 }}
                        />
                    </TouchableOpacity>
                ) : null}
            </HStack>
            <Image
                source={notification}
                style={{
                    width: 250,
                    height: 250,
                    alignSelf: 'center',
                    marginTop: 50,
                    marginBottom: 50,
                }}
                resizeMode="contain"
            />
            <View
                style={{
                    alignSelf: 'center',
                    marginVertical: 10,
                }}
            >
                <Text
                    color={theme.colors.info[50]}
                    fontFamily={fonts.mono}
                    fontSize={fontSizes['dm-h1']}
                    textAlign="center"
                    hPadding={15}
                >
                    Ton activité
                </Text>
            </View>
            <View
                style={{
                    alignSelf: 'center',
                    marginVertical: 10,
                }}
            >
                <Text
                    color={theme.colors.info[50]}
                    fontFamily={fonts.medium}
                    fontSize={fontSizes['dm-h2']}
                    textAlign="center"
                    hPadding={15}
                    numberOfLines={3}
                >
                    Sois notifié pour découvrir le nombre de visites sur ta
                    boutique, les avis client et obtenir des conseils !
                </Text>
            </View>
            <View
                style={{
                    alignSelf: 'center',
                    marginVertical: 10,
                }}
            >
                {!isChecked && (
                    <Text
                        color={theme.colors.info[50]}
                        fontFamily={fonts.medium}
                        fontSize={fontSizes['dm-p']}
                        textAlign="center"
                        hPadding={15}
                        numberOfLines={3}
                    >
                        J'active les notifications
                    </Text>
                )}

                <Switch
                    style={{
                        alignSelf: 'center',
                        marginTop: 40,
                        transform: [{ scaleX: 2.2 }, { scaleY: 2.2 }],
                    }}
                    key="PushnotificationsSlider"
                    onChange={handleCheck}
                    value={isChecked}
                />
            </View>
        </VStack>
    );
};

export default PushNotifications;
