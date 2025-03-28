import Gateway from '../config/gateway';

const getInventoryListService = (params) =>
  Gateway.get('inventory', { params });

const submitInventoryItems = (formData) => Gateway.post('inventory', formData);
const updateInventoryItems = (formData, itemId) =>
  Gateway.put(`inventory/${itemId}`, formData);

const getItemByIdService = (itemId) => Gateway.get(`inventory/${itemId}`);
const deleteItemByIdService = (itemId) => Gateway.delete(`inventory/${itemId}`);

const getBarcode = (itemId) => Gateway.post(`inventory/barcode`, { itemId });

export {
  getInventoryListService,
  submitInventoryItems,
  getBarcode,
  getItemByIdService,
  updateInventoryItems,
  deleteItemByIdService,
};
