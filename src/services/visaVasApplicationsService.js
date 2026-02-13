import Gateway from '../config/gateway';


const getData = (params) => Gateway.get('/visa-vas-applications', { params });

export default {
    getData,
};
