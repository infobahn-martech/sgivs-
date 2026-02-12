import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import attestationInScanService from '../services/AttestationInScanService';

const useAttestationInScanReducer = create((set) => ({
    isLoading: false,
    isLoadingGet: false,
    errorMessage: '',
    successMessage: '',
    attestationInScanData: null,

    getData: async (params) => {
        try {
            set({ isLoadingGet: true });
            const { data } = await attestationInScanService.getData(params);
            const datas = data;
            set({
                attestationInScanData: datas?.data,
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

export default useAttestationInScanReducer;
