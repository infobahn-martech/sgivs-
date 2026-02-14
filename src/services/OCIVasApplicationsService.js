import Gateway from '../config/gateway';


const getData = (params) => Gateway.get('/oci-vas-applications', { params });

export default {
    getData,
};
