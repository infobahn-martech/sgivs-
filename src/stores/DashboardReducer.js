import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import dashboardService from '../services/dashboardService';

const dashboardReducer = create((set) => ({
  dashData: null,
  dashLoading: false,

  getAllUsers: async () => {
    try {
      set({ dashLoading: true });
      const { data } = await dashboardService.getDash();
      const dashData = data.users;
      set({
        dashData,
        dashLoading: false,
        pagination: data.users.pagination,
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
