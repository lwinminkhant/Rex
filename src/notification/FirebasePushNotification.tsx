import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
export async function fcmNotification(message: any) {
  const {notification} = message;
  const {title, body} = notification;
  const channelId = await notifee.createChannel({
    id: 'fcm',
    name: 'FCM Channel',
  });

  await notifee.requestPermission();

  const notificationId = await notifee.displayNotification({
    id: '123',
    title: title,
    body: body,
    android: {
      channelId,
    },
  });

  // Sometime later...
  await notifee.displayNotification({
    id: '123',
    title: title,
    body: body,
    android: {
      channelId,
    },
  });
  async function cancel(notificationId: any) {
    await notifee.cancelNotification(notificationId);
  }
}
export async function onAppBootstrap() {
  messaging()
    .getToken()
    .then(token => {
      if (token) {
        console.log('Push notification token:', token);
        // Send token to your server for user identification
      } else {
        console.log('No push notification token available');
      }
    });

  const unsubscribe = messaging().onMessage(async remoteMessage => {
    // Handle foreground messages
    console.log('Foreground message:', remoteMessage.data);
  });

  return () => unsubscribe();
}

export const fcmBackgroundNotification =
  messaging().setBackgroundMessageHandler(message => {
    console.log('Background notification:', message);
    // Customize the handling of the notification based on your app's requirements
    onMessageReceived(message);
    return Promise.resolve();
  });

export const fcmForegroundNotification = messaging().onMessage(message => {
  console.log('Foreground notification:', message);
  onMessageReceived(message);
});

function onMessageReceived(message: any) {
  const {title, body, android} = message.notification;

  notifee.displayNotification({
    title: title,
    body: body,

    android: {
      channelId: 'default',
      smallIcon: android.imageUrl,
    },
  });
}
