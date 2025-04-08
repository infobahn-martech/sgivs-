import Gateway from '../config/gateway';

const getAllRentals = (params) => {
  const formattedParams = {
    ...params,
    user: JSON.stringify(params.user),
  };

  return Gateway.get('loan', {
    params: formattedParams,
  });
};

const getNotes = (params) => Gateway.get('loan/list-notes', { params });

const changeStatus = ({ id, status, dueDate }) =>
  Gateway.put(`loan/${id}`, { status, dueDate });
const editNote = (loanId, note) =>
  Gateway.patch(`loan/edit-note`, {
    loanId, // Pass rentalId in the request body
    note, // Pass note in the request body
  });

const uploadEzPass = (params) => {
  const formData = new FormData();
  formData.append('file', params.file);
  return Gateway.post('loan/upload-ezpass', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const  getTransactions = (params) => Gateway.get('transactions', { params });
const  getHistory = (params) => Gateway.get('transactions', { params });
const  getUnmappedTransactions = (params) => Gateway.get('transactions/unmapped', { params });

export default {
  getAllRentals,
  changeStatus,
  getNotes,
  editNote,
  uploadEzPass,
  getTransactions,
  getUnmappedTransactions,
  getHistory
};
