import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import categoryService from '../services/categoryService';

const useCategoryReducer = create((set) => ({
  isLoading: false,
  isLoadingGet: false,
  isLoadingDelete: false,
  errorMessage: '',
  successMessage: '',
  categoryData: null,

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
  patchData: async (payload) => {
    try {
      set({ isLoading: true });

      const { id, ...rest } = payload;
      const { data } = await categoryService.patchData(id, rest); // Updated call

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

  getData: async (params) => {
    try {
      set({ isLoadingGet: true });
      const { data } = await categoryService.getData(params);
      const datas = data;
      set({
        categoryData: datas?.data,
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
  deleteData: async (id) => {
    try {
      set({ isLoadingDelete: true });
      const { data } = await categoryService.deleteData(id);
      const datas = data;
      set({
        categoryData: datas?.data,
        successMessage: data?.response?.data?.message ?? data?.message,
        isLoadingDelete: false,
      });
    } catch (err) {
      const { error } = useAlertReducer.getState();
      set({
        errorMessage: err?.response?.data?.message ?? err?.message,
        isLoadingDelete: false,
      });
      error(err?.response?.data?.message ?? err.message);
    }
  },
}));

export default useCategoryReducer;
