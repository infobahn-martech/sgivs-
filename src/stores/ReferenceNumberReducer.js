import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import referenceNumberService from '../services/referenceNumberService';

const useReferenceNumberReducer = create((set) => ({
  isLoading: false,
  isLoadingGet: false,
  isLoadingDelete: false,
  errorMessage: '',
  successMessage: '',
  referenceNumberData: null,
  postData: async (payload, cb) => {
    try {
      set({ isLoading: true });
      const { data } = await referenceNumberService.postData(payload);
      const { success } = useAlertReducer.getState();
      success(data?.response?.data?.message ?? data?.message);
      set({
        successMessage: data?.response?.data?.message ?? data?.message,
        isLoading: false,
      });
      cb && cb();
    } catch (err) {
      const { error } = useAlertReducer.getState();
      set({
        errorMessage: err?.response?.data?.message ?? err?.message,
        isLoading: false,
      });
      error(err?.response?.data?.message ?? err.message);
    }
  },
}));

export default useReferenceNumberReducer;
