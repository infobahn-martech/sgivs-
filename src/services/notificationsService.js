import Gateway from '../config/gateway';

const postData = (payload) => Gateway.post('/notifications/saveSubs', payload);

export default {
  postData,
};
