import React, {useEffect, useState} from 'react';
import notifee, {
  EventType,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import {
  Alert,
  AppRegistry,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  fcmForegroundNotification,
  fcmNotification,
  onAppBootstrap,
} from './src/notification/FirebasePushNotification';
import {onDisplayNotification} from './src/notification/DisplayNotification';
import messaging from '@react-native-firebase/messaging';
import {requestPermission} from './src/notification/request/RequestPermission';
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleShowNotification = () => {
    console.log('Notification Shown');
    onDisplayNotification();
  };

  useEffect(() => {
    requestPermission();
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    // });

    const handleForegroundNotification = messaging().onMessage(message => {
      console.log('Foreground notification:', message.notification?.title);
      fcmNotification(message);
    });
    //return fcmForegroundNotification();
    //return handleForegroundNotification;
  }, []);

  function onMessageReceived(message: any) {
    const {type, timestamp} = message.data;

    if (type === 'order_shipped') {
      notifee.displayNotification({
        title: 'Your order has been shipped',
        body: `Your order was shipped at ${new Date(
          Number(timestamp),
        ).toString()}!`,
        android: {
          channelId: 'orders',
        },
      });
    }
  }

  console.log('Welcome from my Push Notification');
  messaging().onMessage(onMessageReceived);
  messaging().setBackgroundMessageHandler(onMessageReceived);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View>
          <Button
            title="Handle Notification"
            onPress={() => {
              handleShowNotification();
            }}
          />
          <Button
            title="All Triggered Notifications"
            onPress={() => {
              notifee
                .getTriggerNotificationIds()
                .then(ids => console.log('All trigger notifications: ', ids));
            }}
          />
          <Button
            title="Show Notification Token"
            onPress={() => {
              onAppBootstrap();
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Register main application
AppRegistry.registerComponent('app', () => App);
export default App;
