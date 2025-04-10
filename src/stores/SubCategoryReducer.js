/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import subCategoryService from '../services/subCategoryService';

const useSubCategoryReducer = create((set) => ({
  isLoading: false,
  isLoadingGet: false,
  isLoadingDelete: false,
  errorMessage: '',
  successMessage: '',
  subCategoryData: null,
  getAllCategory: null,
  isLoadingCat: false,

  postData: async (payload) => {
    try {
      set({ isLoading: true });
      const { data } = await subCategoryService.postData(payload);
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
      const { data } = await subCategoryService.patchData(id, rest); // Updated call

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
      const { data } = await subCategoryService.getData();
      const datas = data;
      set({
        subCategoryData: datas?.data,
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
  getCategory: async () => {
    try {
      set({ isLoadingCat: true });
      const { data } = await subCategoryService.getAllCategory();
      const datas = data;
      set({
        getAllCategory: datas?.data?.data,
        isLoadingCat: false,
      });
    } catch (err) {
      set({
        isLoadingCat: false,
      });
    }
  },
  deleteData: async (id) => {
    try {
      set({ isLoadingDelete: true });
      const { data } = await subCategoryService.deleteData(id);
      const datas = data;
      set({
        subCategoryData: datas?.data,
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

export default useSubCategoryReducer;
