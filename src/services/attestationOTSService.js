import Gateway from '../config/gateway';

const getData = (params) => Gateway.get('/attestation-ots', { params });

export default { getData };
