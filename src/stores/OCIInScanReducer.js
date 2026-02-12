import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import visaInScanService from '../services/VisaInScanService';

const useVisaInScanReducer = create((set) => ({
    isLoading: false,
    isLoadingGet: false,
    errorMessage: '',
    successMessage: '',
    visaInScanData: null,

    getData: async (params) => {
        try {
            set({ isLoadingGet: true });
            const { data } = await visaInScanService.getData(params);
            const datas = data;
            set({
                visaInScanData: datas?.data,
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

export default useVisaInScanReducer;
