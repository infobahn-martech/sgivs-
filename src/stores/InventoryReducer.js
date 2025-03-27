import { create } from 'zustand';

import {
  deleteItemByIdService,
  getBarcode,
  getInventoryListService,
  getItemByIdService,
  submitInventoryItems,
  updateInventoryItems,
} from '../services/inventoryServices';
import useAlertReducer from './AlertReducer';

const useInventoryStore = create((set) => ({
  inventoryList: [],
  isListLoading: false,
  isBarcodeLoading: false,
  pagination: {},
  isLoading: false,
  barcodeId: null,
  barcodeKey: null,
  inventoryItem: null,
  redirectToList: false,
  set: (data) => {
    set(data);
  },
  createInventoryItem: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await submitInventoryItems(formData);
      console.log(' response', data);
      const { success } = useAlertReducer.getState();
      set({ isLoading: false, redirectToList: true }); // Set redirectToList to true
      success(data.message);

      // Update the state with the new item
    } catch (err) {
      console.log(' err', err);
      const { error } = useAlertReducer.getState();
      error(err.response?.data?.message || 'Failed to create inventory item');
      set({
        error: err.response?.data?.message || 'Failed to create inventory item',
        isLoading: false,
      });
      throw error;
    }
  },
  updateInventoryItem: async (formData, itemId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await updateInventoryItems(formData, itemId);
      console.log(' response', response);

      // Update the state with the new item
    } catch (err) {
      const { error } = useAlertReducer.getState();
      error(err.response?.data?.message || 'Failed to create inventory item');
      set({
        error: err.response?.data?.message || 'Failed to create inventory item',
        isLoading: false,
      });
      throw error;
    }
  },
  generateBarcode: async (itemId) => {
    set({ isBarcodeLoading: true, error: null });
    try {
      const { data } = await getBarcode(itemId);
      console.log(' response', data.barcode?.barcodeKey);
      set({
        isBarcodeLoading: false,
        barcodeId: data.barcode?.itemId,
        barcodeKey: data.barcode?.barcodeKey,
      });

      // Update the state with the new item
    } catch (err) {
      const { error } = useAlertReducer.getState();
      error(err.response?.data?.message || 'Failed to create inventory item');
      set({
        error: err.response?.data?.message || 'Failed to create inventory item',
        isBarcodeLoading: false,
      });
      throw error;
    }
  },
  getInventoryList: async (params) => {
    set({ inventoryList: [], isListLoading: true });
    try {
      const { data } = await getInventoryListService(params);
      set({
        pagination: data.inventories.pagination,
        isListLoading: false,
        inventoryList: data.inventories.data,
      });
      console.log(' response', data);
    } catch (error) {
      console.log(' error', error);
    }
  },
  getItemById: async (itemId) => {
    set({ inventoryItem: null, isLoading: true });
    try {
      const { data } = await getItemByIdService(itemId);
      set({
        isLoading: false,
        inventoryItem: data.inventory,
      });
      console.log(' response', data);
    } catch (error) {
      set({
        isLoading: false,
        inventoryItem: null,
      });
      console.log(' error', error);
    }
  },
  deleteItemById: async (itemId, params) => {
    set({ isLoading: true });
    try {
      const { data } = await deleteItemByIdService(itemId);
      set({
        isLoading: false,
        inventoryItem: data.inventory,
      });
      const { success } = useAlertReducer.getState();
      success(data.message);
      useInventoryStore.getState().getInventoryList(params);
    } catch (error) {
      set({
        isLoading: false,
        inventoryItem: null,
      });
      console.log(' error', error);
    }
  },
  clearItemById: () => set({ inventoryItem: null }),
}));

export default useInventoryStore;
