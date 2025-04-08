import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import dashboardService from '../services/dashboardService';

const dashboardReducer = create((set) => ({
  dashData: null,
  dashLoading: false,

  getDashboard: async () => {
    try {
      set({ dashLoading: true });
      const { data } = await dashboardService.getDash();
      const dashData = data?.items;
      set({
        dashData,
        dashLoading: false,
      });
    } catch (err) {
      const { error } = useAlertReducer.getState();
      set({
        dashLoading: false,
      });
      error(err?.response?.data?.message ?? err.message);
    }
  },
}));

export default dashboardReducer;
