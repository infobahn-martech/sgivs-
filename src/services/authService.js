import Gateway from '../config/gateway';

const doLoginValidate = (email, password, platform) =>
  Gateway.post('v1/auth/login', { email, password, platform });

const getUserProfile = () => Gateway.get('user/profile');

const editUserProfile = (value) =>
  Gateway.patch('user/profile', value, {
    headers: { 'Content-Type': 'Multipart/formdata' },
  });

export default {
  doLoginValidate,
  getUserProfile,
  editUserProfile,
};
