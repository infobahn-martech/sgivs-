import Gateway from '../config/gateway';


const getData = (params) => Gateway.get('/icac-appointments', { params });

export default {
    getData,
};
