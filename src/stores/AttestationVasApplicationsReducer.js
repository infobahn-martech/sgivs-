import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import attestationVasApplicationsService from '../services/attestationVasApplicationsService';

const useAttestationVasApplicationsReducer = create((set) => ({
    attestationVasApplicationsData: null,
    isLoadingGet: false,

    getData: async (params) => {
        try {
            set({ isLoadingGet: true });
            const { data } = await attestationVasApplicationsService.getData(params);
            const datas = data;
            set({
                attestationVasApplicationsData: datas?.data,
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

export default useAttestationVasApplicationsReducer;
