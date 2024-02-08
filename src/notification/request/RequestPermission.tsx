import {PermissionsAndroid, Platform} from 'react-native';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';

const requestNotificationPermission = async () => {
  const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  return result;
};

const checkNotificationPermission = async () => {
  const result = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  return result;
};

export const requestPermission = async () => {
  const checkPermission = await checkNotificationPermission();
  if (checkPermission !== RESULTS.GRANTED) {
    const request = await requestNotificationPermission();
    if (request !== RESULTS.GRANTED) {
      console.log('Push notifications permission granted');
    } else {
      console.log('Push notifications permission denied');
    }
  }
};

// export const requestPermission = async () => {
//   if (Platform.OS === 'android') {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.RECEIVE_NOTIFICATIONS,
//       {
//         title: 'Push Notification Permission',
//         message: 'Do you want to receive push notifications?',
//         buttonNeutral: 'Ask Me Later',
//         buttonNegative: 'Cancel',
//         buttonPositive: 'OK',
//       },
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log('Push notifications permission granted');
//     } else {
//       console.log('Push notifications permission denied');
//     }
//   }
// };
