import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import attestationIFMService from '../services/AttestationIFMService';

const useAttestationIFMReducer = create((set) => ({
    isLoading: false,
    isLoadingGet: false,
    errorMessage: '',
    successMessage: '',
    attestationIFMData: null,

    getData: async (params) => {
        try {
            set({ isLoadingGet: true });
            const { data } = await attestationIFMService.getData(params);
            const datas = data;
            set({
                attestationIFMData: datas?.data,
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

export default useAttestationIFMReducer;
