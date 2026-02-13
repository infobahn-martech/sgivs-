import Gateway from '../config/gateway';


const getData = (params) => Gateway.get('/return-to-mission', { params });

export default {
    getData,
};
