import Gateway from '../config/gateway';

const postData = (payload) => Gateway.post('/notifications/send', payload);

export default {
  postData,
};
