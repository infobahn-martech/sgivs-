import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import passportVasApplicationsService from '../services/passportVasApplicationsService';

const usePassportVasApplicationsReducer = create((set) => ({
    returnFromMissionData: null,
    isLoadingGet: false,

    getData: async (params) => {
        try {
            set({ isLoadingGet: true });
            const { data } = await passportVasApplicationsService.getData(params);
            const datas = data;
            set({
                passportVasApplicationsData: datas?.data,
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

export default usePassportVasApplicationsReducer;
