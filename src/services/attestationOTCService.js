import Gateway from '../config/gateway';

const getData = (params) => Gateway.get('/visa-otc', { params });

export default { getData };
