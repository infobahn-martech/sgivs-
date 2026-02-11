import Gateway from '../config/gateway';

const getData = (params) => Gateway.get('/out-scan', { params });

export default { getData };
