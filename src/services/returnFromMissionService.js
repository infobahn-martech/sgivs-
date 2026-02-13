import Gateway from '../config/gateway';


const getData = (params) => Gateway.get('/return-from-mission', { params });

export default {
    getData,
};
