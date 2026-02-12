import Gateway from '../config/gateway';

const getData = (params) => Gateway.get('/oci-otm', { params });

export default { getData };
