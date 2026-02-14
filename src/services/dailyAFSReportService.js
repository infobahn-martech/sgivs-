import Gateway from '../config/gateway';


const getData = (params) => Gateway.get('/daily-afs-report', { params });

export default {
    getData,
};
