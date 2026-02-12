import Gateway from '../config/gateway';

const getData = (params) => Gateway.get('/ots', { params });

export default { getData };
