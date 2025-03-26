import Gateway from '../config/gateway';

const getInventoryListService = (params) =>
  Gateway.get('inventory', { params });

const submitInventoryItems = (formData) =>
  Gateway.post('inventory', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
const updateInventoryItems = (formData, itemId) =>
  Gateway.put(`inventory/${itemId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

const getItemByIdService = (itemId) => Gateway.get(`inventory/${itemId}`);
const deleteItemByIdService = (itemId) => Gateway.delete(`inventory/${itemId}`);

const getBarcode = (itemId) =>
  Gateway.post(`inventory/barcode`, { itemId });

export {
  getInventoryListService,
  submitInventoryItems,
  getBarcode,
  getItemByIdService,
  updateInventoryItems,
  deleteItemByIdService,
};
