import Gateway from '../config/gateway';

const getData = (params) => Gateway.get('/ifm', { params });

export default { getData };
