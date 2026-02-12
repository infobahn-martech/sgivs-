import Gateway from '../config/gateway';

const getData = (params) => Gateway.get('/attestation-in-scan', { params });

export default { getData };
