import Gateway from '../config/gateway';

const getData = (params) => Gateway.get('/attestation-otm', { params });

export default { getData };
