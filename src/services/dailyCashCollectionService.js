import Gateway from '../config/gateway';


const getData = (params) => Gateway.get('/daily-cash-collection', { params });

export default {
    getData,
};
