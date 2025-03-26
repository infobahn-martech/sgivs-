import Gateway from '../config/gateway';

const getInventoryListService = (params) =>
  Gateway.get('v1/inventory', { params });

const submitInventoryItems = (formData) =>
  Gateway.post('v1/inventory', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
const updateInventoryItems = (formData, itemId) =>
  Gateway.put(`v1/inventory/${itemId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

const getItemByIdService = (itemId) => Gateway.get(`v1/inventory/${itemId}`);
const deleteItemByIdService = (itemId) => Gateway.delete(`v1/inventory/${itemId}`);

const getBarcode = (itemId) =>
  Gateway.post(`v1/inventory/barcode`, { itemId });

export {
  getInventoryListService,
  submitInventoryItems,
  getBarcode,
  getItemByIdService,
  updateInventoryItems,
  deleteItemByIdService,
};
