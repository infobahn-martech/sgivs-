import Gateway from '../config/gateway';

const getData = (params) => Gateway.get('/visa-otm', { params });

export default { getData };
