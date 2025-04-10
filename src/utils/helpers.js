import moment from 'moment';

export const dateFormat = (value) => moment(value).format('MMM D, YYYY');
