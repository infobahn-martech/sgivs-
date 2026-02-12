import Gateway from '../config/gateway';

const getData = (params) => Gateway.get('/visa-in-scan', { params });

export default { getData };
