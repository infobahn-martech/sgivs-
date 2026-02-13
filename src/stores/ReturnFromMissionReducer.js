import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import returnFromMissionService from '../services/returnFromMissionService';

const useReturnFromMissionReducer = create((set) => ({
    returnFromMissionData: null,
    isLoadingGet: false,

    getData: async (params) => {
        try {
            set({ isLoadingGet: true });
            const { data } = await returnFromMissionService.getData(params);
            const datas = data;
            set({
                returnFromMissionData: datas?.data,
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

export default useReturnFromMissionReducer;
