import Gateway from '../config/gateway';

const getData = (params) => Gateway.get('/oci-ots', { params });

export default { getData };
