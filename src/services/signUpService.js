import Gateway from '../config/gateway';

const postData = (payload) => Gateway.post('/signup', payload);

export default { postData };
