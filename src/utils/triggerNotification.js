// src/services/notificationService.js
import subscribeToPush from '../Notifications';

export const triggerPushSubscription = async (title, body) => {
  await subscribeToPush(postData, title, body);
};
