import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import ociInScanService from '../services/ociInScanService';

const useOCIInScanStore = create((set) => ({
    isLoadingGet: false,
    errorMessage: '',
    ociInScanData: null,

    getData: async (params) => {
        try {
            set({ isLoadingGet: true });
            const { data } = await ociInScanStore.getData(params);
            const datas = data;
            set({
                ociInScanData: datas?.data,
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

export default useOCIInScanStore;
