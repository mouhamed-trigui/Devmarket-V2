import React from 'react';
import { Text } from '../../../components/atomes';
import PageContainer from '../../../components/atomes/container/PageContainer';

import { Center, HStack, Switch, VStack } from 'native-base';
import { alerts, system } from '../../../theme/colors';
import { Image, Platform, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//PNG
import close from '../../../../assets/images/png/close.png';
import filter from '../../../../assets/images/png/filter.png';
//SVG
import closeSVG from '../../../../assets/images/svg/close.svg';
import filterSVG from '../../../../assets/images/svg/filter.svg';

import notification from '../../../../assets/images/illustration/ILLUSTRATION_4_notifications.png';
import { FormattedMessage } from 'react-intl';
import { SvgXml } from 'react-native-svg';
import {
    addExpoToken,
    pushNotification,
} from '../../../services/methodes/notifications';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../stores/slices';
import { registerForPushNotificationsAsync } from '../../../utils/notifications';

export interface NotificationPushProps {
    InMainNavigation?: boolean;
}

const PushNotifications = (props: NotificationPushProps) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

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
            await registerForPushNotificationsAsync().then((token: string) => {
                if (token) {
                    setIsChecked(!isChecked);
                    dispatch(userActions.setExpoToken(token));

                    // endpoint for both action: save expo token and update pushNotificationActive
                    addExpoToken(token).then(() => {
                        // redux
                        dispatch(userActions.setPushNotification(!isChecked));
                    });
                }
            });
        } else {
            setIsChecked(!isChecked);
            pushNotification(!isChecked).then(() => {
                // redux
                dispatch(userActions.setPushNotification(!isChecked));
            });
        }
        if (props?.InMainNavigation) {
            navigation.navigate('Home');
        }
    };
    return (
        <PageContainer>
            <VStack marginX={5} marginTop={5} space={8}>
                <HStack justifyContent="space-between">
                    <HStack space={3}>
                        {Platform.OS === 'web' ? (
                            <Image
                                accessibilityLabel="filter"
                                source={filter}
                                style={{ width: 25, height: 25 }}
                            />
                        ) : (
                            <SvgXml
                                xml={filterSVG}
                                style={{ width: 25, height: 25 }}
                            />
                        )}

                        <Text
                            fontSize="dm-h2"
                            fontFamily="mono"
                            color={system[50]}
                        >
                            <FormattedMessage
                                id="IMPMP4"
                                defaultMessage="Notifications"
                            />
                        </Text>
                    </HStack>
                    {!props?.InMainNavigation ? (
                        <TouchableOpacity
                            style={{ width: 25, height: 30 }}
                            onPress={() => navigation.goBack()}
                        >
                            {Platform.OS === 'web' ? (
                                <Image
                                    accessibilityLabel="close-icon"
                                    source={close}
                                    style={{ width: 25, height: 25 }}
                                />
                            ) : (
                                <SvgXml
                                    fill={system[50]}
                                    xml={closeSVG}
                                    style={{ width: 20, height: 20 }}
                                />
                            )}
                        </TouchableOpacity>
                    ) : null}
                </HStack>
                <Image
                    accessibilityLabel="notif"
                    source={notification}
                    style={{
                        width: 250,
                        height: 250,
                        alignSelf: 'center',
                        marginTop: 50,
                    }}
                    resizeMode="contain"
                />
                <Center>
                    <Text fontSize="dm-h1" fontFamily="mono" color={system[50]}>
                        <FormattedMessage
                            id="xbH1ks"
                            defaultMessage="Ton Activit??"
                        />
                    </Text>
                </Center>
                <Center>
                    <Text
                        fontSize="dm-2p"
                        fontFamily="body"
                        color={system[50]}
                        textAlign="center"
                    >
                        <FormattedMessage
                            id="PUSHN1"
                            defaultMessage="Reste inform?? pour d??couvrir le nombre de {br} visites sur ta boutique, les avis client et {br} obtenir des conseils."
                            values={{
                                br: '\n',
                            }}
                        />
                    </Text>
                </Center>
                <Center marginTop={5}>
                    {!isChecked && (
                        <Text
                            fontSize="dm-2p"
                            fontFamily="body"
                            color={system[50]}
                            textAlign="center"
                            moreParams={{
                                marginBottom: 2,
                            }}
                        >
                            <FormattedMessage
                                id="PUSHN2"
                                defaultMessage="J'active les notifications"
                            />
                        </Text>
                    )}

                    <Switch
                        key="PushnotificationsSlider"
                        onToggle={handleCheck}
                        defaultIsChecked={isChecked}
                        isChecked={isChecked}
                        size="lg"
                        offTrackColor={system[100]}
                        onTrackColor={alerts[50]}
                        onThumbColor={system[200]}
                        offThumbColor={system[200]}
                    />
                </Center>
            </VStack>
        </PageContainer>
    );
};

export default PushNotifications;
