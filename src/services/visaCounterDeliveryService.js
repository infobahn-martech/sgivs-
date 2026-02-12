import Gateway from '../config/gateway';

const getData = (params) => Gateway.get('/visa-counter-delivery', { params });

export default { getData };
