import Gateway from '../config/gateway';

const getData = (params) => Gateway.get('/visa-ots', { params });

export default { getData };
