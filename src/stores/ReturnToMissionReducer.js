import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import returnToMissionService from '../services/returnToMissionService';

const useReturnToMissionReducer = create((set) => ({
    returnToMissionData: null,
    isLoadingGet: false,

    getData: async (params) => {
        try {
            set({ isLoadingGet: true });
            const { data } = await returnToMissionService.getData(params);
            const datas = data;
            set({
                returnToMissionData: datas?.data,
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

export default useReturnToMissionReducer;
