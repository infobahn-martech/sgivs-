import Gateway from '../config/gateway';


const getData = (params) => Gateway.get('/attestation-vas-applications', { params });

export default {
    getData,
};
