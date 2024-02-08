import notifee, {EventType} from '@notifee/react-native';
import {Button, View} from 'react-native';

export async function onDisplayNotification() {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Required for iOS
  // See https://notifee.app/react-native/docs/ios/permissions
  await notifee.requestPermission();

  const notificationId = await notifee.displayNotification({
    id: '123',
    title: 'Important Reminder!',
    body: 'Tomorrow is a new day with new possibilities. Dream big and go after your goals. You got this!',
    android: {
      channelId,
    },
  });

  // Sometime later...
  await notifee.displayNotification({
    id: '123',
    title: 'Updated New',
    body: 'Apple’s decision to restrict its all-new periscope camera to the iPhone 15 Pro Max will frustrate a lot of iPhone fans either on a budget or with a preference for smaller display sizes. But there may be physical reasons for this, and now a new leak has revealed the disruption the new camera makes, even for the iPhone 15 Pro Max.',
    android: {
      channelId,
    },
  });
  async function cancel(notificationId: any) {
    await notifee.cancelNotification(notificationId);
  }
}
