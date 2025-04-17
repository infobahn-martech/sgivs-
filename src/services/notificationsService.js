import Gateway from '../config/gateway';

const postData = (payload) => Gateway.post('/notifications/saveSubs', payload);
const getNotifications = (params) => Gateway.get('/notifications', { params });
const markAsRead = () => Gateway.get('/notifications/mark-as-read');

export default {
  postData,
  getNotifications,
  markAsRead,
};
