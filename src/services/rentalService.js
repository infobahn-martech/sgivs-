import Gateway from '../config/gateway';

const getAllRentals = (params) => Gateway.get('loan', { params });

const getNotes = (params) => Gateway.get('loan/list-notes', { params });

const changeStatus = ({ id, status, dueDate }) =>
  Gateway.put(`loan/${id}`, { status, dueDate });
const editNote = (rentalId, note) =>
  Gateway.put(`loan/edit-note/${rentalId}`, { note });

export default {
  getAllRentals,
  changeStatus,
  getNotes,
  editNote,
};
