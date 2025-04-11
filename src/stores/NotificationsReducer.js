import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import notificationsService from '../services/notificationsService';
import SubscribeToPush from '../Notifications';

const useNotificationsReducer = create((set) => ({
  isLoading: false,
  isLoadingGet: false,
  errorMessage: '',
  successMessage: '',
  userData: null,

  postData: async (payload) => {
    try {
      set({ isLoading: true });
      const { data } = await notificationsService.postData(payload);
    } catch (err) {
      const { error } = useAlertReducer.getState();
      set({
        errorMessage: err?.response?.data?.message ?? err?.message,
        isLoading: false,
      });
      error(err?.response?.data?.message ?? err.message);
    }
  },

  getPushNotification: async (params, message) => {
    console.log('params', params);
    try {
      const { postData } = useNotificationsReducer.getState(); // SAFE, because you're not calling hooks here
      SubscribeToPush(postData, params, message);
    } catch (error) {
      console.log(' error', error);
    }
  },
}));

export default useNotificationsReducer;
