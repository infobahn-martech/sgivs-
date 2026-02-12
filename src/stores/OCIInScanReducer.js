import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import ociInScanService from '../services/ociInScanService';

const useOCIInScanReducer = create((set) => ({
    isLoading: false,
    isLoadingGet: false,
    errorMessage: '',
    successMessage: '',
    ociInScanDataData: null,

    getData: async (params) => {
        try {
            set({ isLoadingGet: true });
            const { data } = await ociInScanService.getData(params);
            const datas = data;
            set({
                ociInScanDataData: datas?.data,
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

export default useOCIInScanReducer;
