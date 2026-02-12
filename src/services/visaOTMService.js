import Gateway from '../config/gateway';

const getData = (params) => Gateway.get('/otm', { params });

export default { getData };
