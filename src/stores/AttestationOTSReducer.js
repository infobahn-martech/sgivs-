import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import attestationOTSService from '../services/AttestationOTSService';

const useAttestationOTSReducer = create((set) => ({
    isLoading: false,
    isLoadingGet: false,
    errorMessage: '',
    successMessage: '',
    attestationOTSData: null,

    getData: async (params) => {
        try {
            set({ isLoadingGet: true });
            const { data } = await attestationOTSService.getData(params);
            const datas = data;
            set({
                attestationOTSData: datas?.data,
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

export default useAttestationOTSReducer;
