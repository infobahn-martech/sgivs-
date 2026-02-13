import Gateway from '../config/gateway';


const getData = (params) => Gateway.get('/passport-vas-applications', { params });

export default {
    getData,
};
