import Gateway from '../config/gateway';

const getData = (params) => Gateway.get('/oci-in-scan', { params });

export default { getData };
