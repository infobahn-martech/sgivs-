import Gateway from '../config/gateway';

const getData = (params) => Gateway.get('/attestation-ifm', { params });

export default { getData };
