import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import attestationOTMService from '../services/AttestationOTMService';
const useAttestationOTMReducer = create((set) => ({
    isLoading: false,
    isLoadingGet: false,
    errorMessage: '',
    successMessage: '',
    attestationOTMData: null,

    getData: async (params) => {
        try {
            set({ isLoadingGet: true });
            const { data } = await attestationOTMService.getData(params);
            const datas = data;
            set({
                attestationOTMData: datas?.data,
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

export default useAttestationOTMReducer;
