import Gateway from '../config/gateway';

const getAllRentals = (params) => Gateway.get('loan', { params });

const getNotes = (params) => Gateway.get('loan/list-notes', { params });

const changeStatus = ({ id, status, dueDate }) =>
  Gateway.put(`loan/${id}`, { status, dueDate });
const editNote = (loanId, note) =>
  Gateway.patch(`loan/edit-note`, {
    loanId, // Pass rentalId in the request body
    note, // Pass note in the request body
  });

export default {
  getAllRentals,
  changeStatus,
  getNotes,
  editNote,
};
