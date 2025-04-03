import { create } from 'zustand';

import {
  deleteItemByIdService,
  getBarcode,
  getInventoryListService,
  getItemByIdService,
  submitInventoryItems,
  updateInventoryItems,
  showHideService,
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
  redirectId: null,
  set: (data) => {
    set(data);
  },
  createInventoryItem: async (formData, params) => {
    console.log('params', params);
    set({ isLoading: true, error: null });
    try {
      const { data } = await submitInventoryItems(formData);
      console.log(' response', data);
      const { success } = useAlertReducer.getState();
      set({
        isLoading: false,
        redirectToList: true,
        // redirectId: data?.inventory?.id ?? null,
      }); // Set redirectToList to true
      success(data.message);
      useInventoryStore.getState().getInventoryList(params);
      // Update the state with the new item
    } catch (err) {
      console.log(' err', err);
      const { error } = useAlertReducer.getState();
      error(err.response?.data?.message || 'Failed to create inventory item');
      set({
        error: err.response?.data?.message || 'Failed to create inventory item',
        isLoading: false,
      });
    }
  },
  updateInventoryItem: async (formData, itemId, isImage = false, params) => {
    console.log('isImage', isImage);
    set({ isLoading: true, error: null });
    try {
      const { data } = await updateInventoryItems(formData, itemId);
      const { success } = useAlertReducer.getState();
      set({
        isLoading: false,
        redirectToList: !isImage,
        // redirectId: data?.inventory?.id ?? null,
      }); // Set redirectToList to true
      if (!isImage) success(data.message);
      useInventoryStore.getState().getInventoryList(params);
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
  showHide: async (itemId, show, params) => {
    console.log('first', itemId, show, params);
    set({ isLoading: true });
    try {
      const { data } = await showHideService(itemId, show);
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
