import Gateway from '../config/gateway';


const getData = (params) => Gateway.get('/charges-and-refunds', { params });

export default {
    getData,
};
