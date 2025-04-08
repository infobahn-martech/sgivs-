import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import categoryService from '../services/categoryService';

const useCategoryReducer = create((set) => ({
  isLoading: false,
  isLoadingGet: false,
  errorMessage: '',
  successMessage: '',
  userData: null,

  postData: async (payload) => {
    try {
      set({ isLoading: true });
      const { data } = await categoryService.postData(payload);
      const { success } = useAlertReducer.getState();
      success(data?.response?.data?.message ?? data?.message);
      set({
        successMessage: data?.response?.data?.message ?? data?.message,
        isLoading: false,
      });
    } catch (err) {
      const { error } = useAlertReducer.getState();
      set({
        errorMessage: err?.response?.data?.message ?? err?.message,
        isLoading: false,
      });
      error(err?.response?.data?.message ?? err.message);
    }
  },
  getData: async () => {
    try {
      set({ isLoadingGet: true });
      const { data } = await categoryService.getData();
      const datas = data;
      set({
        userData: datas,
        successMessage: data?.response?.data?.message ?? data?.message,
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

export default useCategoryReducer;
