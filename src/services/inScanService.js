import Gateway from '../config/gateway';

const getData = (params) => Gateway.get('/in-scan', { params });

export default { getData };
