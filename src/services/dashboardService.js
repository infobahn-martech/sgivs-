import Gateway from '../config/gateway';

const getDash = () => Gateway.get('/dashboard');

export default {
  getDash,
};
