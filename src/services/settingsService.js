import Gateway from '../config/gateway';

const postData = (payload) => Gateway.post('/settings', payload);

export default {
  postData,
};
