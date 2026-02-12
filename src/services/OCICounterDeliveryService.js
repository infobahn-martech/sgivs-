import Gateway from '../config/gateway';

const getData = (params) => Gateway.get('/oci-counter-delivery', { params });

export default { getData };
