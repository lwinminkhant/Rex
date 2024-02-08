import notifee, {
  EventType,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';

async function onCreateTriggerNotification() {
  console.log('Creating trigger notification');
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });
  const date = new Date(Date.now());
  date.setHours(11);
  date.setMinutes(10);

  // Create a time-based trigger
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
  };

  // Create a trigger notification
  await notifee.createTriggerNotification(
    {
      title: 'Meeting with Jane',
      body: 'Today at 11:20am',
      android: {
        channelId: channelId,
      },
    },
    trigger,
  );
}
