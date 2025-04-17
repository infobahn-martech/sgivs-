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
  notifications: {},
  notificationTemp: {},
  getNotifications: async (params) => {
    try {
      if (params.limit === 3) {
        set({ notificationTemp: {}, isLoading: true });
        const { data } = await notificationsService.getNotifications(params);

        set({ notificationTemp: data?.data, isLoading: false });
      } else {
        set({ notifications: {}, isLoading: true });
        const { data } = await notificationsService.getNotifications(params);

        set({ notifications: data?.data, isLoading: false });
      }
    } catch (error) {
      set({ notifications: {}, isLoading: false });
      console.log(' error', error);
    }
  },
  markAsRead: async () => {
    try {
      set({ isLoading: true });
    } catch (error) {
      set({ isLoading: false });
      console.log(' error', error);
    }
  },
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
