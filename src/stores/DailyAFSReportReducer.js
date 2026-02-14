import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import dailyAFSReportService from '../services/dailyAFSReportService';

const useDailyAFSReportReducer = create((set) => ({
    dailyAFSReportData: null,
    isLoadingGet: false,

    getData: async (params) => {
        try {
            set({ isLoadingGet: true });
            const { data } = await dailyAFSReportService.getData(params);
            const datas = data;
            set({
                dailyAFSReportData: datas?.data,
                // successMessage: data?.response?.data?.message ?? data?.message,
                isLoadingGet: false,
            });
        } catch (err) {
            const { error } = useAlertReducer.getState();
            set({
                errorMessage: err?.response?.data?.message ?? err?.message,
                isLoadingGet: false,
            });
            error(err?.response?.data?.message ?? err.message);
        }
    },

}));

export default useDailyAFSReportReducer;
