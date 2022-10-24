import { Constants, Notifications } from 'expo-sdk';
import React, { useState, useEffect, useRef } from 'react';
import { View, Platform } from 'react-native';

// Redux
import { useDispatch } from 'react-redux';
import { userActions } from '../../stores/slices';
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function App(props) {
    // Redux
    const dispatch = useDispatch();

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        // registerForPushNotificationsAsync().then((token) => {
        //     setExpoPushToken(token);
        //     dispatch(userActions.setExpoToken(token));
        //     //console.log(token);
        // });

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(
            (notification) => {
                console.log(notification);
                setNotification(notification);
            }
        );

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(
            (response) => {
                console.log(response);
                setNotification(response.notification);
            }
        );

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current
            );
            Notifications.removeNotificationSubscription(
                responseListener.current
            );
        };
    }, []);

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            {props.children}
        </View>
    );
}

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications
async function sendPushNotification(expoPushToken, msg) {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: msg?.title ?? '',
        body: msg?.body ?? '',
        data: msg?.data ?? {},
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const {
            status: existingStatus,
        } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Il faut utiliser une appareil mobile afin de bénificier des notifications push');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}

export { registerForPushNotificationsAsync, sendPushNotification };
