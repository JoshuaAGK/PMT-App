import * as Notifications from 'expo-notifications';

export const registerPushNotifications = async () => {
    let token;
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;

    if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
};

export const sendPushNotification = async (message) => {
    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
};

export const sendFriendRequestNotification = async (token, jsonData = {}) => {
    const message = {
        to: token,
        sound: 'default',
        title: 'JoySteps',
        body: 'You have a new friend request!',
        data: jsonData,
    };
    await sendPushNotification(message);
};

export const sendMessageNotification = async (token, from, jsonData = {}) => {
    const message = {
        to: token,
        sound: 'default',
        title: 'JoySteps',
        body: `You have received a new message from ${from}`,
        data: jsonData,
    };
    await sendPushNotification(message);
};