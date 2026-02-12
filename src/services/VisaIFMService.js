import Gateway from '../config/gateway';

const getData = (params) => Gateway.get('/visa-ifm', { params });

export default { getData };
