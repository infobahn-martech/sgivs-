import Gateway from '../config/gateway';

const getData = (params) => Gateway.get('/attestation-counter-delivery', { params });

export default { getData };
