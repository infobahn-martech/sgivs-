import Gateway from '../config/gateway';

const getData = (params) => Gateway.get('/oci-otc', { params });

export default { getData };
