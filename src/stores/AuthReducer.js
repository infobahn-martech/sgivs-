import { create } from 'zustand';
import authService from '../services/authService';
import { getAuthData, removeItem, setItem } from '../helpers/localStorage';
import useAlertReducer from './AlertReducer';

const { isAuthenticated } = getAuthData();

const useAuthReducer = create((set) => ({
  authData: null,
  userProfile: null,
  isLoginLoading: false,
  isForgotLoading: false,
  isAuthenticated,
  errorMessage: '',
  successMessage: '',
  profileData: null,
  profileEditLoader: null,
  usersData: null,
  isUsersLoading: false,

  login: async ({ email, password, platform }) => {
    try {
      set({ isLoginLoading: true });
      const { data } = await authService.doLoginValidate(
        email,
        password,
        platform
      );
      const authData = data?.user;
      setItem('accessToken', data?.token?.accessToken);
      setItem('refreshToken', data?.token?.refreshToken);
      set({ authData, isAuthenticated: true, isLoginLoading: false });
    } catch (err) {
      const { error } = useAlertReducer.getState();
      set({
        errorMessage: err?.response?.data?.message ?? err?.message,
        isLoginLoading: false,
      });
      error(err?.response?.data?.message ?? err.message);
    }
  },
  forgotPassword: async ({ email }) => {
    try {
      set({ isForgotLoading: true });
      const { data } = await authService.forgotPassword(email);

      set({
        successMessage: data?.response?.data?.message ?? data?.message,
        isForgotLoading: false,
      });
    } catch (err) {
      const { error } = useAlertReducer.getState();
      set({
        errorMessage: err?.response?.data?.message ?? err?.message,
        isForgotLoading: false,
      });
      error(err?.response?.data?.message ?? err.message);
    }
  },
  doLogout: () => {
    set({
      userProfile: null,
      authData: null,
      successMessage: '',
      isAuthenticated: false,
      errorMessage: null,
    });
    removeItem('accessToken');
    removeItem('refreshToken');
  },
  getUserProfile: async () => {
    try {
      set({ isProfileFetchLoading: true });
      const { data } = await authService.getUserProfile();
      const profileData = data.data;
      set({ profileData, isProfileFetchLoading: false });
    } catch (err) {
      const { error } = useAlertReducer.getState();
      set({
        isProfileFetchLoading: false,
        isAuthenticated: false,
      });
      error(err?.response?.data?.message ?? err.message);
      removeItem('accessToken');
      removeItem('refreshToken');
    }
  },

  getAllUsers: async () => {
    try {
      set({ isUsersLoading: true });
      const { data } = await authService.getUserProfile();
      const usersData = data.data;
      set({ usersData, isUsersLoading: false });
    } catch (err) {
      const { error } = useAlertReducer.getState();
      set({
        isUsersLoading: false,
        isAuthenticated: false,
      });
      error(err?.response?.data?.message ?? err.message);
    }
  },

  patchUserProfile: async ({ value, cb }) => {
    try {
      set({ profileEditLoader: true });
      const { data } = await authService.editUserProfile(value);
      const profileData = data.data;
      set({ profileData, profileEditLoader: false });
      const { success } = useAlertReducer.getState();
      success(data && data.message);
      cb && cb();
    } catch (err) {
      const { error } = useAlertReducer.getState();
      set({
        errorMessage: 'Something went wrong updating user profile',
        profileEditLoader: false,
      });
      error(err?.response?.data?.message ?? err.message);
    }
  },
}));

export default useAuthReducer;
